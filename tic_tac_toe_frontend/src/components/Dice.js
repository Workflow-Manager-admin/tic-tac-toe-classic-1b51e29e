import React from 'react';

// PUBLIC_INTERFACE
const Dice = ({ value, rolling, onRoll }) => {
  return (
    <div className={`dice ${rolling ? 'rolling' : ''}`} onClick={onRoll}>
      <div className="dice-value">{value}</div>
    </div>
  );
};

export default Dice;
