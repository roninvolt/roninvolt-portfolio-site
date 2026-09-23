import React from 'react';
import SectionBg from './SectionBg';
import { personalData, aboutData } from '../data/portfolioData';

const About = () => (
  <section id="about">
    <SectionBg variant="about" />
    <div className="section">
      <div className="reveal">
        <div className="section-tag" style={{ color: 'var(--cyan)' }}>{aboutData.sectionTag}</div>
        <h2 className="section-title">ABOUT <span>ME</span></h2>
        <div className="section-id" style={{ color: 'rgba(255, 255, 255, 0.4)' }}>{aboutData.sectionId}</div>
      </div>

      <div className="about-grid">
        <div className="reveal d1">
          <div className="about-bio" style={{ color: 'rgba(255, 255, 255, 0.75)', fontFamily: 'var(--font-body)' }}>
            <p>
              I'm <span className="bio-hl" style={{ color: 'var(--cyan)' }}>{personalData.fullName}</span> — an <span className="bio-hl" style={{ color: 'var(--cyan)' }}>AI Engineer</span> and the Founder of <span className="bio-hl" style={{ color: 'var(--cyan)' }}>Voxen Development</span>, operating out of Coimbatore, India.
            </p>
            <p>
              Currently in my <span className="bio-hl" style={{ color: 'var(--cyan)' }}>3rd year B.E. AIML</span> (Artificial Intelligence &amp; Machine Learning) at <span className="bio-hl" style={{ color: 'var(--cyan)' }}>KGISL Institute of Technology (KiTE)</span>, Coimbatore. I lead Voxen Development, architecting next-generation Discord assistants like Xalven and intelligent automation tools.
            </p>
            <p>
              My core technical stack centers around <span className="bio-hl" style={{ color: 'var(--cyan)' }}>Python, PyTorch, Deep Learning</span>, LLM pipelines, FastAPI, and TypeScript for robust end-to-end intelligence systems.
            </p>
          </div>
        </div>

        <div className="reveal d2">
          <div className="stats-grid">
            {aboutData.stats.map(({ num, lbl }) => (
              <div key={lbl} className="stat-block" style={{ background: 'rgba(10, 10, 12, 0.9)', borderColor: 'rgba(255, 255, 255, 0.08)' }}>
                <span className="stat-num" style={{ color: 'var(--cyan)', textShadow: 'var(--glow-cyan)' }}>{num}</span>
                <span className="stat-lbl" style={{ fontSize: '0.62rem', letterSpacing: '1px' }}>{lbl}</span>
              </div>
            ))}
          </div>

          <div className="quick-facts" style={{ background: 'rgba(10, 10, 12, 0.9)', borderColor: 'rgba(255, 255, 255, 0.08)' }}>
            {aboutData.quickFacts.map(({ icon, key, val }) => (
              <div key={key} className="fact-row" style={{ borderBottomColor: 'rgba(255, 255, 255, 0.05)' }}>
                <div className="fact-icon" style={{ color: 'var(--cyan)', borderColor: 'rgba(255, 255, 255, 0.15)', background: 'rgba(255, 255, 255, 0.03)' }}><i className={`fas ${icon}`} /></div>
                <div>
                  <div className="fact-key" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>{key}</div>
                  <div className="fact-val" style={{ color: '#fff' }}>
                    {val.includes('zyo.lol') ? (
                      <a href={`https://${val}`} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--cyan)', textDecoration: 'none', borderBottom: '1px dashed rgba(255,255,255,0.3)' }}>
                        {val} <i className="fas fa-external-link-alt" style={{ fontSize: '0.65rem', marginLeft: '4px' }} />
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
