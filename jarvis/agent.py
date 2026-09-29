"""Agente Jarvis: bucle de herramientas con la API de Anthropic."""
import json, os
import anthropic
import db, pctools, channels

SYSTEM = """Eres Jarvis, el asistente personal y gestor de la agencia Rumbo. Hablas en español, directo y breve.
Gestionas clientes, proyectos, tareas, calendario, contenido de marketing, correo y WhatsApp Business, y controlas el ordenador Windows del dueño.
Actua con iniciativa: usa las herramientas en vez de pedir permiso. Antes de enviar mensajes a clientes en nombre del dueño, si el tono o contenido es delicado, deja un borrador y avisalo."""

TABLE_ENUM = list(db.TABLES)
TOOLS = [
    {"name": "run_command", "description": "Ejecuta un comando de PowerShell en el PC.", "input_schema": {"type": "object", "properties": {"command": {"type": "string"}}, "required": ["command"]}},
    {"name": "read_file", "description": "Lee un archivo.", "input_schema": {"type": "object", "properties": {"path": {"type": "string"}}, "required": ["path"]}},
    {"name": "write_file", "description": "Escribe un archivo.", "input_schema": {"type": "object", "properties": {"path": {"type": "string"}, "content": {"type": "string"}}, "required": ["path", "content"]}},
    {"name": "list_dir", "description": "Lista una carpeta.", "input_schema": {"type": "object", "properties": {"path": {"type": "string"}}, "required": ["path"]}},
    {"name": "open_target", "description": "Abre una app, archivo o URL en el PC.", "input_schema": {"type": "object", "properties": {"target": {"type": "string"}}, "required": ["target"]}},
    {"name": "db_list", "description": "Lista registros de la empresa. Tablas: " + ", ".join(TABLE_ENUM) + ", messages.", "input_schema": {"type": "object", "properties": {"table": {"type": "string"}}, "required": ["table"]}},
    {"name": "db_add", "description": "Crea un registro. Columnas: " + json.dumps(db.TABLES), "input_schema": {"type": "object", "properties": {"table": {"type": "string", "enum": TABLE_ENUM}, "data": {"type": "object"}}, "required": ["table", "data"]}},
    {"name": "db_update", "description": "Actualiza un registro por id.", "input_schema": {"type": "object", "properties": {"table": {"type": "string", "enum": TABLE_ENUM}, "id": {"type": "integer"}, "data": {"type": "object"}}, "required": ["table", "id", "data"]}},
    {"name": "send_email", "description": "Envia un correo.", "input_schema": {"type": "object", "properties": {"to": {"type": "string"}, "subject": {"type": "string"}, "body": {"type": "string"}}, "required": ["to", "subject", "body"]}},
    {"name": "send_whatsapp", "description": "Envia WhatsApp Business (numero con prefijo internacional, sin +).", "input_schema": {"type": "object", "properties": {"to": {"type": "string"}, "text": {"type": "string"}}, "required": ["to", "text"]}},
    {"name": "call_owner", "description": "Llama por telefono al dueño con un aviso hablado.", "input_schema": {"type": "object", "properties": {"reason": {"type": "string"}}, "required": ["reason"]}},
]

def _run_tool(name, a):
    try:
        if name == "run_command": return pctools.run_command(a["command"])
        if name == "read_file": return pctools.read_file(a["path"])
        if name == "write_file": return pctools.write_file(a["path"], a["content"])
        if name == "list_dir": return pctools.list_dir(a.get("path", "."))
        if name == "open_target": return pctools.open_target(a["target"])
        if name == "db_list": return json.dumps(db.list_(a["table"]), ensure_ascii=False)[:8000]
        if name == "db_add": return f"id={db.add(a['table'], a['data'])}"
        if name == "db_update": db.update(a["table"], a["id"], a["data"]); return "ok"
        if name == "send_email": return channels.send_email(a["to"], a["subject"], a["body"])
        if name == "send_whatsapp": return channels.send_whatsapp(a["to"], a["text"])
        if name == "call_owner": return channels.call_me(a["reason"])
        return f"herramienta desconocida: {name}"
    except Exception as e:
        return f"ERROR: {e}"

def _client():
    return anthropic.Anthropic()

def chat(history):
    """history: lista de mensajes {role, content}. Devuelve (texto, history_actualizado)."""
    model = os.getenv("MODEL", "claude-sonnet-5-5")
    msgs = list(history)
    for _ in range(12):
        r = _client().messages.create(model=model, max_tokens=2048, system=SYSTEM, tools=TOOLS, messages=msgs)
        msgs.append({"role": "assistant", "content": [b.model_dump(exclude_none=True) for b in r.content]})
        if r.stop_reason != "tool_use":
            return "".join(b.text for b in r.content if b.type == "text"), msgs
        results = [{"type": "tool_result", "tool_use_id": b.id, "content": _run_tool(b.name, b.input)}
                   for b in r.content if b.type == "tool_use"]
        msgs.append({"role": "user", "content": results})
    return "Me pasé de pasos; dime si continúo.", msgs

def triage(channel, sender, subject, body):
    """Devuelve (urgente:bool, borrador:str)."""
    if not os.getenv("ANTHROPIC_API_KEY"):
        return False, None
    try:
        r = _client().messages.create(
            model=os.getenv("MODEL", "claude-sonnet-5-5"), max_tokens=500,
            system='Clasifica un mensaje recibido por una agencia de marketing. Responde SOLO JSON: {"urgent": bool, "draft": "borrador de respuesta breve en español"}. Urgente = cliente molesto, pago, plazo inminente, incidencia.',
            messages=[{"role": "user", "content": f"Canal: {channel}\nDe: {sender}\nAsunto: {subject}\n\n{body}"}])
        j = json.loads(r.content[0].text[r.content[0].text.index("{"):r.content[0].text.rindex("}") + 1])
        return bool(j.get("urgent")), j.get("draft")
    except Exception as e:
        print("[triage]", e)
        return False, None
