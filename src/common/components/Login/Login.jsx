import React, { useContext, useState } from 'react';
import Modal from '../Modal/Modal';
import { store } from '../../context/store';

import styles from './Login.module.scss';

export default function Login() {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });
  const [loginFormValidation, setLoginFormValidation] = useState({
    email: false,
    password: false,
  });
  const { state, dispatch } = useContext(store);
  const { isOpen } = state;

  function handleChange(e, type) {
    const { name, value } = e.target;
    const data = {};
    data[name] = value;

    const options = {
      login: () => setLoginData((state) => ({ ...state, ...data })),
      signup: () => setSignupData(),
    };

    return options[type]();
  }

  function validateForm(type) {
    const { email, password } = loginData;

    const validations = {
      login: {
        email: /\S+@\S+\.\S+/,
        password: /(?=.{8,})/,
      },
    };
    const options = {
      login: () =>
        setLoginFormValidation((state) => ({
          email: validations.login.email.test(email.trim().toLowerCase()),
          password: validations.login.password.test(
            password.trim().toLowerCase()
          ),
        })),
    };

    return options[type]();
  }

  function handleSubmit(e, type) {
    e.preventDefault();
    validateForm(type);
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => dispatch({ type: 'MODAL_TRIGGER', modal: 'login' })}
      className={styles.login__container}
    >
      <p className={`${styles.login__title} h3`}>Log in</p>

      <form
        className={styles.login__form}
        onSubmit={(e) => handleSubmit(e, 'login')}
      >
        <div
          className={`input__container ${
            loginFormValidation.email ? 'input-success' : 'input-error'
          }`}
        >
          <label htmlFor="email" className="input__label">
            E-mail
            <input
              type="email"
              name="email"
              id="email"
              className="input"
              placeholder="Your email here..."
              value={loginData.email}
              onChange={(e) => handleChange(e, 'login')}
            />
          </label>

          <p className="input__helper">
            {!loginFormValidation.email && 'Enter a valid email.'}
          </p>
        </div>

        <div
          className={`input__container ${
            loginFormValidation.password ? 'input-success' : 'input-error'
          }`}
        >
          <label htmlFor="password" className="input__label">
            Password
            <input
              type="password"
              name="password"
              id="password"
              className="input"
              placeholder="Type your password..."
              value={loginData.password}
              onChange={(e) => handleChange(e, 'login')}
            />
          </label>

          <p className="input__helper">
            {!loginFormValidation.password &&
              'The password must contain 8 characters.'}
          </p>
        </div>

        <button
          type="submit"
          className={`btn btn-primary ${styles.login__btn}`}
          formNoValidate="formnovalidate"
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
