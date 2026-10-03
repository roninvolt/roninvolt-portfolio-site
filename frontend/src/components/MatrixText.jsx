import React, { useState, useEffect, useRef, useCallback } from 'react';

// Refined, minimalist capital alphanumeric character set for subtle unscramble
const SLEEK_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

const MatrixText = ({
  text,
  children,
  as: Component = 'span',
  className = '',
  glitchColor = '#ffffff', // Defaults to clean white
  triggerOnHover = true,
  autoGlitch = false,
  glitchInterval = 9000,
  speed = 24,
  style = {},
  ...rest
}) => {
  const content = typeof text === 'string' ? text : (typeof children === 'string' ? children : '');
  const [displayText, setDisplayText] = useState(content);
  const [isShimmering, setIsShimmering] = useState(false);
  const isAnimatingRef = useRef(false);
  const timerRef = useRef(null);
  const autoTimerRef = useRef(null);

  useEffect(() => {
    setDisplayText(content);
  }, [content]);

  const triggerAestheticEffect = useCallback(() => {
    if (isAnimatingRef.current || !content) return;
    isAnimatingRef.current = true;
    setIsShimmering(true);

    if (timerRef.current) clearInterval(timerRef.current);

    const length = content.length;
    let iteration = 0;
    const maxIterations = Math.max(8, Math.floor(length * 1.8));

    timerRef.current = setInterval(() => {
      iteration++;

      setDisplayText(
        content
          .split('')
          .map((char, index) => {
            if (char === ' ' || char === '\n' || char === '/' || char === ':' || char === '-') return char;
            if (index < (iteration / maxIterations) * length) {
              return char;
            }
            return SLEEK_CHARS[Math.floor(Math.random() * SLEEK_CHARS.length)];
          })
          .join('')
      );

      if (iteration >= maxIterations) {
        clearInterval(timerRef.current);
        timerRef.current = null;
        setDisplayText(content);
        isAnimatingRef.current = false;
        setTimeout(() => setIsShimmering(false), 250);
      }
    }, speed);
  }, [content, speed]);

  useEffect(() => {
    if (autoGlitch) {
      autoTimerRef.current = setInterval(() => {
        triggerAestheticEffect();
      }, glitchInterval);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (autoTimerRef.current) clearInterval(autoTimerRef.current);
    };
  }, [autoGlitch, glitchInterval, triggerAestheticEffect]);

  const handleMouseEnter = (e) => {
    if (triggerOnHover) {
      triggerAestheticEffect();
    }
    if (rest.onMouseEnter) rest.onMouseEnter(e);
  };

  if (!content) {
    return <Component className={className} style={style} {...rest}>{children || text}</Component>;
  }

  return (
    <Component
      className={`aesthetic-text-wrap matrix-glitch-wrap ${isShimmering ? 'shimmering glitching' : ''} ${className}`}
      data-text={content}
      onMouseEnter={handleMouseEnter}
      style={{ cursor: triggerOnHover ? 'pointer' : 'inherit', ...style }}
      {...rest}
    >
      {displayText.split('').map((char, idx) => {
        const isCycling = isShimmering && char !== content[idx];
        return (
          <span
            key={idx}
            className={`aesthetic-char matrix-char ${isCycling ? 'is-cycling is-matrix' : ''}`}
            style={
              isCycling
                ? {
                    color: '#ffffff',
                    WebkitTextFillColor: '#ffffff',
                    textShadow: '0 0 10px rgba(255, 255, 255, 0.7)',
                    opacity: 0.85,
                  }
                : undefined
            }
          >
            {char}
          </span>
        );
      })}
    </Component>
  );
};

export default MatrixText;
