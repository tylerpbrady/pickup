import React from 'react';
import { Link } from 'react-router-dom';
import './profile.css'

// Displays profile boxes with titles, boxes are empty at first are then updated with profile data
// Made by Andrew Okerlund
function ProfilePreview({ profileData }) {
  // define the layout of the fields for each piece of profile data
  const displayProfile = () => {
    return Object.keys(profileData).map((key, index) => (
      <div key={index} className="profile-field">
        <div className="profile-label">{key}:</div>
        <div className="profile-data">{profileData[key]}</div>
      </div>
    ));
  };

  // return the actual layout including a button to edit the profile
  return (
    <div id="profile-container">
      {displayProfile()}
      <Link to="/edit-profile" className="button">Update Profile</Link>
    </div>
  );
}
  
  export default ProfilePreview;