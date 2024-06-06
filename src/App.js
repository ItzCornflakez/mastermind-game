import React from 'react';
import Board from './Board';
import PiecePool from './PiecePool';
import DnDWrapper from './DnDWrapper';
import './App.css';

function App() {
  return (
    <DnDWrapper>
      <div className="App">
        <h1>Mastermind Game</h1>
        <PiecePool />
        <Board />
      </div>
    </DnDWrapper>
  );
}

export default App;