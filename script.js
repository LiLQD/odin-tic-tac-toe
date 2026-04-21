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
    console.log(printBoard);
  }

  function placeMark(rowIndex, columnIndex, mark) {
    if (board[rowIndex][columnIndex].getCell() === "") {
      board[rowIndex][columnIndex].setCell(mark);
    } else {
      console.log("Can only tick to empty cell");
      return;
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

  return { name, setMark, getMark };
  
}

function GameController(){
  Gameboard.getBoard();

  const player1 = Player("LiLQD");
  const player2 = Player("GunD");
  console.log(player1);
  console.log(player2);

  isFirstPlayerTurn = true;
  console.log(isFirstPlayerTurn);
  function switchTurn(){
    return isFirstPlayerTurn = isFirstPlayerTurn ? false : true;
  }
  switchTurn()
  console.log(isFirstPlayerTurn);
}

GameController();