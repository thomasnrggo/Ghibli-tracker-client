import React from 'react';
import ReactDOM from 'react-dom';
import Client from './Client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import styles from './Modal.module.scss';

export default function Modal(props) {
  const { isOpen, children, onClose } = props;

  if (!isOpen) {
    return null;
  }

  return (
    <Client selector="#modal">
      <div className={styles.modal__container}>
        <div className={styles.modal}>
          <div className={styles.modal__trigger} onClick={onClose}>
            <FontAwesomeIcon icon={faTimes} />
          </div>
          {children}
        </div>
      </div>
    </Client>
  );
}
