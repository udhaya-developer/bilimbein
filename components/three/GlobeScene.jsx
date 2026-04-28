'use client';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function GlobeScene() {
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
    const camera = new THREE.PerspectiveCamera(50, W / H, 0.1, 100);
    camera.position.set(0, 0, 4);

    // Wireframe globe
    const globeGeo = new THREE.SphereGeometry(1.5, 32, 32);
    const globeMat = new THREE.MeshBasicMaterial({
      color: 0xe8001c,
      wireframe: true,
      transparent: true,
      opacity: 0.15,
    });
    const globe = new THREE.Mesh(globeGeo, globeMat);
    scene.add(globe);

    // Inner sphere
    scene.add(new THREE.Mesh(
      new THREE.SphereGeometry(1.45, 32, 32),
      new THREE.MeshStandardMaterial({
        color: 0x0d0d0d,
        emissive: 0xe8001c,
        emissiveIntensity: 0.05,
        transparent: true,
        opacity: 0.8,
      })
    ));

    // City dots
    const cityPositions = [
      { lat: 13.08, lon: 80.27 },
      { lat: 19.07, lon: 72.87 },
      { lat: 28.67, lon: 77.22 },
      { lat: 17.38, lon: 78.47 },
      { lat: 12.97, lon: 77.59 },
      { lat: 15.49, lon: 73.82 },
      { lat: 11.01, lon: 76.96 },
      { lat: 22.57, lon: 88.36 },
    ];
    const dotGeo = new THREE.SphereGeometry(0.04, 8, 8);
    const dotMat = new THREE.MeshBasicMaterial({ color: 0xe8001c });
    cityPositions.forEach(({ lat, lon }) => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lon + 180) * (Math.PI / 180) - Math.PI * 0.9;
      const r = 1.52;
      const dot = new THREE.Mesh(dotGeo, dotMat);
      dot.position.set(
        -r * Math.sin(phi) * Math.cos(theta),
        r * Math.cos(phi),
        r * Math.sin(phi) * Math.sin(theta)
      );
      globe.add(dot);
    });

    // Ring
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(1.9, 0.006, 4, 120),
      new THREE.MeshBasicMaterial({ color: 0xe8001c, transparent: true, opacity: 0.3 })
    );
    ring.rotation.x = Math.PI / 2.5;
    scene.add(ring);

    // Particles
    const pCount = 600;
    const pPos = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount; i++) {
      const r = 2 + Math.random() * 1.5;
      const phi = Math.random() * Math.PI * 2;
      const theta = Math.random() * Math.PI;
      pPos[i * 3] = r * Math.sin(theta) * Math.cos(phi);
      pPos[i * 3 + 1] = r * Math.cos(theta);
      pPos[i * 3 + 2] = r * Math.sin(theta) * Math.sin(phi);
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    scene.add(new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.02, color: 0xe8001c, transparent: true, opacity: 0.5 })));

    // Lighting
    scene.add(new THREE.AmbientLight(0xffffff, 0.3));
    const pl = new THREE.PointLight(0xe8001c, 4, 10);
    pl.position.set(2, 2, 2);
    scene.add(pl);

    // Resize
    const onResize = () => {
      const w = el.clientWidth, h = el.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    // Animation with manual timer
    let frame;
    let elapsed = 0;
    let lastTime = performance.now();
    const animate = () => {
      frame = requestAnimationFrame(animate);
      const now = performance.now();
      elapsed += (now - lastTime) / 1000;
      lastTime = now;
      globe.rotation.y = elapsed * 0.12;
      ring.rotation.z = elapsed * 0.08;
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
