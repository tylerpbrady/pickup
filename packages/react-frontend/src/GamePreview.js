import React from 'react';

function GamePreviewBody(props) {  
    // Define styles as an object
    const rectangleStyles = {
			display: 'flex',
			flexDirection: 'row',
			justifyContent: 'space-between',
      width: '1000px',
      height: '300px',
      backgroundColor: '#D9D9D9',
      borderRadius: '15px',
      padding: '20px',
      //boxShadow: '2px 2px 5px #888888',
    };

		const buttonStyles = {
			marginLeft: 'auto',
			marginTop: 'auto'
		};

		const spacerStyles = {
			height: '10px', // Adjust the height of the spacer
		};

		const nameStyles = {
			fontSize: '1.5em', // Adjust the font size for row.name
			fontWeight: 'bold', // Set font weight to bold
		};
    const rows = props.characterData.map((row, index) => {
        return (
					<div key={index}>
						<div className='rounded-rectangle' style={rectangleStyles}>
							<div>
								<div style={{ marginBottom: '10px' }}>
									<span style={nameStyles}>{row.sport}</span>
								</div>
								<div style={{ marginBottom: '10px' }}>Time: {row.job}</div>
								<div style={{ marginBottom: '10px' }}>id: {row._id}</div>
								<div style={{ marginBottom: '10px' }}>Location: N/A</div>
								<div style={{ marginBottom: '10px' }}>Numbers: #/10</div>
							</div>
							<div style={buttonStyles}>
								<button onClick={() => props.removeCharacter(index)}>Delete</button>
							</div>
						</div>
						{index < props.characterData.length - 1 && <div style={spacerStyles} />} {/* Add spacer between rows */}
					</div>
        );
      });

    return (
        
        <tbody>{rows}</tbody>
    );
  }

  function GamePreviewElement(props) {
    return (
      <table>
        <GamePreviewBody
          characterData={props.characterData}
          removeCharacter={props.removeCharacter}
        />
      </table>
    );
  }
  
  
  export default GamePreviewElement;