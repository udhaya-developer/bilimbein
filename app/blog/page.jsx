'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import dynamic from 'next/dynamic';
import SmoothScroll from '@/components/SmoothScroll';
import Navbar from '@/components/sections/Navbar';
import Footer from '@/components/sections/Footer';
import { blogPosts } from '@/lib/data';

import './blog.css';

gsap.registerPlugin(ScrollTrigger);

export default function BlogPage() {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Hero Animation
      gsap.from('.hero-content > *', {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out'
      });

      // Sections Entrance
      gsap.utils.toArray('section').forEach((section) => {
        gsap.from(section, {
          opacity: 0,
          y: 40,
          duration: 1,
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        });
      });
    }, containerRef);
  }, []);

  const trending = blogPosts.slice(0, 4);
  const streams = blogPosts.slice(4);

  return (
    <SmoothScroll>
      <main ref={containerRef} className="blog-page">
        <Navbar />

        {/* Tactical Hero */}
        <section className="blog-hero" style={{ backgroundImage: 'url(/blog-hero.png)' }}>
          <div className="hero-content">
            <div className="hero-tag">PREMIUM_BILL_REPORTS_#01</div>
            <h1 className="hero-title">
              THE FUTURE OF <br />
              <span>VIRAL INTEL</span>
            </h1>
            <p className="hero-desc">
              DECODING THE SYNTHETIC SIGNALS OF THE NEXT DECADE. 
              ARCHITECTURE OF DIGITAL INFLUENCE IS SHIFTING TOWARDS NEURAL RESONANCE.
            </p>
            <div className="hero-btns">
              <button className="btn-tactical primary">ACCESS_PROTOCOL</button>
              <button className="btn-tactical outline">READ_LOGS</button>
            </div>
          </div>
        </section>

        {/* Trending Intel */}
        <section className="py-20">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">TRENDING_INTEL</h2>
              <div className="text-[0.6rem] font-bold text-red-600 tracking-widest uppercase">• LIVE_FEED</div>
            </div>

            <div className="trending-grid">
              {trending.map((post) => (
                <article key={post.id} className="intel-card">
                  <div className="intel-img-wrapper">
                    <img src={post.image} alt={post.title} className="intel-img" />
                  </div>
                  <div className="intel-meta">
                    <span>{post.category}</span>
                    <span>{post.date}</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="intel-title">{post.title}</h3>
                  <p className="intel-excerpt">{post.excerpt}</p>
                  <a href="#" className="intel-link">DECODE_MORE →</a>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Tactical Banner (Moved from grid) */}
        <section className="bg-zinc-950 border-y border-white/5 py-16">
          <div className="container flex flex-col md:flex-row items-center justify-between gap-10">
            <div>
              <h3 className="pulse-title mb-2">PULSE_SUB</h3>
              <p className="pulse-desc mb-0">RECEIVE RAW TECH INTEL DIRECTLY TO YOUR TERMINAL.</p>
            </div>
            <div className="flex gap-4 w-full max-w-lg">
              <input type="text" className="pulse-input mb-0 flex-1" placeholder="ENTER_PROTOCOL_KEY" />
              <button className="btn-tactical primary px-10">ESTABLISH_CONNECTION</button>
            </div>
          </div>
        </section>

        {/* Core Streams */}
        <section className="py-40">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">CORE_STREAMS</h2>
              <div className="text-[0.6rem] font-bold text-zinc-600 tracking-widest uppercase">ARCHIVED_LOGS</div>
            </div>

            {streams.length > 0 ? (
              <div className="stream-list">
                {streams.map((post) => (
                  <div key={post.id} className="stream-item">
                    <img src={post.image} alt={post.title} className="stream-img" />
                    <div className="stream-info">
                      <div className="stream-meta">{post.category} // {post.date}</div>
                      <h3 className="stream-title">{post.title}</h3>
                      <p className="text-zinc-500 text-sm">{post.excerpt}</p>
                    </div>
                    <div className="stream-arrow">↗</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 border border-dashed border-white/5 text-zinc-700 font-bold uppercase tracking-tighter text-4xl">
                END_OF_TRANSMISSION
              </div>
            )}
          </div>
        </section>

        <Footer />
      </main>
    </SmoothScroll>
  );
}
