import React, { useState } from 'react'
import styles from './Autocomplete.module.scss'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRouter } from 'next/router'

export default function Autocomplete(props) {
  const router = useRouter();
  const [activeSuggestion, setActiveSuggestion] = useState(0)
  const [filteredSuggestions, setFilteredSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [inputValue, setInputValue] = useState("")

  let onChange = e => {
    const { suggestions } = props
    let value = e.target.value

    const filteredSuggestions = suggestions.filter(
      suggestion => 
      suggestion.title.toLowerCase().indexOf(value.toLowerCase()) > -1 || 
      suggestion.director.toLowerCase().indexOf(value.toLowerCase()) > -1 ||
      suggestion.release_date.toString().toLowerCase().indexOf(value.toLowerCase()) > -1 ||
      suggestion.original_title_romanised.toLowerCase().indexOf(value.toLowerCase()) > -1 ||
      suggestion.rt_score.toString().toLowerCase().indexOf(value.toLowerCase()) > -1 
    )
    setActiveSuggestion(0)
    setFilteredSuggestions(filteredSuggestions)
    setShowSuggestions(true)
    setInputValue(value)
    props.onChange(e.target.value)
  }

  let closeSuggestions = e => {
    setShowSuggestions(!showSuggestions)
  }

  let renderSuggestions = () => {
    if(filteredSuggestions.length >= 1) {
      return filteredSuggestions.map(item => (
        <div key={item.id} className={styles.suggestion__container} onClick={() => router.push(`/film/${item.id}`)}>
          <div className={styles.thumbnail} style={{backgroundImage: `url(${item.cover_url})`}}></div>
          <div className={styles.details}>
            <p><b>{item.title}</b> (<i>{item.original_title_romanised}</i>)</p>
            <p>Directed by {item.director} in <b>{item.release_date}</b></p>
          </div>
        </div>
      ))
    } else {
      return (
        <div className={styles.empty__suggestion}>
          There's no suggestion on that, try with a film name, director or year.
        </div>
      )
    }
  }

  return (
    <div className={styles.autocomplete__container}>
      <input 
        type="text"
        className='input'
        value={inputValue}
        placeholder='Search by name'
        onChange={onChange}
      />
      <span className={styles.close__btn} onClick={() => closeSuggestions()}>
        <FontAwesomeIcon icon={showSuggestions ? faChevronDown : faChevronUp}/>
      </span>

      <div className={styles.suggestions__container}>
        {showSuggestions && inputValue && renderSuggestions()} 
      </div>
    </div>
  )
}
