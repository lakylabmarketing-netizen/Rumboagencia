/** Exportación estática: Netlify sirve la carpeta `out/` y detecta el formulario. */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
};
export default nextConfig;
