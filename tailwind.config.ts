import type { Config } from 'tailwindcss';

/** Colores y letra de Rumbo: web clara, el naranja solo para lo importante. */
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#151515',          // texto principal
        gris: '#474747',         // texto secundario
        muted: '#6B6B6B',        // notas pequeñas
        line: '#E5E3DF',         // bordes
        papel: '#F6F5F2',        // fondo de tarjetas y franjas
        naranja: '#E4561B',      // botón principal
        'naranja-osc': '#B4400E', // naranja para texto sobre blanco
      },
      fontFamily: {
        sans: ['"General Sans"', '"Helvetica Neue"', 'Arial', 'sans-serif'],
        head: ['Switzer', '"Helvetica Neue"', 'Arial', 'sans-serif'],
      },
      maxWidth: { wrap: '1180px' },
    },
  },
  plugins: [],
};
export default config;
