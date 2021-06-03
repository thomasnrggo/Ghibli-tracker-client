import React, { useEffect, useState, useContext } from 'react';
import styles from './Detail.module.scss';
import films from '../../data/films.json';
import { useRouter } from 'next/router';
import {getFilmsDetail} from '../../utils/services'
import Modal from '../Modal/Modal'
import { store } from '../../context/store';



export default function Detail(props) {
  const IdPage = 0;
  const { state, dispatch } = useContext(store);
  const { isOpen } = state;

  const [movie, setMovies] = useState(null);
  const router = useRouter();
  const { id } = router.query

  useEffect(() => {
    getFilmsDetail(id)
    .then(res => {
      setMovies(res);
    })
    .catch(err => {
      console.error(err)
    })
  }, [id]);

  const addMovie = () => {
    alert('Añadida a lista de peliculas vistas no olvides calificarla');
  };

  const removeMovie = () => {
    alert('Elimidada de la lista de peliculas vistas');
  };


  const handleModal = () => {
    dispatch({ type: 'MODAL_TRIGGER' });
  }

  if (!movie) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.container__detail}>
        <div className={styles.container_image}>
          <div>
            <img
              className={`${styles.col} ${styles.movieImage}`}
              src={movie.cover_url}
              alt={movie.title}
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
            <strong>TITLE: {movie.title}</strong>
          </p>
          <p>
            <strong>original title:</strong>
            {movie.original_title}
          </p>
          <p>
            <strong>director:</strong>
            {movie.director}
          </p>
          <p>
            <strong>producer:</strong>
            {movie.producer}
          </p>

          <p>
            <strong>Description:</strong> {movie.description}
          </p>
        </div>
      </div>

      <button onClick={() => handleModal()}>
        abrir modal
      </button>

      <Modal
        isOpen={isOpen}
        onClose={() => handleModal()}
      >
        estrellas
        emojis
      </Modal>
    </div>
  );
}
