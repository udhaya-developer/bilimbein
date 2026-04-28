'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import dynamic from 'next/dynamic';
import { cities } from '@/lib/data';
import Magnetic from '@/components/Magnetic';

const IndiaMap = dynamic(() => import('@/components/IndiaMap'), { ssr: false });

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.about-text',
        { opacity: 0, x: -60 },
        {
          opacity: 1, x: 0, duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
        }
      );
      gsap.fromTo(
        '.about-globe',
        { opacity: 0, scale: 0.85, y: 100 },
        {
          opacity: 1, scale: 1, y: 0, duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
        }
      );
      
      // Parallax effect on globe
      gsap.to('.about-globe', {
        y: -100,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        }
      });
      gsap.fromTo(
        '.city-dot',
        { opacity: 0, scale: 0 },
        {
          opacity: 1, scale: 1, duration: 0.4, stagger: 0.1, ease: 'back.out(2)',
          scrollTrigger: { trigger: '.cities-grid', start: 'top 80%' },
        }
      );

      // Scroll Reveal for Paragraph
      const revealPara = sectionRef.current.querySelector('.reveal-text');
      if (revealPara) {
        const text = revealPara.innerText;
        revealPara.innerHTML = text.split(' ').map(word => `<span>${word} </span>`).join('');
        
        gsap.fromTo(revealPara.querySelectorAll('span'), 
          { color: 'rgba(255,255,255,0.1)' },
          {
            color: 'rgba(255,255,255,1)',
            stagger: 0.1,
            scrollTrigger: {
              trigger: revealPara,
              start: "top 80%",
              end: "bottom 60%",
              scrub: true,
            }
          }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="section"
      style={{ 
        borderBottom: '1px solid var(--border)',
        background: 'var(--bg)',
        position: 'relative'
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(rgba(232,0,28,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(232,0,28,0.03) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          pointerEvents: 'none',
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '80px',
            alignItems: 'center',
          }}
          className="about-grid"
        >
          {/* Text left */}
          <div className="about-text" style={{ opacity: 0 }}>
            <div className="section-tag">Masters of Connection</div>
            <h2 className="heading-lg" style={{ marginBottom: '24px' }}>
            Serving <span style={{ color: 'var(--red)', textShadow: '0 0 20px rgba(232,0,28,0.5)' }}>India</span> from{' '}
            <span style={{ color: 'var(--white)', textShadow: '0 0 30px rgba(255,255,255,0.2)' }}>8+ Cities</span>
            </h2>
            <p className="body-lg reveal-text" style={{ marginBottom: '32px' }}>
              From Chennai to Kolkata, Delhi to Goa — Bilimbe brings world-class photo
              booths, digital engagement, and immersive AR/VR experiences to every
              corner of India.
            </p>
            <p className="body-md" style={{ marginBottom: '40px' }}>
              Bilimbe creates unforgettable events with photo booths, 360 videos, VR,
              and interactive experiences for every guest. Our Pan-India presence ensures
              that no matter where your event is, we're there.
            </p>

            {/* Cities grid */}
            <div
              className="cities-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '12px',
                marginBottom: '40px',
              }}
            >
              {cities.map((city) => (
                <div
                  key={city.name}
                  className="city-dot"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    opacity: 0,
                  }}
                >
                  <div
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: 'var(--red)',
                      boxShadow: '0 0 8px var(--red)',
                      flexShrink: 0,
                    }}
                  />
                  <span style={{ fontSize: '0.8rem', color: 'var(--gray-light)', fontWeight: 500 }}>
                    {city.name}
                  </span>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
              <Magnetic strength={0.3}>
                <a
                  href="https://www.bilimbe.in/about-us.html"
                  target="_blank"
                  rel="noreferrer"
                  id="about-learn-btn"
                  className="btn btn-primary"
                >
                  Learn More
                </a>
              </Magnetic>
              <Magnetic strength={0.3}>
                <a
                  href="https://www.bilimbe.in/gallery.html"
                  target="_blank"
                  rel="noreferrer"
                  id="about-gallery-btn"
                  className="btn btn-outline"
                >
                  View Gallery
                </a>
              </Magnetic>
            </div>
          </div>

          {/* Globe right */}
          <div
            className="about-globe"
            style={{
              position: 'relative',
              height: '600px',
              opacity: 0,
            }}
          >
            <IndiaMap />

            {/* Label */}
            <div
              style={{
                position: 'absolute',
                bottom: '0px',
                left: '50%',
                transform: 'translateX(-50%)',
                textAlign: 'center',
                pointerEvents: 'none',
              }}
            >
              <div
                style={{
                  fontSize: '0.7rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'var(--red)',
                  fontWeight: 600,
                }}
              >
                Pan-India Presence
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 1024px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .about-globe { height: 360px !important; }
        }
        @media (max-width: 640px) {
          .cities-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  );
}
