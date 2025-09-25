/* ============================================================================
   CALCULADORA CULICHI - LÓGICA PRINCIPAL EN JAVASCRIPT
   ----------------------------------------------------------------------------
   Este archivo contiene toda la lógica de la calculadora, incluyendo:
   - Operaciones básicas (suma, resta, multiplicación, división)
   - Funciones científicas (trigonometría, logaritmos, raíces, potencias)
   - Conversión de unidades (temperatura, distancia, peso)
   - Gestión de historial y modos de calculadora
   Todo está documentado para que cualquier persona pueda entenderlo.
============================================================================ */

/* ============================================================================
   1. VARIABLES GLOBALES Y ESTADO DE LA CALCULADORA
============================================================================ */

/**
 * buffer: almacena el número actual que el usuario está escribiendo o el resultado mostrado.
 * runningTotal: almacena el resultado parcial de operaciones encadenadas.
 * previousOperator: guarda el último operador matemático usado (+, −, ×, ÷).
 * calculatorHistory: almacena el historial de operaciones realizadas.
 */
let buffer = "0";
let runningTotal = 0;
let previousOperator = null;
let calculatorHistory = [];

// Referencia a la pantalla de la calculadora (donde se muestra el número/resultados)
const screen = document.querySelector('.screen');

/* ============================================================================
   2. FUNCIONES PRINCIPALES DE LA CALCULADORA
============================================================================ */

/**
 * Actualiza la pantalla de la calculadora con el valor actual del buffer.
 * Si el número es negativo, lo muestra entre paréntesis para mayor claridad.
 */
function updateScreen() {
    let displayValue = buffer;
    if (buffer.startsWith("-") && buffer !== "-0" && buffer !== "0") {
        displayValue = `(${buffer})`;
    }
    screen.textContent = displayValue;
}

/**
 * Restablece la calculadora a su estado inicial.
 * Limpia el buffer, el total acumulado y el operador anterior.
 */
function resetCalculator() {
    buffer = "0";
    runningTotal = 0;
    previousOperator = null;
    updateScreen();
}

/**
 * Cambia el signo del número actual.
 * Si el buffer es "0", no hace nada.
 */
function toggleSign() {
    if (buffer === "0") return;
    buffer = buffer.charAt(0) === "-" ? buffer.substring(1) : "-" + buffer;
    updateScreen();
}

/**
 * Convierte el número actual a porcentaje (divide entre 100).
 */
function convertToPercentage() {
    buffer = String(parseFloat(buffer) / 100);
    updateScreen();
}

/**
 * Procesa una operación matemática básica (+, −, ×, ÷).
 * @param {string} operator - El operador matemático.
 */
function processOperator(operator) {
    if (buffer === "0") return;
    const currentValue = parseFloat(buffer);

    if (runningTotal === 0) {
        runningTotal = currentValue;
    } else {
        applyPendingOperation(currentValue);
    }

    previousOperator = operator;
    buffer = "0";
}

/**
 * Aplica la operación pendiente usando el operador anterior.
 * @param {number} value - El número con el que operar.
 */
function applyPendingOperation(value) {
    switch (previousOperator) {
        case "+": runningTotal += value; break;
        case "−": runningTotal -= value; break;
        case "×": runningTotal *= value; break;
        case "÷": runningTotal /= value; break;
    }
}

/**
 * Aplica la operación pendiente y devuelve el resultado.
 * @param {number} value - El número con el que operar.
 * @returns {number} El resultado de la operación.
 */
function applyOperationAndReturn(value) {
    applyPendingOperation(value);
    return runningTotal;
}

/**
 * Maneja la entrada de números (0-9).
 * Si el buffer es "0", lo reemplaza; si no, añade el dígito al final.
 * @param {string} digit - El dígito a añadir.
 */
function handleNumberInput(digit) {
    buffer = buffer === "0" ? digit : buffer + digit;
    updateScreen();
}

/* ============================================================================
   3. FUNCIONES DE INTERFAZ Y UTILIDAD
============================================================================ */

/**
 * Actualiza el historial mostrado en la barra lateral.
 * Muestra las últimas 10 operaciones realizadas.
 */
function updateHistoryDisplay() {
    const historyContent = document.getElementById('historyContent');
    if (!historyContent) return;

    if (calculatorHistory.length === 0) {
        historyContent.innerHTML = '';
        return;
    }

    historyContent.innerHTML = calculatorHistory.slice(-10).map(calc => {
        const [expression, result] = calc.split(' = ');
        return `
            <div class="history-item">
                <span class="calc-expression">${expression}</span>
                <span class="calc-result">${result}</span>
            </div>
        `;
    }).join('');
}

/**
 * Muestra un mensaje temporal en la pantalla de la calculadora.
 * Útil para mostrar resultados de conversiones o avisos al usuario.
 * @param {string} message - El mensaje a mostrar.
 */
function showTemporaryMessage(message) {
    const originalBuffer = buffer;
    const originalFontSize = screen.style.fontSize;
    const originalColor = screen.style.color;

    screen.textContent = message;
    screen.style.fontSize = '24px';
    screen.style.color = '#FF9500';

    setTimeout(() => {
        buffer = originalBuffer;
        updateScreen();
        screen.style.fontSize = originalFontSize || '48px';
        screen.style.color = originalColor || '#FFFFFF';
    }, 2000);
}

/**
 * Alterna la visibilidad de la barra lateral de historial.
 * Muestra u oculta el menú y la superposición.
 */
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    const hamburgerBtn = document.getElementById('hamburgerBtn');

    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
    hamburgerBtn.classList.toggle('active');
}

/* ============================================================================
   4. FUNCIÓN PRINCIPAL DE MANEJO DE SÍMBOLOS Y BOTONES
============================================================================ */

/**
 * Esta función centraliza el manejo de todos los botones y teclas.
 * Según el símbolo recibido, llama a la función correspondiente.
 * @param {string} symbol - El símbolo del botón o tecla presionada.
 */
function handleSymbol(symbol) {
    switch (symbol) {
        // --- FUNCIONES BÁSICAS ---
        case "AC":
        case "C":
            resetCalculator();
            break;
        case "+/−":
            toggleSign();
            break;
        case "%":
            convertToPercentage();
            break;
        case "=":
            if (!previousOperator) return;
            const calculation = `${runningTotal} ${previousOperator} ${buffer} = ${applyOperationAndReturn(parseFloat(buffer))}`;
            previousOperator = null;
            buffer = String(runningTotal);
            // Evita duplicados en el historial
            if (calculatorHistory[calculatorHistory.length - 1] !== calculation) {
                calculatorHistory.push(calculation);
                updateHistoryDisplay();
            }
            runningTotal = 0;
            updateScreen();
            break;
        case "←":
            // Borra el último dígito o reinicia a "0"
            buffer = buffer.length === 1 ? "0" : buffer.slice(0, -1);
            updateScreen();
            break;
        case ".":
            // Añade punto decimal si no existe ya
            if (!buffer.includes(".")) {
                buffer += ".";
                updateScreen();
            }
            break;

        // --- OPERADORES MATEMÁTICOS ---
        case "+":
        case "−":
        case "×":
        case "÷":
            processOperator(symbol);
            break;

        // --- FUNCIONES CIENTÍFICAS ---
        case "sin":
            buffer = String(Math.sin(parseFloat(buffer) * Math.PI / 180));
            updateScreen();
            break;
        case "cos":
            buffer = String(Math.cos(parseFloat(buffer) * Math.PI / 180));
            updateScreen();
            break;
        case "tan":
            buffer = String(Math.tan(parseFloat(buffer) * Math.PI / 180));
            updateScreen();
            break;
        case "log":
            buffer = String(Math.log10(parseFloat(buffer)));
            updateScreen();
            break;
        case "ln":
            buffer = String(Math.log(parseFloat(buffer)));
            updateScreen();
            break;
        case "√":
            buffer = String(Math.sqrt(parseFloat(buffer)));
            updateScreen();
            break;
        case "x²":
            buffer = String(Math.pow(parseFloat(buffer), 2));
            updateScreen();
            break;
        case "(":
            showTemporaryMessage("Paréntesis no implementado");
            break;

        // --- CONVERSIONES DE UNIDADES ---
        case "°C→°F":
            {
                const celsius = parseFloat(buffer);
                buffer = String((celsius * 9 / 5) + 32);
                showTemporaryMessage(`${celsius}°C = ${buffer}°F`);
                updateScreen();
            }
            break;
        case "km→mi":
            {
                const km = parseFloat(buffer);
                buffer = String(km * 0.621371);
                showTemporaryMessage(`${km}km = ${buffer}mi`);
                updateScreen();
            }
            break;
        case "kg→lb":
            {
                const kg = parseFloat(buffer);
                buffer = String(kg * 2.20462);
                showTemporaryMessage(`${kg}kg = ${buffer}lb`);
                updateScreen();
            }
            break;
        case "m→ft":
            {
                const meters = parseFloat(buffer);
                buffer = String(meters * 3.28084);
                showTemporaryMessage(`${meters}m = ${buffer}ft`);
                updateScreen();
            }
            break;

        // --- CONSTANTES MATEMÁTICAS ---
        case "π":
            buffer = String(Math.PI);
            updateScreen();
            break;
        case "e":
            buffer = String(Math.E);
            updateScreen();
            break;

        // --- ENTRADA NUMÉRICA ---
        default:
            if (!isNaN(parseInt(symbol))) {
                handleNumberInput(symbol);
            }
            break;
    }
}

/* ============================================================================
   5. INICIALIZACIÓN Y MANEJO DE EVENTOS
============================================================================ */

/**
 * Esta función se ejecuta cuando el DOM está completamente cargado.
 * Configura todos los listeners de botones, historial, menú flotante, etc.
 */
document.addEventListener('DOMContentLoaded', function () {
    updateScreen();

    // --- BOTONES DE LA CALCULADORA ---
    document.querySelectorAll('.calc-button').forEach(button => {
        button.addEventListener('click', () => {
            if (button.classList.contains('icon-btn')) {
                // Aquí podrías mostrar información o ajustes
                return;
            }
            const symbol = button.textContent.trim();
            handleSymbol(symbol);
        });
    });

    // --- MENÚ HAMBURGUESA Y SIDEBAR ---
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    const closeSidebarBtn = document.getElementById('closeSidebar');

    if (hamburgerBtn) hamburgerBtn.addEventListener('click', toggleSidebar);
    if (overlay) overlay.addEventListener('click', toggleSidebar);
    if (closeSidebarBtn) closeSidebarBtn.addEventListener('click', toggleSidebar);

    // --- GESTIÓN DEL HISTORIAL ---
    const clearHistoryBtn = document.getElementById('clearHistory');
    const editHistoryBtn = document.getElementById('editHistory');

    if (clearHistoryBtn) {
        clearHistoryBtn.addEventListener('click', () => {
            if (calculatorHistory.length === 0) {
                showTemporaryMessage('No hay historial para borrar');
                return;
            }
            const confirmDelete = confirm('¿Estás seguro de que quieres borrar todo el historial?');
            if (confirmDelete) {
                calculatorHistory = [];
                updateHistoryDisplay();
                showTemporaryMessage('Historial borrado');
            }
        });
    }

    if (editHistoryBtn) {
        editHistoryBtn.addEventListener('click', () => {
            if (calculatorHistory.length === 0) {
                showTemporaryMessage('No hay historial para editar');
                return;
            }
            const lastCalculation = calculatorHistory[calculatorHistory.length - 1];
            if (lastCalculation) {
                const [expression] = lastCalculation.split(' = ');
                const match = expression.match(/[\d.]+$/);
                if (match) {
                    buffer = match[0];
                    updateScreen();
                    showTemporaryMessage('Última operación cargada para editar');
                }
            }
        });
    }

    // --- SPLASH SCREEN (pantalla de bienvenida) ---
    const splashScreen = document.getElementById('splashScreen');
    if (splashScreen) {
        setTimeout(() => {
            splashScreen.classList.add('hidden');
            setTimeout(() => splashScreen.remove(), 300);
        }, 2000);

        splashScreen.addEventListener('click', () => {
            splashScreen.classList.add('hidden');
            setTimeout(() => splashScreen.remove(), 300);
        });
    }

    // --- SOPORTE PARA TECLADO FÍSICO ---
    document.addEventListener('keydown', (event) => {
        const key = event.key;
        if (key >= '0' && key <= '9') {
            handleSymbol(key);
        } else if (key === '+') {
            handleSymbol('+');
        } else if (key === '-') {
            handleSymbol('−');
        } else if (key === '*') {
            handleSymbol('×');
        } else if (key === '/') {
            event.preventDefault();
            handleSymbol('÷');
        } else if (key === 'Enter' || key === '=') {
            handleSymbol('=');
        } else if (key === 'Escape') {
            handleSymbol('AC');
        } else if (key === 'Backspace') {
            handleSymbol('←');
        } else if (key === '.') {
            handleSymbol('.');
        } else if (key === '%') {
            handleSymbol('%');
        }
    });

    // --- MENÚ FLOTANTE (FAB) DE MODOS ---
    setupFabMenu();
    // --- GESTIÓN DE EDICIÓN Y BORRADO EN HISTORIAL ---
    setupHistoryEditMode();
});

/* ============================================================================
   6. FUNCIONES AUXILIARES PARA MENÚ FLOTANTE Y EDICIÓN DE HISTORIAL
============================================================================ */

/**
 * Configura el menú flotante (FAB) para cambiar de modo de calculadora.
 * Permite abrir/cerrar el menú y seleccionar el modo.
 */
function setupFabMenu() {
    const fabBtn = document.getElementById('fabMenuBtn');
    const fabMenu = document.getElementById('fabMenuPopup');
    let fabOpen = false;

    if (!fabBtn || !fabMenu) return;

    fabBtn.addEventListener('click', () => {
        fabMenu.style.display = fabOpen ? 'none' : 'block';
        fabOpen = !fabOpen;
        if (fabOpen) {
            setTimeout(() => {
                document.addEventListener('mousedown', closeFabMenuOnClickOutside);
            }, 1);
        }
    });

    function closeFabMenuOnClickOutside(e) {
        if (!fabMenu.contains(e.target) && e.target !== fabBtn) {
            fabMenu.style.display = 'none';
            fabOpen = false;
            document.removeEventListener('mousedown', closeFabMenuOnClickOutside);
        }
    }

    fabMenu.querySelectorAll('li[data-mode]').forEach(li => {
        li.addEventListener('click', () => {
            fabMenu.querySelectorAll('li').forEach(l => l.classList.remove('active'));
            li.classList.add('active');
            fabMenu.style.display = 'none';
            fabOpen = false;
            // Aquí puedes cambiar el modo de la calculadora según li.dataset.mode
            // Por ejemplo: switchCalculatorMode(li.dataset.mode);
        });
    });

    // Switch para activar/desactivar modo de conversión
    const convertSwitch = document.getElementById('convertSwitch');
    if (convertSwitch) {
        convertSwitch.addEventListener('change', function () {
            // Aquí puedes activar/desactivar el modo de conversión
            // Por ejemplo: toggleConvertMode(this.checked);
        });
    }
}

/**
 * Configura el modo de edición del historial.
 * Permite seleccionar y borrar operaciones específicas del historial.
 */
function setupHistoryEditMode() {
    const historyContent = document.getElementById('historyContent');
    const editBtn = document.getElementById('editHistory');
    const clearBtn = document.getElementById('clearHistory');
    let editMode = false;

    if (!historyContent || !editBtn || !clearBtn) return;

    // Alternar modo edición
    editBtn.addEventListener('click', () => {
        editMode = !editMode;
        editBtn.textContent = editMode ? 'Listo' : 'Editar';
        clearBtn.style.display = editMode ? 'inline-block' : '';
        Array.from(historyContent.children).forEach(item => {
            if (editMode) item.classList.add('selectable');
            else item.classList.remove('selectable', 'selected');
        });
    });

    // Seleccionar/deseleccionar elementos del historial
    historyContent.addEventListener('click', (e) => {
        if (!editMode) return;
        const item = e.target.closest('.history-item');
        if (item) item.classList.toggle('selected');
    });

    // Borrar elementos seleccionados
    clearBtn.addEventListener('click', () => {
        if (!editMode) return;
        Array.from(historyContent.getElementsByClassName('selected')).forEach(item => item.remove());
        // Nota: aquí podrías sincronizar el array calculatorHistory si lo deseas
    });
}