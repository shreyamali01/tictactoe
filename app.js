let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");

let turn0 = true;
let turnX = false;

const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    console.log("box was clicked");
    if (turn0) {
      box.innerText = "O";
      turn0 = false;
      turnX = true;
    } else {
      box.innerText = "X";
      turnX = false;
      turn0 = true;
    }
    box.disabled = true;

    checkWinner();
    checkTie();
  });
});

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
  }
};

const resetGame = () => {
  turn0 = true;
  turnX = false;
  enableBoxes();
  for (let box of boxes) {
    box.innerText = "";
  }
};

const checkWinner = () => {
  let counter = false;
  for (let pattern of winPatterns) {
    let pos1 = boxes[pattern[0]].innerText;
    let pos2 = boxes[pattern[1]].innerText;
    let pos3 = boxes[pattern[2]].innerText;

    if (pos1 != "" && pos2 != "" && pos3 != "") {
      if (pos1 === pos2 && pos2 === pos3) {
        console.log("winner");
        counter = true;
      }
    }

    if (counter === true) {
      disableBoxes();
      setTimeout(() => {
        alert(`Player ${pos1} won!`);
      }, 120);
    }
  }
};

const checkTie = () => {
  let filled = true;
  boxes.forEach((box) => {
    if (box.innerText === "") {
      filled = false;
    }
  });

  if (filled) {
    disableBoxes();
    setTimeout(() => {
      alert("It's a tie!");
    }, 120);
  }
};

resetBtn.addEventListener("click", resetGame);
