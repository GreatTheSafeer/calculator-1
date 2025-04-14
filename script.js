const output = document.getElementById("output");
const historyValue = document.getElementById("history-value");
const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const clearButton = document.getElementById("clear");
const backspaceButton = document.getElementById("backspace");
const equalsButton = document.getElementById("=");

let currentInput = "0";
let previousInput = "";
let operation;
let resetScreen = false;


function updateDisplay() {
    output.innerText = currentInput;
    historyValue.innerText = previousInput + " " + (operation || "");
}


function appendNumber(number) {
    if (currentInput === "0" || resetScreen) {
        currentInput = number;
        resetScreen = false;
    } else {
        currentInput += number;
    }
}

function chooseOperation(op) {
    if (currentInput === "") return;
    if (previousInput !== "") {
        calculate();
    }
    operation = op;
    previousInput = currentInput;
    currentInput = "";
}


function calculate() {
    let computation;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    
    if (isNaN(prev) || isNaN(current)) return;

    switch (operation) {
        case "+":
            computation = prev + current;
            break;
        case "-":
            computation = prev - current;
            break;
        case "×":
        case "*":
            computation = prev * current;
            break;
        case "÷":
        case "/":
            computation = prev / current;
            break;
        case "%":
            computation = prev % current;
            break;
        default:
            return;
    }

    currentInput = computation.toString();
    operation = undefined;
    previousInput = "";
    resetScreen = true;
}
function clear() {
    currentInput = "0";
    previousInput = "";
    operation = undefined;
}
function backspace() {
    currentInput = currentInput.slice(0, -1);
    if (currentInput === "") {
        currentInput = "0";
    }
}
numberButtons.forEach(button => {
    button.addEventListener("click", () => {
        appendNumber(button.innerText);
        updateDisplay();
    });
});


operatorButtons.forEach(button => {
    if (!["clear", "backspace", "="].includes(button.id)) {
        button.addEventListener("click", () => {
            chooseOperation(button.innerText);
            updateDisplay();
        });
    }
});


equalsButton.addEventListener("click", () => {
    if (operation && previousInput && currentInput) {
        calculate();
        updateDisplay();
    }
});


clearButton.addEventListener("click", () => {
    clear();
    updateDisplay();
});

backspaceButton.addEventListener("click", () => {
    backspace();
    updateDisplay();
});
updateDisplay();