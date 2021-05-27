import React, { useContext, useState, useEffect } from 'react';
import { signIn } from 'next-auth/client';
import { useRouter } from 'next/router';
import { store } from '../../context/store';
import Modal from '../Modal/Modal';

import styles from './Login.module.scss';
import Alert from '../Alert/Alert';

export default function Login() {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });
  const [loginFormValidation, setLoginFormValidation] = useState({
    email: false,
    password: false,
  });
  const [signupData, setSignupData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [signupFormValidation, setSignupFormValidation] = useState({
    username: false,
    email: false,
    password: false,
  });
  const [error, setError] = useState({
    state: false,
    message: '',
  });
  const [currentTab, setCurrentTab] = useState('login');
  const { state, dispatch } = useContext(store);
  const { authModal } = state;
  const router = useRouter();

  function handleChange(e, type) {
    const { name, value } = e.target;
    const data = {};
    data[name] = value;

    const options = {
      login: () => setLoginData((state) => ({ ...state, ...data })),
      signup: () => setSignupData((state) => ({ ...state, ...data })),
    };

    return options[type]();
  }

  function validateForm(type) {
    let isValid = false;
    const validations = {
      login: {
        email: /\S+@\S+\.\S+/,
        password: /(?=.{8,})/,
      },
      signup: {
        username: /(?=.{8,20}$)[a-zA-Z0-9._]/,
        email: /\S+@\S+\.\S+/,
        password: /(?=.{8,})/,
      },
    };

    const options = {
      login: () => {
        const emailValidated = validations.login.email.test(
          loginData.email.trim().toLowerCase()
        );
        const passwordValidated = validations.login.password.test(
          loginData.password.trim()
        );

        setLoginFormValidation((state) => ({
          email: emailValidated,
          password: passwordValidated,
        }));

        emailValidated && passwordValidated
          ? (isValid = true)
          : (isValid = false);
      },
      signup: () => {
        const usernameValidated = validations.signup.username.test(
          signupData.username.trim().toLowerCase()
        );
        const emailValidated = validations.signup.username.test(
          signupData.email.trim().toLowerCase()
        );
        const passwordValidated = validations.signup.password.test(
          signupData.password.trim()
        );

        setSignupFormValidation((state) => ({
          username: usernameValidated,
          email: emailValidated,
          password: passwordValidated,
        }));

        usernameValidated && emailValidated && passwordValidated
          ? (isValid = true)
          : (isValid = false);
      },
    };

    options[type]();

    return isValid;
  }

  async function getLoginResponse(type) {
    const res = await signIn(type, {
      email: loginData.email,
      password: loginData.password,
      callbackUrl: `/`,
      redirect: false,
    });

    if (res?.error)
      setError({
        state: true,
        message: res.error,
      });
    if (res?.url) {
      router.push(res.url);
      dispatch({ type: 'AUTH_TRIGGER' });
      setError(false);
    }
  }

  function handleSubmit(e, form, type) {
    e.preventDefault();

    if (validateForm(form)) getLoginResponse(type);
  }

  async function handleFacebookLogin() {
    signIn('facebook', {
      callbackUrl: '/',
    });
  }

  function handleAuthModal() {
    router.push('/');
    dispatch({ type: 'AUTH_TRIGGER' });
  }

  useEffect(() => {
    if (router.query.error) {
    }
  }, [router]);

  return (
    <Modal
      selector={'#auth'}
      isOpen={authModal}
      onClose={handleAuthModal}
      className={styles.login__container}
    >
      <p className={`${styles.login__title} h3`}>
        {currentTab === 'login' ? 'Log In' : 'Sign Up'}
      </p>

      <form
        className={styles.login__form}
        onSubmit={(e) => handleSubmit(e, currentTab, 'credentials')}
      >
        {currentTab === 'login' ? (
          <>
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

            <div className={styles.login__buttons}>
              <button
                type="button"
                className={`btn btn-secondary ${styles.login__btn}`}
                onClick={() => setCurrentTab('signup')}
              >
                Sign Up
              </button>

              <button
                type="submit"
                className={`btn btn-primary ${styles.login__btn}`}
                formNoValidate="formnovalidate"
              >
                Log In{' '}
                <i
                  className={`fas fa-chevron-right ${styles.login__btn_icon}`}
                />
              </button>
            </div>
          </>
        ) : (
          <>
            <div
              className={`input__container ${
                signupFormValidation.username ? 'input-success' : 'input-error'
              }`}
            >
              <label htmlFor="username" className="input__label">
                username
                <input
                  type="text"
                  name="username"
                  id="username"
                  className="input"
                  placeholder="Your email here..."
                  value={signupData.username}
                  onChange={(e) => handleChange(e, 'signup')}
                />
              </label>

              <p className="input__helper">
                {!signupFormValidation.email &&
                  'Username must contain between 8 and 20 characters.'}
              </p>
            </div>

            <div
              className={`input__container ${
                signupFormValidation.email ? 'input-success' : 'input-error'
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
                  value={signupData.email}
                  onChange={(e) => handleChange(e, 'signup')}
                />
              </label>

              <p className="input__helper">
                {!signupFormValidation.email && 'Enter a valid email.'}
              </p>
            </div>

            <div
              className={`input__container ${
                signupFormValidation.password ? 'input-success' : 'input-error'
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
                  value={signupData.password}
                  onChange={(e) => handleChange(e, 'signup')}
                />
              </label>

              <p className="input__helper">
                {!signupFormValidation.password &&
                  'The password must contain 8 characters.'}
              </p>
            </div>

            <div className={styles.login__buttons}>
              <button
                type="submit"
                className={`btn btn-secondary ${styles.login__btn}`}
                onClick={() => setCurrentTab('login')}
              >
                Log In
              </button>

              <button
                type="submit"
                className={`btn btn-primary ${styles.login__btn}`}
                formNoValidate="formnovalidate"
              >
                Sign Up{' '}
                <i
                  className={`fas fa-chevron-right ${styles.login__btn_icon}`}
                />
              </button>
            </div>
          </>
        )}

        <Alert
          isOpen={error.state}
          type="error"
          onClose={() => setError(false)}
        >
          {`Error: ${error.message}`}
        </Alert>

        <hr className="divider" />

        <button
          className={`btn btn-facebook ${styles.login__btn}`}
          type="button"
          onClick={handleFacebookLogin}
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
