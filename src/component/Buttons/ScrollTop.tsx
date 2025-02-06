import React, { useEffect, useState } from 'react';
import styles from './ScrollTop.module.scss';

const ScrollTop = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 200) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <div className={`${styles.scroll} ${isVisible ? styles.visible : ''}`} onClick={scrollToTop}>
      {isVisible && <p>Top</p>}
    </div>
  );
};

export default ScrollTop;
