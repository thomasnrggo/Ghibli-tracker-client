import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/client';
import ReactStars from 'react-rating-stars-component';
import Loader from '../common/components/Loader/Loader';
import Layout from '../common/components/Layout/Layout';
import ProgressBar from '../common/components/ProgressBar/ProgressBar'
import styles from '../styles/pages/profile.module.scss';
import axios from 'axios';
export default function profile() {
  const [session, loading] = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session && !loading) router.push('/');
    console.log(session);
    // const getFilms = async () => {
    //   let url = 'https://masterghibli.herokuapp.com/films/';
    //   let res = await axios.get(url);
    //   return res.data;
    // };
    // getFilms();
  }, [session]);

  return (
    <Layout>
      {!session || loading ? (
        <Loader />
      ) : (
        <div className={`container ${styles.profile__container}`}>
          <div className={styles.user__container}>
            <img
              className={`img-fluid ${styles.user__image}`}
              src={`${session.user.image || 'https://imgur.com/WxZS1Ff.jpg'}`}
              alt={'user'}
            />
            <h2 className={`h2 ${styles.username}`}>{session.user.name}</h2>
          </div>

          <div className={styles.progress__container}>
            <h4 className={styles.section__title}>You have seen</h4>
            <div className={styles.progress__container}>
              <ProgressBar value={2} max={22}/>
            </div>
          </div>

          <div className={styles.rating__container}>
            <h4>Your stars</h4>
            <div className={styles.rating}>
              <ReactStars
                count={5}
                half={true}
                value={4}
                edit={false}
                size={18}
                activeColor="#d1c38b"
              />
            </div>
          </div>
          <div className={styles.reaction__container}>
            <h4>Your reactions</h4>

            <div className={styles.emojis__container}>
              <div className={styles.emoji__container}>
                <span className={styles.emoji}>😭</span>
                <h6>1</h6>
              </div>
              <div className={styles.emoji__container}>
                <span className={styles.emoji}>😐</span>
                <h6>2</h6>
              </div>
              <div className={styles.emoji__container}>
                <span className={styles.emoji}>🤩</span>
                <h6>65</h6>
              </div>
            </div>
          </div>

          <button
              className={`btn btn-primary ${styles.logout__btn}`}
              onClick={() => signOut({ callbackUrl: '/' })}
            >
              Log out
            </button>
        </div>
      )}
    </Layout>
  );
}
