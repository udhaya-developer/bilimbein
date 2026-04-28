'use client';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import dynamic from 'next/dynamic';
import SmoothScroll from '@/components/SmoothScroll';
import Navbar from '@/components/sections/Navbar';
import Footer from '@/components/sections/Footer';
import { productsData } from '@/lib/data';

import './products.css';

const ProductsHeroScene = dynamic(() => import('@/components/three/ProductsHeroScene'), { ssr: false });

gsap.registerPlugin(ScrollTrigger);

export default function ProductsPage() {
  const containerRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Hero Entrance
      gsap.fromTo('.hero-title-line', 
        { y: 50, opacity: 0, rotationX: -45 },
        { y: 0, opacity: 1, rotationX: 0, duration: 1.2, stagger: 0.2, ease: 'power4.out', delay: 0.2 }
      );
      
      gsap.fromTo('.hero-subtitle', 
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.8 }
      );

      // Hero Parallax on Scroll
      gsap.to('.ref-hero-inner', {
        y: 100,
        opacity: 0.5,
        scrollTrigger: {
          trigger: '.ref-hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });

      // Section Fade-ups
      const sections = gsap.utils.toArray('.fade-up-section');
      sections.forEach(sec => {
        gsap.fromTo(sec, 
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sec,
              start: 'top 85%',
            }
          }
        );
      });

      // Product Card Stagger
      const categories = gsap.utils.toArray('.category-block');
      categories.forEach(cat => {
        const cards = cat.querySelectorAll('.ref-card');
        gsap.fromTo(cards, 
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: cat,
              start: 'top 80%',
            }
          }
        );
      });

    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  const scrollToCategory = (id) => {
    setActiveCategory(id);
    if (id === 'all') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(id);
    if(element) {
      const offset = 120; // Offset for sticky nav
      window.scrollTo({ top: element.offsetTop - offset, behavior: 'smooth' });
    }
  };

  const navListRef = useRef(null);

  const scrollNav = (direction) => {
    if (navListRef.current) {
      const scrollAmount = 200;
      navListRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <SmoothScroll>
      <main ref={containerRef} className="ref-products-page">
        <Navbar />
        
        {/* Massive 3D Hero Section */}
        <section className="ref-hero">
          <ProductsHeroScene />
          <div className="container text-center relative z-10 ref-hero-inner">
            <h1 className="ref-heading">
              <div className="hero-title-line text-white">EXPLORE</div>
              <div className="hero-title-line text-red-glow">EXPERIENCES</div>
            </h1>
            <p className="ref-subtitle hero-subtitle">
              FROM ENTRY TO ENGAGEMENT... THE JOURNEY OF <br/>
              DIGITAL TRANSFORMATION BEGINS HERE.
            </p>
            <div className="hero-scroll-indicator">
              <span className="arrow-down">︾</span>
            </div>
          </div>
        </section>

        {/* Sticky Category Navigation with Arrows */}
        <div className="ref-sticky-nav">
          <div className="container nav-wrapper">
            <button className="nav-arrow left" onClick={() => scrollNav('left')}>‹</button>
            <ul className="ref-nav-list" ref={navListRef}>
              <li>
                <button 
                  className={`ref-nav-btn ${activeCategory === 'all' ? 'active' : ''}`}
                  onClick={() => scrollToCategory('all')}
                >
                  ALL PRODUCTS
                </button>
              </li>
              {productsData.map(cat => (
                <li key={cat.id}>
                  <button 
                    className={`ref-nav-btn ${activeCategory === cat.id ? 'active' : ''}`}
                    onClick={() => scrollToCategory(cat.id)}
                  >
                    {cat.category.toUpperCase()}
                  </button>
                </li>
              ))}
            </ul>
            <button className="nav-arrow right" onClick={() => scrollNav('right')}>›</button>
          </div>
        </div>

        {/* Product Grids */}
        <section className="ref-products-main">
          <div className="container">
            {productsData.map((cat) => (
              <div key={cat.id} id={cat.id} className="category-block">
                
                {/* Category Header */}
                <div className="ref-cat-header fade-up-section">
                  <div className="ref-cat-line"></div>
                  <h2 className="ref-cat-title">// {cat.category.toUpperCase()}</h2>
                </div>

                {/* Grid */}
                <div className="ref-grid">
                  {cat.items.map((item, idx) => (
                    <a href={item.link} target="_blank" rel="noopener noreferrer" className="ref-card" key={idx}>
                      <div className="ref-card-image">
                        <img src={item.image} alt={item.name} loading="lazy" />
                      </div>
                      <div className="ref-card-content">
                        <h3 className="ref-card-title">{item.name.toUpperCase()}</h3>
                        <p className="ref-card-desc">Interactive engagement designed to elevate your brand presence and entertain guests.</p>
                        <div className="ref-card-link">
                          <span className="ref-arrow">▶</span> LEARN MORE
                        </div>
                      </div>
                    </a>
                  ))}
                </div>

              </div>
            ))}
          </div>
        </section>

        {/* Not Sure What You Need Section */}
        <section className="ref-guide fade-up-section">
          <div className="container">
            <div className="guide-header">
              <p className="guide-tag">// EVENT GUIDE</p>
              <h2 className="guide-title">NOT SURE WHAT<br/>YOU NEED?</h2>
              <p className="guide-desc">
                Let us help you find the perfect engagement product <br/>
                tailored exactly to your event's specific goals.
              </p>
            </div>

            <div className="guide-grid">
              <div className="guide-col">
                <h4 className="guide-col-title">CASUAL EVENTS</h4>
                <ul className="guide-list">
                  <li><span className="text-red">✓</span> Interactive Photos</li>
                  <li><span className="text-red">✓</span> Easy Sharing</li>
                  <li><span className="text-red">✓</span> Instant Prints</li>
                </ul>
              </div>
              <div className="guide-col">
                <h4 className="guide-col-title">CORPORATE</h4>
                <ul className="guide-list">
                  <li><span className="text-red">✓</span> Data Capture</li>
                  <li><span className="text-red">✓</span> Custom Branding</li>
                  <li><span className="text-red">✓</span> Analytics Dashboard</li>
                </ul>
              </div>
              <div className="guide-col">
                <h4 className="guide-col-title">BRAND ACTIVATION</h4>
                <ul className="guide-list">
                  <li><span className="text-red">✓</span> AR / VR Experiences</li>
                  <li><span className="text-red">✓</span> Viral Video Content</li>
                  <li><span className="text-red">✓</span> Social Media Buzz</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="ref-cta fade-up-section">
          {/* Enhanced Background UI */}
          <div className="cta-bg-container">
            <div className="cta-grid-overlay"></div>
            <div className="cta-blob cta-blob-1"></div>
            <div className="cta-blob cta-blob-2"></div>
            <div className="cta-blob cta-blob-3"></div>
            <div className="cta-scan-line"></div>
          </div>

          <div className="container text-center relative z-10">
            <h2 className="cta-title">BUILD YOUR<br/>EVENT EXPERIENCE</h2>
            <a href="https://www.bilimbe.in/contact-us.html" className="ref-btn-primary">GET CUSTOM PROPOSAL</a>
          </div>
        </section>

        <Footer />
      </main>

    </SmoothScroll>
  );
}
