import type { Config } from 'tailwindcss';

/** Tokens centralizados de Rumbo 2026. */
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0B0B0B',        // fondo
        surface: '#141414',    // superficies
        cal: '#F2EFEA',        // texto principal
        gris: '#CFCFCF',       // subtítulos
        muted: '#8C857D',      // texto terciario
        naranja: '#F04E17',    // acento único
        brasa: '#FF8A3D',      // hover y halos
        line: 'rgba(242,239,234,.12)',
        niebla: '#EFEFEF',     // secciones claras
        acero: '#9A9AA2',      // gris de los titulares gigantes
      },
      fontFamily: {
        sans: ['Inter', 'Helvetica Neue', 'Arial', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        mega: ['clamp(2.7rem, 9.4vw, 10.5rem)', { lineHeight: '0.96', letterSpacing: '-0.045em' }],
        display: ['clamp(2.6rem, 7.2vw, 8rem)', { lineHeight: '0.92', letterSpacing: '0.04em' }],
        h2: ['clamp(2rem, 4.6vw, 4rem)', { lineHeight: '0.98', letterSpacing: '0.02em' }],
        h3: ['clamp(1.35rem, 2.2vw, 1.75rem)', { lineHeight: '1.15', letterSpacing: '0.01em' }],
        body: ['clamp(1.05rem, 1.2vw, 1.19rem)', { lineHeight: '1.55' }],
        tech: ['0.78rem', { lineHeight: '1.3', letterSpacing: '0.14em' }],
      },
      borderRadius: { sm: '4px', md: '10px' },
      maxWidth: { wrap: '1320px' },
    },
  },
  plugins: [],
};
export default config;
