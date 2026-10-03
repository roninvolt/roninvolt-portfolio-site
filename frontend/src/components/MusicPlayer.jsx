import React, { useRef, useState, useEffect, useCallback } from 'react';
import MatrixText from './MatrixText';

/* ── Waveform bar data ─────────────────────────────────────
   48 bars with pseudo-random heights seeded by position. */
const BAR_COUNT = 48;
const BARS = Array.from({ length: BAR_COUNT }, (_, i) => {
  const t = i / BAR_COUNT;
  const h =
    38 +
    28 * Math.sin(t * Math.PI * 6.3) +
    20 * Math.sin(t * Math.PI * 13.7 + 1.2) +
    12 * Math.sin(t * Math.PI * 23.1 + 0.7) +
    8 * Math.sin(t * Math.PI * 41.5 + 2.1);
  return Math.max(14, Math.min(96, Math.round(h)));
});

const fmt = (s) => {
  if (!s || isNaN(s)) return '0:00';
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, '0')}`;
};

const MusicPlayer = ({ isStatic = false }) => {
  const audioRef = useRef(null);
  const waveRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.4);
  const [prevVolume, setPrevVolume] = useState(0.4);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLooping, setIsLooping] = useState(true);
  const [hoverSeek, setHoverSeek] = useState(null);

  /* sync volume */
  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  /* sync loop */
  useEffect(() => {
    if (audioRef.current) audioRef.current.loop = isLooping;
  }, [isLooping]);

  /* time tracking & sync */
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onTime = () => {
      setCurrentTime(audio.currentTime);
      setProgress(audio.duration ? audio.currentTime / audio.duration : 0);
    };
    const onMeta = () => setDuration(audio.duration);
    const onEnd = () => setIsPlaying(false);
    const onPlay = () => setIsPlaying(true);
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

  /* Singleton audio instance management — guarantees audio NEVER plays in double */
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Immediately stop any existing global audio element or rogue audio instances in DOM
    if (typeof window !== 'undefined') {
      if (window.__RONINVOLT_AUDIO__ && window.__RONINVOLT_AUDIO__ !== audio) {
        try {
          window.__RONINVOLT_AUDIO__.pause();
          window.__RONINVOLT_AUDIO__.currentTime = 0;
          window.__RONINVOLT_AUDIO__.src = '';
        } catch (_) {}
      }
      window.__RONINVOLT_AUDIO__ = audio;

      // Clean up any extra orphan audio elements in the document
      document.querySelectorAll('audio').forEach(el => {
        if (el !== audio) {
          try {
            el.pause();
            el.currentTime = 0;
          } catch (_) {}
        }
      });
    }

    let isDisposed = false;

    const playAudio = () => {
      if (isDisposed || !audioRef.current) return;
      audioRef.current
        .play()
        .then(() => {
          if (!isDisposed) setIsPlaying(true);
          removeListeners();
        })
        .catch(() => {});
    };

    const removeListeners = () => {
      window.removeEventListener('click', playAudio);
      window.removeEventListener('touchstart', playAudio);
      window.removeEventListener('keydown', playAudio);
      window.removeEventListener('scroll', playAudio);
      document.removeEventListener('pointerdown', playAudio);
    };

    // Attempt playback
    playAudio();

    window.addEventListener('click', playAudio, { once: true });
    window.addEventListener('touchstart', playAudio, { once: true });
    window.addEventListener('keydown', playAudio, { once: true });
    window.addEventListener('scroll', playAudio, { once: true, passive: true });
    document.addEventListener('pointerdown', playAudio, { once: true });

    return () => {
      isDisposed = true;
      removeListeners();
      if (audio) {
        audio.pause();
      }
      if (typeof window !== 'undefined' && window.__RONINVOLT_AUDIO__ === audio) {
        window.__RONINVOLT_AUDIO__ = null;
      }
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const skipTime = (amount) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.max(0, Math.min(audio.duration || 0, audio.currentTime + amount));
  };

  const toggleMute = () => {
    if (volume > 0) {
      setPrevVolume(volume);
      setVolume(0);
    } else {
      setVolume(prevVolume || 0.4);
    }
  };

  const handleWaveMouseMove = (e) => {
    if (!waveRef.current || !duration) return;
    const rect = waveRef.current.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    setHoverSeek({
      ratio,
      time: ratio * duration,
      x: e.clientX - rect.left,
    });
  };

  const handleWaveMouseLeave = () => {
    setHoverSeek(null);
  };

  const seek = useCallback((e) => {
    const rect = waveRef.current?.getBoundingClientRect();
    if (!rect || !audioRef.current?.duration) return;
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    audioRef.current.currentTime = ratio * audioRef.current.duration;
    setProgress(ratio);
  }, []);

  return (
    <div className={`mp-widget ${isPlaying ? 'is-playing' : ''}`}>
      <audio
        ref={audioRef}
        src={encodeURI('/Tyler Durden.mp3')}
        loop={isLooping}
        preload="auto"
      />

      {/* Reactive Ambient Glow Aura */}
      <div className={`mp-ambient-aura ${isPlaying ? 'active' : ''}`} aria-hidden="true" />

      {/* Corner Brackets */}
      <span className="mp-corner mp-tl" aria-hidden="true" />
      <span className="mp-corner mp-tr" aria-hidden="true" />
      <span className="mp-corner mp-bl" aria-hidden="true" />
      <span className="mp-corner mp-br" aria-hidden="true" />

      {/* Status Bar */}
      <div className="mp-status">
        <div className="mp-status-left">
          <span className={`mp-dot ${isPlaying ? 'mp-dot--on' : ''}`} />
          <span className="mp-status-text">{isPlaying ? 'STREAMING AUDIO' : 'AUDIO PAUSED'}</span>
          <span className="mp-status-divider">|</span>
          <span className="mp-status-specs">
            <MatrixText text="HI-RES // 320 KBPS" glitchColor="#ffffff" />
          </span>
        </div>

        {/* Live Audio Visualizer Bars in Header */}
        <div className={`mp-live-indicator ${isPlaying ? 'active' : ''}`} aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
      </div>

      {/* Main Body */}
      <div className="mp-body">
        {/* Left: Vinyl Disc & Track Info */}
        <div className="mp-track-wrap">
          <div className="mp-disc-container" onClick={togglePlay} title={isPlaying ? 'Pause' : 'Play'}>
            <div className={`mp-vinyl-disc ${isPlaying ? 'spinning' : ''}`}>
              <div className="mp-vinyl-grooves" />
              <div className="mp-vinyl-center">
                <img src="/tyler_durden_1.jpg" alt="Tyler Durden Audio" className="mp-vinyl-artwork" />
                <div className="mp-vinyl-spindle" />
              </div>
            </div>
            {/* Sound Wave Ripple when playing */}
            {isPlaying && <div className="mp-disc-ripple" />}
          </div>

          <div className="mp-info">
            <div className="mp-title">
              <MatrixText text="TYLER DURDEN" glitchColor="#ffffff" triggerOnHover={true} />
            </div>
            <div className="mp-artist">
              <i className="fas fa-music" style={{ fontSize: '0.65rem', marginRight: '6px', color: '#ffffff' }} />
              Tyler Durden
            </div>
            <div className="mp-badge-row">
              <span className="mp-badge">ORIGINAL SOUNDTRACK</span>
              <span className="mp-badge-format">MP3 44.1kHz</span>
            </div>
          </div>
        </div>

        {/* Center: Waveform & Scrubber */}
        <div className="mp-wave-col">
          <div
            className="mp-waveform"
            ref={waveRef}
            onClick={seek}
            onMouseMove={handleWaveMouseMove}
            onMouseLeave={handleWaveMouseLeave}
            role="slider"
            aria-label="Seek track"
            aria-valuenow={Math.round(progress * 100)}
          >
            {/* Hover timestamp tooltip */}
            {hoverSeek && (
              <div
                className="mp-seek-tooltip"
                style={{ left: `${hoverSeek.x}px` }}
              >
                {fmt(hoverSeek.time)}
              </div>
            )}

            {/* Hover position line */}
            {hoverSeek && (
              <div
                className="mp-seek-line"
                style={{ left: `${hoverSeek.x}px` }}
              />
            )}

            {/* Visualizer bars */}
            {BARS.map((h, i) => {
              const played = i / BAR_COUNT <= progress;
              return (
                <div
                  key={i}
                  className={`mp-bar ${played ? 'mp-bar--played' : ''} ${isPlaying ? 'mp-bar--anim' : ''}`}
                  style={{
                    height: `${h}%`,
                    animationDelay: `${((i * 73) % 900) / 1000}s`,
                  }}
                />
              );
            })}

            {/* Scrubber pointer */}
            <div
              className="mp-scrubber"
              style={{ left: `calc(${progress * 100}% - 6px)` }}
            />
          </div>

          <div className="mp-times">
            <span>{fmt(currentTime)}</span>
            <span className="mp-time-progress">
              {Math.round(progress * 100)}%
            </span>
            <span>{fmt(duration)}</span>
          </div>
        </div>

        {/* Right: Controls & Volume */}
        <div className="mp-controls">
          <div className="mp-btn-cluster">
            {/* Rewind 10s */}
            <button
              className="mp-ctrl-btn"
              onClick={() => skipTime(-10)}
              title="Rewind 10 seconds"
              aria-label="Rewind 10s"
            >
              <i className="fas fa-backward" />
            </button>

            {/* Big Play/Pause Button */}
            <button
              className={`mp-play-btn ${isPlaying ? 'playing' : ''}`}
              onClick={togglePlay}
              aria-label={isPlaying ? 'Pause' : 'Play'}
              title={isPlaying ? 'Pause' : 'Play'}
            >
              <i className={`fas fa-${isPlaying ? 'pause' : 'play'}`} />
            </button>

            {/* Forward 10s */}
            <button
              className="mp-ctrl-btn"
              onClick={() => skipTime(10)}
              title="Fast Forward 10 seconds"
              aria-label="Forward 10s"
            >
              <i className="fas fa-forward" />
            </button>

            {/* Loop Toggle */}
            <button
              className={`mp-ctrl-btn mp-loop-btn ${isLooping ? 'mp-loop-btn--on' : ''}`}
              onClick={() => setIsLooping((l) => !l)}
              aria-label="Toggle loop"
              title={isLooping ? 'Loop Enabled' : 'Loop Disabled'}
            >
              <i className="fas fa-redo" />
            </button>
          </div>

          {/* Volume Control */}
          <div className="mp-volume">
            <button
              className="mp-vol-toggle"
              onClick={toggleMute}
              title={volume === 0 ? 'Unmute' : 'Mute'}
              aria-label="Toggle mute"
            >
              <i
                className={`fas fa-volume-${volume === 0 ? 'mute' : volume < 0.5 ? 'down' : 'up'} mp-vol-icon`}
              />
            </button>
            <input
              className="mp-vol-slider"
              type="range"
              min="0"
              max="1"
              step="0.02"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              aria-label="Volume slider"
            />
            <span className="mp-vol-label">{Math.round(volume * 100)}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
