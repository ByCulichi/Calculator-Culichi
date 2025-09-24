// =========================
// Variables principales para el estado de la calculadora
// =========================
let runningTotal = 0;      // Acumula el resultado de las operaciones
let buffer = "0";          // Almacena el número actual ingresado
let previousOperator = null; // Guarda el último operador presionado
let calculatorHistory = []; // Historial de cálculos
let isScientificMode = false; // Modo científico
let acClickTimer = null;   // Timer para detectar doble clic en AC

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
// Maneja los símbolos y operadores (+, -, ×, ÷, C, ←, =, .)
// =========================
function handleSymbol(symbol) {
    switch (symbol) {
        case "C": // Limpiar - con funcionalidad dual
            handleACButton();
            break;

        case "=": // Calcular el resultado
            if (!previousOperator) return;
            
            // Guardar en historial antes del cálculo
            const calculation = `${runningTotal} ${previousOperator} ${buffer} = `;
            
            flushOperation(parseFloat(buffer));
            previousOperator = null;
            buffer = String(runningTotal);
            
            // Completar entrada del historial
            calculatorHistory.push(calculation + buffer);
            updateHistoryDisplay();
            
            runningTotal = 0;
            break;

        case "←": // Retroceso (borrar último dígito)
            if (buffer.length === 1) {
                buffer = "0";
            } else {
                buffer = buffer.substring(0, buffer.length - 1);
            }
            break;

        case ".": // Punto decimal
            if (buffer.indexOf(".") === -1) {
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
    }
}

// =========================
// Maneja el botón AC con funcionalidad dual
// =========================
function handleACButton() {
    if (acClickTimer) {
        // Doble clic detectado - limpiar todo incluyendo historial
        clearTimeout(acClickTimer);
        acClickTimer = null;
        clearAll();
        showMessage("Historial borrado");
    } else {
        // Primer clic - solo limpiar entrada actual
        clearCurrent();
        // Configurar timer para detectar doble clic
        acClickTimer = setTimeout(() => {
            acClickTimer = null;
        }, 300);
    }
}

// =========================
// Limpia solo la entrada actual
// =========================
function clearCurrent() {
    if (buffer !== "0") {
        buffer = "0";
    } else {
        // Si buffer ya es 0, limpiar operación
        runningTotal = 0;
        previousOperator = null;
    }
}

// =========================
// Limpia todo incluyendo historial
// =========================
function clearAll() {
    buffer = "0";
    runningTotal = 0;
    previousOperator = null;
    calculatorHistory = [];
    updateHistoryDisplay();
}

// =========================
// Muestra mensaje temporal
// =========================
function showMessage(message) {
    const originalBuffer = buffer;
    buffer = message;
    screen.innerText = buffer;
    setTimeout(() => {
        buffer = originalBuffer;
        screen.innerText = buffer;
    }, 1000);
}

// =========================
// Actualiza la visualización del historial
// =========================
function updateHistoryDisplay() {
    const historyElement = document.querySelector('.history-content');
    if (historyElement) {
        historyElement.innerHTML = '';
        calculatorHistory.slice(-10).forEach((calc, index) => {
            const historyItem = document.createElement('div');
            historyItem.className = 'history-item';
            historyItem.textContent = calc;
            historyElement.appendChild(historyItem);
        });
    }
}

// =========================
// Procesa los operadores matemáticos
// =========================
function handleMath(symbol) {
    const floatBuffer = parseFloat(buffer);

    // Si es la primera operación, inicializa el runningTotal
    if (runningTotal === 0) {
        runningTotal = floatBuffer;
    } else {
        flushOperation(floatBuffer);
    }

    previousOperator = symbol;
    buffer = "0";
}

// =========================
// Realiza la operación matemática pendiente
// =========================
function flushOperation(floatBuffer) {
    if (previousOperator === "+") {
        runningTotal += floatBuffer;
    } else if (previousOperator === "−") {
        runningTotal -= floatBuffer;
    } else if (previousOperator === "×") {
        runningTotal *= floatBuffer;
    } else if (previousOperator === "÷") {
        // Evita la división por cero
        runningTotal = floatBuffer === 0 ? NaN : runningTotal / floatBuffer;
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
    // Eventos de botones de la calculadora
    document
        .querySelector(".calc-buttons")
        .addEventListener("click", function (event) {
            const target = event.target;
            if (!target.matches("button")) return;
            const value = target.innerText.trim();
            buttonClick(value);
        });
    
    // Eventos del hamburger menu
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    const closeSidebar = document.getElementById('closeSidebar');
    
    hamburgerBtn.addEventListener('click', toggleSidebar);
    closeSidebar.addEventListener('click', closeSidebarMenu);
    sidebarOverlay.addEventListener('click', closeSidebarMenu);
    
    // Eventos de cambio de modo
    const normalModeBtn = document.getElementById('normalMode');
    const scientificModeBtn = document.getElementById('scientificMode');
    
    normalModeBtn.addEventListener('click', () => switchMode(false));
    scientificModeBtn.addEventListener('click', () => switchMode(true));
    
    // Evento para limpiar historial
    const clearHistoryBtn = document.getElementById('clearHistory');
    clearHistoryBtn.addEventListener('click', clearHistoryManually);
    
    // Inicializar historial vacío
    updateHistoryDisplay();
}

// =========================
// Funciones del menú lateral
// =========================
function toggleSidebar() {
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    
    hamburgerBtn.classList.toggle('active');
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
}

function closeSidebarMenu() {
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    
    hamburgerBtn.classList.remove('active');
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
}

function switchMode(scientific) {
    isScientificMode = scientific;
    const normalBtn = document.getElementById('normalMode');
    const scientificBtn = document.getElementById('scientificMode');
    
    if (scientific) {
        normalBtn.classList.remove('active');
        scientificBtn.classList.add('active');
        // TODO: Implementar modo científico
        showMessage("Modo científico");
    } else {
        scientificBtn.classList.remove('active');
        normalBtn.classList.add('active');
        showMessage("Modo normal");
    }
}

function clearHistoryManually() {
    calculatorHistory = [];
    updateHistoryDisplay();
    showMessage("Historial limpiado");
}

// =========================
// Inicia la calculadora al cargar la página
// =========================
init();
