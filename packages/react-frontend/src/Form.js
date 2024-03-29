// src/Form.js
import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Form(props) {
  // basic game attributes we want from the user
  const [game, setGame] = useState({
    sport: "",
    title: "",
    description: "",
    location: "",
    maxPlayers: 0,
    equipment: "",
    skill: 0,
    time: new Date(),
  });

  // set up date and time
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  // function used for alerts to the user
  const validCreateGame = () => toast.success("Creat Game Successful!");

  // function to handle user inputs and update the stored game attributes we want to post
  function handleChange(event) {
    const { name, value } = event.target;
    if (name === "sport") setGame({ ...game, sport: value });
    else if (name === "title") setGame({ ...game, title: value });
    else if (name === "description") setGame({ ...game, description: value });
    else if (name === "location") setGame({ ...game, location: value });
    else if (name === "maxPlayers") setGame({ ...game, maxPlayers: value });
    else if (name === "equipment") setGame({ ...game, equipment: value });
    else if (name === "skill") setGame({ ...game, skill: value });
    else if (name === "dateDate") {
      setSelectedDate(value);
      setGame({ ...game, time: new Date(`${value}T${selectedTime}`) });
    } else if (name === "dateTime") {
      setSelectedTime(value);
      setGame({ ...game, time: new Date(`${selectedDate}T${value}`) });
    }
  }

  // submits the form through a prop and resets all data to default values
  function submitForm() {
    props.handleSubmit(game);
    setGame({
      sport: "",
      title: "",
      description: "",
      location: "",
      maxPlayers: 0,
      equipment: "",
      skill: 0,
      time: new Date(),
    });
    validCreateGame();
  }

  return (
    // Create a form with all of the attributes that we require to make a game and allow user to enter data/info
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
      <label htmlFor="description">Description</label>
      <textarea
        type="text"
        name="description"
        id="description"
        value={game.description}
        onChange={handleChange}
        rows="2"
        style={{ resize: "none" }}
      />
      <label htmlFor="location">Location</label>
      <input
        type="text"
        name="location"
        id="location"
        value={game.location}
        onChange={handleChange}
      />
      <label htmlFor="maxPlayers">Max Players</label>
      <input
        type="number"
        name="maxPlayers"
        id="maxPlayers"
        value={game.maxPlayers}
        onChange={handleChange}
      />
      <label htmlFor="equipment">Equipment Needed</label>
      <input
        type="text"
        name="equipment"
        id="equipment"
        value={game.equipment}
        onChange={handleChange}
      />
      <label htmlFor="skill">Skill Level out of 10</label>
      <input
        type="number"
        name="skill"
        id="skill"
        value={game.skill}
        onChange={handleChange}
      />
      <label>
        Date
        <input
          type="date"
          name="dateDate"
          value={selectedDate}
          onChange={handleChange}
        />
      </label>
      <label>
        Time
        <input
          type="time"
          name="dateTime"
          value={selectedTime}
          onChange={handleChange}
        />
      </label>
      <input type="button" value="Submit" onClick={submitForm} />
      <ToastContainer  // lets the alert take form
        position="top-center"
      />
    </form>
  );
}

export default Form;
