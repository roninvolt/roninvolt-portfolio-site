import React, { useState, useEffect, useRef, useCallback } from 'react';

// Matrix Katakana, binary, hex, and cyber glyphs
const MATRIX_CHARS = '01XYZ#$<>[]{}+*&%~!?/0123456789_░▒▓';

const MatrixText = ({
  text,
  children,
  as: Component = 'span',
  className = '',
  glitchColor = '#00ff66',
  triggerOnHover = true,
  autoGlitch = false,
  glitchInterval = 8000,
  speed = 28,
  style = {},
  ...rest
}) => {
  const content = typeof text === 'string' ? text : (typeof children === 'string' ? children : '');
  const [displayText, setDisplayText] = useState(content);
  const [isGlitching, setIsGlitching] = useState(false);
  const isGlitchingRef = useRef(false);
  const timerRef = useRef(null);
  const autoTimerRef = useRef(null);

  useEffect(() => {
    setDisplayText(content);
  }, [content]);

  const triggerGlitch = useCallback(() => {
    if (isGlitchingRef.current || !content) return;
    isGlitchingRef.current = true;
    setIsGlitching(true);

    if (timerRef.current) clearInterval(timerRef.current);

    const length = content.length;
    let iteration = 0;
    const maxIterations = Math.max(10, Math.floor(length * 2.5));

    timerRef.current = setInterval(() => {
      iteration++;

      setDisplayText(
        content
          .split('')
          .map((char, index) => {
            if (char === ' ' || char === '\n') return char;
            if (index < (iteration / maxIterations) * length) {
              return char;
            }
            return MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)];
          })
          .join('')
      );

      if (iteration >= maxIterations) {
        clearInterval(timerRef.current);
        timerRef.current = null;
        setDisplayText(content);
        isGlitchingRef.current = false;
        setIsGlitching(false);
      }
    }, speed);
  }, [content, speed]);

  useEffect(() => {
    if (autoGlitch) {
      autoTimerRef.current = setInterval(() => {
        triggerGlitch();
      }, glitchInterval);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (autoTimerRef.current) clearInterval(autoTimerRef.current);
    };
  }, [autoGlitch, glitchInterval, triggerGlitch]);

  const handleMouseEnter = (e) => {
    if (triggerOnHover) {
      triggerGlitch();
    }
    if (rest.onMouseEnter) rest.onMouseEnter(e);
  };

  if (!content) {
    return <Component className={className} style={style} {...rest}>{children || text}</Component>;
  }

  return (
    <Component
      className={`matrix-glitch-wrap ${isGlitching ? 'glitching' : ''} ${className}`}
      data-text={content}
      onMouseEnter={handleMouseEnter}
      style={{ cursor: triggerOnHover ? 'pointer' : 'inherit', ...style }}
      {...rest}
    >
      {displayText.split('').map((char, idx) => {
        const isGlitchChar = isGlitching && char !== content[idx];
        return (
          <span
            key={idx}
            className={`matrix-char ${isGlitchChar ? 'is-matrix' : ''}`}
            style={
              isGlitchChar
                ? {
                    color: glitchColor,
                    WebkitTextFillColor: glitchColor,
                    textShadow: `0 0 8px ${glitchColor}, 0 0 16px ${glitchColor}`,
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
