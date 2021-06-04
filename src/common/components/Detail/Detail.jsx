import React, { useEffect, useState, useContext } from 'react';
import styles from './Detail.module.scss';
import films from '../../data/films.json';
import { useRouter } from 'next/router';
import { getFilmsDetail } from '../../utils/services';
import Modal from '../Modal/Modal';
import { store } from '../../context/store';

export default function Detail(props) {
  const IdPage = 0;
  const { state, dispatch } = useContext(store);
  const { isOpen } = state;

  const [movie, setMovies] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getFilmsDetail(id)
      .then((res) => {
        setMovies(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [id]);
  /* 
  const toggle = () => {
    const trailer = document.querySelector('.trailer');
    const video = document.querySelector('video');
    trailer.classList.toggle('active');
    video.currentTime = 0;
    video.pause();
  }; */

  const handleModal = () => {
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
            <img src={movie.cover_url} alt="" />
          </div>
          <p> {movie.description} </p>
          {/* espesific details */}

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
            {/* <div className={styles.container__box1}>
              <p>
                <strong>Link movie</strong>
              </p>
              <p>{movie.rt_score}</p>
            </div> */}
          </div>

          <a href="#" className={styles.play} onClick={() => handleModal()}>
            <img
              src="https://raw.githubusercontent.com/WoojinFive/CSS_Playground/master/Responsive%20Movie%20Landing%20Page/play.png"
              alt=""
            />
            rate movie
          </a>
          <a href="#" className={styles.play} onClick={() => handleModal()}>
            <img
              src="https://raw.githubusercontent.com/WoojinFive/CSS_Playground/master/Responsive%20Movie%20Landing%20Page/play.png"
              alt=""
            />
            Trailer
          </a>
          <div className={styles.slide}></div>
          <ul className={styles.sci}>
            <li>
              <a href="#">
                <img
                  src="https://raw.githubusercontent.com/WoojinFive/CSS_Playground/master/Responsive%20Movie%20Landing%20Page/facebook.png"
                  alt=""
                />
              </a>
            </li>
            <li>
              <a href="#">
                <img
                  src="https://raw.githubusercontent.com/WoojinFive/CSS_Playground/master/Responsive%20Movie%20Landing%20Page/twitter.png"
                  alt=""
                />
              </a>
            </li>
            <li>
              <a href="#">
                <img
                  src="https://raw.githubusercontent.com/WoojinFive/CSS_Playground/master/Responsive%20Movie%20Landing%20Page/instagram.png"
                  alt=""
                />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className={styles.trailer}>
        <Modal isOpen={isOpen} onClose={() => handleModal()}>
          estrellas emojis
        </Modal>

        <img
          src="https://raw.githubusercontent.com/WoojinFive/CSS_Playground/master/Responsive%20Movie%20Landing%20Page/close.png"
          alt=""
          className={styles.close}
          onClick={() => handleModal()}
        />
      </div>
    </>
  );
}
