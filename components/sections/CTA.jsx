'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import dynamic from 'next/dynamic';
import Magnetic from '@/components/Magnetic';

const CtaScene = dynamic(() => import('@/components/three/CtaScene'), { ssr: false });

gsap.registerPlugin(ScrollTrigger);

export default function CTA() {
  const sectionRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo('.cta-title span', 
        { y: 100, opacity: 0, skewY: 10 },
        { 
          y: 0, 
          opacity: 1, 
          skewY: 0, 
          duration: 1.2, 
          stagger: 0.1, 
          ease: 'power4.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          }
        }
      );

      // Subtext animation
      gsap.fromTo('.cta-subtext', 
        { y: 30, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1, 
          delay: 0.4, 
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          }
        }
      );

      // Buttons animation
      gsap.fromTo('.cta-btn-wrapper', 
        { y: 20, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1, 
          delay: 0.6, 
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          }
        }
      );

      // Floating particles parallax
      gsap.to('.cta-bg-glow', {
        y: -50,
        x: 30,
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="section cta-section relative overflow-hidden"
      id="contact"
      style={{
        padding: '160px 0',
        background: '#000',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)'
      }}
    >
      {/* 3D Background */}
      <div className="canvas-container" style={{ opacity: 0.6 }}>
        <CtaScene />
      </div>

      {/* Decorative Glows */}
      <div 
        className="cta-bg-glow"
        style={{
          position: 'absolute',
          top: '20%',
          right: '10%',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, var(--red-glow) 0%, transparent 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />
      <div 
        className="cta-bg-glow"
        style={{
          position: 'absolute',
          bottom: '10%',
          left: '5%',
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)',
          filter: 'blur(50px)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      <div className="container relative z-10 text-center">
        <div className="section-tag mx-auto mb-8">Ready to Elevate?</div>
        
        <h2 className="cta-title heading-xl mb-8" style={{ fontSize: 'clamp(2.5rem, 7vw, 6rem)' }}>
          <span style={{ display: 'inline-block' }}>LET'S </span>{' '}
          <span style={{ display: 'inline-block', color: 'var(--red)', textShadow: '0 0 30px var(--red-glow)' }}>CREATE </span>{' '}
          <span style={{ display: 'inline-block' }}>THE </span>{' '}
          <span style={{ display: 'inline-block' }}>FUTURE.</span>
        </h2>

        <p className="cta-subtext body-lg max-w-2xl mx-auto mb-16" style={{ color: 'var(--gray-light)' }}>
          Join the ranks of leading brands who trust Bilimbe to deliver 
          high-impact, tech-driven event experiences. Your vision, 
          amplified by our innovation.
        </p>

        <div 
          className="flex items-center justify-center gap-8 flex-wrap"
        >
          <div className="cta-btn-wrapper">
            <Magnetic strength={0.2}>
              <a 
                href="https://www.bilimbe.in/contact-us.html" 
                className="btn btn-primary"
                style={{ padding: '18px 48px', fontSize: '1rem' }}
              >
                BOOK AN ACTIVATION
              </a>
            </Magnetic>
          </div>
          <div className="cta-btn-wrapper">
            <Magnetic strength={0.2}>
              <a 
                href="https://www.bilimbe.in/products" 
                className="btn btn-outline"
                style={{ padding: '18px 48px', fontSize: '1rem' }}
              >
                EXPLORE TECH
              </a>
            </Magnetic>
          </div>
        </div>

        {/* Tactical Footer Text */}
        <div className="mt-24 pt-12 border-t border-white/5 opacity-30">
          <p className="body-sm" style={{ letterSpacing: '0.3em' }}>
            ESTABLISHED // 2018 — NODAL NETWORK // ACTIVE
          </p>
        </div>
      </div>

      <style jsx>{`
        .cta-section {
          background-image: 
            radial-gradient(circle at 50% 50%, rgba(232, 0, 28, 0.05) 0%, transparent 50%);
        }
        @media (max-width: 768px) {
          .cta-title { font-size: 3rem !important; }
        }
      `}</style>
    </section>
  );
}
