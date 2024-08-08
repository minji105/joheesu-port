import React, { useEffect, useRef, useState } from 'react';
import './MouseFollower.css';

function MouseFollower() {
  const cursorRef = useRef(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const speed = 0.5;

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePos({ x: event.clientX, y: event.clientY });
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const animateCursor = () => {
      setCursorPos((prev) => {
        const dx = mousePos.x - prev.x;
        const dy = mousePos.y - prev.y;

        return {
          x: prev.x + dx * speed,
          y: prev.y + dy * speed,
        };
      });

      requestAnimationFrame(animateCursor);
    };

    animateCursor();
  }, [mousePos]);

  useEffect(() => {
    if (cursorRef.current) {
      cursorRef.current.style.left = `${cursorPos.x - 10}px`;
      cursorRef.current.style.top = `${cursorPos.y - 10}px`;
    }
  }, [cursorPos]);

  useEffect(() => {
    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    const sectionTitles = document.querySelectorAll('.mouse-hover');
    sectionTitles.forEach(title => {
      title.addEventListener('mouseenter', handleMouseEnter);
      title.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      sectionTitles.forEach(title => {
        title.removeEventListener('mouseenter', handleMouseEnter);
        title.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <div className={`mouse-follower ${isHovering ? 'hovering' : ''}`} ref={cursorRef}>
      <div className="cursor__circle"></div>
      <div className="cursor__label"><span>Take a look</span></div>
    </div>
  );
}

export default MouseFollower;
