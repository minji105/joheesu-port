import React, { useEffect, useRef, useState } from 'react';
import styles from './MouseFollower.module.scss';

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

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    const sectionTitles = document.querySelectorAll('.mouse-hover');
    sectionTitles.forEach(title => {
      title.addEventListener('mouseenter', handleMouseEnter);
      title.addEventListener('mouseleave', handleMouseLeave);
    });

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      sectionTitles.forEach(title => {
        title.removeEventListener('mouseenter', handleMouseEnter);
        title.removeEventListener('mouseleave', handleMouseLeave);
      });

      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const animateCursor = () => {
      setCursorPos((prev) => ({
        x: prev.x + (mousePos.x - prev.x) * speed,
        y: prev.y + (mousePos.y - prev.y) * speed,
      }));
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

  return (
    <div className={`${styles.mouseFollower} ${isHovering ? styles.hovering : ''}`} ref={cursorRef}>
      <div className={styles.label}><span>Take a look</span></div>
    </div>
  );
}

export default MouseFollower;
