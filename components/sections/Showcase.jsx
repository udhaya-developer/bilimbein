'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const showcaseItems = [
  {
    id: 1,
    title: "Glambot",
    subtitle: "Cinematic Precision",
    description: "High-speed robotic precision for red-carpet slow motion.",
    image: "/showcase/glambot.png",
    color: "var(--red)"
  },
  {
    id: 2,
    title: "AI Booth",
    subtitle: "Intelligent Interaction",
    description: "Augmented reality filters powered by real-time neural networks.",
    image: "/showcase/ai-booth.png",
    color: "#ffffff"
  },
  {
    id: 3,
    title: "360° Booth",
    subtitle: "Immersive Motion",
    description: "Capture every angle of the celebration in stunning 4K.",
    image: "/showcase/360-booth.png",
    color: "var(--red)"
  }
];

export default function Showcase() {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;
    if (!section || !container) return;

    let ctx = gsap.context(() => {
      const getScrollWidth = () => container.offsetWidth - window.innerWidth;
      
      const mainAnim = gsap.to(container, {
        x: () => -getScrollWidth(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${getScrollWidth()}`,
          invalidateOnRefresh: true,
          anticipatePin: 1.5,
        }
      });

      // Refresh all triggers after a small delay
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 500);

      // Staggered reveal for item content
      showcaseItems.forEach((_, i) => {
        gsap.fromTo(`.showcase-item-${i} .content`, 
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            scrollTrigger: {
              trigger: `.showcase-item-${i}`,
              containerAnimation: mainAnim,
              start: "left 80%",
              horizontal: true,
              scrub: true,
            }
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="showcase-section"
      style={{ 
        height: '100vh', 
        overflow: 'hidden', 
        background: '#000',
        position: 'relative'
      }}
    >
      {/* Background decoration */}
      <div style={{ 
        position: 'absolute', 
        top: '10%', 
        left: '5%', 
        fontSize: '15vw', 
        fontWeight: 900, 
        color: 'rgba(255,255,255,0.03)', 
        lineHeight: 1,
        pointerEvents: 'none',
        zIndex: 0,
        textTransform: 'uppercase'
      }}>
        Premium Tech
      </div>

      <div 
        ref={containerRef} 
        style={{ 
          display: 'flex', 
          height: '100%', 
          width: 'fit-content',
          alignItems: 'center',
          padding: '0 10vw'
        }}
      >
        {showcaseItems.map((item, i) => (
          <div 
            key={item.id}
            className={`showcase-item showcase-item-${i}`}
            style={{ 
              width: '85vw', 
              height: '70vh', 
              flexShrink: 0, 
              display: 'flex',
              alignItems: 'center',
              gap: '5vw',
              position: 'relative',
              marginRight: '15vw'
            }}
          >
            {/* Image Wrap */}
            <div style={{ 
              width: '55%', 
              height: '100%', 
              position: 'relative',
              borderRadius: '8px',
              overflow: 'hidden',
              boxShadow: '0 40px 100px rgba(0,0,0,0.5)'
            }}>
              <Image 
                src={item.image} 
                alt={item.title}
                fill
                style={{ objectFit: 'cover' }}
              />
              <div style={{ 
                position: 'absolute', 
                inset: 0, 
                background: `linear-gradient(to right, rgba(0,0,0,0.4), transparent)` 
              }} />
            </div>

            {/* Content */}
            <div className="content" style={{ width: '40%' }}>
              <div style={{ 
                fontFamily: 'var(--font-heading)', 
                fontSize: '1.5rem', 
                color: item.color, 
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                marginBottom: '1rem'
              }}>
                {item.subtitle}
              </div>
              <h2 className="heading-xl" style={{ marginBottom: '1.5rem', fontSize: 'clamp(3rem, 6vw, 8rem)' }}>
                {item.title}
              </h2>
              <p className="body-lg" style={{ maxWidth: '400px', opacity: 0.8 }}>
                {item.description}
              </p>
              <div style={{ marginTop: '3rem' }}>
                <a href="#services" className="btn btn-outline">Explore Tech</a>
              </div>
            </div>

            {/* Number background */}
            <div style={{ 
              position: 'absolute', 
              top: '-5vh', 
              right: '0', 
              fontFamily: 'var(--font-heading)', 
              fontSize: '20vw', 
              color: 'rgba(255,255,255,0.05)', 
              zIndex: -1,
              userSelect: 'none'
            }}>
              0{i + 1}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
