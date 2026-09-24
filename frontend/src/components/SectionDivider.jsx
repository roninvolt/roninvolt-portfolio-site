import React from 'react';

const SectionDivider = ({ label = 'SYS.NODE' }) => {
  return (
    <div
      className="section-divider-wrap"
      aria-hidden="true"
      style={{
        position: 'relative',
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '0 5%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        className="section-divider-line"
        style={{
          width: '100%',
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1) 20%, rgba(0, 245, 255, 0.35) 50%, rgba(255, 255, 255, 0.1) 80%, transparent)',
          position: 'relative',
        }}
      >
        {/* Central pulse dot */}
        <div
          className="section-divider-dot"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '6px',
            height: '6px',
            background: '#00f0ff',
            borderRadius: '50%',
            boxShadow: '0 0 8px #00f0ff, 0 0 16px rgba(0, 245, 255, 0.5)',
          }}
        />
      </div>
    </div>
  );
};

export default SectionDivider;
