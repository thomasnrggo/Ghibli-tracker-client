import React from 'react'
import { useRouter } from 'next/router'
import styles from './Card.module.scss'

export default function Card(props) {
  const router = useRouter()
  const {
    title,
    original_title,
    original_title_romanised,
    description,
    director,
    rt_score,
    release_date,
    running_time
  } = props
  const id = 'hola'

  const handleOnCardClik = () => {
    let id = 'test'
    router.push(`/film/${id}`)
  }

  return (
    <div className={styles.card__container} onClick={() => handleOnCardClik()}>
      <div className={styles.card__thumbnail}>
        <img
            className='img-fluid'
            src="https://images-na.ssl-images-amazon.com/images/I/51Mg8os52AL._AC_.jpg" 
            alt={`${title}_poster` || 'Film poster'} 
        />
      </div>
      <div className={styles.card__detail}>
        <h2 className={styles.title}>{title || 'Titulo'}</h2>
        <h3>{original_title || 'kimi no nawa'  }</h3>
        <p className={styles.description}>{description || 'description' }</p>
        <div className={styles.rating}>
          starts from rt o yours :eyes:
        </div>
        <div>Emoji systems</div>
      </div>
    </div>
  )
}
