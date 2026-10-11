#!/usr/bin/env python3
"""Monta cada vídeo: frames (motion.html) + música/efectos + clips tuyos.
Uso:  python3 build.py <1-4> [--frames] [--clip ruta.mp4] [--ss seg]
  --frames  vuelve a renderizar los fotogramas (lento); si no, reutiliza los existentes
  --clip    clip tuyo para el hueco del vídeo (por defecto busca clips/clipN.mp4)
"""
import sys, os, subprocess, wave, math, argparse
import numpy as np

HERE = os.path.dirname(os.path.abspath(__file__))
SCR = os.environ.get('RUMBO_SCRATCH', '/tmp/claude-0/-home-user-Rumboagencia/b178a023-830b-5da1-852b-a912d1f6cda3/scratchpad')
SR = 44100
SLOT = dict(x=216, y=300, w=648, h=1152, r=44)
TEST = dict(x=260, y=330, w=560, h=996, r=44)

CLIPWIN = {1: (9, 16), 2: (10.2, 17), 3: (10, 17), 4: (11, 18)}
WHOOSH = {1: [0, 4.4, 9.2, 16, 22.2, 26], 2: [0, 3.8, 10.2, 17, 23.2, 26],
          3: [0, 4.2, 10, 17, 26], 4: [0, 4.4, 11, 18, 26]}
CLICKS = {1: [], 2: [], 3: [5.5, 6.8, 8.1], 4: []}
STAMPS = {4: [4.4 + .3 + i * 1.4 + .45 for i in range(4)]}
DUCK = {1: [(9, 16)], 2: [(10.2, 17)], 3: [(10, 17)], 4: [(11, 18), (18, 26)]}
CTA_CLICK = 26 + 1.9


def env(n, wins, low, ramp=.25):
    e = np.ones(n)
    for a, b in wins:
        i0, i1 = int(a * SR), int(b * SR)
        e[i0:i1] = low
    k = int(ramp * SR)
    c = np.cumsum(np.pad(e, (k, k), mode='edge'))
    return (c[2 * k:] - c[:-2 * k])[:len(e)] / (2 * k)


def lowpass(x, a):
    y = np.zeros_like(x); s = 0.0
    for i, v in enumerate(x):
        s += a * (v - s); y[i] = s
    return y


def music(v, dur=30):
    n = int(dur * SR); t = np.arange(n) / SR
    out = np.zeros(n)
    bpm = 112; beat = 60 / bpm
    rng = np.random.default_rng(v)
    # kick
    kt = np.arange(int(.28 * SR)) / SR
    kick = np.sin(2 * np.pi * (48 * kt + 70 * (1 - np.exp(-kt * 30)) / 30 * 0 + 90 * np.exp(-kt * 22) / 22)) * np.exp(-kt * 11)
    kick = np.sin(2 * np.pi * np.cumsum(46 + 110 * np.exp(-kt * 28)) / SR) * np.exp(-kt * 9)
    # hat
    ht = np.arange(int(.06 * SR)) / SR
    hat = (rng.standard_normal(len(ht)) * np.exp(-ht * 70)); hat = hat - lowpass(hat, .25)
    # bass: A minor loop
    notes = [55.0, 55.0, 65.41, 49.0]
    b = 0
    while b * beat < dur:
        s = int(b * beat * SR)
        if s + len(kick) < n: out[s:s + len(kick)] += kick * .9
        for h in (.5,):
            s2 = int((b + h) * beat * SR)
            if s2 + len(hat) < n: out[s2:s2 + len(hat)] += hat * .18
        # bass note per beat pair
        f = notes[(b // 2) % 4]
        bl = int(beat * SR)
        bt = np.arange(bl) / SR
        bass = (np.sin(2 * np.pi * f * bt) + .35 * np.sin(2 * np.pi * 2 * f * bt)) * np.exp(-bt * 2.2) * (.5 if b % 2 == 0 else .3)
        if s + bl < n: out[s:s + bl] += bass * .55
        b += 1
    # pad
    chord = [220.0, 261.63, 329.63]
    pad = sum(np.sin(2 * np.pi * f * t + i) for i, f in enumerate(chord)) * .05
    pad *= .6 + .4 * np.sin(2 * np.pi * t / (beat * 8))
    out += pad
    # whooshes
    for w in WHOOSH[v]:
        L = int(.55 * SR); s = int(max(0, w - .25) * SR)
        nz = rng.standard_normal(L)
        sweep = np.linspace(.02, .45, L)
        y = np.zeros(L); st = 0.0
        for i in range(L):
            st += sweep[i] * (nz[i] - st); y[i] = st
        y *= np.sin(np.linspace(0, np.pi, L)) ** 2 * 1.4
        if s + L < n: out[s:s + L] += y * .55
    # clicks / stamps / chime
    def tick(at, f=1800):
        L = int(.05 * SR); tt = np.arange(L) / SR; s = int(at * SR)
        y = (np.sin(2 * np.pi * f * tt) * .6 + rng.standard_normal(L) * .25) * np.exp(-tt * 90)
        if s + L < n: out[s:s + L] += y * .6
    for c in CLICKS[v]: tick(c)
    for c in STAMPS.get(v, []): tick(c, 900)
    tick(CTA_CLICK)
    for k, f in enumerate((880.0, 1318.5)):
        L = int(.5 * SR); tt = np.arange(L) / SR; s = int((CTA_CLICK + .08 + k * .09) * SR)
        y = np.sin(2 * np.pi * f * tt) * np.exp(-tt * 7) * .35
        if s + L < n: out[s:s + L] += y
    out *= env(n, DUCK[v], .16)
    fade = np.minimum(1, t / .4) * np.minimum(1, (dur - t) / .8)
    out *= fade
    out = np.tanh(out * 1.1) * .85
    return out


def write_wav(path, x):
    st = np.stack([x, x], 1)
    with wave.open(path, 'wb') as w:
        w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR)
        w.writeframes((st * 32767).astype('<i2').tobytes())


def sh(*a, **k):
    subprocess.run(a, check=True, **k)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('v', type=int)
    ap.add_argument('--frames', action='store_true')
    ap.add_argument('--clip'); ap.add_argument('--ss', type=float, default=0)
    ap.add_argument('--test'); ap.add_argument('--tss', type=float, default=0)
    ap.add_argument('--out')
    a = ap.parse_args(); v = a.v
    fdir = f'{SCR}/frames{v}'
    if a.frames or not os.path.exists(f'{fdir}/f0899.jpg'):
        sh('node', f'{HERE}/render.mjs', str(v), 'frames', fdir, '30', '30')
    wav = f'{SCR}/music{v}.wav'; write_wav(wav, music(v))
    base = f'{SCR}/base{v}.mp4'
    sh('ffmpeg', '-v', 'error', '-y', '-framerate', '30', '-i', f'{fdir}/f%04d.jpg', '-c:v', 'libx264', '-crf', '17', '-pix_fmt', 'yuv420p', base)

    clip = a.clip or (f'{HERE}/clips/clip{v}.mp4' if os.path.exists(f'{HERE}/clips/clip{v}.mp4') else None)
    test = None
    if v == 4:
        test = a.test or f'{HERE}/assets/testimonio-1.mp4'
    jobs = []  # (file, ss, a, b, rect)
    if clip:
        s, e = CLIPWIN[v]; jobs.append((clip, a.ss, s + .5, e - .3, SLOT))
    if test:
        jobs.append((test, a.tss, 18.6, 25.7, TEST))

    inputs = ['-i', base, '-i', wav]
    fc = []; vlast = '0:v'; alabels = ['1:a']
    for k, (f, ss, s, e, r) in enumerate(jobs):
        idx = 2 + k; d = e - s
        inputs += ['-ss', str(ss), '-t', str(d), '-i', f]
        W, H, R = r['w'], r['h'], r['r']
        alpha = f"if(lte(hypot(max(abs(X-W/2)-(W/2-{R}),0),max(abs(Y-H/2)-(H/2-{R}),0)),{R}),255,0)"
        fc.append(f"[{idx}:v]setpts=PTS-STARTPTS+{s}/TB,scale={W}:{H}:force_original_aspect_ratio=increase,crop={W}:{H},format=yuva420p,geq=lum='lum(X,Y)':cb='cb(X,Y)':cr='cr(X,Y)':a='{alpha}'[c{k}]")
        fc.append(f"[{vlast}][c{k}]overlay={r['x']}:{r['y']}:enable='between(t,{s},{e})':eof_action=pass[o{k}]")
        vlast = f'o{k}'
        fc.append(f"[{idx}:a]aresample={SR},asetpts=PTS-STARTPTS,adelay={int(s*1000)}|{int(s*1000)},volume=1.6[a{k}]")
        alabels.append(f'a{k}')
    out = a.out or f'{HERE}/rumbo_video{v}.mp4'
    if len(alabels) > 1:
        fc.append(''.join(f'[{x}]' for x in alabels) + f'amix=inputs={len(alabels)}:normalize=0:duration=first,alimiter=limit=.95[aout]')
        amap = '[aout]'
    else:
        amap = '1:a'
    cmd = ['ffmpeg', '-v', 'error', '-y'] + inputs
    if fc: cmd += ['-filter_complex', ';'.join(fc)]
    cmd += ['-map', f'[{vlast}]' if jobs else '0:v', '-map', amap, '-t', '30', '-c:v', 'libx264', '-crf', '18', '-preset', 'medium', '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', '192k', '-movflags', '+faststart', out]
    sh(*cmd)
    print('OK', out)


if __name__ == '__main__':
    main()
