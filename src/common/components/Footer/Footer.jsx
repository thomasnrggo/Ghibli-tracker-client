import React from 'react';
import styles from './Footer.module.scss';

export default function Footer() {
  return (
    <footer className={`${styles.footer} container`}>
      <p className="text">
        Made with 💚 by{' '}
        <a
          className="link link-primary"
          href="https://juanda.dev"
          target="_blank"
          rel="noreferrer"
        >
          Juan Daniel Martínez
        </a>
        ,{' '}
        <a
          className="link link-primary"
          href="https://github.com/thomasnrggo"
          target="_blank"
          rel="noreferrer"
        >
          Anthony Gonzalez
        </a>
        , Luis Loaeza and Jonathan Reyes
      </p>
    </footer>
  );
}
