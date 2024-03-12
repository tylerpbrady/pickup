import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";
import Header from "./Header";
import GameDetailElement from "./GameDetails";

import {
  BrowserRouter as Router,
  Navigate,
  Link,
  Routes,
  Route,
} from "react-router-dom";

import Settings from "./settings";
import Login from "./Login";

import CreateAccountPage from "./CreateAccountPage";

function MyApp() {
  const saved_token = localStorage.getItem("token") || "INVALID_TOKEN";
  const saved_name = localStorage.getItem("name") || "INVALID_USER";
  const [token, setToken] = useState(saved_token);
  const [message, setMessage] = useState("");
  const [games, setGames] = useState([]);
  const API_URL = "https://pickupapp.azurewebsites.net"
  // const API_URL = "http://localhost:8000"

  function removeOneGame(index) {
    deleteGame(games[index]).then((deleted) => {
      if (deleted.status === 204) {
        const updated = games.filter((game, i) => {
          return i !== index;
        });
        setGames(updated);
      } else {
        console.log("Failed to delete game");
      }
    });
  }

  function updateList(game) {
    postGame(game)
      .then((response) => {
        if (response.status === 201) {
          return response.json();
        } else {
          console.log("Failed to update list. Invalid HTTP Code (not 201).");
        }
      })
      .then((updatedGame) => {
        setGames([...games, updatedGame]);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function addAuthHeader(otherHeaders = {}) {
    if (token === "INVALID_TOKEN") {
      return otherHeaders;
    } else {
      return {
        ...otherHeaders,
        Authorization: `Bearer ${token}`,
      };
    }
  }

  function fetchGames() {
    const promise = fetch(`${API_URL}/games`, {
      headers: addAuthHeader({
        "Access-Control-Allow-Origin": "*",
      }),
    });
    return promise;
  }

  // function fetchUsers() {
  //   const promise = fetch("http://localhost:8000/users");
  //   return promise;
  // }

  function postGame(game) {
    const promise = fetch(`${API_URL}/games`, {
      method: "POST",
      headers: addAuthHeader({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      }),
      body: JSON.stringify(game),
    });

    return promise;
  }

  function deleteGame(game) {
    const promise = fetch(
      `${API_URL}/games/` + game._id,
      {
        method: "DELETE",
        headers: addAuthHeader({
          "Content-Type": "application/json",
        }),
      },
    );

    return promise;
  }

  function loginUser(creds) {
    const promise = fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(creds),
    })
      .then((response) => {
        if (response.status === 200) {
          response.json().then((payload) => {
            setToken(payload.token);
            localStorage.setItem("token", payload.token);
          });
          setMessage(`Login successful; auth token saved`);
          return true
        } else {
          setMessage(`Login Error ${response.status}: ${response.data}`);
          return false
        }
      })
      .catch((error) => {
        setMessage(`Login Error: ${error}`);
        return false
      });
    return promise;
  }
  
  function signupUser(creds) {
    const promise = fetch(`${API_URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(creds),
    })
      .then((response) => {
        if (response.status === 201) {
          response.json().then((payload) => {
            setToken(payload.token);
            localStorage.setItem("token", payload.token);
          });
          setMessage(
            `Signup successful for user: ${creds.username}; auth token saved`,
          );
          return true
        } else {
          console.log(response);
          setMessage(`Signup Error ${response.status}: ${response.data}`);
          return false
        }
      })
      .catch((error) => {
        setMessage(`Signup Error: ${error}`);
        return false
      });

    return promise;
  }

  useEffect(() => {
    fetchGames()
      .then((res) => (res.status === 200 ? res.json() : undefined))
      .then((json) => {
        if (json) {
          setGames(json["games_list"]);
        } else {
          setGames(null);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token]);

  function CreateGame({ updateList }) {
    return (
      <div>
        <Form handleSubmit={updateList} />
      </div>
    );
  }

  function Set() {
    return (
      <div>
        <Settings Settings />
      </div>
    );
  }

  function Home({ games }) {
    return (
      <div>
        <Table gameData={games} removeGame={removeOneGame} />
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
          <Route path="/login" element={<Login handleSubmit={loginUser} />} />
          <Route
            path="/create-account"
            element={<CreateAccountPage handleSubmit={signupUser} />}
          />
          <Route
            path="/settings"
            element={
              <React.Fragment>
                <Header />
                <Set path="/settings" />
              </React.Fragment>
            }
          />
          <Route
            path="/game/:id"
            element={
              <React.Fragment>
                <Header />
                <GameDetailElement games={games} />
              </React.Fragment>
            }
          />
          <Route
            path="/home"
            element={
              <React.Fragment>
                <Header />
                <Home games={games} />
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
