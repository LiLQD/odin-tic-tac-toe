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
      placeMark(rowIndex-1, columnIndex-1, mark);
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
  function win(){
    point++;
    console.log(`{name} won with {point} points`);
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

  let isWin = false;

  function playRound() {
    while (!isWin) {
      if (isFirstPlayerTurn) {
        console.log(Gameboard.getBoard());
        console.log(`Is ${player1.name} turn`);
        const rowIndex = prompt("Row index");
        const columnIndex = prompt("Column index");

        Gameboard.placeMark(rowIndex - 1, columnIndex - 1, player1.getMark());
        switchTurn();
      } else {
        console.log(Gameboard.getBoard());
        console.log(`Is ${player2.name} turn`);
        const rowIndex = prompt("Row index");
        const columnIndex = prompt("Column index");

        Gameboard.placeMark(rowIndex - 1, columnIndex - 1, player2.getMark());
        switchTurn();
      }
    }
  }
  return { playRound };
})();

gameController.playRound();
