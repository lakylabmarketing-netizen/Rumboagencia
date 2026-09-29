#!/usr/bin/env python3
"""Jarvis para Windows: servidor local. Solo libreria estandar de Python 3.8+.

Chrome hace de oido y de voz (gratis). El cerebro es tu Claude Code
(`claude -p`), asi que usa tu suscripcion, no una clave de API.
"""
import json
import os
import shutil
import subprocess
import sys
import webbrowser
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

AQUI = Path(__file__).resolve().parent
RAIZ = AQUI.parent
PUERTO = int(os.environ.get("JARVIS_PUERTO", "8765"))
NOMBRE = os.environ.get("JARVIS_USUARIO", "jefe")

PERSONALIDAD = (
    f"Eres Jarvis, el asistente virtual de {NOMBRE}, dueno de Rumbo, una agencia de "
    "Almeria que gestiona redes sociales y sistemas de captacion para restaurantes. "
    "Hablas en espanol, con tono de mayordomo amable y directo. Tus respuestas se leen "
    "en voz alta: maximo 3 frases, sin markdown, sin listas, sin simbolos. "
    "Si te piden llamar por telefono o avisar con una llamada, ejecuta: "
    'python asistente-llamadas/llamar.py "mensaje". '
    "Nunca envies correos ni mensajes a terceros sin confirmacion expresa."
)


def entorno_limpio():
    """Quita ANTHROPIC_* para que Claude Code use tu suscripcion y no una clave."""
    return {k: v for k, v in os.environ.items()
            if not k.startswith(("ANTHROPIC_", "CLAUDE_CODE_")) and k != "CLAUDECODE"}


def preguntar(texto, continuar):
    claude = shutil.which("claude")
    if not claude:
        return "No encuentro Claude Code. Instalalo y ejecuta claude una vez para iniciar sesion."
    cmd = [claude, "-p", texto, "--append-system-prompt", PERSONALIDAD,
           "--allowedTools", "Bash(python asistente-llamadas/llamar.py:*)"]
    if continuar:
        cmd.append("--continue")
    try:
        r = subprocess.run(cmd, cwd=RAIZ, env=entorno_limpio(), capture_output=True,
                           text=True, encoding="utf-8", timeout=180)
    except subprocess.TimeoutExpired:
        return "Se me ha hecho largo, senor. Intentalo de nuevo."
    salida = (r.stdout or "").strip()
    if r.returncode != 0 and not salida:
        return "Claude Code dio un error: " + (r.stderr or "desconocido").strip()[:200]
    return salida or "No tengo respuesta para eso."


class Manejador(BaseHTTPRequestHandler):
    continuar = False

    def _enviar(self, codigo, tipo, cuerpo):
        self.send_response(codigo)
        self.send_header("Content-Type", tipo)
        self.send_header("Content-Length", str(len(cuerpo)))
        self.end_headers()
        self.wfile.write(cuerpo)

    def do_GET(self):
        if self.path in ("/", "/index.html"):
            self._enviar(200, "text/html; charset=utf-8", (AQUI / "index.html").read_bytes())
        else:
            self._enviar(404, "text/plain", b"no")

    def do_POST(self):
        if self.path != "/preguntar":
            return self._enviar(404, "text/plain", b"no")
        n = int(self.headers.get("Content-Length", 0))
        texto = json.loads(self.rfile.read(n) or b"{}").get("texto", "").strip()
        if not texto:
            return self._enviar(400, "application/json", b'{"respuesta":""}')
        respuesta = preguntar(texto, Manejador.continuar)
        Manejador.continuar = True
        self._enviar(200, "application/json; charset=utf-8",
                     json.dumps({"respuesta": respuesta}).encode("utf-8"))

    def log_message(self, *a):
        pass


if __name__ == "__main__":
    # Solo 127.0.0.1: nadie de fuera de tu ordenador puede hablarle a Jarvis.
    servidor = ThreadingHTTPServer(("127.0.0.1", PUERTO), Manejador)
    url = f"http://127.0.0.1:{PUERTO}"
    print(f"Jarvis listo en {url}  (Ctrl+C para cerrar)")
    if "--sin-navegador" not in sys.argv:
        webbrowser.open(url)
    try:
        servidor.serve_forever()
    except KeyboardInterrupt:
        pass
