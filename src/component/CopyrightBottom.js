import React from 'react';

function CopyrightBottom() {
  return (
    <div
      style={{
        position: 'relative',
        height: '15vh',
        width: '100vw',
      }}>
      <p
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontWeight: 400
        }}>
        © 2024 Heesu Cho. All Rights Reserved
      </p>
    </div>
  );
}

export default CopyrightBottom;
