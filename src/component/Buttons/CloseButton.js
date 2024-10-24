import React, { useEffect, useState } from 'react';

function CloseButton({ onClick, style }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 479);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 479);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const desktopStyle = {
    margin: '-10px 8px 0'
  };

  const mobileStyle = {
    margin: '0 3vw',
    top: '1vh'
  };

  return (
    <div className="close-button"
      onClick={onClick}
      style={{
        ...style,
        ...isMobile ? mobileStyle : desktopStyle,
        fontSize: '20px',
        padding: '5px',
        position: 'fixed',
        cursor: 'pointer'
      }}>
      &#10005;
    </div>
  );
}

export default CloseButton;
