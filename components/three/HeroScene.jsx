'use client';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function HeroScene() {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;
    const el = mountRef.current;
    const W = el.clientWidth;
    const H = el.clientHeight;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 1000);
    camera.position.set(0, 0, 5);

    // ── Immersive Digital Video Wall (With Images) ──
    const wallGroup = new THREE.Group();
    scene.add(wallGroup);

    const frameCountTotal = 400;
    const radius = 12;
    const wallHeight = 16;
    
    // The screen geometry
    const frameGeo = new THREE.PlaneGeometry(1.6, 1.0);
    
    // Load Textures - Expanded to 10 unique images
    const textureLoader = new THREE.TextureLoader();
    const imageUrls = [
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&q=80',
      'https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?w=600&q=80',
      'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&q=80',
      'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=600&q=80',
      'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&q=80',
      'https://images.unsplash.com/photo-1540575861501-7c9131d2884b?w=600&q=80',
      'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&q=80',
      'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=600&q=80',
      'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=600&q=80',
      'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=600&q=80'
    ];
    
    const frameCountPerType = Math.floor(frameCountTotal / imageUrls.length);

    const materials = imageUrls.map(url => {
      const texture = textureLoader.load(url);
      texture.colorSpace = THREE.SRGBColorSpace;
      return new THREE.MeshStandardMaterial({
        map: texture,
        color: 0x888888,
        emissive: 0xffffff,
        emissiveMap: texture,
        emissiveIntensity: 0.1,
        roughness: 0.1,
        metalness: 0.5,
        side: THREE.DoubleSide
      });
    });

    // Create one InstancedMesh per material
    const instancedMeshes = materials.map(mat => new THREE.InstancedMesh(frameGeo, mat, frameCountPerType));
    const dummy = new THREE.Object3D();
    const frameData = [];

    instancedMeshes.forEach((mesh, meshIndex) => {
      wallGroup.add(mesh);
      
      for (let i = 0; i < frameCountPerType; i++) {
        const angle = Math.random() * Math.PI * 2;
        const y = (Math.random() - 0.5) * wallHeight;
        
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        
        dummy.position.set(x, y, z);
        dummy.lookAt(0, y, 0);
        dummy.updateMatrix();
        
        const isActive = Math.random() > 0.8;
        
        mesh.setMatrixAt(i, dummy.matrix);
        
        frameData.push({
          meshIndex,
          instanceIndex: i,
          isActive,
          pulseSpeed: 1 + Math.random() * 3,
          pulseOffset: Math.random() * Math.PI * 2
        });
      }
    });

    // ── Cinematic Lighting ──
    scene.add(new THREE.AmbientLight(0xffffff, 0.2));
    
    // Central sweeping light
    const centerLight = new THREE.PointLight(0xe8001c, 15, 25);
    centerLight.position.set(0, 0, 0);
    scene.add(centerLight);
    
    const fillLight = new THREE.PointLight(0xffffff, 8, 20);
    fillLight.position.set(2, -2, 2);
    scene.add(fillLight);

    // ── Resize ──
    const onResize = () => {
      const w = el.clientWidth, h = el.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    // ── Animation Loop ──
    let frame;
    let elapsed = 0;
    let lastTime = performance.now();

    // Position camera inside the cylinder, slightly offset
    camera.position.set(0, 0, 4);

    const animate = () => {
      frame = requestAnimationFrame(animate);
      const now = performance.now();
      const delta = (now - lastTime) / 1000;
      lastTime = now;
      elapsed += delta;

      // Rotate the entire video wall
      wallGroup.rotation.y = elapsed * 0.05;

      // Pulse the active screens' emissive colors
      frameData.forEach((data) => {
        if (data.isActive) {
          const intensity = (Math.sin(elapsed * data.pulseSpeed + data.pulseOffset) + 1) * 0.5;
          const colorVal = 0.5 + (intensity * 0.5); 
          const color = new THREE.Color(colorVal, colorVal, colorVal);
          instancedMeshes[data.meshIndex].setColorAt(data.instanceIndex, color);
        }
      });
      
      instancedMeshes.forEach(mesh => {
        if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
      });

      // Sweep the center light up and down
      centerLight.position.y = Math.sin(elapsed * 0.5) * 5;

      // Fixed camera view
      camera.lookAt(0, 0, -radius);

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} style={{ position: 'absolute', inset: 0, zIndex: 0 }} />;
}
