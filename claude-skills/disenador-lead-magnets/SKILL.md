---
name: disenador-lead-magnets
description: Diseña lead magnets (guías, checklists, plantillas en PDF) con el branding del usuario a partir de un recurso o unas notas, con naming atractivo y listo para enviar cuando la gente comente una palabra clave en un reel. Úsala cuando el usuario pida crear un lead magnet, una guía descargable, un PDF para regalar, o "lo que envío cuando comenten".
---

# Diseñador de lead magnets

Conviertes un recurso en bruto (notas, un documento, un guion, una lista) en un **lead magnet diseñado con la marca del usuario**. Está pensado para la mecánica "comenta PALABRA y te lo envío por DM".

## Qué necesitas
1. **Tu branding**: nombre de la marca, colores (hex), tipografías, logo (URL o descripción) y tono. Si no lo da, pregúntalo una vez; si sigue sin darlo, usa una paleta sobria y dilo.
2. **El recurso**: el contenido en bruto que quiere regalar.
3. **El reel o la palabra clave** con que se va a pedir, si existe.

## Proceso

### 1 · Naming
Propón **5 nombres** y recomienda uno. Buenos nombres:
- Son específicos y prometen un resultado: "Historias de Instagram que venden — el sistema de 7 días" es mejor que "Guía de stories".
- Llevan formato + marca: "… — [Marca]".
- Tienen un subtítulo que dice para quién es y qué consigue.

### 2 · Estructura
Reorganiza el recurso en **bloques** (Bloque 1 — Fundamentos, Bloque 2 — …, Bloque 3 — Plan o calendario). Añade:
- Una portada con título, subtítulo y marca.
- "Para quién es" y "Qué vas a conseguir" (3 viñetas).
- Contenido accionable: pasos, tablas, plantillas o checklists. Quita la paja.
- Cierre con un CTA hacia el siguiente paso (llamada, servicio, DM).

### 3 · Diseño
Entrega el lead magnet como **un único archivo HTML** autocontenido, listo para "Imprimir → Guardar como PDF" en tamaño A4:
- Usa los colores y tipografías de la marca (Google Fonts si hace falta) y CSS `@page { size: A4; margin: 0 }`, con saltos de página entre bloques.
- Portada a página completa con el color principal de la marca.
- Encabezados claros, cajas destacadas para los consejos clave y tablas con estilo.
- Nada de imágenes externas salvo el logo, si el usuario da la URL.

Si el entorno permite crear archivos, crea el `.html`. Si no, entrégalo en un bloque de código.

### 4 · Entrega
Termina con:
- **Mensaje de DM** listo para copiar: "¡Aquí tienes [nombre]! 👉 [enlace]. Si quieres que te ayude con…".
- **Respuesta al comentario** en 3 variantes cortas ("¡Te lo acabo de enviar por DM! 📩").
- Recordatorio: sube el PDF a Drive, Notion o Canva y usa un enlace público. También puedes automatizar el envío con n8n o ManyChat cuando alguien comente la palabra clave.
