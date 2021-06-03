import React from 'react'
import styles from './ProgressBar.module.scss'

export default function ProgressBar(props) {
  const { value, max } = props

  return (
    <div className={styles.progressBar__container}>
      <progress value={value} max={max} />
      <label className={styles.label}><b>{value}</b> of <b>{max}</b> Ghibi films seen.</label>
    </div>
  )
}
