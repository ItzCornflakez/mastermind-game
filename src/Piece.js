import React from 'react';
import { useDrag } from 'react-dnd';
import './Piece.css';

const Piece = ({ color }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'PIECE',
    item: { color },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div
      className="piece"
      ref={drag}
      style={{
        backgroundColor: color,
        opacity: isDragging ? 0.5 : 1,
      }}
    ></div>
  );
};

export default Piece;