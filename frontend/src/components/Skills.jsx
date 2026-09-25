import React from 'react';
import SectionBg from './SectionBg';
import MatrixText from './MatrixText';
import { skillsData } from '../data/portfolioData';

const Skills = () => (
  <section id="skills">
    <SectionBg variant="skills" />
    <div className="section">
      <div className="reveal">
        <div className="section-tag">
          <MatrixText text="04 // CORE ENGINE" glitchColor="#00ff66" />
        </div>
        <h2 className="section-title">
          MY <span><MatrixText text="SKILLS" glitchColor="#00f0ff" /></span>
        </h2>
        <div className="section-id">
          <MatrixText text={`SKILLS_LOADED — ${skillsData.length} MODULES ACTIVE`} glitchColor="#00f0ff" />
        </div>
      </div>
      <div className="skills-grid">
        {skillsData.map((m, i) => {
          const accentColor = i % 3 === 0 ? 'var(--cyan)' : i % 3 === 1 ? 'var(--purple)' : 'var(--green)';
          return (
            <div
              key={m.id}
              className="skill-mod reveal"
              style={{
                transitionDelay: `${i * 0.07}s`,
                background: 'linear-gradient(180deg, rgba(16, 22, 44, 0.85) 0%, rgba(10, 14, 28, 0.95) 100%)',
                borderColor: 'rgba(0, 240, 255, 0.14)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = accentColor;
                e.currentTarget.style.boxShadow = `0 10px 35px rgba(0, 240, 255, 0.2), 0 0 15px rgba(139, 92, 246, 0.15)`;
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(0, 240, 255, 0.14)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.transform = 'none';
              }}
            >
              {/* Top cyber indicator gradient line */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 2,
                  background: `linear-gradient(90deg, ${accentColor}, transparent)`,
                }}
              />

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
                <span style={{ fontSize: '0.6rem', fontWeight: 800, color: accentColor, letterSpacing: '1.2px', textTransform: 'uppercase' }}>
                  {m.category}
                </span>
                <span>
                  <i className={m.iconClass} style={{ color: accentColor, fontSize: '0.9rem' }} />
                </span>
              </div>

              <div className="skill-mod-hdr">
                <h3 style={{ fontSize: '0.95rem', fontFamily: 'var(--font-hud)', color: '#ffffff' }}>
                  <MatrixText text={m.label} glitchColor={accentColor} triggerOnHover={true} />
                </h3>
              </div>
              <p className="skill-mod-desc" style={{ color: 'rgba(255, 255, 255, 0.55)', fontFamily: 'var(--font-mono)', fontSize: '0.72rem' }}>
                {m.desc}
              </p>
              <div className="skill-sep" style={{ backgroundColor: 'rgba(255, 255, 255, 0.08)' }} />
              <div className="skill-chips">
                {m.skills.map((s) => (
                  <div
                    key={s.n}
                    className="skill-chip"
                    data-name={s.n}
                    role="img"
                    aria-label={s.n}
                    style={{
                      borderColor: 'rgba(0, 240, 255, 0.14)',
                      color: 'rgba(255, 255, 255, 0.65)',
                      borderRadius: '4px',
                      background: 'rgba(255, 255, 255, 0.02)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = 'var(--cyan)';
                      e.currentTarget.style.borderColor = 'var(--cyan)';
                      e.currentTarget.style.boxShadow = `0 0 12px rgba(0, 240, 255, 0.3)`;
                      e.currentTarget.style.backgroundColor = `rgba(0, 240, 255, 0.08)`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'rgba(255, 255, 255, 0.65)';
                      e.currentTarget.style.borderColor = 'rgba(0, 240, 255, 0.14)';
                      e.currentTarget.style.boxShadow = 'none';
                      e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.02)';
                    }}
                  >
                    <i className={s.i} />
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);

export default Skills;
