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
| `asistente-herramientas/*.json` | 4 sub-workflows que el asistente usa como herramientas: captar lead, agendar cita, preguntas frecuentes y pasar a humano. |
| `1-mes-de-reels-todo-en-uno.json` | **Las 5 skills de Reels en un solo workflow** (ver abajo). |
| `skills-reels/*.json` | Las 5 skills del vídeo "1 Mes de Reels" como formularios de n8n (ver abajo). |

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

## Herramientas del asistente (`asistente-herramientas/`)

El nodo **Asistente IA** tiene conectadas 4 herramientas. Cada una llama a un sub-workflow:

| Herramienta | Sub-workflow | Qué hace | Necesita |
|---|---|---|---|
| `captar_lead` | `1-captar-lead.json` | Guarda nombre, email, teléfono e interés del cliente en la pestaña **Leads** de Google Sheets y te avisa por email. | Google Sheets + Gmail |
| `agendar_cita` | `2-agendar-cita.json` | Comprueba si el hueco está libre en Google Calendar y crea la cita de 30 minutos. | Google Calendar |
| `preguntas_frecuentes` | `3-preguntas-frecuentes.json` | Devuelve la información de tu negocio (servicios, precios, horario…). **Edita el texto del nodo "Información del negocio".** | Nada |
| `pasar_a_humano` | `4-pasar-a-humano.json` | Registra el caso en la pestaña **Escalados** y avisa al equipo con un resumen de la conversación. | Google Sheets + Gmail |

Para configurarlas:
1. Importa los 4 archivos, cada uno como workflow nuevo, y guárdalos.
2. En cada uno pon tus credenciales y, en los nodos de Google Sheets, la URL de tu hoja. La hoja debe tener las pestañas `Leads` y `Escalados`. En los nodos de Gmail cambia `tu-email@tuagencia.com` por tu email.
3. En el workflow principal, abre cada nodo de herramienta (`captar_lead`, `agendar_cita`…) y elige su sub-workflow en **Workflow**. Si al elegirlo se vacían los campos, vuelve a pulsar **Refresh** en los inputs.

## ⚡ Las 5 skills en uno (`1-mes-de-reels-todo-en-uno.json`)

Un solo workflow con formulario:
1. **Pantalla 1**: eliges qué quieres hacer (ideas, copywriter, trial reels, planificador, lead magnet o *Todo seguido*).
2. **Pantalla 2**: te pide solo los datos de esa opción.
3. **Resultado**: una página que puedes copiar o guardar en PDF.

El modo **Todo seguido** encadena ideas → guiones de las 3 mejores → 4 trial reels de la primera → calendario de la semana. Tarda 1-3 minutos.

Solo necesitas poner tu clave de Gemini en el nodo **Google Gemini Chat Model**, que usan todas las skills.

## Skills de Reels por separado (`skills-reels/`)

Son las 5 skills del vídeo *"1 Mes de Reels – 5 Skills de Claude"*. Cada una es un workflow con **formulario web**: rellenas los datos y la IA te devuelve el resultado en una página que puedes copiar o guardar en PDF.

| Workflow | Qué rellenas | Qué obtienes |
|---|---|---|
| 1 · Generador de ideas | Tu nicho, tus competidores y las transcripciones de sus reels | Temáticas, mejores vídeos, mejores hooks y 15 ideas |
| 2 · Copywriter | La idea, el tono y el objetivo | 5 hooks, guion por segundos, descripción y CTA |
| 3 · Generador de Trial Reels | Un guion | Cuerpo común + N hooks distintos, y cómo medirlos |
| 4 · Planificador de contenido | Formatos, canales, volumen y lo publicado antes | Calendario de lunes a domingo + lista de grabación |
| 5 · Diseñador de lead magnets | Tu branding y el recurso | Lead magnet en HTML con tu marca, listo para "Imprimir → PDF" |

Cómo usarlos:
1. Importa cada `.json` y pon tu credencial de **Google Gemini** en el nodo del modelo. Si prefieres usar Claude, cambia ese nodo por **Anthropic Chat Model**.
2. Pulsa **Test workflow** para abrir el formulario, o activa el workflow y usa la **Production URL** del nodo *Formulario*.

Las instrucciones de cada skill están en el nodo de IA y son las mismas que las de `../claude-skills/`. Si mejoras una, cópiala al otro sitio.
