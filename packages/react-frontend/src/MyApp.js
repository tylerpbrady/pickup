import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";
import Header from "./Header";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateGamePage from './CreateGameWindow.js';

function MyApp() {
  const [characters, setCharacters] = useState([]);

  function removeOneCharacter(index) {
    deleteUser(characters[index])
    .then(deleted => {
      console.log(deleted.status)
      if (deleted.status === 204) {
        const updated = characters.filter((character, i) => {
          return i !== index;
        });
        setCharacters(updated);
      } else {
        console.log("Failed to delete user")
      }
    })
  }

  function updateList(person) { 
    postUser(person)
      .then(response => {
        if (response.status === 201) {
          return response.json();
        } else {
          console.log('Failed to update list. Invalid HTTP Code (not 201).');
        }
      })
      .then(updatedUser => {
        console.log(updatedUser.user)
        setCharacters([...characters, updatedUser]);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  function fetchUsers() {
    const promise = fetch("http://localhost:8000/games");
    return promise;
  }

  function postUser(person) {
    console.log(person)
    const promise = fetch("http://localhost:8000/games", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });

    return promise;
  }

  function deleteUser(person) {
    console.log(person._id)
    const promise = fetch(("http://localhost:8000/games/" + person._id), {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return promise;
  }

  useEffect(() => {
    fetchUsers()
      .then((res) => res.json())
      .then((json) => setCharacters(json["users_list"]))
      .catch((error) => { console.log(error); });
  }, [] );


function CreateGame({updateList }) {
  return (
    <div>
      <Form handleSubmit={updateList}/>
    </div>
  );
}

function Home({ characters }) {
  return (
    <div>
      <Table characterData={characters} />
    </div>
  );
}

return (
  <Router>
    <div className="container">
      <Header />
      <Routes>
        <Route path="/" element={<Home characters={characters}/>} />
        <Route path="/create-game" element={<CreateGame path="/create-game" updateList={updateList}/>} />
      </Routes>
    </div>
  </Router>
);
}

export default MyApp;