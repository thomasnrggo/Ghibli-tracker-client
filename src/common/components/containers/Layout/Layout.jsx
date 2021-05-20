import React from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';

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
