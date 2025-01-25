const player_choice = document.querySelector("#player_choice");
const computer_choice = document.getElementById("computer_choice");

const result_message = document.querySelector("#result_message");

const player_score = document.getElementById("player_score");
const computer_score = document.querySelector("#computer_score");

const choices = {
    0: "rock",
    1: "paper",
    2: "scissors",
};

function playGame(choice) {
    player_choice.textContent = `${choice}`;
    computer_choice.textContent = randomComputerChoice();

    compareChoice(choice, computer_choice.textContent);
}

function winEvent() {
    result_message.textContent = "YOU WIN!";
    result_message.style.color = "#6cd782";

    player_score.textContent = Number(player_score.textContent) + 1;
}

function loseEvent() {
    result_message.textContent = "YOU LOSE!";
    result_message.style.color = "#ae4a58";

    computer_score.textContent = Number(computer_score.textContent) + 1;
}

function tieEvent() {
    result_message.textContent = "IT'S A TIE";
    result_message.style.color = "black";
}

function randomComputerChoice() {
    let choice = Math.floor(Math.random() * 3);
    return choices[choice];
}

function compareChoice(player_choice, computer_choice) {
    let player_key = null;
    let computer_key = null;

    for (const key in choices) {
        if (choices[key] === player_choice) {
            player_key = Number(key);
        }
        if (choices[key] === computer_choice) {
            computer_key = Number(key);
        }
    }

    if (player_key === computer_key) {
        tieEvent();
    } else if ((player_key - computer_key + 3) % 3 === 1) {
        winEvent();
    } else {
        loseEvent();
    }
}

function resetGame() {
    player_choice.textContent = "";
    computer_choice.textContent = "";
    result_message.textContent = "";
    player_score.textContent = "0";
    computer_score.textContent = "0";
}
