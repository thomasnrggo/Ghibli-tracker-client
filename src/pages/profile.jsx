import React from 'react';
import { signOut } from 'next-auth/client';
import Layout from '../common/components/Layout/Layout';

export default function profile() {
  return (
    <Layout>
      <button
        className="btn btn-primary"
        onClick={() => signOut({ callbackUrl: '/' })}
      >
        Log out
      </button>
    </Layout>
  );
}
