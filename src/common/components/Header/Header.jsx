import React from 'react';
import styles from './Header.module.scss';

export default function Header() {
  return (
    <>
      <header className={`${styles.header} container`}>
        <div className={`${styles.header__brand} h1`}>Ghibli Tracker</div>
      </header>
    </>
  );
}
