// ============================================================
// SITE CONFIGURATION - Practice info, office locations, branding
// ============================================================

const siteConfig = {
  siteName: 'Implant Center of Coral Springs',
  siteUrl: 'https://blog.implantcenterofcoralsprings.com',
  mainSiteUrl: 'https://www.implantcenterofcoralsprings.com',
  phone: '954-361-0464',
  email: 'info@implantcenterofmiami.com',

  // All office locations (for lead routing)
  offices: [
    { name: 'Coral Springs', address: '5551 N University Dr #203, Coral Springs, FL 33067', phone: '954-361-0464', slug: 'coral-springs' },
    { name: 'Sunrise', address: 'Sunrise, FL', phone: '954-361-0464', slug: 'sunrise' },
    { name: 'Bay Harbor', address: 'Bay Harbor Islands, FL', phone: '305-868-4000', slug: 'bay-harbor' },
    { name: 'Coral Gables', address: 'Coral Gables, FL', phone: '305-868-4000', slug: 'coral-gables' },
    { name: 'Pompano Beach', address: 'Pompano Beach, FL', phone: '954-361-0464', slug: 'pompano-beach' },
  ],

  doctors: [
    { name: 'Dr. Jennifer Schaumberg', title: 'Board Certified Oral & Maxillofacial Surgeon', slug: 'dr-schaumberg' },
    { name: 'Dr. Tatiana Herzog', title: 'Board Certified Implantologist', slug: 'dr-herzog' },
  ],

  differentiators: [
    'Yomi Robot-assisted implant surgery (first and only FDA-approved robotic system)',
    'In-house dental laboratory for fast, precise restorations',
    'Board-certified oral surgeon and implantologist',
    'Flexible financing — pay over time',
    '5 convenient Florida locations',
    'Serving patients from across the United States',
  ],

  // SEO defaults
  seo: {
    titleSuffix: ' | Implant Center of Coral Springs',
    defaultDescription: 'Expert dental implant care in Coral Springs, FL. Board-certified oral surgeon, Yomi Robot technology, and in-house lab. Call 954-361-0464.',
  },
};

module.exports = siteConfig;
