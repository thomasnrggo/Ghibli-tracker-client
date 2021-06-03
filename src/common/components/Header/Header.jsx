import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';
import { store } from '../../context/store';
import {
  faChevronLeft,
  faSearch,
  faUser,
  faSignInAlt,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Login from '../Login/Login';
import Autocomplete from '../autocomplete/Autocomplete';
import styles from './Header.module.scss';
import { getFilms } from '../../utils/services';

export default function Header() {
  const [session, loading] = useSession();
  const { dispatch, state } = useContext(store);
  const { isSearchActive } = state;
  const [films, setFilms] = useState([]);
  const router = useRouter();

  let onSearchIconClick = () => {
    dispatch({ type: 'SEARCH_TRIGGER' });
  };

  function handleProfile() {
    router.push(
      !session ? '/?signin=true' : '/profile',
      !session ? '/signin' : '/profile'
    );
  }

  useEffect(() => {
    if (router.query.signin && !session && !loading)
      dispatch({ type: 'AUTH_TRIGGER' });

    getFilms()
      .then((res) => {
        setFilms(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [router]);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.menu__container}>
          <div className={styles.icon}>
            {router.pathname !== '/' ? (
              <FontAwesomeIcon
                icon={faChevronLeft}
                onClick={() => router.push('/')}
              />
            ) : (
              <FontAwesomeIcon
                icon={session ? faUser : faSignInAlt}
                onClick={handleProfile}
              />
            )}
          </div>

          <img
            className={styles.logo}
            src="/SVG/logo.svg"
            alt="Ghibli tracker"
          />

          <div className={`${styles.icon} ${styles.autocomplete__container}`}>
            {isSearchActive && (
              <div className={styles.search__container}>
                {films.length >= 1 && <Autocomplete suggestions={films} />}
              </div>
            )}
            <FontAwesomeIcon
              icon={faSearch}
              onClick={() => onSearchIconClick()}
            />
          </div>
        </div>
        {isSearchActive && (
          <div className={styles.search__onMobile}>
            {films.length >= 1 && <Autocomplete suggestions={films} />}
          </div>
        )}
      </header>

      <Login />
    </>
  );
}
