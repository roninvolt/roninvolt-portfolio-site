import React, { useState, useEffect } from 'react';

const BackToTop = () => {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;

      setVisible(scrollY > 350);

      if (totalScroll > 0) {
        setProgress(Math.min(100, Math.round((scrollY / totalScroll) * 100)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const circumference = 2 * Math.PI * 18;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll back to top"
      className={`back-to-top-btn ${visible ? 'is-visible' : ''}`}
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 900,
        width: '46px',
        height: '46px',
        borderRadius: '50%',
        background: 'rgba(10, 10, 14, 0.8)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        padding: 0,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0) scale(1)' : 'translateY(16px) scale(0.85)',
        pointerEvents: visible ? 'auto' : 'none',
        transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5), 0 0 15px rgba(0, 245, 255, 0.1)',
      }}
    >
      {/* Circular Progress Ring */}
      <svg
        width="46"
        height="46"
        viewBox="0 0 46 46"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          transform: 'rotate(-90deg)',
          pointerEvents: 'none',
        }}
      >
        <circle
          cx="23"
          cy="23"
          r="18"
          fill="none"
          stroke="rgba(255, 255, 255, 0.08)"
          strokeWidth="2"
        />
        <circle
          cx="23"
          cy="23"
          r="18"
          fill="none"
          stroke="var(--cyan, #00f0ff)"
          strokeWidth="2"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          style={{
            transition: 'stroke-dashoffset 0.1s linear',
            filter: 'drop-shadow(0 0 4px #00f0ff)',
          }}
        />
      </svg>

      {/* Center Arrow Icon */}
      <i
        className="fas fa-arrow-up"
        style={{
          fontSize: '0.85rem',
          color: '#ffffff',
          transition: 'transform 0.25s ease, color 0.25s ease',
        }}
      />
    </button>
  );
};

export default BackToTop;
