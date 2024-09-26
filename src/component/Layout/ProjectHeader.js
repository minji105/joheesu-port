import React from 'react';
import styles from './ProjectHeader.module.scss';

function Header({ title }) {
  return (
    <>
      <div className={styles.projectHeader}>
        <h1 className={styles.title}>{title}</h1>
      </div>
    </>
  );
}

export default Header;
