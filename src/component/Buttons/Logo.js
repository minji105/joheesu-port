import React from 'react';

function Logo() {
  return (
    <>
      <span
        style={{
          position: 'fixed',
          top: '2vh',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: '1000',
          mixBlendMode: 'difference',
          color: '#fff',
          fontSize: '22px',
          letterSpacing: '10px',
          fontWeight: '700'
        }}>HEESU</span>
    </>
  );
}

export default Logo;
