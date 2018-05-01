const board = {
  squares: ["", "", "", "", "", "", "", "", ""],
  testSquares: ["", "", "", "", "", "", "", "", ""],
  testSquares2: ["", "", "", "", "", "", "", "", ""]
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
let testing = false;
let testingScore = 0;
let testComplete = false;
let goTest = 0;
let squareSplice;
let squareSplice2;
const ai = function (turn) {
  let possibleMoves = [];
  let possibleMovesBackup = [];
  let scores = [];
  let moves = [];
  goTest = turn;
  testingScore = 0;
  for (let i = 0; i < 9; i++) {
    if (board.squares[i] === "") {
      possibleMoves.push(i);
    }
  }
  if (possibleMoves.length === 8) {
    if (board.squares[4] !== "") {
      takeTurn(9);
      return;
    } else {
      takeTurn(5);
      return;
    }
  }
  possibleMovesBackup = possibleMoves.slice(0);
  let counter = possibleMoves.length
  for (let i = 0; i < counter; i++) {
    board.testSquares = board.squares.slice(0);
    turnTest(possibleMoves[i], 0);
    squareSlice = possibleMoves[i];
    // possibleMoves.splice(0, 1);
    console.log(i, counter, possibleMoves[i]);
    // console.log(board.testSquares, i, testingScore, possibleMoves);
    console.log(testingScore);
    console.log(board.testSquares);
    if (testingScore <= -10) {
      console.log(squareSlice+1);
      takeTurn(squareSlice+1);
      return;
    }
    for (let j = 0; j < counter-1; j++) {
      board.testSquares = board.squares.slice(0);
      console.log("````````````");
      console.log(board.testSquares);
      turnTest(possibleMoves[i], 0);
      turnTest(possibleMoves[j], 1);
      console.log(board.testSquares);
      console.log("````````````");
      squareSlice2 = possibleMoves[j];
      // possibleMoves.splice(1,1);
      if (testingScore === 10) {
        moves[j] = squareSlice2;
      }
    }
    tesingScore = 0;
    // possibleMoves.push(squareSlice);
  }
}
const turnTest = function (position, turn) {
  if (board.testSquares[position] !== "") {
    return;
  }
  if (turn === 1) {
    board.testSquares[position] = "x";
    goTest = 0;
  } else {
    board.testSquares[position] = "o";
    goTest = 1;
  }
  winCheckTest();
}
const winCheckTest = function () {
  testComplete = false;
  // console.log(board.testSquares);
  for (let i = 0; i < 3; i++) {
    let winTest = board.testSquares[i]+board.testSquares[i+3]+board.testSquares[i+6];
    // console.log(board.testSquares[i], board.testSquares[i+3], board.testSquares[i+6]);
    if (winTest === "xxx") {
      // console.log("S1");
      testingScore += 10;
      testComplete = true;
    } else if (winTest === "ooo") {
      testingScore -= 10;
      testComplete = true;
    }
  }
  for (let i = 0; i < 9; i += 3) {
    let winTest = board.testSquares[i]+board.testSquares[i+1]+board.testSquares[i+2];
    if (winTest === "xxx") {
      // console.log("S2");
      testingScore +=10;
      testComplete = true;
    } else if (winTest === "ooo") {
      testingScore -=10;
      testComplete = true;
    }
  }
  let winTest = board.testSquares[0]+board.testSquares[4]+board.testSquares[8];
  if (winTest === "xxx") {
    // console.log("S3");
    testingScore +=10;
    testComplete = true;
  } else if (winTest === "ooo") {
    testingScore -=10;
    testComplete = true;
  }
  winTest = board.testSquares[2]+board.testSquares[4]+board.testSquares[6];
  if (winTest === "xxx") {
    testingScore +=10;
    testComplete = true;
  } else if (winTest === "ooo") {
    testingScore -=10;
    testComplete = true;
  }
}
const winCheck = function () {
  for (let i = 0; i < 3; i++) {
    let winTest = board.squares[i]+board.squares[i+3]+board.squares[i+6];
    if (winTest === "xxx" || winTest === "ooo") {
      winner();
      return;
    }
  }
  for (let i = 0; i < 8; i += 3) {
    let winTest = board.squares[i]+board.squares[i+1]+board.squares[i+2];
    if (winTest === "xxx" || winTest === "ooo") {
      winner();
      return;
    }
  }
  let winTest = board.squares[0]+board.squares[4]+board.squares[8];
  if (winTest === "xxx" || winTest === "ooo") {
    winner();
    return;
  }
  winTest = board.squares[2]+board.squares[4]+board.squares[6];
  if (winTest === "xxx" || winTest === "ooo") {
    winner();
    return;
  }
  if (totalTurns === 8) {
    console.log(`Its a draw!`)
    gameOver = true;
  }
}

// Runs if someone has won
const winner = function () {
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
const squareCheck = function (position) {
  if (board.squares[position] === "") {
    return;
  } else {
    console.log("Square already taken!");
    squareTaken = true;
  }
};
const takeTurn = function (square) {
 let position = square-1;
 squareCheck(position);
 if (!squareTaken) {
   if (turn === 1) {
     board.squares[position] = "x";
   } else {
     board.squares[position] = "o";
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
};
// Function for taking a turn
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
  updateGrid = function(position, turn) {
    let box = eval(`boxes.$box${position}`);
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
    board.squares = ["", "", "", "", "", "", "", "", ""]
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
