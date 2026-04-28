'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import dynamic from 'next/dynamic';
import SmoothScroll from '@/components/SmoothScroll';
import Navbar from '@/components/sections/Navbar';
import Footer from '@/components/sections/Footer';

import './careers.css';

const CareerScene = dynamic(() => import('@/components/three/CareerScene'), { ssr: false });

gsap.registerPlugin(ScrollTrigger);

const JOB_LISTINGS = [
  {
    id: 'EVENT_OPS',
    title: 'Event Operations',
    type: 'FULL_TIME',
    desc: 'Ensure the smooth planning and execution of events through effective coordination of logistics, resources, and schedules. Focus on delivering well-organized events while maintaining quality standards.'
  },
  {
    id: 'DESIGN_EDITOR',
    title: 'Graphic Designer & Video Editor',
    type: 'CREATIVE',
    desc: 'Develop visually engaging and innovative design concepts that effectively communicate the organization’s brand identity. Create high-quality visual content for digital and promotional platforms.'
  },
  {
    id: 'MARKETING_EXEC',
    title: 'Marketing Management Executives',
    type: 'GROWTH',
    desc: 'Plan and execute strategic marketing initiatives to enhance brand visibility and market reach. Manage campaigns, promotional activities, and market engagement to attract potential customers.'
  },
  {
    id: 'SALES_EXEC',
    title: 'Sales Executive',
    type: 'BUSINESS',
    desc: 'Identify potential customers, present products or services, and drive sales opportunities. Build and maintain strong client relationships while achieving assigned sales targets.'
  },
  {
    id: 'TECH_DEV',
    title: 'Technical Development',
    type: 'ENGINEERING',
    desc: 'Design, develop, and maintain reliable software and technical solutions that support business operations. Ensure system efficiency, performance, and continuous improvement of applications.'
  },
  {
    id: 'UNITY_DEV',
    title: 'Unity & 3D Developer',
    type: 'IMMERSIVE',
    desc: 'Unity and 3D development to create interactive and visually engaging applications and Games. Develop and optimize high-quality 3D assets using tools like Blender.'
  }
];

const BENEFITS = [
  { title: 'Health Insurance', desc: 'Comprehensive medical coverage for you and your family.' },
  { title: 'Learning Budget', desc: 'Annual allowance for courses, certifications, and conferences.' },
  { title: 'Flexible Leaves', desc: 'Generous leave policy including paid time off and holidays.' },
  { title: 'Competitive Pay', desc: 'Market-leading salaries with performance-based bonuses.' },
  { title: 'Recognition Programs', desc: 'Monthly and annual awards celebrating top performers.' },
  { title: 'Event Access', desc: 'Behind-the-scenes access to premier events across India.' },
  { title: 'Work Equipment', desc: 'Top-of-the-line laptop, accessories, and tools provided.' },
  { title: 'Team Retreats', desc: 'Quarterly team outings and annual company retreats.' }
];

export default function CareersPage() {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from('.careers-hero h1', {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: 'power4.out'
      });

      gsap.fromTo('.job-card', 
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.05,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.job-grid',
            start: 'top 95%',
            toggleActions: 'play none none none'
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <SmoothScroll>
      <main ref={containerRef} className="careers-page">
        <Navbar />

        {/* Hero Section */}
        <section className="careers-hero">
          <div className="absolute inset-0 z-0">
            <CareerScene />
          </div>

          {/* Tactical Overlays */}
          <div className="tactical-overlay">
            <div className="tactical-corner top-left"></div>
            <div className="tactical-corner top-right"></div>
            <div className="tactical-corner bottom-left"></div>
            <div className="tactical-corner bottom-right"></div>
          </div>
          
          <div className="side-intel left-intel">SYS_NODE_BILIMBE // RECRUITMENT_PHASE_01</div>
          <div className="side-intel right-intel">COORDS_044_918 // LATENCY_STABLE</div>

          <div className="floating-keyword top-[20%] left-[10%]">AI_ENGINEERING</div>
          <div className="floating-keyword top-[30%] right-[15%]">EVENT_TECH</div>
          <div className="floating-keyword bottom-[25%] left-[15%]">IMMERSIVE_AR</div>
          <div className="floating-keyword bottom-[15%] right-[10%]">UNITY_3D</div>

          <div className="container relative z-10">
            <div className="hero-tagline">DEPLOY_YOUR_TALENT</div>
            <h1>JOIN THE <span className="text-red-600">SQUAD</span></h1>
            <p className="hero-desc">
              WE ARE REINVENTING HOW THE WORLD CELEBRATES. <br />
              YOUR CODE, YOUR DESIGN, YOUR VISION.
            </p>
          </div>
        </section>

        {/* Why Bilimbe */}
        <section className="careers-values">
          <div className="container">
            <div className="section-tag">PROTOCOL_ADVANTAGE</div>
            <h2 className="text-5xl font-heading uppercase mb-16">WHY BILIMBE?</h2>
            
            <div className="values-grid">
              <div className="value-card">
                <span className="value-num">01</span>
                <h3 className="value-title">Cutting-Edge Tech</h3>
                <p className="value-desc">Work with the latest interactive solutions and push the boundaries of what is possible in event technology.</p>
              </div>
              <div className="value-card">
                <span className="value-num">02</span>
                <h3 className="value-title">Creative Freedom</h3>
                <p className="value-desc">We encourage fresh ideas and out-of-the-box thinking. Your voice is heard at every stage of development.</p>
              </div>
              <div className="value-card">
                <span className="value-num">03</span>
                <h3 className="value-title">Career Growth</h3>
                <p className="value-desc">Strong opportunities for skill development and professional advancement in a fast-growing industry.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Open Positions */}
        <section className="job-section">
          <div className="container">
            <div className="job-header">
              <div className="section-tag">OPEN_NODES</div>
              <h2 className="text-6xl font-heading uppercase">CURRENT OPENINGS</h2>
            </div>

            <div className="job-grid">
              {JOB_LISTINGS.map((job) => (
                <div key={job.id} className="job-card">
                  <span className="job-type">{job.type}</span>
                  <h3 className="job-title">{job.title}</h3>
                  <p className="job-desc">{job.desc}</p>
                  <div className="job-footer">
                    <div className="text-zinc-600 text-[0.6rem] font-bold uppercase tracking-widest">LOCATION // INDIA_REMOTE</div>
                    <button className="btn-apply">INITIATE_APPLY</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="benefits-section">
          <div className="container">
            <div className="section-tag">REWARDS_MODULE</div>
            <h2 className="text-5xl font-heading uppercase mb-16">SQUAD_BENEFITS</h2>
            
            <div className="benefits-grid">
              {BENEFITS.map((benefit, i) => (
                <div key={i} className="benefit-card">
                  <div className="benefit-header"></div>
                  <div className="benefit-body">
                    <h3 className="benefit-title">{benefit.title}</h3>
                    <p className="benefit-desc">{benefit.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Application Form */}
        <section id="careerForm" className="apply-section">
          <div className="container">
            <div className="apply-container">
              <div className="section-tag">DATA_SUBMISSION</div>
              <h2 className="text-4xl font-heading uppercase mb-12">DEPLOY_YOUR_INTEL</h2>
              
              <form className="form-grid">
                <div className="form-group">
                  <label>FULL_NAME *</label>
                  <input type="text" placeholder="Your full name" required />
                </div>
                <div className="form-group">
                  <label>EMAIL_ADDRESS *</label>
                  <input type="email" placeholder="you@example.com" required />
                </div>
                <div className="form-group">
                  <label>PHONE_NUMBER *</label>
                  <input type="text" placeholder="+91 98765 43210" required />
                </div>
                <div className="form-group">
                  <label>POSITION_APPLYING_FOR *</label>
                  <select required defaultValue="">
                    <option value="" disabled>Select a position</option>
                    {JOB_LISTINGS.map(j => <option key={j.id} value={j.id}>{j.title}</option>)}
                  </select>
                </div>
                <div className="form-group full">
                  <label>YEARS_OF_EXPERIENCE</label>
                  <select defaultValue="">
                    <option value="" disabled>Select experience level</option>
                    <option>Fresher</option>
                    <option>1-3 Years</option>
                    <option>3-5 Years</option>
                    <option>5+ Years</option>
                  </select>
                </div>
                <div className="form-group full">
                  <label>COVER_MESSAGE</label>
                  <textarea rows="4" placeholder="Tell us a little about yourself and why you'd be a great fit at Bilimbe..."></textarea>
                </div>
                <div className="form-group full">
                  <label>UPLOAD_RESUME * <span className="text-[0.6rem] opacity-50 ml-2">(PDF, DOC, DOCX - MAX 5MB)</span></label>
                  <div className="resume-upload-zone">
                    <input type="file" id="resume-upload" className="file-input-hidden" accept=".pdf,.doc,.docx" />
                    <label htmlFor="resume-upload" className="upload-label">
                      <div className="upload-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                      </div>
                      <p>Click or drag & drop your resume here</p>
                      <span>PDF, DOC, DOCX · Max 5 MB</span>
                    </label>
                  </div>
                </div>
                <div className="form-group full">
                  <button type="submit" className="btn-apply-full">
                    <span>Submit Application</span>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </SmoothScroll>
  );
}
