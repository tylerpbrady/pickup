import React from "react";
import { useParams } from "react-router-dom";

// defining the style we want to use to create a rounded rectangle for the two info holders
const rectangleStyles = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  width: "500px",
  height: "500px",
  borderRadius: "15px",
  padding: "20px",
  border: "2px solid #000",
};

// function to define the game detail box
function GameDetailBody(props) {
  const game = props.game;

  // make sure we have a valid game
  if (!game) {
    return <div>Game not found</div>;
  }

  // specifies how we want to display the given attribute in the game details box
  function DetailItem({ label, value }) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "10px",
        }}
      >
        <div style={{ textAlign: "left", fontWeight: 600 }}>{label}:</div>
        <div style={{ textAlign: "right" }}>{value}</div>
      </div>
    );
  }

  // defining the layout we want to portray to the frontend for the detail rectangle box
  return (
    <div
      className="rounded-rectangle"
      style={{
        ...rectangleStyles,
        position: "relative",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          marginBottom: "10px",
          fontSize: "1.5em",
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        Details
      </div>
      <div style={{ marginBottom: "10px", flex: "1" }}>
        <DetailItem label="Sport" value={game.sport} />
        <DetailItem label="Time" value={new Date(game.time).toLocaleString()} />
        <DetailItem label="Location" value={game.location} />
        <DetailItem label="Numbers" value={`0/${game.maxPlayers}`} />
        <DetailItem label="Skill Level" value={`${game.skill}/10`} />
        <DetailItem label="Equipment Needed" value={game.equipment} />
        <div style={{ fontWeight: 600 }}>Description:</div>
        <div style={{ marginLeft: "20px" }}>{game.description}</div>
      </div>
    </div>
  );
}


// function to define the game players box
function GamePlayersDisplay(props) {
  const game = props.game;
  const numbers = Array.from(
    { length: game.maxPlayers },
    (_, index) => index + 1,
  );

  // defining front end layout, quite similar to layout of game detail box
  return (
    <div
      className="rounded rectangle"
      style={{
        ...rectangleStyles,
        position: "relative",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          marginBottom: "10px",
          fontSize: "1.5em",
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        Players
      </div>
      <div style={{ display: "flex", flexDirection: "column", flex: "1" }}>
        {numbers.map((number, index) => (
          <div key={index}>{number}.</div>
        ))}
      </div>
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <button>Join Game</button>
      </div>
    </div>
  );
}

// function to define the full game detail page element combining above two elements
function GameDetailElement(props) {
  const { id } = useParams();
  const gameId = id;
  const game = props.games && props.games.length && props.games.find((game) => game._id === gameId);

  //frontend layout; main title along with the two boxes for game details and players
  return (
    <div>
      <div
        style={{
          position: "fixed",
          top: "15%",
          left: "50%",
          transform: "translateX(-50%)",
          fontSize: "2.0em",
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        {game.title} 
      </div>
      <div
        style={{
          position: "fixed",
          top: "25%",
          left: "25%",
          transform: "translateX(-50%)",
        }}
      >
        <GameDetailBody game={game} />
      </div>
      <div
        style={{
          position: "fixed",
          top: "25%",
          left: "75%",
          transform: "translateX(-50%)",
        }}
      >
        <GamePlayersDisplay game={game} />
      </div>
    </div>
  );
}

export default GameDetailElement;
