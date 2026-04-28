'use client';
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import Navbar from '@/components/sections/Navbar';
import Hero from '@/components/sections/Hero';
import Clients from '@/components/sections/Clients';
import Stats from '@/components/sections/Stats';
import Testimonials from '@/components/sections/Testimonials';
import Footer from '@/components/sections/Footer';
import SmoothScroll from '@/components/SmoothScroll';

// Dynamically import heavy sections
const Services = dynamic(() => import('@/components/sections/Services'), { ssr: false });
const About = dynamic(() => import('@/components/sections/About'), { ssr: false });
const CTA = dynamic(() => import('@/components/sections/CTA'), { ssr: false });
const SplashScreen = dynamic(() => import('@/components/SplashScreen'), { ssr: false });
const Showcase = dynamic(() => import('@/components/sections/Showcase'), { ssr: false });

export default function Home() {
  const [splashDone, setSplashDone] = useState(false);

  useEffect(() => {
    if (splashDone) {
      const timer = setTimeout(() => {
        import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
          ScrollTrigger.refresh();
          
          // SAFE SECTION STACKING EFFECT
          const sections = document.querySelectorAll('.section');
          sections.forEach((section, i) => {
            import('gsap').then(({ gsap }) => {
              // Fade in entrance
              gsap.fromTo(section, 
                { opacity: 0, y: 50 },
                {
                  opacity: 1,
                  y: 0,
                  duration: 1,
                  ease: "power3.out",
                  scrollTrigger: {
                    trigger: section,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                  }
                }
              );
            });
          });
        });
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [splashDone]);

  return (
    <SmoothScroll>
      <SplashScreen onComplete={() => setSplashDone(true)} />
      <main>
        <Navbar />
        <Hero introActive={splashDone} />
        <Clients />
        <Stats />
        <Services />
        <Showcase />
        <About />
        <Testimonials />
        <CTA />
        <Footer />
      </main>
    </SmoothScroll>
  );
}
