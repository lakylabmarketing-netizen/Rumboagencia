import type { Config } from 'tailwindcss';

/** Colores de Rumbo: fondo negro, texto blanco y naranja de marca. Las franjas claras usan la clase .claro (globals.css). */
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0A0A0A',          // negro de fondo y texto sobre naranja
        gris: '#BDBDBD',         // texto secundario sobre negro
        muted: '#8C8C8C',        // notas pequeñas
        line: '#2A2A2A',         // bordes
        papel: '#161616',        // tarjetas sobre negro
        naranja: '#F04E17',      // naranja de marca: botones y bloques
        'naranja-osc': '#FF7A3D', // naranja para texto sobre negro
        'naranja-vivo': '#FF5A12', // naranja llamativo para cifras
      },
      fontFamily: {
        sans: ['"General Sans"', '"Helvetica Neue"', 'Arial', 'sans-serif'],
        display: ['Anton', 'Impact', '"Arial Narrow"', 'sans-serif'],
      },
      maxWidth: { wrap: '1240px' },
    },
  },
  plugins: [],
};
export default config;
