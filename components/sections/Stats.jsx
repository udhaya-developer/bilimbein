'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { stats } from '@/lib/data';

gsap.registerPlugin(ScrollTrigger);

function StatItem({ value, label, suffix }) {
  const numRef = useRef(null);
  const wrapRef = useRef(null);

  useEffect(() => {
    if (!numRef.current || !wrapRef.current) return;

    const trigger = ScrollTrigger.create({
      trigger: wrapRef.current,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        const obj = { val: 0 };
        gsap.to(obj, {
          val: value,
          duration: 2.5,
          ease: 'power2.out',
          onUpdate() {
            if (numRef.current) {
              numRef.current.textContent = Math.round(obj.val) + suffix;
            }
          },
        });
      },
    });

    return () => trigger.kill();
  }, [value, suffix]);

  return (
    <div
      ref={wrapRef}
      style={{
        textAlign: 'center',
        padding: '40px 32px',
        border: '1px solid var(--border)',
        borderRadius: '4px',
        background: 'var(--surface)',
        position: 'relative',
        overflow: 'hidden',
        transition: 'border-color 0.3s, transform 0.3s',
        cursor: 'default',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--border-red)';
        e.currentTarget.style.transform = 'translateY(-4px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--border)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      {/* Watermark number */}
      <div
        style={{
          position: 'absolute',
          bottom: '-10px',
          right: '-10px',
          fontFamily: 'var(--font-heading)',
          fontSize: '7rem',
          color: 'rgba(255, 255, 255, 0.04)',
          lineHeight: 1,
          userSelect: 'none',
          pointerEvents: 'none',
        }}
      >
        {value}
      </div>

      {/* Red top accent */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '40px',
          height: '2px',
          background: 'var(--red)',
        }}
      />

      <div
        ref={numRef}
        style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'clamp(3rem, 5vw, 5rem)',
          color: 'var(--white)',
          lineHeight: 1,
          letterSpacing: '0.02em',
        }}
      >
        0{suffix}
      </div>
      <div
        style={{
          marginTop: '12px',
          fontSize: '0.8rem',
          fontWeight: 600,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: 'var(--gray)',
        }}
      >
        {label}
      </div>
    </div>
  );
}

export default function Stats() {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.stats-header',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="branches"
      style={{
        padding: '100px 0',
        background: 'linear-gradient(to bottom, var(--bg), var(--surface), var(--bg))',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Grid bg */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(rgba(232,0,28,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(232,0,28,0.05) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
          pointerEvents: 'none',
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div
          className="stats-header"
          style={{ textAlign: 'center', marginBottom: '64px', opacity: 0 }}
        >
          <div className="section-tag" style={{ justifyContent: 'center' }}>
            By The Numbers
          </div>
          <h2 className="heading-lg">
            Our <span style={{ color: 'var(--red)' }}>Impact</span> Across India
          </h2>
        </div>

        <div
          className="stats-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: '16px',
          }}
        >
          {stats.map((s) => (
            <StatItem key={s.label} {...s} />
          ))}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 1024px) {
          .stats-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }
        @media (max-width: 640px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  );
}
