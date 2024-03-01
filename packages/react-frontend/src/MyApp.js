import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";
import Header from "./Header";
import Login from "./Login";
import CreateAccountPage from "./CreateAccountPage";
import { BrowserRouter as Router, Routes, Route, Link, Navigate} from 'react-router-dom';
import GameDetailElement from "./GameDetails";

function MyApp() {

  const INVALID_TOKEN = "INVALID_TOKEN";
  const [token, setToken] = useState(INVALID_TOKEN);
  const [message, setMessage] = useState("");
  const [games, setGames] = useState([]);

  function removeOneGame(index) {
    deleteGame(games[index])
    .then(deleted => {
      console.log(deleted.status)
      if (deleted.status === 204) {
        const updated = games.filter((game, i) => {
          return i !== index;
        });
        setGames(updated);
      } else {
        console.log("Failed to delete game")
      }
    })
  }

  function updateList(game) { 
    postGame(game)
      .then(response => {
        if (response.status === 201) {
          return response.json();
        } else {
          console.log('Failed to update list. Invalid HTTP Code (not 201).');
        }
      })
      .then(updatedGame => {
        console.log(updatedGame.game)
        setGames([...games, updatedGame]);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  function addAuthHeader(otherHeaders = {}) {
    console.log("in auth header")
    console.log(token)
    if (token === INVALID_TOKEN) {
      return otherHeaders;
    } else {
      return {
        ...otherHeaders,
        Authorization: `Bearer ${token}`
      };
    }
  }
  
  function fetchGames() {
    const promise = fetch("http://localhost:8000/games", {
      headers: addAuthHeader()
    });
    return promise;
  }

  function fetchUsers() {
    const promise = fetch("http://localhost:8000/users");
    return promise;
}

  function postGame(game) {
    console.log(game)
    const promise = fetch("http://localhost:8000/games", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(game),
    });

    return promise;
  }

  function deleteGame(game) {
    console.log(game._id)
    const promise = fetch(("http://localhost:8000/games/" + game._id), {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return promise;
  }

  function loginUser(creds) {
    const promise = fetch(`http://localhost:8000/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(creds)
    })
      .then((response) => {
        if (response.status === 200) {
          response
            .json()
            .then((payload) => setToken(payload.token));
          setMessage(`Login successful; auth token saved`);
          console.log(token)
        } else {
          setMessage(
            `Login Error ${response.status}: ${response.data}`
          );
        }
      })
      .catch((error) => {
        setMessage(`Login Error: ${error}`);
      });
  
    return promise;
  }
  function signupUser(creds) {
    const promise = fetch(`http://localhost:8000/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(creds)
    })
      .then((response) => {
        if (response.status === 201) {
          response
            .json()
            .then((payload) => setToken(payload.token));
          setMessage(
            `Signup successful for user: ${creds.username}; auth token saved`
          );
        } else {
          console.log(response)
          setMessage(
            `Signup Error ${response.status}: ${response.data}`
          );
        }
      })
      .catch((error) => {
        setMessage(`Signup Error: ${error}`);
      });
  
    return promise;
  }

  useEffect(() => {
    fetchGames()
      .then((res) => 
        res.status === 200 ? res.json() : undefined)
      .then((json) => {
        if (json) {
          setGames(json["games_list"]);
        } else {
          setGames(null);
        }
      })
      .catch((error) => { console.log(error); });
  }, [] );


  function CreateGame({ updateList }) {
    return (
      <div>
        <Form handleSubmit={updateList}/>
      </div>
    );
  }

function Home({ fetchGames }) {
  fetchGames().then((res) => res.json()).then((json) => setGames(json["games_list"]))
  return (
    <div>
      <Table 
      gameData={games}
      removeGame={removeOneGame}
      />
    </div>
  );
}

function WelcomePage() {
  return (
    <div className="cont">
      <div className="box">
        <h1>Welcome to Pickup!</h1>
        <div className="button-container">
          <Link to="/login">
            <button>Login</button>
          </Link>
          <Link to="/create-account">
            <button>Create Account</button>
          </Link>
        </div>
      </div>
    </div>
    );
  }

return (
  <Router>
    <div className="container">
      <Routes>
        <Route path="/" element={<Navigate to="/welcome" />} />
        <Route path="/welcome" element={<WelcomePage />} />
        <Route
          path="/login"
          element={<Login handleSubmit={loginUser}/>}
        />
        <Route path="/create-account" element={<CreateAccountPage handleSubmit={signupUser}/>} />
        <Route 
            path="/game/:id" 
            element={ 
              <React.Fragment>
                <Header />
                <GameDetailElement games={games} /> 
              </React.Fragment>
            } />
        <Route
          path="/home"
          element={
            <React.Fragment>
              <Header />
              <Home fetchGames={fetchGames} />
            </React.Fragment>
          }
        />
        <Route
          path="/create-game"
          element={
            <React.Fragment>
              <Header />
              <CreateGame path="/create-game" updateList={updateList} />
            </React.Fragment>
          }
        />
      </Routes>
    </div>
  </Router>
);
}

export default MyApp;
