import Link from 'next/link';
import services from '@/data/services';
import cities from '@/data/cities';
import siteConfig from '@/data/site-config';
import { getCostContent } from '@/lib/content';
import Breadcrumbs from '@/components/Breadcrumbs';
import { ArticleSchema, LocalBusinessSchema, BreadcrumbSchema } from '@/components/JsonLd';

// Only generate cost pages for high-value service categories
const costCategories = ['implants', 'surgery', 'restorative', 'cosmetic', 'sedation', 'dentures'];

export function generateStaticParams() {
  const params = [];
  const costServices = services.filter(s => costCategories.includes(s.category));
  for (const service of costServices) {
    for (const city of cities) {
      params.push({ service: service.slug, city: city.slug });
    }
  }
  return params;
}

export function generateMetadata({ params }) {
  const service = services.find(s => s.slug === params.service);
  const city = cities.find(c => c.slug === params.city);
  if (!service || !city) return {};

  const content = getCostContent(service, city);
  return {
    title: content.metaTitle || `Cost of ${service.title} in ${city.name}, FL`,
    description: content.metaDescription,
    openGraph: {
      title: content.metaTitle,
      description: content.metaDescription,
      url: `${siteConfig.siteUrl}/cost/${service.slug}/${city.slug}/`,
      type: 'article',
    },
  };
}

export default function CostPage({ params }) {
  const service = services.find(s => s.slug === params.service);
  const city = cities.find(c => c.slug === params.city);

  if (!service || !city) return <div>Page not found</div>;

  const content = getCostContent(service, city);
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: service.title, href: `/${service.slug}/coral-springs/` },
    { label: `Cost in ${city.name}` },
  ];

  return (
    <>
      <ArticleSchema
        title={content.title}
        description={content.metaDescription}
        author={content.authorName}
        url={`${siteConfig.siteUrl}/cost/${service.slug}/${city.slug}/`}
      />
      <LocalBusinessSchema city={city} />
      <BreadcrumbSchema items={breadcrumbs} />

      <article className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs items={breadcrumbs} />
        
        <h1 className="text-3xl md:text-4xl font-bold text-brand-primary mb-6">
          {content.title}
        </h1>

        <div className="flex items-center gap-4 mb-8 text-sm text-gray-500 border-b border-gray-200 pb-4">
          <span>By <strong className="text-gray-700">{content.authorName}</strong></span>
          <span>•</span>
          <span>{siteConfig.siteName}</span>
        </div>

        {/* Financing CTA */}
        <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-8 rounded-r-lg">
          <p className="text-green-800 font-semibold">
            💰 Flexible financing available! Call <a href={`tel:${siteConfig.phone}`} className="underline">{siteConfig.phone}</a> for a personalized quote.
          </p>
        </div>

        {/* Main content */}
        <div className="blog-content" dangerouslySetInnerHTML={{ __html: content.html }} />

        {/* Link back to service page */}
        <div className="bg-brand-light border border-brand-secondary/20 rounded-xl p-6 my-8 text-center">
          <p className="text-lg font-semibold text-brand-primary mb-2">
            Learn more about the procedure
          </p>
          <Link
            href={`/${service.slug}/${city.slug}/`}
            className="text-brand-secondary underline font-medium hover:text-brand-primary"
          >
            ← {service.title} in {city.name} — Full Guide
          </Link>
        </div>
      </article>

      {/* Other cities pricing */}
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <div className="bg-brand-light rounded-xl p-6">
          <h2 className="text-xl font-bold text-brand-primary mb-4">
            {service.title} Pricing — Other Areas
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {cities.filter(c => c.slug !== city.slug).slice(0, 8).map(c => (
              <Link
                key={c.slug}
                href={`/cost/${service.slug}/${c.slug}/`}
                className="bg-white border border-gray-200 rounded px-3 py-2 text-sm text-brand-primary hover:bg-brand-primary hover:text-white transition-colors text-center"
              >
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
