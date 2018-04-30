const board = {
  row1: ["", "", ""],
  row2: ["", "", ""],
  row3: ["", "", ""],
  rows: ["row1", "row2", "row3"]
};
let updateGrid;
let turn = 1;
let row = "";
let position = 0;
let squareTaken = false;
let totalTurns = 0;
let gameOver = false;
const squareCheck = function (row, position) {
  if (board[row][position] === "") {
    return;
  } else {
    console.log("Square already taken!");
    squareTaken = true;
  }
}
const winCheck = function () {
  for (var i = 0; i < 3; i++) {
    let currentRow = board.rows[i];
    let test = board[currentRow][0]+board[currentRow][1]+board[currentRow][2];
    if (test === "xxx" || test === "ooo") {
      someoneWon();
      return;
    }
  }
  for (var i = 0; i < 3; i++) {
    let test = board.row1[i]+board.row2[i]+board.row3[i];
    if (test === "xxx" || test === "ooo") {
      someoneWon();
      return;
    }
  }
  let diag1 = board.row1[0]+board.row2[1]+board.row3[2];
  let diag2 = board.row1[2]+board.row2[1]+board.row3[0];
  if (diag1 === "xxx" || diag2 === "xxx" || diag1 === "ooo" || diag2 === "ooo") {
    someoneWon();
    return;
  }
  if (totalTurns === 8) {
    console.log("Its a draw!");
    gameOver = true;
  }
}
const someoneWon = function () {
  if (turn === 1) {
    console.log("X Wins!");
  } else {
    console.log("O Wins!");
  }
  gameOver = true;
}
const takeTurn = function (square) {
  if (!gameOver) {
    if (square <= 3) {
      row = "row1";
      position = square-1;
      squareCheck(row, position);
    } else if (square <= 6) {
      row = "row2";
      position = square-4;
      squareCheck(row, position);
    } else {
      row = "row3";
      position = square-7;
      squareCheck(row, position);
    }
    if (!squareTaken) {
      if (turn === 1) {
        board[row][position] = "x";
      } else {
        board[row][position] = "o";
      }
      updateGrid(square, turn);
      winCheck();
      if (turn === 1) {
        turn = 0;
      } else {
        turn = 1;
      }
      totalTurns += 1;
    }
    squareTaken = false;
  }
};
$(document).ready(function() {
  const $body = $('body');
  let boxes = {};
  for (let i = 1; i < 10; i++) {
    boxes[`$box${i}`] = eval(`$('#box${i}')`);
    boxes[`$box${i}`].on("click", function() {
      takeTurn(i);
    });
  }
  updateGrid = function(square, turn) {
    let box = eval(`boxes.$box${square}`);
    if (turn === 1) {
      box.text("X");
    }
    else {
      box.text("O");
    }
  }
});
