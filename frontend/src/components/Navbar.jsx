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

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const go = (href) => {
    const el = document.getElementById(href.replace('#', ''));
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  return (
    <>
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`} aria-label="Main Navigation">
        <button className="nav-logo" onClick={() => go('#home')} aria-label="Home">
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

        <div className="nav-actions">
          <a href={personalData.resumePath} download={personalData.resumeFileName} className="nav-resume-btn">
            Download CV
          </a>
          <button
            className={`hamburger${mobileOpen ? ' open' : ''}`}
            onClick={() => setMobileOpen(o => !o)}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-menu"
          >
            <span className="h-line" />
            <span className="h-line" />
            <span className="h-line" />
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

      <div
        id="mobile-nav-menu"
        className={`mobile-menu${mobileOpen ? ' open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation Menu"
      >
        <div className="mobile-menu-header">
          <div className="mobile-menu-brand">
            <img src="/voxen_logo.jpg" alt="Voxen" className="nav-logo-img" />
            <span className="mobile-brand-title">{personalData.name}</span>
          </div>
          <button
            className="mobile-close-btn"
            onClick={() => setMobileOpen(false)}
            aria-label="Close navigation menu"
          >
            <i className="fas fa-times" />
          </button>
        </div>

        <div className="mobile-menu-list">
          {NAV_ITEMS.map((item, idx) => (
            <button
              key={item.label}
              className={`mobile-nav-item${active === item.href.replace('#','') ? ' active' : ''}`}
              onClick={() => go(item.href)}
            >
              <span className="mobile-nav-num">0{idx + 1}</span>
              <span className="mobile-nav-text">{item.label}</span>
              <i className="fas fa-chevron-right mobile-nav-arrow" />
            </button>
          ))}
        </div>

        <div className="mobile-menu-footer">
          <a
            href={personalData.resumePath}
            download={personalData.resumeFileName}
            className="btn-hud btn-hud-primary mobile-cv-btn"
          >
            <i className="fas fa-file-download" />
            DOWNLOAD CV
          </a>
          <div className="mobile-menu-socials">
            <a href={personalData.discord} target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="Discord">
              <i className="fab fa-discord" />
            </a>
            <a href={personalData.github} target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="GitHub">
              <i className="fab fa-github" />
            </a>
            <a href={`mailto:${personalData.email}`} className="social-btn" aria-label="Email">
              <i className="fas fa-envelope" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
