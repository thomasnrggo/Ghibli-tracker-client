import React, { Fragment, useContext, useEffect, useState } from 'react';
import Head from 'next/head';
import Layout from '../common/components/Layout/Layout';
import Card from '../common/components/Card/Card';
import styles from '../styles/pages/index.module.scss';
import response from '../common/data/films.json';
import { store } from '../common/context/store';
import EmptyState from '../common/components/emptyState/emptyState';
import Autocomplete from '../common/components/autocomplete/autocomplete';
import Loader from '../common/components/Loader/Loader';

export default function Home() {
  const [films, setFilms] = useState([]);
  const { state } = useContext(store);
  const { isSearchActive } = state;
  const [query, setQuery] = useState('');

  useEffect(() => {
    setTimeout(() => {
      setFilms(response);
    }, 5000);
  }, []);

  const handleSearchInputChange = (e) => {
    setQuery(e.target.value);
  };

  const NoSearchResults = () => (
    <EmptyState>
      <h2 className="h5">
        Ups... Looks like the movie your looking for doesn't exists.
      </h2>
    </EmptyState>
  );

  const renderCards = () => {
    let allFilms = films;
    let results = allFilms.filter((film) => {
      if (query == null) {
        return film;
      } else if (
        film.title.toLowerCase().includes(query.toLowerCase()) ||
        film.original_title.toLowerCase().includes(query.toLowerCase()) ||
        film.original_title_romanised
          .toLowerCase()
          .includes(query.toLowerCase()) ||
        film.director.toLowerCase().includes(query.toLowerCase()) ||
        film.release_date.toLowerCase().includes(query.toLowerCase())
      ) {
        return film;
      }
    });

    if (results.length >= 1) {
      return results.map((film) => <Card key={film.id} film={film} />);
    } else {
      return NoSearchResults();
    }
  };

  let handleInputChange = (data) => {
    setQuery(data);
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
        {isSearchActive && (
          <Fragment>
            <div className={styles.search__container}>
              <label className="h2">Search</label>
              {films.length >= 1 && (
                <Autocomplete
                  suggestions={films}
                  onChange={handleInputChange}
                />
              )}
            </div>
          </Fragment>
        )}

        <div className={styles.films__container}>
          {films.length >= 1 ? (
            <Fragment>{renderCards()}</Fragment>
          ) : (
            <Loader />
          )}
        </div>
      </Layout>
    </>
  );
}
