import React from 'react';
import styles from './Alert.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

export default function Alert({ isOpen, children, type, onClose }) {
  return (
    <div className={`${styles.alert} ${styles[type]} ${isOpen && 'show'}`}>
      <FontAwesomeIcon
        className={styles.alert_dismiss}
        icon={faTimes}
        onClick={onClose}
      />

      <p className={styles.alert_message}>{children}</p>
    </div>
  );
}
