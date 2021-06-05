import React, { useEffect, useState, useContext } from 'react';
import styles from './Detail.module.scss';
import { postSendScore, getFilmsByUser } from '../../utils/services';
import Modal from '../Modal/Modal';
import { store } from '../../context/store';
import ProgressBar from '../../../common/components/ProgressBar/ProgressBar';
import ReactStars from 'react-rating-stars-component';
import stylesProfile from '../../../styles/pages/profile.module.scss';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlayCircle,
  faStar,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import {
  faFacebook,
  faInstagram,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';

export default function Detail({ movie, session, loading }) {
  const { state, dispatch } = useContext(store);
  const { isOpen } = state;

  const [userData, setUserData] = useState({
    emojis: [0, 0, 0],
    stars: 0,
    films: 0,
  });

  function getRatings(id) {
    getFilmsByUser(id).then((response) => {
      const filmCount = response.length;

      // Emojis count
      const emojiCount1 = response
        .map((rating) => rating.emoji_rating === 1)
        .reduce((acc, current) => acc + current);
      const emojiCount2 = response
        .map((rating) => rating.emoji_rating === 2)
        .reduce((acc, current) => acc + current);
      const emojiCount3 = response
        .map((rating) => rating.emoji_rating === 3)
        .reduce((acc, current) => acc + current);

      // Average stars count
      const avgStars =
        response
          .map((rating) => rating.star_rating)
          .reduce((acc, current) => acc + current) / filmCount;

      setUserData((state) => ({
        ...state,
        emojis: [emojiCount1, emojiCount2, emojiCount3],
        stars: parseInt(avgStars),
        films: filmCount,
      }));
    });
  }

  useEffect(() => {
    if (!loading) getRatings(session?.user.id);
  }, [session, loading]);

  const handleModal = () => {
    dispatch({ type: 'MODAL_TRIGGER' });
  };

  const HandlerSendScore = async () => {
    try {
      const res = await postSendScore({
        emojiRating: 3,
        startRating: 1,
        watched: true,
        user: session?.user.id,
        movie: id,
      });

      console.log(res);
    } catch (error) {
      console.error(error);
    }
    handleModal();
  };

  const handleModalTrailer = () => {
    dispatch({ type: 'MODAL_TRIGGER' });
  };

  if (!movie) {
    return null;
  }

  return (
    <>
      <div className={styles.banner}>
        <div className={styles.content}>
          <h2>
            <strong> {movie.title} </strong>
          </h2>
          <div className={styles.img}>
            <Image
              src={movie.cover_url}
              width={375}
              height={753}
              alt={`"${movie.title}" film cover`}
              objectFit={'cover'}
            />
          </div>
          <p> {movie.description} </p>
          {/* specific details */}

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
          </div>

          <span className={styles.play} onClick={() => handleModal()}>
            <FontAwesomeIcon icon={faStar} />
            rate movie
          </span>

          <span className={styles.play} onClick={() => handleModalTrailer()}>
            <FontAwesomeIcon icon={faPlayCircle} />
            Trailer
          </span>
          <div className={styles.slide}></div>
          <ul className={styles.sci}>
            <li>
              <a href="#">
                <FontAwesomeIcon icon={faFacebook} />
              </a>
            </li>
            <li>
              <a href="#">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
            </li>
            <li>
              <a href="#">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.trailer}>
        <Modal isOpen={isOpen} onClose={() => handleModal()}>
          <div className={`container ${stylesProfile.profile__container}`}>
            <div className={stylesProfile.user__container}>
              <Image
                className={`img-fluid ${stylesProfile.user__image}`}
                width={150}
                height={150}
                objectFit={'cover'}
                src={`${
                  session?.user.image || 'https://imgur.com/WxZS1Ff.jpg'
                }`}
                alt={'user'}
              />
              <h2 className={`h2 ${stylesProfile.username}`}>
                {session?.user.name}
              </h2>
              <button
                className={`btn btn-primary ${styles.logout__btn}`}
                onClick={() => HandlerSendScore()}
              >
                send score
              </button>
            </div>

            <div className={stylesProfile.progress__container}>
              <h4 className={stylesProfile.section__title}>You have seen</h4>
              <div className={stylesProfile.progress__container}>
                <ProgressBar value={userData.films} max={22} />
              </div>
            </div>

            <div className={stylesProfile.rating__container}>
              <h4 className={stylesProfile.section__title}>choose stars</h4>

              <div className={stylesProfile.rating}>
                <ReactStars
                  count={5}
                  half={true}
                  value={userData.stars}
                  edit={false}
                  size={18}
                  activeColor="#d1c38b"
                />
              </div>
            </div>
            <div className={stylesProfile.reaction__container}>
              <h4 className={stylesProfile.section__title}>
                choose reaction movies
              </h4>

              <div className={stylesProfile.emojis__container}>
                <div className={stylesProfile.emoji__container}>
                  <span className={stylesProfile.emoji}>😭</span>
                  <h6>{userData.emojis[0]}</h6>
                </div>
                <div className={stylesProfile.emoji__container}>
                  <span className={stylesProfile.emoji}>😐</span>
                  <h6>{userData.emojis[1]}</h6>
                </div>
                <div className={stylesProfile.emoji__container}>
                  <span className={stylesProfile.emoji}>🤩</span>
                  <h6>{userData.emojis[2]}</h6>
                </div>
              </div>
            </div>
          </div>
        </Modal>

        <FontAwesomeIcon
          icon={faTimes}
          className={styles.close}
          onClick={() => handleModal()}
        />
      </div>
    </>
  );
}
