import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from './Menu.module.scss';
import Logo from '../Layout/Logo';

function Menu() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        closeMenu();
      }
    };

    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <>
      <p className={styles.button} onClick={toggleMenu}>MENU</p>

      <div ref={menuRef} className={`${styles.container} ${menuOpen ? styles.open : ''}`}>
        <Logo onClick={closeMenu}></Logo>
        <p className={styles.closeButton} onClick={closeMenu}>&#10005;</p>
        <div>
          <Link to='/' onClick={closeMenu}><p>Home</p></Link>
          <Link to='/list' onClick={closeMenu}><p>All view</p></Link>
          <Link to='/contact' onClick={closeMenu}><p>Contact</p></Link>
        </div>
      </div>
    </>
  );
}

export default Menu;
