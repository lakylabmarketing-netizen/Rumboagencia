import sqlite3, threading, time
from pathlib import Path

DB_PATH = Path(__file__).parent / "jarvis.db"
_lock = threading.Lock()

# tabla -> columnas editables
TABLES = {
    "clients":  ["name", "email", "phone", "status", "notes"],
    "projects": ["client_id", "name", "status", "due", "notes"],
    "tasks":    ["title", "project_id", "due", "done", "priority", "notes"],
    "events":   ["title", "start", "end", "notes"],
    "content":  ["title", "channel", "publish_at", "status", "body"],
}

def conn():
    c = sqlite3.connect(DB_PATH, check_same_thread=False)
    c.row_factory = sqlite3.Row
    return c

_c = conn()

def init():
    with _lock:
        for t, cols in TABLES.items():
            defs = ", ".join(f"{k} TEXT" for k in cols)
            _c.execute(f"CREATE TABLE IF NOT EXISTS {t} (id INTEGER PRIMARY KEY AUTOINCREMENT, {defs}, created REAL)")
        _c.execute("""CREATE TABLE IF NOT EXISTS messages (
            id INTEGER PRIMARY KEY AUTOINCREMENT, channel TEXT, sender TEXT, subject TEXT,
            body TEXT, urgent INTEGER DEFAULT 0, draft TEXT, handled INTEGER DEFAULT 0,
            ext_id TEXT UNIQUE, created REAL)""")
        _c.execute("CREATE TABLE IF NOT EXISTS settings (k TEXT PRIMARY KEY, v TEXT)")
        _c.commit()

def _check(table):
    if table not in TABLES and table != "messages":
        raise ValueError(f"tabla desconocida: {table}")

def list_(table, where="", args=()):
    _check(table)
    with _lock:
        rows = _c.execute(f"SELECT * FROM {table} {where} ORDER BY id DESC LIMIT 500", args).fetchall()
    return [dict(r) for r in rows]

def add(table, data):
    _check(table)
    cols = [k for k in data if k in TABLES.get(table, [])]
    with _lock:
        cur = _c.execute(
            f"INSERT INTO {table} ({','.join(cols + ['created'])}) VALUES ({','.join('?' * (len(cols) + 1))})",
            [str(data[k]) for k in cols] + [time.time()])
        _c.commit()
        return cur.lastrowid

def update(table, id_, data):
    _check(table)
    cols = [k for k in data if k in TABLES[table]]
    if not cols:
        return
    with _lock:
        _c.execute(f"UPDATE {table} SET {','.join(k + '=?' for k in cols)} WHERE id=?",
                   [str(data[k]) for k in cols] + [id_])
        _c.commit()

def delete(table, id_):
    _check(table)
    with _lock:
        _c.execute(f"DELETE FROM {table} WHERE id=?", (id_,))
        _c.commit()

def add_message(channel, sender, subject, body, ext_id, urgent=0, draft=None):
    with _lock:
        try:
            cur = _c.execute(
                "INSERT INTO messages (channel,sender,subject,body,urgent,draft,ext_id,created) VALUES (?,?,?,?,?,?,?,?)",
                (channel, sender, subject, body, urgent, draft, ext_id, time.time()))
            _c.commit()
            return cur.lastrowid
        except sqlite3.IntegrityError:
            return None  # ya existia

def mark_handled(id_):
    with _lock:
        _c.execute("UPDATE messages SET handled=1 WHERE id=?", (id_,))
        _c.commit()

def get_setting(k, default=""):
    with _lock:
        r = _c.execute("SELECT v FROM settings WHERE k=?", (k,)).fetchone()
    return r["v"] if r else default

def set_setting(k, v):
    with _lock:
        _c.execute("INSERT INTO settings (k,v) VALUES (?,?) ON CONFLICT(k) DO UPDATE SET v=excluded.v", (k, str(v)))
        _c.commit()
