import { useState } from "react";
import confetti from "canvas-confetti"
import { WinnerBoard } from "./components/WinnerBoard";
import { Squares } from "./components/Squares";
import { TURN } from "./logic/constants";
import { checkWinner, checkGameEnd } from "./logic/checkGame";

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState(TURN.X);
  const [winner, setWinner] = useState(null);

  const updateBoard = (index) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);
    const newTurn = turn == TURN.X ? TURN.O : TURN.X;
    setTurn(newTurn);

    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      confetti()
      setWinner(newWinner);
    }else if (checkGameEnd(newBoard)){
      setWinner(false)
    }
  };

  checkGameEnd(board)
  
  const restartGame = () => {
    setWinner(null);
    setTurn(TURN.X);
    setBoard(Array(9).fill(null));
  };

  return (
    <div className="board">
      <h1 className="">Tic Tac Toe</h1>
      <div className="game">
        {board.map((_, index) => {
          return (
            <Squares index={index} key={index} updateBoard={updateBoard}>
              {board[index]}
            </Squares>
          );
        })}
      </div>

      <section className="turn">
        <Squares isSelected={TURN.X == turn}>X</Squares>
        <Squares isSelected={TURN.O == turn}>O</Squares>
        <button onClick={restartGame} style={{marginTop: "5px", marginBottom: "5px"}}>Restart</button>
      </section>  

      <WinnerBoard winner={winner} restartGame={restartGame}/>

    </div>
  );
}

export default App;
