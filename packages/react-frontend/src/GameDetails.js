import React from "react";
import { useParams } from 'react-router-dom';

const rectangleStyles = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '500px',
    height: '400px',
    //backgroundColor: '#D3EBF0',
    borderRadius: '15px',
    padding: '20px',
    border: '2px solid #000',
};


function GameDetailBody(props) {
    const game = props.game;
  
    if (!game) {
      return <div>Game not found</div>;
    }
  
    // Rest of component logic using the 'game' variable
    return (
        <div className="rounded-rectangle" style={{ ...rectangleStyles, position: 'relative', display: 'flex', flexDirection: 'column' }}>
            <div style={{ marginBottom: '10px', fontSize: '1.5em', fontWeight: 'bold', textAlign: 'center' }}>
                Details
            </div>
            <div style={{ marginBottom: '10px', flex: '1' }}>
                <div style={{ marginBottom: '10px' }}>Sport: {game.sport}</div>
                <div style={{ marginBottom: '10px' }}>Time: {new Date(game.time).toLocaleString()}</div>
                <div style={{ marginBottom: '10px' }}>Location: {game.location}</div>
                <div style={{ marginBottom: '10px' }}>Numbers: 0/{game.maxPlayers}</div>
                <div style={{ marginBottom: '10px' }}>Skill Level: {game.skill}/10</div>
                <div style={{ marginBottom: '10px' }}>Equipment Needed: {game.equipment}</div>                
                <div style={{ marginBottom: '10px' }}>Description: {game.description}</div>
            </div>
        </div>
    );
}

function GamePlayersDisplay(props) {
    const game = props.game;
    const numbers = Array.from({ length: game.maxPlayers }, (_, index) => index + 1);

    return (
        <div className="rounded rectangle" style={{ ...rectangleStyles, position: 'relative', display: 'flex', flexDirection: 'column' }}>
            <div style={{ marginBottom: '10px', fontSize: '1.5em', fontWeight: 'bold', textAlign: 'center' }}>
                Players
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', flex: '1' }}>
                {numbers.map((number, index) => (
                    <div key={index}>
                        {number}. 
                    </div>
                ))}
            </div>
            <div style={{ marginTop: '20px', textAlign: 'center' }}>
				<button>Join Game</button>
			</div>
        </div>
    )
}

function GameDetailElement(props) {
    const { id } = useParams();
    const gameId = id;
    const game = props.games && props.games.find(game => game._id === gameId);
    //const players = game.players;

	return (
        <div>
            <div style={{ position: 'fixed', top: '20%', left: '50%', transform: 'translateX(-50%)', fontSize: '2.0em', fontWeight: 'bold', textAlign: 'center' }}>
                {game.title}
            </div>
            <div style={{ position: 'fixed', top: '30%', left: '25%', transform: 'translateX(-50%)' }}>
                <GameDetailBody
                    game={game}
                />
            </div>
            <div style={{ position: 'fixed', top: '30%', left: '75%', transform: 'translateX(-50%)' }}>
                <GamePlayersDisplay
                    game={game}
                />
            </div>
        </div>
	);
}

export default  GameDetailElement;

