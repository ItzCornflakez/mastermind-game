import React from 'react';
import Board from './Board';
import PiecePool from './PiecePool';
import DnDWrapper from './DnDWrapper';
import './App.css';

function EasyGame() {
  return (
    <DnDWrapper>
      <div className="EasyGame">
        <h1>Mastermind Game lvl 1</h1>
        <PiecePool />
        <Board />
      </div>
    </DnDWrapper>
  );
}

export default EasyGame;