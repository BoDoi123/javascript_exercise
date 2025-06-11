// import { createStore } from "https://cdn.skypack.dev/redux";

// redux, react, react-redux

/////////////////////////// MY REDUX ////////////////////////////
function createStore(reducer) {
	let state = reducer(undefined, {});
	const subscribers = [];

	return {
		getState() {
			return state;
		},

		dispatch(action) {
			state = reducer(state, action);

			subscribers.forEach((subscriber) => subscriber());
		},

		subscribe(subscriber) {
			subscribers.push(subscriber);
		},
	};
}

/////////////////////////// MY APP ////////////////////////////
const initState = 0;

// Reducer
function counter(state = initState, action) {
	switch (action.type) {
		case "DEPOSIT":
			return state + action.payload;

		case "WITHDRAW":
			return state - action.payload;

		default:
			return state;
	}
}

// Store
const store = (window.store = createStore(counter));

// Action
function actionDeposit(payload) {
	return {
		type: "DEPOSIT",
		payload,
	};
}

function actionWithdraw(payload) {
	return {
		type: "WITHDRAW",
		payload,
	};
}

// DOM events
const deposit = document.querySelector("#deposit");
const withdraw = document.querySelector("#withdraw");

// Event handler
deposit.addEventListener("click", () => {
	store.dispatch(actionDeposit(10));
});

withdraw.addEventListener("click", () => {
	store.dispatch(actionWithdraw(10));
});

// Listener
store.subscribe(() => {
	render();
});

// Render
function render() {
	const output = document.querySelector("#output");

	output.innerText = store.getState();
}

render();
