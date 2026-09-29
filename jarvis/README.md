# Jarvis · Rumbo

Asistente local para gestionar la empresa y el ordenador (Windows). Panel web en `http://127.0.0.1:8765`.

## Qué hace
- **Clientes, proyectos, tareas, calendario y marketing**: paneles + el agente los edita por ti.
- **Correo** (IMAP, revisa cada 2 min) y **WhatsApp Business** (webhook): clasifica urgencia y deja borrador de respuesta.
- **Modo "Ocupado"**: si un mensaje es urgente, Jarvis te **llama por teléfono** (Twilio).
- **Control del PC** (`AUTONOMY=full`): ejecuta PowerShell, lee/escribe archivos, abre apps. Bloquea comandos catastróficos (`format`, `diskpart`, `bcdedit`...).

## Instalar (Windows)
1. Instala Python 3.10+.
2. Doble clic en `iniciar.bat` (crea el entorno y `.env`).
3. Edita `.env` con tu `ANTHROPIC_API_KEY` y lo que uses (correo, WhatsApp, Twilio). Vuelve a ejecutar.

## WhatsApp Business
Necesita cuenta Meta Cloud API y URL pública, p. ej. `ngrok http 8765`.
Webhook: `https://TU-URL/webhook/whatsapp` con el `WA_VERIFY_TOKEN` del `.env`.

## Seguridad
- Solo escucha en `127.0.0.1` y exige token (se guarda al abrir el enlace inicial).
- Con `AUTONOMY=full` la IA puede ejecutar comandos sin preguntar. Usa `AUTONOMY=readonly` para probar.
- Solo expón públicamente `/webhook/whatsapp`, nunca el resto.
- Nunca subas `.env` (ya está en `.gitignore`).
