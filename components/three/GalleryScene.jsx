'use client';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function GalleryScene() {
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
    camera.position.z = 10;

    const group = new THREE.Group();
    scene.add(group);

    // ── Floating Digital Artifacts ──
    const count = 40;
    const artifacts = [];
    const geometry = new THREE.PlaneGeometry(0.8, 1.2);
    
    for (let i = 0; i < count; i++) {
      const material = new THREE.MeshBasicMaterial({
        color: 0xe8001c,
        transparent: true,
        opacity: 0.1 + Math.random() * 0.2,
        side: THREE.DoubleSide,
        wireframe: Math.random() > 0.5
      });
      
      const mesh = new THREE.Mesh(geometry, material);
      
      mesh.position.set(
        (Math.random() - 0.5) * 25,
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 15
      );
      
      mesh.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        0
      );
      
      mesh.userData.rotationSpeed = (Math.random() - 0.5) * 0.01;
      mesh.userData.floatSpeed = (Math.random() - 0.5) * 0.005;
      
      group.add(mesh);
      artifacts.push(mesh);
    }

    // ── Grid Lines ──
    const grid = new THREE.GridHelper(50, 50, 0x222222, 0x111111);
    grid.rotation.x = Math.PI / 2;
    grid.position.z = -10;
    scene.add(grid);

    // ── Lighting ──
    scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    const pl = new THREE.PointLight(0xe8001c, 20, 30);
    pl.position.set(0, 0, 5);
    scene.add(pl);

    // ── Mouse Follow ──
    let mouseX = 0, mouseY = 0;
    const onMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouseMove);

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
    const animate = () => {
      frame = requestAnimationFrame(animate);
      
      artifacts.forEach(mesh => {
        mesh.rotation.y += mesh.userData.rotationSpeed;
        mesh.rotation.x += mesh.userData.rotationSpeed * 0.5;
        mesh.position.y += Math.sin(Date.now() * 0.001 + mesh.position.x) * 0.002;
      });

      group.rotation.x += (mouseY * 0.1 - group.rotation.x) * 0.05;
      group.rotation.y += (mouseX * 0.1 - group.rotation.y) * 0.05;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} style={{ position: 'absolute', inset: 0, zIndex: 0 }} />;
}
