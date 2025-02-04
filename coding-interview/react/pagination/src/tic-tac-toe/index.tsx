import { useState, useEffect } from 'react';

const TicTacToe = () => {
  const initialBoard = Array(9).fill(null);
  const [board, setBoard] = useState(initialBoard);
  return (
    <div className="tic_tac_toe_container">
      <div className="status">
        Player X turn
        <button>Reset Game</button>
      </div>
      <div className="board_container">
        {board.map((_, index) => {
          return (
            <button key={index} className="cell">
              X
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TicTacToe;
