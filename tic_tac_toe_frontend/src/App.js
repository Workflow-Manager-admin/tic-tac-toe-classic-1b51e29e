import React, { useState } from 'react';
import './App.css';

// PUBLIC_INTERFACE
const Square = ({ value, onClick }) => (
  <button className="square" onClick={onClick}>
    {value}
  </button>
);

// PUBLIC_INTERFACE
function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [scores, setScores] = useState({ X: 0, O: 0 });

  // Calculate winner
  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6] // diagonals
    ];

    for (let line of lines) {
      const [a, b, c] = line;
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  // Handle click on square
  const handleClick = (i) => {
    const boardCopy = [...board];
    
    // Return if square is filled or game is won
    if (calculateWinner(boardCopy) || boardCopy[i]) return;
    
    boardCopy[i] = xIsNext ? 'X' : 'O';
    setBoard(boardCopy);
    
    const winner = calculateWinner(boardCopy);
    if (winner) {
      setScores(prev => ({
        ...prev,
        [winner]: prev[winner] + 1
      }));
    }
    
    setXIsNext(!xIsNext);
  };

  // Reset game
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  };

  const winner = calculateWinner(board);
  const isDraw = !winner && board.every(square => square !== null);
  const status = winner 
    ? `Winner: ${winner}` 
    : isDraw 
    ? "It's a draw!" 
    : `Next player: ${xIsNext ? 'X' : 'O'}`;

  return (
    <div className="App">
      <div className="game-status">{status}</div>
      
      <div className="score-board">
        <div className="score-item">X: {scores.X}</div>
        <div className="score-item">O: {scores.O}</div>
      </div>
      
      <div className="board">
        {board.map((square, i) => (
          <Square
            key={i}
            value={square}
            onClick={() => handleClick(i)}
          />
        ))}
      </div>
      
      <button className="reset-button" onClick={resetGame}>
        Reset Game
      </button>
    </div>
  );
}

export default App;
