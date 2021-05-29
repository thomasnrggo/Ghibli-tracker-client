import React from 'react';
import MovieDetail from '../../../pages/film/[id]';
import films from '../../data/films.json';
import styles from './Repertorie.module.scss';

export default function Detail(props) {
  const IdPage = 0;

  return (
    <div className={styles.images__container}>
      <figure>
        <img
          className={styles.images__box}
          width="200px"
          src="https://phantom-elmundo.unidadeditorial.es/c40925eef0ccfe0aeb87bdef0160c958/crop/0x0/694x1019/resize/473/f/webp/assets/multimedia/imagenes/2021/01/04/16097856968183.jpg"
          alt={films[IdPage].director}
        />
        <figcaption>{films[IdPage].director}</figcaption>
      </figure>
      <figure>
        <img
          className={styles.images__box}
          width="200px"
          src="https://m.media-amazon.com/images/M/MV5BNDM5OTc2NjI1MV5BMl5BanBnXkFtZTgwOTI3MjA4MTE@._V1_UX214_CR0,0,214,317_AL_.jpg"
          alt={films[IdPage].producer}
        />
        <figcaption>{films[IdPage].producer}</figcaption>
      </figure>
    </div>
  );
}
