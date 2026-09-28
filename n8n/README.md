# Auto-respuesta con IA para Instagram, Facebook y WhatsApp (n8n)

Workflow de n8n que responde automáticamente a los mensajes privados de **WhatsApp**, **Instagram** y **Facebook Messenger** con un asistente de IA (Google Gemini) que recuerda la conversación con cada cliente.

```
WhatsApp Trigger ─┐
Instagram Webhook ─┼─> Message Processor ─> Asistente IA ─> Según canal ─┬─> Enviar WhatsApp
Facebook Webhook ──┘                         │      │                     ├─> Enviar Instagram DM
                                     Gemini ─┘      └─ Memoria            └─> Enviar Messenger
                                                     (por usuario)

Verificar Instagram (GET) ─┐
Verificar Facebook (GET) ──┴─> Responder challenge de Meta   (verificación inicial del webhook)
```

## Archivos

| Archivo | Para qué sirve |
|---|---|
| `auto-respuesta-ig-fb-whatsapp.json` | El workflow. Se importa en n8n. |
| `docker-compose.yml` | Levanta n8n y un túnel de Cloudflare con un solo comando. |
| `.env.example` | Plantilla para la URL pública del túnel. |

## 1. Instalar y arrancar n8n

Necesitas [Docker Desktop](https://www.docker.com/products/docker-desktop/).

```bash
cd n8n
docker compose up -d
docker compose logs cloudflared | grep trycloudflare.com
```

Copia la URL `https://xxxx.trycloudflare.com` que aparece en el log y guárdala en el `.env`:

```bash
cp .env.example .env      # edita .env y pega tu URL
docker compose up -d n8n  # reinicia n8n con la URL pública
```

Abre esa URL en el navegador y crea la cuenta de administrador.

> La URL del túnel rápido cambia cada vez que se reinicia `cloudflared`. Para producción, usa un túnel con nombre (con cuenta de Cloudflare) o un VPS con dominio propio.

## 2. Importar el workflow

En n8n, abre **Workflows → Import from file** y elige `auto-respuesta-ig-fb-whatsapp.json`.

## 3. Credenciales

| Nodo | Credencial | Dónde se obtiene |
|---|---|---|
| Google Gemini Chat Model | *Google Gemini (PaLM) API*: una API key | https://aistudio.google.com/app/apikey (tiene capa gratuita) |
| WhatsApp Trigger | *WhatsApp OAuth API*: App ID y App Secret | App de Meta en developers.facebook.com, producto WhatsApp |
| Enviar WhatsApp | *WhatsApp API*: Access Token y Business Account ID | La misma app, en WhatsApp → API Setup |
| Enviar Instagram DM / Enviar Messenger | *Query Auth*: nombre `access_token`, valor = **Page Access Token** | App de Meta, en Messenger / Instagram → token de la página |

## 4. Conectar los webhooks de Meta

1. Activa el workflow (interruptor **Active**).
2. En la app de Meta, en **Webhooks**, configura:
   - Instagram: `https://TU-URL.trycloudflare.com/webhook/instagram`, suscrito a `messages`
   - Página (Messenger): `https://TU-URL.trycloudflare.com/webhook/facebook`, suscrito a `messages`
   - Verify token: el que quieras (el workflow devuelve el `hub.challenge`)
3. WhatsApp se registra solo: el nodo *WhatsApp Trigger* crea su webhook al activarse.

## 5. Personalizar

- **Personalidad o información del negocio:** edita el *System Message* del nodo **Asistente IA**.
- **Modelo:** en *Google Gemini Chat Model*. También puedes sustituirlo por *Ollama Chat Model* (por ejemplo `llama3.2`) para usar un modelo local y gratuito, o por OpenAI o Anthropic.
- **Memoria:** guarda los últimos 10 mensajes de cada usuario, con clave `canal_idUsuario`. Se pierde al reiniciar n8n. Para que sea persistente, cámbiala por *Postgres Chat Memory* o *Redis Chat Memory*.

## Problemas comunes

- **"Your n8n server is configured to use a secure cookie"**: entra por la URL `https://…trycloudflare.com` o por `http://localhost:5678`, no por la IP. Si no hay otra opción, añade `N8N_SECURE_COOKIE=false` (no recomendado).
- **Instagram o Messenger no responden:** en modo desarrollo, la app de Meta solo recibe mensajes de cuentas con rol en la app (administradores o testers).
- **La IA se responde a sí misma:** el *Message Processor* ya descarta los mensajes `is_echo`.
