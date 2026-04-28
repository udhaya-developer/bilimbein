'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const clients = [
  "GOOGLE", "AMAZON", "MICROSOFT", "NETFLIX", "SPOTIFY", 
  "META", "APPLE", "TESLA", "ADOBE", "INTEL"
];

export default function Clients() {
  const sectionRef = useRef(null);
  
  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      const tickerTrack = sectionRef.current.querySelector('.ticker-track');
      const logos = tickerTrack.children;
      const logoWidth = logos[0].offsetWidth + 80; // width + gap
      const totalWidth = logoWidth * clients.length;

      // Create a seamless loop
      const loop = gsap.to(tickerTrack, {
        x: -totalWidth,
        duration: 30,
        ease: "none",
        repeat: -1,
      });

      // Speed up on scroll
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const velocity = Math.abs(self.getVelocity() / 100);
          gsap.to(loop, { timeScale: 1 + velocity, duration: 0.5, ease: "power2.out" });
        }
      });

      gsap.fromTo(
        '.client-ticker',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: 'power2.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 90%' }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      style={{ 
        padding: '80px 0', 
        borderBottom: '1px solid var(--border)',
        overflow: 'hidden',
        background: 'var(--bg)',
        position: 'relative'
      }}
    >
      <div className="client-ticker" style={{ opacity: 0 }}>
        <p style={{ 
          textAlign: 'center', 
          color: 'var(--gray)', 
          fontSize: '0.75rem', 
          textTransform: 'uppercase', 
          letterSpacing: '0.2em',
          marginBottom: '40px',
          fontWeight: 700
        }}>
          Trusted by Industry Leaders
        </p>

        <div className="ticker-container" style={{ display: 'flex', position: 'relative', width: '100%', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '20vw', background: 'linear-gradient(to right, var(--bg), transparent)', zIndex: 2, pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '20vw', background: 'linear-gradient(to left, var(--bg), transparent)', zIndex: 2, pointerEvents: 'none' }} />

          <div className="ticker-track" style={{ display: 'flex', gap: '80px', width: 'max-content' }}>
            {[...clients, ...clients, ...clients, ...clients].map((client, i) => (
              <div key={i} className="client-logo">
                {client}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .client-logo {
          font-family: var(--font-heading);
          font-size: 2.5rem;
          font-weight: 800;
          color: rgba(255, 255, 255, 0.4);
          letter-spacing: 0.05em;
          transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
          cursor: default;
          white-space: nowrap;
          position: relative;
          overflow: hidden;
        }

        .client-logo::after {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 50%;
          height: 100%;
          background: linear-gradient(
            to right,
            transparent,
            rgba(255, 255, 255, 0.1),
            transparent
          );
          transform: skewX(-25deg);
          animation: shine 4s infinite;
        }

        @keyframes shine {
          0% { left: -100%; }
          20% { left: 200%; }
          100% { left: 200%; }
        }

        .client-logo:hover {
          color: var(--white);
          transform: scale(1.1);
          text-shadow: 0 0 30px rgba(255, 255, 255, 0.5);
        }

        @media (max-width: 768px) {
          .client-logo { font-size: 1.8rem; }
        }
      `}</style>
    </section>
  );
}
