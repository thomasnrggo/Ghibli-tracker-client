import React from 'react';
import { useRouter } from 'next/router';
import ReactStars from 'react-rating-stars-component';
import styles from './Card.module.scss';

export default function Card(props) {
  const router = useRouter();
  const {
    id,
    title,
    original_title,
    original_title_romanised,
    description,
    director,
    rt_score,
    release_date,
    running_time,
    cover_url
  } = props.film;

  const handleOnCardClik = () => {
    router.push(`/film/${id}`);
  };

  return (
    <div className={styles.card__container} onClick={() => handleOnCardClik()}>
      <div className={styles.card__thumbnail} style={{
        backgroundImage: `url(${cover_url})`
        }}>
      </div>
      <div className={styles.card__detail}>
        <h3 className={styles.subtitle}>
          {original_title || '天空の城ラピュタ'}
        </h3>
        <h2 className={styles.title}>{title || 'Castle in the Sky'}</h2>
        <h5 >{director || 'director'} - {release_date || 'release_date'}</h5>

        <div className={styles.rating}>
          <ReactStars
            count={5}
            half={true}
            value={rt_score/20}
            edit={false}
            size={20}
            activeColor="#d1c38b"
          />
        </div>
        <div className={styles.emoji__container}>
          <span className={styles.emoji}>😭</span>
          <span className={styles.emoji}>😐</span>
          <span className={styles.emoji}>🤩</span>
        </div>
      </div>
    </div>
  );
}
