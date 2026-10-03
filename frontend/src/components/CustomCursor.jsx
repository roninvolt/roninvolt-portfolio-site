import React, { useEffect, useRef, useState } from 'react';

const CustomCursor = () => {
  const outerRef = useRef(null);
  const dotRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const pos = useRef({ x: -100, y: -100 });
  const smooth = useRef({ x: -100, y: -100 });
  const raf = useRef(null);

  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || window.innerWidth <= 768;
    setIsTouch(isTouchDevice);
    if (isTouchDevice) return;

    const move = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };

    const loop = () => {
      smooth.current.x += (pos.current.x - smooth.current.x) * 0.18;
      smooth.current.y += (pos.current.y - smooth.current.y) * 0.18;
      if (dotRef.current) {
        dotRef.current.style.left = pos.current.x + 'px';
        dotRef.current.style.top  = pos.current.y + 'px';
      }
      if (outerRef.current) {
        outerRef.current.style.left = smooth.current.x + 'px';
        outerRef.current.style.top  = smooth.current.y + 'px';
      }
      raf.current = requestAnimationFrame(loop);
    };

    const enter = () => setHovered(true);
    const leave = () => setHovered(false);

    document.addEventListener('mousemove', move);
    raf.current = requestAnimationFrame(loop);

    const els = document.querySelectorAll('button, a, .sm-proj, .skill-chip, .nav-link, .mood-node, .wanted-poster-card');
    els.forEach(el => {
      el.addEventListener('mouseenter', enter);
      el.addEventListener('mouseleave', leave);
    });

    return () => {
      document.removeEventListener('mousemove', move);
      cancelAnimationFrame(raf.current);
      els.forEach(el => {
        el.removeEventListener('mouseenter', enter);
        el.removeEventListener('mouseleave', leave);
      });
    };
  }, []);

  if (isTouch) return null;

  return (
    <>
      {/* Precision Center Dot */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          width: '5px',
          height: '5px',
          background: '#ffffff',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 100000,
          left: '-100px',
          top: '-100px',
          transform: 'translate(-50%, -50%)',
          boxShadow: '0 0 6px rgba(255, 255, 255, 0.9)',
        }}
      />
      {/* Smooth Outer Ring */}
      <div
        ref={outerRef}
        style={{
          position: 'fixed',
          width: hovered ? '44px' : '32px',
          height: hovered ? '44px' : '32px',
          pointerEvents: 'none',
          zIndex: 99999,
          borderRadius: '50%',
          border: hovered ? '1.5px solid #ffffff' : '1px solid rgba(255, 255, 255, 0.35)',
          background: hovered ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0.02)',
          boxShadow: hovered ? '0 0 20px rgba(255, 255, 255, 0.25)' : 'none',
          transform: 'translate(-50%, -50%)',
          transition: 'width 0.25s cubic-bezier(0.16, 1, 0.3, 1), height 0.25s cubic-bezier(0.16, 1, 0.3, 1), border 0.2s ease, background 0.2s ease, box-shadow 0.2s ease',
          left: '-100px',
          top: '-100px',
        }}
      />
    </>
  );
};

export default CustomCursor;
