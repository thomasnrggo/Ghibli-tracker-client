import React from 'react';
import ReactDOM from 'react-dom';
import styles from './Login.module.scss';

export default function Login({ isOpen, closeModal }) {
  if (typeof window === 'object') {
    return ReactDOM.createPortal(
      <div className={`${styles.login} ${isOpen && styles.isOpen}`}>
        <div className={`${styles.login__container}`}>
          <button className="btn btn-close" type="button" onClick={closeModal}>
            <i className="fas fa-times" />
          </button>

          <p className={`${styles.login__title} h3`}>Log in</p>

          <form
            className={`${styles.login__form}`}
            onSubmit={(e) => e.preventDefault()}
          >
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
        </div>
      </div>,
      document.getElementById('modal')
    );
  }

  return <></>;
}
