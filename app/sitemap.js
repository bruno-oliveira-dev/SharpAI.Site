import { getAllInsights } from '../lib/insights';

const BASE = 'https://sharpai.com.br';

export default function sitemap() {
  const now = new Date().toISOString();
  const home = [
    { url: `${BASE}/`,             priority: 1.0,  changeFrequency: 'monthly' },
    { url: `${BASE}/insights`,     priority: 0.9,  changeFrequency: 'weekly' },
  ];
  const sections = ['#capacidades', '#trabalho', '#manifesto', '#insights', '#contato'].map((h) => ({
    url: `${BASE}/${h}`,
    priority: 0.5,
    changeFrequency: 'monthly',
  }));
  const articles = getAllInsights().map((a) => ({
    url: `${BASE}/insights/${a.slug}`,
    lastModified: a.date ? new Date(a.date + 'T00:00:00').toISOString() : now,
    changeFrequency: 'yearly',
    priority: 0.7,
  }));
  return [...home, ...sections, ...articles].map((entry) => ({
    lastModified: now,
    ...entry,
  }));
}
