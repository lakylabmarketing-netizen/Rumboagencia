"""Control del ordenador. Pensado para Windows, funciona tambien en Linux/Mac."""
import os, re, subprocess, sys
from pathlib import Path

# Incluso en modo autonomo total se bloquean comandos catastroficos.
BLOCKED = [
    r"\bformat\s+[a-z]:", r"\bdiskpart\b", r"rm\s+-rf\s+/(\s|$)", r"rd\s+/s\s+/q\s+[a-z]:\\\s*$",
    r"Remove-Item\s+.*-Recurse.*\s[a-z]:\\\s*$", r"\bcipher\s+/w", r"\bbcdedit\b",
    r"reg\s+delete\s+HKLM", r"Clear-Disk", r"\bmkfs\b", r"dd\s+if=.*of=/dev/",
]

def autonomy():
    return os.getenv("AUTONOMY", "full").lower()

def _need_write():
    if autonomy() != "full":
        raise PermissionError("Modo readonly: esta accion modifica el sistema. Cambia AUTONOMY=full en .env.")

def run_command(command: str, timeout: int = 60) -> str:
    _need_write()
    for pat in BLOCKED:
        if re.search(pat, command, re.I):
            return "BLOQUEADO: comando demasiado destructivo, no se ejecuta."
    if sys.platform == "win32":
        args = ["powershell", "-NoProfile", "-Command", command]
    else:
        args = ["bash", "-lc", command]
    try:
        r = subprocess.run(args, capture_output=True, text=True, timeout=timeout)
        out = (r.stdout + r.stderr).strip()
        return out[-6000:] or f"(sin salida, codigo {r.returncode})"
    except subprocess.TimeoutExpired:
        return "Tiempo agotado."

def read_file(path: str) -> str:
    return Path(path).expanduser().read_text(encoding="utf-8", errors="replace")[:20000]

def write_file(path: str, content: str) -> str:
    _need_write()
    p = Path(path).expanduser()
    p.parent.mkdir(parents=True, exist_ok=True)
    p.write_text(content, encoding="utf-8")
    return f"Escrito {p} ({len(content)} caracteres)"

def list_dir(path: str = ".") -> str:
    p = Path(path).expanduser()
    return "\n".join(sorted(f"{'[D] ' if x.is_dir() else ''}{x.name}" for x in p.iterdir()))[:6000]

def open_target(target: str) -> str:
    """Abre una app, archivo o URL."""
    if sys.platform == "win32":
        os.startfile(target)  # type: ignore[attr-defined]
    elif sys.platform == "darwin":
        subprocess.Popen(["open", target])
    else:
        subprocess.Popen(["xdg-open", target])
    return f"Abierto: {target}"
