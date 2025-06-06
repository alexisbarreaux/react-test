import { useState } from 'react';

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[currentMove];
  const xIsNext = currentMove % 2 === 0;

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <h1>Tic Tac Toe</h1>
        <h3>Current Move: {currentMove}</h3>
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} currentMove={currentMove}/>
      </div>
      <div className="game-info">
        <ol>
          {
            moves
          }
        </ol>
      </div>
    </div>
  );
}

function Board({ xIsNext, squares, onPlay, currentMove }) {
  function handleClick(i) {
    if (squares[i] !== null || calculateWinner(squares).winner) {
      return;
    }
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? "X" : "O";
    
    onPlay(nextSquares);
  }

  const {winner, winningLine} = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  }
  else if (currentMove ===9){
    status = "It's a draw!";
  }
  else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  const rowDivs = [];
  for (let i=0; i < 3; i++) {
    const squareComponents = [];
    for(let j=0; j < 3; j++) {
      const squareIndex = i * 3 + j;
      const isWinningIndex = winningLine && winningLine.includes(squareIndex);
      squareComponents.push(<Square key={squareIndex} value={squares[squareIndex]} onSquareClick={() => handleClick(squareIndex)} isWinningIndex={isWinningIndex}/>);
    }
    const rowDiv = <div className="board-row" key={i}>{squareComponents}</div>;
    rowDivs.push(rowDiv);
  }

  return (
  <>
    <div className="status">{status}</div>
    {rowDivs}
  </> );
}

function Square({value, onSquareClick, isWinningIndex}) {
  const baseClassName = "square";
  const valueClassName = value === "X" ? "square-x" : (value === "O" ? "square-o" : "");
  const winningClassName = isWinningIndex ? "winner" : "";
  const className= [baseClassName, valueClassName, winningClassName].join(" ");
  return <button className={className} onClick={onSquareClick}>{value}</button>;
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {winner: squares[a], winningLine: lines[i]};
    }
  }
  return {winner: null, winningLine: null};
}