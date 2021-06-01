import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/client';
import Loader from '../common/components/Loader/Loader';
import Layout from '../common/components/Layout/Layout';

export default function profile() {
  const [session, loading] = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session && !loading) router.push('/');
  }, [session, loading]);

  return (
    <Layout>
      {!session || loading ? (
        <Loader />
      ) : (
        <button
          className="btn btn-primary"
          onClick={() => signOut({ callbackUrl: '/' })}
        >
          Log out
        </button>
      )}
    </Layout>
  );
}
