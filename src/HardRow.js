import React, { useEffect } from 'react';
import { useDrop } from 'react-dnd';
import Feedback from './Feedback';
import './Row.css';

const Slot = ({ color, shape, onDrop, locked }) => {
    const [{ isOver }, drop] = useDrop({
        accept: 'SHAPE',
        drop: (item) => !locked && onDrop(item),
        collect: (monitor) => ({
        isOver: !!monitor.isOver(),
        }),
    });

    return (
        <div
        ref={drop}
        className="slot"
        style={{ backgroundColor: color || (isOver ? '#ddd' : '#fff') }}
        >
        {shape && <div className={`shape ${shape}`}></div>}
        </div>
    );
};

const HardRow = ({ locked, feedback, onDrop, defaultPairs }) => {
    const [pairs, setPairs] = React.useState(Array(4).fill({ color: null, shape: null }));
  
    useEffect(() => {
      setPairs([...defaultPairs]);
    }, [defaultPairs]);
  
    const handleDrop = (index, item) => {
      if (!locked) {
        const newPairs = [...pairs];
        newPairs[index] = item;
        setPairs(newPairs);
        onDrop(newPairs);
      }
    };
  
    return (
      <div className="row-container">
        <div className="row">
          {pairs.map((pair, index) => (
            <Slot
              key={index}
              color={pair.color}
              shape={pair.shape}
              locked={locked}
              onDrop={(item) => handleDrop(index, item)}
            />
          ))}
        </div>
        <Feedback feedback={feedback} />
      </div>
    );
  };
export default HardRow;