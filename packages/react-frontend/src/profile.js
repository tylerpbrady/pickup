import React, { useState } from "react";


function Profile_form(props) {
  const [profile, setProfile] = useState({




    name: "",
    sports_of_interest: "",
    city: ""
  });




 
  function postProfile(profile) {
    console.log(profile)
    const promise = fetch("http://localhost:8000/profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(profile),
    });


    return promise;
  }


  function updateProfileList(profile) {
    postProfile(profile)
      .then(response => {
        if (response.status === 201) {
          return response.json();
        } else {
          console.log('Failed to update list. Invalid HTTP Code (not 201).');
        }
      })
      .then(updatedProfile => {
        console.log(updatedProfile.profile)
        setProfile([...profile, updatedProfile]);
      })
      .catch((error) => {
        console.log(error);
      })
  }


//   function Edit_profile() {
//     return(
//       <div>
       
//         <Profile_form edit_profile = {updateProfileList}/>
//       </div>
//     )
//   }


  //const [selectedDate, setSelectedDate] = useState('');
  //const [selectedTime, setSelectedTime] = useState('');
 


  // handle change and submit form has hacky fixes inplace
  // Will change when expanded
  function EditProfile(event) {
    const { name, value } = event.target;
    if (name === "sports of interest")
      setProfile({ ...profile, sports_of_interest: value });
    else if (name === "name")
      setProfile({ ...profile, name: value });
    else if (name === "city")
      setProfile({ ...profile, city: value })
  }


  function submitProfile() {
    props.handleSubmit(profile);
    setProfile({ name: "", sports_of_interest: "", city: ""});
  }


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


export default Profile_form;