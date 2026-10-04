import React from 'react';
import SectionBg from './SectionBg';
import MatrixText from './MatrixText';
import { personalData, aboutData } from '../data/portfolioData';

const About = () => (
  <section id="about">
    <SectionBg variant="about" />
    <div className="section">
      <div className="reveal">
        <div className="section-tag">
          <MatrixText text={aboutData.sectionTag} glitchColor="#00ff66" />
        </div>
        <h2 className="section-title">
          ABOUT <span><MatrixText text="ME" glitchColor="#00f0ff" /></span>
        </h2>
        <div className="section-id">
          <MatrixText text={aboutData.sectionId} glitchColor="#00f0ff" />
        </div>
      </div>

      <div className="about-grid">
        <div className="reveal d1">
          <div className="about-bio" style={{ color: 'rgba(255, 255, 255, 0.75)', fontFamily: 'var(--font-body)' }}>
            <p>
              I'm <span className="bio-hl">{personalData.fullName}</span> — an <span className="bio-hl">AI/ML Engineer</span>, <span className="bio-hl">TEDx Speaker</span>, and the Founder &amp; Developer of <span className="bio-hl">Voxen Development</span>, operating out of Coimbatore, Tamil Nadu, India.
            </p>
            <p>
              Currently in my <span className="bio-hl">3rd year B.E. Computer Science &amp; Engineering (AIML)</span> at <span className="bio-hl">KGISL Institute of Technology (KiTE)</span>, Coimbatore. I have hands-on experience building AI-powered applications, full-stack web products, automation systems, and production Discord infrastructure.
            </p>
            <p>
              Delivered a <span className="bio-hl">TEDx talk at TEDxKGCAS</span> exploring lessons learned through gaming communities. Passionate about <span className="bio-hl">Generative AI, AI Agents, Machine Learning</span>, and building scalable tech products.
            </p>
          </div>

          {/* TEDx Speaker Spotlight Badge */}
          <a
            href={aboutData.tedx?.url || 'https://youtu.be/DzGllFMvwy8'}
            target="_blank"
            rel="noopener noreferrer"
            className="tedx-spotlight-card"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1.2rem',
              marginTop: '1.5rem',
              padding: '1rem 1.25rem',
              background: 'linear-gradient(135deg, rgba(230, 43, 30, 0.12), rgba(10, 10, 14, 0.95))',
              border: '1px solid rgba(230, 43, 30, 0.35)',
              borderRadius: '8px',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#e62b1e';
              e.currentTarget.style.boxShadow = '0 0 25px rgba(230, 43, 30, 0.35)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(230, 43, 30, 0.35)';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.transform = 'none';
            }}
          >
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '8px',
              background: '#e62b1e',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 900,
              fontSize: '0.95rem',
              letterSpacing: '-0.5px',
              flexShrink: 0,
              boxShadow: '0 0 15px rgba(230, 43, 30, 0.4)'
            }}>
              TED<span style={{ fontSize: '0.65rem', verticalAlign: 'super' }}>x</span>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <span style={{ color: '#fff', fontFamily: 'var(--font-hud)', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '1px' }}>
                  TEDx SPEAKER @ TEDxKGCAS
                </span>
                <span style={{ fontSize: '0.6rem', padding: '1px 6px', background: 'rgba(230, 43, 30, 0.25)', color: '#ff6b6b', borderRadius: '4px', fontFamily: 'var(--font-mono)', border: '1px solid rgba(230, 43, 30, 0.4)' }}>
                  PUBLIC TALK
                </span>
              </div>
              <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem', marginTop: '2px', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                "{aboutData.tedx?.title || 'Life Lessons I Learnt From My Gaming Community'}"
              </div>
            </div>
            <div style={{ color: '#ff6b6b', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '5px', flexShrink: 0, fontFamily: 'var(--font-mono)' }}>
              <span>WATCH TALK</span>
              <i className="fas fa-external-link-alt" style={{ fontSize: '0.65rem' }} />
            </div>
          </a>
        </div>

        <div className="reveal d2">
          <div className="stats-grid">
            {aboutData.stats.map(({ num, lbl }, idx) => (
              <div key={lbl} className="stat-block">
                <span className="stat-num">
                  <MatrixText text={num} glitchColor={num === 'TEDx' ? '#ff2a6d' : '#00ff66'} autoGlitch={true} glitchInterval={6500 + idx * 1500} />
                </span>
                <span className="stat-lbl">{lbl}</span>
              </div>
            ))}
          </div>

          <div className="quick-facts" style={{ background: 'rgba(10, 10, 12, 0.9)', borderColor: 'rgba(255, 255, 255, 0.08)', borderRadius: '8px' }}>
            {aboutData.quickFacts.map(({ icon, key, val }) => (
              <div key={key} className="fact-row" style={{ borderBottomColor: 'rgba(255, 255, 255, 0.05)' }}>
                <div className="fact-icon" style={{ color: 'var(--cyan)', borderColor: 'rgba(255, 255, 255, 0.15)', background: 'rgba(255, 255, 255, 0.03)' }}><i className={`fas ${icon}`} /></div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="fact-key" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>{key}</div>
                  <div className="fact-val" style={{ color: '#fff' }}>
                    {val.includes('zyo.lol') ? (
                      <a href={`https://${val}`} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--cyan)', textDecoration: 'none', borderBottom: '1px dashed rgba(255,255,255,0.3)' }}>
                        {val} <i className="fas fa-external-link-alt" style={{ fontSize: '0.65rem', marginLeft: '4px' }} />
                      </a>
                    ) : key.includes('TEDx') ? (
                      <a href={personalData.tedxTalk || 'https://youtu.be/DzGllFMvwy8'} target="_blank" rel="noopener noreferrer" style={{ color: '#ff6b6b', textDecoration: 'none', borderBottom: '1px dashed rgba(255,107,107,0.4)' }}>
                        {val} <i className="fas fa-external-link-alt" style={{ fontSize: '0.65rem', marginLeft: '4px' }} />
                      </a>
                    ) : key.includes('EMAIL') ? (
                      <a href={`mailto:${val}`} style={{ color: 'var(--cyan)', textDecoration: 'none' }}>
                        {val}
                      </a>
                    ) : val}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default About;
