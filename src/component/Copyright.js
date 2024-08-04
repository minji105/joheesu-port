import React from 'react';

function Copyright() {
  return (
    <>
      <p
        style={{
          position: 'fixed',
          top: '5px',
          right: '1vw',
          zIndex: '1000',
          mixBlendMode: 'difference',
          color: '#fff'
        }}>@ 2024</p>
    </>
  );
}

export default Copyright;
