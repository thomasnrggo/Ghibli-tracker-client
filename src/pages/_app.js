import React from 'react';
import '../styles/global.scss';
import { ContextProvider } from '../common/context/store';

function MyApp({ Component, pageProps }) {
  return (
    <ContextProvider>
      <Component {...pageProps} />;
    </ContextProvider>
  );
}

export default MyApp;
