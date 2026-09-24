import React, { useEffect } from 'react';

/**
 * SpotlightManager attaches dynamic mouse tracking coordinates (--mouse-x, --mouse-y)
 * to all interactive cards and surfaces for a luxurious, minimalist cursor spotlight effect.
 */
const SpotlightManager = () => {
  useEffect(() => {
    // Only enable mouse-tracking spotlight on pointer-fine (desktop/mouse) devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const selector = '.ang-card, .skill-mod, .stat-block, .quick-facts, .exp-card-inner, .terminal-wrap, .featured-wanted-poster, .spotlight-card';

    const handleMouseMove = (e) => {
      const target = e.target.closest(selector);
      if (!target) return;

      const rect = target.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      target.style.setProperty('--mouse-x', `${x}px`);
      target.style.setProperty('--mouse-y', `${y}px`);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return null;
};

export default SpotlightManager;
