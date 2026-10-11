"""Corta silencios >0.3 s y descarta tramos sin voz (ruidos, chasquidos, el sonido raro del inicio) de mi-video.mp4.
Requiere data/voice.npz (scripts/voice.py). Guarda el mapa de cortes en cuts.json para alinear subtítulos."""
import json, re, subprocess, sys
import numpy as np

src, out, mapf = sys.argv[1:4]
PAD = 0.10          # colchón de aire en cada corte
MIN_VOICE = 0.25    # fracción mínima de fotogramas con voz para conservar un tramo
LEAD = 0.15         # aire antes de la primera sílaba

log = subprocess.run(["ffmpeg", "-i", src, "-af", "silencedetect=n=-32dB:d=0.3", "-f", "null", "-"], capture_output=True, text=True).stderr
h, m, s = re.search(r"Duration: (\d+):(\d+):([\d.]+)", log).groups()
dur = int(h) * 3600 + int(m) * 60 + float(s)
starts = [float(x) for x in re.findall(r"silence_start: ([\d.]+)", log)]
ends = [float(x) for x in re.findall(r"silence_end: ([\d.]+)", log)]
if len(starts) > len(ends): ends.append(dur)

raw, t = [], 0.0
for a, b in zip(starts, ends):
    if a - t > 0.05: raw.append([max(0, t - PAD) if raw else t, min(dur, a + PAD)])
    t = b
if dur - t > 0.05: raw.append([max(0, t - PAD), dur])

v = np.load("data/voice.npz"); voiced, hop = v["voiced"], float(v["hop"])
keep = [k for k in raw if voiced[int(k[0] / hop):int(k[1] / hop)].mean() >= MIN_VOICE]
first = next(i for i in range(len(voiced) - 30) if voiced[i:i + 30].mean() > 0.6) * hop
keep[0][0] = max(keep[0][0], first - LEAD)
print(f"descartados {len(raw) - len(keep)} tramos sin voz; la voz empieza en {first:.2f}s")

parts = "".join(f"[0:v]trim={a:.3f}:{b:.3f},setpts=PTS-STARTPTS[v{i}];[0:a]atrim={a:.3f}:{b:.3f},asetpts=PTS-STARTPTS[a{i}];" for i, (a, b) in enumerate(keep))
cat = "".join(f"[v{i}][a{i}]" for i in range(len(keep)))
subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", src, "-filter_complex", f"{parts}{cat}concat=n={len(keep)}:v=1:a=1[v][a]",
                "-map", "[v]", "-map", "[a]", "-r", "30", "-c:v", "libx264", "-crf", "16", "-preset", "medium", "-c:a", "aac", "-b:a", "192k", out], check=True)
json.dump({"source_duration": dur, "keep": keep}, open(mapf, "w"))
tot = sum(b - a for a, b in keep)
print(f"{len(keep)} tramos; {dur:.1f}s -> {tot:.1f}s (quitados {dur - tot:.1f}s)")
