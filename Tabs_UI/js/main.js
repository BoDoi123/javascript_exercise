const items = document.querySelectorAll(".tab-item");
const panes = document.querySelectorAll(".tab-pane");

const line = document.querySelector(".line");
const tab_active = document.querySelector(".tab-item.active");

requestIdleCallback(() => {
	line.style.left = tab_active.offsetLeft + "px";
	line.style.width = tab_active.offsetWidth + "px";
});

items.forEach((tab, index) => {
	tab.addEventListener("click", (e) => {
		e.preventDefault();

		line.style.left = tab.offsetLeft + "px";
		line.style.width = tab.offsetWidth + "px";

		document.querySelector(".tab-item.active").classList.remove("active");
		document.querySelector(".tab-pane.active").classList.remove("active");

		tab.classList.add("active");
		panes[index].classList.add("active");
	});
});
