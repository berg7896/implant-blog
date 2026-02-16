#!/usr/bin/env node
const services = require('../src/data/services');
const cities = require('../src/data/cities');
const fs = require('fs');
const path = require('path');

const mainServices = services.filter(s => s.category !== 'spanish');
const costCategories = ['implants', 'surgery', 'restorative', 'cosmetic', 'sedation', 'dentures'];
const costServices = mainServices.filter(s => costCategories.includes(s.category));

const serviceCityPages = mainServices.length * cities.length;
const costPages = costServices.length * cities.length;
const total = serviceCityPages + costPages + 1; // +1 for home

console.log('\n📊 IMPLANT BLOG — PAGE COUNT\n');
console.log(`  Services:            ${mainServices.length}`);
console.log(`  Cities:              ${cities.length}`);
console.log(`  Cost-eligible:       ${costServices.length}`);
console.log('');
console.log(`  Service × City:      ${serviceCityPages}`);
console.log(`  Cost × City:         ${costPages}`);
console.log(`  Home page:           1`);
console.log(`  ─────────────────────`);
console.log(`  TOTAL PAGES:         ${total}`);
console.log('');

// Check generated content
const contentDir = path.join(__dirname, '..', 'content');
if (fs.existsSync(contentDir)) {
  const files = fs.readdirSync(contentDir).filter(f => f.endsWith('.json'));
  console.log(`  AI content files:    ${files.length} of ${total - 1}`);
  console.log(`  Remaining:           ${total - 1 - files.length}`);
} else {
  console.log(`  AI content files:    0 (run "npm run generate" first)`);
}

// Cost estimate
const tokensPerPage = 2500;
const inputPerPage = 800;
const cost = ((total * inputPerPage) / 1e6 * 3) + ((total * tokensPerPage) / 1e6 * 15);
console.log(`\n  Est. Anthropic cost: ~$${cost.toFixed(2)} (Sonnet)`);
console.log(`  Est. gen time:       ~${Math.ceil(total * 2.5 / 60)} minutes\n`);
