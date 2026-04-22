const Gameboard = (function () {
  let board = [];
  let row = 3;
  let column = 3;

  for (let i = 0; i < row; i++) {
    board[i] = [];
    for (let j = 0; j < column; j++) {
      board[i].push(Cell());
    }
  }

  function getBoard() {
    const printBoard = board.map((row) => row.map((cell) => cell.getCell()));
    return printBoard;
  }

  function placeMark(rowIndex, columnIndex, mark) {
    if (board[rowIndex][columnIndex].getCell() === "") {
      board[rowIndex][columnIndex].setCell(mark);
    } else {
      console.log("Can only tick to empty cell. Please choose another cell");
      const rowIndex = prompt("Choose another row index");
      const columnIndex = prompt("Choose another column index");
      placeMark(rowIndex - 1, columnIndex - 1, mark);
    }
  }

  return { getBoard, placeMark };
})();

function Cell() {
  let value = "";
  function setCell(mark) {
    value = mark;
  }
  function getCell() {
    return value;
  }
  return { setCell, getCell };
}

function Player(name) {
  let point = 0;
  let mark;
  function setMark(m) {
    mark = m;
  }
  function getMark() {
    return mark;
  }
  function win() {
    point++;
    console.log(`${name} won with ${point} points`);
  }
  return { name, win, setMark, getMark };
}

const gameController = (function GameController() {
  const player1 = Player("LiLQD");
  player1.setMark("O");
  const player2 = Player("GunD");
  player2.setMark("X");
  console.log(player1);
  console.log(player2);

  let isFirstPlayerTurn = true;
  
  function switchTurn() {
    return (isFirstPlayerTurn = isFirstPlayerTurn ? false : true);
  }

  function winCheck() {
    const valueBoard = Gameboard.getBoard();
    const boardSize = valueBoard.length;
    let diagWinCondition = true;
    let antiDiagWinCondition = true;
    let firstDiagCell = valueBoard[0][0];
    if (firstDiagCell === "") diagWinCondition = false;

    let firstAntiDiagCell = valueBoard[0][boardSize - 1];
    if (firstAntiDiagCell === "") antiDiagWinCondition = false;
    for (let n = 0; n < boardSize; n++) {
      let rowWinCondition = true;
      let colWinCondition = true;

      let firstRowCell = valueBoard[n][0];
      if (firstRowCell === "") rowWinCondition = false;

      let firstColCell = valueBoard[0][n];
      if (firstColCell === "") colWinCondition = false;

      for (let m = 0; m < boardSize; m++) {
        if (rowWinCondition && valueBoard[n][m] != firstRowCell) {
          rowWinCondition = false;
        }
        if (colWinCondition && valueBoard[m][n] != firstColCell) {
          colWinCondition = false;
        }
      }

      if (rowWinCondition || colWinCondition) return true;
    }
    for (let i = 0; i < boardSize; i++) {
      if (diagWinCondition && valueBoard[i][i] != firstDiagCell) {
        diagWinCondition = false;
      }

      if (
        antiDiagWinCondition &&
        valueBoard[i][boardSize - 1 - i] != firstAntiDiagCell
      ) {
        antiDiagWinCondition = false;
      }
    }
    if (diagWinCondition || antiDiagWinCondition) return true;
    return false;
  }
  function drawCheck() {
    const valueBoard = Gameboard.getBoard();
    const boardSize = valueBoard.length;
    for (let i = 0; i < boardSize; i++) {
      for (let j = 0; j < boardSize; j++) {
        if (valueBoard[i][j] === "") return false;
      }
    }
    return true;
  }
  function playRound() {
    let currentPlayer;
    while (!winCheck() && !drawCheck()) {
      if (isFirstPlayerTurn) {
        currentPlayer = player1;
        console.log(Gameboard.getBoard());
        console.log(`Is ${player1.name} turn`);
        const rowIndex = prompt("Row index");
        const columnIndex = prompt("Column index");

        Gameboard.placeMark(rowIndex - 1, columnIndex - 1, player1.getMark());
        switchTurn();
      } else {
        currentPlayer = player2;
        console.log(Gameboard.getBoard());
        console.log(`Is ${player2.name} turn`);
        const rowIndex = prompt("Row index");
        const columnIndex = prompt("Column index");

        Gameboard.placeMark(rowIndex - 1, columnIndex - 1, player2.getMark());
        switchTurn();
      }
    }
    console.log(Gameboard.getBoard());
    if (winCheck()) {
      currentPlayer.win();
    } else console.log("Draw");
  }
  return { playRound };
})();

gameController.playRound();
