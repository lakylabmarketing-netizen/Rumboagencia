import type { Metadata, Viewport } from 'next';
import './globals.css';
import Experience from '@/components/Experience';
import Cursor from '@/components/Cursor';
import Intro from '@/components/Intro';
import SiteNav from '@/components/SiteNav';

export const metadata: Metadata = {
  metadataBase: new URL('https://rumboagencia.info'),
  title: 'Rumbo · Marketing para hostelería en Almería',
  description: 'Agencia de marketing para restaurantes en Almería. Contenido en vídeo, gestión de redes, ficha de Google y captación de reseñas.',
  alternates: { canonical: '/' },
  icons: { icon: '/img/favicon-32.png', apple: '/img/apple-touch-icon.png' },
  openGraph: {
    type: 'website', locale: 'es_ES', siteName: 'Rumbo', url: 'https://rumboagencia.info/',
    title: 'Rumbo · Marketing para hostelería en Almería',
    description: 'Marketing para restaurantes, hoteles y cafeterías de Almería y provincia.',
    images: [{ url: '/img/og.jpg', width: 1200, height: 630, alt: 'Rumbo, marketing para hostelería en Almería' }],
  },
  twitter: { card: 'summary_large_image' },
};

export const viewport: Viewport = { themeColor: '#0B0B0B', width: 'device-width', initialScale: 1, viewportFit: 'cover' };

// Decide antes de pintar si toca intro (primera visita y sin "reducir movimiento"). Sin JS no hay intro.
const introScript = `try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('js-kw');if(!localStorage.getItem('rumbo-intro-2026')&&!matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.classList.add('intro-pending');setTimeout(function(){document.documentElement.classList.remove('intro-pending')},12000)}}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
        <link rel="preload" href="/fonts/inter-latin.woff2" as="font" type="font/woff2" crossOrigin="" />
        <link rel="preload" href="/fonts/jetbrains-mono-700.woff2" as="font" type="font/woff2" crossOrigin="" />
      </head>
      <body>
        <div id="intro-veil" aria-hidden />
        <a href="#contenido" className="tech sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[90] focus:bg-naranja focus:px-4 focus:py-3 focus:text-ink">Saltar al contenido</a>
        {/* Filtro SVG para la separación RGB de las imágenes al pasar el ratón */}
        <svg width="0" height="0" className="absolute" aria-hidden focusable="false">
          <filter id="rgb-shift" colorInterpolationFilters="sRGB">
            <feColorMatrix in="SourceGraphic" type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="r" />
            <feOffset in="r" dx="-4" dy="0" result="r2" />
            <feColorMatrix in="SourceGraphic" type="matrix" values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0" result="g" />
            <feColorMatrix in="SourceGraphic" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" result="b" />
            <feOffset in="b" dx="4" dy="0" result="b2" />
            <feBlend in="r2" in2="g" mode="screen" result="rg" />
            <feBlend in="rg" in2="b2" mode="screen" />
          </filter>
        </svg>
        <SiteNav />
        {children}
        <div className="grain" aria-hidden />
        <div className="vignette" aria-hidden />
        <div className="scan" aria-hidden />
        <Cursor />
        <Experience />
        <Intro />
      </body>
    </html>
  );
}
