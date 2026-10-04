import React, { useEffect, useState } from 'react';
import { personalData } from '../data/portfolioData';

const BOOT_TEXT = '> VOLTING CORE PROTOCOLS... LARPING DIGITAL ARCHETYPES... HACKING MAINFRAME... SYSTEMS ONLINE...';

const LOADING_STEPS = ['VOLTING', 'LARPING', 'HACKING'];

const IntroScreen = ({ onComplete }) => {
  const [phase, setPhase] = useState('v'); // 'v' | 'name' | 'done'
  const [opacity, setOpacity] = useState(1);
  const [stepIndex, setStepIndex] = useState(0);
  const [dots, setDots] = useState('');

  // Trailing telemetry dots (. -> .. -> ...)
  useEffect(() => {
    if (phase !== 'v') return;
    const dotInterval = setInterval(() => {
      setDots(prev => (prev.length >= 3 ? '' : prev + '.'));
    }, 180);
    return () => clearInterval(dotInterval);
  }, [phase]);

  // Sequentially change in order: VOLTING -> LARPING -> HACKING
  useEffect(() => {
    const s1 = setTimeout(() => setStepIndex(1), 650);
    const s2 = setTimeout(() => setStepIndex(2), 1300);
    const t1 = setTimeout(() => setPhase('name'), 1950);
    const t2 = setTimeout(() => { setOpacity(0); }, 3350);
    const t3 = setTimeout(() => { onComplete(); }, 3750);
    return () => {
      clearTimeout(s1);
      clearTimeout(s2);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  return (
    <div
      className="intro-screen"
      onClick={() => {
        setOpacity(0);
        setTimeout(onComplete, 200);
      }}
      style={{
        opacity,
        cursor: 'pointer',
        transition: 'opacity 0.4s ease',
        pointerEvents: opacity < 0.1 ? 'none' : 'all',
        background: '#000000'
      }}
    >
      <div className="intro-scanlines" style={{ background: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.015) 3px, rgba(255,255,255,0.015) 6px)' }} />
      <div className="intro-line" style={{ background: 'linear-gradient(90deg, transparent, var(--cyan), transparent)', boxShadow: '0 0 20px rgba(255,255,255,0.2)' }} />

      {phase === 'v' ? (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '15px',
            animation: 'introVIn 0.5s ease forwards'
          }}
        >
          {/* Logo Terminal Icon */}
          <div style={{ position: 'relative', width: '90px', height: '90px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid rgba(255, 255, 255, 0.5)', borderRadius: '16px', background: '#000000', filter: 'drop-shadow(0 0 20px rgba(255, 255, 255, 0.4))', animation: 'hatGlitch 0.15s infinite alternate', overflow: 'hidden' }}>
            <img src="/voxen_logo.jpg" alt="Voxen Development" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>

          {/* Dynamic Changing Loading Text: VOLTING -> LARPING -> HACKING */}
          <div
            key={stepIndex}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              animation: 'stageGlitchIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards'
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-hud)',
                fontSize: 'clamp(1.15rem, 2.5vw, 1.4rem)',
                fontWeight: 900,
                color: 'var(--cyan)',
                letterSpacing: '8px',
                textShadow: 'var(--glow-cyan)',
                textTransform: 'uppercase',
                marginTop: '0.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                whiteSpace: 'nowrap'
              }}
            >
              <span>{LOADING_STEPS[stepIndex]}</span>
              <span style={{ display: 'inline-block', width: '28px', textAlign: 'left', color: 'rgba(255,255,255,0.7)', letterSpacing: '2px' }}>
                {dots}
              </span>
            </div>

            {/* Sequence step telemetry indicator */}
            <div style={{ display: 'flex', gap: '6px', marginTop: '0.75rem', alignItems: 'center' }}>
              {LOADING_STEPS.map((step, idx) => (
                <div
                  key={step}
                  style={{
                    width: idx === stepIndex ? '28px' : '8px',
                    height: '3px',
                    borderRadius: '2px',
                    background: idx === stepIndex
                      ? '#ffffff'
                      : idx < stepIndex
                        ? 'rgba(255, 255, 255, 0.45)'
                        : 'rgba(255, 255, 255, 0.12)',
                    boxShadow: idx === stepIndex ? '0 0 10px rgba(255, 255, 255, 0.8)' : 'none',
                    transition: 'all 0.28s ease'
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div style={{ textAlign: 'center', zIndex: 3, position: 'relative' }}>
          {/* Subtle intro name aura */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '120%',
              height: '140%',
              background: 'radial-gradient(ellipse, rgba(0, 245, 255, 0.22) 0%, rgba(168, 85, 247, 0.12) 40%, transparent 70%)',
              filter: 'blur(35px)',
              pointerEvents: 'none',
              zIndex: -1,
            }}
          />
          <div
            style={{
              fontFamily: 'var(--font-hud)',
              fontSize: 'clamp(2.5rem, 6.5vw, 4.5rem)',
              fontWeight: 900,
              letterSpacing: '4px',
              textTransform: 'uppercase',
              animation: 'nameReveal 0.4s ease forwards',
              lineHeight: 1.1,
              filter: 'drop-shadow(0 0 25px rgba(255, 255, 255, 0.4)) drop-shadow(0 0 45px rgba(0, 245, 255, 0.3))',
            }}
          >
            <span className="name-text-holo">{personalData.name}</span>{' '}
            <span style={{ fontSize: '0.55em', color: 'var(--cyan)', fontFamily: 'var(--font-mono)', verticalAlign: 'middle' }}>
              [{personalData.alias.toUpperCase()}]
            </span>
          </div>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              color: '#ffffff',
              letterSpacing: '4px',
              marginTop: '1rem',
              opacity: 0,
              animation: 'fadeUpIn 0.4s ease 0.3s forwards',
              textTransform: 'uppercase',
            }}
          >
            {personalData.subtitle}
          </div>
        </div>
      )}

      {/* Boot text */}
      <div className="intro-boot-text" style={{ color: 'var(--cyan)' }}>{BOOT_TEXT}</div>

      {/* Progress bar */}
      <div className="intro-progress-bar" style={{ borderColor: 'rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.03)' }}>
        <div className="intro-progress-fill" style={{ background: 'linear-gradient(90deg, #888888, #ffffff)', boxShadow: '0 0 10px rgba(255,255,255,0.3)' }} />
      </div>

      {/* Corner brackets */}
      <div style={{ position: 'absolute', top: 20, left: 20, width: 40, height: 40, borderTop: '2px solid var(--cyan)', borderLeft: '2px solid var(--cyan)', zIndex: 5 }} />
      <div style={{ position: 'absolute', top: 20, right: 20, width: 40, height: 40, borderTop: '2px solid var(--cyan)', borderRight: '2px solid var(--cyan)', zIndex: 5 }} />
      <div style={{ position: 'absolute', bottom: 20, left: 20, width: 40, height: 40, borderBottom: '2px solid var(--cyan)', borderLeft: '2px solid var(--cyan)', zIndex: 5 }} />
      <div style={{ position: 'absolute', bottom: 20, right: 20, width: 40, height: 40, borderBottom: '2px solid var(--cyan)', borderRight: '2px solid var(--cyan)', zIndex: 5 }} />

      {/* HUD Coords */}
      <div style={{ position: 'absolute', top: 24, left: 70, fontFamily: 'Share Tech Mono, monospace', fontSize: '0.6rem', color: 'rgba(255,255,255,0.2)', letterSpacing: '2px', zIndex: 5 }}>
        SYS::RONINVOLT_OS // VARUN_LOADER
      </div>

      <style>{`
        @keyframes introVIn {
          0%  { opacity: 0; transform: scale(0.3); filter: blur(20px); }
          60% { opacity: 1; transform: scale(1.08); filter: blur(0); }
          100%{ opacity: 1; transform: scale(1);    filter: blur(0); }
        }
        @keyframes hatGlitch {
          0%  { transform: rotate(-2deg); }
          100%{ transform: rotate(2deg) skewX(1deg); }
        }
        @keyframes nameReveal {
          0%  { opacity: 0; transform: scaleX(0.6) translateY(20px); filter: blur(10px); }
          100%{ opacity: 1; transform: scaleX(1)   translateY(0);    filter: blur(0); }
        }
        @keyframes fadeUpIn {
          0%  { opacity: 0; transform: translateY(10px); }
          100%{ opacity: 1; transform: translateY(0); }
        }
        @keyframes stageGlitchIn {
          0%   { opacity: 0; transform: translateY(8px) scale(0.96); filter: blur(4px); }
          50%  { opacity: 0.85; filter: blur(0); }
          100% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
        }
      `}</style>
    </div>
  );
};

export default IntroScreen;
