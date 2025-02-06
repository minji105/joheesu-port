import React from 'react';

function Logo() {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      width: '100%'
    }}>
      <span
        style={{
          position: 'fixed',
          top: '2vh',
          zIndex: '1000',
          mixBlendMode: 'difference',
          color: '#fff',
          fontSize: 'clamp(2rem, 2.2rem, 2.5rem)',
          fontWeight: '700',
          letterSpacing: '4px'
        }}>HEESU</span>
    </div>
  );
}

export default Logo;
