// ============================================================
// CONTENT LIBRARY
// Reads pre-generated AI content from /content directory
// Falls back to template-based content if AI content doesn't exist
// ============================================================

const fs = require('fs');
const path = require('path');
const siteConfig = require('../data/site-config');

const CONTENT_DIR = path.join(process.cwd(), 'content');

/**
 * Get content for a service/city page
 * First checks for AI-generated content, then falls back to template
 */
function getServiceCityContent(service, city) {
  const slug = `${service.slug}-${city.slug}`;
  
  // Try AI-generated content first
  const aiContent = loadAIContent(slug);
  if (aiContent) return aiContent;

  // Fallback to template content
  return generateTemplateContent(service, city, 'service');
}

/**
 * Get content for a cost page
 */
function getCostContent(service, city) {
  const slug = `cost-of-${service.slug}-${city.slug}`;
  
  const aiContent = loadAIContent(slug);
  if (aiContent) return aiContent;

  return generateTemplateContent(service, city, 'cost');
}

/**
 * Load AI-generated content from JSON file
 */
function loadAIContent(slug) {
  // Check individual file
  const filePath = path.join(CONTENT_DIR, `${slug}.json`);
  if (fs.existsSync(filePath)) {
    try {
      return JSON.parse(fs.readFileSync(filePath, 'utf8'));
    } catch (e) { /* fall through */ }
  }

  // Check batch files
  const batchDir = CONTENT_DIR;
  if (!fs.existsSync(batchDir)) return null;

  const batchFiles = fs.readdirSync(batchDir).filter(f => f.startsWith('batch-') && f.endsWith('.json'));
  for (const file of batchFiles) {
    try {
      const batch = JSON.parse(fs.readFileSync(path.join(batchDir, file), 'utf8'));
      const found = batch.find(p => p.slug === slug);
      if (found) return found;
    } catch (e) { /* skip bad files */ }
  }

  return null;
}

/**
 * Generate template-based content (used when AI content isn't available yet)
 * This ensures all 5,000+ pages exist even before running the AI generator
 */
function generateTemplateContent(service, city, type) {
  const doctor = siteConfig.doctors[Math.floor(Math.random() * siteConfig.doctors.length)];
  const office = findNearestOffice(city);

  if (type === 'cost') {
    return buildCostTemplate(service, city, doctor, office);
  }
  return buildServiceTemplate(service, city, doctor, office);
}

function buildServiceTemplate(service, city, doctor, office) {
  const title = `${service.title} Near ${city.name}, FL`;
  const metaTitle = `${service.title} ${city.name} FL | ${siteConfig.siteName}`.slice(0, 60);
  const metaDescription = `Looking for ${service.title.toLowerCase()} near ${city.name}? ${siteConfig.siteName} offers expert care with ${doctor.name}. Call ${siteConfig.phone} today.`.slice(0, 155);

  const html = `
<h2>Expert ${service.title} for ${city.name} Residents</h2>
<p>If you live in ${city.name}, FL and need ${service.title.toLowerCase()}, ${siteConfig.siteName} is just a ${city.distance} drive away. Our practice, located at ${office.address}, provides comprehensive ${service.desc} using the latest dental technology.</p>

<h2>Why Choose ${siteConfig.siteName} for ${service.title}?</h2>
<p>${doctor.name}, ${doctor.title}, leads our team in providing exceptional ${service.title.toLowerCase()} care. With years of specialized training and experience, ${doctor.name.split(' ').pop()} is committed to delivering outstanding results for every patient.</p>

<h3>What Sets Us Apart</h3>
<ul>
${siteConfig.differentiators.map(d => `<li><strong>${d}</strong></li>`).join('\n')}
</ul>

<h2>What to Expect During Your ${service.title} Appointment</h2>
<p>When you visit us from ${city.name}, your experience begins with a comprehensive consultation. We use advanced 3D imaging to create a detailed treatment plan tailored to your specific needs. ${service.desc.charAt(0).toUpperCase() + service.desc.slice(1)} — and our team ensures you understand every step of the process.</p>

<p>We know that traveling from ${city.name} (${city.county} County) for dental care is a commitment. That's why we work efficiently to minimize your number of visits while never compromising on quality. Many of our ${city.name} patients appreciate that the ${city.distance} drive is well worth it for the level of care they receive.</p>

<h2>Financing Options for ${city.name} Patients</h2>
<p>We believe everyone deserves access to quality ${service.title.toLowerCase()}. While we do not accept insurance, we offer flexible financing plans that allow you to spread the cost of treatment over time. Our team will work with you to find a payment solution that fits your budget.</p>

<h2>Frequently Asked Questions</h2>
<h3>How far is ${siteConfig.siteName} from ${city.name}?</h3>
<p>We are located at ${office.address}, approximately a ${city.distance} drive from ${city.name}, FL. We're easily accessible via ${city.nearby || 'major local highways'}.</p>

<h3>Do you accept insurance for ${service.title.toLowerCase()}?</h3>
<p>We do not accept insurance at this time, but we offer affordable financing plans to help make treatment accessible. Contact us to learn about your options.</p>

<h3>How do I schedule a consultation?</h3>
<p>Call us at <a href="tel:${siteConfig.phone}">${siteConfig.phone}</a> or visit our <a href="${siteConfig.mainSiteUrl}/contact-us">contact page</a> to request an appointment. We welcome patients from ${city.name} and throughout ${city.county} County.</p>

<h2>Schedule Your ${service.title} Consultation Today</h2>
<p>Don't wait to get the care you need. Patients from ${city.name} trust ${siteConfig.siteName} for expert ${service.title.toLowerCase()}. Call <a href="tel:${siteConfig.phone}"><strong>${siteConfig.phone}</strong></a> today to schedule your consultation with ${doctor.name}.</p>
`.trim();

  return { title, metaTitle, metaDescription, html, authorName: doctor.name };
}

function buildCostTemplate(service, city, doctor, office) {
  const title = `Cost of ${service.title} in ${city.name}, FL`;
  const metaTitle = `${service.title} Cost ${city.name} FL | Pricing & Financing`.slice(0, 60);
  const metaDescription = `How much does ${service.title.toLowerCase()} cost in ${city.name}? Get pricing info and financing options at ${siteConfig.siteName}. Call ${siteConfig.phone}.`.slice(0, 155);

  const html = `
<h2>How Much Does ${service.title} Cost in ${city.name}?</h2>
<p>If you're researching the cost of ${service.title.toLowerCase()} near ${city.name}, FL, you're making a smart decision by comparing your options. At ${siteConfig.siteName}, we believe in transparent pricing and helping patients understand the factors that influence treatment costs.</p>

<h2>Factors That Affect ${service.title} Pricing</h2>
<p>The cost of ${service.title.toLowerCase()} can vary based on several factors:</p>
<ul>
<li><strong>Complexity of your case</strong> — Every patient's dental needs are unique</li>
<li><strong>Materials used</strong> — Higher-quality materials may cost more but last longer</li>
<li><strong>Sedation requirements</strong> — IV sedation or general anesthesia adds to the cost</li>
<li><strong>Additional procedures</strong> — Bone grafting, extractions, or other preparatory work</li>
<li><strong>Experience of the provider</strong> — Board-certified specialists like ${doctor.name} bring expertise that impacts outcomes</li>
</ul>

<h2>Why Choosing on Price Alone Can Be Risky</h2>
<p>We understand that cost is an important factor for ${city.name} residents considering ${service.title.toLowerCase()}. However, choosing a provider based solely on the lowest price can lead to complications, additional procedures, and ultimately higher costs. ${doctor.name}, ${doctor.title}, uses advanced technology including the Yomi Robot and our in-house laboratory to ensure precision and long-lasting results.</p>

<h2>Financing Options for ${city.name} Patients</h2>
<p>${siteConfig.siteName} does not accept insurance, but we offer flexible financing plans that make ${service.title.toLowerCase()} affordable. Our financing options include:</p>
<ul>
<li>Monthly payment plans with competitive rates</li>
<li>No-interest financing for qualified patients</li>
<li>Multiple term lengths to fit your budget</li>
<li>Quick and easy application process</li>
</ul>

<h2>Get a Personalized Quote</h2>
<p>The best way to know exactly what ${service.title.toLowerCase()} will cost for your specific situation is to schedule a consultation. We're just a ${city.distance} drive from ${city.name}, and our team will provide you with a detailed treatment plan and cost breakdown.</p>

<p>Call <a href="tel:${siteConfig.phone}"><strong>${siteConfig.phone}</strong></a> today to schedule your free consultation at ${siteConfig.siteName}.</p>
`.trim();

  return { title, metaTitle, metaDescription, html, authorName: doctor.name };
}

/**
 * Find the nearest office to a given city
 */
function findNearestOffice(city) {
  // Simple mapping based on geography
  const coralSpringsArea = ['coral-springs', 'coconut-creek', 'parkland', 'margate', 'tamarac',
    'north-lauderdale', 'lauderhill', 'the-crossings', 'country-estates', 'palm-aire', 'hillsboro-pines'];
  const sunriseArea = ['sunrise', 'plantation', 'lauderdale-lakes', 'broadview-park', 'davie', 'cooper-city', 'southwest-ranches', 'weston'];
  const pompanoArea = ['pompano-beach', 'deerfield-beach', 'lighthouse-point', 'boca-raton', 'delray-beach', 'boynton-beach', 'north-andrews-gardens'];

  if (coralSpringsArea.includes(city.slug)) return siteConfig.offices[0]; // Coral Springs
  if (sunriseArea.includes(city.slug)) return siteConfig.offices[1]; // Sunrise
  if (pompanoArea.includes(city.slug)) return siteConfig.offices[4]; // Pompano Beach
  return siteConfig.offices[0]; // Default to Coral Springs
}

module.exports = { getServiceCityContent, getCostContent, loadAIContent };
