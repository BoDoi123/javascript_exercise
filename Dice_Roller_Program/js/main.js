const inputNumber = document.querySelector("#input_number");
const submitButton = document.querySelector("#submit");
const dice_list = document.querySelector("#dices");

function getNumberOfDice() {
    let number_of_dice = inputNumber.value;

    if (!inputNumber.value) {
        result_message.textContent = "Input your number of dice";
        setTimeout(() => {
            result_message.textContent = "";
        }, 4000);
        return;
    }

    return number_of_dice;
}

function rollDice() {
    let result_message = document.getElementById("result-message");
    let number_of_dice = getNumberOfDice();
    let value = [];
    let images = [];

    for (let i = 0; i < number_of_dice; i++) {
        // random dice
        let number = Math.floor(Math.random() * 6 + 1);

        // update message
        value.push(number);

        // push dice in images
        images.push(
            `<img src="./img/Dice-${number}.png" alt="dice ${number}" />`
        );
    }

    // set result_message
    result_message.textContent = `dice: ${value.join(", ")}`;

    // set dices
    dice_list.innerHTML = images.join("");
}

submitButton.addEventListener("click", (e) => {
    // prevent property of submit tag
    e.preventDefault();

    rollDice();
});
