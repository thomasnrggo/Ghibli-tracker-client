import React from 'react';
import Head from 'next/head';
import Layout from '../common/components/Layout/Layout';
import Card from '../common/components/Card/Card';
import styles from '../styles/pages/index.module.scss';
import Modal from '../common/components/Modal/Modal';

export default function Home() {
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
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </div>

        <Modal isOpen={true}>
          <h2>Ich bin a modal</h2>
        </Modal>
      </Layout>
    </>
  );
}
