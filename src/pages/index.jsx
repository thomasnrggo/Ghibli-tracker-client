import React from 'react';
import Head from 'next/head';
import Layout from '../common/components/containers/Layout/Layout';
import Card from '../common/components/containers/Card/Card';

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
        <div className="films__container">
          <Card/>
        </div>
      </Layout>
    </>
  );
}
