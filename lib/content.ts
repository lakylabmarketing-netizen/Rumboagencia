// Todo el texto y las cifras de la web en un solo sitio.
// Cifras de A Lo Cubano: Google y reseñas, informe del 8 de julio al 24 de septiembre de 2026;
// TikTok e Instagram, análisis del 11 de noviembre de 2026 (Windsor.ai y perfil público).

export const CONTACT_EMAIL = 'lakylabmarketing@gmail.com'; // provisional

// WhatsApp de Rumbo y mensajes que se abren ya escritos
export const WHATSAPP = '34624911599';
export const wa = (msg: string) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;
export const WA_HOLA = wa('Hola, tengo un local en Almería y quiero saber qué haríais para llenarlo en invierno.');
export const GOOGLE_FICHA = 'https://share.google/GnTpqiGGJO6bbH6Xn';

// Páginas de la web, en el orden del menú
export const NAV: [string, string][] = [
  ['/', 'Inicio'], ['/#servicios', 'Servicios'], ['/#paquetes', 'Paquetes'], ['/caso/', 'Caso real'], ['/contacto/', 'Contacto'],
];
export const WHATSAPP_VISIBLE = '+34 624 91 15 99';

export const testimonials = [
  { n: 1, q: '¿Cómo fueron las primeras semanas, cuando abristeis y no os conocía nadie?', a: 'Era todo una incógnita. No sabíamos qué era lo que nos iba a exigir esto de verdad.' },
  { n: 2, q: 'Estabas abriendo un negocio con mil cosas encima. ¿Por qué te fiaste de nosotros, que empezábamos?', a: 'Para nosotros, ustedes han sido uno más de la familia. Empezamos desde el primer día juntos.' },
  { n: 3, q: '¿Qué ha cambiado en estos tres meses?', a: 'Estamos repletos de clientes que vienen a vernos por las redes.' },
  { n: 4, q: '¿Cuánto tiempo te quita a ti todo esto?', a: 'Siempre ha estado presente a la hora que lo he llamado, siempre.' },
  { n: 5, q: '¿Qué le dirías a alguien que está a punto de abrir un restaurante?', a: 'Alguien que te ayude de esta manera. Una persona que esté al cien por cien involucrado en tu negocio.' },
];

export const pieces = [
  { n: 1, tag: 'Captación', title: 'POV: buscas buena comida en Almería' },
  { n: 2, tag: 'Detrás de cámaras', title: 'Antes de abrir: la voz del dueño' },
  { n: 3, tag: 'Equipo', title: 'El trend en barra, con la plantilla' },
  { n: 4, tag: 'Promoción', title: 'Cumpleaños, reservas y cocina sin cerrar' },
];

export type Metric = { v: number; from?: number; prefix?: string; suffix?: string; label: string };
export const metricGroups: { q: string; src: string; items: Metric[] }[] = [
  { q: '¿Les encuentran en Google?', src: 'Perfil de Empresa de Google, julio – septiembre', items: [
    { v: 18107, label: 'personas vieron la ficha' },
    { v: 8152, label: 'búsquedas en las que apareció (julio y agosto)' },
  ] },
  { q: '¿Se acercan al local?', src: 'Acciones desde la ficha de Google', items: [
    { v: 607, label: 'pidieron la ruta para llegar' },
    { v: 133, label: 'llamaron desde Google' },
    { v: 302, label: 'miraron la carta' },
    { v: 299, label: 'entraron en su web' },
  ] },
  { q: '¿Les recomiendan?', src: 'Reseñas en Google', items: [
    { v: 151, from: 12, label: 'reseñas, todas de cinco estrellas' },
  ] },
  { q: '¿Les ven en redes?', src: '32 vídeos en TikTok del 8 de julio al 11 de noviembre · seguidores a 11 de noviembre', items: [
    { v: 432490, label: 'visualizaciones en TikTok' },
    { v: 2457, from: 0, label: 'seguidores en TikTok' },
    { v: 20031, label: 'me gusta en TikTok' },
    { v: 1124, label: 'seguidores en Instagram' },
  ] },
];

export const topVideos = [
  { v: '94.781', title: 'Vídeo con Yolaxis', meta: '16 de octubre · TikTok · 778 seguidores nuevos' },
  { v: '77.631', title: 'Humor: «no ha comido»', meta: '10 de octubre · TikTok · 270 seguidores nuevos' },
  { v: '35.733', title: 'Probando los platos por primera vez', meta: 'TikTok' },
];

// Paquetes (de «Rumbo · Planes y servicios», 2026). Sin precios en la web: se dan por WhatsApp.
export const plans = [
  { id: 'campana', name: 'Campaña', kicker: 'Campaña única',
    items: ['3 reels, 8 stories y 4 posts', 'Estrategia de la campaña', 'Pensado para captar clientes'] },
  { id: 'presencia', name: 'Presencia', kicker: '3 meses', rec: true,
    items: ['6 reels, 12 stories y 6 posts', 'Estrategia de contenido cada mes', 'Estabilidad mes a mes'] },
  { id: 'marca', name: 'Marca', kicker: '3 meses',
    items: ['8 reels virales y 6 posts', '16 stories y landing con hosting', 'Estrategia viral y de marca', 'Informe mensual y llamada'] },
];

// ── Páginas de cada servicio (portada tipo «enlaces»: cada tarjeta lleva a su página) ──
export type ServicePage = {
  slug: string; name: string; short: string; icon: string; title: string; lead: string; img: string; imgAlt: string;
  items: [string, string][];
  proof?: { title: string; stats: [string, string][]; note?: string };
};

export const servicePages: ServicePage[] = [
  {
    slug: 'redes', icon: 'video', name: 'Vídeos y redes sociales', short: 'Grabamos tu local y lo publicamos cada semana.',
    title: 'Redes sociales', img: '/img/grabando-poster.jpg', imgAlt: 'Grabando a Manuel en la terraza de A Lo Cubano',
    lead: 'Grabamos en tu local, montamos las piezas y las publicamos con el texto escrito. Tú apruebas el mes de una vez.',
    items: [
      ['Grabación en tu local', 'Vamos a tu local a grabar cada mes, en el momento más tranquilo del día.'],
      ['Vídeos de tres duraciones', 'Piezas largas, medias y cortas, pensadas para cada red.'],
      ['Diseño gráfico y stories', 'Diseños para tus publicaciones y stories cada semana.'],
      ['Calendario, publicación y copys', 'Programamos la semana y escribimos los textos. Nada sale sin tu visto bueno.'],
      ['Mensajes y comentarios', 'Contestados en menos de 24 horas laborables.'],
      ['Publicidad', 'Gestión de campañas. La inversión en anuncios va aparte y la decides tú.'],
    ],
    proof: { title: 'A Lo Cubano · julio a noviembre de 2026', stats: [['432.490', 'visualizaciones en TikTok con 32 vídeos'], ['2.457', 'seguidores en TikTok, desde cero'], ['1.124', 'seguidores en Instagram']] },
  },
  {
    slug: 'google', icon: 'estrella', name: 'Google y reseñas', short: 'Que te encuentren y que lo que lean convenza.',
    title: 'Google y reseñas', img: '/img/testimonio-3.webp', imgAlt: 'Manuel, dueño de A Lo Cubano, en la terraza de su restaurante',
    lead: 'Cuando alguien busca dónde comer o tomar algo cerca, tu ficha de Google es lo primero que ve. La dejamos lista para que te elija.',
    items: [
      ['Ficha de Google optimizada', 'Fotos, horario, categorías y descripción, siempre al día.'],
      ['Sistema de captación de reseñas', 'Un QR y el momento justo para que tus clientes contentos lo cuenten.'],
      ['Mensajes contestados a tiempo', 'En menos de 24 horas laborables, con automatizaciones de WhatsApp o DM.'],
      ['Lo que pasa, cada mes', 'Cuánta gente te ve, te llama y pide la ruta, en el informe mensual.'],
    ],
    proof: { title: 'A Lo Cubano · julio a septiembre', stats: [['18.107', 'personas vieron su ficha'], ['607', 'pidieron la ruta para llegar'], ['12 → 151', 'reseñas, todas de cinco estrellas']] },
  },
];
