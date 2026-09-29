# Jarvis para Windows

Asistente por voz para Rumbo. Hablas en Chrome y te responde en voz alta.

## Requisitos
1. Windows con **Google Chrome**, micrófono y altavoces.
2. **Python 3.8+** (python.org, marca "Add to PATH").
3. **Claude Code** instalado y con sesión iniciada (ejecuta `claude` una vez).

## Uso
1. Descarga este repositorio.
2. Doble clic en `jarvis-windows\iniciar-jarvis.bat`.
3. Se abre Chrome: pulsa **Hablar con Jarvis** (o la barra espaciadora) y habla. Permite el micrófono la primera vez.

Opcional: `set JARVIS_USUARIO=Tu nombre` antes de arrancar.

## Llamadas
Configura `asistente-llamadas/` (Twilio) y dile "llámame y dime que...".

## Notas
- Solo escucha en 127.0.0.1: nadie de fuera puede usarlo.
- Quita las variables ANTHROPIC_* al lanzar Claude, para usar tu suscripción y no una clave de API.
- No envía correos ni mensajes por su cuenta.
- Sin probar en Windows real todavía: si algo falla, dime el mensaje de error.
