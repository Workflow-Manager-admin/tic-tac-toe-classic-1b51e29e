import React, { useState, useEffect } from 'react';
import './App.css';
import Board from './components/Board';
import Dice from './components/Dice';

// PUBLIC_INTERFACE
function App() {
  const [players, setPlayers] = useState([
    { name: 'P1', position: 0, color: '#1976d2' },
    { name: 'P2', position: 0, color: '#f44336' }
  ]);
  
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [diceValue, setDiceValue] = useState(1);
  const [isRolling, setIsRolling] = useState(false);
  const [gameWon, setGameWon] = useState(false);

  const snakes = [
    { start: 98, end: 28 },
    { start: 95, end: 75 },
    { start: 92, end: 88 },
    { start: 83, end: 22 },
    { start: 69, end: 33 },
    { start: 64, end: 36 },
    { start: 59, end: 17 }
  ];

  const ladders = [
    { start: 2, end: 38 },
    { start: 7, end: 14 },
    { start: 8, end: 31 },
    { start: 15, end: 26 },
    { start: 21, end: 42 },
    { start: 28, end: 84 },
    { start: 36, end: 44 },
    { start: 51, end: 67 },
    { start: 78, end: 98 },
    { start: 71, end: 91 }
  ];

  const rollDice = () => {
    if (isRolling || gameWon) return;
    
    setIsRolling(true);
    const newValue = Math.floor(Math.random() * 6) + 1;
    setDiceValue(newValue);

    setTimeout(() => {
      movePlayer(newValue);
      setIsRolling(false);
    }, 1000);
  };

  const movePlayer = (steps) => {
    const player = players[currentPlayer];
    let newPosition = player.position + steps;

    // Check for snakes
    const snake = snakes.find(s => s.start === newPosition);
    if (snake) {
      newPosition = snake.end;
    }

    // Check for ladders
    const ladder = ladders.find(l => l.start === newPosition);
    if (ladder) {
      newPosition = ladder.end;
    }

    // Ensure position doesn't exceed board size
    if (newPosition > 99) {
      newPosition = player.position;
    }

    // Update player position
    const updatedPlayers = [...players];
    updatedPlayers[currentPlayer] = { ...player, position: newPosition };
    setPlayers(updatedPlayers);

    // Check for win
    if (newPosition === 99) {
      setGameWon(true);
      return;
    }

    // Switch to next player
    setCurrentPlayer(currentPlayer === 0 ? 1 : 0);
  };

  const resetGame = () => {
    setPlayers(players.map(player => ({ ...player, position: 0 })));
    setCurrentPlayer(0);
    setDiceValue(1);
    setGameWon(false);
  };

  return (
    <div className="App">
      <div className="game-status">
        {gameWon 
          ? `Player ${players[currentPlayer].name} wins!` 
          : `Current Player: ${players[currentPlayer].name}`}
      </div>

      <Board 
        positions={players.map(p => p.position)}
        players={players}
        snakes={snakes}
        ladders={ladders}
      />

      <div className="game-controls">
        <Dice 
          value={diceValue}
          rolling={isRolling}
          onRoll={rollDice}
        />
        <button className="reset-button" onClick={resetGame}>
          Reset Game
        </button>
      </div>
    </div>
  );
}

export default App;
