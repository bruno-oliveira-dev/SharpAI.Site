import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { marked } from 'marked';

const DIR = path.join(process.cwd(), 'content', 'insights');

marked.setOptions({
  gfm: true,
  breaks: false,
  smartLists: true,
});

function ensureDir() {
  if (!fs.existsSync(DIR)) return false;
  return true;
}

function parseFile(filename) {
  const slug = filename.replace(/\.md$/, '');
  const raw = fs.readFileSync(path.join(DIR, filename), 'utf8');
  const { data, content } = matter(raw);
  const date = data.date instanceof Date ? data.date.toISOString().slice(0, 10) : (data.date || '');
  return {
    slug,
    title: data.title || slug,
    excerpt: data.excerpt || '',
    date,
    readTime: data.readTime || '5 min',
    author: data.author || 'Time SharpAI',
    tags: Array.isArray(data.tags) ? data.tags : [],
    image: data.image || '/assets/sharpai-concept-1.png',
    featured: !!data.featured,
    content,
  };
}

export function getAllInsights() {
  if (!ensureDir()) return [];
  const files = fs.readdirSync(DIR).filter((f) => f.endsWith('.md'));
  const all = files.map(parseFile);
  return all.sort((a, b) => (b.date || '').localeCompare(a.date || ''));
}

export function getInsight(slug) {
  if (!ensureDir()) return null;
  const file = `${slug}.md`;
  const full = path.join(DIR, file);
  if (!fs.existsSync(full)) return null;
  const article = parseFile(file);
  return { ...article, html: marked.parse(article.content) };
}

export function getAllTags() {
  const set = new Set();
  for (const a of getAllInsights()) {
    for (const t of a.tags || []) set.add(t);
  }
  return [...set].sort();
}

export function getFeaturedInsights(limit = 3) {
  const all = getAllInsights();
  const featured = all.filter((a) => a.featured);
  const others = all.filter((a) => !a.featured);
  return [...featured, ...others].slice(0, limit);
}

export function getInsightSlugs() {
  if (!ensureDir()) return [];
  return fs.readdirSync(DIR)
    .filter((f) => f.endsWith('.md'))
    .map((f) => f.replace(/\.md$/, ''));
}
