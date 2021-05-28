import React from 'react';
import '../styles/global.scss';
import { ContextProvider } from '../common/context/store';
import { Provider as AuthProvider } from 'next-auth/client';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider session={pageProps.session}>
      <ContextProvider>
        <Component {...pageProps} />;
      </ContextProvider>
    </AuthProvider>
  );
}

export default MyApp;
