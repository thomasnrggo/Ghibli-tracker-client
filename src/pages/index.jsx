import React, { useContext, useEffect, useState } from 'react';
import Head from 'next/head';
import Layout from '../common/components/Layout/Layout';
import Card from '../common/components/Card/Card';
import styles from '../styles/pages/index.module.scss';
import Modal from '../common/components/Modal/Modal';
import response from '../common/data/films.json';
import { store } from '../common/context/store';

export default function Home() {
  const [films, setFilms] = useState([]);
  const { state, dispatch } = useContext(store);
  const { isOpen, modal } = state;

  useEffect(() => {
    setFilms(response);
  }, []);

  return (
    <>
      <Head>
        <title>Studio Ghibli Tracker</title>
        <meta
          name="description"
          content="Track your favorite movies from Studio Ghibli"
        />
      </Head>

      <Layout>
        <div className={styles.films__container}>
          {films ? (
            films.map((film) => <Card key={film.id} film={film} />)
          ) : (
            <h2>Cargando</h2>
          )}
        </div>

        <div onClick={() => dispatch({ type: 'MODAL_TRIGGER', modal: 'test' })}>
          try modal {`${isOpen}`}
        </div>

        {modal === 'test' ? (
          <Modal
            isOpen={isOpen}
            onClose={() => dispatch({ type: 'MODAL_TRIGGER' })}
          >
            <h2>Ich bin a modal</h2>
          </Modal>
        ) : (
          ''
        )}
      </Layout>
    </>
  );
}
