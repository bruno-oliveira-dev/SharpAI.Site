export default function robots() {
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: 'https://sharpai.com.br/sitemap.xml',
    host: 'https://sharpai.com.br',
  };
}
