import React, { Fragment } from 'react';
import { useRouter } from 'next/router';
import ReactStars from 'react-rating-stars-component';
import styles from './Card.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';

export default function Card(props) {
  const router = useRouter();
  const {
    id,
    title,
    original_title,
    original_title_romanised,
    director,
    rt_score,
    release_date,
    running_time,
    cover_url,
  } = props.film;
  let watched = props.watched;
  let qualification = props.qualification && props.qualification[0];

  const handleOnCardClick = () => {
    router.push(`/film/${id}`);
  };

  let showReaction = (reaction) => {
    switch (reaction) {
      case 1:
        return <span className={styles.emoji}>😭</span>;
      case 2:
        return <span className={styles.emoji}>😐</span>;
      case 3:
        return <span className={styles.emoji}>🤩</span>;
      default:
        break;
    }
  };

  return (
    <div className={styles.card__container} onClick={() => handleOnCardClick()}>
      {watched && (
        <div className={styles.watched}>
          <span className={styles.watched__text}>Watched </span>
          <FontAwesomeIcon icon={faCheck} />
        </div>
      )}
      <div className={styles.card__thumbnail}>
        <Image
          className={`img-fluid ${styles.imgFluid}`}
          src={cover_url}
          width={233}
          height={331}
          objectFit={'cover'}
        />
      </div>
      <div className={styles.card__detail}>
        <h3 className={styles.subtitle}>{original_title || ''}</h3>
        <h2 className={styles.title}>
          {title || ''} <span>({release_date || 'release_date'})</span>
        </h2>
        <h4 className={styles.subtitle}>{original_title_romanised || ''}</h4>
        <h5 className={styles.director}>
          by <b>{director || 'director'}</b>
        </h5>

        <h6 className={styles.duration}>{running_time}min</h6>

        {watched ? (
          <Fragment>
            <h6 className={styles.score}>Your score:</h6>
            <div className={styles.rating}>
              <ReactStars
                edit={false}
                count={5}
                size={20}
                value={qualification.star_rating}
                emptyIcon={<i className="far fa-star star-margin"></i>}
                halfIcon={<i className="fa fa-star-half-alt star-margin"></i>}
                filledIcon={<i className="fa fa-star star-margin"></i>}
                activeColor="#d1c38b"
                color="#30363D"
              />
            </div>
            <div className={styles.reaction__container}>
              <h6 className={styles.score}>How you felt:</h6>
              <div className={styles.emoji__container}>
                {showReaction(qualification.emoji_rating)}
              </div>
            </div>
          </Fragment>
        ) : (
          <div className={styles.rt__container}>
            <h6 className={styles.score}>RT Audience score:</h6>
            <div className={styles.rating}>
              <ReactStars
                edit={false}
                count={5}
                size={20}
                value={rt_score / 20}
                emptyIcon={<i className="far fa-star star-margin"></i>}
                halfIcon={<i className="fa fa-star-half-alt star-margin"></i>}
                filledIcon={<i className="fa fa-star star-margin"></i>}
                activeColor="#d1c38b"
                color="#30363D"
              />
              ({rt_score})
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
