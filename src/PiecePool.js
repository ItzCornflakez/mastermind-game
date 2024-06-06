import React from 'react';
import Piece from './Piece';
import './PiecePool.css';

const colors = ['red', 'green', 'blue', 'yellow', 'black'];

const PiecePool = () => {
  return (
    <div className="piece-pool">
      {colors.map((color) => (
        <Piece key={color} color={color} />
      ))}
    </div>
  );
};

export default PiecePool;