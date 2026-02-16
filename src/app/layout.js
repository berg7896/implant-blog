import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import siteConfig from '@/data/site-config';

export const metadata = {
  title: {
    default: `Dental Blog | ${siteConfig.siteName}`,
    template: `%s | ${siteConfig.siteName}`,
  },
  description: siteConfig.seo.defaultDescription,
  metadataBase: new URL(siteConfig.siteUrl),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: siteConfig.siteName,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
