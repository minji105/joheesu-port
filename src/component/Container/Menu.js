import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Menu.css';
import Logo from '../Layout/Logo';
import CloseButton from '../Buttons/CloseButton';

function Menu() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      closeMenu();
    }
  };

  useEffect(() => {
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
      <p className='menu-button' onClick={toggleMenu}>MENU</p>

      <div ref={menuRef} className={`menu-container ${menuOpen ? 'open' : ''}`}>
        <Logo onClick={closeMenu}></Logo>
        <CloseButton onClick={toggleMenu} style={{ left: '0' }} />
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
