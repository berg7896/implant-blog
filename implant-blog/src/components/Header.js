import Link from 'next/link';
import siteConfig from '@/data/site-config';

export default function Header() {
  return (
    <header className="bg-brand-dark text-white">
      {/* Top bar */}
      <div className="bg-brand-accent text-brand-dark text-center py-2 px-4 text-sm font-semibold">
        📞 Call Now for a Free Consultation: <a href={`tel:${siteConfig.phone}`} className="underline">{siteConfig.phone}</a>
      </div>
      
      {/* Main nav */}
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div>
            <div className="text-xl font-bold">Implant Center</div>
            <div className="text-xs text-gray-300">of Coral Springs</div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/" className="hover:text-brand-accent transition-colors">Home</Link>
          <a href={`${siteConfig.mainSiteUrl}/services`} className="hover:text-brand-accent transition-colors">Services</a>
          <a href={`${siteConfig.mainSiteUrl}/about-us/doctors`} className="hover:text-brand-accent transition-colors">Our Doctors</a>
          <a href={`${siteConfig.mainSiteUrl}/financing`} className="hover:text-brand-accent transition-colors">Financing</a>
          <a href={`${siteConfig.mainSiteUrl}/contact-us`} className="bg-brand-accent text-brand-dark px-5 py-2 rounded-full font-bold hover:bg-yellow-400 transition-colors">
            Book Appointment
          </a>
        </nav>

        {/* Mobile CTA */}
        <a href={`tel:${siteConfig.phone}`} className="md:hidden bg-brand-accent text-brand-dark px-4 py-2 rounded-full font-bold text-sm">
          Call Now
        </a>
      </div>
    </header>
  );
}
