import React from 'react';
import Head from 'next/head';
import Layout from '../common/components/Layout/Layout';

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
      </Layout>
    </>
  );
}
