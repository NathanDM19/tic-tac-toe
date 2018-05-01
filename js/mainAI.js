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


// Goes through every possible combination left, for both the player and AI
// Gives a score for each next move, the score being based off how many times the AI wins from that move.
let squareTakenAI = false;
let turnAI = 0;
let winCounterAI = 0;
let winCounterHU = 0;
let mostWinsAI = -100000;
let nextCheckAI = false;
let winTestFinal = false;
let totalBreak = false;
const boardAI = {
  row1: ["", "", ""],
  row2: ["", "", ""],
  row3: ["", "", ""]
};
const boardAI2 = {
  row1: ["", "", ""],
  row2: ["", "", ""],
  row3: ["", "", ""]
}
const boardAI3 = {
  row1: ["", "", ""],
  row2: ["", "", ""],
  row3: ["", "", ""]
}
const boardAI4 = {
  row1: ["", "", ""],
  row2: ["", "", ""],
  row3: ["", "", ""]
}
const boardAI5 = {
  row1: ["", "", ""],
  row2: ["", "", ""],
  row3: ["", "", ""]
}
const boardAI6 = {
  row1: ["", "", ""],
  row2: ["", "", ""],
  row3: ["", "", ""]
}
const boardAI7 = {
  row1: ["", "", ""],
  row2: ["", "", ""],
  row3: ["", "", ""]
}
const ai = function () {
  let turnsLeft = 9-totalTurns;
  let toUse = [];
  squareTakenAI = false;
  turnAI = 0;
  winCounterAI = 0;
  winCounterHU = 0;
  mostWinsAI = -100000;
  turnAI = turn;
  nextCheckAI = false;
  for (let i = 0; i < 3; i++) {
    let currentRow = board.rows[i];
    for(let j = 0; j < 3; j++) {
      if (board[currentRow][j] === "") {
        if (i === 0) {
          toUse.push(j+1);
        }
        if (i === 1) {
          toUse.push(j+4);
        }
        if (i === 2) {
          toUse.push(j+7);
        }
      }
    }
  }
  if (turnsLeft === 8) {
    for (let i = 0; i < toUse.length; i++) {
      let tempToUse = toUse.slice(0);
      boardAI.row1 = board.row1.slice(0);
      boardAI.row2 = board.row2.slice(0);
      boardAI.row3 = board.row3.slice(0);
      takeTurnAI(tempToUse[i], 0);
      tempToUse.splice(i, 1);
      for (let j = 0; j < toUse.length-1; j++) {
        let tempToUse2 = tempToUse.slice(0);
        takeTurnAI(tempToUse2[j], 1);
        tempToUse2.splice(j, 1);
        for (let k = 0; k < toUse.length-2; k++) {
          let tempToUse3 = tempToUse2.slice(0);
          takeTurnAI(tempToUse3[k], 0);
          tempToUse3.splice(k, 1);
          for (let l = 0; l < toUse.length-3; l++) {
            let tempToUse4 = tempToUse3.slice(0);
            takeTurnAI(tempToUse4[l], 1);
            tempToUse4.splice(l, 1);
            for (let m = 0; m < toUse.length-4; m++) {
              let tempToUse5 = tempToUse4.slice(0);
              takeTurnAI(tempToUse5[m], 0);
              tempToUse5.splice(m, 1);
              for (let n = 0; n < toUse.length-5; n++) {
                let tempToUse6 = tempToUse5.slice(0);
                takeTurnAI(tempToUse6[n], 1);
                tempToUse6.splice(n, 1);
                for (let o = 0; o < toUse.length-6; o++) {
                  let tempToUse7 = tempToUse6.slice(0);
                  takeTurnAI(tempToUse7[o], 0);
                  tempToUse7.splice(o, 1);
                  for (let p = 0; p < toUse.length-7; p++) {
                    let tempToUse8 = tempToUse7.slice(0);
                    takeTurnAI(tempToUse8[p], 1);
                  }
                }
              }
            }
          }
        }
      }
      // console.log(i,winCounterAI), "AI";
      // console.log(i,winCounterHU, "Human");
      if (mostWinsAI < winCounterAI) {
        mostWinsAI = winCounterAI;
        squareToTakeAI = toUse[i];
      }
      winCounterHU = 0;
      winCounterAI = 0;
    }
  } else if (turnsLeft === 6) {
    for (let i = 0; i < 6; i++) {
      // console.log(toUse.length);
      let tempToUse = toUse.slice(0);
      boardAI.row1 = board.row1.slice(0);
      boardAI.row2 = board.row2.slice(0);
      boardAI.row3 = board.row3.slice(0);
      if (boardAI.row1[1] === "x" && boardAI.row2[0] === "x") {
        takeTurn(1);
        return;
      }
      else if (boardAI.row1[1] === "x" && boardAI.row2[2] === "x") {
        takeTurn(3);
        return;
      }
      else if (boardAI.row2[0] === "x" && boardAI.row3[1] === "x") {
        takeTurn(7);
        return;
      }

      // func(ind1, ind2, symbol, move)

      else if (boardAI.row2[2] === "x" && boardAI.row3[1] === "x") {
        takeTurn(9);
        return;
      }
      else if (boardAI.row1[1] === "x" && boardAI.row3[0] === "x") {
        takeTurn(1);
        return;
      }
      else if (boardAI.row1[1] === "x" && boardAI.row3[2] === "x") {
        takeTurn(3);
        return;
      }
      else if (boardAI.row2[0] === "x" && boardAI.row1[2] === "x") {
        takeTurn(1);
        return;
      }
      else if (boardAI.row2[0] === "x" && boardAI.row3[2] === "x") {
        takeTurn(7);
        return;
      }
      else if (boardAI.row2[2] === "x" && boardAI.row1[0] === "x") {
        takeTurn(3);
        return;
      }
      else if (boardAI.row2[2] === "x" && boardAI.row3[0] === "x") {
        takeTurn(9);
        return;
      }
      else if (boardAI.row3[1] === "x" && boardAI.row1[0] === "x") {
        takeTurn(7);
        return;
      }
      else if (boardAI.row3[1] === "x" && boardAI.row1[2] === "x") {
        takeTurn(9);
        return;
      }
      else if (boardAI.row1[0] === "x" && boardAI.row3[2] === "x") {
        takeTurn(2);
        return;
      }
      else if (boardAI.row1[2] === "x" && boardAI.row3[0] === "x") {
        takeTurn(2);
        return;
      }
      else if (boardAI.row1[1] === "x" && boardAI.row2[1] === "x") {
        takeTurn(8);
        return;
      }
      else if (boardAI.row2[0] === "x" && boardAI.row2[1] === "x") {
        takeTurn(6);
        return;
      }
      else if (boardAI.row3[1] === "x" && boardAI.row2[1] === "x") {
        takeTurn(2);
        return;
      }
      else if (boardAI.row2[2] === "x" && boardAI.row2[1] === "x") {
        takeTurn(4);
        return;
      }
      takeTurnAI(tempToUse[i], 0);
      boardAI2.row1 = boardAI.row1.slice(0);
      boardAI2.row2 = boardAI.row2.slice(0);
      boardAI2.row3 = boardAI.row3.slice(0);
      // console.log("~~~~~~~~~~");
      // console.log(boardAI.row1);
      // console.log(boardAI.row2);
      // console.log(boardAI.row3);
      tempToUse.splice(i, 1);
      for (let j = 0; j < 5; j++) {
        let tempToUse2 = tempToUse.slice(0);
        boardAI.row1 = boardAI2.row1.slice(0);
        boardAI.row2 = boardAI2.row2.slice(0);
        boardAI.row3 = boardAI2.row3.slice(0);
        takeTurnAI(tempToUse2[j], 1);
        boardAI3.row1 = boardAI.row1.slice(0);
        boardAI3.row2 = boardAI.row2.slice(0);
        boardAI3.row3 = boardAI.row3.slice(0);
        tempToUse2.splice(j, 1);
        // console.log("----------");
        // console.log(boardAI.row1);
        // console.log(boardAI.row2);
        // console.log(boardAI.row3);
        if (winTestFinal) {
          // console.log("S");
          winTestFinal = false;
          continue;
        }
        for (let k = 0; k < 4; k++) {
          let tempToUse3 = tempToUse2.slice(0);
          boardAI.row1 = boardAI3.row1.slice(0);
          boardAI.row2 = boardAI3.row2.slice(0);
          boardAI.row3 = boardAI3.row3.slice(0);
          takeTurnAI(tempToUse3[k], 0);
          boardAI4.row1 = boardAI.row1.slice(0);
          boardAI4.row2 = boardAI.row2.slice(0);
          boardAI4.row3 = boardAI.row3.slice(0);
          tempToUse3.splice(k, 1);
          if (winTestFinal) {
            winTestFinal = false;
            continue;
          }
          for (let l = 0; l < 3; l++) {
            let tempToUse4 = tempToUse3.slice(0);
            boardAI.row1 = boardAI4.row1.slice(0);
            boardAI.row2 = boardAI4.row2.slice(0);
            boardAI.row3 = boardAI4.row3.slice(0);
            takeTurnAI(tempToUse4[l], 1);
            boardAI5.row1 = boardAI.row1.slice(0);
            boardAI5.row2 = boardAI.row2.slice(0);
            boardAI5.row3 = boardAI.row3.slice(0);
            tempToUse4.splice(l, 1);
            if (winTestFinal) {
              winTestFinal = false;
              continue;
            }
            for (let m = 0; m < 2; m++) {
              let tempToUse5 = tempToUse4.slice(0);
              boardAI.row1 = boardAI5.row1.slice(0);
              boardAI.row2 = boardAI5.row2.slice(0);
              boardAI.row3 = boardAI5.row3.slice(0);
              takeTurnAI(tempToUse5[m], 0);
              boardAI6.row1 = boardAI.row1.slice(0);
              boardAI6.row2 = boardAI.row2.slice(0);
              boardAI6.row3 = boardAI.row3.slice(0);
              // console.log("----------");
              // console.log(boardAI.row1);
              // console.log(boardAI.row2);
              // console.log(boardAI.row3);
              tempToUse5.splice(m, 1);
              if (winTestFinal) {
                winTestFinal = false;
                continue;
              }
              for (let n = 0; n < 1; n++) {
                let tempToUse6 = tempToUse5.slice(0);
                boardAI.row1 = boardAI6.row1.slice(0);
                boardAI.row2 = boardAI6.row2.slice(0);
                boardAI.row3 = boardAI6.row3.slice(0);
                takeTurnAI(tempToUse6[n], 1);
              }
            }
          }
        }
      }
      console.log(i,winCounterAI), "AI";
      // console.log(i,winCounterHU, "Human");
      if (mostWinsAI < winCounterAI) {
        mostWinsAI = winCounterAI;
        squareToTakeAI = toUse[i];
      }
      winCounterHU = 0;
      winCounterAI = 0;
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
            // winCounterAI += 100;
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
        // console.log(i,winCounterAI), "AI";
        // console.log(i,winCounterHU, "Human");
        if (mostWinsAI < winCounterAI) {
          mostWinsAI = winCounterAI;
          squareToTakeAI = toUse[i];
        }
        winCounterHU = 0;
        winCounterAI = 0;
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
        // console.log(winCounterAI);
        if (mostWinsAI < winCounterAI) {
          mostWinsAI = winCounterAI;
          squareToTakeAI = toUse[i];
        }
        winCounterAI = 0;
      }
  }
  // console.log(mostWinsAI, squareToTakeAI);
  takeTurn(squareToTakeAI);
}
const takeTurnAI = function (square, turnAI) {
  if (!gameOver) {
    if (square <= 3) {
      row = "row1";
      position = square-1;
    } else if (square <= 6) {
      row = "row2";
      position = square-4;
    } else {
      row = "row3";
      position = square-7;
    }
    if (!squareTakenAI) {
      if (turnAI === 1) {
        boardAI[row][position] = "x";
      } else {
        boardAI[row][position] = "o";
      }
      winCheckAI();
    }
    squareTakenAI = false;
  }
};
const winCheckAI = function () {
  winTestFinal = false;
  for (var i = 0; i < 3; i++) {
    let currentRow = board.rows[i];
    let winTest = boardAI[currentRow][0]+boardAI[currentRow][1]+boardAI[currentRow][2];
    if (winTest === "ooo") {
      winTestFinal = true;
      winCounterAI += 10;
    } else if (winTest === "xxx") {
      winCounterAI -= 10;
      winTestFinal = true;
      nextCheckAI = true;
    }
  }
  for (var i = 0; i < 3; i++) {
    let winTest = boardAI.row1[i]+boardAI.row2[i]+boardAI.row3[i];
    if (winTest === "ooo") {
      winTestFinal = true;
      winCounterAI += 10;
    } else if (winTest === "xxx") {
      winCounterAI -= 10;
      winTestFinal = true;
      nextCheckAI = true;
    }
  }
  let diag1 = boardAI.row1[0]+boardAI.row2[1]+boardAI.row3[2];
  let diag2 = boardAI.row1[2]+boardAI.row2[1]+boardAI.row3[0];
  if (diag1 === "ooo" || diag2 === "ooo") {
    winCounterAI += 10;
    winTestFinal = true;
    return;
  } else if (diag1 === "xxx" || diag2 === "xxx") {
    winCounterAI -= 10;
    winCounterHU += 1;
    nextCheckAI = true;
    winTestFinal = true;
  }
  if (boardAI.row1[0] !== "" && boardAI.row1[1] !== "" && boardAI.row1[2] !== "") {
    if (boardAI.row2[0] !== "" && boardAI.row2[1] !== "" && boardAI.row2[2] !== "") {
      if (boardAI.row3[0] !== "" && boardAI.row3[1] !== "" && boardAI.row3[2] !== "") {
        if (!winTestFinal) {
          // winCounterAI += 1;
          // console.log("I RAN");
          // winTestFinal = false;
        }
      }
    }
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
  if (gameOver) {
    return;
  }
  if (turn === 0 && totalTurns !== 9) {
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
