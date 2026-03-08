import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const FloatingParticles = ({ count = 200 }) => {
  const mesh = useRef<THREE.Points>(null);
  
  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
      sizes[i] = Math.random() * 0.05 + 0.01;
    }
    
    return { positions, sizes };
  }, [count]);
  
  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x = state.clock.elapsedTime * 0.02;
      mesh.current.rotation.y = state.clock.elapsedTime * 0.03;
    }
  });
  
  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.positions.length / 3}
          array={particles.positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#D4AF37"
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

const GlowingRing = ({ radius = 3, speed = 0.3 }: { radius?: number; speed?: number }) => {
  const ref = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * speed) * 0.3 + 0.5;
      ref.current.rotation.z = state.clock.elapsedTime * speed * 0.5;
    }
  });
  
  return (
    <mesh ref={ref}>
      <torusGeometry args={[radius, 0.01, 16, 100]} />
      <meshBasicMaterial color="#D4AF37" transparent opacity={0.3} />
    </mesh>
  );
};

const FloatingGeo = () => {
  const ref = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.1;
      ref.current.rotation.y = state.clock.elapsedTime * 0.15;
      ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
    }
  });
  
  return (
    <mesh ref={ref} position={[4, 0, -2]}>
      <octahedronGeometry args={[0.8, 0]} />
      <meshBasicMaterial color="#D4AF37" wireframe transparent opacity={0.15} />
    </mesh>
  );
};

const HeroScene = () => {
  return (
    <div className="absolute inset-0 z-[1]" style={{ pointerEvents: 'none' }}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <FloatingParticles count={150} />
        <GlowingRing radius={3.5} speed={0.2} />
        <GlowingRing radius={5} speed={0.15} />
        <FloatingGeo />
      </Canvas>
    </div>
  );
};

export default HeroScene;
