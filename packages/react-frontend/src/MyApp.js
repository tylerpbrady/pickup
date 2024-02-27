import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";
import Header from "./Header";
import CreateAccountPage from "./CreateAccountPage";
import { BrowserRouter as Router, Routes, Route, Link, Navigate} from 'react-router-dom';



// const characters = [];

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

//   function removeOneCharacter(index) {
//     // const updated = characters.filter((character, i) => {
//     //     return i !== index;
//     // });
//     // setCharacters(updated);

//     const charId = characters[index]._id;
//     fetch(`Http://localhost:8000/users/${charId}`, {
//         method: "DELETE"
//     })
//     .then((response) => {
//         if (response.status === 204) {
//             const updated = characters.filter((character, i) => {
//                 return i !== index;

//             });
//             setCharacters(updated);
//         } else {
//             console.error("Failed to delete");
//         }
//     })
//     .catch((error) => {
//         console.log(error);
//     });
// }


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

  // useEffect(() => {
  //   fetchGames()
  //     .then((res) => res.json())
  //     .then((json) => setGames(json["games_list"]))
  //     .catch((error) => { console.log(error); });
  // }, [] );

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

function Home({ games }) {
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
          <Link to="/home">
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
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<WelcomePage />} />
        <Route path="/create-account" element={<CreateAccountPage />} />
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