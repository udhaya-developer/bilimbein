'use client';
import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, PerspectiveCamera, Float, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

function LiquidPlasma() {
  const mesh = useRef();
  const light = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    
    if (mesh.current) {
      mesh.current.position.y = Math.sin(t * 0.5) * 0.4;
      mesh.current.rotation.x = THREE.MathUtils.lerp(mesh.current.rotation.x, state.mouse.y * 0.3, 0.1);
      mesh.current.rotation.y = THREE.MathUtils.lerp(mesh.current.rotation.y, state.mouse.x * 0.3, 0.1);
    }
    
    if (light.current) {
      light.current.position.x = state.mouse.x * 12;
      light.current.position.y = state.mouse.y * 12;
    }
  });

  return (
    <>
      <pointLight ref={light} intensity={12} color="#e8001c" distance={20} />
      
      <Float speed={1.2} rotationIntensity={0.5} floatIntensity={1}>
        <Sphere ref={mesh} args={[3, 64, 64]}>
          <MeshDistortMaterial
            color="#080808"
            envMapIntensity={1}
            clearcoat={1}
            clearcoatRoughness={0.1}
            metalness={0.9}
            roughness={0.2}
            distort={0.4}
            speed={2}
          />
        </Sphere>
      </Float>

      <mesh position={[0, 0, -5]}>
        <planeGeometry args={[50, 50]} />
        <meshBasicMaterial color="#e8001c" transparent opacity={0.01} />
      </mesh>
    </>
  );
}

function Particles() {
  const ref = useRef();
  const count = 100;
  
  const [positions] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 25;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 25;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return [pos];
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ref.current) {
      ref.current.rotation.y = t * 0.01;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.06} color="#e8001c" transparent opacity={0.2} sizeAttenuation />
    </points>
  );
}

export default function CareerScene() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Small delay to ensure previous WebGL contexts are disposed by the browser
    const timer = setTimeout(() => setReady(true), 100);
    return () => {
      clearTimeout(timer);
      setReady(false);
    };
  }, []);

  if (!ready) return null;

  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
      <Canvas 
        key="career-canvas"
        dpr={[1, 1.5]} 
        camera={{ position: [0, 0, 15], fov: 45 }}
        gl={{ 
          antialias: true, 
          powerPreference: "high-performance",
          alpha: true,
          preserveDrawingBuffer: false
        }}
      >
        <color attach="background" args={['#000']} />
        <ambientLight intensity={0.4} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
        
        <LiquidPlasma />
        <Particles />
        
        <Environment preset="city" />
        <ContactShadows position={[0, -6, 0]} opacity={0.3} scale={20} blur={2.5} far={4.5} />
        
        <fog attach="fog" args={['#000', 8, 25]} />
      </Canvas>
    </div>
  );
}
