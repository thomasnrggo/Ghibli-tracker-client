import React, { useEffect, useState } from 'react';
import MovieDetail from '../../../pages/film/[id]';
import films from '../../data/films.json';
import { useRouter } from 'next/router';
import styles from './EspecificDetail.module.scss';
import {getFilmsDetail} from '../../utils/services'


export default function Detail(props) {
  const IdPage = 0;
  const [movie, setMovies] = useState(null);
  const router = useRouter();
  const { id } =  router.query

  useEffect(() => {
    console.log(id);
    getFilmsDetail(id)
    .then(res => {
      setMovies(res)
    })
    .catch(err => {
      console.error(err);
    })
  }, [id]);

  if (!movie) {
    return null;
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.container__box1}>
          <p>
            <strong>run time </strong>
          </p>
          <p> {movie.running_time}</p>
        </div>
        <div className={styles.container__box1}>
          <p>
            <strong>release date</strong>
          </p>
          <p>{movie.release_date}</p>
        </div>
        <div className={styles.container__box1}>
          <p>
            <strong>rt. score</strong>
          </p>
          <p>{movie.rt_score}</p>
        </div>
        <div className={styles.container__box1}>
          <p>
            <strong>Link movie</strong>
          </p>
          <p>{movie.rt_score}</p>
        </div>
      </div>
    </>
  );
}
