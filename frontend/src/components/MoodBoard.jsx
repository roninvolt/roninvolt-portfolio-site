import React, { useState } from 'react';
import MusicPlayer from './MusicPlayer';
import SectionBg from './SectionBg';

const VIBES = [
  {
    id: 'VIBE.01',
    image: '/tyler_durden_1.jpg',
    title: 'TYLER DURDEN',
    subtitle: 'THE THINGS YOU OWN END UP OWNING YOU',
    alias: 'THE ALTER EGO // UNCONSTRAINED ID',
    role: 'SOAPMAKER · PROVOCATEUR · VISIONARY',
    bio: 'Charismatic, chaotic projection of absolute mental liberation. Born from insomnia and modern disillusionment, Tyler exists outside fear, societal debt, and corporate control.',
    philosophy: 'Reclaiming primal sovereignty by rejecting consumerism and superficial comfort.',
    traits: ['Radical Freedom', 'Anti-Consumerist', 'High Agency', 'Raw Grit']
  },
  {
    id: 'VIBE.02',
    image: '/tyler_durden_2.jpg',
    title: 'PROJECT MAYHEM',
    subtitle: "IT'S ONLY AFTER WE'VE LOST EVERYTHING...",
    alias: 'DECENTRALIZED SYNDICATE',
    role: 'ARCHITECT OF CREATIVE DESTRUCTION',
    bio: 'A nationwide guerrilla syndicate engineered to reset the ledger and shatter illusory comfort. Converting quiet suburban frustration into relentless, unified execution.',
    philosophy: '...that we are free to do anything. Breaking obsolete systems to build unshakeable resolve.',
    traits: ['Decentralized Loop', 'Unstoppable Momentum', 'Pure Focus']
  },
  {
    id: 'VIBE.03',
    image: '/tyler_durden_3.jpg',
    title: 'THE FIRST RULE',
    subtitle: 'YOU DO NOT TALK ABOUT FIGHT CLUB',
    alias: 'PROTOCOL 01 // STEALTH MODE',
    role: 'UNDERGROUND SANCTUARY',
    bio: 'The sacred code of silence and direct confrontation. No resume, no status symbols, no hollow talk. In the ring, you are judged strictly by your grit and endurance.',
    philosophy: 'Mastery in silence: shipping high-complexity code and AI systems that speak for themselves.',
    traits: ['Zero Noise', 'Quiet Execution', 'Stealth Building']
  },
  {
    id: 'VIBE.04',
    image: '/tyler_durden_4.jpg',
    title: "JACK'S SMIRKING REVENGE",
    subtitle: 'SELF-IMPROVEMENT IS MASTURBATION',
    alias: 'RADICAL REINVENTION',
    role: 'PRIMAL EVOLUTION',
    bio: 'The physical purge of artificial limitations. Shedding ego and comfort to withstand intense friction, emerging sharper, harder, and entirely self-determined.',
    philosophy: 'Constant evolution through deliberate friction, intense focus, and zero hesitation.',
    traits: ['Radical Resilience', 'Primal Drive', 'Maximum Voltage']
  }
];

const MoodBoard = () => {
  const [clickedIndex, setClickedIndex] = useState(null);
  const activeVibe = clickedIndex !== null ? VIBES[clickedIndex] : null;

  return (
    <section id="moodboard" className="section reveal">
      <SectionBg variant="moodboard" />
      <div className="section-tag">CURRENT VIBE</div>
      <h2 className="section-title">CURRENT <span>VIBE</span></h2>
      <p className="section-id">SYS.LOG // ARCHETYPE_DOSSIER // TYLER_DURDEN</p>

      <div className="moodboard-container">
        {/* SVG lines between nodes (desktop only) - matching the staggered 4-node wire graph */}
        <svg className="mood-svg-lines" aria-hidden="true">
          <line x1="18%" y1="30%" x2="36%" y2="62%" stroke="rgba(255, 42, 85, 0.25)" strokeWidth="1.5" />
          <line x1="18%" y1="30%" x2="84%" y2="32%" stroke="rgba(255, 42, 85, 0.25)" strokeWidth="1.5" />
          <line x1="66%" y1="56%" x2="84%" y2="32%" stroke="rgba(255, 42, 85, 0.25)" strokeWidth="1.5" />
        </svg>

        {VIBES.map((vibe, idx) => {
          const isClicked = clickedIndex === idx;
          return (
            <div 
              key={vibe.id}
              className={`mood-node mood-node-${idx + 1} ${isClicked ? 'active' : ''}`}
              onClick={() => setClickedIndex(isClicked ? null : idx)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setClickedIndex(isClicked ? null : idx); }}
              aria-label={`${vibe.title}: ${vibe.subtitle}`}
            >
              {/* Speech-bubble styled tooltip popping up above the node */}
              <div className="mood-tooltip">
                <div className="mood-tooltip-badge">DOSSIER // {vibe.id}</div>
                <div className="mood-tooltip-title">{vibe.title}</div>
                <div className="mood-tooltip-desc">"{vibe.subtitle}"</div>
                <div className="mood-tooltip-bio">
                  <strong>BIO:</strong> {vibe.bio}
                </div>
                <div className="mood-tooltip-traits">
                  {vibe.traits.map((t, tIdx) => (
                    <span key={tIdx} className="mood-trait-pill">{t}</span>
                  ))}
                </div>
                <div className="mood-tooltip-arrow" />
              </div>

              <div className="mood-img-wrap">
                <a href={vibe.image} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} style={{ display: 'block', width: '100%', height: '100%' }}>
                  <img src={vibe.image} alt={vibe.title} className="mood-img" loading="lazy" decoding="async" />
                  <div className="mood-scanline" />
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Dossier & Bio Console */}
      <div className="vibe-dossier-card">
        <div className="vibe-dossier-header">
          <div className="vibe-dossier-meta">
            <span className="vibe-dossier-pulse" />
            <span className="vibe-dossier-tag">
              {activeVibe ? `DOSSIER // ${activeVibe.id}` : 'ARCHETYPE DOSSIER // TYLER DURDEN'}
            </span>
            <span className="vibe-dossier-status">
              {activeVibe ? activeVibe.alias : 'IDENTITY SYNC // 100%'}
            </span>
          </div>
          <div className="vibe-dossier-badge-right">
            <i className="fas fa-fingerprint" /> CLASSIFIED // LEVEL 04
          </div>
        </div>

        <div className="vibe-dossier-body">
          <div className="vibe-dossier-left">
            <div className="vibe-dossier-avatar">
              <img
                src={activeVibe ? activeVibe.image : '/tyler_durden_1.jpg'}
                alt={activeVibe ? activeVibe.title : 'Tyler Durden'}
                className="vibe-dossier-thumb"
              />
              <div className="vibe-dossier-scan" />
            </div>
            <div className="vibe-dossier-specs">
              <div className="vibe-spec-title">{activeVibe ? activeVibe.title : 'TYLER DURDEN'}</div>
              <div className="vibe-spec-role">{activeVibe ? activeVibe.role : 'SOAPMAKER · ALTER EGO · VISIONARY'}</div>
              <div className="vibe-spec-quote">"{activeVibe ? activeVibe.subtitle : 'The things you own end up owning you.'}"</div>
            </div>
          </div>

          <div className="vibe-dossier-right">
            <div className="vibe-dossier-field">
              <span className="vibe-field-label">CHARACTER BIO // DOSSIER:</span>
              <p className="vibe-field-text">
                {activeVibe
                  ? activeVibe.bio
                  : 'Tyler Durden is the charismatic, uninhibited alter ego who rejects consumerist pacification and fear. Operating outside conventional systems, he channels radical freedom, intense focus, and creative disruption to awaken untapped human potential.'}
              </p>
            </div>

            <div className="vibe-dossier-field">
              <span className="vibe-field-label">ENGINEERING ETHOS // OPERATOR ALIGNMENT:</span>
              <p className="vibe-field-text">
                {activeVibe
                  ? activeVibe.philosophy
                  : "Channeling Tyler's unrelenting grit, fearless experimentation, and quiet execution into AI engineering, autonomous multi-agent pipelines, and building Voxen Development without excuses."}
              </p>
            </div>

            <div className="vibe-dossier-tags">
              {(activeVibe ? activeVibe.traits : ['Radical Freedom', 'Zero Excuses', 'Stealth Execution', 'Maximum Agency']).map((trait, tIdx) => (
                <span key={tIdx} className="vibe-trait-tag">
                  <i className="fas fa-check" /> {trait}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="vibe-dossier-footer">
          <div className="vibe-dossier-prompt">
            <i className="fas fa-mouse-pointer" /> {clickedIndex !== null ? 'Click active node again or any node to toggle dossier' : 'Click any of the 4 nodes above to inspect individual dossiers'}
          </div>
          <div className="vibe-dossier-link">
            <span className="vibe-link-label">OPERATOR BIO:</span>
            <a href="https://zyo.lol/roninvolt" target="_blank" rel="noopener noreferrer" className="vibe-bio-btn">
              <i className="fas fa-link" /> zyo.lol/roninvolt
            </a>
          </div>
        </div>
      </div>

      {/* Render Music Player centered at the bottom of the section */}
      <MusicPlayer isStatic={true} />
    </section>
  );
};

export default MoodBoard;
