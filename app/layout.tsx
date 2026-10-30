import type { Metadata, Viewport } from 'next';
import './globals.css';

// Netlify da en URL la dirección principal del sitio (el dominio propio cuando esté conectado).
const SITE = process.env.URL || 'https://rumboagencia.info';

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: { default: 'Rumbo · Agencia de marketing', template: '%s · Rumbo' },
  description: 'Agencia de marketing: vamos a tu negocio, lo grabamos y lo publicamos en tus redes y en Google para que te lleguen más clientes.',
  icons: { icon: '/img/favicon-32.png', apple: '/img/apple-touch-icon.png' },
  openGraph: {
    type: 'website', locale: 'es_ES', siteName: 'Rumbo', url: SITE + '/',
    title: 'Rumbo · Agencia de marketing',
    description: 'Vamos a tu negocio, lo grabamos y lo publicamos para que te lleguen más clientes.',
    images: [{ url: '/img/og-rumbo.jpg', width: 1200, height: 630, alt: 'Rumbo, agencia de marketing' }],
  },
  twitter: { card: 'summary_large_image' },
};

export const viewport: Viewport = { themeColor: '#ffffff', width: 'device-width', initialScale: 1, viewportFit: 'cover' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <link rel="preload" href="/fonts/generalsans-400.woff2" as="font" type="font/woff2" crossOrigin="" />
        <link rel="preload" href="/fonts/switzer-800.woff2" as="font" type="font/woff2" crossOrigin="" />
      </head>
      <body>
        <a href="#contenido" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[90] focus:rounded-full focus:bg-naranja focus:px-4 focus:py-3 focus:text-ink">Saltar al contenido</a>
        {children}
      </body>
    </html>
  );
}
