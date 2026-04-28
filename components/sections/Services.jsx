'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { services } from '@/lib/data';
import Magnetic from '@/components/Magnetic';

gsap.registerPlugin(ScrollTrigger);

const serviceImages = [
  'https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=2070&auto=format&fit=crop', // Photo Booth / Portrait
  'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1964&auto=format&fit=crop', // Video / Camera focus
  '/services/service3.png',
  'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop', // QR/Check-in
  'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop', // Tech Dev
  'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2071&auto=format&fit=crop'  // Games
];

export default function Services() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const strips = gsap.utils.toArray('.service-strip');
      
      strips.forEach((strip, i) => {
        const bg = strip.querySelector('.strip-bg');
        const content = strip.querySelector('.strip-content');
        const num = strip.querySelector('.strip-number');

        // Parallax background
        gsap.to(bg, {
          y: '20%',
          ease: 'none',
          scrollTrigger: {
            trigger: strip,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        });

        // Content Entrance
        gsap.fromTo(content, 
          { opacity: 0, x: -100 },
          {
            opacity: 1,
            x: 0,
            duration: 1.2,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: strip,
              start: 'top 70%',
            }
          }
        );

        // Number Entrance
        gsap.fromTo(num, 
          { opacity: 0, scale: 0.5 },
          {
            opacity: 0.1,
            scale: 1,
            duration: 1.5,
            ease: 'elastic.out(1, 0.5)',
            scrollTrigger: {
              trigger: strip,
              start: 'top 80%',
            }
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="services" className="services-parallax" ref={sectionRef} style={{ background: '#000' }}>
      <div className="container" style={{ padding: '120px 0 60px' }}>
        <div className="section-tag">Cinematic Experience</div>
        <h2 className="heading-lg" style={{ color: 'var(--white)' }}>
          Our <span className="text-red">Interactive</span> Universe
        </h2>
      </div>

      <div className="strips-container">
        {services.map((service, i) => (
          <div key={service.id} className="service-strip">
            {/* Background Image with Parallax */}
            <div 
              className="strip-bg" 
              style={{ 
                backgroundImage: `url(${serviceImages[i]})`,
              }} 
            />
            
            {/* Overlay Gradient */}
            <div className="strip-overlay" />

            <div className="container strip-inner">
              <div className="strip-number">{String(i + 1).padStart(2, '0')}</div>
              
              <div className="strip-content">
                <h3 className="heading-md strip-title">{service.title}</h3>
                <p className="body-lg strip-desc">{service.description}</p>
                
                <div className="strip-items">
                  {service.items.slice(0, 3).map(item => (
                    <span key={item} className="strip-tag">{item}</span>
                  ))}
                </div>

                <Magnetic>
                  <button className="btn btn-outline" style={{ marginTop: '32px' }}>
                    Explore Details
                  </button>
                </Magnetic>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .services-parallax {
          width: 100%;
          overflow: hidden;
        }

        .service-strip {
          position: relative;
          height: 80vh;
          width: 100%;
          overflow: hidden;
          display: flex;
          align-items: center;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }

        .strip-bg {
          position: absolute;
          top: -20%;
          left: 0;
          width: 100%;
          height: 140%;
          background-size: cover;
          background-position: center;
          z-index: 0;
          filter: brightness(0.4) saturate(0.8);
        }

        .strip-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, #000 0%, transparent 60%, transparent 100%);
          z-index: 1;
        }

        .strip-inner {
          position: relative;
          z-index: 2;
          width: 100%;
          display: flex;
          align-items: center;
        }

        .strip-number {
          position: absolute;
          left: -40px;
          top: 50%;
          transform: translateY(-50%);
          font-family: var(--font-heading);
          font-size: 15rem;
          color: var(--white);
          opacity: 0;
          pointer-events: none;
          z-index: -1;
        }

        .strip-content {
          max-width: 600px;
        }

        .strip-title {
          margin-bottom: 24px;
          color: var(--white);
          letter-spacing: 0.05em;
        }

        .strip-desc {
          margin-bottom: 32px;
          color: var(--gray-light);
          font-weight: 300;
        }

        .strip-items {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .strip-tag {
          padding: 6px 16px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 100px;
          font-size: 0.8rem;
          color: var(--gray-light);
          backdrop-filter: blur(10px);
        }

        @media (max-width: 768px) {
          .service-strip { height: 60vh; }
          .strip-number { font-size: 8rem; left: 0; top: 20px; transform: none; }
          .strip-overlay { background: rgba(0,0,0,0.6); }
        }
      `}</style>
    </section>
  );
}
