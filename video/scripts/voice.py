"""Detección de voz real (armónicos) y núcleos silábicos sobre el audio original. Sin modelos: autocorrelación + envolvente."""
import json, subprocess, sys
import numpy as np
from scipy.signal import butter, sosfiltfilt, find_peaks

SR = 16000
def load(path):
    raw = subprocess.run(["ffmpeg", "-v", "error", "-i", path, "-ac", "1", "-ar", str(SR), "-f", "f32le", "-"], capture_output=True).stdout
    return np.frombuffer(raw, dtype=np.float32)

def features(x, hop=0.01, win=0.04):
    H, Wn = int(SR * hop), int(SR * win)
    n = (len(x) - Wn) // H
    lags = np.arange(int(SR / 400), int(SR / 75))
    rms = np.zeros(n); voi = np.zeros(n)
    for i in range(n):
        f = x[i * H:i * H + Wn]; f = f - f.mean()
        e = float(np.dot(f, f)) + 1e-12
        rms[i] = 10 * np.log10(e / Wn + 1e-12)
        ac = np.correlate(f, f, "full")[Wn - 1:]
        voi[i] = ac[lags].max() / e
    return rms, voi, hop

def syllable_peaks(x, hop=0.01):
    sos = butter(4, [250, 2800], "bandpass", fs=SR, output="sos")
    y = np.abs(sosfiltfilt(sos, x))
    sos2 = butter(2, 9, "lowpass", fs=SR, output="sos")
    env = sosfiltfilt(sos2, y)
    step = int(SR * hop); env = env[::step]
    env = env / (env.max() + 1e-9)
    pk, _ = find_peaks(env, distance=int(0.085 / hop), prominence=0.02)
    return env, pk * hop

if __name__ == "__main__":
    src = sys.argv[1]
    x = load(src)
    rms, voi, hop = features(x)
    env, pk = syllable_peaks(x, hop)
    voiced = (voi > 0.5) & (rms > -52)
    np.savez("data/voice.npz", rms=rms, voi=voi, voiced=voiced, env=env, peaks=pk, hop=hop)
    # primer tramo con ≥0.3 s de voz casi continua
    run = 0; first = None
    for i, v in enumerate(voiced):
        run = run + 1 if v else max(0, run - 1)
        if run >= 30: first = (i - 29) * hop; break
    print("primera voz sostenida en", round(first, 2), "s")
    keep = json.load(open("public/cuts.json"))["keep"]
    for k, (a, b) in enumerate(keep):
        i0, i1 = int(a / hop), int(b / hop)
        vr = voiced[i0:i1].mean(); npk = int(((pk >= a) & (pk < b)).sum())
        print(f"{k:2d} {a:6.1f}-{b:6.1f} {b-a:5.2f}s voz {vr*100:3.0f}%  picos {npk:3d}  {'<-- RUIDO' if vr < 0.25 else ''}")
    print("picos totales", len(pk))
