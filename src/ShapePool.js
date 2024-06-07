import React from 'react';
import Shape from './Shape';
import './ShapePool.css';

const ShapePool = () => {
  // Define available shapes
  const shapes = ['square', 'triangle', 'circle', 'hexagon', 'rectangle'];

  return (
    <div className="shape-pool">
      {shapes.map((shape, index) => (
        <Shape key={index} shape={shape} />
      ))}
    </div>
  );
};

export default ShapePool;