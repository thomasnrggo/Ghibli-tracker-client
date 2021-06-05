import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

export default function Layout({ children }) {
  return (
    <>
      <Header className="container" />

      <main className="main container-fluid">{children}</main>

      <Footer />
    </>
  );
}
