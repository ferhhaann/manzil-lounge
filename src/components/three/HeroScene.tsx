import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

/* ── Floating gold dust particles ── */
const FloatingParticles = ({ count = 120 }) => {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 24;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 16;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 12;
    }
    return arr;
  }, [count]);

  useFrame((s) => {
    if (!ref.current) return;
    ref.current.rotation.y = s.clock.elapsedTime * 0.015;
    ref.current.rotation.x = Math.sin(s.clock.elapsedTime * 0.01) * 0.1;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.035} color="#D4AF37" transparent opacity={0.5} sizeAttenuation blending={THREE.AdditiveBlending} depthWrite={false} />
    </points>
  );
};

/* ── Wireframe room ── */
const WireframeRoom = () => {
  const group = useRef<THREE.Group>(null);

  useFrame((s) => {
    if (!group.current) return;
    group.current.rotation.y = Math.sin(s.clock.elapsedTime * 0.15) * 0.15 + 0.3;
    group.current.position.y = Math.sin(s.clock.elapsedTime * 0.3) * 0.08;
  });

  const goldWire = useMemo(() => new THREE.MeshBasicMaterial({ color: '#D4AF37', wireframe: true, transparent: true, opacity: 0.25 }), []);
  const goldSolid = useMemo(() => new THREE.MeshBasicMaterial({ color: '#D4AF37', transparent: true, opacity: 0.06 }), []);
  const accentWire = useMemo(() => new THREE.MeshBasicMaterial({ color: '#D4AF37', wireframe: true, transparent: true, opacity: 0.15 }), []);

  const W = 4.5, H = 2.8, D = 3.5;

  return (
    <group ref={group} position={[3.2, -0.3, 0]} scale={0.85}>
      {/* ── Room shell (floor, back wall, side wall) ── */}
      {/* Floor */}
      <mesh position={[0, -H / 2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[W, D, 8, 6]} />
        <primitive object={goldWire} attach="material" />
      </mesh>
      {/* Back wall */}
      <mesh position={[0, 0, -D / 2]}>
        <planeGeometry args={[W, H, 8, 5]} />
        <primitive object={goldWire} attach="material" />
      </mesh>
      {/* Left wall */}
      <mesh position={[-W / 2, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[D, H, 6, 5]} />
        <primitive object={goldWire} attach="material" />
      </mesh>

      {/* ── Bed ── */}
      <group position={[0.3, -H / 2 + 0.25, -0.3]}>
        {/* Mattress */}
        <mesh position={[0, 0.15, 0]}>
          <boxGeometry args={[2.2, 0.3, 1.6]} />
          <primitive object={goldWire} attach="material" />
        </mesh>
        {/* Bed frame */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[2.4, 0.15, 1.7]} />
          <primitive object={goldSolid} attach="material" />
        </mesh>
        {/* Headboard */}
        <mesh position={[0, 0.55, -0.8]}>
          <boxGeometry args={[2.3, 0.8, 0.08]} />
          <primitive object={goldWire} attach="material" />
        </mesh>
        {/* Pillows */}
        <mesh position={[-0.5, 0.4, -0.55]}>
          <boxGeometry args={[0.6, 0.15, 0.35]} />
          <primitive object={accentWire} attach="material" />
        </mesh>
        <mesh position={[0.5, 0.4, -0.55]}>
          <boxGeometry args={[0.6, 0.15, 0.35]} />
          <primitive object={accentWire} attach="material" />
        </mesh>
      </group>

      {/* ── Nightstand left ── */}
      <mesh position={[-1.5, -H / 2 + 0.3, -0.7]}>
        <boxGeometry args={[0.45, 0.5, 0.4]} />
        <primitive object={goldWire} attach="material" />
      </mesh>
      {/* Lamp on nightstand */}
      <group position={[-1.5, -H / 2 + 0.7, -0.7]}>
        <mesh>
          <cylinderGeometry args={[0.04, 0.06, 0.3, 8]} />
          <primitive object={accentWire} attach="material" />
        </mesh>
        <mesh position={[0, 0.22, 0]}>
          <coneGeometry args={[0.15, 0.2, 8, 1, true]} />
          <primitive object={goldWire} attach="material" />
        </mesh>
      </group>

      {/* ── Nightstand right ── */}
      <mesh position={[1.5, -H / 2 + 0.3, -0.7]}>
        <boxGeometry args={[0.45, 0.5, 0.4]} />
        <primitive object={goldWire} attach="material" />
      </mesh>

      {/* ── TV on wall ── */}
      <mesh position={[0, 0.3, -D / 2 + 0.05]}>
        <boxGeometry args={[1.4, 0.8, 0.04]} />
        <primitive object={goldWire} attach="material" />
      </mesh>
      {/* TV screen glow */}
      <mesh position={[0, 0.3, -D / 2 + 0.08]}>
        <planeGeometry args={[1.3, 0.7]} />
        <meshBasicMaterial color="#D4AF37" transparent opacity={0.03} />
      </mesh>

      {/* ── Desk / table ── */}
      <group position={[-W / 2 + 0.4, -H / 2 + 0.4, 0.6]}>
        <mesh>
          <boxGeometry args={[0.7, 0.04, 0.45]} />
          <primitive object={goldWire} attach="material" />
        </mesh>
        {/* legs */}
        {[[-0.3, -0.2, -0.18], [0.3, -0.2, -0.18], [-0.3, -0.2, 0.18], [0.3, -0.2, 0.18]].map((pos, i) => (
          <mesh key={i} position={pos as [number, number, number]}>
            <cylinderGeometry args={[0.015, 0.015, 0.4, 6]} />
            <primitive object={accentWire} attach="material" />
          </mesh>
        ))}
        {/* Chair */}
        <mesh position={[0, -0.1, 0.45]}>
          <boxGeometry args={[0.4, 0.04, 0.4]} />
          <primitive object={accentWire} attach="material" />
        </mesh>
        <mesh position={[0, 0.15, 0.63]}>
          <boxGeometry args={[0.4, 0.5, 0.04]} />
          <primitive object={accentWire} attach="material" />
        </mesh>
      </group>

      {/* ── Window on back wall ── */}
      <mesh position={[1.5, 0.3, -D / 2 + 0.02]}>
        <planeGeometry args={[0.8, 1.0]} />
        <meshBasicMaterial color="#87CEEB" transparent opacity={0.04} />
      </mesh>
      <lineSegments position={[1.5, 0.3, -D / 2 + 0.03]}>
        <edgesGeometry args={[new THREE.PlaneGeometry(0.8, 1.0)]} />
        <lineBasicMaterial color="#D4AF37" transparent opacity={0.3} />
      </lineSegments>
      {/* Window cross */}
      <mesh position={[1.5, 0.3, -D / 2 + 0.03]}>
        <boxGeometry args={[0.02, 1.0, 0.01]} />
        <primitive object={accentWire} attach="material" />
      </mesh>
      <mesh position={[1.5, 0.3, -D / 2 + 0.03]}>
        <boxGeometry args={[0.8, 0.02, 0.01]} />
        <primitive object={accentWire} attach="material" />
      </mesh>

      {/* ── Ceiling light ── */}
      <mesh position={[0, H / 2 - 0.05, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.4, 6]} />
        <primitive object={accentWire} attach="material" />
      </mesh>
      <mesh position={[0, H / 2 - 0.45, 0]}>
        <sphereGeometry args={[0.12, 8, 8]} />
        <meshBasicMaterial color="#D4AF37" transparent opacity={0.08} />
      </mesh>

      {/* ── Edge highlights (room outline) ── */}
      <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(W, H, D)]} />
        <lineBasicMaterial color="#D4AF37" transparent opacity={0.12} />
      </lineSegments>
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
      <torusGeometry args={[radius, 0.008, 16, 120]} />
      <meshBasicMaterial color="#D4AF37" transparent opacity={0.18} />
    </mesh>
  );
};

/* ── Main scene ── */
const HeroScene = () => {
  return (
    <div className="absolute inset-0 z-[1]" style={{ pointerEvents: 'none' }}>
      <Canvas camera={{ position: [0, 0.5, 8], fov: 55 }} gl={{ antialias: true, alpha: true }} style={{ background: 'transparent' }}>
        <FloatingParticles count={100} />
        <GlowRing radius={5} speed={0.12} />
        <GlowRing radius={6.5} speed={0.08} />
        <Float speed={1.2} rotationIntensity={0.1} floatIntensity={0.3}>
          <WireframeRoom />
        </Float>
      </Canvas>
    </div>
  );
};

export default HeroScene;
