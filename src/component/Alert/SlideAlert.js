import React from 'react';
import './SlideAlert.css';

function SlideAlert({direction}) {
  const message = direction === 'vertical' ? 'Swipe up or down' : 'Swipe left or right';

  return (
    <>
      <div className="slide-alert">
        {message}
      </div>
    </>
  );
}

export default SlideAlert;
