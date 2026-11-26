import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export default function NotFound() {
  return (
    <>
      <Nav />
      <main id="contenido" className="pagina-clara px-4 text-center sm:px-6">
        <p className="etiqueta">Error 404</p>
        <h1 className="mx-auto mt-6 max-w-[16ch] text-[clamp(2.4rem,5.6vw,4.4rem)]">Esta página <span className="marca">no existe</span></h1>
        <p className="mx-auto mt-6 max-w-[36ch] text-[20px] text-gris">Puede que el enlace esté mal escrito o que la página ya no exista.</p>
        <a href="/" className="btn btn-naranja mt-10 !pr-6">Volver al inicio</a>
      </main>
      <Footer cta={false} />
    </>
  );
}
