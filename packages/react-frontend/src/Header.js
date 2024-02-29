import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <div className="header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <h1 className="large-title">
        <Link to="/home" style={{ textDecoration: 'none', color: 'inherit' }}>pickup</Link>
        <Link to="/home" style={{ textDecoration: 'none', color: 'inherit' }}>Pickup</Link>
      </h1>
      <div className="header-right">
        <Link to="/create-game" className="create-game-button">Create Game</Link>
        <Link to="/profile" className="profile-button">Profile</Link>
        <Link to="/settings" className="settings-button">Settings</Link>
      </div>
    </div>
  );
};

export default Header;
