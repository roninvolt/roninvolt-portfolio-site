import React, { useState, useEffect } from 'react';
import MatrixText from './MatrixText';
import { personalData } from '../data/portfolioData';

const NAV_ITEMS = [
  { label: 'Home',       href: '#home' },
  { label: 'About',      href: '#about' },
  { label: 'Education',  href: '#education' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills',     href: '#skills' },
  { label: 'Projects',   href: '#projects' },
  { label: 'Contact',    href: '#contact' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('home');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      const ids = NAV_ITEMS.map(n => n.href.replace('#', ''));
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i]);
        if (el && window.scrollY >= el.offsetTop - 140) { setActive(ids[i]); break; }
      }
    };
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  const go = (href) => {
    const el = document.getElementById(href.replace('#', ''));
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  return (
    <>
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
        <button className="nav-logo" onClick={() => go('#home')}>
          <img src="/voxen_logo.jpg" alt="Voxen" className="nav-logo-img" />
          <span className="nav-logo-brand">
            <span className="nav-logo-name">
              <MatrixText text={personalData.name} glitchColor="var(--cyan)" />
            </span>
            <span className="nav-logo-alias">
              / <MatrixText text={personalData.alias} glitchColor="#00ff66" />
            </span>
          </span>
        </button>

        <ul className="nav-links">
          {NAV_ITEMS.map(item => (
            <li key={item.label}>
              <button
                className={`nav-link${active === item.href.replace('#','') ? ' active' : ''}`}
                onClick={() => go(item.href)}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <a href={personalData.resumePath} download={personalData.resumeFileName} className="nav-resume-btn">
            Download CV
          </a>
          <button className="hamburger" onClick={() => setMobileOpen(o => !o)} aria-label="Toggle menu" aria-expanded={mobileOpen}>
            <span style={{ transform: mobileOpen ? 'rotate(45deg) translate(5px,5px)' : 'none' }} />
            <span style={{ opacity: mobileOpen ? 0 : 1 }} />
            <span style={{ transform: mobileOpen ? 'rotate(-45deg) translate(5px,-5px)' : 'none' }} />
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div
          className="mobile-backdrop"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      <div className={`mobile-menu${mobileOpen ? ' open' : ''}`}>
        {NAV_ITEMS.map(item => (
          <button
            key={item.label}
            className={`nav-link${active === item.href.replace('#','') ? ' active' : ''}`}
            onClick={() => go(item.href)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'inherit',
              textAlign: 'left',
              fontSize: '1.05rem',
              padding: '8px 4px',
            }}
          >
            {item.label}
          </button>
        ))}
        <a
          href={personalData.resumePath}
          download={personalData.resumeFileName}
          className="nav-resume-btn"
          style={{ alignSelf: 'flex-start', marginTop: '0.5rem' }}
        >
          Download CV
        </a>
      </div>
    </>
  );
};

export default Navbar;
