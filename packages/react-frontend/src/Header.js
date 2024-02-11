// src/Header.js
import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <div className="header">
      <h1 className="large-title">Pickup</h1>
        <div className="createGame">  
            <button className="create-game-button">Create Game</button>
        </div>
    </div>
  );
};

export default Header;