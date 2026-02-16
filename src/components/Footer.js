import Link from 'next/link';
import siteConfig from '@/data/site-config';

export default function Footer() {
  return (
    <footer className="bg-brand-dark text-gray-300">
      {/* CTA Banner */}
      <div className="bg-brand-primary text-white py-10 px-4 text-center">
        <h2 className="text-3xl font-bold mb-3 text-white">Ready to Transform Your Smile?</h2>
        <p className="text-lg mb-6 text-blue-100">Schedule your free consultation today</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href={`tel:${siteConfig.phone}`} className="bg-brand-accent text-brand-dark px-8 py-3 rounded-full font-bold text-lg hover:bg-yellow-400 transition-colors">
            📞 {siteConfig.phone}
          </a>
          <a href={`${siteConfig.mainSiteUrl}/contact-us`} className="bg-white text-brand-primary px-8 py-3 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors">
            Request Appointment
          </a>
        </div>
      </div>

      {/* Footer content */}
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About */}
        <div>
          <img 
            src="https://irp.cdn-website.com/95237112/dms3rep/multi/implant-center-coral-springs.svg" 
            alt="Implant Center of Coral Springs" 
            className="h-10 w-auto mb-4 brightness-0 invert"
          />
          <p className="text-sm leading-relaxed mb-4">
            Expert dental implant care with board-certified specialists, Yomi Robot technology, 
            and an in-house laboratory. Serving South Florida with 5 convenient locations.
          </p>
          <p className="text-sm">
            <a href={`tel:${siteConfig.phone}`} className="text-brand-accent hover:underline">{siteConfig.phone}</a>
          </p>
        </div>

        {/* Office Locations */}
        <div>
          <h3 className="text-white font-bold text-lg mb-4">Our Locations</h3>
          <ul className="text-sm space-y-2">
            {siteConfig.offices.map(office => (
              <li key={office.slug}>
                <span className="text-brand-accent">●</span> {office.name} — {office.address}
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-bold text-lg mb-4">Popular Services</h3>
          <ul className="text-sm space-y-2">
            <li><Link href="/dental-implants/coral-springs/" className="hover:text-brand-accent">Dental Implants</Link></li>
            <li><Link href="/all-on-4-dental-implants/coral-springs/" className="hover:text-brand-accent">All-on-4 Implants</Link></li>
            <li><Link href="/porcelain-veneers/coral-springs/" className="hover:text-brand-accent">Porcelain Veneers</Link></li>
            <li><Link href="/wisdom-tooth-removal/coral-springs/" className="hover:text-brand-accent">Wisdom Teeth</Link></li>
            <li><Link href="/sedation-dentistry/coral-springs/" className="hover:text-brand-accent">Sedation Dentistry</Link></li>
            <li><Link href="/emergency-dentist/coral-springs/" className="hover:text-brand-accent">Emergency Dentist</Link></li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-700 py-4 px-4 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} {siteConfig.siteName}. All rights reserved. |{' '}
        <a href={`${siteConfig.mainSiteUrl}/privacy`} className="hover:text-gray-300">Privacy Policy</a> |{' '}
        <a href={`${siteConfig.mainSiteUrl}/disclaimer`} className="hover:text-gray-300">Disclaimer</a>
      </div>
    </footer>
  );
}
