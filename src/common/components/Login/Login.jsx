import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import Modal from '../Modal/Modal';
import { store } from '../../context/store';

import styles from './Login.module.scss';

export default function Login() {
  const { state, dispatch } = useContext(store);
  const { isOpen } = state;

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => dispatch({ type: 'MODAL_TRIGGER', modal: 'login' })}
      className={styles.login__container}
    >
      <p className={`${styles.login__title} h3`}>Log in</p>

      <form className={styles.login__form} onSubmit={(e) => e.preventDefault()}>
        <div className="input__container">
          <label htmlFor="email" className="input__label">
            E-mail
            <input
              type="email"
              name="email"
              id="email"
              className="input"
              placeholder="Your email here..."
            />
          </label>
        </div>

        <div className="input__container">
          <label htmlFor="password" className="input__label">
            Password
            <input
              type="password"
              name="password"
              id="password"
              className="input"
              placeholder="Type your password..."
            />
          </label>
        </div>

        <button
          type="submit"
          className={`btn btn-primary ${styles.login__btn}`}
        >
          Enter{' '}
          <i className={`fas fa-chevron-right ${styles.login__btn_icon}`} />
        </button>

        <hr className="divider" />

        <button
          className={`btn btn-facebook ${styles.login__btn}`}
          type="button"
        >
          <i className="fab fa-facebook-f" /> Log in with Facebook
        </button>

        <button
          className={`btn btn-twitter ${styles.login__btn}`}
          type="button"
        >
          <i className="fab fa-twitter" /> Log in with Twitter
        </button>
      </form>
    </Modal>
  );
}
