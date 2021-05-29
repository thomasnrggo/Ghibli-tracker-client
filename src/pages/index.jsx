import React, { Fragment, useEffect, useState } from 'react';
import { useSession } from 'next-auth/client';
import Head from 'next/head';
import Layout from '../common/components/Layout/Layout';
import Card from '../common/components/Card/Card';
import styles from '../styles/pages/index.module.scss';
import Loader from '../common/components/Loader/Loader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faSortAlphaDown, faSortAlphaUp } from '@fortawesome/free-solid-svg-icons';
import { getFilms } from '../common/utils/services'

import filters from '../common/utils/filters.json'

export default function Home() {
  const [session, loading] = useSession();
  const [films, setFilms] = useState([]);
  const [reverse, setReverse] = useState(false)
  const [filterField, setFilterField] = useState('title')
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    getFilms()
    .then(res => {
      setFilms(res);
    })
    .catch(err => {
      console.log(err);
    })
  }, []);

  let filter = (a, b) => {
    let order = [a,b]
    reverse && order.reverse()
    
    let A = order[0][filterField]
    let B = order[1][filterField]

    if (A >  B) {
      return 1;
    }
    if (A < B) {
      return -1;
    }
    return 0;
  }


  const renderCards = () => {
    return films.sort(filter).map((film) => <Card key={film.id} film={film} />)
  };

  let setFilter = filter => {
    setFilterField(filter)
  }

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
              {filters.map(filter => (
                <button key={filter.value} className={`${styles.filterButton} ${filterField === filter.value ? styles.selected : ''} `} onClick={() => setFilter(filter.value)}>
                  {filter.label}
                </button>
              ))}
            </div>
          )}
          <div className={styles.triggers__container}>
            <div className={`${styles.trigger} ${showFilters ? styles.active : ''}`} onClick={() => setShowFilters(!showFilters)}>
              <FontAwesomeIcon icon={faFilter} />
            </div>
            <div className={styles.trigger} onClick={() => setReverse(!reverse)}>
              {!reverse ? <FontAwesomeIcon icon={faSortAlphaDown}/> : <FontAwesomeIcon icon={faSortAlphaUp} />}
            </div>
          </div>
        </div>

        

        <div className={styles.films__container}>
          {films.length >= 1 && !loading ? (
            <Fragment>
              {renderCards()}
            </Fragment>
            
          ) : (
            <Loader />
          )}
        </div>

      </Layout>
    </>
  );
}
