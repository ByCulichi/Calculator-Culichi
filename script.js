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
let calculatorMode = 'basic';   // Modo actual: 'basic', 'scientific', 'conversions'

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
// Maneja los símbolos y operadores (+, -, ×, ÷, AC, +/-, %, =, ., funciones científicas)
// ============================================================
function handleSymbol(symbol) {
    switch (symbol) {
        case "AC": // Limpiar completamente (nuevo comportamiento)
        case "C": // Mantener compatibilidad con botones existentes
            handleACButton();
            break;

        case "+/−": // Cambiar signo del número actual
            handlePlusMinusButton();
            break;

        case "%": // Manejar porcentaje
            handlePercentage();
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
        case "ln":
            buffer = String(Math.log(parseFloat(buffer)));
            break;
        case "√":
            buffer = String(Math.sqrt(parseFloat(buffer)));
            break;
        case "x²":
            const num = parseFloat(buffer);
            buffer = String(num * num);
            break;
        case "(":
            // Para simplificar, solo mostramos mensaje
            showMessage("Paréntesis no implementado");
            break;
            
        // Funciones de conversión
        case "°C→°F":
            const celsius = parseFloat(buffer);
            buffer = String((celsius * 9/5) + 32);
            showMessage(`${celsius}°C = ${buffer}°F`);
            break;
        case "km→mi":
            const km = parseFloat(buffer);
            buffer = String(km * 0.621371);
            showMessage(`${km}km = ${buffer}mi`);
            break;
        case "kg→lb":
            const kg = parseFloat(buffer);
            buffer = String(kg * 2.20462);
            showMessage(`${kg}kg = ${buffer}lb`);
            break;
        case "m→ft":
            const meters = parseFloat(buffer);
            buffer = String(meters * 3.28084);
            showMessage(`${meters}m = ${buffer}ft`);
            break;
    }
}

// ============================================================
// Maneja el botón AC - limpiar completamente todo el estado
// ============================================================
function handleACButton() {
    // AC ahora limpia completamente todo el estado sin funcionalidad dual
    buffer = "0";
    runningTotal = 0;
    previousOperator = null;
    // No limpiamos el historial aquí, solo el estado de la calculadora
}

// ============================================================
// Maneja el botón +/- para cambiar el signo del número actual
// ============================================================
function handlePlusMinusButton() {
    if (buffer === "0") return; // No cambiar signo de cero
    
    if (buffer.startsWith("-")) {
        // Si es negativo, quitar el signo negativo
        buffer = buffer.slice(1);
    } else {
        // Si es positivo, agregar signo negativo
        buffer = "-" + buffer;
    }
}

// ============================================================
// Maneja el botón % - lógica de porcentaje
// ============================================================
function handlePercentage() {
    const currentNumber = parseFloat(buffer);
    
    // Si el número actual es 0 o NaN, no hacer nada
    if (isNaN(currentNumber) || currentNumber === 0) {
        return;
    }
    
    // Si no hay operación pendiente: número aislado -> conversión a decimal
    // Ejemplo: 50% -> 0.5
    if (!previousOperator || runningTotal === 0) {
        buffer = String(currentNumber / 100);
        return;
    }
    
    // Si hay operación pendiente del tipo A op B%
    // Interpretar como A op (A * B / 100)
    // Ejemplo: 50 + 10% -> 50 + (50 * 10 / 100) -> 50 + 5 = 55
    const percentageValue = runningTotal * currentNumber / 100;
    buffer = String(percentageValue);
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
        calculatorHistory.slice(-10).forEach((calc, index) => {
            const historyItem = document.createElement('div');
            historyItem.className = 'history-item';
            historyItem.textContent = calc;
            
            // Hacer los elementos del historial clicables para recargar la operación
            historyItem.addEventListener('click', () => {
                loadHistoryOperation(calc);
            });
            
            historyElement.appendChild(historyItem);
        });
    }
}

// ============================================================
// Carga una operación del historial en la calculadora
// ============================================================
function loadHistoryOperation(historyEntry) {
    // Parsear la entrada del historial para extraer la operación y resultado
    // Formato esperado: "50 + 10 = 60"
    const parts = historyEntry.split(' = ');
    if (parts.length === 2) {
        const result = parts[1];
        buffer = result;
        screen.innerText = buffer;
        
        // Cerrar el sidebar después de seleccionar
        closeSidebarMenu();
        
        showMessage("Cargado del historial");
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
    // Cargar modo guardado desde localStorage
    loadCalculatorMode();
    
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

    // Evento: selector de modo
    const modeSelector = document.getElementById('modeSelector');
    const modeSelectorBtn = modeSelector.querySelector('.mode-selector-btn');
    const modeDropdown = document.getElementById('modeDropdown');

    modeSelectorBtn.addEventListener('click', toggleModeDropdown);
    
    // Eventos para las opciones del dropdown
    modeDropdown.addEventListener('click', (event) => {
        if (event.target.classList.contains('mode-option')) {
            const selectedMode = event.target.dataset.mode;
            switchMode(selectedMode);
            closeModeDropdown();
        }
    });

    // Cerrar dropdown al hacer clic fuera
    document.addEventListener('click', (event) => {
        if (!modeSelector.contains(event.target)) {
            closeModeDropdown();
        }
    });

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

// ============================================================
// Funciones del selector de modo y localStorage
// ============================================================

/**
 * Alterna la visibilidad del dropdown de modos
 */
function toggleModeDropdown() {
    const modeDropdown = document.getElementById('modeDropdown');
    modeDropdown.classList.toggle('active');
}

/**
 * Cierra el dropdown de modos
 */
function closeModeDropdown() {
    const modeDropdown = document.getElementById('modeDropdown');
    modeDropdown.classList.remove('active');
}

/**
 * Cambia el modo de la calculadora
 * @param {string} mode - 'basic', 'scientific', o 'conversions'
 */
function switchMode(mode) {
    calculatorMode = mode;
    isScientificMode = mode === 'scientific';
    
    // Actualizar UI del selector
    const modeSelectorBtn = document.querySelector('.mode-selector-btn');
    const scientificRows = document.querySelectorAll('.scientific-row');
    const conversionRows = document.querySelectorAll('.conversion-row');
    
    // Ocultar todas las filas especiales
    scientificRows.forEach(row => row.style.display = 'none');
    conversionRows.forEach(row => row.style.display = 'none');
    
    switch (mode) {
        case 'basic':
            modeSelectorBtn.textContent = 'Básica';
            showMessage("Modo básico");
            break;
        case 'scientific':
            modeSelectorBtn.textContent = 'Científica';
            scientificRows.forEach(row => row.style.display = 'contents');
            showMessage("Modo científico");
            break;
        case 'conversions':
            modeSelectorBtn.textContent = 'Conversiones';
            conversionRows.forEach(row => row.style.display = 'contents');
            showMessage("Modo conversiones");
            break;
    }
    
    // Guardar en localStorage
    saveCalculatorMode();
}

/**
 * Guarda el modo actual en localStorage
 */
function saveCalculatorMode() {
    try {
        localStorage.setItem('calculatorMode', calculatorMode);
    } catch (e) {
        console.warn('No se pudo guardar el modo en localStorage:', e);
    }
}

/**
 * Carga el modo guardado desde localStorage
 */
function loadCalculatorMode() {
    try {
        const savedMode = localStorage.getItem('calculatorMode');
        if (savedMode && ['basic', 'scientific', 'conversions'].includes(savedMode)) {
            switchMode(savedMode);
        } else {
            // Modo por defecto
            switchMode('basic');
        }
    } catch (e) {
        console.warn('No se pudo cargar el modo desde localStorage:', e);
        switchMode('basic');
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