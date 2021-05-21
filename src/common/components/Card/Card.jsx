import React from 'react';
import { useRouter } from 'next/router';
import ReactStars from 'react-rating-stars-component';
import styles from './Card.module.scss';

export default function Card(props) {
  const router = useRouter();
  const {
    title,
    original_title,
    original_title_romanised,
    description,
    director,
    rt_score,
    release_date,
    running_time,
  } = props;
  const id = 'hola';

  const handleOnCardClik = () => {
    // let id = 'test';
    // router.push(`/film/${id}`);
  };

  const ratingChanged = (newRating) => {
    console.log(newRating);
  };

  return (
    <div className={styles.card__container} onClick={() => handleOnCardClik()}>
      <div className={styles.card__thumbnail}>
        <img
          className="img-fluid"
          src="https://images-na.ssl-images-amazon.com/images/I/51Mg8os52AL._AC_.jpg"
          alt={`${title}_poster` || 'Film poster'}
        />
      </div>
      <div className={styles.card__detail}>
        <h3 className={styles.subtitle}>
          {original_title || '天空の城ラピュタ'}
        </h3>
        <h2 className={styles.title}>{title || 'Castle in the Sky'}</h2>
        <div className={styles.rating}>
          <ReactStars
            count={5}
            half={true}
            value={3}
            edit={false}
            size={20}
            activeColor="#ffd700"
          />
        </div>
        <p className={styles.description}>{description || 'description'}</p>
        <div className={styles.emoji__container}>
          <span className={styles.emoji}>😭</span>
          <span className={styles.emoji}>😐</span>
          <span className={styles.emoji}>🤩</span>
        </div>
      </div>
    </div>
  );
}
