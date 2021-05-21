import React from 'react';
import Layout from '../../common/components/containers/Layout/Layout';
import Detail from '../../common/components/containers/Detail/Detail';
import styles from '../../common/components/containers/Detail/Detail.module.scss';

export default function FilmDetail(props) {
  return (
    <>
      <Layout>
        <h1 className="h1">Tltle</h1>
        <Detail />
      </Layout>
    </>
  );
}
