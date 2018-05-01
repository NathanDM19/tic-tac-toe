const board = {
  squares: ["", "", "", "", "", "", "", "", ""],
  test: ["", "", "", "", "", "", "", "", ""]
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
const squareCheck = function (position) {
  if (board.squares[position] === "") {
    return;
  } else {
    console.log("Square already taken!");
    squareTaken = true;
  }
};


// Goes through every possible combination left, for both the player and AI
// Gives a score for each next move, the score being based off how many times the AI wins from that move.
let squareTakenAI = false;
let turnAI = 0;
let testingScore = 0;
let winCounterHU = 0;
let mostWinsAI = 100000;
let nextCheckAI = false;
let winTestFinal = false;
let totalBreak = false;
let lose = false;
let win = false;
const ai = function () {
  let turnsLeft = 9-totalTurns;
  let toUse = [];
  squareTakenAI = false;
  turnAI = 0;
  testingScore = 0;
  winCounterHU = 0;
  mostWinsAI = 100000;
  turnAI = turn;
  nextCheckAI = false;
  for (let i = 0; i < 9; i++) {
    if (board.squares[i] === "") {
      toUse.push(i);

    }
  }
  board.test = board.squares.slice(0);
  // console.log(board.test);
  if (turnsLeft === 8) {
    if (board.squares[4] !== "") {
      takeTurn(9);
      return;
    } else {
      takeTurn(5);
      return;
    }
  } else if (turnsLeft === 6) {
    for (let i = 0; i < 6; i++) {
      board.test = board.squares.slice(0);
      // if (boardAI.row1[1] === "x" && boardAI.row2[0] === "x") {
      //   takeTurn(1);
      //   return;
      // }
      // else if (boardAI.row1[1] === "x" && boardAI.row2[2] === "x") {
      //   takeTurn(3);
      //   return;
      // }
      // else if (boardAI.row2[0] === "x" && boardAI.row3[1] === "x") {
      //   takeTurn(7);
      //   return;
      // }
      // else if (boardAI.row2[2] === "x" && boardAI.row3[1] === "x") {
      //   takeTurn(9);
      //   return;
      // }
      // else if (boardAI.row1[1] === "x" && boardAI.row3[0] === "x") {
      //   takeTurn(1);
      //   return;
      // }
      // else if (boardAI.row1[1] === "x" && boardAI.row3[2] === "x") {
      //   takeTurn(3);
      //   return;
      // }
      // else if (boardAI.row2[0] === "x" && boardAI.row1[2] === "x") {
      //   takeTurn(1);
      //   return;
      // }
      // else if (boardAI.row2[0] === "x" && boardAI.row3[2] === "x") {
      //   takeTurn(7);
      //   return;
      // }
      // else if (boardAI.row2[2] === "x" && boardAI.row1[0] === "x") {
      //   takeTurn(3);
      //   return;
      // }
      // else if (boardAI.row2[2] === "x" && boardAI.row3[0] === "x") {
      //   takeTurn(9);
      //   return;
      // }
      // else if (boardAI.row3[1] === "x" && boardAI.row1[0] === "x") {
      //   takeTurn(7);
      //   return;
      // }
      // else if (boardAI.row3[1] === "x" && boardAI.row1[2] === "x") {
      //   takeTurn(9);
      //   return;
      // }
      // else if (boardAI.row1[0] === "x" && boardAI.row3[2] === "x") {
      //   takeTurn(2);
      //   return;
      // }
      // else if (boardAI.row1[2] === "x" && boardAI.row3[0] === "x") {
      //   takeTurn(2);
      //   return;
      // }
      takeTurnAI(toUse[i], 0);
      for (let j = 0; j < 6; j++) {
        board.test = board.squares.slice(0);
        takeTurnAI(toUse[i], 0);
        takeTurnAI(toUse[j], 1);
        if (testComplete) {
          testComplete = false;
          if (win) {
            testingScore -= 10000;
          } else if (lose) {
            testingScore += 10000;
          }
          win = false;
          lose = false;
          continue;
        }
        for (let k = 0; k < 6; k++) {
          board.test = board.squares.slice(0);
          takeTurnAI(toUse[i], 0);
          takeTurnAI(toUse[j], 1);
          takeTurnAI(toUse[k], 0);
          if (testComplete) {
            testComplete = false;
            if (win) {
              testingScore -= 200;
            } else if (lose) {
              testingScore += 200;
            }
            win = false;
            lose = false;
            continue;
          }
          for (let l = 0; l < 6; l++) {
            board.test = board.squares.slice(0);
            takeTurnAI(toUse[i], 0);
            takeTurnAI(toUse[j], 1);
            takeTurnAI(toUse[k], 0);
            takeTurnAI(toUse[l], 1);
            if (testComplete) {
              testComplete = false;
              if (win) {
                testingScore -= 100;
              } else if (lose) {
                testingScore += 100;
              }
              win = false;
              lose = false;
              continue;
            }
            for (let m = 0; m < 6; m++) {
              board.test = board.squares.slice(0);
              // console.log(toUse);
              takeTurnAI(toUse[i], 0);
              takeTurnAI(toUse[j], 1);
              takeTurnAI(toUse[k], 0);
              takeTurnAI(toUse[l], 1);
              takeTurnAI(toUse[m], 0);
              if (testComplete) {
                testComplete = false;
                if (win) {
                  testingScore -= 50;
                } else if (lose) {
                  testingScore += 50;
                }
                win = false;
                lose = false;
                continue;
              }
              for (let n = 0; n < 6; n++) {
                board.test = board.squares.slice(0);
                takeTurnAI(toUse[i], 0);
                takeTurnAI(toUse[j], 1);
                takeTurnAI(toUse[k], 0);
                takeTurnAI(toUse[l], 1);
                takeTurnAI(toUse[m], 0);
                takeTurnAI(toUse[n], 1);
              }
            }
          }
        }
      }
      console.log(i,testingScore), "AI";
      // console.log(i, mostWinsAI, testingScore);
      if (mostWinsAI > testingScore) {
        mostWinsAI = testingScore;
        squareToTakeAI = toUse[i];
      }
      winCounterHU = 0;
      testingScore = 0;
    }
  } else if (turnsLeft === 4) {
      for (let i = 0; i < toUse.length; i++) {
        let tempToUse = toUse.slice(0);
        boardAI.row1 = board.row1.slice(0);
        boardAI.row2 = board.row2.slice(0);
        boardAI.row3 = board.row3.slice(0);
        takeTurnAI(tempToUse[i], 0);
        boardAI2.row1 = boardAI.row1.slice(0);
        boardAI2.row2 = boardAI.row2.slice(0);
        boardAI2.row3 = boardAI.row3.slice(0);
        tempToUse.splice(i, 1);
        for (let j = 0; j < toUse.length-1; j++) {
          let tempToUse2 = tempToUse.slice(0);
          boardAI
          takeTurnAI(tempToUse2[j], 1);
          if (nextCheckAI) {
            // testingScore += 100;
            nextCheckAI = false;
          }
          tempToUse2.splice(j, 1);
          for (let k = 0; k < toUse.length-2; k++) {
            let tempToUse3 = tempToUse2.slice(0);
            boardAI.row1 = boardAI2.row1.slice(0);
            boardAI.row2 = boardAI2.row2.slice(0);
            boardAI.row3 = boardAI2.row3.slice(0);
            takeTurnAI(tempToUse2[j], 1);
            boardAI3.row1 = boardAI.row1.slice(0);
            boardAI3.row2 = boardAI.row2.slice(0);
            boardAI3.row3 = boardAI.row3.slice(0);
            tempToUse3.splice(k, 1);
            if (winTestFinal) {
              winTestFinal = false;
              continue;
            }
            for (let l = 0; l < toUse.length-3; l++) {
              let tempToUse4 = tempToUse3.slice(0);
              takeTurnAI(tempToUse4[l], 1);
            }
          }
        }
        // console.log(i,testingScore), "AI";
        // console.log(i,winCounterHU, "Human");
        if (mostWinsAI < testingScore) {
          mostWinsAI = testingScore;
          squareToTakeAI = toUse[i];
        }
        winCounterHU = 0;
        testingScore = 0;
      }
  } else if (turnsLeft === 2) {
      for (let i = 0; i < toUse.length; i++) {
        let tempToUse = toUse.slice(0);
        boardAI.row1 = board.row1.slice(0);
        boardAI.row2 = board.row2.slice(0);
        boardAI.row3 = board.row3.slice(0);
        takeTurnAI(tempToUse[i], 0);
        tempToUse.splice(i, 1);
        for (let j = 0; j < toUse.length-1; j++) {
          takeTurnAI(tempToUse[j], 1);
        }
        // console.log(testingScore);
        if (mostWinsAI < testingScore) {
          mostWinsAI = testingScore;
          squareToTakeAI = toUse[i];
        }
        testingScore = 0;
      }
  }
  console.log(mostWinsAI, squareToTakeAI);
  takeTurn(squareToTakeAI+1);
}
const takeTurnAI = function (position, turn) {
  // console.log(position);
  // console.log(position);
  // console.log(position);
  if (board.test[position] !== "") {
    return;
  }
  // console.log("hello");
  if (turn === 1) {
    board.test[position] = "x";
  } else {
    board.test[position] = "o";
  }
  // console.log("test");
  winCheckTest();
}
const winCheckTest = function () {
  testComplete = false;
  // console.log(board.test);
  for (let i = 0; i < 3; i++) {
    let winTest = board.test[i]+board.test[i+3]+board.test[i+6];
    // console.log(board.test[i], board.test[i+3], board.test[i+6]);
    if (winTest === "xxx") {
      // console.log("S1");
      lose = true;
      testingScore += 10;
      testComplete = true;
    } else if (winTest === "ooo") {
      win = true;
      testingScore -= 10;
      testComplete = true;
    }
  }
  for (let i = 0; i < 9; i += 3) {
    let winTest = board.test[i]+board.test[i+1]+board.test[i+2];
    if (winTest === "xxx") {
      // console.log("S2");
      lose = true;
      testingScore +=10;
      testComplete = true;
    } else if (winTest === "ooo") {
      win = true;
      testingScore -=10;
      testComplete = true;
    }
  }
  let winTest = board.test[0]+board.test[4]+board.test[8];
  if (winTest === "xxx") {
    // console.log("S3");
    lose = true;
    testingScore +=10;
    testComplete = true;
  } else if (winTest === "ooo") {
    win = true;
    testingScore -=10;
    testComplete = true;
  }
  winTest = board.test[2]+board.test[4]+board.test[6];
  if (winTest === "xxx") {
    lose = true;
    testingScore +=10;
    testComplete = true;
  } else if (winTest === "ooo") {
    win = true;
    testingScore -=10;
    testComplete = true;
  }
}
// Checks to see if someone has won
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

// Function for taking a turn
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
 if (totalTurns === 1 || totalTurns === 3) {
   ai();
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
