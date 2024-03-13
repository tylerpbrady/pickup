import React from 'react';
import { Link } from 'react-router-dom';
import './profile.css'

function ProfilePreview({ profileData }) {
    // Function to display profile information
    const displayProfile = () => {
      return Object.keys(profileData).map((key, index) => (
        <div key={index} className="profile-field">
          <div className="profile-label">{key}:</div>
          <div className="profile-data">{profileData[key]}</div>
        </div>
      ));
    };
  
    return (
      <div id="profile-container">
        {/* Call displayProfile function to render profile information */}
        {displayProfile()}
        {/* Button */}
        
        <Link to="/edit-profile" className="button">Update Profile</Link>
      </div>
    );
  }
  
  export default ProfilePreview;