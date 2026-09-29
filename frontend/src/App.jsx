import React, { useState, useEffect } from 'react';
import './index.css';
import './App.css';

import IntroScreen    from './components/IntroScreen';
import CustomCursor   from './components/CustomCursor';
import Navbar         from './components/Navbar';
import Hero           from './components/Hero';
import About          from './components/About';
import MoodBoard      from './components/MoodBoard';
import Education      from './components/Education';
import Experience     from './components/Experience';
import Skills         from './components/Skills';
import Projects       from './components/Projects';
import Contact        from './components/Contact';
import ScrollProgress from './components/ScrollProgress';
import BackToTop      from './components/BackToTop';
import SpotlightManager from './components/SpotlightManager';
import TactileNoise   from './components/TactileNoise';
import SectionDivider from './components/SectionDivider';
import { personalData } from './data/portfolioData';

function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    document.querySelectorAll('.reveal').forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function useLenis() {
  useEffect(() => {
    let lenis;
    import('lenis').then(({ default: Lenis }) => {
      lenis = new Lenis({ duration: 1.2, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true });
      const raf = (time) => { lenis.raf(time); requestAnimationFrame(raf); };
      requestAnimationFrame(raf);
    }).catch(() => {});
    return () => lenis?.destroy();
  }, []);
}

function App() {
  const [intro, setIntro] = useState(false); // starts with intro
  useLenis();
  useReveal();

  return (
    <div className="app-container">
      <IntroScreen onComplete={() => setIntro(true)} />

      <CustomCursor />
      <ScrollProgress />
      <SpotlightManager />
      <TactileNoise />
      <BackToTop />

      <div className="main-content-wrap" style={{ opacity: intro ? 1 : 0, transition: 'opacity 0.6s ease', width: '100%', maxWidth: '100%', overflowX: 'hidden' }}>
        <Navbar />

        <main style={{ width: '100%', maxWidth: '100%', overflowX: 'hidden' }}>
          <Hero />
          <SectionDivider label="ABOUT // 01" />
          <About />
          <SectionDivider label="MOODBOARD // AUDIO" />
          <MoodBoard />
          <SectionDivider label="EDUCATION // 02" />
          <Education />
          <SectionDivider label="EXPERIENCE // 03" />
          <Experience />
          <SectionDivider label="SKILLS // 04" />
          <Skills />
          <SectionDivider label="PROJECTS // 05" />
          <Projects />
          <SectionDivider label="TRANSMISSION // 06" />
          <Contact />
        </main>

        {/* FOOTER */}
        <footer>
          <div style={{ borderTop: '1px solid rgba(255, 0, 127, 0.08)', position: 'relative', zIndex: 1, background: 'rgba(9, 4, 18, 0.9)' }}>
            <div className="site-footer" style={{ borderTop: 'none' }}>
              <div className="footer-inner">
                <div>
                  <div className="footer-logo" style={{ fontSize: '1.8rem', fontWeight: 900, display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <img src="/voxen_logo.jpg" alt="Voxen" style={{ width: '30px', height: '30px', borderRadius: '50%', objectFit: 'cover', border: '1px solid rgba(255, 255, 255, 0.25)' }} />
                    <span className="gta-text-gradient">{personalData.name}</span>
                    <span style={{ fontSize: '1rem', color: 'rgba(255, 255, 255, 0.4)', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>/ {personalData.alias}</span>
                  </div>
                  <div className="footer-tag" style={{ color: 'rgba(255, 255, 255, 0.25)' }}>AI ENGINEER · FOUNDER — VOXEN DEVELOPMENT · BUILDING INTELLIGENT SYSTEMS</div>
                </div>
                <div className="footer-socials">
                  {[
                    { href: personalData.discord, icon: 'fab fa-discord', label: 'Discord' },
                    { href: personalData.github, icon: 'fab fa-github', label: 'GitHub' },
                    { href: personalData.zyo, icon: 'fas fa-link', label: 'Zyo Bio' },
                    { href: `mailto:${personalData.email}`, icon: 'fas fa-envelope', label: 'Email' },
                  ].map(s => (
                    <a key={s.label} href={s.href} target={s.href.startsWith('http') ? '_blank' : undefined}
                      rel="noopener noreferrer" className="social-btn" aria-label={s.label} style={{ borderColor: 'rgba(255, 0, 127, 0.2)' }} onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--cyan)'; e.currentTarget.style.color = 'var(--cyan)'; }} onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255, 0, 127, 0.2)'; e.currentTarget.style.color = 'rgba(255, 255, 255, 0.4)'; }}>
                      <i className={s.icon} />
                    </a>
                  ))}
                  <a href={personalData.resumePath} download={personalData.resumeFileName} className="nav-resume-btn" style={{ marginLeft: '0.5rem', borderColor: 'var(--cyan)', color: 'var(--cyan)' }} onMouseEnter={e => { e.currentTarget.style.boxShadow = 'var(--glow-cyan)'; }} onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; }}>
                    DOWNLOAD CV
                  </a>
                </div>
              </div>
              <p className="footer-copy" style={{ color: 'rgba(255, 255, 255, 0.12)' }}>{personalData.copyright} · LEONIDA COVER STYLE Redesign</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
