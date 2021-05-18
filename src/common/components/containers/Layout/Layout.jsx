import React from 'react';
import Header from '../Header/Header';

export default function Layout({ children }) {
  return (
    <>
      <Header className="container" />

      <main className="main container">{children}</main>
    </>
  );
}
