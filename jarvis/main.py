import os, secrets, threading, webbrowser
from pathlib import Path
from dotenv import load_dotenv, set_key

ROOT = Path(__file__).parent
load_dotenv(ROOT / ".env")
if not os.getenv("APP_TOKEN"):
    tok = secrets.token_urlsafe(24)
    (ROOT / ".env").touch()
    set_key(str(ROOT / ".env"), "APP_TOKEN", tok)
    os.environ["APP_TOKEN"] = tok

import uvicorn
from fastapi import Depends, FastAPI, Header, HTTPException, Request, Response
from fastapi.responses import FileResponse, PlainTextResponse
import db, agent, channels

db.init()
app = FastAPI(title="Jarvis Rumbo")
SESSIONS: dict[str, list] = {}

def auth(x_token: str = Header(default="")):
    if not secrets.compare_digest(x_token, os.environ["APP_TOKEN"]):
        raise HTTPException(401, "token invalido")

@app.get("/")
def index():
    return FileResponse(ROOT / "static" / "index.html")

@app.get("/api/config", dependencies=[Depends(auth)])
def config():
    return {"busy": db.get_setting("busy") == "1", "autonomy": os.getenv("AUTONOMY", "full")}

@app.post("/api/busy", dependencies=[Depends(auth)])
async def busy(req: Request):
    db.set_setting("busy", "1" if (await req.json()).get("busy") else "0")
    return config()

@app.post("/api/chat", dependencies=[Depends(auth)])
async def chat(req: Request):
    body = await req.json()
    sid = body.get("session", "default")
    hist = SESSIONS.setdefault(sid, [])
    hist.append({"role": "user", "content": body["message"]})
    try:
        text, SESSIONS[sid] = agent.chat(hist)
    except Exception as e:
        hist.pop()
        raise HTTPException(500, str(e))
    SESSIONS[sid] = SESSIONS[sid][-40:]
    return {"reply": text}

@app.post("/api/messages/{mid}/handled", dependencies=[Depends(auth)])
def handled(mid: int):
    db.mark_handled(mid)
    return {"ok": True}

@app.post("/api/messages/poll", dependencies=[Depends(auth)])
def poll():
    channels.process_incoming(channels.fetch_email())
    return {"ok": True}

@app.get("/api/{table}", dependencies=[Depends(auth)])
def list_rows(table: str):
    try: return db.list_(table)
    except ValueError: raise HTTPException(404)

@app.post("/api/{table}", dependencies=[Depends(auth)])
async def add_row(table: str, req: Request):
    try: return {"id": db.add(table, await req.json())}
    except ValueError: raise HTTPException(404)

@app.put("/api/{table}/{id_}", dependencies=[Depends(auth)])
async def upd_row(table: str, id_: int, req: Request):
    try: db.update(table, id_, await req.json())
    except ValueError: raise HTTPException(404)
    return {"ok": True}

@app.delete("/api/{table}/{id_}", dependencies=[Depends(auth)])
def del_row(table: str, id_: int):
    try: db.delete(table, id_)
    except ValueError: raise HTTPException(404)
    return {"ok": True}

# --- WhatsApp Business webhook (requiere URL publica, ver README) ---
@app.get("/webhook/whatsapp")
def wa_verify(request: Request):
    q = request.query_params
    if q.get("hub.verify_token") == os.getenv("WA_VERIFY_TOKEN", "cambia-esto"):
        return PlainTextResponse(q.get("hub.challenge", ""))
    raise HTTPException(403)

@app.post("/webhook/whatsapp")
async def wa_receive(request: Request):
    threading.Thread(target=channels.process_incoming,
                     args=(channels.parse_wa_webhook(await request.json()),), daemon=True).start()
    return Response(status_code=200)

if __name__ == "__main__":
    channels.start_polling()
    url = f"http://127.0.0.1:8765/?t={os.environ['APP_TOKEN']}"
    print("Jarvis listo:", url)
    threading.Timer(1.5, lambda: webbrowser.open(url)).start()
    uvicorn.run(app, host="127.0.0.1", port=8765, log_level="warning")
