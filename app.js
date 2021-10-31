// 1.tic tac toe logic using id
// 1.1 check line macthing (1-2-3,4-5-6,7-8-9)
// 1.2 check up and down matching line macthing  (1-4-7,2-6-8,3-5-9)
// 1.3 check diagonal logic   (1-5-9,3-5-7)

// | 1 | 2 | 3 |
// | 4 | 5 | 6 |
// | 7 | 8 | 9 |

// 2.Handle Player Selection Add correct symbol
// 2.1 player 1 O cheeck if null and input symbol
// 2.2 player 2 X cheeck if null and input symbol

//3 Display WINNER
//3.1 Alert WINNER Name
//3.2 Increment score

//4 Replay Button
//4.1 Clear Fields and reset to the start

const cellElements = document.querySelectorAll("[tile]");
let circleTurn;
const X_CLASS = "x";
const CIRCLE_CLASS = "circle";
const board = document.querySelector("#board");
const result = document.getElementById("result");
const restartButton = document.getElementById("restartButton");

const WINNING_COMBINATION = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

startGame();

restartButton.addEventListener("click", startGame);

function handleClick(e) {
  const cell = e.target;
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
  placeMark(cell, currentClass);
  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();
    setBoardHoverClass();
  }
}

function isDraw() {
  return [...cellElements].every((cell) => {
    return (
      cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    );
  });
}

function endGame(draw) {
  if (draw) {
    alert("Draw !");
  } else {
    checkWinner();
  }
  startGame();
}
let i = 0;
let j = 0;
function checkWinner() {
  if (!circleTurn) {
    i++;
    result.innerText = `${i} - ${j}`;
    alert("Player X win");
  } else {
    j++;
    result.innerText = `${i} - ${j}`;
    alert("Player O win");
  }
}

function updateWinner() {
  result.textContent = `${i} - ${j}`;
}

function startGame() {
  circleTurn = false;
  cellElements.forEach((cells) => {
    cells.classList.remove(X_CLASS);
    cells.classList.remove(CIRCLE_CLASS);
    cells.removeEventListener("click", handleClick);
    cells.addEventListener("click", handleClick, { once: true });
  });

  setBoardHoverClass();
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}

function swapTurns() {
  circleTurn = !circleTurn;
}

function setBoardHoverClass() {
  board.classList.remove(X_CLASS);
  board.classList.remove(CIRCLE_CLASS);
  if (circleTurn) {
    board.classList.add(CIRCLE_CLASS);
  } else {
    board.classList.add(X_CLASS);
  }
}

function checkWin(currentClass) {
  return WINNING_COMBINATION.some((combinations) => {
    //every to make sure every element have the same class
    return combinations.every((index) => {
      return cellElements[index].classList.contains(currentClass);
    });
  });
}
