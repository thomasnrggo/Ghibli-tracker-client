import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

export default function Layout({ children }) {
  return (
    <>
      <Header className="container" />
      {/* TODO: define if we are gointo to use a fluid container */}
      <main className="main container">{children}</main>

      <Footer />
    </>
  );
}
