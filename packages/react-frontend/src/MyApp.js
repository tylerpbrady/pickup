import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";
import Header from "./Header";
import GameDetailElement from "./GameDetails";
import ProfileForm from "./profile";
import ProfilePreview from "./profilePreview";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

// main function that will control the web app
function MyApp() {
  // state variables. Stores token and name into localstorage
  const saved_token = localStorage.getItem("token") || "INVALID_TOKEN";
  const saved_name = localStorage.getItem("name") || "INVALID_USER";
  const [token, setToken] = useState(saved_token);
  const [message, setMessage] = useState("");
  const [games, setGames] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const API_URL = "https://pickupapp.azurewebsites.net"

  // functions used for alerts to the user
  const validDeleteGame = () => toast.success("Game Deleted Successfully");
  const failedDeleteGame= () => toast.error("Error: Failed to Delete Game");

  // used to convert to local testing vvv
  // const API_URL = "http://localhost:8000"

  // function that will remove the game from the backend and from the current list
  function removeOneGame(index) {
    // attempt to remove it from backend database
    deleteGame(games[index]).then((deleted) => {
      if (deleted.status === 204) {
        const updated = games.filter((game, i) => {
          return i !== index;
        });
        // update current game data on frontend
        setGames(updated);
        validDeleteGame();
      } else {
        failedDeleteGame();
        console.log("Failed to delete game");
      }
    });
  }

  // update the list of games with new game
  function updateList(game) {
    // attempt to post the given game to the backend and make sure to check the results of the attmpt
    postGame(game)
      .then((response) => {
        if (response.status === 201) {
          return response.json();
        } else {
          console.log("Failed to update list. Invalid HTTP Code (not 201).");
        }
      })
      .then((updatedGame) => {
        // update game list if successful
        setGames([...games, updatedGame]);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // register authentication
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

  // fetch games from the backend
  function fetchGames() {
    const promise = fetch(`${API_URL}/games`, {
      headers: addAuthHeader({
        "Access-Control-Allow-Origin": "*",
      }),
    });
    return promise;
  }

  // fetch the user from the backend
  function fetchUser() {
    const promise = fetch(`${API_URL}/users/` + saved_name, {
      headers: addAuthHeader()
    });
    return promise;
  }

  // post the given game to the backend and return the promise
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

  // delete the given game from the backend
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

  // login a user with the backend
  // returns true if login successfully, false otherwise. 
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
            // make sure to register user with their token
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

  // sign up a new user with the backend
  // returns true if sign up is successful, false otherwise. 
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
            // register user with their token
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

  // will try and grab user and games on start if authenticated
  useEffect(() => {
    fetchGames()
      .then((res) => (res.status === 200 ? res.json() : undefined))
      .then((json) => {
        if (json) {
          // populate games
          setGames(json["games_list"]);
        } else {
          setGames(null);
        }
      })
      .catch((error) => {
        console.log(error);
      });

    fetchUser()
      .then((res) => (res.status === 200 ? res.json() : undefined))
      .then((json) => {
        if (json) {
          setProfiles({city: json[0].city, name: json[0].name, sports_of_interest: json[0].sports_of_interest});
        } else {
          setProfiles([]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token]);

  // for updating the profile page
  function postProfile(profile) {
    const promise = fetch(`${API_URL}/users/` + saved_name, {
      method: "POST",
      headers: addAuthHeader({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify(profile),
    });

    return promise;
  }

  // updating the profile info
  function UpdateProfileList(profile) { 
    // send profile info to backend
    postProfile(profile)
      .then(response => {
        if (response.status === 201) {
          return response.json();
        } else {
          console.log('Failed to update list. Invalid HTTP Code (not 201).');
        }
      })
      .then(updatedProfile => {
        // update local profile data
        setProfiles(updatedProfile);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  // define create game page
  function CreateGame({ updateList }) {
    return (
      <div>
        <Form handleSubmit={updateList} />
      </div>
    );
  }

  // define settings page
  function Set() {
    return (
      <div>
        <Settings Settings />
      </div>
    );
  }

  // define edit profile page
  function EditProfile() {
    return(
      <div>  
        <ProfileForm handleSubmit ={UpdateProfileList}/>
      </div>
    )
  }


  // define home page and pass necessary game data
  function Home({ games }) {
    return (
      <div>
        <Table gameData={games} removeGame={removeOneGame} />
        <ToastContainer
        position="top-center"
        />
      </div>
      
    );
  }

  // define the welcome page with login and create account buttons as well as greeting message
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

  /* In the routing system we used react component to split up the header onto only certain pages
   * we also used react routes, link and route to navigate to the various pages
   */
  // main return element to define the bulk of how our navigation through pages is coordinated
  // houses most of the main sub-pages
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
            path="/profile"
            element={
              <React.Fragment>
                <Header />
                <ProfilePreview profileData={profiles} />
              </React.Fragment>
            } 
          />
          <Route
            path="/edit-profile"
            element={
              <React.Fragment>
                <Header />
                <EditProfile path="/edit-profile" UpdateProfileList={UpdateProfileList}/>
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