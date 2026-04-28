'use client';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function FloatingShapes() {
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
    const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 100);
    camera.position.set(0, 0, 8);

    const shapes = [];
    const geometries = [
      new THREE.OctahedronGeometry(0.4),
      new THREE.TetrahedronGeometry(0.5),
      new THREE.IcosahedronGeometry(0.35, 0),
      new THREE.BoxGeometry(0.6, 0.6, 0.6),
    ];

    for (let i = 0; i < 18; i++) {
      const geo = geometries[Math.floor(Math.random() * geometries.length)];
      const isWire = Math.random() > 0.5;
      const mat = new THREE.MeshStandardMaterial({
        color: 0xe8001c,
        emissive: 0xe8001c,
        emissiveIntensity: isWire ? 0.6 : 0.1,
        wireframe: isWire,
        transparent: true,
        opacity: isWire ? 0.5 : 0.15,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(
        (Math.random() - 0.5) * 14,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 4 - 2
      );
      mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
      const speed = 0.2 + Math.random() * 0.6;
      const floatAmp = 0.3 + Math.random() * 0.5;
      const floatOffset = Math.random() * Math.PI * 2;
      shapes.push({ mesh, speed, floatAmp, floatOffset, initY: mesh.position.y });
      scene.add(mesh);
    }

    // Grid floor
    const grid = new THREE.GridHelper(30, 30, 0x1a1a1a, 0x1a1a1a);
    grid.position.y = -4;
    scene.add(grid);

    scene.add(new THREE.AmbientLight(0xffffff, 0.2));
    const pl = new THREE.PointLight(0xe8001c, 5, 20);
    pl.position.set(0, 5, 5);
    scene.add(pl);

    const onResize = () => {
      const w = el.clientWidth, h = el.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    // Manual timer
    let frame;
    let elapsed = 0;
    let lastTime = performance.now();

    const animate = () => {
      frame = requestAnimationFrame(animate);
      const now = performance.now();
      elapsed += (now - lastTime) / 1000;
      lastTime = now;

      shapes.forEach(({ mesh, speed, floatAmp, floatOffset, initY }) => {
        mesh.rotation.x += 0.003 * speed;
        mesh.rotation.y += 0.005 * speed;
        mesh.position.y = initY + Math.sin(elapsed * speed + floatOffset) * floatAmp;
      });
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
