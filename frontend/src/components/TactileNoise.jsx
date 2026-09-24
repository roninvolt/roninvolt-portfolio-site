import React from 'react';

/**
 * TactileNoise adds an ultra-subtle, high-performance organic film grain
 * overlay to eliminate dark mode digital banding and create luxury tactile depth.
 */
const TactileNoise = () => {
  return (
    <div
      className="tactile-noise-layer"
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 9990,
        opacity: 0.028,
        mixBlendMode: 'screen',
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
      }}
    />
  );
};

export default TactileNoise;
