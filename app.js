/*-------------------------------- Constants --------------------------------*/

/*---------------------------- Variables (state) ----------------------------*/

let isX = true;
let board = new Array(9);
let rounds = 0;
let check;

/*------------------------ Cached Element References ------------------------*/

const sqrElement = document.querySelectorAll(".sqr");
const msgElement = document.querySelector("#message");
const restBtnElement = document.querySelector('#reset-button')
const plyModeBtnElement = document.querySelector('#player-mode')

/*-------------------------------- Functions --------------------------------*/

function displayXO(event) {
  if(rounds>-1)
    {if (isX) {
    event.target.textContent = "x";
    board[event.target.id] = "x";
    isX = false;
  } else {
    event.target.textContent = "o";
    board[event.target.id] = "o";
    isX = true;
  }
  rounds += 1;
  if (rounds > 4) winnerTakesItAll(event);}
}

function winnerTakesItAll(event) {
  if (!isX) check = "x";
  else check = "o";
  console.log(board);

  if (board[0] === check) {
    console.log(check + "is 0");
    console.log(board[1], board[2], check);
    if (
      (board[1] === check && board[2] === check) ||
      (board[3] === check && board[6] === check) ||
      (board[4] === check && board[8] === check)
    ) {
      GG(check);
    }
  } else if (board[1] === check && board[4] === check && board[7] === check)
    GG(check);
  else if (board[2] === check) {
    if (
      (board[4] === check && board[6] === check) ||
      (board[5] === check && board[8] === check)
    )
      GG(check);
  } else if (board[3] === check && board[4] === check && board[5] === check)
    GG(check);
  else if (board[6] === check && board[7] === check && board[8] === check)
    GG(check);
  else if ((rounds = 9)) GG();

  console.log(rounds);
  console.log(event.target.id);
}
function GG(winner) {
  if (winner) msgElement.innerHTML = winner + " is winner!";
  else msgElement.innerHTML = "Tie";
  rounds = -1;
}
/*----------------------------- Event Listeners -----------------------------*/

sqrElement.forEach((square) => {
  square.addEventListener("click", displayXO);
});
