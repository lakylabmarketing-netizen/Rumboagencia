"""Corta silencios >0.3 s de mi-video.mp4 y guarda el mapa de cortes (para alinear subtítulos)."""
import json, re, subprocess, sys
src, out, mapf = sys.argv[1:4]
PAD = 0.10  # colchón de aire que se deja en cada corte
log = subprocess.run(["ffmpeg","-i",src,"-af","silencedetect=n=-32dB:d=0.3","-f","null","-"],
                     capture_output=True,text=True).stderr
dur = float(re.search(r"Duration: (\d+):(\d+):([\d.]+)", log).expand(r"\1:\2:\3").split(":")[0])*3600 \
    + float(re.search(r"Duration: (\d+):(\d+):([\d.]+)", log).group(2))*60 + float(re.search(r"Duration: (\d+):(\d+):([\d.]+)", log).group(3))
starts = [float(x) for x in re.findall(r"silence_start: ([\d.]+)", log)]
ends   = [float(x) for x in re.findall(r"silence_end: ([\d.]+)", log)]
if len(starts) > len(ends): ends.append(dur)
keep, t = [], 0.0
for s, e in zip(starts, ends):
    if s - t > 0.05: keep.append([max(0, t - PAD if keep else t), min(dur, s + PAD)])
    t = e
if dur - t > 0.05: keep.append([max(0, t - PAD), dur])
parts = "".join(f"[0:v]trim={a:.3f}:{b:.3f},setpts=PTS-STARTPTS[v{i}];[0:a]atrim={a:.3f}:{b:.3f},asetpts=PTS-STARTPTS[a{i}];" for i,(a,b) in enumerate(keep))
cat = "".join(f"[v{i}][a{i}]" for i in range(len(keep)))
subprocess.run(["ffmpeg","-v","error","-y","-i",src,"-filter_complex",f"{parts}{cat}concat=n={len(keep)}:v=1:a=1[v][a]",
  "-map","[v]","-map","[a]","-r","30","-c:v","libx264","-crf","16","-preset","medium","-c:a","aac","-b:a","192k",out],check=True)
json.dump({"source_duration":dur,"keep":keep}, open(mapf,"w"))
tot = sum(b-a for a,b in keep)
print(f"{len(keep)} tramos; {dur:.1f}s -> {tot:.1f}s (quitados {dur-tot:.1f}s)")
