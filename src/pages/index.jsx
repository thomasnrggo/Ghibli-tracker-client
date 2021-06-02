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
  faSortAmountDown,
  faSortAmountDownAlt,
} from '@fortawesome/free-solid-svg-icons';
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
  const { state } = useContext(store);
  const { isSearchActive } = state;
  const [query, setQuery] = useState('');
  const [reverse, setReverse] = useState(false);
  const [filterField, setFilterField] = useState('title');
  const [showFilters, setShowFilters] = useState(false);

  const getFilms = async () => {
    let res = await axios.get('https://masterghibli.herokuapp.com/films/');
    return res.data;
  };

  useEffect(() => {
    getFilms()
      .then((res) => {
        setFilms(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  let filter = (a, b) => {
    let order = [a, b];
    reverse && order.reverse();

    let A = order[0][filterField];
    let B = order[1][filterField];

    if (A > B) {
      return 1;
    }
    if (A < B) {
      return -1;
    }
    return 0;
  };

  const renderCards = () => {
    let allFilms = films;

    // TODO: we will keep this? filter by search result

    // let results = allFilms.filter((film) => {
    //   if (query == null) {
    //     return film;
    //   } else if (
    //     film.title.toLowerCase().includes(query.toLowerCase()) ||
    //     film.original_title.toLowerCase().includes(query.toLowerCase()) ||
    //     film.original_title_romanised.toLowerCase().includes(query.toLowerCase()) ||
    //     film.director.toLowerCase().includes(query.toLowerCase()) ||
    //     film.release_date.toString().toLowerCase().includes(query.toLowerCase())
    //   ) {
    //     return film;
    //   }
    // });

    // if (results.length >= 1) {
    //   return results.map((film) => <Card key={film.id} film={film} />);
    // } else {
    //   return NoSearchResults();
    // }
    return allFilms
      .sort(filter)
      .map((film) => <Card key={film.id} film={film} />);
  };

  let handleInputChange = (data) => {
    setQuery(data);
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

        <div className={styles.filter__container}>
          {showFilters && (
            <div className={styles.filterButton__container}>
              {filters.map((filter) => (
                <button
                  className={`${styles.filterButton} ${
                    filterField === filter.value ? styles.selected : ''
                  } `}
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
