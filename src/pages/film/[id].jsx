import React from 'react';
import Layout from '../../common/components/Layout/Layout';
import { getFilms, getFilmsDetail } from '../../common/utils/services';
import FilmDetail from '../../common/components/FilmDetail/FilmDetail';

export default function MovieDetail({ movie }) {
  return (
    <Layout>
      <FilmDetail movie={movie} />
    </Layout>
  );
}

export async function getStaticPaths() {
  const films = await getFilms();

  const paths = films.map((film) => ({
    params: { id: film.id },
  }));

  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  const movie = await getFilmsDetail(params.id);

  return {
    props: { movie },
  };
}
