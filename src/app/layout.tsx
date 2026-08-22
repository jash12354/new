import type { Metadata, Viewport } from 'next';
import './globals.css';
import { BRAND_INFO } from '@/data/brandData';

export const viewport: Viewport = {
  themeColor: '#1D0B05',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: {
    default: `${BRAND_INFO.name} | Premium Bridal & Wedding Henna Artistry Surat`,
    template: `%s | ${BRAND_INFO.name}`,
  },
  description:
    'Hasti Henna offers luxury bridal mehndi, wedding henna services, professional mehndi courses & organic henna cones in Surat, Gujarat & across India.',
  keywords: [
    'Hasti Henna',
    'Mehndi artist Surat',
    'Bridal mehndi Surat',
    'Bridal mehndi artist Gujarat',
    'Wedding mehndi artist Surat',
    'Mehndi artist Gujarat',
    'Mehndi artist India',
    'Bridal mehndi booking',
    'Professional mehndi artist',
    'Mehndi classes Surat',
    'Mehndi academy Surat',
    'Organic Henna Cones',
  ],
  authors: [{ name: 'Hasti Henna' }],
  creator: 'Hasti Henna',
  metadataBase: new URL('https://hastihenna.com'),
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://hastihenna.com',
    title: `${BRAND_INFO.name} | Premium Bridal & Wedding Henna Artistry Surat`,
    description:
      'Luxury bridal mehndi, wedding henna services, professional mehndi academy & organic henna cones based in Surat, Gujarat serving across India.',
    siteName: BRAND_INFO.name,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&q=80&w=1200',
        width: 1200,
        height: 630,
        alt: 'Hasti Henna Bridal Artistry',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: BRAND_INFO.name,
    description: BRAND_INFO.subheading,
    images: ['https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&q=80&w=1200'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: BRAND_INFO.name,
    image: 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&q=80&w=1200',
    '@id': 'https://hastihenna.com',
    url: 'https://hastihenna.com',
    telephone: '+917573927521',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Surat',
      addressRegion: 'Gujarat',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 21.1702,
      longitude: 72.8311,
    },
    areaServed: {
      '@type': 'Country',
      name: 'India',
    },
    priceRange: '₹600 - ₹14,000',
    sameAs: [BRAND_INFO.instagramUrl],
  };

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Plus+Jakarta+Sans:ital,wght@0,300..800;1,300..800&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased bg-cream-50 text-mehndi-950">
        {children}
      </body>
    </html>
  );
}
