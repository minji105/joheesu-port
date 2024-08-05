import React from 'react';

function Logo() {
  return (
    <>
      <h1
        style={{
          position: 'fixed',
          top: '2vh',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: '1000',
          mixBlendMode: 'difference',
          color: '#fff'
        }}>HEESU</h1>
    </>
  );
}

export default Logo;
