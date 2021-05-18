import React from 'react';
import Head from 'next/head';
import Layout from '../common/components/containers/Layout/Layout';

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
        <p className="text">Hello World!</p>
      </Layout>
    </>
  );
}
