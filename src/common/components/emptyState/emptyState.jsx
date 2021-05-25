import React from 'react'
import styles from './emptyState.module.scss'

export default function EmptyState(props) {
  let {children} = props
  
  return (
    <div className={styles.empty__container}>
      {children}
    </div>
  )
}
