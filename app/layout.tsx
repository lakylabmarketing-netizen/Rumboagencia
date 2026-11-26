import type { Metadata, Viewport } from 'next';
import './globals.css';

// Netlify da en URL la dirección principal del sitio (el dominio propio cuando esté conectado).
const SITE = process.env.URL || 'https://rumboagencia.info';

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: { default: 'Rumbo · Marketing para bares en Roquetas de Mar', template: '%s · Rumbo' },
  description: 'Marketing para bares de Roquetas de Mar: en invierno tu bar no tiene por qué estar vacío. Grabamos tu bar y lo movemos en redes y en Google.',
  icons: { icon: '/img/favicon-32.png', apple: '/img/apple-touch-icon.png' },
  openGraph: {
    type: 'website', locale: 'es_ES', siteName: 'Rumbo', url: SITE + '/',
    title: 'Rumbo · Marketing para bares en Roquetas de Mar',
    description: 'En invierno tu bar no tiene por qué estar vacío. Marketing para bares de Roquetas de Mar.',
    images: [{ url: '/img/og-rumbo.jpg', width: 1200, height: 630, alt: 'Rumbo, marketing para bares en Roquetas de Mar' }],
  },
  twitter: { card: 'summary_large_image' },
};

export const viewport: Viewport = { themeColor: '#0A0A0A', width: 'device-width', initialScale: 1, viewportFit: 'cover' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <link rel="preload" href="/fonts/generalsans-400.woff2" as="font" type="font/woff2" crossOrigin="" />
        <link rel="preload" href="/fonts/generalsans-600.woff2" as="font" type="font/woff2" crossOrigin="" />
      </head>
      <body>
        <a href="#contenido" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[90] focus:rounded-full focus:bg-naranja focus:px-4 focus:py-3 focus:text-ink">Saltar al contenido</a>
        {children}
      </body>
    </html>
  );
}
