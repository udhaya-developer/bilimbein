'use client';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import dynamic from 'next/dynamic';
import SmoothScroll from '@/components/SmoothScroll';
import Navbar from '@/components/sections/Navbar';
import Footer from '@/components/sections/Footer';
import Magnetic from '@/components/Magnetic';

import './gallery.css';

const GalleryScene = dynamic(() => import('@/components/three/GalleryScene'), { ssr: false });

gsap.registerPlugin(ScrollTrigger);

const categories = [
  "ALL PRODUCTS", 
  "DIGITAL VIDEO BOOTH", 
  "PHOTO BOOTH", 
  "DIGITAL ENTERTAINMENT", 
  "AR & VR GAMES", 
  "TOUCH SCREEN GAMES", 
  "CODE & REGISTRATION",
  "CUSTOM TECH DEVELOP"
];

const galleryItems = [
  { id: 1, title: "AI Portrait Booth", category: "PHOTO BOOTH", img: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80" },
  { id: 2, title: "Glambot Cinematic", category: "DIGITAL VIDEO BOOTH", img: "https://images.unsplash.com/photo-1533130061792-64b345e4a833?w=800&q=80" },
  { id: 3, title: "AR Interactive Wall", category: "AR & VR GAMES", img: "https://images.unsplash.com/photo-1626544827763-d516dce335e2?w=800&q=80" },
  { id: 4, title: "360 Spin Experience", category: "DIGITAL VIDEO BOOTH", img: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80" },
  { id: 5, title: "Digital Mosaic", category: "DIGITAL ENTERTAINMENT", img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80" },
  { id: 6, title: "VR Flight Simulator", category: "AR & VR GAMES", img: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80" },
  { id: 7, title: "Mirror Magic", category: "PHOTO BOOTH", img: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80" },
  { id: 8, title: "Bullet Time Array", category: "DIGITAL VIDEO BOOTH", img: "https://images.unsplash.com/photo-1505909182942-e2f09aee3e89?w=800&q=80" },
  { id: 9, title: "QR Scan Entry", category: "CODE & REGISTRATION", img: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80" },
  { id: 10, title: "Interactive Memory", category: "TOUCH SCREEN GAMES", img: "https://images.unsplash.com/photo-1611606063065-ee7946f0787a?w=800&q=80" },
  { id: 11, title: "Custom App Dev", category: "CUSTOM TECH DEVELOP", img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80" },
];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("ALL PRODUCTS");
  const containerRef = useRef(null);
  const navListRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Hero Animation
      gsap.fromTo('.gallery-hero .heading-xl div', 
        { y: 100, opacity: 0, skewY: 10 },
        { y: 0, opacity: 1, skewY: 0, duration: 1.5, stagger: 0.2, ease: 'power4.out' }
      );

      // Gallery Stagger
      gsap.fromTo('.gallery-card', 
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.gallery-grid',
            start: 'top 85%',
          }
        }
      );
    }, containerRef);
    
    return () => ctx.revert();
  }, [activeCategory]);

  const scrollNav = (direction) => {
    if (navListRef.current) {
      const scrollAmount = 200;
      navListRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const filteredItems = galleryItems.filter(item => {
    if (activeCategory === "ALL PRODUCTS") return true;
    return item.category === activeCategory;
  });

  return (
    <SmoothScroll>
      <main ref={containerRef} className="gallery-page">
        <Navbar />

        {/* Hero Section */}
        <section className="gallery-hero">
          <GalleryScene />
          <div className="hero-gradient-overlay"></div>
          
          <div className="container relative z-10">
            <div className="section-tag">VISUAL ARCHIVE</div>
            <h1 className="heading-xl">
              <div>THE <span className="text-red-glow">GALLERY</span></div>
            </h1>
            <p className="hero-subtext max-w-xl mx-auto mt-6">
              A curated collection of digital experiences, brand activations, 
              and interactive storytelling across the nation.
            </p>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="gallery-section">
          {/* Exact Product Page Style Navigation */}
          <div className="gallery-filters-wrapper">
            <div className="container nav-wrapper">
              <button className="nav-arrow left" onClick={() => scrollNav('left')}>‹</button>
              <ul className="gallery-filters" ref={navListRef}>
                {categories.map(cat => (
                  <li key={cat}>
                    <button 
                      className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
                      onClick={() => setActiveCategory(cat)}
                    >
                      {cat}
                    </button>
                  </li>
                ))}
              </ul>
              <button className="nav-arrow right" onClick={() => scrollNav('right')}>›</button>
            </div>
          </div>

          <div className="container">
            {/* Grid */}
            <div className="gallery-grid">
              {filteredItems.map((item) => (
                <div key={item.id} className="gallery-card">
                  <div className="gallery-frame">
                    <div className="gallery-shine"></div>
                    <div className="corner-tl"></div>
                    <div className="corner-br"></div>
                    <img src={item.img} alt={item.title} className="gallery-img" />
                    <div className="gallery-overlay">
                      <div className="gallery-info">
                        <span className="gallery-cat">{item.category}</span>
                        <h3 className="gallery-title">{item.title}</h3>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </SmoothScroll>
  );
}
