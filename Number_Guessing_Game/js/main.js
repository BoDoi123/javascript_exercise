const minNum = 1;
const maxNum = 100;
const answer = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;

let attempts = 0;
let guess;
let running = true;

while (running) {
    guess = prompt(`Guess a number between ${minNum} - ${maxNum}`);
    guess = Number(guess);

    if (isNaN(guess) || !Number.isInteger(guess)) {
        alert("Please enter a valid number");
        continue;
    } else if (guess > maxNum || guess < minNum) {
        alert(`Please enter a number between ${minNum} - ${maxNum}`);
        continue;
    }

    attempts++;
    if (guess < answer) {
        alert("TOO LOW! TRY AGAIN");
    } else if (guess > answer) {
        alert("TOO HIGH! TRY AGAIN");
    } else {
        alert(`Congratulation. Result is ${guess}
You tried ${attempts} times`);
        break;
    }
}
