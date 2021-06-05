import React from 'react';
import { useRouter } from 'next/router';
import Layout from '../../common/components/Layout/Layout';
import Detail from '../../common/components/Detail/Detail';
import { useSession } from 'next-auth/client';
import FilmDetail from '../../common/components/FilmDetail/FilmDetail';

export default function MovieDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [session, loading] = useSession();

  return (
    <Layout>
      {/* <Detail idMovie={id} session={session} loading={loading} /> */}
      <FilmDetail moviID={id}/>
    </Layout>
  );
}
