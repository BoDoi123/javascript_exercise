// new variable
const winnerPattern = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

let turnX = true;
let count = 0;
let winner = "";

// variable of game
// game variable
const game = document.querySelector("#container");
const boxes = document.querySelectorAll(".box");
const reset_btn = document.querySelector("#reset_btn");

// message
const msg_box = document.querySelector("#msg_box");
const msg = document.querySelector("#msg");
const new_game_btn = document.querySelector("#new_game_btn");

// Play Event
for (let box of boxes) {
    box.addEventListener("click", () => {
        if (turnX) {
            box.textContent = "X";
            turnX = false;
        } else {
            box.textContent = "O";
            turnX = true;
        }

        count++;
        playGame();

        box.disabled = true;
    });
}

function playGame() {
    if (checkWinner()) {
        msg.textContent = `Congratulation! Winner is ${winner}`;
        msg.style.color = "rgba(255, 242, 0, 0.808)";

        endGame();
    }

    if (count === 9) {
        msg.textContent = `The game result is a draw`;
        msg.style.color = "#ffffff";

        endGame();
    }
}

function checkWinner() {
    for (let pattern of winnerPattern) {
        let pos1Val = boxes[pattern[0]].textContent;
        let pos2Val = boxes[pattern[1]].textContent;
        let pos3Val = boxes[pattern[2]].textContent;

        if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                winner = pos1Val;
                return true;
            }
        }
    }
}

function endGame() {
    msg_box.style.display = "block";
    game.style.display = "none";
}

// Reset Event
reset_btn.addEventListener("click", () => {
    resetGame();
});

function resetGame() {
    for (let box of boxes) {
        box.textContent = "";
        box.disabled = false;
    }

    turnX = true;
    count = 0;
}

// New Game Event
new_game_btn.addEventListener("click", () => {
    newGame();
});

function newGame() {
    msg.textContent = "";
    msg_box.style.display = "none";
    game.style.display = "block";

    resetGame();
}
