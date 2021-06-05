import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

export default function Layout({ children, films }) {
  return (
    <>
      <Header className="container" films={films} />

      <main className="main container-fluid">{children}</main>

      <Footer />
    </>
  );
}
