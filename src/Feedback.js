import React from 'react';
import './Feedback.css';

const Feedback = ({ feedback = ['blue', 'blue', 'blue', 'blue'] }) => {
  return (
    <div className="feedback">
      <div className="feedback-row">
        <div className="feedback-circle" style={{ backgroundColor: feedback[0] }}></div>
        <div className="feedback-circle" style={{ backgroundColor: feedback[1] }}></div>
      </div>
      <div className="feedback-row">
        <div className="feedback-circle" style={{ backgroundColor: feedback[2] }}></div>
        <div className="feedback-circle" style={{ backgroundColor: feedback[3] }}></div>
      </div>
    </div>
  );
};

export default Feedback;