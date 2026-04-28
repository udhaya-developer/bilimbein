'use client';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { navLinks } from '@/lib/data';
import Magnetic from '@/components/Magnetic';

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('');
  const navRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Determine active section on scroll if on home page
      if (pathname === '/') {
        const sections = navLinks
          .filter(link => link.href.startsWith('/#'))
          .map(link => link.href.substring(2));
          
        let current = '';
        for (const section of sections) {
          const el = document.getElementById(section);
          if (el && el.offsetTop - 120 <= window.scrollY) {
            current = '/#' + section;
          }
        }
        setActiveLink(current || '/');
      } else {
        setActiveLink(pathname);
      }
    };

    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [pathname]);

  return (
    <nav
      ref={navRef}
      id="navbar"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: scrolled ? '12px 0' : '24px 0',
        background: scrolled
          ? 'rgba(0,0,0,0.95)'
          : 'linear-gradient(to bottom, rgba(0,0,0,0.8), transparent)',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(232,0,28,0.15)' : 'none',
        transition: 'all 0.4s ease',
      }}
    >
      <div className="container">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Magnetic strength={0.2}>
            <a
              href="#home"
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.8rem',
                letterSpacing: '0.05em',
                color: 'var(--white)',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <span style={{ color: 'var(--red)' }}>BI</span>LIMBE
            </a>
          </Magnetic>

          {/* Desktop nav */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '40px',
            }}
            className="desktop-nav"
          >
            {navLinks.map((l) => {
              const isActive = activeLink === l.href;
              return (
                <a
                  key={l.label}
                  href={l.href}
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: isActive ? 'var(--red)' : 'var(--gray)',
                    textDecoration: 'none',
                    transition: 'color 0.3s',
                    position: 'relative',
                  }}
                  onMouseEnter={e => !isActive && (e.target.style.color = 'var(--white)')}
                  onMouseLeave={e => !isActive && (e.target.style.color = 'var(--gray)')}
                >
                  {l.label}
                </a>
              );
            })}
            <Magnetic strength={0.3}>
              <a
                href="/contact"
                className="btn btn-primary"
                style={{ padding: '10px 24px', fontSize: '0.75rem' }}
              >
                Contact Us
              </a>
            </Magnetic>
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            style={{
              display: 'none',
              flexDirection: 'column',
              gap: '5px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '4px',
            }}
            className="hamburger"
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  display: 'block',
                  width: '24px',
                  height: '2px',
                  background: 'var(--white)',
                  transition: 'all 0.3s',
                  transformOrigin: 'center',
                  transform:
                    menuOpen
                      ? i === 0 ? 'rotate(45deg) translate(5px, 5px)'
                      : i === 1 ? 'opacity 0'
                      : 'rotate(-45deg) translate(5px, -5px)'
                      : 'none',
                  opacity: menuOpen && i === 1 ? 0 : 1,
                }}
              />
            ))}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div
            style={{
              marginTop: '20px',
              padding: '24px 0',
              borderTop: '1px solid var(--border)',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
            }}
          >
            {navLinks.map((l) => {
              const isActive = activeLink === l.href;
              return (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: isActive ? 'var(--red)' : 'var(--gray)',
                    textDecoration: 'none',
                  }}
                >
                  {l.label}
                </a>
              );
            })}
          </div>
        )}
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}
