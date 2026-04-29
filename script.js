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
    return board;
  }
  function printBoard() {
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
  

  return { getBoard, printBoard, placeMark };
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

function Player() {
  let point = 0;
  let mark;
  let name;

  function setName(inputId) {
    const playerInput = document.querySelector(`#${inputId}`);
    name = playerInput.value;
    if (name === "" || name === null || name === undefined) {
      name = `Player ${mark}`;
    }
    console.log(name);
    playerInput.disabled = true;
  }
  function getName() {
    return name;
  }
  function setMark(m) {
    mark = m;
  }
  function getMark() {
    return mark;
  }
  function win() {
    point++;
    console.log(`${name} won with ${point} points`);
    screenController.startButton.disabled = false;
  }
  return { win, setName, getName, setMark, getMark };
}

const gameController = (function GameController() {
  const player1 = Player();
  const player2 = Player();
  let isFirstPlayerTurn = true;
  function setPlayer() {
    player1.setMark("X");
    player1.setName("playerOne");

    player2.setMark("O");
    player2.setName("playerTwo");
  }
  function switchTurn() {
    return (isFirstPlayerTurn = isFirstPlayerTurn ? false : true);
  }

  function winCheck() {
    const valueBoard = Gameboard.printBoard();
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
    const valueBoard = Gameboard.printBoard();
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
      screenController.updateScreen();
      console.log(Gameboard.printBoard());
      if (isFirstPlayerTurn) {
        currentPlayer = player1;
        console.log(`Is ${player1.getName()} turn`);
        const rowIndex = prompt("Row index");
        const columnIndex = prompt("Column index");

        Gameboard.placeMark(rowIndex - 1, columnIndex - 1, player1.getMark());
        switchTurn();
      } else {
        currentPlayer = player2;
        console.log(`Is ${player2.getName()} turn`);
        const rowIndex = prompt("Row index");
        const columnIndex = prompt("Column index");

        Gameboard.placeMark(rowIndex - 1, columnIndex - 1, player2.getMark());
        switchTurn();
      }
    }
    console.log(Gameboard.printBoard());
    screenController.updateScreen();
    if (winCheck()) {
      currentPlayer.win();
    } else console.log("Draw");
  }
  return { setPlayer, playRound };
})();

const screenController = (function ScreenController() {
  const startButton = document.querySelector("#start");

  function updateScreen() {
    const gameboard = Gameboard.getBoard();
    const board = document.querySelector("#board");
    board.textContent = "";

    gameboard.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        const cellButton = document.createElement("button");
        cellButton.textContent = cell.getCell();
        if(cell.getCell() === "X"){
          cellButton.classList.add("cell", "X-mark");
        }
        else cellButton.classList.add("cell", "O-mark");
        cellButton.dataset.column = colIndex;
        cellButton.dataset.row = rowIndex;
        board.appendChild(cellButton);
      });
    });
  }

  function startGame() {
    gameController.setPlayer();
    startButton.disabled = true;
    updateScreen();
    gameController.playRound();
  }

  startButton.addEventListener("click", startGame);

  return { startButton, updateScreen };
})();
