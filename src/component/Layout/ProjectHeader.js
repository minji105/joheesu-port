import React from 'react';
import './ProjectHeader.css';

function Header({ title }) {
  return (
    <>
      <div className="project-header">
        <h1 className='title'>{title}</h1>
      </div>
    </>
  );
}

export default Header;
