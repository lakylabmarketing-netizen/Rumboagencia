# Rumbo · web

Web de rumboagencia.info. Next.js (App Router, exportación estática) + TypeScript + Tailwind + GSAP + Lenis + React Three Fiber.

```
app/                  Layout, página y estilos globales
components/           Hero (anillo 3D), intro, cursor, marquesina, proyectos, formulario…
lib/content.ts        Todos los textos y cifras de la web
tailwind.config.ts    Tokens de diseño (colores, tipografías, tamaños, radios)
public/enlaces/       Página de enlaces de la bio de Instagram (/enlaces), HTML autónomo
public/portafolio/    Portafolio (/portafolio), HTML autónomo con sus vídeos
public/img, video     Imágenes y testimonios de A Lo Cubano
legacy-index.html     Versión estática anterior (no se publica; solo referencia)
```

- Desarrollo: `npm install` y `npm run dev`. Publicación: `npm run build` genera `out/` (Netlify lo hace solo con `netlify.toml`).
- Datos de la página de enlaces (WhatsApp, mensajes, URLs): bloque `CONFIG` al principio de `public/enlaces/index.html`.
- El formulario de consulta usa Netlify Forms (`name="consulta"`). Los avisos por correo se activan en Netlify › Forms › Form notifications.
- La intro solo se muestra la primera vez (clave `rumbo-intro-2026` en localStorage) y nunca con «reducir movimiento».
- Busca `PENDIENTE` en los archivos para ver los datos que faltan.
