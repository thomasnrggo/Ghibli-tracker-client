import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession, getSession } from 'next-auth/client';
import {
  faChevronLeft,
  faSearch,
  faUser,
  faSignInAlt,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Login from '../Login/Login';
import { store } from '../../context/store';

import styles from './Header.module.scss';

export default function Header() {
  const [session, loading] = useSession();
  const { dispatch } = useContext(store);
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

  async function sessionData() {
    const sessionData = await getSession();

    return sessionData;
  }

  useEffect(() => {
    if (router.query.signin && !session && !loading)
      dispatch({ type: 'AUTH_TRIGGER' });
  }, [router]);

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
            <>
              <FontAwesomeIcon
                icon={session ? faUser : faSignInAlt}
                onClick={handleProfile}
              />
            </>
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

      <Login />
    </>
  );
}
