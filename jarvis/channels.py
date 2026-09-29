"""Correo, WhatsApp Business y llamadas."""
import email, imaplib, os, smtplib, threading, time
from email.header import decode_header, make_header
from email.message import EmailMessage
import httpx
import db

def _dh(v):
    return str(make_header(decode_header(v or "")))

# ---------- Correo ----------
def send_email(to, subject, body):
    msg = EmailMessage()
    msg["From"], msg["To"], msg["Subject"] = os.environ["EMAIL_ADDRESS"], to, subject
    msg.set_content(body)
    with smtplib.SMTP_SSL(os.getenv("SMTP_HOST", "smtp.gmail.com"), int(os.getenv("SMTP_PORT", "465"))) as s:
        s.login(os.environ["EMAIL_ADDRESS"], os.environ["EMAIL_PASSWORD"])
        s.send_message(msg)
    return f"Correo enviado a {to}"

def fetch_email():
    if not os.getenv("EMAIL_ADDRESS"):
        return []
    new = []
    m = imaplib.IMAP4_SSL(os.getenv("IMAP_HOST", "imap.gmail.com"))
    m.login(os.environ["EMAIL_ADDRESS"], os.environ["EMAIL_PASSWORD"])
    m.select("INBOX")
    _, data = m.search(None, "UNSEEN")
    for num in data[0].split()[-20:]:
        _, d = m.fetch(num, "(BODY.PEEK[])")
        msg = email.message_from_bytes(d[0][1])
        body = ""
        for part in msg.walk():
            if part.get_content_type() == "text/plain":
                body = part.get_payload(decode=True).decode(errors="replace")
                break
        new.append(("email", _dh(msg["From"]), _dh(msg["Subject"]), body[:4000], msg["Message-ID"] or f"em-{num.decode()}"))
    m.logout()
    return new

# ---------- WhatsApp Business (Cloud API) ----------
def send_whatsapp(to, text):
    r = httpx.post(
        f"https://graph.facebook.com/v20.0/{os.environ['WA_PHONE_ID']}/messages",
        headers={"Authorization": f"Bearer {os.environ['WA_TOKEN']}"},
        json={"messaging_product": "whatsapp", "to": to, "type": "text", "text": {"body": text}}, timeout=20)
    r.raise_for_status()
    return f"WhatsApp enviado a {to}"

def parse_wa_webhook(payload):
    out = []
    for e in payload.get("entry", []):
        for ch in e.get("changes", []):
            for m in ch.get("value", {}).get("messages", []):
                if m.get("type") == "text":
                    out.append(("whatsapp", m["from"], "", m["text"]["body"], m["id"]))
    return out

# ---------- Llamada cuando estas ocupado ----------
def call_me(reason):
    sid, tok = os.getenv("TWILIO_SID"), os.getenv("TWILIO_TOKEN")
    if not (sid and tok and os.getenv("MY_PHONE")):
        return "Llamada no configurada (falta Twilio)."
    twiml = f'<Response><Say language="es-ES">Hola, soy Jarvis. {reason[:300].replace("<", "").replace("&", "y")}</Say></Response>'
    r = httpx.post(f"https://api.twilio.com/2010-04-01/Accounts/{sid}/Calls.json", auth=(sid, tok),
                   data={"To": os.environ["MY_PHONE"], "From": os.environ["TWILIO_FROM"], "Twiml": twiml}, timeout=20)
    r.raise_for_status()
    return "Llamada iniciada."

# ---------- Triage ----------
def process_incoming(items):
    import agent
    for channel, sender, subject, body, ext in items:
        urgent, draft = agent.triage(channel, sender, subject, body)
        mid = db.add_message(channel, sender, subject, body, ext, int(urgent), draft)
        if mid and urgent and db.get_setting("busy") == "1":
            call_me(f"Mensaje urgente de {sender} por {channel}: {subject or body[:150]}")

def poll_loop(interval=120):
    while True:
        try:
            process_incoming(fetch_email())
        except Exception as e:
            print("[correo]", e)
        time.sleep(interval)

def start_polling():
    threading.Thread(target=poll_loop, daemon=True).start()
