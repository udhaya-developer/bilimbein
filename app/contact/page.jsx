'use client';
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '../../components/sections/Navbar';
import Footer from '../../components/sections/Footer';
import Magnetic from '../../components/Magnetic';
import SmoothScroll from '../../components/SmoothScroll';
import './contact.css';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const containerRef = useRef(null);
  const [activeFaq, setActiveFaq] = React.useState(0);
  const [productOpen, setProductOpen] = React.useState(false);
  const [cityOpen, setCityOpen] = React.useState(false);
  const [selectedProduct, setSelectedProduct] = React.useState("");
  const [selectedCity, setSelectedCity] = React.useState("");

  const products = [
    { value: 'product1', label: 'Digital Activation 01' },
    { value: 'product2', label: 'Interactive Zone 02' },
    { value: 'product3', label: '3D Holographic Display' }
  ];

  const cities = [
    { value: 'chennai', label: 'Chennai' },
    { value: 'bangalore', label: 'Bangalore' },
    { value: 'mumbai', label: 'Mumbai' },
    { value: 'delhi', label: 'Delhi' }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.contact-hero .section-tag',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.1 }
      );

      gsap.fromTo(
        '.contact-hero .hero-title span',
        { y: 80, opacity: 0, skewY: 8 },
        {
          y: 0,
          opacity: 1,
          skewY: 0,
          duration: 1.2,
          stagger: 0.15,
          ease: 'power4.out',
          delay: 0.2,
        }
      );

      gsap.fromTo(
        '.contact-header-main > *',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.contact-section',
            start: 'top 75%',
          },
        }
      );

      gsap.fromTo(
        '.form-container-modern',
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.contact-grid-modern',
            start: 'top 78%',
          },
        }
      );

      gsap.fromTo(
        '.form-container-modern .input-wrapper, .form-container-modern .submit-btn-advanced',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.form-container-modern',
            start: 'top 80%',
          },
        }
      );

      gsap.fromTo(
        '.info-dashboard',
        { opacity: 0, x: 30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.contact-grid-modern',
            start: 'top 78%',
          },
        }
      );

      gsap.fromTo(
        '.detail-item, .social-row',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.info-dashboard',
            start: 'top 82%',
          },
        }
      );

      gsap.fromTo(
        '.faq-head > *',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.faq-section',
            start: 'top 80%',
          },
        }
      );

      gsap.fromTo(
        '.faq-item',
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.55,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.faq-layout',
            start: 'top 82%',
          },
        }
      );

      gsap.fromTo(
        '.faq-media',
        { opacity: 0, x: 30, scale: 0.98 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.faq-layout',
            start: 'top 82%',
          },
        }
      );

      gsap.fromTo(
        '.branches-section .section-tag, .branches-section .heading-lg',
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.branches-section',
            start: 'top 78%',
          },
        }
      );

      gsap.fromTo(
        '.bento-item',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.bento-grid',
            start: 'top 85%',
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <SmoothScroll>
      <main ref={containerRef} className="contact-page">
        <Navbar />

        {/* Cinematic Hero */}
        <section className="contact-hero">
          <div className="hero-content relative container">
            <div className="section-tag mx-auto mb-6">CONNECTION_INITIATED_#01</div>
            <h1 className="hero-title">
              <span>TALK TO THE</span>
              <span>ARCHITECTS</span>
            </h1>
          </div>
        </section>

        {/* Contact Layout Section */}
        <section className="contact-section contact-reveal">
          <div className="container" id="form">
            <div className="contact-shell">
              <div className="contact-header-main">
                <h2 className="heading-lg">Connect with <span className="text-red">Our Team</span></h2>
                <p className="body-md text-gray max-w-2xl mx-auto mt-5">
                  Share your event goal and our specialists will design the right digital activation setup for your audience.
                </p>
              </div>

              <div className="contact-grid-modern">
                <div className="form-container-modern">
                  <div className="contact-block-title">Get in Touch <span className="text-red">with Us</span></div>
                  <form className="advanced-form">
                    <div className="form-row">
                      <div className="input-wrapper">
                        <input type="text" placeholder="Full Name*" required />
                      </div>
                      <div className="input-wrapper">
                        <input type="email" placeholder="Mail Id*" required />
                      </div>
                    </div>

                    <div className="input-wrapper">
                      <input type="tel" placeholder="Phone Number*" required />
                    </div>

                    <div className="input-wrapper custom-select-wrapper">
                      <div 
                        className={`custom-select ${productOpen ? 'open' : ''}`}
                        onClick={() => setProductOpen(!productOpen)}
                      >
                        <span className={selectedProduct ? 'selected' : 'placeholder'}>
                          {selectedProduct ? products.find(p => p.value === selectedProduct)?.label : 'Select Product*'}
                        </span>
                        <div className="select-arrow"></div>
                      </div>
                      {productOpen && (
                        <ul className="custom-options">
                          {products.map(p => (
                            <li 
                              key={p.value} 
                              onClick={() => {
                                setSelectedProduct(p.value);
                                setProductOpen(false);
                              }}
                            >
                              {p.label}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    <div className="form-row">
                      <div className="input-wrapper">
                        <input type="text" placeholder="Event Venue" />
                      </div>
                      <div className="input-wrapper custom-select-wrapper">
                        <div 
                          className={`custom-select ${cityOpen ? 'open' : ''}`}
                          onClick={() => setCityOpen(!cityOpen)}
                        >
                          <span className={selectedCity ? 'selected' : 'placeholder'}>
                            {selectedCity ? cities.find(c => c.value === selectedCity)?.label : 'city*'}
                          </span>
                          <div className="select-arrow"></div>
                        </div>
                        {cityOpen && (
                          <ul className="custom-options">
                            {cities.map(c => (
                              <li 
                                key={c.value} 
                                onClick={() => {
                                  setSelectedCity(c.value);
                                  setCityOpen(false);
                                }}
                              >
                                {c.label}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>

                    <div className="input-wrapper mb-2">
                      <input type="datetime-local" required />
                      <div className="form-note">Note : <span>* ( Choose the event's date and time )</span></div>
                    </div>

                    <div className="input-wrapper">
                      <textarea rows="4" placeholder="Message*" required></textarea>
                    </div>

                    <div className="flex justify-end mt-4">
                      <Magnetic strength={0.1}>
                        <button type="submit" className="submit-btn-pill">
                          Submit
                        </button>
                      </Magnetic>
                    </div>
                  </form>
                </div>
                <div className="info-dashboard">
                  <div className="contact-block-title">Contact <span className="text-red">Details</span></div>
                  <p className="body-sm text-gray mb-8">
                    Our team is available to support product selection, planning, and full deployment logistics.
                  </p>
                  <div className="details-grid">
                    <div className="dashboard-card detail-item">
                      <div className="tactical-icon">⌂</div>
                      <div>
                        <h4>ADDRESS</h4>
                        <p>D/No. 6, Mariamman Koil Street, West KK Nagar, Chennai 600078</p>
                      </div>
                    </div>
                    <div className="dashboard-card detail-item">
                      <div className="tactical-icon">✆</div>
                      <div>
                        <h4>MOBILE</h4>
                        <a href="tel:+919159488752">+91 91594 88752</a>
                      </div>
                    </div>
                    <div className="dashboard-card detail-item">
                      <div className="tactical-icon">◷</div>
                      <div>
                        <h4>AVAILABILITY</h4>
                        <p>Daily 09 AM - 05 PM</p>
                      </div>
                    </div>
                    <div className="dashboard-card detail-item">
                      <div className="tactical-icon">@</div>
                      <div>
                        <h4>EMAIL</h4>
                        <a href="mailto:info@bilimbe.in">info@bilimbe.in</a>
                      </div>
                    </div>
                  </div>
                  <div className="social-row">
                    <span>SOCIAL MEDIA:</span>
                    <div className="social-links">
                      <a href="https://www.instagram.com/bilimbe/" target="_blank" rel="noopener noreferrer">IG</a>
                      <a href="https://www.linkedin.com/company/bilimbe-digital/" target="_blank" rel="noopener noreferrer">IN</a>
                      <a href="https://www.youtube.com/@bilimbe" target="_blank" rel="noopener noreferrer">YT</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="faq-section contact-reveal">
          <div className="container">
            <div className="faq-head text-center">
              <div className="section-tag mx-auto">SUPPORT_PROTOCOL</div>
              <h2 className="heading-lg mt-4">YOUR COMMON QUERIES ANSWERED <br /> WITH <span className="text-red">ADDITIONAL FAQS</span></h2>
              <p className="body-md text-gray max-w-2xl mx-auto mt-5">
                Fast answers for planning, privacy, logistics, and selecting the right activation experience.
              </p>
            </div>
            <div className="faq-layout">
              <div className="faq-list">
                {[
                  { q: 'How can I benefit from Bilimbe?', a: 'We deploy interactive technology zones that increase participation, dwell time, and social sharing across your event.' },
                  { q: 'How can I get in touch with customer support?', a: 'Our coordination team runs pre-event planning calls and setup checklists with your marketing or event team.' },
                  { q: 'How do you ensure data security and privacy?', a: 'All data capture workflows follow consent-first practices and secure handling for enterprise and brand activations.' },
                  { q: 'How do I get started with your offerings?', a: 'Share your location, date, and expected audience size and we will respond with recommendations and pricing quickly.' },
                  { q: 'Do you provide on-site technical support?', a: 'Yes, our team provides full on-site deployment and real-time technical coordination to ensure a seamless experience for your attendees.' },
                ].map((item, index) => (
                  <div 
                    key={index} 
                    className={`faq-item ${activeFaq === index ? 'active' : ''}`}
                    onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  >
                    <div className="faq-question">
                      {item.q}
                      <span className="faq-icon-box"></span>
                    </div>
                    <div className="faq-answer">
                      <div className="answer-inner">
                        <p>{item.a}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="faq-media">
                <img src="/images/faq-support.png" alt="High-tech cybernetic support interface" />
              </div>
            </div>
          </div>
        </section>

        {/* Bento Branch Network */}
        <section className="branches-section bg-[#050505] contact-reveal">
          <div className="container">
            <div className="mb-28 text-center">
              <div className="section-tag mx-auto">GLOBAL_DISTRIBUTION</div>
              <h2 className="heading-lg">OUR <span className="text-red">NODES</span></h2>
            </div>

            <div className="bento-grid">
              {[
                { city: "CHENNAI", addr: "D/No. 6, Mariamman koil Street, West KK Nagar, Chennai 600078", size: "large" },
                { city: "BANGALORE", addr: "MR 3, 2nd cross Sfhs layout Btm 2nd stage Bangalore-560076", size: "tall" },
                { city: "MUMBAI", addr: "D/No.05 Chakradhar Nagar, Panchal Nagar, Nallasopara West, Mumbai-401203", size: "" },
                { city: "DELHI", addr: "E-13A, Gali No 5, E-block, Pandav Nagar, New Delhi-110091", size: "" },
                { city: "HYDERABAD", addr: "Plot No:52, House No:27-16-21/1 Safilguda, Secunderabad-500056", size: "large" },
                { city: "GOA", addr: "D/No.S-2, Sai Apartment, Chimbal, Goa - 403006", size: "" },
                { city: "KOLKATA", addr: "D/No.103, 10B, Machuabazar Kolkata-700007", size: "tall" },
                { city: "COIMBATORE", addr: "D/No.1A, Rathinapuri, Tatabad, Coimbatore-641027", size: "" }
              ].map((node, i) => (
                <div key={i} className={`bento-item ${node.size}`}>
                  <div className="bento-num">0{i+1}</div>
                  <h4 className="bento-city">{node.city}</h4>
                  <p className="bento-addr">{node.addr}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </SmoothScroll>
  );
};

export default Contact;
