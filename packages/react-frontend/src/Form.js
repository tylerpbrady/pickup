// src/Form.js
import React, { useState } from "react";

function Form(props) {
  const [game, setGame] = useState({
    sport: "",
    title: ""
  });

  // handle change and submit form has hacky fixes inplace
  // Will change when expanded
  function handleChange(event) {
    const { name, value } = event.target;
    if (name === "name")
      setGame({ sport : value, title: value });
  }

  function submitForm() {
    props.handleSubmit(game);
    setGame({ sport: "", title: "" });
  }

  return (
    <form>
      <label htmlFor="name">Sport</label>
      <input
        type="text"
        name="name"
        id="name"
        value={game.name}
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
