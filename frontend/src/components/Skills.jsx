import React from 'react';
import SectionBg from './SectionBg';
import { skillsData } from '../data/portfolioData';

const Skills = () => (
  <section id="skills">
    <SectionBg variant="skills" />
    <div className="section">
      <div className="reveal">
        <div className="section-tag" style={{ color: 'var(--cyan)' }}>04 // CORE ENGINE</div>
        <h2 className="section-title">MY <span>SKILLS</span></h2>
        <div className="section-id" style={{ color: 'rgba(255, 255, 255, 0.4)' }}>SKILLS_LOADED — {skillsData.length} MODULES ACTIVE</div>
      </div>
      <div className="skills-grid">
        {skillsData.map((m, i) => (
          <div
            key={m.id}
            className={`skill-mod reveal`}
            style={{
              transitionDelay: `${i * 0.07}s`,
              background: 'rgba(10, 10, 12, 0.9)',
              borderColor: 'rgba(255, 255, 255, 0.08)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#ffffff';
              e.currentTarget.style.boxShadow = `0 10px 40px rgba(255, 255, 255, 0.08)`;
              e.currentTarget.style.transform = 'translateY(-3px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.transform = 'none';
            }}
          >
            {/* Top color indicator line */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: '#ffffff' }} />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.55rem', fontWeight: 900, color: 'rgba(255, 255, 255, 0.5)', letterSpacing: '1px' }}>{m.category}</span>
              <span><i className={m.iconClass} style={{ color: 'var(--cyan)' }} /></span>
            </div>

            <div className="skill-mod-hdr">
              <h3 style={{ fontSize: '0.9rem', fontFamily: 'var(--font-hud)' }}>{m.label}</h3>
            </div>
            <p className="skill-mod-desc" style={{ color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-mono)' }}>{m.desc}</p>
            <div className="skill-sep" style={{ backgroundColor: 'rgba(255, 255, 255, 0.06)' }} />
            <div className="skill-chips">
              {m.skills.map(s => (
                <div
                  key={s.n}
                  className="skill-chip"
                  data-name={s.n}
                  role="img"
                  aria-label={s.n}
                  style={{
                    borderColor: 'rgba(255, 255, 255, 0.08)',
                    color: 'rgba(255, 255, 255, 0.45)',
                    borderRadius: '4px'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#ffffff';
                    e.currentTarget.style.borderColor = '#ffffff';
                    e.currentTarget.style.boxShadow = `0 0 12px rgba(255, 255, 255, 0.25)`;
                    e.currentTarget.style.backgroundColor = `rgba(255, 255, 255, 0.04)`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'rgba(255, 255, 255, 0.45)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <i className={s.i} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Skills;
