import siteConfig from '@/data/site-config';

export function LocalBusinessSchema({ city }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Dentist',
    name: siteConfig.siteName,
    image: `${siteConfig.mainSiteUrl}/images/logo.png`,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    url: siteConfig.mainSiteUrl,
    address: {
      '@type': 'PostalAddress',
      streetAddress: '5551 N University Dr #203',
      addressLocality: 'Coral Springs',
      addressRegion: 'FL',
      postalCode: '33067',
      addressCountry: 'US',
    },
    areaServed: city ? {
      '@type': 'City',
      name: city.name,
      containedInPlace: { '@type': 'State', name: 'Florida' },
    } : undefined,
    priceRange: '$$',
    openingHoursSpecification: [
      { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '09:00', closes: '17:00' },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ArticleSchema({ title, description, author, datePublished, url }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    headline: title,
    description: description,
    author: {
      '@type': 'Person',
      name: author,
      jobTitle: 'Dentist',
      worksFor: { '@type': 'Dentist', name: siteConfig.siteName },
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.siteName,
      url: siteConfig.mainSiteUrl,
    },
    datePublished: datePublished || '2026-02-16',
    dateModified: new Date().toISOString().split('T')[0],
    mainEntityOfPage: url,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function BreadcrumbSchema({ items }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.label,
      item: item.href ? `${siteConfig.siteUrl}${item.href}` : undefined,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function FAQSchema({ faqs }) {
  if (!faqs || faqs.length === 0) return null;
  
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
