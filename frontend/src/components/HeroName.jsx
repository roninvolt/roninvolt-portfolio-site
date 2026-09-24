import React, { useState, useEffect, useRef, useCallback } from 'react';
import MatrixText from './MatrixText';
import { personalData } from '../data/portfolioData';

// High-tech cyber decoder glyph set
const CYBER_GLYPHS = '01XY_#$<>[]{}+*&%^~!?/\\ABCDEF';

const HeroName = () => {
  const [displayText, setDisplayText] = useState(personalData.name);
  const [isScrambling, setIsScrambling] = useState(false);
  const [copied, setCopied] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [showBurst, setShowBurst] = useState(false);
  const containerRef = useRef(null);
  const intervalRef = useRef(null);

  // Trigger Scramble Decoder effect
  const triggerScramble = useCallback(() => {
    if (isScrambling) return;
    setIsScrambling(true);

    if (intervalRef.current) clearInterval(intervalRef.current);

    const target = personalData.name;
    const length = target.length;
    let iteration = 0;
    const maxIterations = length * 5;

    intervalRef.current = setInterval(() => {
      iteration++;

      setDisplayText(
        target
          .split('')
          .map((char, index) => {
            if (index < iteration / 5) {
              return char;
            }
            return CYBER_GLYPHS[Math.floor(Math.random() * CYBER_GLYPHS.length)];
          })
          .join('')
      );

      if (iteration >= maxIterations) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        setDisplayText(target);
        setIsScrambling(false);
      }
    }, 28);
  }, [isScrambling]);

  // Initial trigger after mount
  useEffect(() => {
    const timer = setTimeout(() => {
      triggerScramble();
    }, 350);

    return () => {
      clearTimeout(timer);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [triggerScramble]);

  // Mouse 3D Tilt Effect
  const handleMouseMove = (e) => {
    if (window.innerWidth <= 768) return;
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    // Max tilt range ~ 5 degrees for smooth subtle response
    const rotateY = (x / (rect.width / 2)) * 5;
    const rotateX = -(y / (rect.height / 2)) * 5;
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const handleClick = () => {
    setShowBurst(true);
    triggerScramble();
    setTimeout(() => setShowBurst(false), 600);
  };

  const handleCopyAlias = (e) => {
    e.stopPropagation();
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(personalData.alias);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      ref={containerRef}
      className="hero-name-container reveal visible"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      role="banner"
      aria-label={`${personalData.name} alias ${personalData.alias}`}
    >
      {/* Ambient Pulsing Atmospheric Aura */}
      <div className="hero-name-aura" aria-hidden="true" />

      {/* Ripple ring on click */}
      {showBurst && <div className="name-burst-ring" />}

      {/* Top HUD Tag */}
      <div className="name-hud-tag">
        <span className="name-hud-dot" />
        <MatrixText text="SYS_CORE // NEURAL_AI" glitchColor="#00ff66" />
        <span style={{ opacity: 0.35 }}>|</span>
        <span style={{ color: 'var(--cyan)' }}>ONLINE [2026]</span>
      </div>

      {/* 3D Tilt Wrapper */}
      <div
        className="name-tilt-wrap"
        style={{
          transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        }}
      >
        <h1 className="hero-name-display">
          {/* Main Name with Holographic Chrome and Decoder */}
          <span
            className="name-text-holo"
            onMouseEnter={triggerScramble}
            title="Hover or click to decode name"
          >
            {displayText.split('').map((ch, idx) => {
              const isDecoded = !isScrambling || ch === personalData.name[idx];
              return (
                <span
                  key={idx}
                  className={`name-char ${!isDecoded ? 'scrambled' : ''}`}
                >
                  {ch}
                </span>
              );
            })}
          </span>

          {/* Divider Slash */}
          <span className="name-divider-slash" aria-hidden="true">
            /
          </span>

          {/* Cyberpunk Glass Alias Badge */}
          <span
            className="name-alias-badge"
            onClick={handleCopyAlias}
            title="Click to copy online alias"
          >
            <span style={{ color: 'rgba(255, 255, 255, 0.45)', marginRight: '2px' }}>@</span>
            {personalData.alias}
            {copied ? (
              <span className="name-copied-tooltip">COPIED!</span>
            ) : (
              <i className="fas fa-copy" style={{ fontSize: '0.72rem', opacity: 0.45, marginLeft: '6px' }} />
            )}
          </span>
        </h1>
      </div>

      {/* Futuristic Scanbeam Light Bar */}
      <div className="name-scanbeam-bar" aria-hidden="true">
        <div className="name-scanbeam-glow" />
      </div>

      {/* Interactive Terminal Line */}
      <div className="name-terminal-meta">
        <i className="fas fa-terminal name-terminal-icon" />
        <MatrixText text="AI_ENGINEER // VOXEN_DEV" glitchColor="#00f0ff" />
        <span className="name-terminal-prompt">_</span>
      </div>
    </div>
  );
};

export default HeroName;
