import React, { useRef, useState, useEffect, useCallback } from 'react';

/* ── Waveform bar data ─────────────────────────────────────
   80 bars with pseudo-random heights seeded by position.
   Using a deterministic pattern so SSR/hydration matches. */
const BAR_COUNT = 48; /* 48 bars is visually identical but 40% less DOM */
const BARS = Array.from({ length: BAR_COUNT }, (_, i) => {
  const t = i / BAR_COUNT;
  // Multiple sine waves overlaid to look like a real waveform
  const h =
    40 +
    28 * Math.sin(t * Math.PI * 6.3) +
    18 * Math.sin(t * Math.PI * 13.7 + 1.2) +
    10 * Math.sin(t * Math.PI * 23.1 + 0.7) +
    7  * Math.sin(t * Math.PI * 41.5 + 2.1);
  return Math.max(8, Math.min(96, h));
});

const fmt = (s) => {
  if (!s || isNaN(s)) return '0:00';
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, '0')}`;
};

const MusicPlayer = ({ isStatic = false }) => {
  const audioRef  = useRef(null);
  const waveRef   = useRef(null);
  const [isPlaying,   setIsPlaying]   = useState(false);
  const [volume,      setVolume]      = useState(0.4);
  const [progress,    setProgress]    = useState(0);   // 0–1
  const [currentTime, setCurrentTime] = useState(0);
  const [duration,    setDuration]    = useState(0);
  const [isLooping,   setIsLooping]   = useState(true);

  /* sync volume */
  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  /* sync loop */
  useEffect(() => {
    if (audioRef.current) audioRef.current.loop = isLooping;
  }, [isLooping]);

  /* time tracking & play/pause synchronization */
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onTime  = () => {
      setCurrentTime(audio.currentTime);
      setProgress(audio.duration ? audio.currentTime / audio.duration : 0);
    };
    const onMeta  = () => setDuration(audio.duration);
    const onEnd   = () => setIsPlaying(false);
    const onPlay  = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', onTime);
    audio.addEventListener('loadedmetadata', onMeta);
    audio.addEventListener('ended', onEnd);
    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);

    return () => {
      audio.removeEventListener('timeupdate', onTime);
      audio.removeEventListener('loadedmetadata', onMeta);
      audio.removeEventListener('ended', onEnd);
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
    };
  }, []);

  /* Autoplay: attempt immediately, and attach interaction listeners if browser requires user gesture */
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    let hasStarted = false;

    const playAudio = () => {
      if (hasStarted || !audioRef.current) return;
      audioRef.current
        .play()
        .then(() => {
          hasStarted = true;
          setIsPlaying(true);
          removeListeners();
        })
        .catch(() => {
          // Awaiting next user gesture
        });
    };

    const removeListeners = () => {
      window.removeEventListener('click', playAudio);
      window.removeEventListener('touchstart', playAudio);
      window.removeEventListener('keydown', playAudio);
      window.removeEventListener('scroll', playAudio);
      document.removeEventListener('pointerdown', playAudio);
    };

    // 1. Direct autoplay attempt on mount
    playAudio();

    // 2. If blocked by browser autoplay policy, fire as soon as user touches/clicks/scrolls anywhere
    window.addEventListener('click', playAudio, { once: true });
    window.addEventListener('touchstart', playAudio, { once: true });
    window.addEventListener('keydown', playAudio, { once: true });
    window.addEventListener('scroll', playAudio, { once: true, passive: true });
    document.addEventListener('pointerdown', playAudio, { once: true });

    return () => removeListeners();
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    }
  };

  const seek = useCallback((e) => {
    const rect = waveRef.current?.getBoundingClientRect();
    if (!rect || !audioRef.current?.duration) return;
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    audioRef.current.currentTime = ratio * audioRef.current.duration;
    setProgress(ratio);
  }, []);

  return (
    <div className="mp-widget">
      <audio
        ref={audioRef}
        src={encodeURI('/CKay - Love Nwantiti.mp3')}
        autoPlay
        loop={isLooping}
        preload="auto"
      />

      {/* ── Corner brackets ─────────────────────── */}
      <span className="mp-corner mp-tl" aria-hidden="true" />
      <span className="mp-corner mp-tr" aria-hidden="true" />
      <span className="mp-corner mp-bl" aria-hidden="true" />
      <span className="mp-corner mp-br" aria-hidden="true" />

      {/* ── Status label ────────────────────────── */}
      <div className="mp-status">
        <span className={`mp-dot${isPlaying ? ' mp-dot--on' : ''}`} />
        {isPlaying ? 'PLAYING' : 'PAUSED'}
      </div>

      {/* ── Main layout: info | waveform | controls ─ */}
      <div className="mp-body">

        {/* Track info */}
        <div className="mp-info">
          <div className="mp-title">LOVE NWANTITI</div>
          <div className="mp-artist">CKay</div>
          <div className="mp-album">AH BELEKE</div>
        </div>

        {/* Waveform + scrubber */}
        <div className="mp-wave-col">
          <div
            className="mp-waveform"
            ref={waveRef}
            onClick={seek}
            role="slider"
            aria-label="Seek"
            aria-valuenow={Math.round(progress * 100)}
          >
            {BARS.map((h, i) => {
              const played = i / BAR_COUNT <= progress;
              return (
                <div
                  key={i}
                  className={`mp-bar${played ? ' mp-bar--played' : ''}${isPlaying ? ' mp-bar--anim' : ''}`}
                  style={{
                    height: `${h}%`,
                    animationDelay: `${((i * 137) % 800) / 1000}s`,
                  }}
                />
              );
            })}
            {/* Scrubber dot */}
            <div
              className="mp-scrubber"
              style={{ left: `calc(${progress * 100}% - 5px)` }}
            />
          </div>
          <div className="mp-times">
            <span>{fmt(currentTime)}</span>
            <span>{fmt(duration)}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="mp-controls">
          <button
            className={`mp-loop-btn${isLooping ? ' mp-loop-btn--on' : ''}`}
            onClick={() => setIsLooping(l => !l)}
            aria-label="Toggle loop"
            title="Loop"
          >
            <i className="fas fa-redo" />
          </button>

          <button
            className="mp-play-btn"
            onClick={togglePlay}
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            <i className={`fas fa-${isPlaying ? 'pause' : 'play'}`} />
          </button>

          <div className="mp-volume">
            <i className="fas fa-volume-up mp-vol-icon" />
            <input
              className="mp-vol-slider"
              type="range"
              min="0" max="1" step="0.02"
              value={volume}
              onChange={e => setVolume(parseFloat(e.target.value))}
              aria-label="Volume"
            />
          </div>
        </div>

      </div>
    </div>
  );
};

export default MusicPlayer;
