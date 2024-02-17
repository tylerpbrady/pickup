// src/Form.js
import React, { useState } from "react";

function Form(props) {
  const [person, setPerson] = useState({
    sport: "",
    title: ""
  });

  // handle change and submit form has hacky fixes inplace
  // Will change when expanded
  function handleChange(event) {
    const { name, value } = event.target;
    if (name === "name")
      setPerson({ sport : value, title: value });
  }

  function submitForm() {
    props.handleSubmit(person);
    setPerson({ sport: "", title: "" });
  }

  return (
    <form>
      <label htmlFor="name">Sport</label>
      <input
        type="text"
        name="name"
        id="name"
        value={person.name}
        onChange={handleChange}
      />
      <label htmlFor="job">Time</label>
      <input
        type="text"
        name="job"
        id="job"
        value={person.job}
        onChange={handleChange}
      />
      <input type="button" value="Submit" onClick={submitForm} />
    </form>
  )
}
export default Form;
