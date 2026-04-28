'use client';
import { footerLinks } from '@/lib/data';

export default function Footer() {
  return (
    <footer
      style={{
        background: 'var(--bg)',
        borderTop: '1px solid var(--border)',
        paddingTop: '64px',
        paddingBottom: '32px',
      }}
    >
      <div className="container">
        {/* Top grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '2fr repeat(4, 1fr)',
            gap: '48px',
            marginBottom: '64px',
          }}
          className="footer-grid"
        >
          {/* Brand col */}
          <div>
            <a
              href="#home"
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '2.2rem',
                letterSpacing: '0.05em',
                color: 'var(--white)',
                textDecoration: 'none',
                display: 'block',
                marginBottom: '16px',
              }}
            >
              <span style={{ color: 'var(--red)' }}>BI</span>LIMBE
            </a>
            <p className="body-md" style={{ maxWidth: '280px', lineHeight: 1.7, marginBottom: '28px' }}>
              Discover the ultimate Photo Booth & Digital Engagement Solution Provider
              for all your events across India.
            </p>

            {/* Social links */}
            <div style={{ display: 'flex', gap: '12px' }}>
              {[
                { label: 'WhatsApp', href: 'https://api.whatsapp.com/send?phone=919566110321', icon: 'WA' },
                { label: 'Call', href: 'tel:9566110321', icon: '☎' },
              ].map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  style={{
                    width: '40px',
                    height: '40px',
                    border: '1px solid var(--border)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    color: 'var(--gray)',
                    textDecoration: 'none',
                    transition: 'all 0.3s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--red)';
                    e.currentTarget.style.color = 'var(--red)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border)';
                    e.currentTarget.style.color = 'var(--gray)';
                  }}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--white)',
                  marginBottom: '20px',
                  paddingBottom: '10px',
                  borderBottom: '1px solid var(--border)',
                }}
              >
                {title}
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={link.href.startsWith('http') ? '_blank' : '_self'}
                      rel="noreferrer"
                      style={{
                        fontSize: '0.85rem',
                        color: 'var(--gray)',
                        textDecoration: 'none',
                        transition: 'color 0.3s',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--red)')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--gray)')}
                    >
                      <span
                        style={{
                          display: 'inline-block',
                          width: '4px',
                          height: '4px',
                          borderRadius: '50%',
                          background: 'var(--red)',
                          opacity: 0.6,
                          flexShrink: 0,
                        }}
                      />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          style={{
            paddingTop: '24px',
            borderTop: '1px solid var(--border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          <p className="body-sm">
            © {new Date().getFullYear()} Bilimbe. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '24px' }}>
            {[
              { label: 'Privacy Policy', href: '/privacy-policy' },
              { label: 'Contact Us', href: '/contact' },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                style={{
                  fontSize: '0.8rem',
                  color: 'var(--gray)',
                  textDecoration: 'none',
                  transition: 'color 0.3s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--red)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--gray)')}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 1200px) {
          .footer-grid { grid-template-columns: 1fr 1fr 1fr !important; }
        }
        @media (max-width: 768px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 32px !important; }
        }
        @media (max-width: 480px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
