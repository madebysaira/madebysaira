/**
 * og-image.mjs
 * -----------------------------------------------------------------------------
 * Generates a 1200x630 social share image for a blog post, with the post title
 * set in Instrument Serif italic on a dark background, matching the journal.
 *
 * Pure Node: builds an SVG string, rasterizes it to PNG with @resvg/resvg-js
 * (fonts are loaded from scripts/fonts, so there is no browser or network
 * dependency). Safe to run on the auto-deploy server.
 * -----------------------------------------------------------------------------
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Resvg } from '@resvg/resvg-js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const FONT_DIR = join(__dirname, 'fonts');
const SERIF_ITALIC = join(FONT_DIR, 'InstrumentSerif-Italic.ttf');
const SERIF_REGULAR = join(FONT_DIR, 'InstrumentSerif-Regular.ttf');

const W = 1200;
const H = 630;

const escXml = (s = '') =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

/**
 * Wrap a title into lines that fit the canvas width, using a rough per-character
 * width estimate for Instrument Serif at the given font size. Caps at maxLines
 * and adds an ellipsis if it overflows.
 */
function wrapTitle(title, fontSize, maxWidth, maxLines) {
  const avg = fontSize * 0.46; // Instrument Serif is condensed; ~0.46em per char
  const maxChars = Math.floor(maxWidth / avg);
  const words = title.split(/\s+/);
  const lines = [];
  let line = '';

  for (const word of words) {
    const trial = line ? `${line} ${word}` : word;
    if (trial.length <= maxChars) {
      line = trial;
    } else {
      if (line) lines.push(line);
      line = word;
    }
  }
  if (line) lines.push(line);

  if (lines.length > maxLines) {
    const kept = lines.slice(0, maxLines);
    kept[maxLines - 1] = kept[maxLines - 1].replace(/[.,;:]?$/, '') + '…';
    return kept;
  }
  return lines;
}

/**
 * Build the OG image for a post and write it to `outPath`.
 * meta: { title, dateDisplay, readingTime }
 */
export function generateOgImage(meta, outPath) {
  const title = meta.title || 'Journal';
  const fontSize = title.length > 52 ? 66 : 82;
  const lineHeight = fontSize * 1.06;
  const maxTextWidth = W - 160; // 80px padding each side
  const lines = wrapTitle(title, fontSize, maxTextWidth, 4);

  // Vertically center the title block, leaving room for the footer row.
  const blockHeight = lines.length * lineHeight;
  const startY = 250 - blockHeight / 2 + fontSize * 0.75;

  const titleTspans = lines
    .map((ln, i) => `<tspan x="80" y="${Math.round(startY + i * lineHeight)}">${escXml(ln)}</tspan>`)
    .join('');

  const metaLine = [meta.dateDisplay, meta.readingTime ? `${meta.readingTime} min read` : '']
    .filter(Boolean)
    .join('   ·   ');

  const svg = `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="glow" cx="18%" cy="12%" r="120%">
      <stop offset="0%" stop-color="#12203f"/>
      <stop offset="45%" stop-color="#0a0f1e"/>
      <stop offset="100%" stop-color="#010103"/>
    </radialGradient>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#glow)"/>
  <rect width="${W}" height="${H}" fill="none" stroke="rgba(255,255,255,0.10)" stroke-width="2"/>

  <!-- Brand row -->
  <text x="80" y="98" font-family="Instrument Serif" font-style="italic" font-size="36" fill="#e7e9ee">Sagarika Sultana</text>
  <text x="82" y="126" font-family="monospace" font-size="15" letter-spacing="3" fill="#8b93a4">THE JOURNAL</text>

  <!-- Title -->
  <text font-family="Instrument Serif" font-style="italic" font-size="${fontSize}" fill="#ffffff" letter-spacing="-1">${titleTspans}</text>

  <!-- Meta row -->
  <text x="80" y="560" font-family="monospace" font-size="22" letter-spacing="1" fill="#8b93a4">${escXml(metaLine)}</text>

  <!-- URL pill -->
  <text x="${W - 80}" y="560" text-anchor="end" font-family="monospace" font-size="22" letter-spacing="1" fill="#93b4ff">madebysaira.me/blog</text>
</svg>`;

  const resvg = new Resvg(svg, {
    background: '#010103',
    fitTo: { mode: 'width', value: W },
    font: {
      fontFiles: [SERIF_ITALIC, SERIF_REGULAR],
      loadSystemFonts: true,
      defaultFontFamily: 'Instrument Serif',
    },
  });
  const png = resvg.render().asPng();

  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, png);
  return outPath;
}
