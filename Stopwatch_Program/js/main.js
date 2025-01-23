const clock = document.querySelector("#clock");
let isRunning = false;
let startTime = 0;
let elapsedTime = 0;
let timer = null;

function action() {
    const start_btn = document.querySelector("#start_btn");
    const stop_btn = document.getElementById("stop_btn");
    const reset_btn = document.getElementById("reset_btn");

    start_btn.addEventListener("click", startEvent);
    stop_btn.addEventListener("click", stopEvent);
    reset_btn.addEventListener("click", resetEvent);
}

function startEvent() {
    if (!isRunning) {
        startTime = Date.now() - elapsedTime;
        timer = setInterval(update, 10);
        isRunning = true;
    }
}

function update() {
    const currentTime = Date.now();
    elapsedTime = currentTime - startTime;

    let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    let minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
    let seconds = Math.floor((elapsedTime / 1000) % 60);
    let milliseconds = Math.floor((elapsedTime % 1000) / 10);

    hours = String(hours).padStart(2, 0);
    minutes = String(minutes).padStart(2, 0);
    seconds = String(seconds).padStart(2, 0);
    milliseconds = String(milliseconds).padStart(2, 0);

    let timeString = `${hours}:${minutes}:${seconds}:${milliseconds}`;

    clock.textContent = timeString;
}

function stopEvent() {
    if (isRunning) {
        clearInterval(timer);
        elapsedTime = Date.now() - startTime;
        isRunning = false;
    }
}

function resetEvent() {
    stopEvent();
    clock.textContent = "00:00:00:00";
    startTime = 0;
    elapsedTime = 0;
    timer = null;
}

window.addEventListener("load", action);
