import React, { useRef, useMemo, Suspense, useEffect, useState } from 'react';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import * as THREE from 'three';

/* ── 3D Parallax Background - Full hero image with depth ── */
const ParallaxBackground = () => {
  const group = useRef<THREE.Group>(null);
  const texture = useLoader(THREE.TextureLoader, '/lovable-uploads/room1.jpg');
  const { viewport, mouse } = useThree();

  // Make the image fill the viewport
  const scale = useMemo(() => {
    const imageAspect = 1.5; // approximate aspect ratio of room1.jpg
    const viewportAspect = viewport.width / viewport.height;
    
    if (viewportAspect > imageAspect) {
      return [viewport.width * 1.15, (viewport.width * 1.15) / imageAspect, 1];
    } else {
      return [viewport.height * imageAspect * 1.15, viewport.height * 1.15, 1];
    }
  }, [viewport]);

  useFrame(() => {
    if (!group.current) return;
    // Subtle parallax movement based on mouse position
    group.current.rotation.y = mouse.x * 0.03;
    group.current.rotation.x = -mouse.y * 0.02;
    group.current.position.x = mouse.x * 0.15;
    group.current.position.y = mouse.y * 0.1;
  });

  return (
    <group ref={group}>
      {/* Back layer - main image */}
      <mesh position={[0, 0, -2]}>
        <planeGeometry args={[scale[0], scale[1]]} />
        <meshBasicMaterial map={texture} transparent opacity={1} />
      </mesh>
      
      {/* Mid layer - slightly forward for depth */}
      <mesh position={[0, -0.5, -1]}>
        <planeGeometry args={[scale[0] * 0.6, scale[1] * 0.4]} />
        <meshBasicMaterial map={texture} transparent opacity={0.15} />
      </mesh>

      {/* Vignette overlay */}
      <mesh position={[0, 0, 0.5]}>
        <planeGeometry args={[scale[0] * 1.2, scale[1] * 1.2]} />
        <shaderMaterial
          transparent
          uniforms={{
            color: { value: new THREE.Color('#0F2D4E') }
          }}
          vertexShader={`
            varying vec2 vUv;
            void main() {
              vUv = uv;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `}
          fragmentShader={`
            uniform vec3 color;
            varying vec2 vUv;
            void main() {
              vec2 center = vUv - 0.5;
              float dist = length(center);
              float vignette = smoothstep(0.2, 0.8, dist);
              gl_FragColor = vec4(color, vignette * 0.7);
            }
          `}
        />
      </mesh>
    </group>
  );
};

/* ── Floating particles ── */
const FloatingParticles = ({ count = 60 }) => {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 20;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 12;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    return arr;
  }, [count]);

  useFrame((s) => {
    if (!ref.current) return;
    ref.current.rotation.y = s.clock.elapsedTime * 0.01;
  });

  return (
    <points ref={ref} position={[0, 0, 2]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.025} color="#D4AF37" transparent opacity={0.5} sizeAttenuation blending={THREE.AdditiveBlending} depthWrite={false} />
    </points>
  );
};

/* ── Scene content ── */
const SceneContent = () => (
  <>
    <ParallaxBackground />
    <FloatingParticles count={50} />
  </>
);

/* ── Main Hero Background Scene ── */
const HeroScene = () => {
  return (
    <div className="absolute inset-0 z-[1]" style={{ pointerEvents: 'none' }}>
      <Canvas 
        camera={{ position: [0, 0, 5], fov: 50 }} 
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

export default HeroScene;
