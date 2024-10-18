import React from 'react';
import './Header.css';

function Header({ macaronCount }) {
  return (
    <header className="header-container">
      <h1 className="header-title">Macaron Clicker</h1>
      <p className="header-subtitle">You have {macaronCount} macarons</p>
    </header>
  );
}

export default Header;