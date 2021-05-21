import React from 'react';
import { useRouter } from 'next/router';
import {
  faChevronLeft,
  faSearch,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Header.module.scss';

export default function Header() {
  const router = useRouter();

  let onSearchIconClick = () => {
    console.log('Click');
  };

  return (
    <header className={styles.header}>
      <div className={styles.icon}>
        {router.pathname !== '/' ? (
          <FontAwesomeIcon icon={faChevronLeft} onClick={() => router.back()} />
        ) : (
          <FontAwesomeIcon icon={faUser} />
        )}
      </div>

      <img className={styles.logo} src="/SVG/logo.svg" alt="Ghibli tracker" />

      <div className={styles.icon}>
        <FontAwesomeIcon icon={faSearch} onClick={() => onSearchIconClick()} />
      </div>
    </header>
  );
}
