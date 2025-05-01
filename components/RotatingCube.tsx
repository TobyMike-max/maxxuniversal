// src/components/RotatingCube.tsx
'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { Mesh } from 'three';
import { EffectComposer, Bloom } from '@react-three/postprocessing';


function Cube() {
  const cubeRef = useRef<Mesh>(null!);

  useFrame(() => {
    if (cubeRef.current) {
      cubeRef.current.rotation.x += 0.005;
      cubeRef.current.rotation.y += 0.005;
    }
  });

  return (
    <mesh ref={cubeRef}>
      <boxGeometry args={[2.5, 2.5, 2.5]} />
      {/* <meshStandardMaterial color="#FFD700" metalness={1} roughness={0.4} emissive="#FFAA00" emissiveIntensity={1.5} /> */}
      <meshPhysicalMaterial
        color="#FFD700"
        transparent
        opacity={0.4} // semi-transparent
        roughness={0.05}
        metalness={0.5}
        clearcoat={1} // glossy coat
        clearcoatRoughness={0}
        transmission={0.9} // refraction like glass
        thickness={1} // how deep the material looks
        emissive="#FFCC00" // soft warm glow
        emissiveIntensity={1.2}
      />
    </mesh>
  );
}

export default function RotatingCube() {
  return (
    <div className="w-full h-screen relative z-10">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        {/* Lights */}
        <ambientLight intensity={1} />
        <pointLight position={[5, 5, 5]} intensity={5} color="#ffffff" />
        <pointLight position={[-5, -5, 5]} intensity={5} color="#ffd700" />

        {/* Cube inside Canvas */}
        <Cube />

      </Canvas>
    </div>
  );
}
