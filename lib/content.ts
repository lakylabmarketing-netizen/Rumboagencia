// Todo el texto y las cifras de la web en un solo sitio.
// Las cifras de A Lo Cubano salen del informe del 8 de julio al 24 de septiembre de 2026.

export const CONTACT_EMAIL = 'lakylabmarketing@gmail.com'; // provisional

// WhatsApp de Rumbo y mensajes que se abren ya escritos
export const WHATSAPP = '34624911599';
export const wa = (msg: string) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;
export const WA_HOLA = wa('Hola, quiero saber qué haríais con mi negocio.');
export const WA_CONSULTA = wa('Hola, quiero la consultoría gratis de 30 minutos. Mi negocio es: ');
export const PROMO_APPS = { src: '/video/promo-apps.mp4', poster: '/img/promo-apps.jpg' };
export const GOOGLE_FICHA = 'https://share.google/GnTpqiGGJO6bbH6Xn';

// Páginas de la web, en el orden del menú
export const NAV: [string, string][] = [
  ['/apps/', 'Apps'], ['/#servicios', 'Servicios'], ['/caso/', 'Caso real'], ['/precios/', 'Precios'], ['/nosotros/', 'Nosotros'],
];

export const services = [
  { k: '01', title: 'Estrategia', text: 'Auditoría de tu negocio y de la competencia, líneas creativas y calendario del primer trimestre, antes de grabar nada.' },
  { k: '02', title: 'Contenido', text: 'Grabación en tu negocio, piezas de vídeo de tres duraciones, diseño gráfico y stories. Publicamos nosotros, con los copys escritos.' },
  { k: '03', title: 'Clientes', note: 'Crecimiento y Marca', text: 'Ficha de Google optimizada, sistema de captación de reseñas, respuesta a mensajes y automatizaciones de WhatsApp o DM.' },
];

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
  { q: '¿Les ven en redes?', src: 'TikTok 7 jul – 22 sep · Instagram 8 jul – 23 sep', items: [
    { v: 172900, label: 'visualizaciones en TikTok' },
    { v: 1091, from: 0, label: 'seguidores en TikTok' },
    { v: 89, suffix: ' %', label: 'de las vistas de TikTok desde «Para ti», sin publicidad' },
    { v: 331, from: 89, label: 'seguidores en Instagram' },
    { v: 76885, label: 'visualizaciones en Instagram' },
  ] },
];

export const topVideos = [
  { v: '29.000', title: '«POV: Buscas un restaurante con la mejor comida de Almería…»', meta: '6 de agosto · TikTok' },
  { v: '26.000', title: '«Si quieres venir… vení»', meta: '12 de julio · TikTok' },
  { v: '21.000', title: 'Vídeo de presentación', meta: '8 de julio · TikTok' },
];

export const process = [
  { k: 'Grabación', title: 'En tu negocio, en el momento más tranquilo', text: 'Según el plan: media jornada al mes (Esencial), una jornada completa (Crecimiento) o dos medias jornadas (Marca).' },
  { k: 'Lunes', title: 'Qué se entrega', text: 'Los dos socios repasan la semana: qué sale, qué está trabado y qué necesitamos de ti.' },
  { k: 'Martes a jueves', title: 'Edición', text: 'Esteban monta las piezas; Eneko lleva la comunicación contigo.' },
  { k: 'Viernes', title: 'Programar y medir', text: 'Se programa la semana siguiente y se revisan las métricas. Apruebas el mes de una vez, no pieza por pieza.' },
];

export const commitments = [
  { title: 'Entrega', text: 'Si al cierre del mes falta algo de lo que pone el contrato, se devuelve el mes completo, sin que tengas que pedirlo.' },
  { title: 'Propiedad', text: 'Tus cuentas, tu web y todo el material grabado son tuyos. Si te vas, te llevas los archivos originales.' },
  { title: 'Respuesta', note: 'Crecimiento y Marca', text: 'Mensajes y comentarios contestados en menos de 24 horas laborables.' },
  { title: 'Exclusividad', note: 'Crecimiento y Marca', text: 'Un solo negocio de tu mismo sector por zona.' },
];

export const team = [
  { name: 'Esteban', role: 'Grabación y producción', img: '/portafolio/assets/esteban.jpg', w: 900, h: 900,
    text: 'Graba en tu negocio, edita las piezas, diseña y lleva el calendario de publicación.',
    tasks: 'Grabación · Edición · Publicación · Calendario · Diseño gráfico · Branding' },
  { name: 'Eneko', role: 'Clientes, sistemas y web', img: '/portafolio/assets/eneko.jpg', w: 675, h: 900,
    text: 'Es tu interlocutor: lleva las reuniones y los informes. En los planes que lo incluyen, también los mensajes, la web y las automatizaciones.',
    tasks: 'Reuniones · Informes · Mensajes y DMs · Web · Captación · Automatizaciones' },
];

export const plans = [
  { id: 'esencial', name: 'Esencial', price: '550', claim: 'Para empezar a estar presente cada semana.', inc: 'Incluye', value: 'Esencial · 550 €/mes',
    items: ['10 piezas de vídeo (2 largas, 4 medias, 4 cortas)', '3 diseños gráficos + 12 stories', '1 media jornada de grabación', 'Calendario, publicación y copys', 'Informe mensual de métricas'] },
  { id: 'crecimiento', name: 'Crecimiento', price: '950', rec: true, claim: 'Para tener clientes todas las semanas, no solo en temporada alta.', inc: 'Todo lo de Esencial, y además', value: 'Crecimiento · 950 €/mes',
    items: ['16 piezas de vídeo (4 largas, 6 medias, 6 cortas)', '6 diseños gráficos + 20 stories', '1 jornada completa de grabación', 'Gestión de mensajes y comentarios', 'Ficha de Google optimizada', 'Sistema de captación de reseñas', '1 automatización (WhatsApp o DM)', 'Gestión de publicidad', 'Informe de negocio + llamada mensual', 'Exclusividad en tu zona'] },
  { id: 'marca', name: 'Marca', price: '1.600', claim: 'Para construir una marca, no solo publicar.', inc: 'Todo lo de Crecimiento, y además', value: 'Marca · 1.600 €/mes',
    items: ['24 piezas de vídeo (4 largas, 8 medias, 12 cortas)', '10 diseños gráficos + stories sin límite', '2 medias jornadas de grabación', '3 automatizaciones', 'Web o landing incluida', 'Campañas con creatividades propias', 'Reunión estratégica presencial'] },
];

export const conditions = [
  { title: 'Cuota de arranque: 400 €', text: 'Pago único antes de empezar. Incluye auditoría del negocio y de la competencia, estrategia de contenido, líneas creativas, optimización de perfiles, configuración de herramientas y calendario del primer trimestre. La inversión en publicidad va aparte y la decides tú.' },
  { title: 'Permanencia', text: 'Mínimo 3 meses; después, mes a mes con 30 días de preaviso. Reunión de revisión al tercer mes, sin penalización si no encaja.' },
  { title: 'Pago', text: 'Por adelantado, entre el día 1 y el 5 de cada mes. Seis meses por adelantado: uno gratis.' },
  { title: 'Revisiones', text: 'Una ronda de revisión por pieza incluida.' },
  { title: 'Exclusividad', text: 'De zona, en Crecimiento y Marca.' },
];

export const faqs = [
  { q: '¿Tengo que salir yo en los vídeos?', a: 'No. Funciona mejor si sales tú o alguien de tu equipo, pero se puede grabar todo centrado en tu producto, tu servicio y tu espacio. Lo decides antes de la primera grabación.' },
  { q: '¿Cuándo empiezo a notar algo?', a: 'El primer mes se nota en la presencia: publicas de forma constante. El movimiento en clientes, reservas y consultas suele aparecer entre el segundo y el tercer mes; por eso la permanencia mínima es de tres meses.' },
  { q: '¿Qué pasa si no me gusta una pieza?', a: 'Cada pieza lleva una ronda de revisión incluida. Si al cierre del mes falta algo de lo que pone el contrato, se devuelve el mes completo.' },
  { q: '¿Y si no puedo grabar el día que venís?', a: 'Las grabaciones se acuerdan con antelación y se reprograman avisando con 48 horas. Grabamos en el momento más tranquilo de tu negocio.' },
  { q: '¿La publicidad está incluida en el precio?', a: 'La gestión sí, en Crecimiento y Marca. La inversión en Meta o Google va aparte y la decides tú.' },
  { q: '¿Trabajáis con mi competencia?', a: 'En Crecimiento y Marca hay exclusividad: un solo negocio de tu mismo sector en tu zona. Si tu zona ya está ocupada, te lo decimos en la primera llamada.' },
  { q: 'Si me voy, ¿qué me llevo?', a: 'Las cuentas, la web y el material original grabado son tuyos desde el primer día. Te entregamos los archivos y los accesos.' },
];

// ── Páginas de cada servicio (portada tipo «enlaces»: cada tarjeta lleva a su página) ──
export type ServicePage = {
  slug: string; name: string; short: string; title: string; lead: string; img: string; imgAlt: string;
  plan: string; items: [string, string][];
  proof?: { title: string; stats: [string, string][]; note?: string };
};

export const servicePages: ServicePage[] = [
  {
    slug: 'apps', name: 'Apps a medida', short: 'Aplicaciones de todo tipo para tu día a día.',
    title: 'Desarrollo de aplicaciones', img: '', imgAlt: '',
    lead: 'Si hay una tarea que repites cada día, la convertimos en una app. Te la instalamos y nos encargamos del mantenimiento técnico.',
    plan: 'Presupuesto a medida',
    items: [
      ['Albaranes y facturas sin teclear', 'Llegan por correo o les haces una foto, y se guardan solos en tu sistema. Las facturas pueden ir directas a tu gestoría.'],
      ['Horarios y fichajes', 'Todo tu equipo registrado en una app que ficha y te propone cómo repartir los turnos.'],
      ['Carta o catálogo digital', 'Con QR, se edita desde el móvil y se carga a partir de una foto de la que ya tienes.'],
      ['Pedidos desde la carta', 'Tus clientes piden desde la carta digital, conectada con tu programa de caja.'],
      ['Fidelización', 'Tarjetas de cliente con niveles para que vuelvan.'],
      ['Repartos', 'Lista de visitas y seguimiento de pedidos con web y WhatsApp.'],
      ['La que necesites', 'Cuéntanos qué te quita tiempo y te decimos si se puede convertir en una app.'],
    ],
    proof: { title: 'Cómo trabajamos', stats: [['Instalación', 'técnica y no técnica, la hacemos nosotros'], ['Mantenimiento', 'técnico nuestro; tú solo eliges cómo configurarla']] },
  },
  {
    slug: 'redes', name: 'Redes sociales', short: 'Vídeo, diseño y publicación cada semana.',
    title: 'Redes sociales', img: '/portafolio/assets/pieza-1-poster.jpg', imgAlt: 'Fotograma de un vídeo de Rumbo para A Lo Cubano',
    lead: 'Grabamos en tu negocio, montamos las piezas y las publicamos con el texto escrito. Tú apruebas el mes de una vez.',
    plan: 'En los tres planes',
    items: [
      ['Grabación en tu negocio', 'Media jornada, una jornada completa o dos medias jornadas al mes, según el plan.'],
      ['Vídeos de tres duraciones', 'Piezas largas, medias y cortas: de 10 a 24 al mes, según el plan.'],
      ['Diseño gráfico y stories', 'De 3 a 10 diseños al mes, y de 12 stories a stories sin límite.'],
      ['Calendario, publicación y copys', 'Programamos la semana y escribimos los textos. Nada sale sin tu visto bueno.'],
      ['Mensajes y comentarios', 'Contestados en menos de 24 horas laborables, en Crecimiento y Marca.'],
      ['Publicidad', 'Gestión de campañas en Crecimiento y Marca. La inversión va aparte y la decides tú.'],
    ],
    proof: { title: 'A Lo Cubano · 11 semanas', stats: [['172.900', 'visualizaciones en TikTok'], ['1.091', 'seguidores en TikTok, desde cero'], ['89 %', 'de las vistas desde «Para ti», sin publicidad']] },
  },
  {
    slug: 'google', name: 'Google y reseñas', short: 'Que te encuentren y que lo que lean convenza.',
    title: 'Google y reseñas', img: '/img/testimonio-3.webp', imgAlt: 'Manuel, dueño de A Lo Cubano, en la terraza de su restaurante',
    lead: 'Cuando alguien busca lo que vendes cerca de él, tu ficha de Google es lo primero que ve. La dejamos lista para que te elija.',
    plan: 'En Crecimiento y Marca',
    items: [
      ['Ficha de Google optimizada', 'Fotos, horario, categorías y descripción, siempre al día.'],
      ['Sistema de captación de reseñas', 'Un QR y el momento justo para que tus clientes contentos lo cuenten.'],
      ['Mensajes contestados a tiempo', 'En menos de 24 horas laborables, con automatizaciones de WhatsApp o DM.'],
      ['Lo que pasa, cada mes', 'Cuánta gente te ve, te llama y pide la ruta, en el informe mensual.'],
    ],
    proof: { title: 'A Lo Cubano · julio a septiembre', stats: [['18.107', 'personas vieron su ficha'], ['607', 'pidieron la ruta para llegar'], ['12 → 151', 'reseñas, todas de cinco estrellas']] },
  },
  {
    slug: 'web', name: 'Página web', short: 'Una web sencilla, rápida y tuya.',
    title: 'Página web', img: '/img/portada-pieza-4.webp', imgAlt: 'Fotograma de una pieza de Rumbo',
    lead: 'Una web o landing a la que llegan desde tu ficha de Google y tus redes, pensada para que te escriban o te visiten sin rodeos.',
    plan: 'Incluida en Marca',
    items: [
      ['Web o landing incluida', 'Diseñada y montada por nosotros en el plan Marca.'],
      ['Pensada para el móvil', 'Que se lea bien y cargue rápido, que es donde la van a abrir.'],
      ['Contacto directo', 'WhatsApp, llamada o formulario: que te escriban en un toque.'],
      ['Automatizaciones', 'Respuestas automáticas por WhatsApp o DM: una en Crecimiento, tres en Marca.'],
      ['Es tuya', 'La web y todos los accesos son tuyos desde el primer día.'],
    ],
    proof: { title: 'A Lo Cubano', stats: [['299', 'personas entraron en su web desde Google'], ['alocubanofusion.com', 'la web que les hicimos']] },
  },
  {
    slug: 'asesoria', name: 'Asesoría', short: 'Antes de grabar nada, el plan.',
    title: 'Asesoría', img: '/img/equipo.webp', imgAlt: 'Esteban y Eneko, los dos socios de Rumbo',
    lead: 'Miramos tu negocio y tu competencia y decidimos qué contar, dónde y cuándo. Empieza con una consulta gratis de treinta minutos.',
    plan: 'Cuota de arranque: 400 €, pago único',
    items: [
      ['Consulta gratis de 30 minutos', 'Miramos tu perfil y tu ficha de Google antes de la llamada y te decimos qué haríamos primero.'],
      ['Auditoría y estrategia', 'Tu negocio y tu competencia, estrategia de contenido y líneas creativas.'],
      ['Puesta a punto', 'Optimización de perfiles, configuración de herramientas y calendario del primer trimestre.'],
      ['Seguimiento cada mes', 'Informe de métricas en todos los planes; llamada mensual en Crecimiento; reunión presencial en Marca.'],
    ],
    proof: { title: 'Lo que firmamos', stats: [['3 meses', 'para tener un sistema montado y datos para saber si funciona'], ['100 %', 'tuyo: cuentas, web y material grabado']] },
  },
];
