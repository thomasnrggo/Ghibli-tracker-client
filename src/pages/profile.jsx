import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/client';
import ReactStars from 'react-rating-stars-component';
import Loader from '../common/components/Loader/Loader';
import Layout from '../common/components/Layout/Layout';
import ProgressBar from '../common/components/ProgressBar/ProgressBar';
import styles from '../styles/pages/profile.module.scss';
import axios from 'axios';
import { getFilmsByUser } from '../common/utils/services';
export default function profile() {
  const [session, loading] = useSession();
  const [userData, setUserData] = useState({
    emojis: [0, 0, 0],
    stars: 0,
    films: 0,
  });
  const router = useRouter();

  function getRatings(id) {
    getFilmsByUser(id).then((response) => {
      // Film count
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
    if (!session && !loading) router.push('/');
    if (!loading) getRatings(session.user.id);
  }, [session, loading]);

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

            <button
              className={`btn btn-primary ${styles.logout__btn}`}
              onClick={() => signOut({ callbackUrl: '/' })}
            >
              Log out
            </button>
          </div>

          <div className={styles.progress__container}>
            <h4 className={styles.section__title}>You have seen</h4>
            <div className={styles.progress__container}>
              <ProgressBar value={userData.films} max={22} />
            </div>
          </div>

          <div className={styles.rating__container}>
            <h4 className={styles.section__title}>Your stars</h4>

            <div className={styles.rating}>
              <ReactStars
                count={5}
                half={true}
                value={userData.stars}
                edit={false}
                size={58}
                activeColor="#d1c38b"
              />
              {`${userData.stars} of 5`}
            </div>
          </div>
          <div className={styles.reaction__container}>
            <h4 className={styles.section__title}>Your reactions</h4>

            <div className={styles.emojis__container}>
              <div className={styles.emoji__container}>
                <span className={styles.emoji}>😭</span>
                <h6>{userData.emojis[0]}</h6>
              </div>

              <div className={styles.emoji__container}>
                <span className={styles.emoji}>😐</span>
                <h6>{userData.emojis[1]}</h6>
              </div>

              <div className={styles.emoji__container}>
                <span className={styles.emoji}>🤩</span>
                <h6>{userData.emojis[2]}</h6>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
