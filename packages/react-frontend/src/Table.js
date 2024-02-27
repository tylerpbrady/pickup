// src/Table.js
import React from "react";
import GamePreviewElement from "./GamePreview";


const nameStyles = {
  fontSize: '2.0em', // Adjust the font size for row.name
  fontWeight: 'bold', // Set font weight to bold
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

function TableBody(props) {
  if (props.characterData === null) {
    return <caption>Data Unavailable</caption>;
  }
  // const rows = props.characterData.map((row, index) => {
  //     return (
  //         <tr key = {index}>
  //             <td>{row.name}</td>
  //             <td>{row.job}</td>
  //             <td>
  //                 <button onClick = {() => props.removeCharacter(index)}>
  //                     Delete
  //                 </button>
  //             </td>
  //             <td>
  //                 {row._id}
  //             </td>
  //         </tr>
  //     );
  // });

  return (
      <tbody>
          {/* {rows} */}
      </tbody>
      
  );
}

function Table(props) {
  return (
    <table>
      <TableHeader />
        <TableBody
          characterData = {props.characterData}

        />
      <GamePreviewElement
        gameData={props.gameData}
        removeGame={props.removeGame}
      />
    </table>
  );
}

export default Table;
