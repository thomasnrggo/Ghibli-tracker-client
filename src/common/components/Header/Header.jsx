import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import {
  faChevronLeft,
  faSearch,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Login from '../Login/Login';
import { store } from '../../context/store';

import styles from './Header.module.scss';

export default function Header() {
  const { state, dispatch } = useContext(store);
  const { authModal } = state;
  const router = useRouter();

  let onSearchIconClick = () => {
    console.log('Click');
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.icon}>
          {router.pathname !== '/' ? (
            <FontAwesomeIcon
              icon={faChevronLeft}
              onClick={() => router.back()}
            />
          ) : (
            <FontAwesomeIcon
              icon={faUser}
              onClick={() =>
                dispatch({ type: 'AUTH_TRIGGER' })
              }
            />
          )}
        </div>

        <img className={styles.logo} src="/SVG/logo.svg" alt="Ghibli tracker" />

        <div className={styles.icon}>
          <FontAwesomeIcon
            icon={faSearch}
            onClick={() => onSearchIconClick()}
          />
        </div>
      </header>

      {authModal ? <Login /> : null}
    </>
  );
}
