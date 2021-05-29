import React from 'react';
import MovieDetail from '../../../pages/film/[id]';
import films from '../../data/films.json';
import styles from './EspecificDetail.module.scss';

export default function Detail(props) {
  const IdPage = 0;

  return (
    <>
      <div className={styles.container}>
        <div className={styles.container__box1}>
          <p>
            <strong>run time </strong>
          </p>
          <p> {films[IdPage].running_time}</p>
        </div>
        <div className={styles.container__box1}>
          <p>
            <strong>release date</strong>
          </p>
          <p>{films[IdPage].release_date}</p>
        </div>
        <div className={styles.container__box1}>
          <p>
            <strong>rt. score</strong>
          </p>
          <p>{films[IdPage].rt_score}</p>
        </div>
        <div className={styles.container__box1}>
          <p>
            <strong>Link movie</strong>
          </p>
          <p>{films[IdPage].rt_score}</p>
        </div>
      </div>
    </>
  );
}
