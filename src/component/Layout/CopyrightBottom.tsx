import React from 'react';

function CopyrightBottom() {
  return (
    <div
      style={{
        position: 'relative',
        height: '15vh',
        width: '100vw'
      }}>
      <span
        style={{
          fontSize: 'clamp(0.6rem,1.5vw,0.9rem)',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textWrap: 'nowrap'
        }}>
        © 2024 Heesu Cho. All Rights Reserved
      </span>
    </div>
  );
}

export default CopyrightBottom;
