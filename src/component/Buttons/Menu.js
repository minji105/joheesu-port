import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Menu.css';
import Logo from './Logo';

function Menu() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <>
      <p className='menu-button' onClick={toggleMenu}>MENU</p>

      <div className={`menu-container ${menuOpen ? 'open' : ''}`}>
        <Logo onClick={closeMenu}></Logo>
        <div class="close-button" onClick={toggleMenu}>&#10005;</div>
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
