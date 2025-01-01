import React, { useState } from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
function App() {
  const [user, setUser] = useState(true); // true = 'X', false = 'O'
  const [grid, setGrid] = useState(Array(9).fill(null));
  const [winner, setWinner] = useState(null);

  const ToggleUser = () => {
    setUser(!user);
  };

  const checkForWin = (newGrid) => {
    const winPatterns = [
      [0, 1, 2], // Top row
      [3, 4, 5], // Middle row
      [6, 7, 8], // Bottom row
      [0, 3, 6], // Left column
      [1, 4, 7], // Middle column
      [2, 5, 8], // Right column
      [0, 4, 8], // Diagonal \
      [2, 4, 6], // Diagonal /
    ];
    for (let pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (newGrid[a] && newGrid[a] === newGrid[b] && newGrid[a] === newGrid[c]) {
        return newGrid[a]; // Returns 'X' or 'O' as the winner
      }
    }
    return null;
  };

  const handleClick = (index) => {
    if (grid[index] || winner) return; // Ignore clicks on already filled cells or after a win

    const newGrid = [...grid];
    newGrid[index] = user ? 'X' : 'O';
    setGrid(newGrid);

    const gameWinner = checkForWin(newGrid);
    if (gameWinner) {
      setWinner(gameWinner);
    } else {
      ToggleUser();
    }
  };

  const resetGame = () => {
    setGrid(Array(9).fill(null));
    setWinner(null);
    setUser(true);
  };

  return (
    <div className="App">
      <div className="App-header">
        <h1>Tic-Tac-Toe</h1>
        <div className="row row-cols-3 row-cols-lg-4 rows">
          {grid.map((value, index) => (
            <div
              className="col border"
              key={index}
              onClick={() => handleClick(index)}
              style={{ cursor: 'pointer', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}
            >
              {value}
            </div>
          ))}
        </div>
        {winner ? (
          <div>
            <h2>Congratulations! {winner} wins!</h2>
            <button className="btn btn-primary mt-3" onClick={resetGame}>Play Again</button>
          </div>
        ) : (
          <h2>Current Player: {user ? 'X' : 'O'}</h2>
        )}
      </div>
    </div>
  );
}

export default App;
