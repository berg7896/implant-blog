#!/usr/bin/env node
// ============================================================
// SITEMAP GENERATOR
// Generates sitemap index + multiple sitemaps (max 5000 URLs each)
// Run after build or before deploy: npm run sitemaps
// ============================================================

const fs = require('fs');
const path = require('path');
const services = require('../src/data/services');
const cities = require('../src/data/cities');
const siteConfig = require('../src/data/site-config');

const SITE_URL = siteConfig.siteUrl;
const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const MAX_PER_SITEMAP = 5000;

function buildAllUrls() {
  const urls = [];
  const mainServices = services.filter(s => s.category !== 'spanish');
  const costCategories = ['implants', 'surgery', 'restorative', 'cosmetic', 'sedation', 'dentures'];
  const costServices = mainServices.filter(s => costCategories.includes(s.category));
  const today = new Date().toISOString().split('T')[0];

  // Home
  urls.push({ loc: '/', priority: '1.0', changefreq: 'weekly' });

  // Service × City
  for (const svc of mainServices) {
    for (const city of cities) {
      urls.push({
        loc: `/${svc.slug}/${city.slug}/`,
        priority: svc.category === 'implants' ? '0.9' : '0.8',
        changefreq: 'monthly',
      });
    }
  }

  // Cost pages
  for (const svc of costServices) {
    for (const city of cities) {
      urls.push({
        loc: `/cost/${svc.slug}/${city.slug}/`,
        priority: '0.7',
        changefreq: 'monthly',
      });
    }
  }

  return urls;
}

function generateSitemap(urls, filename) {
  const today = new Date().toISOString().split('T')[0];
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  for (const url of urls) {
    xml += '  <url>\n';
    xml += `    <loc>${SITE_URL}${url.loc}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>${url.changefreq}</changefreq>\n`;
    xml += `    <priority>${url.priority}</priority>\n`;
    xml += '  </url>\n';
  }

  xml += '</urlset>';

  const filepath = path.join(PUBLIC_DIR, filename);
  fs.writeFileSync(filepath, xml);
  console.log(`  ✅ ${filename}: ${urls.length} URLs`);
  return filename;
}

function generateSitemapIndex(sitemapFiles) {
  const today = new Date().toISOString().split('T')[0];
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  for (const file of sitemapFiles) {
    xml += '  <sitemap>\n';
    xml += `    <loc>${SITE_URL}/${file}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += '  </sitemap>\n';
  }

  xml += '</sitemapindex>';

  fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap.xml'), xml);
  console.log(`  ✅ sitemap.xml (index): ${sitemapFiles.length} sitemaps`);
}

function main() {
  console.log('\n🗺️  Generating sitemaps...\n');

  const allUrls = buildAllUrls();
  console.log(`  Total URLs: ${allUrls.length}\n`);

  const sitemapFiles = [];
  let chunk = 0;

  for (let i = 0; i < allUrls.length; i += MAX_PER_SITEMAP) {
    chunk++;
    const batch = allUrls.slice(i, i + MAX_PER_SITEMAP);
    const filename = `sitemap-${chunk}.xml`;
    generateSitemap(batch, filename);
    sitemapFiles.push(filename);
  }

  generateSitemapIndex(sitemapFiles);

  // Also generate robots.txt
  const robots = `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;
  fs.writeFileSync(path.join(PUBLIC_DIR, 'robots.txt'), robots);
  console.log(`  ✅ robots.txt`);

  console.log(`\n📊 Done! ${allUrls.length} URLs across ${sitemapFiles.length} sitemaps\n`);
}

main();
