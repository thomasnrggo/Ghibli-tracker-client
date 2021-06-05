import React from 'react';
import Layout from '../../common/components/Layout/Layout';
import Detail from '../../common/components/Detail/Detail';
import { useSession } from 'next-auth/client';
import { getFilms, getFilmsDetail } from '../../common/utils/services';

export default function MovieDetail({ movie }) {
  const [session, loading] = useSession();

  return (
    <Layout>
      <Detail movie={movie} session={session} loading={loading} />
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
