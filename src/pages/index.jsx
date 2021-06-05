import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/client';

import Head from 'next/head';
import Layout from '../common/components/Layout/Layout';
import Card from '../common/components/Card/Card';
import styles from '../styles/pages/index.module.scss';
import Loader from '../common/components/Loader/Loader';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFilter,
  faSortAlphaDown,
  faSortAlphaUp,
} from '@fortawesome/free-solid-svg-icons';
import { getFilms, getFilmsByUser } from '../common/utils/services';

import filters from '../common/utils/filters.json';

export default function Home({ films }) {
  const [session, loading] = useSession();
  const [userFilms, setUserFilms] = useState([]);

  const [reverse, setReverse] = useState(false);
  const [filterField, setFilterField] = useState('title');
  const [showFilters, setShowFilters] = useState(false);

  async function matchUserDataWithFilms() {
    const userFilms = await getFilmsByUser(session?.user.id).then((res) =>
      setUserFilms(res)
    );

    return userFilms;
  }

  let filter = (a, b) => {
    let order = [a, b];
    reverse && order.reverse();

    let A = `${order[0][filterField]}`;
    let B = `${order[1][filterField]}`;

    if (A > B) {
      return 1;
    }
    if (A < B) {
      return -1;
    }
    return 0;
  };

  const renderCards = () => {
    return films
      .sort(filter)
      .map((film) => (
        <Card
          key={film.id}
          film={film}
          watched={session && userFilms.some((e) => e.movie === film.id)}
          qualification={
            session && userFilms.filter((e) => e.movie === film.id)
          }
        />
      ));
  };

  let setFilter = (filter) => {
    setFilterField(filter);
  };

  useEffect(() => {
    if (session && !loading) matchUserDataWithFilms();
  }, [session, loading]);

  return (
    <>
      <Head>
        <title>Studio Ghibli Tracker</title>

        <meta
          name="description"
          content="Track and rate your favorite movies from Studio Ghibli"
        />
      </Head>

      <Layout films={films}>
        <div className={styles.filter__container}>
          {showFilters && (
            <div className={styles.filterButton__container}>
              {filters.map((filter) => (
                <button
                  key={filter.value}
                  className={`${styles.filterButton} ${
                    filterField === filter.value ? styles.selected : ''
                  } ${filter.needAuth && !session ? 'd-none' : ''}`}
                  onClick={() => setFilter(filter.value)}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          )}
          <div className={styles.triggers__container}>
            <div
              className={`${styles.trigger} ${
                showFilters ? styles.active : ''
              }`}
              onClick={() => setShowFilters(!showFilters)}
            >
              <FontAwesomeIcon icon={faFilter} />
            </div>
            <div
              className={styles.trigger}
              onClick={() => setReverse(!reverse)}
            >
              {!reverse ? (
                <FontAwesomeIcon icon={faSortAlphaDown} />
              ) : (
                <FontAwesomeIcon icon={faSortAlphaUp} />
              )}
            </div>
          </div>
        </div>

        <div className={styles.films__container}>
          {films.length >= 1 && !loading ? renderCards() : <Loader />}
        </div>
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  const films = await getFilms();

  return {
    props: {
      films,
    },
    revalidate: 10,
  };
}
