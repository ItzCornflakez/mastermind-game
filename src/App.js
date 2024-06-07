import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import Board from './Board';
import HardBoard from './HardBoard';
import PiecePool from './PiecePool';
import ShapePool from './ShapePool';
import DnDWrapper from './DnDWrapper';
import './App.css';

function MainMenu() {
  return (
    <div className="MainMenu">
      <h1>Main Menu</h1>
      <Link to="/game1">
        <button>Play Mastermind Game (Medium Difficulty)</button>
      </Link>
      <Link to="/game2">
        <button>Play Mastermind Game (Hard Difficulty)</button>
      </Link>
    </div>
  );
}

function MediumGame() {

  const navigate = useNavigate();

  return (
    <DnDWrapper>
      <div className="App">
        <h1>Mastermind Game Medium</h1>
        <PiecePool />
        <Board />
        <button class="returnButton" onClick={() => navigate('/')}>Return to Main Menu</button>
      </div>
    </DnDWrapper>
  );
}

function HardGame() {

  const navigate = useNavigate();

  return (
    <DnDWrapper>
      <div className="App">
        <h1>Mastermind Game Hard</h1>
        <PiecePool />
        <ShapePool />
        <HardBoard />
        <button class="returnButton" onClick={() => navigate('/')}>Return to Main Menu</button>
      </div>
    </DnDWrapper>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainMenu />} />
        <Route path="/game1" element={<MediumGame />} />
        <Route path="/game2" element={<HardGame />} />
      </Routes>
    </Router>
  );
}

export default App;