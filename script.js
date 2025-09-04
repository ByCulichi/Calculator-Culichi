let runningTotal = 0;
let buffer = "0";
let previousOperator = null;

const screen = document.querySelector(".screen"); 

function buttonClick(value) {
    if (!isNaN(parseInt(value))) {
        handleNumber(value);
    } else {
        handleSymbol(value);
    }
    screen.innerText = buffer;
}

function handleSymbol(symbol) {
    switch (symbol) {
    case "C":
    buffer = "0";
    runningTotal = 0;
    previousOperator = null;
    break;

    case "=":
    if (!previousOperator) {
    return;
    }
    flushOperation(parseInt(buffer));
    previousOperator = null;
    buffer = String(runningTotal);
    runningTotal = 0;
    break;

    case "←":
    if (buffer.length === 1) {
        buffer = "0";
    } else {
        buffer = buffer.substring(0, buffer.length - 1);
    }
    break;

    case "+":
    case "−":
    case "×":
    case "÷":
    handleMath(symbol);
    break;
}
}

function handleMath(symbol) {
const intBuffer = parseInt(buffer);

if (runningTotal === 0) {
    runningTotal = intBuffer;
} else {
    flushOperation(intBuffer);
}

previousOperator = symbol;
buffer = "0";
}

function flushOperation(intBuffer) {
    if (previousOperator === "+") {
    runningTotal += intBuffer;
    } else if (previousOperator === "−") {
    runningTotal -= intBuffer;
    } else if (previousOperator === "×") {
    runningTotal *= intBuffer;
    } else if (previousOperator === "÷") {
    if (intBuffer === 0) {
    runningTotal = NaN;
    } else {
    runningTotal /= intBuffer;
    }
}
}

function handleNumber(numberString) {
if (buffer === "0") {
    buffer = numberString;
} else {
    buffer += numberString;
}
}

function init() {
document
    .querySelector(".calc-buttons")
    .addEventListener("click", function (event) {
    const target = event.target;
    if (!target.matches("button")) return;
    const value = target.innerText.trim();
    buttonClick(value);
    });
}

init();
