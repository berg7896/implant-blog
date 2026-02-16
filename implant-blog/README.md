# Implant Center Blog — Programmatic SEO Site

**blog.implantcenterofcoralsprings.com**

Next.js static site generating **5,300+ pages** covering 70 dental services × 42 South Florida cities. Same playbook as CostWhale.

## Page Count

| Type | Formula | Pages |
|------|---------|-------|
| Service × City | 70 services × 42 cities | 2,940 |
| Cost × City | 55 services × 42 cities | 2,310 |
| Home | 1 | 1 |
| **TOTAL** | | **~5,251** |

## Quick Start

```powershell
# 1. Open in Cursor
cd C:\Users\berg7\Desktop\implant-blog

# 2. Install deps
npm install

# 3. See page count
npm run count

# 4. Run dev server (uses template content - no AI needed yet)
npm run dev
# Opens at localhost:3000 with all 5,251 pages working

# 5. Generate AI content (when ready - requires Anthropic API key)
# Set your key first:
$env:ANTHROPIC_API_KEY = "sk-ant-..."
# Generate first 50 as a test:
node scripts/generate-content.js --batch 0 50
# Generate a specific service across all cities:
node scripts/generate-content.js --service dental-implants
# Generate everything:
npm run generate

# 6. Build static site
npm run build

# 7. Generate sitemaps
npm run sitemaps

# 8. Deploy to Netlify
# Push to GitHub, connect repo in Netlify
```

## How It Works

1. **Template content** is built-in — every page works immediately without AI generation. The templates use service/city data to create unique but formulaic content.

2. **AI content** (optional but recommended) replaces templates with truly unique, high-quality articles. Generated via Anthropic API and saved as JSON files in `/content/`.

3. **At build time**, Next.js checks for AI content first, falls back to template content. This means you can deploy immediately and upgrade content over time.

## DNS Setup

Add a CNAME record in your domain registrar:

```
blog.implantcenterofcoralsprings.com → your-netlify-site.netlify.app
```

Then set the custom domain in Netlify dashboard.

## Project Structure

```
implant-blog/
├── src/
│   ├── app/
│   │   ├── layout.js              Root layout (header + footer)
│   │   ├── page.js                Home page (service/city index)
│   │   ├── [service]/[city]/      /dental-implants/parkland/
│   │   │   └── page.js            Service × City page
│   │   └── cost/[service]/[city]/ /cost/dental-implants/parkland/
│   │       └── page.js            Cost page
│   ├── components/
│   │   ├── Header.js              Branded header with CTA
│   │   ├── Footer.js              Footer with locations + CTA
│   │   ├── Breadcrumbs.js         SEO breadcrumbs
│   │   └── JsonLd.js              Structured data (LocalBusiness, Article, FAQ, Breadcrumb)
│   ├── data/
│   │   ├── services.js            75 dental services
│   │   ├── cities.js              42 South Florida cities
│   │   └── site-config.js         Practice info, office locations
│   └── lib/
│       └── content.js             Content loader (AI → template fallback)
├── content/                       AI-generated content (JSON files)
├── scripts/
│   ├── generate-content.js        AI content generator
│   ├── generate-sitemaps.js       Sitemap generator
│   └── count-pages.js             Page counter
├── public/                        Static assets, sitemaps, robots.txt
├── next.config.js                 Static export config
├── netlify.toml                   Netlify deploy config
└── tailwind.config.js             Brand colors + styling
```

## SEO Features

- JSON-LD structured data on every page (LocalBusiness, MedicalWebPage, BreadcrumbList)
- Unique meta titles and descriptions per page
- Internal linking between related services and cities
- Sitemap index with multiple sitemaps (max 5000 URLs each)
- robots.txt with sitemap reference
- Breadcrumb navigation
- Cross-links to main practice site for appointments

## Estimated Costs

- **Anthropic API**: ~$130-180 for all 5,251 pages (Claude Sonnet)
- **Netlify**: Free tier (100GB bandwidth/month)
- **Generation time**: ~3.5 hours for all pages
- **Build time**: ~5-10 minutes on Netlify
