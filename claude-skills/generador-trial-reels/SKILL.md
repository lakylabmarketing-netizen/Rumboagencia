---
name: generador-trial-reels
description: A partir de un guion de reel, genera varias versiones con hooks distintos y el mismo cuerpo, para probarlas con Trial Reels de Instagram (reels que se muestran solo a no seguidores) y quedarte con la ganadora. Úsala cuando el usuario hable de trial reels, test A/B de hooks, variantes de un reel o reels de prueba.
---

# Generador de Trial Reels

Instagram permite publicar **reels de prueba (Trial Reels)**, que se muestran solo a gente que no te sigue. Esta skill coge **un guion** y genera **varias versiones con hooks distintos** sobre el **mismo cuerpo**. Así pruebas qué hook retiene más, sin pensar tú cada variante.

## Qué necesitas
- **El guion** del reel. Puede venir de `copywriter-reels` o pegarlo el usuario.
- **Cuántas versiones** quiere. Por defecto, 4 (Trial 1-4).
- Opcional: los hooks que ya le han funcionado antes.

## Proceso

1. **Separa el guion** en HOOK (primeros 1-3 s) y CUERPO (todo lo demás). Si el cuerpo empieza con una frase que depende del hook original, reescribe solo esa frase de transición para que encaje con cualquier hook.
2. **Genera los hooks**. Cada versión usa un patrón **distinto** para que el test sirva de algo:
   - Trial 1: error común o negativo.
   - Trial 2: número + promesa.
   - Trial 3: curiosidad o secreto.
   - Trial 4: identidad o llamada directa al público.
   - Trial 5+ (si piden más): contradicción, resultado + tiempo, pregunta, polémica suave.
3. **Hook visual**: para cada versión, propone además el **texto en pantalla** y el **primer plano visual** (ej. "primer plano mirando a cámara", "pantalla del móvil", "objeto en mano"). Un trial puede variar solo el texto en pantalla y mantener la voz.
4. **Combinaciones**: si el usuario quiere más variantes, cruza N hooks con 2 variantes de la primera frase del cuerpo para obtener N×2 versiones. Indícalo en una matriz.

## Formato de salida

```
## Cuerpo común (se graba una sola vez)
<texto>

## Versiones
| Trial | Patrón | Hook hablado | Texto en pantalla | Primer plano |
|---|---|---|---|---|
| 1 | ... | ... | ... | ... |

## Cómo grabarlo en 10 minutos
- Graba el cuerpo una vez y luego los N hooks seguidos, con el mismo plano y la misma luz.
- Monta cada hook + el mismo cuerpo, y exporta N vídeos.

## Cómo medir (48-72 h después)
- Métrica principal: % de retención a los 3 segundos y visualizaciones de no seguidores.
- Métrica secundaria: veces compartido y guardado.
- Publica la versión ganadora en tu perfil y apunta el patrón de hook que ganó para el próximo guion.
```
