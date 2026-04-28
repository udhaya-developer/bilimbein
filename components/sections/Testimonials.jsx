'use client';
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { testimonials } from '@/lib/data';
import Magnetic from '@/components/Magnetic';

/**
 * 3D Infinite Marquee Layout
 * Features:
 * - Two rows of testimonials moving in opposite directions.
 * - 3D perspective with tilted cards.
 * - Interactive hover: slow down and pop-out effect.
 * - Infinite seamless looping.
 */

export default function Testimonials() {
  const containerRef = useRef(null);
  const track1Ref = useRef(null);
  const track2Ref = useRef(null);
  const vaultTrackRef = useRef(null);
  const anims = useRef([]);

  const videoTestimonials = [
    { title: "EXPO ENGAGEMENT", client: "Tech Summit 2024", img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80" },
    { title: "MIRROR BOOTH", client: "Fashion Gala", img: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&q=80" },
    { title: "GLAMBOT EXPERIENCE", client: "Premium Wedding", img: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&q=80" },
    { title: "360° SPIN", client: "Corporate Night", img: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80" },
    { title: "VR ACTIVATION", client: "Brand Launch", img: "https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?w=800&q=80" },
    { title: "AI PORTRAIT", client: "Tech Expo", img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80" }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initialize animations
      const a1 = gsap.to(track1Ref.current, {
        x: '-50%',
        duration: 40,
        ease: 'none',
        repeat: -1,
      });

      const a2 = gsap.fromTo(track2Ref.current, 
        { x: '-50%' },
        {
          x: '0%',
          duration: 45,
          ease: 'none',
          repeat: -1,
        }
      );

      // Vault Animation
      const vaultAnim = gsap.to(vaultTrackRef.current, {
        x: '-50%',
        duration: 35,
        ease: 'none',
        repeat: -1
      });

      anims.current = [a1, a2, vaultAnim];
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleMouseEnter = () => {
    anims.current.forEach(anim => gsap.to(anim, { timeScale: 0, duration: 1, ease: 'power2.out' }));
  };

  const handleMouseLeave = () => {
    anims.current.forEach(anim => gsap.to(anim, { timeScale: 1, duration: 1, ease: 'power2.in' }));
  };

  // Duplicate testimonials for seamless loop
  const doubledTestimonials = [...testimonials, ...testimonials];

  return (
    <section 
      ref={containerRef} 
      id="testimonials" 
      className="section"
      style={{ 
        background: '#000', 
        padding: '120px 0', 
        overflow: 'hidden',
        perspective: '1500px'
      }}
    >
      <div className="container" style={{ position: 'relative', zIndex: 10, pointerEvents: 'none' }}>
        <div className="testimonials-header" style={{ textAlign: 'center', marginBottom: '80px' }}>
          <div className="section-tag" style={{ margin: '0 auto 16px', justifyContent: 'center' }}>Social Proof</div>
          <h2 className="heading-lg">
            Loved by <span className="text-red">Hundreds</span>
          </h2>
        </div>
      </div>

      {/* Row 1: Left to Right */}
      <div className="marquee-container" style={{ marginBottom: '40px' }} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <div 
          ref={track1Ref} 
          className="marquee-track" 
          style={{ display: 'flex', gap: '30px', width: 'fit-content' }}
        >
          {doubledTestimonials.map((item, i) => (
            <TestimonialCard key={i} item={item} rotation={-15} />
          ))}
        </div>
      </div>

      {/* Row 2: Right to Left */}
      <div className="marquee-container" style={{ marginBottom: '100px' }} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <div 
          ref={track2Ref} 
          className="marquee-track" 
          style={{ display: 'flex', gap: '30px', width: 'fit-content' }}
        >
          {doubledTestimonials.map((item, i) => (
            <TestimonialCard key={i} item={item} rotation={15} />
          ))}
        </div>
      </div>

      {/* Video Testimonials Section */}
      <div className="video-vault-section">
        {/* Top Header */}
        <div className="container vault-header text-center mb-16">
          <div className="section-tag no-line mx-auto mb-4">CINEMATIC_REELS</div>
          <h2 className="heading-lg">THE <span className="text-red">VAULT</span></h2>
        </div>

        {/* Infinite Expanding Reel */}
        <div className="vault-reel-container" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <div ref={vaultTrackRef} className="vault-track">
            {[...videoTestimonials, ...videoTestimonials].map((video, idx) => (
              <div key={idx} className="vault-card">
                <div className="vault-video-wrapper">
                  <img src={video.img} alt={video.title} className="vault-img" />
                  <div className="vault-overlay">
                    <div className="vault-play-btn">▶</div>
                    <div className="vault-info">
                      <div className="vault-tag">LIVE_ACTIVATION</div>
                      <h4 className="vault-title">{video.title}</h4>
                      <p className="vault-client">{video.client}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Feature Grid */}
        <div className="container">
          <div className="testimonials-features-grid mt-20">
            <div className="feature-col">
              <h4>Real-Time Collaboration</h4>
              <p>Communicate seamlessly and keep everyone in the loop with instant updates.</p>
            </div>
            <div className="feature-col">
              <h4>Task & Project Tracking</h4>
              <p>Assign tasks, set deadlines, and visualize progress with our intuitive tools.</p>
            </div>
            <div className="feature-col">
              <h4>Performance Insights</h4>
              <p>Make smarter decisions with analytics that propel your business forward.</p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .video-vault-section {
          padding: 120px 0;
          background: #000;
          overflow: hidden;
        }

        .no-line::before {
          display: none !important;
        }

        .vault-reel-container {
          width: 100%;
          padding: 40px 0;
          overflow: hidden;
          position: relative;
        }

        .vault-track {
          display: flex;
          gap: 20px;
          width: max-content;
          padding: 0 20px;
        }

        .vault-card {
          position: relative;
          width: 300px;
          height: 480px;
          flex-shrink: 0;
          border-radius: 20px;
          overflow: hidden;
          background: #111;
          border: 1px solid rgba(255, 255, 255, 0.05);
          transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
          cursor: pointer;
        }

        .vault-card:hover {
          width: 500px;
          border-color: var(--red);
          box-shadow: 0 30px 60px rgba(232, 0, 28, 0.15);
        }

        .vault-video-wrapper {
          position: absolute;
          inset: 0;
        }

        .vault-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.8s ease;
          filter: grayscale(0.4) brightness(0.7);
        }

        .vault-card:hover .vault-img {
          transform: scale(1.05);
          filter: grayscale(0) brightness(1);
        }

        .vault-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 50%);
          padding: 40px;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          transition: background 0.4s ease;
        }

        .vault-card:hover .vault-overlay {
          background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(232, 0, 28, 0.1) 100%);
        }

        .vault-play-btn {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) scale(0.8);
          width: 80px;
          height: 80px;
          background: var(--red);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 1.5rem;
          opacity: 0;
          transition: all 0.4s ease;
          box-shadow: 0 0 30px var(--red);
        }

        .vault-card:hover .vault-play-btn {
          opacity: 1;
          transform: translate(-50%, -50%) scale(1);
        }

        .vault-tag {
          font-size: 0.65rem;
          letter-spacing: 0.15em;
          color: var(--red);
          margin-bottom: 12px;
          opacity: 0.8;
        }

        .vault-title {
          font-family: var(--font-heading);
          font-size: 1.5rem;
          color: #fff;
          margin-bottom: 4px;
        }

        .vault-client {
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.5);
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        .testimonials-features-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 60px;
          padding-top: 80px;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
        }

        .feature-col h4 {
          font-family: var(--font-heading);
          font-size: 1.1rem;
          margin-bottom: 12px;
          color: #fff;
        }

        .feature-col p {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.5);
          line-height: 1.6;
        }

        @media (max-width: 768px) {
          .vault-card { width: 260px; height: 400px; }
          .vault-card:hover { width: 320px; }
          .testimonials-features-grid { grid-template-columns: 1fr; gap: 30px; text-align: center; }
        }
      `}</style>
    </section>
  );
}

function TestimonialCard({ item, rotation }) {
  const cardRef = useRef(null);

  const handleCardEnter = () => {
    gsap.to(cardRef.current, {
      rotateY: 0,
      scale: 1.1,
      z: 100,
      borderColor: 'rgba(232, 0, 28, 0.5)',
      backgroundColor: 'rgba(232, 0, 28, 0.05)',
      duration: 0.4,
      ease: 'power2.out'
    });
  };

  const handleCardLeave = () => {
    gsap.to(cardRef.current, {
      rotateY: rotation,
      scale: 1,
      z: 0,
      borderColor: 'rgba(255, 255, 255, 0.05)',
      backgroundColor: 'rgba(255, 255, 255, 0.02)',
      duration: 0.4,
      ease: 'power2.inOut'
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleCardEnter}
      onMouseLeave={handleCardLeave}
      style={{
        flexShrink: 0,
        width: '400px',
        background: 'rgba(255, 255, 255, 0.02)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        padding: '32px',
        borderRadius: '12px',
        transform: `rotateY(${rotation}deg)`,
        transition: 'border-color 0.3s ease, background 0.3s ease',
        cursor: 'pointer',
        transformStyle: 'preserve-3d'
      }}
    >
      <div className="quote-mark" style={{ fontSize: '3rem', color: 'var(--red)', opacity: 0.3, lineHeight: 1 }}>&quot;</div>
      <p style={{ color: '#ccc', fontSize: '1rem', lineHeight: 1.6, marginBottom: '24px', fontStyle: 'italic' }}>
        {item.text}
      </p>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ 
          width: '36px', 
          height: '36px', 
          borderRadius: '50%', 
          background: 'var(--red)', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          fontWeight: 700,
          color: 'white',
          fontSize: '0.8rem'
        }}>
          {item.avatar || item.name[0]}
        </div>
        <div>
          <div style={{ fontWeight: 600, color: '#fff', fontSize: '0.9rem' }}>{item.name}</div>
          <div style={{ fontSize: '0.7rem', color: 'var(--red)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{item.role}</div>
        </div>
      </div>
    </div>
  );
}
