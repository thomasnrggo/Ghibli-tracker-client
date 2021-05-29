import React from 'react';
import Layout from '../../common/components/Layout/Layout';
import Detail from '../../common/components/Detail/Detail';
import EspecificDetail from '../../common/components/EspecificDetail/EspecificDetail';
import Repertorie from '../../common/components/Repertorie/Repertorie';

export default function MovieDetail(props) {
  return (
    <>
      <Layout>
        <Detail />
        <EspecificDetail />
        <Repertorie />
      </Layout>
    </>
  );
}
