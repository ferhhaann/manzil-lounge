import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

/* ── Floating gold dust particles ── */
const FloatingParticles = ({ count = 80 }) => {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 24;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 16;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return arr;
  }, [count]);

  useFrame((s) => {
    if (!ref.current) return;
    ref.current.rotation.y = s.clock.elapsedTime * 0.012;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#D4AF37" transparent opacity={0.45} sizeAttenuation blending={THREE.AdditiveBlending} depthWrite={false} />
    </points>
  );
};

/* ── 3D Room with actual photo texture ── */
const RoomPhoto3D = () => {
  const group = useRef<THREE.Group>(null);
  const texture = useLoader(THREE.TextureLoader, '/lovable-uploads/room1.jpg');

  useFrame((s) => {
    if (!group.current) return;
    const t = s.clock.elapsedTime;
    group.current.rotation.y = Math.sin(t * 0.12) * 0.12 + 0.25;
    group.current.rotation.x = Math.sin(t * 0.08) * 0.03 - 0.05;
    group.current.position.y = Math.sin(t * 0.25) * 0.06;
  });

  // Room dimensions
  const W = 5.5;
  const H = 3.5;
  const D = 3.0;

  // We'll project the photo onto the back wall, and use parts of it for floor/side
  const backMat = useMemo(() => new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true,
    opacity: 0.9,
    side: THREE.FrontSide,
  }), [texture]);

  // Floor: use the bottom portion of the image, stretched
  const floorMat = useMemo(() => {
    const mat = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      opacity: 0.5,
      side: THREE.FrontSide,
    });
    return mat;
  }, [texture]);

  // Side wall: slightly transparent version
  const sideMat = useMemo(() => new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true,
    opacity: 0.35,
    side: THREE.FrontSide,
  }), [texture]);

  // Wireframe accent material
  const wireMat = useMemo(() => new THREE.LineBasicMaterial({
    color: '#D4AF37',
    transparent: true,
    opacity: 0.25,
  }), []);

  // Glow material for edges
  const edgeGlow = useMemo(() => new THREE.LineBasicMaterial({
    color: '#D4AF37',
    transparent: true,
    opacity: 0.4,
  }), []);

  return (
    <group ref={group} position={[3, -0.2, 0]} scale={0.78}>
      {/* ── Back wall with full photo ── */}
      <mesh position={[0, 0, -D / 2]}>
        <planeGeometry args={[W, H]} />
        <primitive object={backMat} attach="material" />
      </mesh>

      {/* ── Floor with reflected/faded photo ── */}
      <mesh position={[0, -H / 2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[W, D]} />
        <meshBasicMaterial 
          color="#0F2D4E"
          transparent 
          opacity={0.6} 
          side={THREE.FrontSide} 
        />
      </mesh>
      {/* Floor reflection overlay */}
      <mesh position={[0, -H / 2 + 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[W, D]} />
        <meshBasicMaterial 
          map={texture}
          transparent 
          opacity={0.15} 
          side={THREE.FrontSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* ── Left wall with faded photo ── */}
      <mesh position={[-W / 2, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[D, H]} />
        <primitive object={sideMat} attach="material" />
      </mesh>

      {/* ── Ceiling (subtle) ── */}
      <mesh position={[0, H / 2, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[W, D]} />
        <meshBasicMaterial color="#1a3a5c" transparent opacity={0.3} side={THREE.FrontSide} />
      </mesh>

      {/* ── Gold wireframe room outline ── */}
      <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(W, H, D)]} />
        <primitive object={edgeGlow} attach="material" />
      </lineSegments>

      {/* ── Corner accent lines ── */}
      {/* Vertical gold lines at visible corners */}
      {[
        [-W/2, 0, D/2],
        [W/2, 0, D/2],
        [W/2, 0, -D/2],
        [-W/2, 0, -D/2],
      ].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]}>
          <cylinderGeometry args={[0.008, 0.008, H, 4]} />
          <meshBasicMaterial color="#D4AF37" transparent opacity={0.5} />
        </mesh>
      ))}

      {/* ── Decorative floating frame around the photo ── */}
      <lineSegments position={[0, 0, -D / 2 + 0.05]}>
        <edgesGeometry args={[new THREE.PlaneGeometry(W - 0.3, H - 0.3)]} />
        <lineBasicMaterial color="#D4AF37" transparent opacity={0.15} />
      </lineSegments>

      {/* ── Light beam effect from ceiling ── */}
      <mesh position={[0, 0.2, -D / 4]} rotation={[0, 0, 0]}>
        <cylinderGeometry args={[0.01, 0.8, H, 8, 1, true]} />
        <meshBasicMaterial 
          color="#D4AF37" 
          transparent 
          opacity={0.03} 
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
};

/* ── Orbiting accent ring ── */
const GlowRing = ({ radius = 4, speed = 0.2 }: { radius?: number; speed?: number }) => {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((s) => {
    if (!ref.current) return;
    ref.current.rotation.x = Math.sin(s.clock.elapsedTime * speed) * 0.4 + 0.6;
    ref.current.rotation.z = s.clock.elapsedTime * speed * 0.4;
  });
  return (
    <mesh ref={ref}>
      <torusGeometry args={[radius, 0.006, 16, 120]} />
      <meshBasicMaterial color="#D4AF37" transparent opacity={0.14} />
    </mesh>
  );
};

/* ── Inner scene (needs Suspense for texture loading) ── */
const SceneContent = () => (
  <>
    <FloatingParticles count={80} />
    <GlowRing radius={5.5} speed={0.1} />
    <GlowRing radius={7} speed={0.07} />
    <Float speed={0.8} rotationIntensity={0.05} floatIntensity={0.15}>
      <RoomPhoto3D />
    </Float>
  </>
);

/* ── Main scene ── */
const HeroScene = () => {
  return (
    <div className="absolute inset-0 z-[1]" style={{ pointerEvents: 'none' }}>
      <Canvas camera={{ position: [0, 0.3, 7], fov: 50 }} gl={{ antialias: true, alpha: true }} style={{ background: 'transparent' }}>
        <Suspense fallback={null}>
          <SceneContent />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default HeroScene;
