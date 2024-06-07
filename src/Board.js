import React, { useState } from 'react';
import Row from './Row';
import './Board.css';

const Board = () => {
  const [rows, setRows] = useState(
    Array.from({ length: 10 }, () => ({
      colors: Array(4).fill(null),
      feedback: Array(4).fill('blue'),
      locked: false,
    }))
  );

  const generateRandomAnswer = () => {
    // Generate a random answer for the AI
    // Placeholder logic for demonstration
    return Array(4)
      .fill(null)
      .map(() => {
        const colors = ['red', 'green', 'blue', 'yellow', 'black']; // Possible colors
        return colors[Math.floor(Math.random() * colors.length)];
      });
  };

  const [currentRow, setCurrentRow] = useState(0);
  const [aiAnswer, setAiAnswer] = useState(generateRandomAnswer()); // AI's answer

  const handleDrop = (index, colors) => {
    const newRows = [...rows];
    newRows[index].colors = colors;
    setRows(newRows);
  };

  const checkGuess = (guess) => {
    console.log(aiAnswer)
    // Check if the guess matches the AI's answer
    const isMatch = guess.every((color, index) => color === aiAnswer[index]);
    if (isMatch) {
      // Trigger victory animation
      alert('Congratulations! You guessed the correct combination!');
    } else {
        let feedback = [];

        // Check each slot in the guess
        guess.forEach((color, index) => {
            // Check if the color is present in the AI's answer
            if (aiAnswer.includes(color)) {
            // Check if the color is in the correct position
            if (color === aiAnswer[index]) {
                feedback.push('black'); // Color is in the answer and in the correct position
            } else {
                feedback.push('white'); // Color is in the answer but not in the correct position
            }
            } else {
            feedback.push('blue'); // Color is not in the answer
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
      const feedback = checkGuess(newRows[currentRow].colors);
      newRows[currentRow].feedback = feedback;
      newRows[currentRow].locked = true;
      setRows(newRows);
      setCurrentRow(currentRow + 1);
    }
  };

  const handleRestart = () => {
    // Reset the game
    setRows(
      Array.from({ length: 10 }, () => ({
        colors: Array(4).fill(null),
        feedback: Array(4).fill('blue'),
        locked: false,
      }))
    );
    setCurrentRow(0);
    setAiAnswer(generateRandomAnswer());
    console.log(aiAnswer);
    
  };

  return (
    <div className="board-container">
      <div className="board">
        <div className="board-column">
          {rows.slice(0, 5).map((row, index) => (
            <div key={index} className={`board-row${currentRow === index ? ' active-row' : ''}${row.locked ? ' guessed-row' : ''}`}>
              <div className="row-number">{index + 1}</div>
              <Row
                locked={row.locked}
                feedback={row.feedback}
                onDrop={(colors) => handleDrop(index, colors)}
                defaultColors={row.colors}
              />
            </div>
          ))}
        </div>
        <div className="board-column">
          {rows.slice(5).map((row, index) => (
            <div key={index + 5} className={`board-row${currentRow === index + 5 ? ' active-row' : ''}${row.locked ? ' guessed-row' : ''}`}>
              <div className="row-number">{index + 6}</div>
              <Row
                locked={row.locked}
                feedback={row.feedback}
                onDrop={(colors) => handleDrop(index + 5, colors)}
                defaultColors={row.colors}
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

export default Board;