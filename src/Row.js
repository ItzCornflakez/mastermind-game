import React, { useEffect } from 'react';
import { useDrop } from 'react-dnd';
import Feedback from './Feedback';
import './Row.css';

const Slot = ({ color, onDrop, locked }) => {
  const [{ isOver }, drop] = useDrop({
    accept: 'PIECE',
    drop: (item) => !locked && onDrop(item.color),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <div
      ref={drop}
      className="slot"
      style={{ backgroundColor: color || (isOver ? '#ddd' : '#fff') }}
    ></div>
  );
};

const Row = ({ locked, feedback, onDrop, defaultColors }) => {
  const [colors, setColors] = React.useState(Array(4).fill(null));

  // Effect to reset colors when defaultColors change
  useEffect(() => {
    setColors([...defaultColors]);
  }, [defaultColors]);

  const handleDrop = (index, color) => {
    if (!locked) {
      const newColors = [...colors];
      newColors[index] = color;
      setColors(newColors);
      onDrop(newColors);
    }
  };

  return (
    <div className="row-container">
      <div className="row">
        {colors.map((color, index) => (
          <Slot
            key={index}
            color={color}
            locked={locked}
            onDrop={(color) => handleDrop(index, color)}
          />
        ))}
      </div>
      <Feedback feedback={feedback} />
    </div>
  );
};

export default Row;