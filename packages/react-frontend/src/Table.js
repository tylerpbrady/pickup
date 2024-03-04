// src/Table.js
import React from "react";
import GamePreviewElement from "./GamePreview";

const nameStyles = {
  fontSize: "2.0em", // Adjust the font size for row.name
  fontWeight: "bold", // Set font weight to bold
};

function TableHeader() {
  return (
    <thead>
      <div>
        <div style={nameStyles}>Current Games</div>
      </div>
    </thead>
  );
}


function Table(props) {
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
