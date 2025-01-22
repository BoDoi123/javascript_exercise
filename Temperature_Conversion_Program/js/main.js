const input_number = document.querySelector("#input_number");

const fahrenheit = document.querySelector("#toFahrenheit");
const celsius = document.querySelector("#toCelsius");

const submit = document.querySelector(".submit");

const result = document.querySelector("#result-message");

function convert(number) {
    if (number === "") {
        result.textContent = "Input your number";
        setTimeout(() => {
            result.textContent = "";
        }, 5000);
        return;
    }

    if (fahrenheit.checked) {
        result.textContent = (number * (9 / 5) + 32).toFixed(1) + "°F";
    } else if (celsius.checked) {
        result.textContent = ((number - 32) * (5 / 9)).toFixed(1) + "°C";
    } else {
        result.textContent = "Select a unit";
        setTimeout(() => {
            result.textContent = "";
        }, 5000);
    }
}

submit.addEventListener("click", (e) => {
    e.preventDefault();

    convert(input_number.value);
});

window.addEventListener("load", () => {
    input_number.focus();
});
