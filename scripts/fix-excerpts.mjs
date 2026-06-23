#!/usr/bin/env node
/**
 * Rewrites the excerpt of every imported MDX post so it ends on a word
 * boundary (preferably a sentence boundary), max ~160 chars, with an
 * ellipsis if it was truncated. Idempotent.
 *
 * Run: node scripts/fix-excerpts.mjs
 */

import fs from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const POSTS_DIR = path.join(ROOT, 'content', 'posts');

const MAX = 160;

function stripHtml(s) {
  return s
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

function makeExcerpt(text) {
  if (!text) return '';
  if (text.length <= MAX) return text;
  // Prefer sentence boundary within first MAX+30 chars
  const window = text.slice(0, MAX + 40);
  const sentenceEnd = window.search(/[.!?]\s/);
  if (sentenceEnd > 60 && sentenceEnd <= MAX) {
    return window.slice(0, sentenceEnd + 1).trim();
  }
  // Otherwise break on last word boundary before MAX
  const sliced = text.slice(0, MAX);
  const lastSpace = sliced.lastIndexOf(' ');
  const base = lastSpace > 60 ? sliced.slice(0, lastSpace) : sliced;
  return base.trim().replace(/[,;:—-]+$/, '') + '…';
}

const files = (await fs.readdir(POSTS_DIR)).filter((f) => f.endsWith('.mdx'));
let touched = 0;
for (const f of files) {
  const fp = path.join(POSTS_DIR, f);
  const raw = await fs.readFile(fp, 'utf8');
  const parsed = matter(raw);

  // Recompute excerpt from body text (the import's excerpt was a raw 180-char slice).
  const bodyText = stripHtml(parsed.content);
  const newExcerpt = makeExcerpt(bodyText);

  if (newExcerpt === parsed.data.excerpt) continue;

  parsed.data.excerpt = newExcerpt;
  const rebuilt = matter.stringify(parsed.content, parsed.data);
  await fs.writeFile(fp, rebuilt);
  touched++;
}
console.log(`[fix-excerpts] processed ${files.length}, updated ${touched}`);
