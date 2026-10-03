import React, { useState, useEffect } from 'react';

const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const currentProgress = window.scrollY / totalScroll;
        setProgress(Math.min(1, Math.max(0, currentProgress)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className="scroll-progress-container"
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '2px',
        zIndex: 9999,
        pointerEvents: 'none',
        background: 'rgba(255, 255, 255, 0.03)',
      }}
    >
      <div
        className="scroll-progress-bar"
        style={{
          height: '100%',
          width: '100%',
          transformOrigin: 'left',
          transform: `scaleX(${progress})`,
          background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.4) 0%, #ffffff 50%, #d4d4d8 100%)',
          boxShadow: '0 0 10px rgba(255, 255, 255, 0.6), 0 0 20px rgba(255, 255, 255, 0.25)',
          transition: 'transform 0.08s ease-out',
        }}
      />
    </div>
  );
};

export default ScrollProgress;
