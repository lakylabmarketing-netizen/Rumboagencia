# Rumbo · web

Web de rumboagencia.info. Next.js (App Router, exportación estática) + TypeScript + Tailwind + GSAP + Lenis.

Tipografías: Archivo (titulares gigantes, condensada), Inter (texto) y JetBrains Mono (etiquetas).

```
app/                  Layout, página y estilos globales
components/           Hero (móvil con pieza real), BehindWork (equipo en vídeo), intro, cursor, proyectos, formulario…
lib/content.ts        Todos los textos y cifras de la web
tailwind.config.ts    Tokens de diseño (colores, tipografías, tamaños, radios)
public/enlaces/       Página de enlaces de la bio de Instagram (/enlaces), HTML autónomo
public/portafolio/    Portafolio (/portafolio), HTML autónomo con sus vídeos
public/img, video     Imágenes, testimonios de A Lo Cubano, bucles de las piezas y el retrato del equipo (Higgsfield)
legacy-index.html     Versión estática anterior (no se publica; solo referencia)
```

- Desarrollo: `npm install` y `npm run dev`. Publicación: `npm run build` genera `out/` (Netlify lo hace solo con `netlify.toml`).
- Datos de la página de enlaces (WhatsApp, mensajes, URLs): bloque `CONFIG` al principio de `public/enlaces/index.html`.
- El formulario de consulta usa Netlify Forms (`name="consulta"`). Los avisos por correo se activan en Netlify › Forms › Form notifications.
- La intro solo se muestra la primera vez (clave `rumbo-intro-2026` en localStorage) y nunca con «reducir movimiento».
- Busca `PENDIENTE` en los archivos para ver los datos que faltan.

- «Detrás del trabajo»: `public/img/equipo.webp` es el retrato creado con Higgsfield a partir de las fotos de Esteban y Eneko (foto fija). `public/img/equipo-silueta.png` es su silueta: el titular la usa de máscara para pasar por detrás.
