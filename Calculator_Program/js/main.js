const display = document.getElementById("display");

function appendToDisplay(s) {
    display.value += s;
}

function clearDisplay() {
    display.value = "";
}

function calculate() {
    try {
        display.value = eval(display.value);
    } catch (error) {
        display.value = "Error";
    }
}
