'use client';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function AboutHeroScene({ mode = 1 }) {
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

    const group = new THREE.Group();
    scene.add(group);

    // ── Setup Mode-specific elements ──
    
    if (mode === 1) { // Digital Architecture (Grid)
      const gridHelperTop = new THREE.GridHelper(40, 40, 0xe8001c, 0x222222);
      gridHelperTop.position.y = 10;
      group.add(gridHelperTop);
      
      const gridHelperBottom = new THREE.GridHelper(40, 40, 0xe8001c, 0x222222);
      gridHelperBottom.position.y = -10;
      group.add(gridHelperBottom);

      const pGeo = new THREE.BoxGeometry(0.05, 10, 0.05);
      const pMat = new THREE.MeshBasicMaterial({ color: 0xe8001c, transparent: true, opacity: 0.3 });
      for(let i=0; i<50; i++) {
        const pillar = new THREE.Mesh(pGeo, pMat);
        pillar.position.set((Math.random()-0.5)*30, 0, (Math.random()-0.5)*30);
        group.add(pillar);
      }
    } 
    else if (mode === 2) { // Neural Pulse (Network)
      const points = [];
      for (let i = 0; i < 80; i++) {
        points.push(new THREE.Vector3((Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10));
      }
      const pGeo = new THREE.BufferGeometry().setFromPoints(points);
      const pMat = new THREE.PointsMaterial({ size: 0.1, color: 0xe8001c });
      const pMesh = new THREE.Points(pGeo, pMat);
      group.add(pMesh);

      const lineMat = new THREE.LineBasicMaterial({ color: 0xe8001c, transparent: true, opacity: 0.1 });
      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          if (points[i].distanceTo(points[j]) < 3) {
            const lGeo = new THREE.BufferGeometry().setFromPoints([points[i], points[j]]);
            group.add(new THREE.Line(lGeo, lineMat));
          }
        }
      }
    }
    else if (mode === 3) { // Holographic Records (Ring)
      for(let i=0; i<15; i++) {
        const ring = new THREE.Mesh(
          new THREE.TorusGeometry(1 + i * 0.4, 0.01, 16, 100),
          new THREE.MeshBasicMaterial({ color: 0xe8001c, transparent: true, opacity: 0.5 - i*0.03 })
        );
        ring.rotation.x = Math.PI / 2;
        ring.userData.speed = (Math.random() - 0.5) * 0.5;
        group.add(ring);
      }
    }
    else if (mode === 4) { // Impact Particles (Vortex)
      const count = 2000;
      const positions = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        const theta = Math.random() * Math.PI * 2;
        const radius = Math.random() * 5 + 1;
        positions[i * 3] = radius * Math.cos(theta);
        positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
        positions[i * 3 + 2] = radius * Math.sin(theta);
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      const mat = new THREE.PointsMaterial({ size: 0.02, color: 0xe8001c, transparent: true, opacity: 0.6 });
      group.add(new THREE.Points(geo, mat));
    }
    else if (mode === 5) { // Global Node Network (Modern Globe)
      const globe = new THREE.Mesh(
        new THREE.SphereGeometry(2, 32, 32),
        new THREE.MeshBasicMaterial({ color: 0xe8001c, wireframe: true, transparent: true, opacity: 0.2 })
      );
      group.add(globe);
      
      const pCount = 400;
      const pPos = new Float32Array(pCount * 3);
      for (let i = 0; i < pCount; i++) {
        const r = 2.05;
        const phi = Math.random() * Math.PI * 2;
        const theta = Math.random() * Math.PI;
        pPos[i * 3] = r * Math.sin(theta) * Math.cos(phi);
        pPos[i * 3 + 1] = r * Math.cos(theta);
        pPos[i * 3 + 2] = r * Math.sin(theta) * Math.sin(phi);
      }
      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      group.add(new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.05, color: 0xe8001c })));
    }

    // ── Lighting ──
    scene.add(new THREE.AmbientLight(0xffffff, 0.4));
    const pl = new THREE.PointLight(0xe8001c, 10, 20);
    pl.position.set(5, 5, 5);
    scene.add(pl);

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
    const animate = () => {
      frame = requestAnimationFrame(animate);
      elapsed += 0.01;
      
      group.rotation.y = elapsed * 0.1;
      if (mode === 3) {
        group.children.forEach(c => {
          if (c.userData.speed) c.rotation.z += c.userData.speed * 0.1;
        });
      }
      if (mode === 4) {
        group.rotation.y = elapsed * 0.5;
      }
      
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  }, [mode]);

  return <div ref={mountRef} style={{ position: 'absolute', inset: 0, zIndex: 0 }} />;
}
