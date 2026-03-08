import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

/* ── Floating particles ── */
const FloatingParticles = ({ count = 40 }) => {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 16;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 10;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    return arr;
  }, [count]);

  useFrame((s) => {
    if (!ref.current) return;
    ref.current.rotation.y = s.clock.elapsedTime * 0.015;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#D4AF37" transparent opacity={0.5} sizeAttenuation blending={THREE.AdditiveBlending} depthWrite={false} />
    </points>
  );
};

/* ── 3D Room with photo texture ── */
const RoomPhoto3D = ({ scrollProgress = 0 }: { scrollProgress?: number }) => {
  const group = useRef<THREE.Group>(null);
  const texture = useLoader(THREE.TextureLoader, '/lovable-uploads/room1.jpg');

  useFrame((s) => {
    if (!group.current) return;
    const t = s.clock.elapsedTime;
    group.current.rotation.y = Math.sin(t * 0.12) * 0.1 + 0.2;
    group.current.rotation.x = Math.sin(t * 0.08) * 0.03;
    group.current.position.y = Math.sin(t * 0.25) * 0.05;
  });

  const W = 5;
  const H = 3.2;
  const D = 2.8;

  const backMat = useMemo(() => new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true,
    opacity: 0.95,
    side: THREE.FrontSide,
  }), [texture]);

  const sideMat = useMemo(() => new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true,
    opacity: 0.3,
    side: THREE.FrontSide,
  }), [texture]);

  const edgeGlow = useMemo(() => new THREE.LineBasicMaterial({
    color: '#D4AF37',
    transparent: true,
    opacity: 0.35,
  }), []);

  return (
    <group ref={group} position={[0, 0, 0]} scale={0.9}>
      {/* Back wall with full photo */}
      <mesh position={[0, 0, -D / 2]}>
        <planeGeometry args={[W, H]} />
        <primitive object={backMat} attach="material" />
      </mesh>

      {/* Floor */}
      <mesh position={[0, -H / 2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[W, D]} />
        <meshBasicMaterial color="#0a1929" transparent opacity={0.7} />
      </mesh>
      <mesh position={[0, -H / 2 + 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[W, D]} />
        <meshBasicMaterial map={texture} transparent opacity={0.12} blending={THREE.AdditiveBlending} />
      </mesh>

      {/* Left wall */}
      <mesh position={[-W / 2, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[D, H]} />
        <primitive object={sideMat} attach="material" />
      </mesh>

      {/* Right wall (partial) */}
      <mesh position={[W / 2, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[D, H]} />
        <meshBasicMaterial color="#0F2D4E" transparent opacity={0.25} />
      </mesh>

      {/* Gold wireframe outline */}
      <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(W, H, D)]} />
        <primitive object={edgeGlow} attach="material" />
      </lineSegments>

      {/* Corner accent lines */}
      {[
        [-W/2, 0, D/2],
        [W/2, 0, D/2],
        [W/2, 0, -D/2],
        [-W/2, 0, -D/2],
      ].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]}>
          <cylinderGeometry args={[0.006, 0.006, H, 4]} />
          <meshBasicMaterial color="#D4AF37" transparent opacity={0.4} />
        </mesh>
      ))}

      {/* Decorative frame */}
      <lineSegments position={[0, 0, -D / 2 + 0.05]}>
        <edgesGeometry args={[new THREE.PlaneGeometry(W - 0.2, H - 0.2)]} />
        <lineBasicMaterial color="#D4AF37" transparent opacity={0.12} />
      </lineSegments>
    </group>
  );
};

/* ── Orbiting ring ── */
const GlowRing = ({ radius = 4, speed = 0.15 }: { radius?: number; speed?: number }) => {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((s) => {
    if (!ref.current) return;
    ref.current.rotation.x = Math.sin(s.clock.elapsedTime * speed) * 0.35 + 0.5;
    ref.current.rotation.z = s.clock.elapsedTime * speed * 0.35;
  });
  return (
    <mesh ref={ref}>
      <torusGeometry args={[radius, 0.005, 16, 100]} />
      <meshBasicMaterial color="#D4AF37" transparent opacity={0.12} />
    </mesh>
  );
};

/* ── Scene content ── */
const SceneContent = () => (
  <>
    <FloatingParticles count={35} />
    <GlowRing radius={4.5} speed={0.1} />
    <GlowRing radius={6} speed={0.07} />
    <Float speed={0.6} rotationIntensity={0.04} floatIntensity={0.12}>
      <RoomPhoto3D />
    </Float>
  </>
);

/* ── Room Animation Scene (for scroll reveal) ── */
const RoomAnimationScene = () => {
  return (
    <div className="w-full h-full">
      <Canvas 
        camera={{ position: [0, 0, 6], fov: 50 }} 
        gl={{ antialias: true, alpha: true }} 
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <SceneContent />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default RoomAnimationScene;
