'use client';
import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, Lightformer, useGLTF } from '@react-three/drei';
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

type Part = { geometry: THREE.BufferGeometry; material: THREE.Material };
type Props = { count: number; reduced: boolean; parts: Part[] };

const MODEL = '/models/moneda-r.glb';

function CoinRing({ count, reduced, parts }: Props) {
  const group = useRef<THREE.Group>(null);
  const meshes = useRef<(THREE.InstancedMesh | null)[]>([]);
  const { pointer } = useThree();
  const target = useRef(new THREE.Vector2());
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const seeds = useMemo(() => Array.from({ length: count }, (_, i) => ({
    a: (i / count) * Math.PI * 2, wob: Math.random() * Math.PI * 2, spin: 0.25 + Math.random() * 0.5,
    tilt: new THREE.Euler(Math.random() * 1.2 - 0.6, Math.random() * 1.2 - 0.6, Math.random() * Math.PI),
    r: 2.75 + (Math.random() - 0.5) * 0.35, s: 0.82 + Math.random() * 0.3,
  })), [count]);

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
      dummy.position.set(Math.cos(sd.a) * sd.r, Math.sin(sd.a) * sd.r, Math.sin(t * 0.6 + sd.wob) * 0.12);
      dummy.rotation.set(sd.tilt.x + Math.PI / 2 + Math.sin(t * 0.4 + sd.wob) * 0.25, sd.tilt.y + t * sd.spin, sd.tilt.z);
      dummy.scale.setScalar(sd.s);
      dummy.updateMatrix();
      meshes.current.forEach((m) => m?.setMatrixAt(i, dummy.matrix));
    });
    meshes.current.forEach((m) => { if (m) m.instanceMatrix.needsUpdate = true; });
  });

  return (
    <group ref={group}>
      {parts.map((p, i) => <instancedMesh key={i} ref={(m) => { meshes.current[i] = m; }} args={[p.geometry, p.material, count]} />)}
    </group>
  );
}

/** Monedas hechas por código: se ven mientras carga el modelo de Higgsfield. */
function ProceduralRing({ count, reduced }: { count: number; reduced: boolean }) {
  const { body, deco } = useCoinGeometries();
  const parts = useMemo(() => {
    const metal = new THREE.MeshStandardMaterial({ color: '#6c6c72', metalness: 1, roughness: 0.46 });
    const relief = new THREE.MeshStandardMaterial({ color: '#9a9aa2', metalness: 1, roughness: 0.3 });
    return [{ geometry: body, material: metal }, ...deco.map((g) => ({ geometry: g, material: relief }))];
  }, [body, deco]);
  return <CoinRing count={count} reduced={reduced} parts={parts} />;
}

/** Moneda R modelada en 3D con Higgsfield (Tripo): geometría y texturas PBR del GLB. */
function ModelRing({ count, reduced }: { count: number; reduced: boolean }) {
  const { scene } = useGLTF(MODEL, false);
  const parts = useMemo(() => {
    const out: Part[] = [];
    scene.updateMatrixWorld(true);
    scene.traverse((o) => {
      const m = o as THREE.Mesh;
      if (!m.isMesh) return;
      const g = m.geometry.clone().applyMatrix4(m.matrixWorld);
      g.scale(0.85, 0.85, 0.36); // el modelo sale grueso: lo dejamos con proporción de moneda
      g.computeBoundingSphere();
      const mat = (m.material as THREE.MeshStandardMaterial).clone();
      mat.envMapIntensity = 1.4;
      out.push({ geometry: g, material: mat });
    });
    return out;
  }, [scene]);
  return <CoinRing count={count} reduced={reduced} parts={parts} />;
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
    // Precarga el modelo en cuanto sabemos que se va a usar
    if (webgl && !mobile && !reduced) useGLTF.preload(MODEL, false);
    setCfg({ mobile, reduced, webgl });
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0 });
    if (wrap.current) io.observe(wrap.current);
    return () => io.disconnect();
  }, []);

  // Escritorio con WebGL: anillo 3D en vivo. Móvil o sin WebGL: el vídeo de Higgsfield en bucle.
  // Reducir movimiento: solo el fotograma fijo.
  const mode = !cfg ? null : cfg.reduced ? 'still' : cfg.mobile || !cfg.webgl ? 'video' : '3d';
  const small = !!cfg?.mobile;

  return (
    <div ref={wrap} className="absolute inset-0" aria-hidden>
      {mode === '3d' && cfg && (
        <Canvas
          dpr={[1, 1.75]}
          camera={{ position: [0, 0, 7.2], fov: 38 }}
          gl={{ antialias: false, powerPreference: 'high-performance', alpha: false }}
          onCreated={({ gl }) => { gl.setClearColor('#0B0B0B'); gl.toneMapping = THREE.ACESFilmicToneMapping; }}
        >
          <Pauser visible={visible} />
          <fog attach="fog" args={['#0B0B0B', 6, 12]} />
          <ambientLight intensity={0.15} />
          <pointLight position={[-3, 3, 4]} intensity={30} color="#ffffff" />
          <pointLight position={[3.5, -2, -2]} intensity={45} color="#F04E17" />
          <Environment resolution={128}>
            <Lightformer form="rect" intensity={2.2} position={[0, 4, 3]} scale={[8, 1.2, 1]} />
            <Lightformer form="rect" intensity={1.2} color="#FF8A3D" position={[-5, -1, -2]} scale={[2, 6, 1]} />
            <Lightformer form="ring" intensity={0.8} position={[4, 1, 2]} scale={2.5} />
          </Environment>
          <Suspense fallback={<ProceduralRing count={16} reduced={false} />}>
            <ModelRing count={16} reduced={false} />
          </Suspense>
          <EffectComposer multisampling={0} enableNormalPass={false}>
            <DepthOfField focusDistance={0.012} focalLength={0.03} bokehScale={5} />
            <ChromaticAberration blendFunction={BlendFunction.NORMAL} offset={new THREE.Vector2(0.0016, 0.0011)} radialModulation modulationOffset={0.35} />
            <Noise premultiply blendFunction={BlendFunction.ADD} opacity={0.35} />
            <Vignette offset={0.28} darkness={0.82} />
          </EffectComposer>
        </Canvas>
      )}
      {mode === 'video' && (
        <video
          ref={(v) => { if (v) { if (visible) v.play().catch(() => {}); else v.pause(); } }}
          className="absolute inset-0 h-full w-full object-cover opacity-80"
          src={small ? '/video/anillo-movil.mp4' : '/video/anillo.mp4'}
          poster={small ? '/img/anillo-movil.webp' : '/img/anillo.webp'}
          muted loop playsInline autoPlay preload="auto" disablePictureInPicture
        />
      )}
      {mode === 'still' && (
        <img src={small ? '/img/anillo-movil.webp' : '/img/anillo.webp'} alt="" className="absolute inset-0 h-full w-full object-cover opacity-70" />
      )}
      {/* oscurece el centro para que el titular se lea siempre */}
      {mode && mode !== '3d' && <div className="absolute inset-0 bg-[radial-gradient(55%_45%_at_50%_45%,rgba(11,11,11,.72),rgba(11,11,11,.25)_70%,rgba(11,11,11,.6))]" />}
    </div>
  );
}
