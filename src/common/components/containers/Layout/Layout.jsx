import React from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';

export default function Layout({ children }) {
  return (
    <>
      <Header className="container" />

      <main className="main container">{children}</main>

      <Footer />
    </>
  );
}
