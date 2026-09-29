import React, { useRef, useEffect, Suspense } from 'react';
import HeroSphere from './HeroSphere';
import SectionBg from './SectionBg';
import HeroName from './HeroName';
import MatrixText from './MatrixText';
import { personalData, heroData } from '../data/portfolioData';

const Hero = () => {
  const mousePos = useRef({ x: 0, y: 0 });
  const [activeSkill, setActiveSkill] = React.useState(heroData.badges[0]);
  const [autoCycle, setAutoCycle] = React.useState(true);

  useEffect(() => {
    const onMove = (e) => {
      mousePos.current = { x: e.clientX - window.innerWidth / 2, y: e.clientY - window.innerHeight / 2 };
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  // Subtle auto-cycle through leveling skills unless user interacted
  useEffect(() => {
    if (!autoCycle) return;
    const interval = setInterval(() => {
      setActiveSkill((curr) => {
        const nextIdx = (heroData.badges.findIndex((b) => b.id === curr.id) + 1) % heroData.badges.length;
        return heroData.badges[nextIdx];
      });
    }, 4500);
    return () => clearInterval(interval);
  }, [autoCycle]);

  return (
    <section id="home" className="hero-section">
      <SectionBg variant="hero" />
      {/* Big background text */}
      <div className="hero-bg-text" aria-hidden="true" style={{ opacity: 0.04, WebkitTextStroke: '1px var(--cyan)', filter: 'blur(1px)' }}>PORTFOLIO</div>

      <div className="hero-grid">
        {/* LEFT TEXT */}
        <div className="hero-content-col" style={{ position: 'relative', zIndex: 1, minWidth: 0, width: '100%', maxWidth: '100%' }}>
          {/* Status */}
          <div className="hero-status reveal visible" style={{ borderColor: 'rgba(0, 240, 255, 0.2)', background: 'rgba(0, 240, 255, 0.04)', color: 'var(--cyan)' }}>
            <MatrixText text={personalData.status} glitchColor="var(--green)" autoGlitch={true} glitchInterval={10000} />
          </div>

          {/* Name - Ultra Aesthetic Holographic & Decoder System */}
          <HeroName />

          {/* Roles */}
          <div className="hero-role-wrap reveal visible d2" style={{ borderLeftColor: 'var(--cyan)' }}>
            <div className="hero-role-label" style={{ color: 'var(--gold)' }}>
              <MatrixText text={heroData.objective} glitchColor="var(--gold)" />
            </div>
            <div className="hero-roles-container">
              <div style={{ animation: 'roleScroll 12s ease-in-out infinite' }}>
                {[...heroData.roles, heroData.roles[0]].map((r, i) => (
                  <div key={i} className="hero-role">{r}</div>
                ))}
              </div>
            </div>
          </div>

          <p className="hero-desc reveal visible d3" style={{ color: 'rgba(255, 255, 255, 0.75)' }}>
            Engineering intelligent <span className="bio-hl">AI models</span>, <span className="bio-hl">autonomous agents</span>, and deep learning pipelines. 3rd year B.E. AIML student at <span className="bio-hl">KGISL Institute of Technology (KiTE)</span>, Coimbatore, and Founder of <span className="bio-hl">Voxen Development</span>.
          </p>

          {/* Buttons */}
          <div className="hero-btns reveal visible d3" style={{ flexWrap: 'wrap' }}>
            <a href="#projects" className="btn-hud btn-hud-primary">
              <i className="fas fa-code" />
              Explore Projects
            </a>
            <a href={personalData.discord} target="_blank" rel="noopener noreferrer" className="btn-hud btn-hud-secondary" style={{ borderColor: 'rgba(139, 92, 246, 0.5)', color: '#fff', background: 'rgba(139, 92, 246, 0.18)' }}>
              <i className="fab fa-discord" />
              Join Discord
            </a>
            <a href={personalData.resumePath} download={personalData.resumeFileName} className="btn-hud btn-hud-ghost">
              <i className="fas fa-file-download" />
              Download CV
            </a>
            <a href="#contact" className="btn-hud btn-hud-ghost">
              <i className="fas fa-paper-plane" />
              Contact
            </a>
          </div>

          {/* Socials */}
          <div className="hero-socials reveal visible d4">
            <a href={personalData.discord} target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="Discord Server" style={{ borderColor: 'rgba(139, 92, 246, 0.4)' }}>
              <i className="fab fa-discord" style={{ color: 'var(--purple)' }} />
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

        {/* RIGHT: 3D Sphere & Orbital Leveling Matrix */}
        <div className="hero-visual">
          <div className="sphere-outer">
            {/* Concentric HUD Rings */}
            <div className="hud-ring hud-ring-1" />
            <div className="hud-ring hud-ring-2" />
            <div className="hud-ring hud-ring-3" />

            {/* Glowing Equatorial Horizon Line as seen in HUD image */}
            <div className="hud-equator" aria-hidden="true">
              <span className="hud-equator-node hen-left" />
              <span className="hud-equator-line" />
              <span className="hud-equator-node hen-right" />
            </div>

            {/* Corner Targeting Brackets [ ] */}
            <div className="sphere-target st-tl" />
            <div className="sphere-target st-tr" />
            <div className="sphere-target st-bl" />
            <div className="sphere-target st-br" />

            {/* 3D Wireframe Particle Globe */}
            <div className="sphere-canvas">
              <Suspense fallback={null}>
                <HeroSphere mousePos={mousePos} />
              </Suspense>
            </div>

            {/* 8 Radial Orbital Tech Badges (Clockwise from 12:00) */}
            <div className="orbit-badges" role="region" aria-label="Orbital Tech Leveling Matrix">
              {heroData.badges.map((b) => {
                const isActive = activeSkill.id === b.id;
                return (
                  <button
                    key={b.id}
                    type="button"
                    className={`orbit-badge orbit-pos-${b.position} ${isActive ? 'active' : ''}`}
                    onClick={() => {
                      setActiveSkill(b);
                      setAutoCycle(false);
                    }}
                    onMouseEnter={() => {
                      setActiveSkill(b);
                      setAutoCycle(false);
                    }}
                    aria-label={`${b.name} Level ${b.level} ${b.rank}`}
                  >
                    <div className="orbit-badge-inner">
                      <span className="badge-name">{b.name}</span>
                      <span className="badge-lvl" style={{ color: b.color }}>
                        LV.{b.level}
                      </span>
                    </div>
                    {/* Glowing XP Progress Pip Track */}
                    <div className="badge-xp-track" aria-hidden="true">
                      <div
                        className="badge-xp-bar"
                        style={{
                          width: `${b.xp}%`,
                          background: `linear-gradient(90deg, ${b.color}, var(--purple))`,
                        }}
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Interactive Leveling Telemetry Console */}
          <div className="leveling-telemetry-panel reveal visible" role="region" aria-label="Skill Leveling Telemetry">
            <div className="telemetry-header">
              <div className="telemetry-title">
                <span className="telemetry-pulse-dot" style={{ background: activeSkill.color, boxShadow: `0 0 10px ${activeSkill.color}` }} />
                <span className="telemetry-label">PROTOCOL // {activeSkill.name}</span>
                <span className="telemetry-rank" style={{ color: activeSkill.color }}>[{activeSkill.rank}]</span>
              </div>
              <div className="telemetry-lvl-display">
                <span className="telemetry-lvl-text">LVL.</span>
                <span className="telemetry-lvl-val" style={{ color: 'var(--gold)' }}>{activeSkill.level}</span>
                <span className="telemetry-lvl-max">/ 99</span>
              </div>
            </div>

            {/* XP Gauge */}
            <div className="telemetry-xp-wrap">
              <div className="telemetry-xp-info">
                <span>EXP: {activeSkill.xpCurrent} / {activeSkill.xpMax}</span>
                <span style={{ color: 'var(--cyan)' }}>{activeSkill.xp}% MASTERY</span>
              </div>
              <div className="telemetry-xp-bar-bg">
                <div
                  className="telemetry-xp-bar-fill"
                  style={{
                    width: `${activeSkill.xp}%`,
                    background: `linear-gradient(90deg, ${activeSkill.color}, var(--purple), var(--cyan))`
                  }}
                />
              </div>
            </div>

            {/* Telemetry Details */}
            <div className="telemetry-details">
              <div className="telemetry-row">
                <span className="telemetry-row-label">SPECIALTY:</span>
                <span className="telemetry-row-val">{activeSkill.specialty}</span>
              </div>
              <div className="telemetry-row">
                <span className="telemetry-row-label">METRICS:</span>
                <span className="telemetry-row-val" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>{activeSkill.stats}</span>
              </div>
            </div>

            {/* Quick-Switch Chip Dock (Touch & Mobile Friendly) */}
            <div className="telemetry-chips-dock" role="tablist" aria-label="Select Protocol Level">
              {heroData.badges.map((b) => (
                <button
                  key={b.id}
                  role="tab"
                  aria-selected={activeSkill.id === b.id}
                  className={`telemetry-chip ${activeSkill.id === b.id ? 'active' : ''}`}
                  onClick={() => {
                    setActiveSkill(b);
                    setAutoCycle(false);
                  }}
                  title={`${b.name} - Level ${b.level}`}
                >
                  <span className="chip-name">{b.name.split(' ')[0]}</span>
                  <span className="chip-lvl" style={{ color: b.color }}>{b.level}</span>
                </button>
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
