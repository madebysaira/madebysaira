#!/usr/bin/env node
/**
 * sync-linkedin.mjs — keep the portfolio's latest-3 LinkedIn videos in sync.
 *
 * Source of truth: src/data/linkedin-posts.json (newest first, max MAX_POSTS).
 * For each entry it ensures:
 *   public/videos/<slug>.mp4          (downloaded via yt-dlp, public posts need no login)
 *   public/images/posters/<slug>.jpg  (thumbnail pulled from the mp4 via ffmpeg)
 *   width/height in the JSON           (probed via ffprobe, falls back to 720x1280)
 *
 * Usage:
 *   node scripts/sync-linkedin.mjs
 *   node scripts/sync-linkedin.mjs --add "https://www.linkedin.com/posts/... | Title | Subtitle"
 *   # repeat --add for several posts; newest --add ends up first
 *
 * Optional full-auto discovery via LinkedIn's official Posts API
 * (needs repo secrets LINKEDIN_ACCESS_TOKEN + LINKEDIN_PERSON_URN —
 *  see docs/LINKEDIN-AUTOMATION.md). Without them the script just syncs
 * the JSON list, which is the supported day-to-day flow.
 */

import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DATA_FILE = join(ROOT, 'src', 'data', 'linkedin-posts.json');
const VIDEOS_DIR = join(ROOT, 'public', 'videos');
const POSTERS_DIR = join(ROOT, 'public', 'images', 'posters');

const MAX_POSTS = 3;
const YT_DLP = process.env.YT_DLP || 'yt-dlp';

const log = (...a) => console.log('[sync-linkedin]', ...a);
const warn = (...a) => console.warn('[sync-linkedin:WARN]', ...a);

function run(cmd, args, opts = {}) {
  try {
    return execFileSync(cmd, args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'], ...opts });
  } catch (err) {
    throw new Error(`${cmd} ${args.join(' ')} failed: ${(err.stderr || err.message || '').toString().slice(0, 500)}`);
  }
}

/** Extract a stable numeric id from a LinkedIn post URL (pretty or feed/update form). */
export function activityId(url) {
  let m = url.match(/activity-(\d{10,})/);
  if (m) return m[1];
  m = url.match(/urn%3Ali%3Aactivity%3A(\d+)|urn:li:activity:(\d+)/);
  if (m) return m[1] || m[2];
  m = url.match(/ugcPost-(\d{10,})/);
  if (m) return m[1];
  return null;
}

function slugify(s) {
  return (s || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 40) || 'post';
}

function loadPosts() {
  return JSON.parse(readFileSync(DATA_FILE, 'utf8'));
}

function savePosts(posts) {
  writeFileSync(DATA_FILE, JSON.stringify(posts, null, 2) + '\n');
}

/** Parse --add "url | title | subtitle | slug" args (repeatable). */
function parseAdds(argv) {
  const adds = [];
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === '--add' && argv[i + 1]) {
      const [url, title, subtitle, slug] = argv[++i].split('|').map((s) => s.trim());
      if (!url || !url.includes('linkedin.com')) throw new Error(`--add needs a linkedin.com URL, got: ${url}`);
      adds.push({ url, title, subtitle, slug });
    }
  }
  return adds;
}

/** Optional: discover newest video posts via LinkedIn's official Posts API. Best-effort. */
async function discoverViaOfficialApi() {
  const token = process.env.LINKEDIN_ACCESS_TOKEN;
  const personUrn = process.env.LINKEDIN_PERSON_URN; // e.g. urn:li:person:abc123
  if (!token || !personUrn) {
    log('No LinkedIn API secrets set — skipping official-API discovery (JSON list is authoritative).');
    return [];
  }
  try {
    const qs = new URLSearchParams({ author: personUrn, count: '10' });
    const res = await fetch(`https://api.linkedin.com/rest/posts?${qs}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'LinkedIn-Version': '202601',
        'X-Restli-Protocol-Version': '2.0.0',
      },
      signal: AbortSignal.timeout(20000),
    });
    if (!res.ok) {
      warn(`Posts API returned ${res.status} — is the token fresh (60-day expiry)? Falling back to JSON list.`);
      return [];
    }
    const data = await res.json();
    const found = [];
    for (const el of data.elements || []) {
      const hasVideo = el?.content?.video || el?.content?.urn?.includes?.('video');
      if (!hasVideo) continue;
      const urn = el.urn || el.id; // e.g. urn:li:share:123 / urn:li:ugcPost:123
      if (!urn) continue;
      const commentary = (el.commentary || '').split('\n').filter(Boolean);
      found.push({
        url: `https://www.linkedin.com/feed/update/${encodeURIComponent(urn)}`,
        title: (commentary[0] || 'New spec campaign').slice(0, 70),
        subtitle: (commentary[1] || 'Fresh from LinkedIn').slice(0, 90),
        apiUrn: urn,
      });
    }
    log(`Official API discovery: ${found.length} video post(s).`);
    return found;
  } catch (err) {
    warn(`Official-API discovery failed (${err.message}). Falling back to JSON list.`);
    return [];
  }
}

function upsert(posts, { url, title, subtitle, slug, apiUrn }) {
  const id = activityId(url) || apiUrn || url;
  const ix = posts.findIndex((p) => (activityId(p.url) || p.url) === id);
  if (ix >= 0) {
    // Already tracked — refresh to newest-first, fill in provided copy.
    const [existing] = posts.splice(ix, 1);
    if (title) existing.title = title;
    if (subtitle) existing.subtitle = subtitle;
    if (slug) {
      existing.slug = slugify(slug);
      existing.videoUrl = `/videos/${existing.slug}.mp4`;
      existing.poster = `/images/posters/${existing.slug}.jpg`;
    }
    posts.unshift(existing);
    log(`moved to front (already tracked): ${existing.title}`);
    return;
  }
  const stem = slug ? slugify(slug) : `li-${String(id).replace(/\D/g, '').slice(-12) || 'post'}`;
  posts.unshift({
    slug: stem,
    title: title || 'New spec campaign',
    subtitle: subtitle || 'Fresh from LinkedIn',
    url,
    videoUrl: `/videos/${stem}.mp4`,
    poster: `/images/posters/${stem}.jpg`,
    width: 720,
    height: 1280,
  });
  log(`added: ${title || url}`);
}

function ensureVideo(post) {
  const dest = join(VIDEOS_DIR, `${post.slug}.mp4`);
  if (existsSync(dest) && !process.env.FORCE_REDOWNLOAD) {
    log(`video cached: ${post.slug}.mp4`);
    return dest;
  }
  mkdirSync(VIDEOS_DIR, { recursive: true });
  log(`downloading: ${post.url}`);
  run(YT_DLP, ['--no-playlist', '-f', 'best[ext=mp4]/best', '-o', dest, '--no-warnings', post.url]);
  log(`saved: ${post.slug}.mp4`);
  return dest;
}

function ensurePoster(post, videoPath) {
  const dest = join(POSTERS_DIR, `${post.slug}.jpg`);
  const needPoster = !existsSync(dest) || process.env.FORCE_REDOWNLOAD;
  if (needPoster) {
    mkdirSync(POSTERS_DIR, { recursive: true });
    run('ffmpeg', ['-y', '-v', 'error', '-ss', '0.5', '-i', videoPath, '-vframes', '1', '-q:v', '4', dest]);
    log(`poster: ${post.slug}.jpg`);
  }
  try {
    const probe = run('ffprobe', [
      '-v', 'error', '-select_streams', 'v:0',
      '-show_entries', 'stream=width,height', '-of', 'csv=p=0', videoPath,
    ]).trim();
    const [w, h] = probe.split(',').map(Number);
    if (w > 0 && h > 0) {
      post.width = w;
      post.height = h;
    }
  } catch {
    warn(`ffprobe failed for ${post.slug}.mp4 — keeping ${post.width}x${post.height}.`);
  }
  post.videoUrl = `/videos/${post.slug}.mp4`;
  post.poster = `/images/posters/${post.slug}.jpg`;
  return dest;
}

function pruneOrphanAssets(posts) {
  const kept = new Set(posts.map((p) => p.slug));
  let removed = 0;
  const sweep = (dir, ext) => {
    if (!existsSync(dir)) return;
    for (const f of readdirSync(dir)) {
      if (!f.endsWith(ext)) continue;
      if (!kept.has(f.slice(0, -ext.length))) {
        rmSync(join(dir, f));
        removed++;
        log(`pruned old asset (keeps latest ${MAX_POSTS}): ${f}`);
      }
    }
  };
  sweep(VIDEOS_DIR, '.mp4');
  sweep(POSTERS_DIR, '.jpg');
  return removed;
}

async function main() {
  const adds = parseAdds(process.argv.slice(2));
  let posts = loadPosts();

  // Newest --add first: apply in reverse so the first --add on the CLI ends up on top.
  for (const a of [...adds].reverse()) upsert(posts, a);

  // Official API discovery (only when secrets exist; never fatal).
  for (const d of (await discoverViaOfficialApi()).reverse()) upsert(posts, d);

  if (posts.length > MAX_POSTS) {
    log(`trimming ${posts.length} → ${MAX_POSTS} (latest only)`);
    posts = posts.slice(0, MAX_POSTS);
  }

  for (const post of posts) {
    const video = ensureVideo(post);
    ensurePoster(post, video);
  }
  pruneOrphanAssets(posts);
  savePosts(posts);
  log(`done — tracking ${posts.length} video(s): ${posts.map((p) => p.slug).join(', ')}`);
}

main().catch((err) => {
  console.error('[sync-linkedin:FATAL]', err.message);
  process.exit(1);
});
