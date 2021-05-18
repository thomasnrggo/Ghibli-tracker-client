import React from 'react';
import Button from '../../elements/Button/Button';

export default function Header() {
  return (
    <header className="header container">
      <div className="header__brand h1">Ghibli Tracker</div>

      <Button>
        <i className="fas fa-arrow-circle-right" aria-hidden="true" />
        Click here!
      </Button>
    </header>
  );
}
