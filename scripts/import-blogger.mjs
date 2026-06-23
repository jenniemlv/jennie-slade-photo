#!/usr/bin/env node
/**
 * Imports a Blogger Atom export into content/posts/ MDX files,
 * downloading all Blogger CDN images to public/journal/<slug>/.
 *
 * Run: node scripts/import-blogger.mjs <path-to-feed.atom>
 *
 * Defaults to:
 *   /Users/Jennie/Downloads/Takeout/Blogger/Blogs/Focus Jennie!/feed.atom
 *
 * Idempotent: skips MDX files / images already present.
 */

import fs from 'node:fs/promises';
import { existsSync, createWriteStream } from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { Readable } from 'node:stream';
import { pipeline } from 'node:stream/promises';

const DEFAULT_FEED =
  '/Users/Jennie/Downloads/Takeout/Blogger/Blogs/Focus Jennie!/feed.atom';
const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const POSTS_DIR = path.join(ROOT, 'content', 'posts');
const IMG_DIR_REL = 'journal';
const IMG_DIR = path.join(ROOT, 'public', IMG_DIR_REL);

const feedPath = process.argv[2] || DEFAULT_FEED;

const log = (...a) => console.log('[import]', ...a);

// ── Atom parsing ────────────────────────────────────────────────────────────
// Lightweight: pull tag bodies w/ regex. The feed format is consistent.

function extractEntries(xml) {
  const out = [];
  const re = /<entry>([\s\S]*?)<\/entry>/g;
  let m;
  while ((m = re.exec(xml))) out.push(m[1]);
  return out;
}

function tag(entry, name) {
  const re = new RegExp(`<${name}(?:\\s[^>]*)?>([\\s\\S]*?)</${name}>`);
  const m = re.exec(entry);
  return m ? m[1] : null;
}

function tagAttr(entry, name) {
  // self-closing variant: <name/> -> return ""
  const reSelf = new RegExp(`<${name}\\s*/>`);
  if (reSelf.test(entry)) return '';
  return tag(entry, name);
}

function categories(entry) {
  const re = /<category[^>]*term=['"]([^'"]+)['"]/g;
  const out = [];
  let m;
  while ((m = re.exec(entry))) out.push(m[1]);
  return out;
}

// ── HTML decode / strip ─────────────────────────────────────────────────────

function decodeOnce(s) {
  return s
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&');
}

// Atom wraps HTML inside an XML element, so HTML entities are double-encoded
// (e.g. "&amp;nbsp;" in XML → "&nbsp;" in HTML → " " in text). Decode twice.
function decodeEntities(s) {
  return decodeOnce(decodeOnce(s));
}

function stripHtmlForExcerpt(html) {
  return decodeEntities(html)
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// ── Image collection + download ─────────────────────────────────────────────

const BLOGGER_HOST_RE = /(?:blogger\.googleusercontent\.com|bp\.blogspot\.com|\d+\.bp\.blogspot\.com|lh\d+\.googleusercontent\.com)/;

function collectImageUrls(html) {
  const out = new Set();
  // <a href="...full-size..."><img src="...thumb..."/></a>
  // Prefer the href (full-size) over the src (thumbnail) when both exist.
  const reA = /<a[^>]+href=['"]([^'"]+)['"]/g;
  const reImg = /<img[^>]+src=['"]([^'"]+)['"]/g;
  let m;
  while ((m = reA.exec(html))) if (BLOGGER_HOST_RE.test(m[1])) out.add(m[1]);
  while ((m = reImg.exec(html))) if (BLOGGER_HOST_RE.test(m[1])) out.add(m[1]);
  return [...out];
}

function fileSafeExt(url) {
  const u = new URL(url, 'https://x/');
  const base = path.basename(u.pathname);
  const ext = (path.extname(base) || '.jpg').toLowerCase();
  if (/\.(jpe?g|png|gif|webp|bmp)$/i.test(ext)) return ext;
  return '.jpg';
}

function urlHash(url) {
  return crypto.createHash('sha1').update(url).digest('hex').slice(0, 10);
}

async function downloadImage(url, destPath) {
  if (existsSync(destPath)) return true;
  await fs.mkdir(path.dirname(destPath), { recursive: true });
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 BloggerImportBot/1.0' },
    });
    if (!res.ok) {
      log('  ! image', res.status, url);
      return false;
    }
    await pipeline(Readable.fromWeb(res.body), createWriteStream(destPath));
    return true;
  } catch (e) {
    log('  ! image err', e.message, url);
    return false;
  }
}

// ── Slug derivation ─────────────────────────────────────────────────────────

function slugFromFilename(filenameTag, dateIso, title) {
  // <blogger:filename>/2007/05/forever-21finds-of-week.html</blogger:filename>
  if (filenameTag) {
    const m = /\/(\d{4})\/(\d{2})\/([^./]+)\.html/.exec(filenameTag);
    if (m) return `${m[1]}-${m[2]}-${m[3]}`;
  }
  const d = dateIso.slice(0, 10);
  const t = (title || 'post')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 60);
  return `${d}-${t || 'post'}`;
}

// ── HTML cleanup ────────────────────────────────────────────────────────────

function cleanBloggerHtml(html, imageMap) {
  // html is already decoded by the caller
  let s = html;

  // Replace any blogger anchor-around-image with a plain <img> using the
  // full-size href when possible, mapped to local path.
  s = s.replace(
    /<a[^>]+href=['"]([^'"]+)['"][^>]*>\s*<img[^>]*\/?>\s*<\/a>/g,
    (full, href) => {
      if (!BLOGGER_HOST_RE.test(href)) return full;
      const local = imageMap.get(href);
      return local ? `<img src="${local}" alt="" />` : '';
    },
  );

  // Standalone <img src="blogger...">
  s = s.replace(/<img[^>]+src=['"]([^'"]+)['"][^>]*\/?>/g, (m, src) => {
    const local = imageMap.get(src);
    if (local) return `<img src="${local}" alt="" />`;
    return m;
  });

  // Strip the blogger script handlers / inline styles on remaining tags
  s = s.replace(/\s+onblur=['"][^'"]*['"]/g, '');
  s = s.replace(/\s+style=['"][^'"]*['"]/g, '');
  s = s.replace(/\s+id=['"]BLOGGER_PHOTO_ID_[^'"]+['"]/g, '');
  s = s.replace(/\s+border=['"]\d+['"]/g, '');

  // Normalize <br /> to newlines (paragraph breaks)
  s = s.replace(/<br\s*\/?>(\s*<br\s*\/?>)+/g, '\n\n');
  s = s.replace(/<br\s*\/?>/g, '\n');

  // Strip empty <a> wrappers left over
  s = s.replace(/<a[^>]*><\/a>/g, '');

  // Collapse 3+ blank lines
  s = s.replace(/\n{3,}/g, '\n\n').trim();

  return s;
}

// ── Frontmatter ─────────────────────────────────────────────────────────────

function escapeQuotes(s) {
  return (s || '').replace(/\\/g, '\\\\').replace(/"/g, '\\"');
}

function makeFrontmatter({ title, date, excerpt, featuredImage, tags }) {
  const lines = [
    '---',
    `title: "${escapeQuotes(title)}"`,
    `date: "${date}"`,
    `excerpt: "${escapeQuotes(excerpt)}"`,
    `featuredImage: "${escapeQuotes(featuredImage)}"`,
  ];
  if (tags.length) lines.push(`tags: [${tags.map((t) => `"${escapeQuotes(t)}"`).join(', ')}]`);
  lines.push('---');
  return lines.join('\n');
}

// ── Main ────────────────────────────────────────────────────────────────────

async function main() {
  log('feed:', feedPath);
  const xml = await fs.readFile(feedPath, 'utf8');
  const entries = extractEntries(xml);
  log('entries:', entries.length);

  await fs.mkdir(POSTS_DIR, { recursive: true });
  await fs.mkdir(IMG_DIR, { recursive: true });

  const posts = entries
    .map((e) => {
      const type = tag(e, 'blogger:type');
      const status = tag(e, 'blogger:status');
      const trashed = tagAttr(e, 'blogger:trashed');
      return { e, type, status, trashed };
    })
    .filter((x) => x.type === 'POST' && x.status === 'LIVE' && (x.trashed === null || x.trashed === ''));

  const LIMIT = process.env.LIMIT ? parseInt(process.env.LIMIT, 10) : Infinity;
  if (Number.isFinite(LIMIT)) {
    posts.length = Math.min(posts.length, LIMIT);
    log('LIMIT applied:', LIMIT);
  }
  log('posts to import:', posts.length);

  const usedSlugs = new Set();
  let written = 0;
  let skipped = 0;
  let imageHits = 0;
  let imageMisses = 0;

  for (let i = 0; i < posts.length; i++) {
    const e = posts[i].e;
    const titleRaw = tag(e, 'title') || 'Untitled';
    const title = decodeEntities(titleRaw);
    const contentRaw = tag(e, 'content') || '';
    const published = tag(e, 'published') || tag(e, 'blogger:created') || '';
    const filenameTag = tag(e, 'blogger:filename') || '';
    const cats = categories(e);

    const dateIso = published.slice(0, 10);
    let slug = slugFromFilename(filenameTag, published, title);
    let n = 2;
    while (usedSlugs.has(slug)) slug = `${slug}-${n++}`;
    usedSlugs.add(slug);

    const dest = path.join(POSTS_DIR, `${slug}.mdx`);
    if (existsSync(dest)) {
      skipped++;
      continue;
    }

    // Atom content is HTML-encoded — decode before regex extraction.
    const contentHtml = decodeEntities(contentRaw);

    // Download images
    const urls = collectImageUrls(contentHtml);
    const imageMap = new Map();
    for (const url of urls) {
      const ext = fileSafeExt(url);
      const local = `/${IMG_DIR_REL}/${slug}/${urlHash(url)}${ext}`;
      const localFs = path.join(ROOT, 'public', local.slice(1));
      const ok = await downloadImage(url, localFs);
      if (ok) {
        imageMap.set(url, local);
        imageHits++;
      } else {
        imageMisses++;
      }
    }

    const cleaned = cleanBloggerHtml(contentHtml, imageMap);
    const excerpt = stripHtmlForExcerpt(contentHtml).slice(0, 180);
    const featured = imageMap.size ? [...imageMap.values()][0] : '';

    const fm = makeFrontmatter({
      title,
      date: dateIso,
      excerpt,
      featuredImage: featured,
      tags: cats,
    });

    await fs.writeFile(dest, `${fm}\n\n${cleaned}\n`);
    written++;
    if (written % 25 === 0) log(`written ${written}/${posts.length} (img ok=${imageHits}, miss=${imageMisses})`);
  }

  log('DONE');
  log('  written:', written);
  log('  skipped (existing):', skipped);
  log('  images ok:', imageHits, 'miss:', imageMisses);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
