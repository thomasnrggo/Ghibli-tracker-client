import React, { Fragment, useEffect, useState } from 'react';
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

let watchedByUser = [
  {
    id: 'c91ac357-fcbd-4c39-a90f-70f99c607bda',
    emoji_rating: 1,
    star_rating: 4,
    watched: true,
    user: 1,
    movie: 'bef239cd-9830-4fcb-bc86-b202c5eccfca',
  },
  {
    id: '2653737d-88d3-4f71-89a3-64bd1de1402e',
    emoji_rating: 2,
    star_rating: 3,
    watched: false,
    user: 1,
    movie: '0d9ebc22-ce3c-4ff5-bdcc-b7591d1cf9b4',
  },
];

export default function Home() {
  const [session, loading] = useSession();
  const [films, setFilms] = useState([]);
  const [userFilms, setUserFilms] = useState([]);

  const [reverse, setReverse] = useState(false);
  const [filterField, setFilterField] = useState('title');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    getFilms()
      .then((res) => {
        let films = res;
        let filmsByUser = [];
        
        if (session) {
          getFilmsByUser()
          .then(res => {
            let filterMovies  = res.filter(r => r.user === session.user.id )
            setUserFilms(filterMovies)
            return filterMovies
          })
          .then(res => {
            films.map((film) => {
              if (session) {
                let f = res.filter((e) => e.movie === film.id);
                if (f.length >= 1) {
                  let { emoji_rating, star_rating } = f[0];
                  let filmWithRating = { ...film, emoji_rating, star_rating };
                  filmsByUser.push(filmWithRating);
                } else {
                  let filmWithoutRating = {
                    ...film,
                    emoji_rating: null,
                    star_rating: null,
                  };
                  filmsByUser.push(filmWithoutRating);
                }
              } else {
                filmsByUser.push(film);
              }
            });
            setFilms(filmsByUser);
          })
          .catch(err => {
            console.error(err);
          })
        } else {
          setFilms(res);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [session]);

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

  return (
    <>
      <Head>
        <title>Studio Ghibli Tracker</title>
        <meta
          name="description"
          content="Track your favorite movies from Studio Ghibli"
        />
      </Head>

      <Layout>
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
          {films.length >= 1 && !loading ? (
            <Fragment>{renderCards()}</Fragment>
          ) : (
            <Loader />
          )}
        </div>
      </Layout>
    </>
  );
}
