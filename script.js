/* ============================================================
    Calculator Culichi - Complete JavaScript Implementation
    
    A sophisticated iOS-style calculator with three modes:
    - Basic: Standard arithmetic operations
    - Scientific: Trigonometric and logarithmic functions  
    - Conversion: Unit conversions (temperature, distance, weight)
   ============================================================ */

/**
 * Global calculator state variables
 */
/** @type {string} Current number being input or result being displayed */
let buffer = "0";

/** @type {number} Running total for chained operations */
let runningTotal = 0;

/** @type {string|null} Last operator used (+, −, ×, ÷) */
let previousOperator = null;

/** @type {Array<string>} History of calculations for sidebar display */
let calculatorHistory = [];

/** @type {HTMLElement} Reference to the calculator display screen */
const screen = document.querySelector('.screen');

/**
 * ============================================================
 *                    CORE CALCULATOR FUNCTIONS
 * ============================================================
 */

/**
 * Updates the calculator display with the current buffer value
 * Handles negative number display by wrapping in parentheses
 */
function updateScreen() {
    // Display negative numbers in parentheses for clarity
    let displayValue = buffer;
    if (buffer.startsWith("-") && buffer !== "-0" && buffer !== "0") {
        displayValue = `(${buffer})`;
    }
    screen.textContent = displayValue;
}

/**
 * Resets calculator to initial state (All Clear function)
 * Clears buffer, running total, and previous operator
 */
function handleACButton() {
    buffer = "0";
    runningTotal = 0;
    previousOperator = null;
    updateScreen();
}

/**
 * Toggles the sign of the current number (+/− button)
 * Does nothing if buffer is "0"
 */
function handlePlusMinusButton() {
    if (buffer === "0") return;
    if (buffer.charAt(0) === "-") {
        buffer = buffer.substring(1);
    } else {
        buffer = "-" + buffer;
    }
    updateScreen();
}

/**
 * Converts current number to percentage by dividing by 100
 */
function handlePercentage() {
    buffer = String(parseFloat(buffer) / 100);
    updateScreen();
}

/**
 * Handles mathematical operations (+, −, ×, ÷)
 * @param {string} operator - The operator symbol to process
 */
function handleMath(operator) {
    if (buffer === "0") return;
    
    const intBuffer = parseFloat(buffer);
    if (runningTotal === 0) {
        runningTotal = intBuffer;
    } else {
        flushOperation(intBuffer);
    }
    
    previousOperator = operator;
    buffer = "0";
}

/**
 * Performs the pending mathematical operation
 * Updates runningTotal based on previousOperator
 * @param {number} intBuffer - The number to operate with
 */
function flushOperation(intBuffer) {
    if (previousOperator === "+") {
        runningTotal += intBuffer;
    } else if (previousOperator === "−") {
        runningTotal -= intBuffer;
    } else if (previousOperator === "×") {
        runningTotal *= intBuffer;
    } else if (previousOperator === "÷") {
        runningTotal /= intBuffer;
    }
}

/**
 * Performs pending operation and returns the result
 * Used for equals (=) button functionality
 * @param {number} intBuffer - The number to operate with
 * @returns {number} The calculated result
 */
function flushOperationAndReturn(intBuffer) {
    if (previousOperator === "+") {
        runningTotal += intBuffer;
    } else if (previousOperator === "−") {
        runningTotal -= intBuffer;
    } else if (previousOperator === "×") {
        runningTotal *= intBuffer;
    } else if (previousOperator === "÷") {
        runningTotal /= intBuffer;
    }
    return runningTotal;
}

/**
 * Handles number input (0-9)
 * Appends digits to buffer or replaces "0"
 * @param {string} numString - The digit to add
 */
function handleNumber(numString) {
    if (buffer === "0") {
        buffer = numString;
    } else {
        buffer += numString;
    }
    updateScreen();
}

/**
 * ============================================================
 *                    UI INTERACTION FUNCTIONS
 * ============================================================
 */

/**
 * Toggles the bottom menu visibility (currently unused)
 * Legacy function for bottom menu interface
 */
function toggleBottomMenu() {
    const bottomMenu = document.getElementById('bottomMenu');
    const overlay = document.getElementById('bottomMenuOverlay');
    const menuBtn = document.getElementById('bottomMenuBtn');
    
    bottomMenu.classList.toggle('active');
    overlay.classList.toggle('active');
    
    // Animate hamburger icon
    if (bottomMenu.classList.contains('active')) {
        menuBtn.classList.add('active');
    } else {
        menuBtn.classList.remove('active');
    }
}

/**
 * Updates the history display in the sidebar
 * Shows the last 10 calculations with expression and result
 */
function updateHistoryDisplay() {
    // Update history in sidebar if exists
    const historyContent = document.getElementById('historyContent');
    if (historyContent && calculatorHistory.length > 0) {
        historyContent.innerHTML = calculatorHistory.slice(-10).map((calc, index) => {
            const parts = calc.split(' = ');
            const calculation = parts[0];
            const result = parts[1];
            return `
                <div class="history-item">
                    <span class="calc-expression">${calculation}</span>
                    <span class="calc-result">${result}</span>
                </div>
            `;
        }).join('');
    }
}

/**
 * Displays a temporary message on the calculator screen
 * Used for unit conversion results and user feedback
 * @param {string} message - The message to display
 */
function showMessage(message) {
    console.log(message); // For debugging
    
    // Show message in the calculator display briefly
    const originalBuffer = buffer;
    const originalDisplay = screen.textContent;
    
    screen.textContent = message;
    screen.style.fontSize = '24px'; // Smaller font for messages
    screen.style.color = '#FF9500'; // Orange color for messages
    
    setTimeout(() => {
        buffer = originalBuffer;
        updateScreen();
        screen.style.fontSize = '48px'; // Restore normal font size
        screen.style.color = '#FFFFFF'; // Restore white color
    }, 2000);
}

/**
 * Toggles the sidebar visibility
 * Controls hamburger menu, sidebar, and overlay states
 */
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
    hamburgerBtn.classList.toggle('active');
}

/**
 * ============================================================
 *                    MAIN SYMBOL HANDLER
 * ============================================================
 */

/**
 * Main function that handles all calculator button inputs
 * Routes different symbols to appropriate handler functions
 * Supports basic operations, scientific functions, and unit conversions
 * @param {string} symbol - The symbol from button press or keyboard input
 */
function handleSymbol(symbol) {
    switch (symbol) {
        // === BASIC CALCULATOR FUNCTIONS ===
        
        case "AC":
        case "C":
            handleACButton();
            break;

        case "+/−":
            handlePlusMinusButton();
            break;

        case "%":
            handlePercentage();
            break;

        case "=":
            if (!previousOperator) return;
            const calculation = `${runningTotal} ${previousOperator} ${buffer} = ${flushOperationAndReturn(parseFloat(buffer))}`;
            flushOperation(parseFloat(buffer));
            previousOperator = null;
            buffer = String(runningTotal);
            // Add to history if not duplicate
            if (calculatorHistory[calculatorHistory.length - 1] !== calculation) {
                calculatorHistory.push(calculation);
                updateHistoryDisplay();
            }
            runningTotal = 0;
            updateScreen();
            break;

        case "←":
            // Backspace: remove last digit or reset to "0"
            buffer = buffer.length === 1 ? "0" : buffer.slice(0, -1);
            updateScreen();
            break;

        case ".":
            // Add decimal point if not already present
            if (!buffer.includes(".")) {
                buffer += ".";
                updateScreen();
            }
            break;

        // === MATHEMATICAL OPERATORS ===
        
        case "+":
        case "−":
        case "×":
        case "÷":
            handleMath(symbol);
            break;

        // === SCIENTIFIC FUNCTIONS ===
        // All trigonometric functions expect input in degrees
        
        case "sin":
            // Sine function (input in degrees, converted to radians)
            buffer = String(Math.sin(parseFloat(buffer) * Math.PI / 180));
            updateScreen();
            break;
        case "cos":
            // Cosine function (input in degrees, converted to radians)
            buffer = String(Math.cos(parseFloat(buffer) * Math.PI / 180));
            updateScreen();
            break;
        case "tan":
            // Tangent function (input in degrees, converted to radians)
            buffer = String(Math.tan(parseFloat(buffer) * Math.PI / 180));
            updateScreen();
            break;
        case "log":
            // Base-10 logarithm
            buffer = String(Math.log10(parseFloat(buffer)));
            updateScreen();
            break;
        case "ln":
            // Natural logarithm (base e)
            buffer = String(Math.log(parseFloat(buffer)));
            updateScreen();
            break;
        case "√":
            // Square root
            buffer = String(Math.sqrt(parseFloat(buffer)));
            updateScreen();
            break;
        case "x²":
            // Square (power of 2)
            buffer = String(Math.pow(parseFloat(buffer), 2));
            updateScreen();
            break;
        case "(":
            // Parentheses not implemented yet
            showMessage("Paréntesis no implementado");
            break;

        // === UNIT CONVERSION FUNCTIONS ===

        case "°C→°F":
            // Temperature: Celsius to Fahrenheit
            const celsius = parseFloat(buffer);
            buffer = String((celsius * 9/5) + 32);
            showMessage(`${celsius}°C = ${buffer}°F`);
            updateScreen();
            break;
        case "km→mi":
            // Distance: Kilometers to miles
            const km = parseFloat(buffer);
            buffer = String(km * 0.621371);
            showMessage(`${km}km = ${buffer}mi`);
            updateScreen();
            break;
        case "kg→lb":
            // Weight: Kilograms to pounds
            const kg = parseFloat(buffer);
            buffer = String(kg * 2.20462);
            showMessage(`${kg}kg = ${buffer}lb`);
            updateScreen();
            break;
        case "m→ft":
            // Distance: Meters to feet
            const meters = parseFloat(buffer);
            buffer = String(meters * 3.28084);
            showMessage(`${meters}m = ${buffer}ft`);
            updateScreen();
            break;

        // === MATHEMATICAL CONSTANTS ===
            
        case "π":
            // Pi constant (3.14159...)
            buffer = String(Math.PI);
            updateScreen();
            break;
        case "e":
            // Euler's number (2.71828...)
            buffer = String(Math.E);
            updateScreen();
            break;

        default:
            // Handle numeric input (0-9)
            if (!isNaN(parseInt(symbol))) {
                handleNumber(symbol);
            }
            break;
    }
}

/**
 * ============================================================
 *                    INITIALIZATION & EVENT HANDLERS
 * ============================================================
 */

/**
 * Main initialization function - runs when DOM is fully loaded
 * Sets up all event listeners and initializes calculator state
 */
document.addEventListener('DOMContentLoaded', function() {
    // Initialize display with "0"
    updateScreen();

    /**
     * === CALCULATOR BUTTON EVENT LISTENERS ===
     * Adds click handlers to all calculator buttons
     */
    document.querySelectorAll('.calc-button').forEach(button => {
        button.addEventListener('click', () => {
            // Special handling for icon button (bottom-left calculator icon)
            if (button.classList.contains('icon-btn')) {
                console.log('Calculator icon clicked - could show info or settings');
                return; // Don't process as a symbol
            }
            
            const symbol = button.textContent.trim();
            handleSymbol(symbol);
        });
    });

    /**
     * === SIDEBAR/HAMBURGER MENU FUNCTIONALITY ===
     * Controls the slide-out history sidebar
     */
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    const closeSidebar = document.getElementById('closeSidebar');

    if (hamburgerBtn) {
        hamburgerBtn.addEventListener('click', toggleSidebar);
    }
    
    if (overlay) {
        overlay.addEventListener('click', toggleSidebar);
    }
    
    if (closeSidebar) {
        closeSidebar.addEventListener('click', toggleSidebar);
    }

    /**
     * === MODE SWITCHING FUNCTIONALITY ===
     * Handles Basic, Scientific, and Conversion mode switching
     */
    document.querySelectorAll('.menu-option').forEach(option => {
        option.addEventListener('click', (e) => {
            // Remove active state from all mode options
            document.querySelectorAll('.menu-option').forEach(opt => opt.classList.remove('active'));
            // Add active state to clicked option
            e.target.classList.add('active');
            
            // Get selected mode and log for future implementation
            const mode = e.target.dataset.mode;
            console.log('Switching to mode:', mode);
            
            // Close bottom menu with delay for smooth UX
            setTimeout(() => {
                toggleBottomMenu();
            }, 300);
        });
    });

    /**
     * === HISTORY MANAGEMENT FUNCTIONS ===
     */
    
    // Clear history with user confirmation
    const clearHistoryBtn = document.getElementById('clearHistory');
    if (clearHistoryBtn) {
        clearHistoryBtn.addEventListener('click', () => {
            if (calculatorHistory.length === 0) {
                showMessage('No hay historial para borrar');
                return;
            }
            
            // Show confirmation dialog before clearing
            const confirmDelete = confirm('¿Estás seguro de que quieres borrar todo el historial?');
            if (confirmDelete) {
                calculatorHistory = [];
                updateHistoryDisplay();
                showMessage('Historial borrado');
            }
        });
    }

    // Edit history functionality - loads last calculation for editing
    const editHistoryBtn = document.getElementById('editHistory');
    if (editHistoryBtn) {
        editHistoryBtn.addEventListener('click', () => {
            if (calculatorHistory.length === 0) {
                showMessage('No hay historial para editar');
                return;
            }
            
            // Extract last number from most recent calculation
            const lastCalculation = calculatorHistory[calculatorHistory.length - 1];
            if (lastCalculation) {
                const parts = lastCalculation.split(' = ');
                const expression = parts[0];
                // Use regex to find the last number in the expression
                const match = expression.match(/[\d.]+$/);
                if (match) {
                    buffer = match[0];
                    updateScreen();
                    showMessage('Última operación cargada para editar');
                }
            }
        });
    }

    /**
     * === SPLASH SCREEN HANDLING ===
     * Auto-dismiss splash screen and handle user tap to dismiss
     */
    const splashScreen = document.getElementById('splashScreen');
    if (splashScreen) {
        // Auto dismiss after 2 seconds
        setTimeout(() => {
            splashScreen.classList.add('hidden');
            // Remove from DOM after CSS transition completes
            setTimeout(() => {
                splashScreen.remove();
            }, 300);
        }, 2000);
        
        // Allow manual dismissal by clicking
        splashScreen.addEventListener('click', () => {
            splashScreen.classList.add('hidden');
            setTimeout(() => {
                splashScreen.remove();
            }, 300);
        });
    }

    /**
     * === KEYBOARD SUPPORT ===
     * Maps physical keyboard keys to calculator functions
     * Supported keys: 0-9, +, -, *, /, =, Enter, Escape, Backspace, ., %
     */
    document.addEventListener('keydown', (event) => {
        const key = event.key;
        
        // Number keys (0-9)
        if (key >= '0' && key <= '9') {
            handleSymbol(key);
        }
        // Mathematical operators
        else if (key === '+') {
            handleSymbol('+');
        } else if (key === '-') {
            handleSymbol('−'); // Use proper minus symbol
        } else if (key === '*') {
            handleSymbol('×'); // Use proper multiplication symbol
        } else if (key === '/') {
            event.preventDefault(); // Prevent browser search
            handleSymbol('÷'); // Use proper division symbol
        }
        // Special function keys
        else if (key === 'Enter' || key === '=') {
            handleSymbol('=');
        } else if (key === 'Escape') {
            handleSymbol('AC'); // Clear calculator
        } else if (key === 'Backspace') {
            handleSymbol('←'); // Backspace function
        } else if (key === '.') {
            handleSymbol('.');
        } else if (key === '%') {
            handleSymbol('%');
        }
    });
});

// --- EDITAR y BORRAR en historial ---
const historyContent = document.getElementById('historyContent');
const editBtn = document.getElementById('editHistory');
const clearBtn = document.getElementById('clearHistory');
let editMode = false;

// Alternar modo editar (selección)
editBtn.addEventListener('click', () => {
    editMode = !editMode;
    editBtn.textContent = editMode ? 'Listo' : 'Editar';
    clearBtn.style.display = editMode ? 'inline-block' : '';
    // Marcar items como seleccionables
    Array.from(historyContent.children).forEach(item=>{
        if(editMode) item.classList.add('selectable');
        else { item.classList.remove('selectable','selected'); }
    });
});

// Seleccionar/deseleccionar items
historyContent.addEventListener('click', (e)=>{
    if(!editMode) return;
    const item = e.target.closest('.history-item');
    if(item) item.classList.toggle('selected');
});

// Borrar seleccionados
clearBtn.addEventListener('click', ()=>{
    if(!editMode) return;
    Array.from(historyContent.getElementsByClassName('selected')).forEach(item=>item.remove());
});

// --- FAB MENU (menú flotante de modos) ---
const fabBtn = document.getElementById('fabMenuBtn');
const fabMenu = document.getElementById('fabMenuPopup');
let fabOpen = false;

fabBtn.addEventListener('click', e=>{
    fabMenu.style.display = fabOpen ? 'none' : 'block';
    fabOpen = !fabOpen;
    // Cerrar si haces click fuera del menú
    if(fabOpen) {
        setTimeout(()=>{
            document.addEventListener('mousedown', closeFabMenuOnClickOutside);
        },1);
    }
});

function closeFabMenuOnClickOutside(e) {
    if(!fabMenu.contains(e.target) && e.target !== fabBtn) {
        fabMenu.style.display = 'none';
        fabOpen = false;
        document.removeEventListener('mousedown', closeFabMenuOnClickOutside);
    }
}

// Resalta el modo activo (puedes conectar esta parte con tu lógica de cambio de modo)
fabMenu.querySelectorAll('li[data-mode]').forEach(li=>{
    li.addEventListener('click', ()=>{
        fabMenu.querySelectorAll('li').forEach(l=>l.classList.remove('active'));
        li.classList.add('active');
        fabMenu.style.display = 'none';
        fabOpen = false;
        // TODO: Cambia el modo de calculadora aquí según li.dataset.mode
        // Por ejemplo: switchCalculatorMode(li.dataset.mode);
    });
});

// Switch para convertir
document.getElementById('convertSwitch').addEventListener('change', function(){
    // TODO: aquí puedes activar/desactivar modo convertir
    // Por ejemplo: toggleConvertMode(this.checked);
});