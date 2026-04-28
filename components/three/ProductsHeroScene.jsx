'use client';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ProductsHeroScene() {
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
    scene.fog = new THREE.FogExp2(0x000000, 0.05);

    const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 1000);
    camera.position.set(0, 8, 18);
    camera.lookAt(0, 10, 0);

    // ── Laser Beams ──
    const lasersCount = 12;
    const lasers = [];
    const laserGeo = new THREE.CylinderGeometry(0.01, 0.2, 40, 8);
    laserGeo.translate(0, 20, 0); // Move origin to base

    for (let i = 0; i < lasersCount; i++) {
      const laserMat = new THREE.MeshBasicMaterial({
        color: 0xff0000,
        transparent: true,
        opacity: 0.3,
        blending: THREE.AdditiveBlending,
      });
      const laser = new THREE.Mesh(laserGeo, laserMat);
      
      // Structured alignment: Two banks of lights
      const bankSide = i < lasersCount / 2 ? -1 : 1;
      const indexInBank = i % (lasersCount / 2);
      
      laser.position.x = bankSide * 4 + (indexInBank - 2) * 1.5;
      laser.position.z = -5;
      laser.position.y = -5;
      
      // Radial spread
      laser.rotation.z = (bankSide * -0.5) + (indexInBank - 2) * 0.1;
      laser.rotation.x = -0.2;
      
      scene.add(laser);
      lasers.push({
        mesh: laser,
        speed: 0.01 + Math.random() * 0.01,
        range: 0.5 + Math.random() * 0.5,
        offset: Math.random() * Math.PI * 2
      });
    }

    // ── Ground Light Points ──
    const lightPointsCount = 20;
    const pointsGeo = new THREE.SphereGeometry(0.1, 8, 8);
    const pointsMat = new THREE.MeshBasicMaterial({ color: 0xff3333 });
    for (let i = 0; i < lightPointsCount; i++) {
      const p = new THREE.Mesh(pointsGeo, pointsMat);
      p.position.set((Math.random() - 0.5) * 25, -2, (Math.random() - 0.5) * 10 - 5);
      scene.add(p);
    }

    // ── Atmosphere / Dust ──
    const particlesCount = 500;
    const particlesGeo = new THREE.BufferGeometry();
    const posArray = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 40;
    }
    particlesGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMat = new THREE.PointsMaterial({ size: 0.05, color: 0xff3333, transparent: true, opacity: 0.2 });
    const dust = new THREE.Points(particlesGeo, particlesMat);
    scene.add(dust);

    // ── Resize ──
    const onResize = () => {
      camera.aspect = el.clientWidth / el.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(el.clientWidth, el.clientHeight);
    };
    window.addEventListener('resize', onResize);

    // ── Animation Loop ──
    let frame;
    let elapsed = 0;

    const animate = () => {
      frame = requestAnimationFrame(animate);
      elapsed += 0.01;

      // Move Lasers
      lasers.forEach((l) => {
        l.mesh.rotation.z = Math.sin(elapsed * l.speed + l.offset) * l.range;
        l.mesh.rotation.x = Math.cos(elapsed * l.speed * 0.5 + l.offset) * 0.2;
        
        // Pulse opacity
        l.mesh.material.opacity = 0.2 + Math.sin(elapsed * 2 + l.offset) * 0.1;
      });

      // Move Dust
      dust.rotation.y += 0.001;

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

  return <div ref={mountRef} style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }} />;
}
