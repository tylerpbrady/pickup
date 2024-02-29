// src/Form.js
import React, { useState } from "react";

function Form(props) {
  const [game, setGame] = useState({
    sport: "",
    title: "",
    time: ""
  });

  // const [set, setSetting] = useState({
  //   edit_profile: "",
  //   logout: ""
  // });

  // handle change and submit form has hacky fixes inplace
  // Will change when expanded
  function handleChange(event) {
    const { name, value } = event.target;
    if (name === "sport")
      setGame({ sport : value, title: game["title"], time: game["time"] });    
    else if (name === "title")
      setGame({ sport : game["sport"], title: value, time: game["time"] });    
    else if (name === "time")
      setGame({ sport : game["sport"], title: game["title"], time: value });
  }

  // function handleSettings(event) {
  //   const { name, value } = event.target;
  //   if (name === "edit profile")

  //     //setSetting({ sport : value, title: game["title"], time: game["time"] });    
  //   else if (name === "log out")
  //     //setSetting({ sport : game["sport"], title: value, time: game["time"] });    
  // }

  function submitForm() {
    props.handleSubmit(game);
    setGame({ sport: "", title: "", time: "" });
  }

  return (
    <form>
      <label htmlFor="title">Title</label>
      <input
        type="text"
        name="title"
        id="title"
        value={game.title}
        onChange={handleChange}
      />
      <label htmlFor="sport">Sport</label>
      <input
        type="text"
        name="sport"
        id="sport"
        value={game.sport}
        onChange={handleChange}
      />
      <label htmlFor="time">Time</label>
      <input
        type="text"
        name="time"
        id="time"
        value={game.time}
        onChange={handleChange}
      />
      <input type="button" value="Submit" onClick={submitForm} />
    </form>
  )
}
export default Form;
