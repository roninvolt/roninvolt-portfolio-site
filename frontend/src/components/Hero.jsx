import React, { useRef, useEffect, Suspense } from 'react';
import HeroSphere from './HeroSphere';
import SectionBg from './SectionBg';
import HeroName from './HeroName';
import MatrixText from './MatrixText';
import { personalData, heroData } from '../data/portfolioData';

const Hero = () => {
  const mousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e) => {
      mousePos.current = { x: e.clientX - window.innerWidth / 2, y: e.clientY - window.innerHeight / 2 };
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <section id="home" className="hero-section">
      <SectionBg variant="hero" />
      {/* Big background text */}
      <div className="hero-bg-text" aria-hidden="true" style={{ opacity: 0.03, WebkitTextStroke: '1px var(--cyan)', filter: 'blur(1px)' }}>PORTFOLIO</div>

      <div className="hero-grid">
        {/* LEFT TEXT */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          {/* Status */}
          <div className="hero-status reveal visible" style={{ borderColor: 'rgba(255, 255, 255, 0.15)', background: 'rgba(255, 255, 255, 0.03)', color: 'var(--cyan)' }}>
            <MatrixText text={personalData.status} glitchColor="#00ff66" autoGlitch={true} glitchInterval={10000} />
          </div>

          {/* Name - Ultra Aesthetic Holographic & Decoder System */}
          <HeroName />

          {/* HUD data line */}
          <div className="hero-data reveal visible d1" style={{ color: 'rgba(255, 255, 255, 0.4)', fontFamily: 'var(--font-mono)' }}>
            <MatrixText text={personalData.hudStatus} glitchColor="#00f0ff" triggerOnHover={true} />
          </div>

          {/* Roles */}
          <div className="hero-role-wrap reveal visible d2" style={{ borderLeftColor: 'var(--cyan)' }}>
            <div className="hero-role-label" style={{ color: 'var(--gold)' }}>
              <MatrixText text={heroData.objective} glitchColor="#ffd700" />
            </div>
            <div className="hero-roles-container">
              <div style={{ animation: 'roleScroll 12s ease-in-out infinite' }}>
                {[...heroData.roles, heroData.roles[0]].map((r, i) => (
                  <div key={i} className="hero-role">{r}</div>
                ))}
              </div>
            </div>
          </div>

          <p className="hero-desc reveal visible d3" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            Engineering intelligent <span className="bio-hl">AI models</span>, <span className="bio-hl">autonomous agents</span>, and deep learning pipelines. 3rd year B.E. AIML student at <span className="bio-hl">KGISL Institute of Technology (KiTE)</span>, Coimbatore, and Founder of <span className="bio-hl">Voxen Development</span>.
          </p>

          {/* Buttons */}
          <div className="hero-btns reveal visible d3" style={{ flexWrap: 'wrap' }}>
            <a href="#projects" className="btn-hud btn-hud-primary">
              <i className="fas fa-code" />
              Explore Projects
            </a>
            <a href={personalData.discord} target="_blank" rel="noopener noreferrer" className="btn-hud btn-hud-secondary" style={{ borderColor: '#5865F2', color: '#fff', background: 'rgba(88, 101, 242, 0.15)' }} onMouseEnter={e => e.currentTarget.style.boxShadow = '0 0 20px rgba(88, 101, 242, 0.5)'} onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}>
              <i className="fab fa-discord" />
              Join Discord
            </a>
            <a href={personalData.resumePath} download={personalData.resumeFileName} className="btn-hud btn-hud-ghost" style={{ borderColor: 'rgba(255,255,255,0.2)', color: 'var(--cyan)' }} onMouseEnter={e => e.currentTarget.style.boxShadow = 'var(--glow-cyan)'} onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}>
              <i className="fas fa-file-download" />
              CV
            </a>
            <a href="#contact" className="btn-hud btn-hud-ghost" onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--cyan)'; e.currentTarget.style.boxShadow = 'var(--glow-cyan)'; }} onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.boxShadow = 'none'; }}>
              <i className="fas fa-paper-plane" />
              Contact
            </a>
          </div>

          {/* Socials */}
          <div className="hero-socials reveal visible d4">
            <a href={personalData.discord} target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="Discord Server" style={{ borderColor: 'rgba(88, 101, 242, 0.4)' }}>
              <i className="fab fa-discord" style={{ color: '#5865F2' }} />
            </a>
            <a href={personalData.github} target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="GitHub">
              <i className="fab fa-github" />
            </a>
            <a href={personalData.zyo} target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="Zyo Bio" title="Zyo Bio — zyo.lol/roninvolt">
              <i className="fas fa-link" style={{ color: 'var(--cyan)' }} />
            </a>
            <a href={`mailto:${personalData.email}`} className="social-btn" aria-label="Email">
              <i className="fas fa-envelope" />
            </a>
          </div>
        </div>

        {/* RIGHT: 3D Sphere */}
        <div className="hero-visual">
          <div className="sphere-outer">
            {/* HUD Rings */}
            <div className="hud-ring hud-ring-1" style={{ borderColor: 'rgba(255, 255, 255, 0.15)' }} />
            <div className="hud-ring hud-ring-2" style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />
            <div className="hud-ring hud-ring-3" style={{ borderColor: 'rgba(255, 255, 255, 0.05)' }} />

            {/* Targeting corners */}
            <div className="sphere-target st-tl" style={{ borderColor: 'var(--cyan)' }} />
            <div className="sphere-target st-tr" style={{ borderColor: 'var(--cyan)' }} />
            <div className="sphere-target st-bl" style={{ borderColor: 'var(--cyan)' }} />
            <div className="sphere-target st-br" style={{ borderColor: 'var(--cyan)' }} />

            <div className="sphere-canvas">
              <Suspense fallback={null}>
                <HeroSphere mousePos={mousePos} />
              </Suspense>
            </div>

            {/* Orbit badges */}
            <div className="orbit-badges" aria-hidden="true">
              {heroData.badges.map((b, i) => (
                <div key={b} className="orbit-badge" style={{ animationDelay: `${i * 0.45}s`, borderColor: 'rgba(255, 255, 255, 0.12)', color: 'var(--cyan)', background: 'rgba(10, 10, 12, 0.9)', boxShadow: '0 0 12px rgba(255, 255, 255, 0.08)' }}>{b}</div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes roleScroll {
          0%,18%  { transform: translateY(0); }
          25%,43% { transform: translateY(-2.2rem); }
          50%,68% { transform: translateY(-4.4rem); }
          75%,93% { transform: translateY(-6.6rem); }
          100%    { transform: translateY(-8.8rem); }
        }
      `}</style>
    </section>
  );
};

export default Hero;
