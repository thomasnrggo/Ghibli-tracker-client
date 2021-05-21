import React from 'react';
import styles from './Detail.module.scss';
import movie from './movie.json';

export default function Detail(props) {
  return (
    <div className={styles.container}>
      <h1>{movie.title}</h1>
      <div className={styles.container__detail}>
        <img
          className={`${styles.col} ${styles.movieImage}`}
          src={movie.imageUrl}
          alt={movie.title}
        />
        <div className={`${styles.col} ${styles.movieDetails}`}>
          <p className={styles.firstItem}>
            <strong>Title:</strong> {movie.title}
          </p>
          <p>
            <strong>Genres:</strong>{' '}
            {movie.genres.map((genre) => genre.name).join(', ')}
          </p>
          <p>
            <strong>Description:</strong> {movie.overview}
          </p>
        </div>
      </div>
    </div>
  );
}
