"""Alinea el guion con el audio sin ASR: (1) reparte las palabras entre los tramos de voz comparando sílabas del guion con
núcleos silábicos detectados en la envolvente; (2) dentro de cada tramo casa cada sílaba con su pico por programación dinámica."""
import json, re
import numpy as np

keep = json.load(open("public/cuts.json"))["keep"]
V = np.load("data/voice.npz"); peaks = V["peaks"]
text = open("data/guion.txt", encoding="utf-8").read()

STRONG, WEAK = set("aeoáéó"), set("iuíúü")
def syl(w):
    n, prev = 0, None
    for ch in w.lower():
        if ch in STRONG or ch in WEAK:
            if prev is None: n += 1
            elif (prev in STRONG and ch in STRONG) or ch in "íú" or prev in "íú": n += 1
            prev = ch
        else: prev = None
    return max(1, n)
NUM = {"40": 2, "35": 3, "120.000": 6, "20": 2, "%": 3}
words = []
for tok in text.split():
    core = re.sub(r"[¿?¡!,.;:]+$", "", tok).lstrip("¿¡")
    if core: words.append({"raw": tok, "w": core, "end": bool(re.search(r"[,.;:?!]$", tok)), "syl": NUM.get(core, syl(core))})
N, K = len(words), len(keep)
sc = np.concatenate([[0], np.cumsum([w["syl"] for w in words])])
pk_in = [peaks[(peaks >= a) & (peaks < b)] for a, b in keep]
M = sum(len(p) for p in pk_in); RATIO = sc[-1] / M   # sílabas del guion por pico detectado

# 1) reparto de palabras por tramo
PEN = 2.0; INF = 1e18
dp = np.full((K + 1, N + 1), INF); bk = np.zeros((K + 1, N + 1), int); dp[0, 0] = 0
for k in range(1, K + 1):
    m = len(pk_in[k - 1]); E = m * RATIO
    for j in range(1, N + 1):
        for i in range(j):
            if dp[k - 1, i] >= INF: continue
            sy = sc[j] - sc[i]
            c = dp[k - 1, i] + (sy - E) ** 2 / (E + 2) + (0 if (j == N or words[j - 1]["end"]) else PEN)
            if c < dp[k, j]: dp[k, j], bk[k, j] = c, i
idx = [N]
for k in range(K, 0, -1): idx.append(int(bk[k, idx[-1]]))
idx = idx[::-1]

# 2) dentro del tramo: sílaba ↔ pico (DP monótona con saltos)
def match(n, p, a, b):
    """Devuelve el instante (s) de cada una de las n sílabas dentro del tramo [a,b] con picos p."""
    tl = np.linspace(a + 0.1, b - 0.1, n) if n > 1 else np.array([(a + b) / 2])
    m = len(p); C = np.full((n + 1, m + 1), 1e9); P = np.zeros((n + 1, m + 1), int); C[0, :] = 0
    for j in range(1, n + 1):
        for i in range(1, m + 1):
            opts = [(C[j - 1, i - 1] + abs(tl[j - 1] - p[i - 1]), 0), (C[j, i - 1] + 0.25, 1), (C[j - 1, i] + 0.4, 2)]
            C[j, i], P[j, i] = min(opts)
        C[j, 0] = C[j - 1, 0] + 0.4; P[j, 0] = 2
    t = [None] * n; j, i = n, m
    while j > 0:
        mv = P[j, i] if i > 0 else 2
        if mv == 0: t[j - 1] = p[i - 1]; j -= 1; i -= 1
        elif mv == 1: i -= 1
        else: j -= 1
    # sílabas sin pico: interpolar entre vecinas (o con la línea lineal en los extremos)
    for j in range(n):
        if t[j] is None:
            l = next((q for q in range(j - 1, -1, -1) if t[q] is not None), None)
            r = next((q for q in range(j + 1, n) if t[q] is not None), None)
            t[j] = tl[j] if l is None and r is None else (t[r] - 0.12 * (r - j) if l is None else (t[l] + 0.12 * (j - l) if r is None else t[l] + (t[r] - t[l]) * (j - l) / (r - l)))
    return np.array(t, float)

out, rep = [], []
for k, (a, b) in enumerate(keep):
    ws = words[idx[k]:idx[k + 1]]
    n = sum(w["syl"] for w in ws)
    if not ws: continue
    t = match(n, pk_in[k], a, b)
    j = 0
    for w in ws:
        s0 = t[j] - 0.07; j += w["syl"]; e0 = t[j - 1] + 0.14
        out.append({"w": w["raw"], "s": float(max(a, s0)), "e": float(min(b, e0))})
    rep.append((k, a, b, n, len(pk_in[k]), " ".join(w["raw"] for w in ws)))
# evitar solapes: el fin de cada palabra no pasa del inicio de la siguiente
for i in range(len(out) - 1):
    if out[i]["e"] > out[i + 1]["s"]: out[i]["e"] = out[i + 1]["s"]
for o in out: o["s"], o["e"] = round(o["s"], 3), round(o["e"], 3)
json.dump(out, open("public/captions.json", "w"), ensure_ascii=False)
print(len(out), "palabras;", "picos", M, "sílabas", sc[-1], "razón", round(RATIO, 2))
for k, a, b, n, m, s in rep: print(f"{k:2d} {a:6.1f}-{b:6.1f} {b-a:5.2f}s sil {n:2d} picos {m:2d} | {s[:80]}")
