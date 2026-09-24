import React from 'react';
import SectionBg from './SectionBg';
import MatrixText from './MatrixText';
import { educationData } from '../data/portfolioData';

const Education = () => (
  <section id="education">
    <SectionBg variant="education" />
    <div className="section">
      <div className="reveal">
        <div className="section-tag">
          <MatrixText text={educationData.sectionTag} glitchColor="#00ff66" />
        </div>
        <h2 className="section-title">
          EDUCA<span><MatrixText text="TION" glitchColor="#00f0ff" /></span>
        </h2>
        <div className="section-id">
          <MatrixText text={educationData.sectionId} glitchColor="#00f0ff" />
        </div>
      </div>

      <div className="ang-card clip edu-card reveal d1" style={{ background: 'rgba(10, 10, 12, 0.9)', borderColor: 'rgba(255, 255, 255, 0.08)' }}>
        <div className="br-tr" style={{ borderColor: 'var(--cyan)' }} />
        <div className="br-bl" style={{ borderColor: 'var(--cyan)' }} />
        <div className="edu-logo" style={{ borderColor: 'rgba(255, 255, 255, 0.2)', background: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '6px', borderRadius: '8px', overflow: 'hidden' }}>
          <img
            src="/kgisl_kite_logo.jpg"
            alt="KGISL Institute of Technology (KiTE)"
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          />
        </div>
        <div>
          <div className="edu-degree" style={{ fontFamily: 'var(--font-hud)', fontSize: '1rem', fontWeight: 700 }}>
            <MatrixText text={educationData.degree} glitchColor="#00f0ff" />
          </div>
          <div className="edu-school" style={{ color: 'var(--cyan)', fontFamily: 'var(--font-body)', fontSize: '0.85rem' }}>{educationData.institution}</div>
          <span className="edu-pill" style={{ color: 'var(--cyan)', borderColor: 'rgba(255, 255, 255, 0.25)', background: 'rgba(255, 255, 255, 0.03)' }}>
            <i className="fas fa-graduation-cap" style={{ marginRight: 5 }} /> {educationData.period}
          </span>
        </div>
      </div>

      <div className="ang-card courses-panel reveal d2" style={{ marginTop: '2px', background: 'rgba(10, 10, 12, 0.9)', borderColor: 'rgba(255, 255, 255, 0.08)' }}>
        <div className="courses-label" style={{ color: 'var(--cyan)' }}>// CORE ACADEMIC COURSES</div>
        <div className="courses-wrap">
          {educationData.courses.map(c => (
            <span key={c} className="course-tag" style={{ borderColor: 'rgba(255, 255, 255, 0.08)', color: 'rgba(255, 255, 255, 0.7)' }}>{c}</span>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default Education;
