const decreaseBtn = document.getElementById("decrease_btn");
const resetBtn = document.querySelector("#reset_btn");
const increaseBtn = document.getElementById("increase_btn");

const number_info = document.querySelector("#number");

decreaseBtn.addEventListener("click", () => {
    number_info.textContent = Number(number_info.textContent) - 1;
});

resetBtn.addEventListener("click", () => {
    number_info.textContent = 0;
});

increaseBtn.addEventListener("click", () => {
    number_info.textContent = Number(number_info.textContent) + 1;
});
