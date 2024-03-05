import React from "react";
import { Link } from "react-router-dom";

function GamePreviewBody(props) {
  // Define styles as an object
  const rectangleStyles = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "1000px",
    height: "300px",
    backgroundColor: "#D9D9D9",
    borderRadius: "15px",
    padding: "20px",
  };

  const buttonStyles = {
    marginLeft: "auto",
    marginTop: "auto",
  };

  const spacerStyles = {
    height: "10px", // Adjust the height of the spacer
  };

  const nameStyles = {
    fontSize: "1.5em", // Adjust the font size for row.name
    fontWeight: "bold", // Set font weight to bold
  };

  const rows = props.gameData.map((game, index) => {
    return (
      <div key={index}>
        <div className="rounded-rectangle" style={rectangleStyles}>
          <div>
            <div style={{ marginBottom: "10px" }}>
              <span style={nameStyles}>{game.title}</span>
            </div>
            <div style={{ marginBottom: "10px" }}>Sport: {game.sport}</div>
            <div style={{ marginBottom: "10px" }}>
              Time: {new Date(game.time).toLocaleString()}
            </div>
            <div style={{ marginBottom: "10px" }}>id: {game._id}</div>
            <div style={{ marginBottom: "10px" }}>
              Location: {game.location}
            </div>
            <div style={{ marginBottom: "10px" }}>
              Numbers: #/{game.maxPlayers}
            </div>
            {/* This allows user to click "Details" to go to game details page */}
            <Link to={`/game/${game._id}`}>Details</Link>
          </div>
          <div style={buttonStyles}>
            <button onClick={() => props.removeGame(index)}>Delete</button>
          </div>
        </div>
        {index < props.gameData.length - 1 && <div style={spacerStyles} />}{" "}
        {/* Add spacer between rows */}
      </div>
    );
  });

  return rows;
}

function GamePreviewElement(props) {
  console.log(props.gameData)
  return (
    <div>
      <GamePreviewBody
        gameData={props.gameData}
        removeGame={props.removeGame}
      />
    </div>
  );
}

export default GamePreviewElement;
