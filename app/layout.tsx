import type { Metadata, Viewport } from 'next';
import './globals.css';
import Cursor from '@/components/Cursor';

// Netlify da en URL la dirección principal del sitio (el dominio propio cuando esté conectado).
const SITE = process.env.URL || 'https://rumboagencia.info';

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: { default: 'Rumbo · Agencia de marketing en Almería', template: '%s · Rumbo' },
  description: 'Agencia de marketing para todo tipo de negocios en Almería. Redes sociales, Google y reseñas, página web y asesoría.',
  icons: { icon: '/img/favicon-32.png', apple: '/img/apple-touch-icon.png' },
  openGraph: {
    type: 'website', locale: 'es_ES', siteName: 'Rumbo', url: SITE + '/',
    title: 'Rumbo · Agencia de marketing en Almería',
    description: 'Marketing para todo tipo de negocios de Almería y provincia: redes, Google, web y asesoría.',
    images: [{ url: '/img/og-rumbo.jpg', width: 1200, height: 630, alt: 'Rumbo, agencia de marketing en Almería' }],
  },
  twitter: { card: 'summary_large_image' },
};

export const viewport: Viewport = { themeColor: '#070707', width: 'device-width', initialScale: 1, viewportFit: 'cover' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <link rel="preload" href="/fonts/inter-latin.woff2" as="font" type="font/woff2" crossOrigin="" />
      </head>
      <body>
        <a href="#contenido" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[90] focus:rounded-full focus:bg-naranja focus:px-4 focus:py-3 focus:text-ink">Saltar al contenido</a>
        {children}
        <Cursor />
      </body>
    </html>
  );
}
