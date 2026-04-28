'use client';
import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, PerspectiveCamera, MeshTransmissionMaterial, Text, Float as FloatDrei } from '@react-three/drei';
import * as THREE from 'three';

function ModernGlassCube() {
  const mesh = useRef();
  const innerRef = useRef();
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    mesh.current.rotation.x = t * 0.1;
    mesh.current.rotation.y = t * 0.15;
    innerRef.current.rotation.x = -t * 0.2;
    innerRef.current.rotation.z = t * 0.1;
  });

  return (
    <group>
      {/* Outer Glass Shell */}
      <mesh ref={mesh}>
        <boxGeometry args={[8, 8, 8]} />
        <meshPhysicalMaterial 
          transparent
          opacity={0.15}
          color="#ffffff"
          metalness={1}
          roughness={0}
          transmission={0.8}
          thickness={1}
        />
      </mesh>

      {/* Internal Core - Glowing Octahedron */}
      <mesh ref={innerRef}>
        <octahedronGeometry args={[2.5, 0]} />
        <meshStandardMaterial 
          color="#e8001c" 
          emissive="#e8001c" 
          emissiveIntensity={4} 
          metalness={1} 
          roughness={0} 
        />
        {/* Wireframe for tech look */}
        <lineSegments>
          <edgesGeometry args={[new THREE.OctahedronGeometry(2.55, 0)]} />
          <lineBasicMaterial color="#ffffff" transparent opacity={0.2} />
        </lineSegments>
      </mesh>

      {/* Floating Data Tags around the cube */}
      <FloatingTags />
    </group>
  );
}

function FloatingTags() {
  const tags = ["AI", "DATA", "TECH", "DIGITAL", "CORE"];
  return (
    <group>
      {tags.map((tag, i) => (
        <FloatDrei key={i} speed={2} rotationIntensity={1} floatIntensity={2} position={[(i - 2) * 5, (Math.random() - 0.5) * 8, -2]}>
          <Text
            fontSize={0.5}
            color="#e8001c"
            opacity={0.3}
            transparent
            font="/fonts/Origin-Bold.otf"
          >
            {tag}
          </Text>
        </FloatDrei>
      ))}
    </group>
  );
}

function Rig() {
  return useFrame((state) => {
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, state.mouse.x * 4, 0.05);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, state.mouse.y * 4, 0.05);
    state.camera.lookAt(0, 0, 0);
  });
}

export default function BlogScene() {
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}>
      <Canvas dpr={[1, 1.5]}>
        <PerspectiveCamera makeDefault position={[0, 0, 15]} fov={50} />
        <ambientLight intensity={1} />
        <pointLight position={[10, 10, 10]} intensity={3} color="#e8001c" />
        <pointLight position={[-10, -10, -10]} intensity={1.5} color="#ffffff" />
        
        <ModernGlassCube />
        <Rig />
        
        <fog attach="fog" args={['#000', 10, 40]} />
      </Canvas>
    </div>
  );
}
