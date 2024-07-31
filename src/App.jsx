import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const TURN = {
  X: "X",
  O: "O" 
}

const Squares = ({ index, updateBoard, children, isSelected }) => {
  const clase = isSelected ? "bg-primary" : "bg-dark-subtle"

  const handeClick = () => {
    updateBoard(index)
  }

  return <div className={`d-flex justify-content-center align-items-center col ${clase}`} onClick={handeClick} style={{width: "15rem", height: "15rem"}}>{children}</div>;
};

function App() {

  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState(TURN.X)

  const updateBoard = (index) => {

    if(board[index]) return

    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
    const newTurn = turn == TURN.X ? TURN.O : TURN.X
    setTurn(newTurn)
  }
  

  return (
    <div className="container pt-5 d-flex flex-column" style={{alignItems: "center"}}>
      <h1 className="text-center">Tic Tak Toe</h1>
      <div className="row row-cols-4 pt-5 gap-3 justify-content-center" style={{width: "1000px"}}>
        {board.map((_, index) => {
          return <Squares 
          index={index}
          key={index} 
          updateBoard={updateBoard}
          >
            {board[index]}
          </Squares>;
        })}
      </div>
      
      <section>
          <Squares isSelected={TURN.X == turn}>X</Squares>
          <Squares isSelected={TURN.O == turn}>O</Squares>
      </section>
    </div>
  );
}

export default App;
