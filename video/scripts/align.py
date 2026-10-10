"""Alinea el guion con las pausas reales del vídeo (sin ASR): sílabas ↔ tramos de voz, por programación dinámica."""
import json, re, sys
import numpy as np, subprocess

keep_all = json.load(open("public/cuts.json"))["keep"]
MIN_SPEECH = 0.9  # tramos más cortos son ruido/respiración, no habla
keep = [k for k in keep_all if k[1]-k[0] >= MIN_SPEECH]
text = open("data/guion.txt", encoding="utf-8").read()

STRONG, WEAK = set("aeoáéó"), set("iuíúü")
def syl(w):
    w = w.lower(); n = 0; prev = None
    for ch in w:
        if ch in STRONG or ch in WEAK:
            if prev is None: n += 1
            elif (prev in STRONG and ch in STRONG) or ch in "íú" or prev in "íú": n += 1
            prev = ch
        else: prev = None
    return max(1, n)
NUM = {"40": 2, "35": 3, "120.000": 6, "20": 2, "%": 3}  # sílabas habladas de las cifras
words = []
for tok in text.split():
    core = re.sub(r"[¿?¡!,.;:]+$", "", tok); core = core.lstrip("¿¡")
    end = bool(re.search(r"[,.;:?!]$", tok))
    words.append({"raw": tok, "w": core, "end": end, "syl": NUM.get(core, syl(core)) if core else 0})
words = [w for w in words if w["w"]]
cum = np.cumsum([w["syl"] for w in words]); S = cum[-1]
durs = [b - a for a, b in keep]; T = np.cumsum(durs); Tt = T[-1]; K = len(keep)
N = len(words)
# DP por tramos: coste = duración·(velocidad − velocidad media)² + castigo si el tramo no acaba en fin de cláusula
R = S / Tt; PEN = 1.5
INF = 1e18
dp = np.full((K + 1, N + 1), INF); bk = np.zeros((K + 1, N + 1), int); dp[0, 0] = 0
sc = np.concatenate([[0], cum])
for k in range(1, K + 1):
    d = durs[k - 1]
    for j in range(1, N + 1):
        for i in range(0, j):
            if dp[k - 1, i] >= INF: continue
            sy = sc[j] - sc[i]
            c = dp[k - 1, i] + d * (sy / d - R) ** 2 + (0 if (j == N or words[j - 1]["end"]) else PEN)
            if c < dp[k, j]: dp[k, j] = c; bk[k, j] = i
idx = [N]
for k in range(K, 0, -1): idx.append(int(bk[k, idx[-1]]))
idx = idx[::-1]; starts = idx[:-1]; idx = idx[1:]
out = []
for k, (a, b) in enumerate(keep):
    ws = words[starts[k]:idx[k]]
    tot = sum(w["syl"] for w in ws) or 1
    t = a + 0.08; span = (b - a) - 0.16
    for w in ws:
        d = span * w["syl"] / tot
        out.append({"w": w["raw"], "s": round(t, 3), "e": round(t + d, 3)}); t += d
json.dump(out, open("public/captions.json", "w"), ensure_ascii=False)
json.dump({"starts": starts, "ends": idx}, open("data/boundaries.json", "w"))
print(len(out), "palabras;", "sílabas", S, "; sílabas/seg =", round(S / Tt, 2))
for k, (a, b) in enumerate(keep):
    ws = words[starts[k]:idx[k]]; sy = sum(w["syl"] for w in ws)
    print(k, f"{a:6.1f}-{b:6.1f} {b-a:5.2f}s {sy/(b-a):4.1f} sil/s", " ".join(w["raw"] for w in ws)[:90])
