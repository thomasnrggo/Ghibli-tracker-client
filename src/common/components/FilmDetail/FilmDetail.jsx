import React, { useState, useEffect, useContext, Fragment } from 'react'
import Modal from '../Modal/Modal'
import Loader from '../Loader/Loader'
import ReactStars from 'react-rating-stars-component';
import {store} from '../../context/store'
import { useSession } from 'next-auth/client';
import {getFilmsDetail, checkFilmRating} from '../../utils/services'
import styles from './FilmDetail.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

let example_image = 'https://filasiete.com/wp-content/uploads/2005/06/chihiro5.jpg'

export default function FilmDetail(props) {
  const { movie } = props
  const [session] = useSession();
  const {state, dispatch} = useContext(store)
  const { isOpen } = state
  const [selectedTab, setSelectedTab] = useState('synopsis')
  const [film, setFilm] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if(session){
      checkFilmRating(session.user.id, movie.id)
      .then(res => {
        if(res.length >= 1) {
          let {star_rating, watched, emoji_rating} = res[0]
          let filmScored = {
              ...movie,
              star_rating,
              emoji_rating,
              watched
          }
          setFilm(filmScored)
          setLoading(false)
        } else{
          setFilm(movie)
          setLoading(false)
        }
      })
      .catch(err => console.error(err))
    }else{
      setFilm(movie)
      setLoading(false)
    }
  }, [session])

  const handleModal = () => {
    dispatch({ type: 'MODAL_TRIGGER' });
  };

  let handleSelectedTab = (title) => {
    setSelectedTab(title)
  }

  let showReaction = reaction => {
    switch (reaction) {
      case 1:
        return  <span className={styles.emoji}>😭</span>
      case 2:
        return  <span className={styles.emoji}>😐</span>
      case 3:
        return  <span className={styles.emoji}>😍</span>
      default:
        break;
    }
  }

  let renderTabContent = () => {
    switch (selectedTab) {
      case 'synopsis':
        return (
          <div className={styles.content__body}>
              {film.description} 
            </div>
        )
      case 'rating':
        return (
          <div className={`${styles.content__body} ${styles.detail__group__container}`}>
            <div className={styles.detail__group}>
              <label>Audience score:</label>
              <div className='d-flex align-center'>
                <ReactStars
                  edit={false}
                  count={5}
                  size={20}
                  value={film.rt_score/20}
                  emptyIcon={<i className="far fa-star star-margin"></i>}
                  halfIcon={<i className="fa fa-star-half-alt star-margin"></i>}
                  filledIcon={<i className="fa fa-star star-margin"></i>}
                  activeColor="#d1c38b"
                  color="#30363D"
                />
                <h5>({film.rt_score})</h5>
              </div>
            </div>
            {session && film.watched && (
              <Fragment>
                <div className={styles.detail__group}>
                  <label>Your score:</label>
                  <div className='d-flex align-center'>
                    <ReactStars
                      edit={false}
                      count={5}
                      size={20}
                      value={film.star_rating}
                      emptyIcon={<i className="far fa-star star-margin"></i>}
                      halfIcon={<i className="fa fa-star-half-alt star-margin"></i>}
                      filledIcon={<i className="fa fa-star star-margin"></i>}
                      activeColor="#d1c38b"
                      color="#30363D"
                    />
                    <h5>({film.star_rating} of 5)</h5>
                  </div>
                </div>
                <div className={styles.detail__group}>
                  <label>How you felt:</label>
                  <h2>{showReaction(film.emoji_rating)}</h2>
                </div>
              </Fragment>
            )}
          </div>
        )
        case 'info':
      return (
        <div className={`${styles.content__body} ${styles.detail__group__container}`}>
          <div className={styles.detail__group}>
            <label>Original Title:</label>
            <h5>{film.original_title}</h5>
          </div>
          <div className={styles.detail__group}>
            <label>Original title romanised:</label>
            <h5>{film.original_title_romanised}</h5>
          </div>
          <div className={styles.detail__group}>
            <label>Title:</label>
            <h5>{film.title}</h5>
          </div>
          <div className={styles.detail__group}>
            <label>Director:</label>
            <h5>{film.director}</h5>
          </div>
          <div className={styles.detail__group}>
            <label>Producer:</label>
            <h5>{film.producer}</h5>
          </div>
          <div className={styles.detail__group}>
            <label>Release year:</label>
            <h5>{film.release_date}</h5>
          </div>
          <div className={styles.detail__group}>
            <label>Duration:</label>
            <h5>{film.running_time}min</h5>
          </div>
        </div>
      )
      default:
        break;
    }
  }

  return (
    <div className={`container ${styles.filmDetail__container}`}>
      {!loading ? (
        <Fragment>
          <div 
            className={styles.hero__container}
            style={{
              backgroundImage: `url(${example_image})` 
            }}
          >
            {film.watched && 
              <div className={styles.watched}>
                <span className={styles.watched__text}>Watched</span>
              </div>
            }
            <div className={styles.hero__body}>
              <div className={styles.poster__container}>
                <img className={'img-fluid'} src={film.cover_url} alt={film.title}/>
              </div>
              <h4 className={styles.subtitle}>{film.director}</h4>
              <h2 className={styles.title}>{film.title}</h2>
              <div className={styles.rating__container}>
                {!film.watched ? (
                  <Fragment>
                    <h4 className={styles.subtitle}>Audience score: {film.rt_score} </h4>
                  </Fragment>
                ) : (
                  <div className={styles.userScore__container}>
                    <ReactStars
                      classNames={styles.stars}
                      edit={false}
                      count={5}
                      size={20}
                      value={film.star_rating}
                      emptyIcon={<i className="far fa-star star-margin"></i>}
                      halfIcon={<i className="fa fa-star-half-alt star-margin"></i>}
                      filledIcon={<i className="fa fa-star star-margin"></i>}
                      activeColor="#fff"
                      color="#fff"
                    />
                    <h4 className={styles.subtitle}>{showReaction(film.emoji_rating)}</h4>
                  </div>
                )}
              </div>
              <div className={styles.actions__container}>
                <div className={`btn btn-primary  ${styles.action}`} onClick={() => handleModal()}>
                  Score film
                </div>
                <a className={`btn btn-primary ${styles.action}`} href={film.wiki_url} target='_blank'>
                  See on Wiki
                </a>
              </div>
            </div>
          </div>

          <div className={styles.detail__container}>
            <div className={styles.poster__container}>
              <img className={'img-fluid'} src={film.cover_url} alt={film.title}/>
            </div>
            <div className={styles.detail__body}>
              <div className={styles.content__container}>
                <div className={styles.content__header}>
                  <span className={`${styles.link} ${selectedTab === 'synopsis' && styles.active}`} onClick={() => handleSelectedTab('synopsis')}>Synopsis</span>
                  <span className={`${styles.link} ${selectedTab === 'rating' && styles.active}`} onClick={() => handleSelectedTab('rating')}>Rating</span>
                  <span className={`${styles.link} ${selectedTab === 'info' && styles.active}`} onClick={() => handleSelectedTab('info')}>Info</span>
                </div>
                {renderTabContent()}
              </div>
            </div>
          </div>
        </Fragment>
      ) : <Loader/>}
      

      <Modal
        isOpen={isOpen}
        onClose={() => handleModal()}
      >
        soy un modal
      </Modal>
    </div>
  )
}
