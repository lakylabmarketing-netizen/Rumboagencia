---
name: seedance-prompts
description: Escribir prompts de vídeo con IA (Seedance 2.5 y modelos parecidos, p. ej. desde Higgsfield) para Rumbo y sus clientes - planos de producto, comida, negocio local, transiciones e imagen-a-vídeo. Úsala antes de generar cualquier clip con IA o al pedir «un prompt para un vídeo».
---

# Prompts de vídeo con IA (Seedance 2.5)

Guía práctica basada en «Seedance 2.5 Prompts & API Guide» (repositorio subido por el usuario), adaptada a Rumbo. Para generar se usa Higgsfield (`generate_video`, modelo `seedance_2_5` o el que recomiende `models_explore`); para montar el vídeo final, `/hyperframes`.

## La estructura que funciona

```text
[sujeto] + [acción clara] + [entorno] + [cámara y objetivo] +
[luz y estilo] + [tiempo / sonido] + [lo que no puede cambiar]
```

Ejemplo:

```text
A ceramic perfume bottle rotates slowly on wet black stone, tiny water droplets catching the light.
Macro 85mm product shot, slow clockwise orbit, shallow depth of field, cool rim light and one warm
spotlight. Soft glass chime and distant rain. Keep the label readable, the bottle geometry unchanged,
and the motion continuous.
```

## Reglas

1. Sujeto y acción principal primero.
2. Un solo movimiento de cámara; no mezclar movimientos que se contradicen.
3. Una luz dominante y un estilo visual.
4. En clips con varios planos, rangos de tiempo («0–3 s…, 3–6 s…»).
5. En imagen-a-vídeo, decir qué no debe cambiar (cara, logo, etiqueta, forma del producto).
6. Pedir planos limpios: sin subtítulos, sin marca de agua, sin objetos duplicados, sin cortes bruscos.
7. Escribir el prompt en inglés (los modelos entienden mejor el vocabulario de rodaje); el texto que verá el cliente, en español.
8. Nunca inventar datos del cliente dentro del vídeo (cifras, premios, logos de terceros).

## Vocabulario de cámara y luz

| Objetivo | Cómo pedirlo |
| --- | --- |
| Acercarse | slow push-in, dolly in |
| Revelar la escena | crane up, pull back reveal |
| Seguir la acción | steadicam follow, side tracking shot |
| Rodear el sujeto | slow orbit, 180-degree arc |
| Energía | whip pan, handheld chase, FPV flight |
| Plano estable | locked-off camera, fixed tripod |
| Cambiar la atención | rack focus from foreground to subject |
| Calidez premium | golden-hour cinematography, warm practical lights |
| Profundidad dramática | chiaroscuro, volumetric haze, strong rim light |
| Anuncio limpio | softbox lighting, controlled reflections |
| Realismo natural | diffused daylight, available light |
| Color nocturno | neon reflections, tungsten practicals |

## Plantillas para Rumbo

Producto o plato de un cliente (texto-a-vídeo, 16:9 o 9:16, 5–8 s):

```text
[The dish] is placed on [the restaurant's real table material] as steam rises and a hand adds the
final garnish. Macro 85mm, slow push-in, warm practical light from the left, rich appetising colours,
food-commercial realism. Cutlery clink and soft room ambience. Keep the plate, portions and garnish
consistent; no text, no watermark, no extra hands.
```

Retrato animado a partir de una foto (imagen-a-vídeo, usar la misma imagen como inicio y fin para que haga bucle):

```text
Locked-off camera. The person stays in place facing the lens with natural minimal motion: breathing,
blinking, a slight smile. Background and lighting stay completely static. Realistic, no cuts, no text.
Keep the face, hair and clothing identical to the reference.
```

Recurso para la promo de apps (fondo para HyperFrames, sin interfaz inventada):

```text
A delivery note on a wooden counter at night is lit by a single warm desk lamp; a phone slides into
frame and its flash briefly lights the paper. Locked-off overhead camera, chiaroscuro, deep black and
warm orange palette, premium tech-ad finish. Paper rustle and a soft shutter click. No readable text,
no logos, no screen UI, no duplicated objects.
```

## Comprobar antes de usar un clip

- La cara, el producto y el logo no se deforman entre el primer y el último fotograma.
- No hay texto ilegible ni marcas de agua.
- El movimiento es continuo, sin saltos.
- Si va dentro de un vídeo de HyperFrames, se trata con `npx hyperframes media-treatment` (no con filtros CSS) y se coloca como clip en `assets/`.
