import React, { useState } from 'react';
import HardRow from './HardRow';
import './HardBoard.css';

const HardBoard = () => {
  const initialState = Array.from({ length: 10 }, () => ({
    pairs: Array(4).fill({ color: null, shape: null }),
    feedback: Array(4).fill('blue'),
    locked: false,
  }));

  const [rows, setRows] = useState(initialState);

  const generateRandomAnswer = () => {
    const colors = ['red', 'green', 'blue', 'yellow', 'black']; // Possible colors
    const shapes = ['circle', 'square', 'triangle', 'rectangle', 'hexagon']; // Possible shapes

    return Array(4).fill(null).map(() => {
      const color = colors[Math.floor(Math.random() * colors.length)];
      const shape = shapes[Math.floor(Math.random() * shapes.length)];
      return { color, shape };
    });
  };

  const [currentRow, setCurrentRow] = useState(0);
  const [aiAnswer, setAiAnswer] = useState(generateRandomAnswer()); // AI's answer

  const handleDrop = (index, pairs) => {
    const newRows = [...rows];
    newRows[index].pairs = pairs;
    setRows(newRows);
  };

  const checkGuess = (guess) => {
    // Check if the guess matches the AI's answer
    const isMatch = guess.every((pair, index) => pair.color === aiAnswer[index].color && pair.shape === aiAnswer[index].shape);
    if (isMatch) {
      // Trigger victory animation
      alert('Congratulations! You guessed the correct combination!');
    } else {
      let feedback = [];

      // Check each slot in the guess
      guess.forEach((pair, index) => {
        // Check if the shape-color pair is present in the AI's answer
        const matchIndex = aiAnswer.findIndex(aiPair => aiPair.color === pair.color && aiPair.shape === pair.shape);
        if (matchIndex !== -1) {
          // Check if the shape-color pair is in the correct position
          if (matchIndex === index) {
            feedback.push('black'); // Pair is in the answer and in the correct position
          } else {
            feedback.push('white'); // Pair is in the answer but not in the correct position
          }
        } else {
          feedback.push('blue'); // Pair is not in the answer
        }
      });

      // Randomize the order of the feedback list
      feedback.sort(() => Math.random() - 0.5);

      return feedback;
    }
  };

  const handleSubmit = () => {
    if (currentRow < 10) {
      const newRows = [...rows];
      const feedback = checkGuess(newRows[currentRow].pairs);
      newRows[currentRow].feedback = feedback;
      newRows[currentRow].locked = true;
      setRows(newRows);
      setCurrentRow(currentRow + 1);
    }
  };

  const handleRestart = () => {
    // Reset the game
    setRows(initialState);
    setCurrentRow(0);
    setAiAnswer(generateRandomAnswer());
  };

  return (
    <div className="board-container">
      <div className="board">
        <div className="board-column">
          {rows.slice(0, 5).map((row, index) => (
            <div key={index} className={`board-row${currentRow === index ? ' active-row' : ''}${row.locked ? ' guessed-row' : ''}`}>
              <div className="row-number">{index + 1}</div>
              <HardRow
                locked={row.locked}
                feedback={row.feedback}
                onDrop={(pairs) => handleDrop(index, pairs)}
                defaultPairs={row.pairs}
              />
            </div>
          ))}
        </div>
        <div className="board-column">
          {rows.slice(5).map((row, index) => (
            <div key={index + 5} className={`board-row${currentRow === index + 5 ? ' active-row' : ''}${row.locked ? ' guessed-row' : ''}`}>
              <div className="row-number">{index + 6}</div>
              <HardRow
                locked={row.locked}
                feedback={row.feedback}
                onDrop={(pairs) => handleDrop(index + 5, pairs)}
                defaultPairs={row.pairs}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="buttons-container">
        <button onClick={handleSubmit} className="submit-button">
          Submit
        </button>
        <button onClick={handleRestart} className="restart-button">
          Restart
        </button>
      </div>
    </div>
  );
};

export default HardBoard;
