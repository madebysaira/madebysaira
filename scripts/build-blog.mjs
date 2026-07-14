/**
 * build-blog.mjs
 * -----------------------------------------------------------------------------
 * Turns Markdown files in content/blog/*.md into standalone, SEO-complete HTML
 * pages under public/blog/. Runs automatically before `vite build` (see the
 * "build" script in package.json), so the AI agent that writes posts only ever
 * touches Markdown. It never edits React, and it cannot break the app.
 *
 * For each post it emits:  public/blog/<slug>/index.html
 * Plus the blog index:     public/blog/index.html
 * Plus a feed:             public/blog/rss.xml
 * And it refreshes:        public/sitemap.xml   (home + every post)
 *
 * Design goals:
 *   - Defensive: a malformed post is skipped with a clear warning, the build
 *     still succeeds for every other post.
 *   - Deterministic: same input always produces the same output.
 *   - On-brand: pages match the cosmic / mono aesthetic of the main site.
 * -----------------------------------------------------------------------------
 */
import { readFileSync, writeFileSync, readdirSync, mkdirSync, rmSync, existsSync, copyFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { marked } from 'marked';
import matter from 'gray-matter';
import { generateOgImage } from './og-image.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const CONTENT_DIR = join(ROOT, 'content', 'blog');
const OUT_DIR = join(ROOT, 'public', 'blog');
const PUBLIC_DIR = join(ROOT, 'public');

const SITE = {
  origin: 'https://www.madebysaira.me',
  name: 'Sagarika Sultana',
  author: 'Sagarika Sultana',
  authorTwitter: '@madebysaira',
  defaultCover: '/og-cover.png',
  email: 'madebysaira@proton.me',
  github: 'https://github.com/madebysaira',
};

// Short content hash of blog.css, appended to its URL so browsers always load
// the current stylesheet after a change (fixes stale-cache layout issues).
// Computed once at module load.
let CSS_VERSION = 'v1';
try {
  const cssBytes = readFileSync(join(OUT_DIR, 'blog.css'));
  CSS_VERSION = createHash('sha256').update(cssBytes).digest('hex').slice(0, 8);
} catch {
  // blog.css missing at hash time is fine; falls back to v1.
}

/* ── Small helpers ────────────────────────────────────────────────────────── */

const esc = (s = '') =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const stripTags = (s = '') => String(s).replace(/<[^>]*>/g, '');

const slugify = (s = '') =>
  String(s)
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

// Human friendly date: "12 July 2026". Falls back gracefully.
const formatDate = (iso) => {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
};

const readingTime = (markdown) => {
  const words = stripTags(markdown).trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
};

/* ── Load + validate posts ────────────────────────────────────────────────── */

function loadPosts() {
  if (!existsSync(CONTENT_DIR)) return [];
  const files = readdirSync(CONTENT_DIR).filter((f) => f.endsWith('.md') && !f.startsWith('_'));
  const posts = [];

  for (const file of files) {
    const raw = readFileSync(join(CONTENT_DIR, file), 'utf8');
    let parsed;
    try {
      parsed = matter(raw);
    } catch (err) {
      console.warn(`  ! Skipping ${file}: could not parse frontmatter (${err.message})`);
      continue;
    }
    const fm = parsed.data || {};

    // Required fields
    if (!fm.title || !fm.description) {
      console.warn(`  ! Skipping ${file}: "title" and "description" are required in frontmatter.`);
      continue;
    }
    // Draft posts never ship.
    if (fm.draft === true) {
      console.log(`  · Skipping ${file}: marked as draft.`);
      continue;
    }

    const slug = slugify(fm.slug || file.replace(/\.md$/, ''));
    const date = fm.date ? new Date(fm.date).toISOString() : new Date(0).toISOString();
    const tags = Array.isArray(fm.tags) ? fm.tags.filter(Boolean) : [];

    // If the author gave a custom cover, use it. Otherwise we auto-generate a
    // serif title card at build time (see generateOgImage) so every post gets a
    // distinct, on-brand social share image.
    const hasCustomCover = Boolean(fm.cover);
    const cover = hasCustomCover ? String(fm.cover) : `/images/blog/og/${slug}.png`;

    posts.push({
      file,
      slug,
      title: String(fm.title),
      description: String(fm.description),
      date,
      dateDisplay: formatDate(date),
      updated: fm.updated ? new Date(fm.updated).toISOString() : null,
      tags,
      category: fm.category ? String(fm.category) : (tags[0] || 'Journal'),
      hasCustomCover,
      cover,
      coverAlt: fm.coverAlt ? String(fm.coverAlt) : String(fm.title),
      repo: fm.repo ? String(fm.repo) : '',
      readingTime: readingTime(parsed.content),
      bodyMarkdown: parsed.content,
    });
  }

  // Newest first.
  posts.sort((a, b) => new Date(b.date) - new Date(a.date));
  return posts;
}

/* ── Markdown → HTML (heading anchors for nicer SEO) ───────────────────────── */

marked.use({
  renderer: {
    heading({ tokens, depth }) {
      const text = this.parser.parseInline(tokens);
      const id = slugify(stripTags(text));
      return `<h${depth} id="${id}">${text}</h${depth}>\n`;
    },
  },
});

const renderMarkdown = (md) => marked.parse(md, { mangle: false, headerIds: false });

/* ── Shared page chrome ───────────────────────────────────────────────────── */

function head({ title, description, url, image, type = 'article', published, modified, tags = [] }) {
  const abs = (p) => (p.startsWith('http') ? p : SITE.origin + p);
  const img = abs(image || SITE.defaultCover);
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <!-- Google tag (gtag.js) -->
    <link rel="preconnect" href="https://www.googletagmanager.com" />
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-3Z4PSFX5X9"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-3Z4PSFX5X9');
    </script>

    <title>${esc(title)}</title>
    <meta name="description" content="${esc(description)}" />
    ${tags.length ? `<meta name="keywords" content="${esc(tags.join(', '))}" />` : ''}
    <meta name="author" content="${esc(SITE.author)}" />
    <meta name="robots" content="index, follow, max-image-preview:large" />
    <meta name="theme-color" content="#010103" />
    <link rel="canonical" href="${esc(url)}" />

    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="icon" type="image/png" sizes="512x512" href="/favicon.png" />
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    <link rel="alternate" type="application/rss+xml" title="${esc(SITE.name)} Blog" href="/blog/rss.xml" />

    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Instrument+Serif:ital@0;1&family=Roboto+Mono:wght@400;500&display=swap" rel="stylesheet" />

    <!-- Open Graph -->
    <meta property="og:type" content="${type}" />
    <meta property="og:site_name" content="${esc(SITE.name)}" />
    <meta property="og:locale" content="en_US" />
    <meta property="og:url" content="${esc(url)}" />
    <meta property="og:title" content="${esc(title)}" />
    <meta property="og:description" content="${esc(description)}" />
    <meta property="og:image" content="${esc(img)}" />
    <meta property="og:image:secure_url" content="${esc(img)}" />
    <meta property="og:image:type" content="image/png" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    ${published ? `<meta property="article:published_time" content="${esc(published)}" />` : ''}
    ${modified ? `<meta property="article:modified_time" content="${esc(modified)}" />` : ''}
    ${tags.map((t) => `<meta property="article:tag" content="${esc(t)}" />`).join('\n    ')}

    <!-- Twitter / X -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="${esc(SITE.authorTwitter)}" />
    <meta name="twitter:creator" content="${esc(SITE.authorTwitter)}" />
    <meta name="twitter:title" content="${esc(title)}" />
    <meta name="twitter:description" content="${esc(description)}" />
    <meta name="twitter:image" content="${esc(img)}" />

    <link rel="stylesheet" href="/blog/blog.css?v=${CSS_VERSION}" />
  </head>
  <body>
    <header class="site-header">
      <a href="/" class="header-logo">Sagarika Sultana</a>
      <nav class="header-links">
        <a href="/blog/">Journal</a>
        <a href="/#booking">Contact</a>
      </nav>
    </header>
`;
}

const foot = () => `
    <footer class="site-foot">
      <span class="foot-credit">Sagarika Sultana</span>
      <span class="foot-links">
        <a href="/">Home</a>
        <a href="${esc(SITE.github)}" target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href="https://x.com/madebysaira" target="_blank" rel="noopener noreferrer">X</a>
      </span>
    </footer>
  </body>
</html>
`;

/* ── Post page ────────────────────────────────────────────────────────────── */

function renderPost(post, prevNext) {
  const url = `${SITE.origin}/blog/${post.slug}/`;
  const bodyHtml = renderMarkdown(post.bodyMarkdown);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        '@id': `${url}#article`,
        headline: post.title,
        description: post.description,
        image: post.cover.startsWith('http') ? post.cover : SITE.origin + post.cover,
        datePublished: post.date,
        dateModified: post.updated || post.date,
        author: { '@type': 'Person', name: SITE.author, url: SITE.origin },
        publisher: { '@type': 'Person', name: SITE.author, url: SITE.origin },
        mainEntityOfPage: url,
        keywords: post.tags.join(', '),
        wordCount: stripTags(post.bodyMarkdown).split(/\s+/).filter(Boolean).length,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.origin + '/' },
          { '@type': 'ListItem', position: 2, name: 'Journal', item: SITE.origin + '/blog/' },
          { '@type': 'ListItem', position: 3, name: post.title, item: url },
        ],
      },
    ],
  };

  const tagPills = post.tags.length
    ? `<div class="post-tags">${post.tags.map((t) => `<span>${esc(t)}</span>`).join('')}</div>`
    : '';

  const repoLink = post.repo
    ? `<a class="post-repo" href="${esc(post.repo)}" target="_blank" rel="noopener noreferrer">View the code on GitHub &#8599;</a>`
    : '';

  const related = [];
  if (prevNext.prev) related.push(`<a class="rel-card" href="/blog/${prevNext.prev.slug}/"><span>Previous</span><strong>${esc(prevNext.prev.title)}</strong></a>`);
  if (prevNext.next) related.push(`<a class="rel-card" href="/blog/${prevNext.next.slug}/"><span>Next</span><strong>${esc(prevNext.next.title)}</strong></a>`);

  return (
    head({
      title: `${post.title} | ${SITE.name}`,
      description: post.description,
      url,
      image: post.cover,
      type: 'article',
      published: post.date,
      modified: post.updated || post.date,
      tags: post.tags,
    }) +
    `
    <main class="post">
      <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>

      <nav class="crumbs"><a href="/blog/">&#8592; Back to the journal</a></nav>

      <article>
        <header class="post-head">
          <h1>${esc(post.title)}</h1>
          <div class="post-meta">
            <span>${esc(SITE.author)}</span>
            <span class="dot">&middot;</span>
            <time datetime="${esc(post.date)}">${esc(post.dateDisplay)}</time>
            <span class="dot">&middot;</span>
            <span>${post.readingTime} min read</span>
          </div>
        </header>

        <div class="post-body">
          ${bodyHtml}
        </div>

        ${tagPills}
        ${repoLink}
      </article>

      <section class="post-cta">
        <h2>Have a project like this in mind?</h2>
        <p>I help brands and teams turn ideas into finished, living work. If something here sparked an idea, let's talk.</p>
        <div class="cta-row">
          <a class="btn" href="/#booking">Book a Call</a>
          <a class="btn ghost" href="mailto:${esc(SITE.email)}">Email Me</a>
        </div>
      </section>

      ${related.length ? `<nav class="post-nav">${related.join('')}</nav>` : ''}
    </main>
` +
    foot()
  );
}

/* ── Blog index ───────────────────────────────────────────────────────────── */

function renderIndex(posts) {
  const url = `${SITE.origin}/blog/`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    '@id': `${url}#blog`,
    name: `${SITE.name} Journal`,
    description: 'Notes, case studies and build logs from Sagarika Sultana on AI video, visual design and workflow automation.',
    url,
    author: { '@type': 'Person', name: SITE.author, url: SITE.origin },
    blogPost: posts.map((p) => ({
      '@type': 'BlogPosting',
      headline: p.title,
      description: p.description,
      datePublished: p.date,
      url: `${SITE.origin}/blog/${p.slug}/`,
    })),
  };

  const rows = posts
    .map(
      (p) => `
        <article class="post-row">
          <p class="post-row-date"><time datetime="${esc(p.date)}">${esc(p.dateDisplay)}</time></p>
          <h2><a href="/blog/${p.slug}/">${esc(p.title)}</a></h2>
        </article>`
    )
    .join('\n');

  const empty = `<div class="empty"><p>The first post is on its way. Check back soon.</p></div>`;

  return (
    head({
      title: `Journal | ${SITE.name}`,
      description: 'Notes, case studies and build logs on AI video, visual design and workflow automation, written by Sagarika Sultana.',
      url,
      image: SITE.defaultCover,
      type: 'website',
    }) +
    `
    <main class="blog-index">
      <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>

      <header class="index-head">
        <h1>Journal</h1>
        <p class="index-sub">Notes on AI video, visual design and whatever else I am building. Most of it starts as a project on <a href="${esc(SITE.github)}" target="_blank" rel="noopener noreferrer">GitHub</a>.</p>
      </header>

      <section class="post-list">
        ${posts.length ? rows : empty}
      </section>
    </main>
` +
    foot()
  );
}

/* ── RSS + sitemap ────────────────────────────────────────────────────────── */

function renderRss(posts) {
  const items = posts
    .slice(0, 20)
    .map(
      (p) => `    <item>
      <title>${esc(p.title)}</title>
      <link>${SITE.origin}/blog/${p.slug}/</link>
      <guid isPermaLink="true">${SITE.origin}/blog/${p.slug}/</guid>
      <description>${esc(p.description)}</description>
      <pubDate>${new Date(p.date).toUTCString()}</pubDate>
    </item>`
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${esc(SITE.name)} Journal</title>
    <link>${SITE.origin}/blog/</link>
    <description>Case studies and build logs on AI video, visual design and workflow automation.</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>
`;
}

function writeSitemap(posts) {
  const staticUrls = [{ loc: `${SITE.origin}/`, priority: '1.0', changefreq: 'monthly' }];
  const blogUrl = { loc: `${SITE.origin}/blog/`, priority: '0.8', changefreq: 'weekly' };
  const postUrls = posts.map((p) => ({
    loc: `${SITE.origin}/blog/${p.slug}/`,
    priority: '0.7',
    changefreq: 'monthly',
    lastmod: (p.updated || p.date).slice(0, 10),
  }));

  const all = [...staticUrls, blogUrl, ...postUrls];
  const body = all
    .map(
      (u) => `  <url>
    <loc>${u.loc}</loc>${u.lastmod ? `\n    <lastmod>${u.lastmod}</lastmod>` : ''}
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
    )
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`;
  writeFileSync(join(PUBLIC_DIR, 'sitemap.xml'), xml);
}

/* ── Main ─────────────────────────────────────────────────────────────────── */

function main() {
  console.log('› Building blog…');
  const posts = loadPosts();

  // Clean only generated post folders, keep blog.css and other assets.
  if (existsSync(OUT_DIR)) {
    for (const entry of readdirSync(OUT_DIR, { withFileTypes: true })) {
      if (entry.isDirectory()) rmSync(join(OUT_DIR, entry.name), { recursive: true, force: true });
    }
  }
  mkdirSync(OUT_DIR, { recursive: true });

  // Auto-generate a serif OG image for every post that has no custom cover.
  const ogDir = join(PUBLIC_DIR, 'images', 'blog', 'og');
  mkdirSync(ogDir, { recursive: true });
  posts.forEach((post) => {
    if (post.hasCustomCover) return;
    try {
      generateOgImage(
        { title: post.title, dateDisplay: post.dateDisplay, readingTime: post.readingTime },
        join(ogDir, `${post.slug}.png`)
      );
    } catch (err) {
      // If OG generation fails, fall back to the default brand cover so the
      // build still succeeds and the post still shares with an image.
      console.warn(`  ! OG image failed for ${post.slug}: ${err.message}. Using default cover.`);
      post.cover = SITE.defaultCover;
    }
  });

  // Per-post pages
  posts.forEach((post, i) => {
    const prevNext = { prev: posts[i + 1] || null, next: posts[i - 1] || null };
    const dir = join(OUT_DIR, post.slug);
    mkdirSync(dir, { recursive: true });
    writeFileSync(join(dir, 'index.html'), renderPost(post, prevNext));
    console.log(`  ✓ /blog/${post.slug}/`);
  });

  // Index, RSS, sitemap
  writeFileSync(join(OUT_DIR, 'index.html'), renderIndex(posts));
  writeFileSync(join(OUT_DIR, 'rss.xml'), renderRss(posts));
  writeSitemap(posts);

  console.log(`› Blog build complete: ${posts.length} post${posts.length === 1 ? '' : 's'}, index, rss, sitemap.`);
}

main();
