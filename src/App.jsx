import { useState } from 'react';
import './App.css';

const CHOICES = ['rock', 'paper', 'scissors'];
const LABELS = {
  rock: '🪨 Rock',
  paper: '📄 Paper',
  scissors: '✂️ Scissors',
};

function App() {
  const [userChoice, setUserChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState('');
  const [score, setScore] = useState({ wins: 0, losses: 0, draws: 0 });

  const determineWinner = (user, computer) => {
    if (user === computer) return 'draw';
    if (
      (user === 'rock' && computer === 'scissors') ||
      (user === 'paper' && computer === 'rock') ||
      (user === 'scissors' && computer === 'paper')
    ) {
      return 'win';
    }
    return 'lose';
  };

  const handlePlay = (choice) => {
    const randomChoice = CHOICES[Math.floor(Math.random() * CHOICES.length)];
    setUserChoice(choice);
    setComputerChoice(randomChoice);
    
    const res = determineWinner(choice, randomChoice);
    setResult(res);
    
    setScore(prev => ({
      ...prev,
      wins: res === 'win' ? prev.wins + 1 : prev.wins,
      losses: res === 'lose' ? prev.losses + 1 : prev.losses,
      draws: res === 'draw' ? prev.draws + 1 : prev.draws
    }));
  };

  const resetScore = () => {
    setScore({ wins: 0, losses: 0, draws: 0 });
    setUserChoice(null);
    setComputerChoice(null);
    setResult('');
  };

  const resultLabel = result ? result[0].toUpperCase() + result.slice(1) : 'Start a round';

  return (
    <div className="container">
      <h1>Rock Paper Scissors</h1>
      <p>Pick a move, play a round, and keep score.</p>
      
      <hr />

      <h2>Score</h2>
      <p>🏆 Wins: {score.wins} | 🤝 Draws: {score.draws} | ❌ Losses: {score.losses}</p>

      <hr />

      <h2>Your Move</h2>
      <div>
        {CHOICES.map((choice) => (
          <button key={choice} onClick={() => handlePlay(choice)} type="button">
            {LABELS[choice]}
          </button>
        ))}
      </div>

      <hr />

      <h2>Game Status</h2>
      <p>👤 You: {userChoice ? LABELS[userChoice] : 'Waiting'}</p>
      <p>🤖 Computer: {computerChoice ? LABELS[computerChoice] : 'Waiting'}</p>
      <p>📊 Result: <strong>{resultLabel}</strong></p>

      <br />
      <button onClick={resetScore} type="button">🔄 Reset score</button>
    </div>
  );
}

export default App;
