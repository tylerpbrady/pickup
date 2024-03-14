// src/Table.js
import React from "react";
import GamePreviewElement from "./GamePreview";

const nameStyles = {
  fontSize: "2.0em", // Adjust the font size for row.name
  fontWeight: "bold", // Set font weight to bold
};

// define the table header with the title
function TableHeader() {
  return (
    <thead>
      <div>
        <div style={nameStyles}>Current Games</div>
      </div>
    </thead>
  );
}

// define the full table with the title and the game previews populating the bulk of the table body
function Table(props) {
  // make sure game data exists
  if (props.gameData === null) {
    return <caption>Data Unavailable</caption>;
  }
  return (
    <table>
      <TableHeader />
      <GamePreviewElement
        gameData={props.gameData}
        removeGame={props.removeGame}
      />
    </table>
  );
}

export default Table;
