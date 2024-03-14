// settings.js
import React from "react";
import { Link } from "react-router-dom";
import "./settings.css";

//Settings layout and button design
//Made by Andrew Okerlund
function Settings() {
  return (
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
