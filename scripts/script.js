var human, computer, board = [];
var wincomb = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

//Choose The Variable To Play With
function x() {
  var box = document.querySelectorAll(".box");
  for (let i = 0; i < box.length; i++) {
    board[i] = i;
    box[i].innerHTML = "";
    box[i].style.backgroundColor = null;
  }
  human = "X";
  computer = "O";
  document.querySelector(".option").style.display = "none";
  start();
}

function o() {
  var box = document.querySelectorAll(".box");
  for (let i = 0; i < box.length; i++) {
    board[i] = i;
    box[i].innerHTML = "";
    box[i].style.backgroundColor = null;
  }
  human = "O";
  computer = "X";
  document.querySelector("#ans").style.display = "none";
  start();
}

//Reset's The Game
function reset() {
  var box = document.querySelectorAll(".box");
  for (let i = 0; i < box.length; i++) {
    board[i] = i;
    box[i].innerHTML = "";
    box[i].style.backgroundColor = null;
  }
  document.querySelector("#ans").style.display = "block";
  document.querySelector("span").innerHTML = "Choose any one";
  start();
}

// Logic For Human Turn
function start() {
  var box = document.querySelectorAll(".box");
  for (let i = 0; i < box.length; i++) {
    box[i].onclick = function() {
      box[i].innerHTML = human;
      board[i] = human;
      i = 0;
      sameClick(board);
      var game = check(board, human);
      if (!game) {
        if (!tie()) aiturn();
        else {
          itsTie();
          dismiss();
        }
      } else {
        checkbox(game);
        dismiss();
      }
      emptybox();
    };
  }
}

//Check If The Player Won Or Not
function check(board, player) {
  var box = document.querySelectorAll(".box");
  let value = null;
  let play = board.reduce((a, e, i) => (e === player ? a.concat(i) : a), []);
  for (let i = 0; i < wincomb.length; i++) {
    if (wincomb[i].every(elem => play.indexOf(elem) > -1)) {
      value = { index: wincomb[i], player: player };
      break;
    }
  }
  return value;
}

// Show That The Game Is Tie
function itsTie() {
  var box = document.querySelectorAll(".box");
  for (let i = 0; i < box.length; i++) {
    box[i].style.backgroundColor = "green";
    document.querySelector("#ans").style.display = "block";
    document.querySelector("span").innerHTML = "Tie";
  }
}

// Display The Results
function checkbox(obj) {
  var box = document.querySelectorAll(".box");
  for (let i = 0; i < 3; i++) {
    if (obj.player === human) {
      box[obj.index[i]].style.backgroundColor = "lightgreen";
      document.querySelector("#ans").style.display = "block";
      document.querySelector("span").innerHTML = "You Won";
    } else {
      box[obj.index[i]].style.backgroundColor = "red";
      document.querySelector("#ans").style.display = "block";
      document.querySelector("span").innerHTML = "You Lose";
    }
  }
}

// Ends The Game So Player Can't Click Further
function dismiss() {
  var box = document.querySelectorAll(".box");
  for (let i = 0; i < box.length; i++)
    box[i].onclick = () => {
      alert("Game Is Over");
    };
}

//AI Turn
function aiturn() {
  var box = document.querySelectorAll(".box");
  box[minimax(board, computer).index].innerHTML = computer;
  board[minimax(board, computer).index] = computer;
  sameClick(board);
  var g = check(board, computer);
  if (g) {
    checkbox(g);
    dismiss();
  }
  if (tie()) {
    itsTie();
    dismiss();
  }
}

// Return's The Remaining Moves Player Can Move
function emptybox() {
  return board.filter((elm, i) => i === elm);
}

// So That Player Can't Click The Same Box
function sameClick(board) {
  var box = document.querySelectorAll(".box");
  let sample = board.reduce(
    (a, e, i) => (e === computer || e === human ? a.concat(i) : a),
    []
  );
  for (let i of sample)
    box[i].onclick = () => alert("You Have Clicked This Box");
}

// Logic To Check Tie
function tie() {
  let val = false;
  if (emptybox().length === 0) val = true;
  return val;
}

// AI Logic
function minimax(newBoard, player) {
  var availSpots = emptybox();

  if (check(newBoard, human)) {
    return { score: -10 };
  } else if (check(newBoard, computer)) {
    return { score: 10 };
  } else if (availSpots.length === 0) {
    return { score: 0 };
  }
  var moves = [];
  for (var i = 0; i < availSpots.length; i++) {
    var move = {};
    move.index = newBoard[availSpots[i]];
    newBoard[availSpots[i]] = player;

    if (player == computer) {
      var result = minimax(newBoard, human);
      move.score = result.score;
    } else {
      var result = minimax(newBoard, computer);
      move.score = result.score;
    }
    newBoard[availSpots[i]] = move.index;
    moves.push(move);
  }
  var bestMove;
  if (player === computer) {
    var bestScore = -10000;
    for (var i = 0; i < moves.length; i++) {
      if (moves[i].score > bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  } 
  else {
    var bestScore = 10000;
    for (var i = 0; i < moves.length; i++) {
      if (moves[i].score < bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }
  return moves[bestMove];
}
