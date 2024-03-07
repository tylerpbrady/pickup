// settings.js
import React from "react";
import { Link } from "react-router-dom";
import "./settings.css";

function Settings() {
  return (
    //<div className="settings">
    //<div className='rounded-rectangle' style={rectangleStyles}>
    <div>
      <Link to="/welcome" className="log-out-button">
        Logout
      </Link>
      <Link to="/edit-profile" className="edit-profile-button">
        Profile
      </Link>
    </div>
  );
}

export default Settings;
