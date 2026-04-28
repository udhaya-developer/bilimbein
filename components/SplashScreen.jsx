'use client';

import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const STORAGE_KEY = 'bilimbe-splash-seen';

export default function SplashScreen({ onComplete }) {
  const rootRef = useRef(null);
  const canvasRef = useRef(null);
  const logoWrapperRef = useRef(null);
  const taglineRef = useRef(null);
  const borderRef = useRef(null);
  const timelineRef = useRef(null);
  const finishedRef = useRef(false);
  const onCompleteRef = useRef(onComplete);

  useLayoutEffect(() => {
    onCompleteRef.current = onComplete;
  });

  const [visible, setVisible] = useState(() => {
    if (typeof window === 'undefined') return true;
    return sessionStorage.getItem(STORAGE_KEY) !== '1';
  });

  // Trigger completion if already seen
  useLayoutEffect(() => {
    if (!visible) {
      onCompleteRef.current?.();
    }
  }, [visible]);

  const finish = useCallback(() => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    try {
      sessionStorage.setItem(STORAGE_KEY, '1');
    } catch {
      /* ignore */
    }
    setVisible(false);
    onCompleteRef.current?.();
  }, []);

  const dismiss = useCallback(() => {
    timelineRef.current?.kill();
    gsap.to(rootRef.current, {
      opacity: 0,
      duration: 0.6,
      ease: 'power4.inOut',
      onComplete: finish,
    });
  }, [finish]);

  // Particles & Grid Logic
  useLayoutEffect(() => {
    if (!visible) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrame;
    let particles = [];
    let w, h;

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    class Particle {
      constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 2 + 1;
        this.speedX = (Math.random() - 0.5) * 10;
        this.speedY = (Math.random() - 0.5) * 10;
        this.color = color;
        this.opacity = 1;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.opacity -= 0.01;
        if (this.size > 0.1) this.size -= 0.01;
      }
      draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    const createExplosion = (x, y) => {
      for (let i = 0; i < 60; i++) {
        particles.push(new Particle(x, y, i % 2 === 0 ? '#E8001C' : '#FFFFFF'));
      }
    };

    window.createExplosion = createExplosion; // Expose for GSAP

    const drawGrid = (opacity) => {
      ctx.strokeStyle = `rgba(232, 0, 28, ${opacity * 0.1})`;
      ctx.lineWidth = 0.5;
      const step = 50;
      for (let x = 0; x < w; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }
    };

    let gridOpacity = 0.5;

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
      ctx.fillRect(0, 0, w, h);
      
      drawGrid(gridOpacity);

      particles = particles.filter(p => p.opacity > 0);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      animationFrame = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrame);
      delete window.createExplosion;
    };
  }, [visible]);

  useLayoutEffect(() => {
    if (!visible) return;

    const root = rootRef.current;
    const logoWrapper = logoWrapperRef.current;
    const letters = logoWrapper.querySelectorAll('.letter');
    const tagline = taglineRef.current;
    const border = borderRef.current;

    if (!root || !logoWrapper) return;

    // Initial states
    gsap.set(letters, { opacity: 0, scale: 2, filter: 'blur(20px)', y: 50 });
    gsap.set(tagline, { opacity: 0, letterSpacing: '0.1em' });
    gsap.set(border, { scaleX: 0, transformOrigin: 'center' });

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.delayedCall(1, () => {
          const navLogo = document.querySelector('#navbar a');
          const navLogoRect = navLogo?.getBoundingClientRect();

          if (navLogoRect) {
            const logoRect = logoWrapper.getBoundingClientRect();
            const deltaX = navLogoRect.left - logoRect.left;
            const deltaY = navLogoRect.top - logoRect.top;
            const targetScale = navLogoRect.height / logoRect.height;

            const exitTl = gsap.timeline({ onComplete: finish });
            
            exitTl.to(logoWrapper, {
              x: deltaX,
              y: deltaY,
              scale: targetScale,
              duration: 1.5,
              ease: 'expo.inOut',
            })
            .to([tagline, border, canvasRef.current], {
              opacity: 0,
              duration: 0.8,
            }, 0)
            .to(root, {
              opacity: 0,
              duration: 0.5,
            }, "-=0.5");
          } else {
            gsap.to(root, { opacity: 0, duration: 1, onComplete: finish });
          }
        });
      }
    });

    timelineRef.current = tl;

    tl.to(border, {
      scaleX: 1,
      duration: 1.2,
      ease: 'power4.inOut',
    })
    .to(letters, {
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      y: 0,
      duration: 0.8,
      stagger: {
        each: 0.1,
        from: 'center'
      },
      ease: 'back.out(1.7)',
      onStart: () => {
        if (window.createExplosion) {
          window.createExplosion(window.innerWidth / 2, window.innerHeight / 2);
        }
      }
    }, "-=0.4")
    .to(tagline, {
      opacity: 1,
      letterSpacing: '0.4em',
      duration: 1.5,
      ease: 'power2.out',
    }, "-=0.5")
    .to(border, {
      boxShadow: '0 0 40px var(--red), inset 0 0 40px var(--red)',
      duration: 0.5,
      repeat: 3,
      yoyo: true,
    });

    return () => {
      tl.kill();
    };
  }, [visible, finish]);

  useLayoutEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') dismiss();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [dismiss]);

  if (!visible) return null;

  return (
    <div
      ref={rootRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 10050,
        background: '#000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        cursor: 'pointer',
      }}
      onClick={dismiss}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
        }}
      />

      {/* Decorative Borders */}
      <div
        ref={borderRef}
        style={{
          position: 'absolute',
          top: '50px',
          bottom: '50px',
          left: '50px',
          right: '50px',
          border: '1px solid rgba(232, 0, 28, 0.3)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      <div
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '40px',
          zIndex: 2,
        }}
      >
        <div
          ref={logoWrapperRef}
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(4.5rem, 18vw, 12rem)',
            lineHeight: 0.9,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            color: 'var(--white)',
            userSelect: 'none',
            display: 'flex',
          }}
        >
          {"BILIMBE".split("").map((char, i) => (
            <span
              key={i}
              className="letter"
              style={{
                display: 'inline-block',
                color: i < 2 ? 'var(--red)' : 'var(--white)',
              }}
            >
              {char}
            </span>
          ))}
        </div>

        <div
          ref={taglineRef}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(0.8rem, 2.5vw, 1.2rem)',
            letterSpacing: '0.4em',
            textTransform: 'uppercase',
            color: 'var(--gray)',
            opacity: 0,
            textAlign: 'center',
            fontWeight: 300,
          }}
        >
          Capture Emotion • Build Bonds
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: '40px',
          left: '50%',
          transform: 'translateX(-50%)',
          fontFamily: 'var(--font-body)',
          fontSize: '0.6rem',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          color: 'var(--gray)',
          opacity: 0.4,
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        <div style={{ width: '30px', height: '1px', background: 'var(--gray)' }} />
        Skip (Esc)
        <div style={{ width: '30px', height: '1px', background: 'var(--gray)' }} />
      </div>
    </div>
  );
}

