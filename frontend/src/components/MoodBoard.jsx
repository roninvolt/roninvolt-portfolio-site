import React from 'react';
import MusicPlayer from './MusicPlayer';
import SectionBg from './SectionBg';

const MoodBoard = () => {
  return (
    <section id="moodboard" className="section reveal">
      <SectionBg variant="moodboard" />
      <div className="section-tag">AUDIO EXPERIENCE</div>
      <h2 className="section-title">CURRENT <span>SOUNDTRACK</span></h2>
      <p className="section-id">SYS.AUDIO // NOW_PLAYING — LOVE NWANTITI (CKAY)</p>

      <div style={{ marginTop: '2.5rem', display: 'flex', justifyContent: 'center', width: '100%' }}>
        <MusicPlayer isStatic={true} />
      </div>
    </section>
  );
};

export default MoodBoard;
