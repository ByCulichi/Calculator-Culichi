// ============================================================
// Calculadora IMATH - Lógica principal y UI
// ============================================================

// ------------------------------
// Variables de estado principal
// ------------------------------
let runningTotal = 0;           // Acumula el resultado de las operaciones
let buffer = "0";               // Almacena el número actual ingresado
let previousOperator = null;    // Guarda el último operador presionado
let calculatorHistory = [];     // Historial de cálculos
let isScientificMode = false;   // Estado de modo científico
let acClickTimer = null;        // Timer para doble clic en AC

// Elemento de la pantalla donde se muestran los resultados
const screen = document.querySelector(".screen");

// ============================================================
// Función principal: gestiona el clic en los botones
// ============================================================
function buttonClick(value) {
    if (!isNaN(parseFloat(value))) {
        handleNumber(value);
    } else {
        handleSymbol(value);
    }
    screen.innerText = buffer;
}

// ============================================================
// Maneja los símbolos y operadores (+, -, ×, ÷, C, ←, =, ., funciones científicas)
// ============================================================
function handleSymbol(symbol) {
    switch (symbol) {
        case "C": // Limpiar con funcionalidad dual (doble clic borra historial)
            handleACButton();
            break;

        case "=": // Calcular el resultado y guardar en historial
            if (!previousOperator) return;
            const calculation = `${runningTotal} ${previousOperator} ${buffer} = `;
            flushOperation(parseFloat(buffer));
            previousOperator = null;
            buffer = String(runningTotal);
            calculatorHistory.push(calculation + buffer);
            updateHistoryDisplay();
            runningTotal = 0;
            break;

        case "←": // Retroceso (borrar último dígito)
            if (buffer.length === 1) {
                buffer = "0";
            } else {
                buffer = buffer.slice(0, -1);
            }
            break;

        case ".": // Punto decimal
            if (!buffer.includes(".")) {
                buffer += ".";
            }
            break;

        // Operadores matemáticos
        case "+":
        case "−":
        case "×":
        case "÷":
            handleMath(symbol);
            break;

        // Funciones científicas
        case "sin":
            buffer = String(Math.sin(parseFloat(buffer) * Math.PI / 180));
            break;
        case "cos":
            buffer = String(Math.cos(parseFloat(buffer) * Math.PI / 180));
            break;
        case "tan":
            buffer = String(Math.tan(parseFloat(buffer) * Math.PI / 180));
            break;
        case "log":
            buffer = String(Math.log10(parseFloat(buffer)));
            break;
    }
}

// ============================================================
// Maneja el botón AC con funcionalidad dual (doble clic borra historial)
// ============================================================
function handleACButton() {
    if (acClickTimer) {
        clearTimeout(acClickTimer);
        acClickTimer = null;
        clearAll();
        showMessage("Historial borrado");
    } else {
        clearCurrent();
        acClickTimer = setTimeout(() => {
            acClickTimer = null;
        }, 300);
    }
}

// Limpia solo la entrada actual
function clearCurrent() {
    if (buffer !== "0") {
        buffer = "0";
    } else {
        runningTotal = 0;
        previousOperator = null;
    }
}

// Limpia todo incluyendo historial
function clearAll() {
    buffer = "0";
    runningTotal = 0;
    previousOperator = null;
    calculatorHistory = [];
    updateHistoryDisplay();
}

// ============================================================
// Muestra mensaje temporal en la pantalla
// ============================================================
function showMessage(message) {
    const originalBuffer = buffer;
    buffer = message;
    screen.innerText = buffer;
    setTimeout(() => {
        buffer = originalBuffer;
        screen.innerText = buffer;
    }, 1000);
}

// ============================================================
// Actualiza la visualización del historial en el sidebar
// ============================================================
function updateHistoryDisplay() {
    const historyElement = document.querySelector('.history-content');
    if (historyElement) {
        historyElement.innerHTML = '';
        calculatorHistory.slice(-10).forEach(calc => {
            const historyItem = document.createElement('div');
            historyItem.className = 'history-item';
            historyItem.textContent = calc;
            historyElement.appendChild(historyItem);
        });
    }
}

// ============================================================
// Procesa los operadores matemáticos
// ============================================================
function handleMath(symbol) {
    const floatBuffer = parseFloat(buffer);

    if (runningTotal === 0) {
        runningTotal = floatBuffer;
    } else {
        flushOperation(floatBuffer);
    }

    previousOperator = symbol;
    buffer = "0";
}

// ============================================================
// Realiza la operación matemática pendiente
// ============================================================
function flushOperation(floatBuffer) {
    if (previousOperator === "+") {
        runningTotal += floatBuffer;
    } else if (previousOperator === "−") {
        runningTotal -= floatBuffer;
    } else if (previousOperator === "×") {
        runningTotal *= floatBuffer;
    } else if (previousOperator === "÷") {
        runningTotal = floatBuffer === 0 ? NaN : runningTotal / floatBuffer;
    }
}

// ============================================================
// Maneja la entrada de números
// ============================================================
function handleNumber(numberString) {
    buffer = buffer === "0" ? numberString : buffer + numberString;
}

// ============================================================
// Inicializa los eventos de la calculadora y UI
// ============================================================
function init() {
    // Evento: botones de la calculadora
    document
        .querySelector(".calc-buttons")
        .addEventListener("click", function (event) {
            const target = event.target;
            if (!target.matches("button")) return;
            const value = target.innerText.trim();
            buttonClick(value);
        });

    // Evento: abrir/cerrar menú lateral
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    const closeSidebar = document.getElementById('closeSidebar');

    hamburgerBtn.addEventListener('click', toggleSidebar);
    closeSidebar.addEventListener('click', closeSidebarMenu);
    sidebarOverlay.addEventListener('click', closeSidebarMenu);

    // Evento: cambio de modo normal/científico
    const normalModeBtn = document.getElementById('normalMode');
    const scientificModeBtn = document.getElementById('scientificMode');

    normalModeBtn.addEventListener('click', () => switchMode(false));
    scientificModeBtn.addEventListener('click', () => switchMode(true));

    // Evento: limpiar historial manualmente
    const clearHistoryBtn = document.getElementById('clearHistory');
    clearHistoryBtn.addEventListener('click', clearHistoryManually);

    // Inicializar historial vacío
    updateHistoryDisplay();
}

// ============================================================
// Funciones del menú lateral (sidebar)
// ============================================================
function toggleSidebar() {
    document.getElementById('hamburgerBtn').classList.toggle('active');
    document.getElementById('sidebar').classList.toggle('active');
    document.getElementById('sidebarOverlay').classList.toggle('active');
}

function closeSidebarMenu() {
    document.getElementById('hamburgerBtn').classList.remove('active');
    document.getElementById('sidebar').classList.remove('active');
    document.getElementById('sidebarOverlay').classList.remove('active');
}

// Cambia entre modo normal y científico
function switchMode(scientific) {
    isScientificMode = scientific;
    const normalBtn = document.getElementById('normalMode');
    const scientificBtn = document.getElementById('scientificMode');
    const calcButtons = document.getElementById('calcButtons');
    const scientificRow = document.querySelector('.scientific-row');

    if (scientific) {
        normalBtn.classList.remove('active');
        scientificBtn.classList.add('active');
        calcButtons.classList.add('scientific-mode');
        scientificRow.style.display = 'contents';
        showMessage("Modo científico");
    } else {
        scientificBtn.classList.remove('active');
        normalBtn.classList.add('active');
        calcButtons.classList.remove('scientific-mode');
        scientificRow.style.display = 'none';
        showMessage("Modo normal");
    }
}

// Limpia historial manualmente desde el botón
function clearHistoryManually() {
    calculatorHistory = [];
    updateHistoryDisplay();
    showMessage("Historial limpiado");
}

// ============================================================
// Inicialización de la aplicación al cargar la página
// ============================================================
init();
