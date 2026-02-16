import Link from 'next/link';
import siteConfig from '@/data/site-config';
import services from '@/data/services';
import cities from '@/data/cities';
import { LocalBusinessSchema } from '@/components/JsonLd';

export const metadata = {
  title: `Dental Care Blog | ${siteConfig.siteName}`,
  description: siteConfig.seo.defaultDescription,
};

// Group services by category
function groupByCategory(items) {
  const groups = {};
  for (const item of items) {
    if (!groups[item.category]) groups[item.category] = [];
    groups[item.category].push(item);
  }
  return groups;
}

const categoryLabels = {
  implants: '🦷 Dental Implants',
  surgery: '🔬 Oral Surgery',
  restorative: '👑 Crowns & Bridges',
  cosmetic: '✨ Cosmetic Dentistry',
  sedation: '😴 Sedation Dentistry',
  periodontal: '🩺 Periodontal Care',
  dentures: '🦷 Dentures',
  general: '🏥 General Dentistry',
  orthodontics: '📐 Orthodontics',
  technology: '💻 Dental Technology',
  spanish: '🇪🇸 En Español',
};

export default function HomePage() {
  const grouped = groupByCategory(services);

  return (
    <>
      <LocalBusinessSchema />
      
      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-dark to-brand-primary text-white py-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Expert Dental Care in South Florida
          </h1>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Board-certified specialists, Yomi Robot technology, and an in-house lab — 
            find the dental information you need for your smile transformation.
          </p>
          <a href={`tel:${siteConfig.phone}`} className="inline-block bg-brand-accent text-brand-dark px-8 py-4 rounded-full font-bold text-lg hover:bg-yellow-400 transition-colors">
            📞 Call {siteConfig.phone}
          </a>
        </div>
      </section>

      {/* Services Index */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-brand-primary mb-8 text-center">Browse by Service</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(grouped).map(([category, items]) => (
            <div key={category} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold text-brand-primary mb-4">
                {categoryLabels[category] || category}
              </h3>
              <ul className="space-y-2">
                {items.map(service => (
                  <li key={service.slug}>
                    <Link 
                      href={`/${service.slug}/coral-springs/`}
                      className="text-brand-secondary hover:text-brand-primary hover:underline text-sm"
                    >
                      {service.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Cities Index */}
      <section className="bg-brand-light py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-brand-primary mb-8 text-center">Areas We Serve</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {cities.map(city => (
              <Link 
                key={city.slug} 
                href={`/dental-implants/${city.slug}/`}
                className="bg-white border border-gray-200 rounded-lg px-4 py-3 text-center text-sm text-brand-primary hover:bg-brand-primary hover:text-white transition-colors font-medium"
              >
                {city.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="max-w-4xl mx-auto px-4 py-12 text-center">
        <h2 className="text-3xl font-bold text-brand-primary mb-4">About {siteConfig.siteName}</h2>
        <p className="text-lg text-gray-600 mb-6">
          At {siteConfig.siteName}, our board-certified specialists use cutting-edge technology — 
          including the Yomi Robot for guided implant surgery — to deliver exceptional dental care. 
          With an in-house laboratory and 6 Florida locations, we make world-class dentistry accessible.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href={`${siteConfig.mainSiteUrl}/about-us/doctors`} className="text-brand-secondary hover:underline font-semibold">
            Meet Our Doctors →
          </a>
          <a href={`${siteConfig.mainSiteUrl}/about-us/the-yomi-robot`} className="text-brand-secondary hover:underline font-semibold">
            Learn About the Yomi Robot →
          </a>
        </div>
      </section>
    </>
  );
}
