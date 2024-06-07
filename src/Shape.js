import React from 'react';
import { useDrag } from 'react-dnd';
import './Shape.css';

const Shape = ({ shape }) => {
    const [{ isDragging }, drag] = useDrag({
        type: 'SHAPE',
        item: {Shape},
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    });
  
    let shapeIcon;
    switch (shape) {
      case 'square':
        shapeIcon = (
          <svg width="50" height="50">
            <rect x="5" y="5" width="40" height="40" fill="orange" stroke="black" strokeWidth="2"/>
          </svg>
        );
        break;
      case 'triangle':
        shapeIcon = (
          <svg width="50" height="50">
            <polygon points="25,5 45,45 5,45" fill="orange" stroke="black" strokeWidth="2"/>
          </svg>
        );
        break;
      case 'circle':
        shapeIcon = (
          <svg width="50" height="50">
            <circle cx="25" cy="25" r="20" fill="orange" stroke="black" strokeWidth="2"/>
          </svg>
        );
        break;
      case 'hexagon':
        shapeIcon = (
          <svg width="50" height="50">
            <polygon points="15,5 35,5 45,25 35,45 15,45 5,25" fill="orange" stroke="black" strokeWidth="2"/>
          </svg>
        );
        break;
      case 'rectangle':
        shapeIcon = (
          <svg width="50" height="50">
            <rect x="5" y="10" width="40" height="30" fill="orange" stroke="black" strokeWidth="2"/>
          </svg>
        );
        break;
      default:
        shapeIcon = null;
    }
  
    return (
      <div
        ref={drag}
        className="shape"
        style={{
          opacity: isDragging ? 0.5 : 1,
          cursor: 'move',
        }}
      >
        {shapeIcon}
      </div>
    );
  };

  export default Shape;
  