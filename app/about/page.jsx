'use client';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import dynamic from 'next/dynamic';
import SmoothScroll from '@/components/SmoothScroll';
import Navbar from '@/components/sections/Navbar';
import Footer from '@/components/sections/Footer';
import Magnetic from '@/components/Magnetic';

import './about.css';

const AboutHeroScene = dynamic(() => import('@/components/three/AboutHeroScene'), { ssr: false });
const CtaScene = dynamic(() => import('@/components/three/CtaScene'), { ssr: false });

gsap.registerPlugin(ScrollTrigger);

const whyChooseUs = [
  { 
    num: "01",
    title: "Cutting-edge Tech", 
    desc: "Next-generation event technology for seamless audience engagement.",
    icon: "⚡"
  },
  { 
    num: "02",
    title: "Nationwide Presence", 
    desc: "Serving Chennai, Mumbai, Bangalore & major hubs across India.",
    icon: "🇮🇳"
  },
  { 
    num: "03",
    title: "Trusted by Leaders", 
    desc: "Partnered with top brands like Mercedes-Benz, CSK & Joyalukkas.",
    icon: "🤝"
  },
  { 
    num: "04",
    title: "Proven Track Record", 
    desc: "Enhancing brand activations and audience interaction with precision.",
    icon: "📈"
  }
];

const awards = [
  {
    year: "2024",
    title: "Award of Excellence",
    subtitle: "Business Excellence in Technology Service",
    org: "Asian-Arab Trade Chamber of Commerce"
  },
  {
    year: "2024",
    title: "Award of Excellence",
    subtitle: "Business Excellence in Technology Service",
    org: "Karnataka Traders Chamber of Commerce"
  }
];

const leadership = [
  { name: "Prashanth", role: "CEO & Founder", img: "/images/team/ceo.png", bio: "Visionary leader driving the future of digital event engagement and AI-powered activations." },
  { name: "Ananthakrishnan", role: "Director of Company", img: "/images/team/director.png", bio: "Strategic architect overseeing global operations and technological infrastructure deployment." }
];

const team = [
  { name: "Karthik Raja", role: "AI Systems Lead", img: "/images/team/karthik.png", branch: "CHENNAI" },
  { name: "Abhaya Iyer", role: "Creative Director", img: "/images/team/abhaya.png", branch: "MUMBAI" },
  { name: "Vikram Seth", role: "Hardware Architect", img: "/images/team/vikram.png", branch: "BANGALORE" },
  { name: "Maya Rao", role: "Operations Head", img: "/images/team/maya.png", branch: "DELHI" },
];

const branchesList = ["ALL", "CHENNAI", "BANGALORE", "MUMBAI", "DELHI"];

export default function AboutPage() {
  const containerRef = useRef(null);
  const [activeBranch, setActiveBranch] = useState('ALL');

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Hero Animation
      gsap.fromTo('.about-hero .heading-xl div', 
        { y: 100, opacity: 0, skewY: 10 },
        { y: 0, opacity: 1, skewY: 0, duration: 1.5, stagger: 0.2, ease: 'power4.out' }
      );
      
      gsap.fromTo('.hero-subtext', 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, delay: 0.8, ease: 'power3.out' }
      );

      // Section Reveals
      const revealSections = gsap.utils.toArray('.reveal-sec');
      revealSections.forEach(sec => {
        gsap.fromTo(sec, 
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sec,
              start: 'top 85%',
            }
          }
        );
      });

      // Award Stagger
      gsap.fromTo('.award-card', 
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          stagger: 0.2,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: '.awards-grid',
            start: 'top 80%',
          }
        }
      );

      // Choose Card Stagger
      gsap.fromTo('.choose-card', 
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.choose-grid',
            start: 'top 85%',
          }
        }
      );

    }, containerRef);
    
    return () => ctx.revert();
  }, [activeBranch]);

  return (
    <SmoothScroll>
      <main ref={containerRef} className="about-page">
        <Navbar />

        {/* Hero Section */}
        <section className="about-hero">
          <AboutHeroScene mode={1} />
          <div className="hero-gradient-overlay"></div>
          
          <div className="container relative z-10">
            <div className="section-tag">WHO WE ARE</div>
            <h1 className="heading-xl">
              <div>BILIMBE <span className="text-red-glow">DIGITAL</span></div>
            </h1>
            <p className="hero-subtext max-w-2xl mx-auto mt-6">
              Bilimbe Digital is a pioneer in event technology solutions, specializing 
              in AI-powered interactive photo booths, digital event registration, 
              and seamless audience engagement. We are dedicated to transforming 
              event experiences with cutting-edge technology.
            </p>
            <div className="hero-btns mt-12">
              <Magnetic strength={0.3}>
                <a href="/products" className="btn btn-primary">OUR_TECHNOLOGY</a>
              </Magnetic>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="why-choose-us reveal-sec">
          <div className="container">
            <div className="section-header text-center mb-16">
              <h2 className="heading-lg">WHY CHOOSE US?</h2>
              <div className="red-line mx-auto mt-4"></div>
            </div>
            <div className="choose-grid">
              {whyChooseUs.map((item, i) => (
                <div key={i} className="choose-card">
                  <div className="choose-num">{item.num}</div>
                  <div className="choose-icon">{item.icon}</div>
                  <h3 className="mb-4">{item.title}</h3>
                  <p className="text-gray">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Awards Section */}
        <section className="awards-section reveal-sec">
          <div className="container">
            <div className="section-header text-center mb-16">
              <h2 className="heading-lg">AWARDS & RECOGNITION</h2>
              <div className="red-line mx-auto mt-4"></div>
            </div>
            <div className="awards-grid">
              {awards.map((award, i) => (
                <div key={i} className="award-card">
                  <div className="award-year">{award.year}</div>
                  <h3 className="award-title">{award.title}</h3>
                  <p className="award-subtitle">{award.subtitle}</p>
                  <p className="award-org">{award.org}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Leadership Section */}
        <section className="leadership-section reveal-sec">
          <div className="container">
            <div className="section-header text-center mb-20">
              <div className="section-tag mx-auto">CORE_LEADERSHIP</div>
              <h2 className="heading-lg mt-4">THE ARCHITECTS</h2>
              <div className="red-line mx-auto mt-4"></div>
            </div>
            
            <div className="leadership-grid">
              {leadership.map((member, i) => (
                <div key={i} className="leader-card">
                  <div className="leader-img-container">
                    <img src={member.img} alt={member.name} className="leader-img" />
                    <div className="leader-overlay">
                      <div className="leader-tag">LEVEL_01_ACCESS</div>
                    </div>
                  </div>
                  <div className="leader-content">
                    <div className="leader-role-tag">{member.role}</div>
                    <h3 className="leader-name">{member.name}</h3>
                    <p className="leader-bio">{member.bio}</p>
                    <div className="leader-accent"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* The Collective (Team) Section */}
        <section className="collective-section">
          <div className="container">
            <div className="collective-header reveal-sec">
              <div>
                <h2 className="heading-lg">THE COLLECTIVE</h2>
                <p className="body-sm text-gray mt-2" style={{ letterSpacing: '0.1em' }}>CLUSTER DEPLOYMENT ACTIVE</p>
              </div>
              <div className="branch-filters">
                {branchesList.map(branch => (
                  <button 
                    key={branch}
                    className={`branch-btn ${activeBranch === branch ? 'active' : ''}`}
                    onClick={() => setActiveBranch(branch)}
                  >
                    {branch}
                  </button>
                ))}
              </div>
            </div>

            <div className="team-grid">
              {team.filter(m => activeBranch === 'ALL' || m.branch === activeBranch).map((member) => (
                <div key={member.name} className="team-card">
                  <img src={member.img} alt={member.name} className="team-img" />
                  <div className="team-info">
                    <h4 className="team-name">{member.name}</h4>
                    <p className="team-role">{member.role}</p>
                    <p className="team-branch">{member.branch}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="about-cta relative overflow-hidden">
          <CtaScene />
          <div className="container relative z-10">
            <h2 className="heading-lg reveal-sec mb-6">
              JOIN THE <span className="text-red-glow">REVOLUTION</span>
            </h2>
            <p className="body-md text-gray mb-12 reveal-sec max-w-xl mx-auto">
              Ready to elevate your event with the future of engagement? 
              Partner with the architects of digital impact.
            </p>
            <div className="hero-btns reveal-sec">
              <Magnetic strength={0.3}>
                <a href="https://www.bilimbe.in/contact-us.html" className="btn btn-primary cta-btn">BOOK_AN_ACTIVATION</a>
              </Magnetic>
              <Magnetic strength={0.3}>
                <a href="https://www.bilimbe.in/contact-us.html" className="btn btn-outline cta-btn">TALK_TO_AN_ARCHITECT</a>
              </Magnetic>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </SmoothScroll>
  );
}
