import Link from 'next/link';
import services from '@/data/services';
import cities from '@/data/cities';
import siteConfig from '@/data/site-config';
import { getServiceCityContent } from '@/lib/content';
import Breadcrumbs from '@/components/Breadcrumbs';
import { ArticleSchema, LocalBusinessSchema, BreadcrumbSchema } from '@/components/JsonLd';

// Generate all service × city combinations at build time
export function generateStaticParams() {
  const params = [];
  for (const service of services) {
    for (const city of cities) {
      params.push({ service: service.slug, city: city.slug });
    }
  }
  return params;
}

// Generate metadata for each page
export function generateMetadata({ params }) {
  const service = services.find(s => s.slug === params.service);
  const city = cities.find(c => c.slug === params.city);
  if (!service || !city) return {};

  const content = getServiceCityContent(service, city);
  return {
    title: content.metaTitle || `${service.title} in ${city.name}, FL`,
    description: content.metaDescription || `${service.title} near ${city.name}, FL. Expert care at ${siteConfig.siteName}. Call ${siteConfig.phone}.`,
    openGraph: {
      title: content.metaTitle,
      description: content.metaDescription,
      url: `${siteConfig.siteUrl}/${service.slug}/${city.slug}/`,
      type: 'article',
    },
  };
}

export default function ServiceCityPage({ params }) {
  const service = services.find(s => s.slug === params.service);
  const city = cities.find(c => c.slug === params.city);

  if (!service || !city) return <div>Page not found</div>;

  const content = getServiceCityContent(service, city);
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: service.title, href: `/${service.slug}/coral-springs/` },
    { label: city.name },
  ];

  // Related services (same category)
  const relatedServices = services
    .filter(s => s.category === service.category && s.slug !== service.slug)
    .slice(0, 5);

  // Nearby cities
  const nearbyCities = cities.filter(c => c.slug !== city.slug).slice(0, 8);

  return (
    <>
      <ArticleSchema
        title={content.title}
        description={content.metaDescription}
        author={content.authorName}
        url={`${siteConfig.siteUrl}/${service.slug}/${city.slug}/`}
      />
      <LocalBusinessSchema city={city} />
      <BreadcrumbSchema items={breadcrumbs} />

      <article className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs items={breadcrumbs} />
        
        <h1 className="text-3xl md:text-4xl font-bold text-brand-primary mb-6">
          {content.title}
        </h1>

        {/* Author & meta */}
        <div className="flex items-center gap-4 mb-8 text-sm text-gray-500 border-b border-gray-200 pb-4">
          <span>By <strong className="text-gray-700">{content.authorName}</strong></span>
          <span>•</span>
          <span>{siteConfig.siteName}</span>
          <span>•</span>
          <span>{city.name}, FL</span>
        </div>

        {/* Quick CTA */}
        <div className="bg-brand-light border-l-4 border-brand-accent p-4 mb-8 rounded-r-lg">
          <p className="text-brand-dark font-semibold">
            📞 Ready to schedule? Call <a href={`tel:${siteConfig.phone}`} className="text-brand-secondary underline">{siteConfig.phone}</a> or{' '}
            <a href={`${siteConfig.mainSiteUrl}/contact-us`} className="text-brand-secondary underline">request an appointment online</a>.
          </p>
        </div>

        {/* Main content */}
        <div className="blog-content" dangerouslySetInnerHTML={{ __html: content.html }} />

        {/* Cost page link */}
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 my-8 text-center">
          <p className="text-lg font-semibold text-brand-primary mb-2">
            Wondering about pricing?
          </p>
          <Link
            href={`/cost/${service.slug}/${city.slug}/`}
            className="text-brand-secondary underline font-medium hover:text-brand-primary"
          >
            View {service.title} costs for {city.name} patients →
          </Link>
        </div>
      </article>

      {/* Sidebar-style sections */}
      <div className="max-w-4xl mx-auto px-4 pb-12">
        {/* Internal links: same service, other cities */}
        <div className="bg-brand-light rounded-xl p-6 mb-8">
          <h2 className="text-xl font-bold text-brand-primary mb-4">
            {service.title} — Other Areas We Serve
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {nearbyCities.map(c => (
              <Link
                key={c.slug}
                href={`/${service.slug}/${c.slug}/`}
                className="bg-white border border-gray-200 rounded px-3 py-2 text-sm text-brand-primary hover:bg-brand-primary hover:text-white transition-colors text-center"
              >
                {c.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Internal links: other services, same city */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h2 className="text-xl font-bold text-brand-primary mb-4">
            More Dental Services in {city.name}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {relatedServices.map(s => (
              <Link
                key={s.slug}
                href={`/${s.slug}/${city.slug}/`}
                className="text-brand-secondary hover:text-brand-primary hover:underline text-sm py-1"
              >
                {s.title} in {city.name} →
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
