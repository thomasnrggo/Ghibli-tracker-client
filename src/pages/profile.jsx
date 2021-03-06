import React, { Fragment, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/client';
import ReactStars from 'react-rating-stars-component';
import Loader from '../common/components/Loader/Loader';
import Layout from '../common/components/Layout/Layout';
import ProgressBar from '../common/components/ProgressBar/ProgressBar';
import styles from '../styles/pages/profile.module.scss';
import { getFilmsByUser } from '../common/utils/services';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalf } from '@fortawesome/free-solid-svg-icons';

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
        stars: Math.round(avgStars * 10) / 10,
        films: filmCount,
      }));
    });
  }

  useEffect(() => {
    if (!session) router.push('/');
    if (session && !loading) getRatings(session?.user.id);
  }, [session, loading]);

  return (
    <Layout>
      {!session || loading ? (
        <Loader />
      ) : (
        <div className={`container ${styles.profile__container}`}>
          <div className={styles.user__container}>
            <Image
              className={`img-fluid ${styles.user__image}`}
              src={`${session.user.image || 'https://imgur.com/WxZS1Ff.jpg'}`}
              alt={'user'}
              width={150}
              height={150}
              objectFit={'cover'}
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
              <ProgressBar value={userData.films} max={25} />
            </div>
          </div>

          <div className={styles.rating__container}>
            <h4 className={styles.section__title}>Films average score</h4>

            <div className={styles.rating}>
              {userData.stars && (
                <Fragment>
                  <ReactStars
                    edit={false}
                    count={5}
                    size={48}
                    isHalf={true}
                    value={userData.stars}
                    emptyIcon={
                      <FontAwesomeIcon
                        className="star-margin start-size"
                        icon={faStar}
                      />
                    }
                    halfIcon={
                      <FontAwesomeIcon
                        icon={faStarHalf}
                        className="star-margin start-size"
                      />
                    }
                    filledIcon={
                      <FontAwesomeIcon
                        icon={faStar}
                        className="star-margin start-size"
                      />
                    }
                    activeColor="#d1c38b"
                    color="#30363D"
                  />
                  {`${userData.stars} of 5`}
                </Fragment>
              )}
            </div>
          </div>
          <div className={styles.reaction__container}>
            <h4 className={styles.section__title}>Films average reactions</h4>

            <div className={styles.emojis__container}>
              <div className={styles.emoji__container}>
                <span className={styles.emoji}>????</span>
                <h6>{userData.emojis[0]}</h6>
              </div>

              <div className={styles.emoji__container}>
                <span className={styles.emoji}>????</span>
                <h6>{userData.emojis[1]}</h6>
              </div>

              <div className={styles.emoji__container}>
                <span className={styles.emoji}>????</span>
                <h6>{userData.emojis[2]}</h6>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
