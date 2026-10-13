/*-------------------------------- Constants --------------------------------*/

/*---------------------------- Variables (state) ----------------------------*/

let isX = true;
let board = new Array(9).fill(null);
let usrPos = null;
let rounds = 0;
let check;
let playerMode = "analog";

let winningCombos = new Set([
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]);

let gameOver = false;
let winner;

/*------------------------ Cached Element References ------------------------*/

const sqrElement = document.querySelectorAll(".sqr");
const msgElement = document.querySelector("#message");
const restBtnElement = document.querySelector("#reset-button");
const plyModeBtnElement = document.querySelector("#player-mode");

/*-------------------------------- Functions --------------------------------*/

function displayXO(event) {
  if (gameOver || event.target.textContent !== "") return;

  if (isX) {
    event.target.textContent = "x";
    board[Number(event.target.id)] = "x";
    usrPos = Number(event.target.id);
    isX = false;
  } else {
    event.target.textContent = "o";
    board[Number(event.target.id)] = "o";
    isX = true;
  }

  rounds++;
  winnerTakesItAll(event);
}

function winnerTakesItAll(event) {
  check = isX ? "o" : "x";

  winner = [...winningCombos].some(combo =>
    combo.every(index => board[index] === check)
  );

  if (winner) {
    GG(check);
  } else if (board.every(square => square !== null)) {
    GG();
  }
}

function GG(winner) {
  msgElement.textContent = winner
    ? winner + " is winner!"
    : "Tie";

  gameOver = true;
}

function reset() {
  sqrElement.forEach(square => {
    square.textContent = "";
  });

  board = new Array(9).fill(null);
  rounds = 0;
  isX = true;
  usrPos = null;
  gameOver = false;
  msgElement.textContent = "";
}

function Mode() {
  playerMode = playerMode === "analog" ? "computer" : "analog";

  plyModeBtnElement.textContent =
    playerMode === "analog" ? "Computer" : "Analog";

  sqrElement.forEach(square => {
    square.removeEventListener("click", displayXO);
    square.removeEventListener("click", tieOrDie);

    square.addEventListener(
      "click",
      playerMode === "analog" ? displayXO : tieOrDie
    );
  });

  reset();
}

function tieOrDie(event) {
  // Player's move
  if (gameOver || event.target.textContent !== "") return;

  displayXO(event);

  // Stop if the player wins or the game ties
  if (gameOver) return;

  // Save the player's position
  const playerPos = usrPos;

  // Find winning combinations containing the player's move
  const arr = [...winningCombos].filter(combo =>
    combo.includes(playerPos)
  );

  // Find an empty square in those combinations
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      const pos = arr[i][j];

      if (board[pos] === null) {
        displayXO({ target: sqrElement.item(pos) });
        return;
      }
    }
  }

  // If no suitable square exists, choose the first empty square
  for (let i = 0; i < board.length; i++) {
    if (board[i] === null) {
      displayXO({ target: sqrElement.item(i) });
      return;
    }
  }
}

/*----------------------------- Event Listeners -----------------------------*/

sqrElement.forEach(square => {
  square.addEventListener(
    "click",
    playerMode === "analog" ? displayXO : tieOrDie
  );
});

restBtnElement.addEventListener("click", reset);
plyModeBtnElement.addEventListener("click", Mode);