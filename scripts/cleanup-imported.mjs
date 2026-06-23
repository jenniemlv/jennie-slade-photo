#!/usr/bin/env node
/**
 * Post-process imported MDX files: re-decode any remaining HTML entities
 * (the first import pass missed double-encoded entities like &amp;nbsp;)
 * and strip leftover Blogger anchor wrappers around local /journal/ images.
 *
 * Idempotent: safe to re-run.
 *
 * Run: node scripts/cleanup-imported.mjs
 */

import fs from 'node:fs/promises';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const POSTS_DIR = path.join(ROOT, 'content', 'posts');

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

function clean(s) {
  // Split off frontmatter so we never touch it.
  const m = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/.exec(s);
  if (!m) return s;
  const fm = m[1];
  let body = m[2];

  // Second-pass decode for any double-encoded entities still present.
  body = decodeOnce(body);

  // Strip Blogger anchor-around-image when the inner img already points local.
  // Pattern: <a href="...blogger...">[ws]<img src="/journal/..." ... />[ws]</a>
  body = body.replace(
    /<a[^>]+href=['"][^'"]*(?:blogger|googleusercontent|blogspot)[^'"]*['"][^>]*>\s*(<img[^>]*src=['"]\/journal\/[^'"]+['"][^>]*\/?>)\s*<\/a>/g,
    '$1',
  );

  // Strip blogger inline attrs that survived
  body = body.replace(/\s+onblur=['"][^'"]*['"]/g, '');
  body = body.replace(/\s+style=['"][^'"]*['"]/g, '');
  body = body.replace(/\s+id=['"]BLOGGER_PHOTO_ID_[^'"]+['"]/g, '');
  body = body.replace(/\s+border=['"]\d+['"]/g, '');
  body = body.replace(/\s+imageanchor=['"]\d+['"]/g, '');

  // Strip <a></a> wrappers that are now empty (anchor stripped, no content)
  body = body.replace(/<a[^>]*>\s*<\/a>/g, '');

  // Collapse runs of blank lines
  body = body.replace(/\n{3,}/g, '\n\n');

  return `---\n${fm}\n---\n${body}`;
}

const files = (await fs.readdir(POSTS_DIR)).filter((f) => f.endsWith('.mdx'));
let touched = 0;
for (const f of files) {
  const fp = path.join(POSTS_DIR, f);
  const before = await fs.readFile(fp, 'utf8');
  const after = clean(before);
  if (after !== before) {
    await fs.writeFile(fp, after);
    touched++;
  }
}
console.log(`[cleanup] processed ${files.length} files, modified ${touched}`);
