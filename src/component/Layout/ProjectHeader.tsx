import React from 'react';
import styles from './ProjectHeader.module.scss';

function Header({ title }: { title: string }) {
  return (
    <>
      <div className={styles.projectHeader}>
        <h1 className={styles.title}>{title}</h1>
      </div>
    </>
  );
}

export default Header;
