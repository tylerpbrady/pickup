
import React, { useState } from "react";
// Provides a form and structure for the profile fields
// Handles the submission of a new profile which will be stored in fields and added to user data in the backend.
// Made by Andrew Okerlund
function ProfileForm(props) {
  const [profile, setProfile] = useState({
    name: "",
    sports_of_interest: "",
    city: ""
  });
  
  // function to handle edits made for the profile
  function EditProfile(event) {
    const { name, value } = event.target;
    if (name === "sports of interest")
      setProfile({ ...profile, sports_of_interest: value });
    else if (name === "name")
      setProfile({ ...profile, name: value });
    else if (name === "city")
      setProfile({ ...profile, city: value })
  }

  // function to handle submit and reset profile entries to default
  function submitProfile() {
    props.handleSubmit(profile);
    setProfile({ name: "", sports_of_interest: "", city: ""});
  }

  // define the frontend layout with the required elements of the profile
  return (
    <form>
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        name="name"
        id="name"
        value={profile.name}
        onChange={EditProfile}
      />
      <label htmlFor="sport of interest">Sports of interest:</label>
      <input
        type="text"
        name="sports of interest"
        id="sport"
        value={profile.sports_of_interest}
        onChange={EditProfile}
      />
      <label htmlFor="city">City:</label>
      <textarea
        type="text"
        name="city"
        id="city"
        value={profile.city}
        onChange={EditProfile}

        style={{ resize: 'none' }}
      />
      <input type="button" value="Submit" onClick={submitProfile} />
    </form>
  )
}

export default ProfileForm;