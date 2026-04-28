'use client';
import { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Magnetic from '@/components/Magnetic';

gsap.registerPlugin(ScrollTrigger);

const HeroScene = dynamic(() => import('@/components/three/HeroScene'), { ssr: false });

export default function Hero({ introActive = true }) {
  const headingRef = useRef(null);
  const subRef = useRef(null);
  const ctaRef = useRef(null);
  const tagRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (!introActive) {
      // If intro is not active, ensure elements are visible immediately
      gsap.set([tagRef.current, '.hero-line', subRef.current, ctaRef.current, scrollRef.current], { 
        opacity: 1, 
        y: 0, 
        rotationX: 0, 
        scale: 1 
      });
      return;
    }

    const ctx = gsap.context(() => {
      // Intro timeline
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        tagRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.1 }
      )
        .fromTo(
          '.hero-line',
          { opacity: 0, y: 120, rotationX: -45, scale: 0.9 },
          { opacity: 1, y: 0, rotationX: 0, scale: 1, duration: 1.2, stagger: 0.15, ease: 'back.out(1.4)' },
          '-=0.5'
        )
        .fromTo(
          subRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8 },
          '-=0.6'
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          '-=0.6'
        )
        .fromTo(
          scrollRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 1 },
          '-=0.2'
        );

      // Scroll scrubbing effect
      gsap.to('.hero-text-content', {
        y: -150,
        opacity: 0,
        scale: 0.95,
        ease: 'none',
        scrollTrigger: {
          trigger: '#home',
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });
    });

    return () => ctx.revert();
  }, [introActive]);

  return (
    <section
      id="home"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        paddingTop: '100px',
      }}
    >
      {/* Three.js background */}
      <HeroScene />

      {/* Red gradient blob */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          right: '10%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(232,0,28,0.12) 0%, transparent 70%)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1, width: '100%' }}>
        <div className="hero-text-content" style={{ maxWidth: '760px', margin: '0 auto', textAlign: 'center', perspective: '1000px'}}>
          {/* Tag */}
          <div ref={tagRef} className="section-tag" style={{ opacity: 0, justifyContent: 'center' }}>
            Photo Booth &amp; Digital Engagement
          </div>

          {/* Heading */}
          <div ref={headingRef} style={{ overflow: 'hidden' }}>
            <h1 style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: '16px' }}>
              <div
                className="hero-line heading-xl"
                style={{ opacity: 0, display: 'inline-block', color: 'var(--white)' }}
              >
                Scale
              </div>
              <div
                className="hero-line heading-xl"
                style={{ opacity: 0, display: 'inline-block', color: 'var(--white)' }}
              >
                with
              </div>
              <div
                className="hero-line heading-xl"
                style={{ opacity: 0, display: 'inline-block', color: 'var(--red)', textShadow: '0 0 20px var(--red-glow)' }}
              >
                Bilimbe
              </div>
            </h1>
          </div>

          {/* Subheading */}
          <p
            ref={subRef}
            className="body-lg"
            style={{
              opacity: 0,
              marginTop: '28px',
              maxWidth: '560px',
              marginLeft: 'auto',
              marginRight: 'auto',
              color: 'var(--gray-light)',
            }}
          >
            Empower your events with interactive photo booths, 
            seamless digital engagement, and immersive Web3 infrastructure 
            for forward-thinking teams.
          </p>

          {/* CTA Buttons */}
          <div
            ref={ctaRef}
            style={{ opacity: 0, display: 'flex', gap: '16px', marginTop: '48px', justifyContent: 'center', flexWrap: 'wrap' }}
          >
            <Magnetic strength={0.4}>
              <a
                href="#services"
                id="hero-explore-btn"
                className="btn btn-primary"
              >
                Get Started
              </a>
            </Magnetic>
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollRef}
        style={{
          position: 'absolute',
          bottom: '40px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          opacity: 0,
          zIndex: 1,
        }}
      >
        <span style={{ fontSize: '0.65rem', letterSpacing: '0.2em', color: 'var(--gray)', textTransform: 'uppercase' }}>
          Scroll
        </span>
        <div
          style={{
            width: '1px',
            height: '60px',
            background: 'linear-gradient(to bottom, var(--red), transparent)',
            animation: 'scrollPulse 1.5s ease-in-out infinite',
          }}
        />
        <style jsx>{`
          @keyframes scrollPulse {
            0%, 100% { opacity: 0.4; transform: scaleY(1); }
            50% { opacity: 1; transform: scaleY(1.1); }
          }
        `}</style>
      </div>
    </section>
  );
}
