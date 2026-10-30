# Promo «Apps a medida» — nota de entrega

**Archivo:** `renders/rumbo-apps.mp4` (1920×1080, 30 fps, 33 s, sin audio). No se sube al repo; la versión para la web está en `public/video/promo-apps.mp4` (1280 px, 865 KB) con póster `public/img/promo-apps.jpg`.
Para volver a renderizar: `cd promo-apps && npx hyperframes render` (ver `CLAUDE.md`).

## Qué se eligió
- Historia A de `STORYLINES.md`, «La noche del albarán»: un problema concreto (23:47, teclear albaranes) → la app lo resuelve (foto → gestoría) → otras apps (turnos, carta QR, tarjeta de sellos, repartos) → cierras a tu hora → marca y CTA.
- Ritmo y transiciones inspirados en el vídeo de referencia (cortes con desenfoque, titulares grandes, una sola idea por plano), con la paleta de Rumbo (negro, crema, naranja #F04E17) e Inter.
- Las pantallas son objetos genéricos (visor de cámara, lista, calendario, QR decorativo, tarjeta, mapa). No son capturas de una app real de Rumbo ni de ningún cliente.

## Otras historias que quedaron fuera
- B: una sola pantalla de móvil que se va reconstruyendo en cada app.
- C: «la tarea que se repite» contada como un bucle que se rompe.

## Lo que no se ha medido
- No hay datos de tiempo ahorrado ni clientes con apps en el vídeo: no existen todavía y no se han inventado.

## Avisos que se mantienen a propósito
- `line_unread` en los dígitos del reloj que rueda (es una animación, no texto que leer).
- `film_silent`: no había música con licencia disponible. Para añadirla, colocar el audio en `assets/` como `<audio>` en `index.html` y volver a renderizar.

## Plano más flojo
- La salida de «Repartos» (el mapa se encoge al centro) es la transición más simple del vídeo; si se rehace, es la primera candidata.
