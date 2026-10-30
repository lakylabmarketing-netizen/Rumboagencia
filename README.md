# Rumbo · web

Web de rumboagencia.info. Next.js (App Router, exportación estática) + TypeScript + Tailwind. Tipografía: Inter.

Portada sencilla (retrato, titular y llamada a la acción) y una página para cada apartado:

```
/            Portada
/enlaces/    Página para la bio de Instagram (tipo Beacons): consultoría gratis, servicios, caso, precios…
/redes/  /google/  /web/  /apps/  /asesoria/   Servicios (plantilla común: components/ServiceView.tsx)
/caso/       Caso real de A Lo Cubano (cifras, vídeos de Manuel y piezas)
/precios/    Planes, condiciones y preguntas frecuentes (#preguntas)
/nosotros/   Esteban y Eneko
/contacto/   Formulario (Netlify Forms) y WhatsApp
/legal/      Aviso legal y privacidad
/portafolio/ Portafolio, HTML autónomo con sus vídeos
```

- Todos los textos y cifras están en `lib/content.ts` (servicios en `servicePages`; WhatsApp en `WHATSAPP`).
- Desarrollo: `npm install` y `npm run dev`. Publicación: `npm run build` genera `out/` (Netlify lo hace solo con `netlify.toml`).
- El formulario de consulta usa Netlify Forms (`name="consulta"`). Los avisos por correo se activan en Netlify › Forms › Form notifications.
- Enlace para la bio de Instagram: `https://rumboagencia.info/enlaces/`.
- `public/img/equipo.webp` es el retrato de Esteban y Eneko creado con Higgsfield a partir de sus fotos.
- Busca `PENDIENTE` en los archivos para ver los datos que faltan.
