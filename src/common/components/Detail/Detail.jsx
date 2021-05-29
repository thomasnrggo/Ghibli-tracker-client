import React from 'react';
import styles from './Detail.module.scss';
import films from '../../data/films.json';

export default function Detail(props) {
  const IdPage = 0;

  const addMovie = () => {
    alert('Añadida a lista de peliculas vistas no olvides calificarla');
  };

  const removeMovie = () => {
    alert('Elimidada de la lista de peliculas vistas');
  };

  return (
    <div className={styles.container}>
      <div className={styles.container__detail}>
        <div className={styles.container_image}>
          <div>
            <img
              className={`${styles.col} ${styles.movieImage}`}
              src={films[IdPage].poster}
              alt={films[IdPage].title}
            />
          </div>

          <div className={styles.container__button}>
            <button onClick={addMovie} className={styles.container__button_img}>
              <i className="fa-fw far fa-eye"></i>
            </button>

            <button onClick={addMovie} className={styles.container__button_img}>
              <i className="fa-fw fa fa-times"></i>
            </button>
          </div>
        </div>

        <div className={`${styles.col} ${styles.movieDetails}`}>
          <p className={styles.firstItem}>
            <strong>TITLE: {films[IdPage].title}</strong>
          </p>
          <p>
            <strong>original title:</strong>
            {films[IdPage].original_title}
          </p>
          <p>
            <strong>director:</strong>
            {films[IdPage].director}
          </p>
          <p>
            <strong>producer:</strong>
            {films[IdPage].producer}
          </p>

          <p>
            <strong>Description:</strong> {films[IdPage].description}
          </p>
        </div>
      </div>
    </div>
  );
}
