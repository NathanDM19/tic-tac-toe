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
let winningPlayer = 0;
let player1Wins = 0;
let player2Wins = 0;

// Checks if the square has been taken yet
const squareCheck = function (row, position) {
  if (board[row][position] === "") {
    return;
  } else {
    console.log("Square already taken!");
    squareTaken = true;
  }
}
// Checks to see if someone has won
const winCheck = function () {
  for (var i = 0; i < 3; i++) {
    let currentRow = board.rows[i];
    let winTest = board[currentRow][0]+board[currentRow][1]+board[currentRow][2];
    if (winTest === "xxx" || winTest === "ooo") {
      someoneWon();
      return;
    }
  }
  for (var i = 0; i < 3; i++) {
    let winTest = board.row1[i]+board.row2[i]+board.row3[i];
    if (winTest === "xxx" || winTest === "ooo") {
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

// Runs if someone has won
const someoneWon = function () {
  if (turn === 1) {
    console.log("X Wins!");
    winningPlayer = 1;
    player1Wins += 1;
  } else {
    console.log("O Wins!");
    winningPlayer = 2;
    player2Wins += 1;
  }
  gameOver = true;
}

// Function for taking a turn
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
      winCheck();
      updateGrid(square, turn);
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
  let $player1 = $('.player1');
  let $player2 = $('.player2');
  let $player1Wins = $('.player1Wins');
  let $player2Wins = $('.player2Wins');

  // Updates the board after each turn
  updateGrid = function(square, turn) {
    let box = eval(`boxes.$box${square}`);
    if (turn === 1) {
      box.text("X");
      $player1.html("Player 1 <br> Turn: ");
      $player2.html("Player 2 <br> Turn: ✓");
      if (winningPlayer === 1) {
        $player1.html("Player 1 <br> Turn: <br><br> YOU WIN!");
        $player2.html("Player 2 <br> Turn: ");
        $player1Wins.text(`Wins: ${player1Wins}`)
      }
    }
    else {
      box.text("O");
      $player1.html("Player 1 <br> Turn: ✓");
      $player2.html("Player 2 <br> Turn: ");
      if (winningPlayer === 2) {
        $player1.html("Player 1 <br> Turn: ");
        $player2.html("Player 2 <br> Turn: <br><br> YOU WIN!");
        $player2Wins.text(`Wins: ${player2Wins}`)
      }
    }
  }

  // Starts a new game on button click
  newGame = function () {
    for (var i = 1; i < 10; i++) {
      let box = eval(`boxes.$box${i}`);
      box.html("&nbsp;");
    }
    board.row1 = ["","",""];
    board.row2 = ["","",""];
    board.row3 = ["","",""];
    totalTurns = 0;
    turn = 1;
    gameOver = false;
    winningPlayer = 0;
    $player1.html("Player 1 <br> Turn: ✓");
    $player2.html("Player 2 <br> Turn: ");
  }
  const $newGame = $('.newGame');
  $newGame.on("click", newGame);
});
