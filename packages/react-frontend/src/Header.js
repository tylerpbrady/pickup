import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";


// this header persists on all pages except for prior to logging in
const Header = () => {
  return (
    <div
      className="header"
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        paddingBottom: "40px",
      }}
    >
      {/* "Pickup" in header that allows redirection to main landing page with all game postings */}
      <h1 className="large-title">
        <Link to="/home" style={{ textDecoration: "none", color: "inherit" }}>
          Pickup
        </Link>
      </h1>
      <div>
      {/* button to redirect to allow user to create a game */}
        <Link to="/create-game" className="create-game-button">
          Create Game
        </Link>
      {/* button to redirect the users profile page */}
        <Link to="/profile" className="profile-button">
          Profile
        </Link>
      {/* button to redirect to the user to settings to logout or go to profile */}
        <Link to="/settings" className="settings-button">
          Settings
        </Link>
      </div>
    </div>
  );
};

export default Header;
