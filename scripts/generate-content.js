#!/usr/bin/env node
// ============================================================
// CONTENT GENERATOR
// Generates unique AI content for each service × city page
// Saves to /content directory as individual JSON files
//
// Usage:
//   node scripts/generate-content.js                    Generate all
//   node scripts/generate-content.js --batch 0 50       Generate pages 0-49
//   node scripts/generate-content.js --service dental-implants  Generate one service × all cities
// ============================================================

const Anthropic = require('@anthropic-ai/sdk');
const fs = require('fs');
const path = require('path');

// ---- CONFIG ----
const API_KEY = process.env.ANTHROPIC_API_KEY || 'YOUR_KEY_HERE';
const MODEL = 'claude-sonnet-4-20250514';
const DELAY_MS = 1500; // Between API calls
const CONTENT_DIR = path.join(__dirname, '..', 'content');

// Load data
const services = require('../src/data/services');
const cities = require('../src/data/cities');
const siteConfig = require('../src/data/site-config');

const client = new Anthropic({ apiKey: API_KEY });

if (!fs.existsSync(CONTENT_DIR)) fs.mkdirSync(CONTENT_DIR, { recursive: true });

// ---- BUILD PAGE MATRIX ----
function buildMatrix() {
  const pages = [];
  const mainServices = services.filter(s => s.category !== 'spanish');
  const costCategories = ['implants', 'surgery', 'restorative', 'cosmetic', 'sedation', 'dentures'];

  // Service × City
  for (const svc of mainServices) {
    for (const city of cities) {
      pages.push({ service: svc, city, type: 'service' });
    }
  }

  // Cost × City
  for (const svc of mainServices.filter(s => costCategories.includes(s.category))) {
    for (const city of cities) {
      pages.push({ service: svc, city, type: 'cost' });
    }
  }

  return pages;
}

// ---- GENERATE A SINGLE PAGE ----
async function generatePage(service, city, type) {
  const doctor = siteConfig.doctors[Math.floor(Math.random() * siteConfig.doctors.length)];
  
  const prompt = type === 'cost'
    ? buildCostPrompt(service, city, doctor)
    : buildServicePrompt(service, city, doctor);

  const response = await client.messages.create({
    model: MODEL,
    max_tokens: 2000,
    messages: [{ role: 'user', content: prompt }],
  });

  const raw = response.content[0].text;
  const cleaned = raw.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();
  const parsed = JSON.parse(cleaned);

  return {
    slug: type === 'cost' ? `cost-of-${service.slug}-${city.slug}` : `${service.slug}-${city.slug}`,
    title: parsed.title,
    metaTitle: parsed.metaTitle,
    metaDescription: parsed.metaDescription,
    html: parsed.html,
    authorName: doctor.name,
    generatedAt: new Date().toISOString(),
  };
}

function buildServicePrompt(service, city, doctor) {
  return `You are writing a dental practice blog post for SEO. Write a UNIQUE, informative, patient-friendly article.

PRACTICE: ${siteConfig.siteName}
ADDRESS: ${siteConfig.offices[0].address}
PHONE: ${siteConfig.phone}
DOCTOR: ${doctor.name}, ${doctor.title}
SERVICE: ${service.title} — ${service.desc}
TARGET CITY: ${city.name}, FL (${city.county} County)
DISTANCE: ${city.distance} drive
NEARBY: ${city.nearby}

KEY DIFFERENTIATORS:
${siteConfig.differentiators.map(d => `- ${d}`).join('\n')}

WRITE:
1. Title with "${service.title}" + "${city.name}" (e.g. "Expert ${service.title} Near ${city.name}, FL")
2. metaTitle (60 chars max)
3. metaDescription (155 chars max, include CTA)
4. 800-1200 words of UNIQUE HTML content with h2, h3, p, ul, li, strong
5. Mention ${city.name} naturally 3-5 times
6. Include procedure details, benefits, recovery info
7. Reference ${doctor.name} and credentials
8. 3-4 FAQ questions with answers
9. End with CTA including phone ${siteConfig.phone}
10. Warm, professional, patient-friendly tone. No filler.

Respond with ONLY valid JSON (no markdown fences):
{"title":"...","metaTitle":"...","metaDescription":"...","html":"..."}`;
}

function buildCostPrompt(service, city, doctor) {
  return `Write a dental COST/PRICING blog post for SEO. Unique, helpful content.

PRACTICE: ${siteConfig.siteName}
PHONE: ${siteConfig.phone}
SERVICE: ${service.title} — ${service.desc}
CITY: ${city.name}, FL (${city.distance} drive)

WRITE:
1. Title about cost: "Cost of ${service.title} in ${city.name}, FL" or similar
2. metaTitle (60 chars max)
3. metaDescription (155 chars max)
4. 600-900 words covering: realistic price ranges, cost factors, why cheap isn't always better, financing options (no insurance accepted but financing available), how to get a personalized quote
5. Include an HTML table with price ranges
6. Mention ${city.name} 2-3 times
7. End with CTA: call ${siteConfig.phone}

Respond with ONLY valid JSON (no markdown fences):
{"title":"...","metaTitle":"...","metaDescription":"...","html":"..."}`;
}

// ---- MAIN ----
async function main() {
  const args = process.argv.slice(2);
  const matrix = buildMatrix();

  let startIdx = 0;
  let count = matrix.length;

  // Parse args
  if (args.includes('--batch')) {
    const bIdx = args.indexOf('--batch');
    startIdx = parseInt(args[bIdx + 1]) || 0;
    count = parseInt(args[bIdx + 2]) || 50;
  }

  if (args.includes('--service')) {
    const sIdx = args.indexOf('--service');
    const serviceSlug = args[sIdx + 1];
    const filtered = matrix.filter(p => p.service.slug === serviceSlug);
    console.log(`Generating ${filtered.length} pages for service: ${serviceSlug}`);
    return runBatch(filtered);
  }

  const batch = matrix.slice(startIdx, startIdx + count);
  console.log(`\n🚀 Generating ${batch.length} pages (${startIdx} to ${startIdx + count - 1} of ${matrix.length} total)\n`);
  await runBatch(batch);
}

async function runBatch(pages) {
  let success = 0, skipped = 0, failed = 0;

  for (let i = 0; i < pages.length; i++) {
    const { service, city, type } = pages[i];
    const slug = type === 'cost' ? `cost-of-${service.slug}-${city.slug}` : `${service.slug}-${city.slug}`;
    const outFile = path.join(CONTENT_DIR, `${slug}.json`);

    // Skip if already exists
    if (fs.existsSync(outFile)) {
      skipped++;
      continue;
    }

    process.stdout.write(`  [${i + 1}/${pages.length}] ${service.title} × ${city.name} (${type})... `);

    try {
      const content = await generatePage(service, city, type);
      fs.writeFileSync(outFile, JSON.stringify(content, null, 2));
      console.log('✅');
      success++;
    } catch (err) {
      console.log(`❌ ${err.message.slice(0, 80)}`);
      failed++;
    }

    await new Promise(r => setTimeout(r, DELAY_MS));
  }

  console.log(`\n📊 Done: ${success} generated, ${skipped} skipped, ${failed} failed`);
}

main().catch(err => {
  console.error('Fatal:', err.message);
  process.exit(1);
});
