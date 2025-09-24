// =========================
// Variables principales para el estado de la calculadora
// =========================
let runningTotal = 0;      // Acumula el resultado de las operaciones
let buffer = "0";          // Almacena el número actual ingresado
let previousOperator = null; // Guarda el último operador presionado

// Elemento de la pantalla donde se muestran los resultados
const screen = document.querySelector(".screen"); 

// =========================
// Función principal que gestiona el clic en los botones
// =========================
function buttonClick(value) {
    // Determina si el valor es un número o símbolo
    if (!isNaN(parseInt(value))) {
        handleNumber(value);
    } else {
        handleSymbol(value);
    }
    // Actualiza la pantalla con el valor actual del buffer
    screen.innerText = buffer;
}

// =========================
// Maneja los símbolos y operadores (+, -, ×, ÷, C, ←, =)
// =========================
function handleSymbol(symbol) {
    switch (symbol) {
        case "C": // Limpiar todo
            buffer = "0";
            runningTotal = 0;
            previousOperator = null;
            break;

        case "=": // Calcular el resultado
            if (!previousOperator) return;
            flushOperation(parseInt(buffer));
            previousOperator = null;
            buffer = String(runningTotal);
            runningTotal = 0;
            break;

        case "←": // Retroceso (borrar último dígito)
            if (buffer.length === 1) {
                buffer = "0";
            } else {
                buffer = buffer.substring(0, buffer.length - 1);
            }
            break;

        // Operadores matemáticos
        case "+":
        case "−":
        case "×":
        case "÷":
            handleMath(symbol);
            break;
    }
}

// =========================
// Procesa los operadores matemáticos
// =========================
function handleMath(symbol) {
    const intBuffer = parseInt(buffer);

    // Si es la primera operación, inicializa el runningTotal
    if (runningTotal === 0) {
        runningTotal = intBuffer;
    } else {
        flushOperation(intBuffer);
    }

    previousOperator = symbol;
    buffer = "0";
}

// =========================
// Realiza la operación matemática pendiente
// =========================
function flushOperation(intBuffer) {
    if (previousOperator === "+") {
        runningTotal += intBuffer;
    } else if (previousOperator === "−") {
        runningTotal -= intBuffer;
    } else if (previousOperator === "×") {
        runningTotal *= intBuffer;
    } else if (previousOperator === "÷") {
        // Evita la división por cero
        runningTotal = intBuffer === 0 ? NaN : runningTotal / intBuffer;
    }
}

// =========================
// Maneja la entrada de números
// =========================
function handleNumber(numberString) {
    // Si el buffer es "0", reemplaza; si no, concatena el número
    buffer = buffer === "0" ? numberString : buffer + numberString;
}

// =========================
// Inicializa los eventos de la calculadora
// =========================
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

// =========================
// Inicia la calculadora al cargar la página
// =========================
init();
