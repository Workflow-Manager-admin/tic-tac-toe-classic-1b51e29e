import React from 'react';

// PUBLIC_INTERFACE
const Board = ({ positions, players, snakes, ladders }) => {
  const boardSize = 10;
  const cells = Array(boardSize * boardSize).fill(null);

  const getCellNumber = (index) => {
    const row = Math.floor(index / boardSize);
    const col = index % boardSize;
    if (row % 2 === 0) {
      return (boardSize * boardSize) - (row * boardSize) - (boardSize - col);
    }
    return (boardSize * boardSize) - (row * boardSize) - col - 1;
  };

  return (
    <div className="game-board">
      {cells.map((_, index) => {
        const cellNumber = getCellNumber(index);
        const hasPlayer = players.some(player => player.position === cellNumber);
        const snake = snakes.find(s => s.start === cellNumber);
        const ladder = ladders.find(l => l.start === cellNumber);

        return (
          <div 
            key={index} 
            className={`cell ${snake ? 'snake-start' : ''} ${ladder ? 'ladder-start' : ''}`}
          >
            <span className="cell-number">{cellNumber + 1}</span>
            {hasPlayer && (
              <div className="player-token">
                {players.find(p => p.position === cellNumber).name}
              </div>
            )}
            {snake && <div className="snake-indicator">S</div>}
            {ladder && <div className="ladder-indicator">L</div>}
          </div>
        );
      })}
    </div>
  );
};

export default Board;
