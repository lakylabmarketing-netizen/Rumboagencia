'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, Lightformer } from '@react-three/drei';
import { EffectComposer, DepthOfField, ChromaticAberration, Noise, Vignette } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import { R_PATH, R_W } from '@/lib/logo';

/** Forma del isotipo R a partir de su trazado SVG (contorno + contraforma). */
function rShape() {
  const polys = R_PATH.split('Z').filter((s) => s.trim()).map((seg) => {
    const n = (seg.match(/-?\d+(?:\.\d+)?/g) || []).map(Number);
    const pts: number[][] = [];
    for (let i = 0; i < n.length; i += 2) pts.push([n[i], n[i + 1]]);
    return pts;
  });
  const toV = ([x, y]: number[]) => new THREE.Vector2((x - R_W / 2) / 56, (28 - y) / 56);
  const shape = new THREE.Shape(polys[0].map(toV));
  shape.holes.push(new THREE.Path(polys[1].map(toV)));
  return shape;
}

function useCoinGeometries() {
  return useMemo(() => {
    // Moneda: perfil torneado con canto achaflanado
    const r = 0.5, h = 0.075, c = 0.018;
    const prof = [
      new THREE.Vector2(0, -h), new THREE.Vector2(r - c, -h), new THREE.Vector2(r, -h + c),
      new THREE.Vector2(r, h - c), new THREE.Vector2(r - c, h), new THREE.Vector2(0, h),
    ];
    const body = new THREE.LatheGeometry(prof, 72);
    body.rotateX(Math.PI / 2);
    // Aro interior en relieve
    const rim = new THREE.TorusGeometry(0.43, 0.012, 8, 72);
    // R extruida en ambas caras
    const s = rShape();
    const emb = new THREE.ExtrudeGeometry(s, { depth: 0.03, bevelEnabled: true, bevelThickness: 0.008, bevelSize: 0.006, bevelSegments: 2 });
    emb.scale(0.62, 0.62, 1);
    const front = emb.clone().translate(0, 0, h - 0.004);
    const back = emb.clone().rotateY(Math.PI).translate(0, 0, -h + 0.004);
    const rimF = rim.clone().translate(0, 0, h - 0.002);
    const rimB = rim.clone().translate(0, 0, -h + 0.002);
    return { body, deco: [front, back, rimF, rimB] };
  }, []);
}

type Props = { count: number; reduced: boolean };

function CoinRing({ count, reduced }: Props) {
  const { body, deco } = useCoinGeometries();
  const group = useRef<THREE.Group>(null);
  const bodyRef = useRef<THREE.InstancedMesh>(null);
  const decoRefs = useRef<(THREE.InstancedMesh | null)[]>([]);
  const { pointer } = useThree();
  const target = useRef(new THREE.Vector2());
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const seeds = useMemo(() => Array.from({ length: count }, (_, i) => ({
    a: (i / count) * Math.PI * 2, wob: Math.random() * Math.PI * 2, spin: 0.25 + Math.random() * 0.5,
    tilt: new THREE.Euler(Math.random() * 1.2 - 0.6, Math.random() * 1.2 - 0.6, Math.random() * Math.PI),
    r: 2.75 + (Math.random() - 0.5) * 0.35, s: 0.82 + Math.random() * 0.3,
  })), [count]);

  const metal = useMemo(() => new THREE.MeshStandardMaterial({ color: '#6c6c72', metalness: 1, roughness: 0.46 }), []);
  const relief = useMemo(() => new THREE.MeshStandardMaterial({ color: '#9a9aa2', metalness: 1, roughness: 0.3 }), []);

  useFrame((state, dt) => {
    const t = reduced ? 0 : state.clock.elapsedTime;
    // Parallax con inercia hacia el ratón
    target.current.lerp(new THREE.Vector2(pointer.x, pointer.y), reduced ? 1 : Math.min(1, dt * 2.2));
    if (group.current) {
      group.current.rotation.x = -1.05 + target.current.y * 0.18;
      group.current.rotation.y = target.current.x * 0.28;
      group.current.rotation.z = t * 0.06;
    }
    seeds.forEach((sd, i) => {
      const a = sd.a;
      dummy.position.set(Math.cos(a) * sd.r, Math.sin(a) * sd.r, Math.sin(t * 0.6 + sd.wob) * 0.12);
      dummy.rotation.set(sd.tilt.x + Math.PI / 2 + Math.sin(t * 0.4 + sd.wob) * 0.25, sd.tilt.y + t * sd.spin, sd.tilt.z);
      dummy.scale.setScalar(sd.s);
      dummy.updateMatrix();
      bodyRef.current?.setMatrixAt(i, dummy.matrix);
      decoRefs.current.forEach((m) => m?.setMatrixAt(i, dummy.matrix));
    });
    if (bodyRef.current) bodyRef.current.instanceMatrix.needsUpdate = true;
    decoRefs.current.forEach((m) => { if (m) m.instanceMatrix.needsUpdate = true; });
  });

  return (
    <group ref={group}>
      <instancedMesh ref={bodyRef} args={[body, metal, count]} />
      {deco.map((g, i) => <instancedMesh key={i} ref={(m) => { decoRefs.current[i] = m; }} args={[g, relief, count]} />)}
    </group>
  );
}

function Pauser({ visible }: { visible: boolean }) {
  const { setFrameloop } = useThree();
  useEffect(() => { setFrameloop(visible ? 'always' : 'never'); }, [visible, setFrameloop]);
  return null;
}

export default function Ring() {
  const wrap = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const [cfg, setCfg] = useState<{ mobile: boolean; reduced: boolean; webgl: boolean } | null>(null);

  useEffect(() => {
    const mobile = matchMedia('(max-width: 767px), (pointer: coarse)').matches;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    let webgl = false;
    try { webgl = !!document.createElement('canvas').getContext('webgl2'); } catch { /* sin WebGL */ }
    setCfg({ mobile, reduced, webgl });
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0 });
    if (wrap.current) io.observe(wrap.current);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrap} className="absolute inset-0" aria-hidden>
      {cfg?.webgl && (
        <Canvas
          dpr={cfg.mobile ? [1, 1.25] : [1, 1.75]}
          camera={{ position: [0, 0, 7.2], fov: 38 }}
          gl={{ antialias: false, powerPreference: 'high-performance', alpha: false }}
          frameloop={cfg.reduced ? 'demand' : 'always'}
          onCreated={({ gl }) => { gl.setClearColor('#0B0B0B'); gl.toneMapping = THREE.ACESFilmicToneMapping; }}
        >
          {!cfg.reduced && <Pauser visible={visible} />}
          <fog attach="fog" args={['#0B0B0B', 6, 12]} />
          <ambientLight intensity={0.15} />
          <pointLight position={[-3, 3, 4]} intensity={30} color="#ffffff" />
          <pointLight position={[3.5, -2, -2]} intensity={45} color="#F04E17" />
          <Environment resolution={128}>
            <Lightformer form="rect" intensity={2.2} position={[0, 4, 3]} scale={[8, 1.2, 1]} />
            <Lightformer form="rect" intensity={1.2} color="#FF8A3D" position={[-5, -1, -2]} scale={[2, 6, 1]} />
            <Lightformer form="ring" intensity={0.8} position={[4, 1, 2]} scale={2.5} />
          </Environment>
          <CoinRing count={cfg.mobile ? 11 : 16} reduced={cfg.reduced} />
          <EffectComposer multisampling={0} enableNormalPass={false}>
            {cfg.mobile ? <></> : <DepthOfField focusDistance={0.012} focalLength={0.03} bokehScale={5} />}
            <ChromaticAberration blendFunction={BlendFunction.NORMAL} offset={new THREE.Vector2(0.0016, 0.0011)} radialModulation modulationOffset={0.35} />
            <Noise premultiply blendFunction={BlendFunction.ADD} opacity={0.35} />
            <Vignette offset={0.28} darkness={0.82} />
          </EffectComposer>
        </Canvas>
      )}
      {cfg && !cfg.webgl && <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_45%,rgba(240,78,23,.14),transparent_70%)]" />}
    </div>
  );
}
