const Gameboard = (function () {
  let board;
  function setBoard() {
    board = [];
    let row = 3;
    let column = 3;

    for (let i = 0; i < row; i++) {
      board[i] = [];
      for (let j = 0; j < column; j++) {
        board[i].push(Cell());
      }
    }
  }
  setBoard();
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
      return true;
    } else {
      prompt("Can only tick to empty cell");
      return false;
    }
  }

  return { setBoard, getBoard, printBoard, placeMark };
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
  }
  function getPoint() {
    return point;
  }
  return { win, setName, getName, setMark, getMark, getPoint };
}

const gameController = (function GameController() {
  const player1 = Player();
  const player2 = Player();
  let gameOver = false;
  let currentPlayer = player1;
  function newRound() {
    gameOver = false;
    currentPlayer = player1;
  }
  function setPlayer() {
    player1.setMark("X");
    player1.setName("playerOne");

    player2.setMark("O");
    player2.setName("playerTwo");
  }
  function switchTurn() {
    return currentPlayer === player1
      ? (currentPlayer = player2)
      : (currentPlayer = player1);
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
  
  function playRound(rowIndex, columnIndex) {
    if (gameOver) return;
    screenController.updateScreen();

    console.log(Gameboard.printBoard());
    console.log(`Is ${currentPlayer.getName()} turn`);

    const isValidTurn = Gameboard.placeMark(
      rowIndex,
      columnIndex,
      currentPlayer.getMark(),
    );
    screenController.updateScreen();
    if (winCheck()) {
      gameOver = true;
      currentPlayer.win();
      screenController.updateScreen();
      screenController.winScreen();
    } else if (drawCheck()) {
      gameOver = true;
      screenController.updateScreen();
      screenController.drawScreen();
    }
    if (isValidTurn && !winCheck() && !drawCheck()) switchTurn();
  }
  function getCurrentPlayer() {
    return currentPlayer.getName();
  }
  function getPlayer1Score() {
    return player1.getPoint();
  }
  function getPlayer2Score() {
    return player2.getPoint();
  }
  return {
    setPlayer,
    newRound,
    playRound,
    getCurrentPlayer,
    getPlayer1Score,
    getPlayer2Score,
  };
})();

const screenController = (function ScreenController() {
  const startButton = document.querySelector("#start");
  const restartButton = document.querySelector(".restart");
  const turn = document.querySelector(".turn");

  function updateScreen() {
    const gameboard = Gameboard.getBoard();

    const board = document.querySelector("#board");
    board.textContent = "";

    gameboard.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        const cellButton = document.createElement("button");
        cellButton.textContent = cell.getCell();
        if (cell.getCell() === "X") {
          cellButton.classList.add("cell", "X-mark");
        } else if (cell.getCell() === "O")
          cellButton.classList.add("cell", "O-mark");
        else cellButton.classList.add("cell");
        cellButton.dataset.column = colIndex;
        cellButton.dataset.row = rowIndex;
        board.appendChild(cellButton);
      });
    });

    //Turn
    while (turn.firstChild) {
      turn.removeChild(turn.firstChild);
    }
    const p = document.createElement("p");
    p.textContent = "Turn";
    turn.appendChild(p);
    const playerName = document.createElement("p");
    playerName.textContent = gameController.getCurrentPlayer();
    playerName.classList.add("player-name");
    turn.appendChild(playerName);
  }

  function clickHandlerBoard(e) {
    const selectedRow = e.target.dataset.row;
    const selectedCol = e.target.dataset.column;
    gameController.playRound(selectedRow, selectedCol);
    e.target.disabled = true;
  }

  function winScreen() {
    while (turn.firstChild) {
      turn.removeChild(turn.firstChild);
    }
    const playerName = document.createElement("p");
    playerName.textContent = gameController.getCurrentPlayer();
    playerName.classList.add("player-name");
    turn.appendChild(playerName);
    const p = document.createElement("p");
    p.textContent = "WIN";
    turn.appendChild(p);
    scoreUpdate();
  }

  function drawScreen() {
    while (turn.firstChild) {
      turn.removeChild(turn.firstChild);
    }
    const p = document.createElement("p");
    p.textContent = "DRAW";
    p.classList.add("draw");
    turn.appendChild(p);
    scoreUpdate();
  }

  function scoreUpdate() {
    const player1Status = document.querySelector(".player-one-status");
    const player2Status = document.querySelector(".player-two-status");
    player1Status.removeChild(player1Status.lastElementChild);
    player2Status.removeChild(player2Status.lastElementChild);

    const player1Score = document.createElement("p");
    player1Score.textContent = gameController.getPlayer1Score();
    player1Score.classList.add("player-one-score");

    player1Status.appendChild(player1Score);

    const player2Score = document.createElement("p");
    player2Score.textContent = gameController.getPlayer2Score();
    player2Score.classList.add("player-two-score");

    player2Status.appendChild(player2Score);
  }

  function startGame() {
    gameController.setPlayer();
    startButton.disabled = true;
    updateScreen();
  }

  function restartGame() {
    Gameboard.setBoard();
    gameController.newRound();
    updateScreen();
  }
  board.addEventListener("click", clickHandlerBoard);
  startButton.addEventListener("click", startGame);
  restartButton.addEventListener("click", restartGame);
  return { updateScreen, winScreen, drawScreen };
})();
