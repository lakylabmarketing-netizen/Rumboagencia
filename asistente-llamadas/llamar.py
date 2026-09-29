#!/usr/bin/env python3
"""Hace que tu asistente te llame por telefono con Twilio.

Uso:
    python llamar.py "Tienes un lead nuevo en Rumbo"
    python llamar.py --a +34600000000 "Recordatorio: reunion a las 10"
    python llamar.py --prueba "Solo muestra lo que haria, sin llamar"

Solo usa la libreria estandar de Python (3.8+). Sin instalar nada.
"""
import argparse
import base64
import os
import sys
import urllib.parse
import urllib.request
from pathlib import Path
from xml.sax.saxutils import escape


def cargar_env():
    """Lee el archivo .env de esta carpeta (sin librerias externas)."""
    ruta = Path(__file__).with_name(".env")
    if not ruta.exists():
        return
    for linea in ruta.read_text(encoding="utf-8").splitlines():
        linea = linea.strip()
        if linea and not linea.startswith("#") and "=" in linea:
            clave, valor = linea.split("=", 1)
            os.environ.setdefault(clave.strip(), valor.strip().strip('"').strip("'"))


def twiml(mensaje):
    # Voz en espanol de Twilio. Se repite el mensaje una vez por si no lo oyes.
    voz = os.environ.get("TWILIO_VOZ", "Polly.Lucia")
    idioma = os.environ.get("TWILIO_IDIOMA", "es-ES")
    dicho = escape(mensaje)
    return (
        "<Response>"
        f'<Say voice="{voz}" language="{idioma}">{dicho}</Say>'
        '<Pause length="1"/>'
        f'<Say voice="{voz}" language="{idioma}">{dicho}</Say>'
        "</Response>"
    )


def llamar(destino, mensaje, prueba=False):
    sid = os.environ.get("TWILIO_ACCOUNT_SID")
    token = os.environ.get("TWILIO_AUTH_TOKEN")
    origen = os.environ.get("TWILIO_NUMERO")
    faltan = [n for n, v in [("TWILIO_ACCOUNT_SID", sid), ("TWILIO_AUTH_TOKEN", token),
                             ("TWILIO_NUMERO", origen)] if not v]
    if faltan and not prueba:
        sys.exit("Faltan datos en .env: " + ", ".join(faltan))
    if not destino:
        sys.exit("Falta el numero de destino (--a o MI_NUMERO en .env).")

    cuerpo = {"To": destino, "From": origen or "+10000000000", "Twiml": twiml(mensaje)}
    if prueba:
        print("[PRUEBA] No se llama. Se enviaria a", destino)
        print(cuerpo["Twiml"])
        return

    url = f"https://api.twilio.com/2010-04-01/Accounts/{sid}/Calls.json"
    peticion = urllib.request.Request(url, data=urllib.parse.urlencode(cuerpo).encode(), method="POST")
    auth = base64.b64encode(f"{sid}:{token}".encode()).decode()
    peticion.add_header("Authorization", f"Basic {auth}")
    try:
        with urllib.request.urlopen(peticion, timeout=30) as r:
            print("Llamada en marcha. Codigo:", r.status)
    except urllib.error.HTTPError as e:
        sys.exit(f"Twilio rechazo la llamada ({e.code}): {e.read().decode()[:300]}")


if __name__ == "__main__":
    cargar_env()
    p = argparse.ArgumentParser(description="Tu asistente te llama por telefono.")
    p.add_argument("mensaje", help="Lo que dira el asistente")
    p.add_argument("--a", default=os.environ.get("MI_NUMERO"), help="Numero destino (+34...)")
    p.add_argument("--prueba", action="store_true", help="No llama, solo muestra")
    a = p.parse_args()
    llamar(a.a, a.mensaje, a.prueba)
