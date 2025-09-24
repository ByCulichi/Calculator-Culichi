/* ============================================================
    Calculator Culichi - Enhanced JavaScript Implementation
    
    A sophisticated iOS-style calculator with improved error handling:
    - Enhanced Basic: Standard arithmetic operations with error validation
    - Safe Scientific: Trigonometric and logarithmic functions with input validation
    - Accurate Conversion: Unit conversions with precision handling
    - Robust Error Handling: Comprehensive validation and error messages
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
let screen = null; // Will be initialized in DOMContentLoaded

/**
 * ============================================================
 *                    UTILITY FUNCTIONS
 * ============================================================
 */

/**
 * Safely rounds number to avoid floating point precision issues
 * @param {number} num - Number to round
 * @param {number} decimals - Number of decimal places (default: 10)
 * @returns {number} Rounded number
 */
function safeRound(num, decimals = 10) {
    return Math.round(num * Math.pow(10, decimals)) / Math.pow(10, decimals);
}

/**
 * Validates if a number is valid for mathematical operations
 * @param {number} num - Number to validate
 * @returns {boolean} True if valid, false otherwise
 */
function isValidNumber(num) {
    return !isNaN(num) && isFinite(num);
}

/**
 * Formats display number for better readability
 * @param {number} num - Number to format
 * @returns {string} Formatted number string
 */
function formatDisplayNumber(num) {
    // Handle very large or very small numbers
    if (Math.abs(num) >= 1e10 || (Math.abs(num) < 1e-6 && num !== 0)) {
        return num.toExponential(6);
    }
    
    // Remove unnecessary trailing zeros
    const rounded = safeRound(num);
    return rounded.toString();
}

/**
 * Shows error message on calculator display
 * @param {string} error - Error message to display
 */
function showError(error) {
    console.error('Calculator Error:', error);
    
    if (screen) {
        const originalStyle = {
            fontSize: screen.style.fontSize,
            color: screen.style.color
        };
        
        screen.textContent = error;
        screen.style.fontSize = '20px'; // Smaller font for error messages
        screen.style.color = '#FF3B30'; // Red color for errors
        
        setTimeout(() => {
            buffer = "0";
            updateScreen();
            screen.style.fontSize = originalStyle.fontSize || '48px';
            screen.style.color = originalStyle.color || '#FFFFFF';
        }, 3000);
    }
}

/**
 * ============================================================
 *                    CORE CALCULATOR FUNCTIONS
 * ============================================================
 */

/**
 * Updates the calculator display with the current buffer value
 * Handles negative number display and formatting
 */
function updateScreen() {
    if (!screen) {
        console.error('Screen element not found');
        return;
    }
    
    try {
        let displayValue = buffer;
        
        // Handle special cases
        if (buffer === "Error" || buffer === "Infinity" || buffer === "-Infinity") {
            screen.textContent = buffer;
            return;
        }
        
        // Parse and format number for display
        const numValue = parseFloat(buffer);
        if (isValidNumber(numValue)) {
            displayValue = formatDisplayNumber(numValue);
        }
        
        // Display negative numbers in parentheses for clarity
        if (displayValue.startsWith("-") && displayValue !== "-0" && displayValue !== "0") {
            displayValue = `(${displayValue})`;
        }
        
        screen.textContent = displayValue;
    } catch (error) {
        console.error('Error updating screen:', error);
        screen.textContent = "Error";
    }
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
 * Does nothing if buffer is "0" or contains an error
 */
function handlePlusMinusButton() {
    if (buffer === "0" || buffer === "Error" || !isValidNumber(parseFloat(buffer))) {
        return;
    }
    
    try {
        if (buffer.charAt(0) === "-") {
            buffer = buffer.substring(1);
        } else {
            buffer = "-" + buffer;
        }
        updateScreen();
    } catch (error) {
        console.error('Error in plus/minus operation:', error);
        showError("Error");
    }
}

/**
 * Converts current number to percentage by dividing by 100
 * Validates input before performing operation
 */
function handlePercentage() {
    try {
        const numValue = parseFloat(buffer);
        if (!isValidNumber(numValue)) {
            showError("Entrada inválida");
            return;
        }
        
        const result = safeRound(numValue / 100);
        buffer = formatDisplayNumber(result);
        updateScreen();
    } catch (error) {
        console.error('Error in percentage operation:', error);
        showError("Error");
    }
}

/**
 * Handles mathematical operations (+, −, ×, ÷)
 * Validates input and handles division by zero
 * @param {string} operator - The operator symbol to process
 */
function handleMath(operator) {
    if (buffer === "0" || buffer === "Error") return;
    
    try {
        const intBuffer = parseFloat(buffer);
        if (!isValidNumber(intBuffer)) {
            showError("Entrada inválida");
            return;
        }
        
        if (runningTotal === 0) {
            runningTotal = intBuffer;
        } else {
            const result = flushOperation(intBuffer);
            if (!isValidNumber(result)) {
                return; // Error already handled in flushOperation
            }
            runningTotal = result;
        }
        
        previousOperator = operator;
        buffer = "0";
    } catch (error) {
        console.error('Error in math operation:', error);
        showError("Error");
    }
}

/**
 * Performs the pending mathematical operation with error handling
 * Updates runningTotal based on previousOperator
 * @param {number} intBuffer - The number to operate with
 * @returns {number} The calculation result
 */
function flushOperation(intBuffer) {
    try {
        if (!previousOperator) return runningTotal;
        
        let result;
        switch (previousOperator) {
            case "+":
                result = runningTotal + intBuffer;
                break;
            case "−":
                result = runningTotal - intBuffer;
                break;
            case "×":
                result = runningTotal * intBuffer;
                break;
            case "÷":
                if (intBuffer === 0) {
                    showError("División por cero");
                    return runningTotal;
                }
                result = runningTotal / intBuffer;
                break;
            default:
                return runningTotal;
        }
        
        if (!isValidNumber(result)) {
            showError("Resultado inválido");
            return runningTotal;
        }
        
        return safeRound(result);
    } catch (error) {
        console.error('Error in flush operation:', error);
        showError("Error");
        return runningTotal;
    }
}

/**
 * Performs pending operation and returns the result (for equals button)
 * @param {number} intBuffer - The number to operate with
 * @returns {number} The calculated result
 */
function flushOperationAndReturn(intBuffer) {
    const result = flushOperation(intBuffer);
    runningTotal = result;
    return result;
}

/**
 * Handles number input (0-9) with validation
 * Appends digits to buffer or replaces "0"
 * @param {string} numString - The digit to add
 */
function handleNumber(numString) {
    try {
        // Reset buffer if it contains an error
        if (buffer === "Error" || buffer === "Infinity" || buffer === "-Infinity") {
            buffer = "0";
        }
        
        // Limit number length to prevent display overflow
        if (buffer.length >= 15) {
            showMessage("Límite de dígitos alcanzado");
            return;
        }
        
        if (buffer === "0") {
            buffer = numString;
        } else {
            buffer += numString;
        }
        updateScreen();
    } catch (error) {
        console.error('Error in number input:', error);
        showError("Error");
    }
}

/**
 * ============================================================
 *                    SCIENTIFIC FUNCTIONS (ENHANCED)
 * ============================================================
 */

/**
 * Handles trigonometric functions with input validation
 * @param {string} func - The function name (sin, cos, tan)
 */
function handleTrigFunction(func) {
    try {
        const numValue = parseFloat(buffer);
        if (!isValidNumber(numValue)) {
            showError("Entrada inválida");
            return;
        }
        
        // Convert degrees to radians
        const radians = (numValue * Math.PI) / 180;
        let result;
        
        switch (func) {
            case "sin":
                result = Math.sin(radians);
                break;
            case "cos":
                result = Math.cos(radians);
                break;
            case "tan":
                // Check for asymptotes (odd multiples of 90 degrees)
                if (Math.abs(Math.cos(radians)) < 1e-10) {
                    showError("Indefinido (tan 90°)");
                    return;
                }
                result = Math.tan(radians);
                break;
            default:
                return;
        }
        
        if (!isValidNumber(result)) {
            showError("Resultado inválido");
            return;
        }
        
        buffer = formatDisplayNumber(safeRound(result));
        updateScreen();
    } catch (error) {
        console.error(`Error in ${func} function:`, error);
        showError("Error");
    }
}

/**
 * Handles logarithmic functions with domain validation
 * @param {string} func - The function name (log, ln)
 */
function handleLogFunction(func) {
    try {
        const numValue = parseFloat(buffer);
        if (!isValidNumber(numValue)) {
            showError("Entrada inválida");
            return;
        }
        
        if (numValue <= 0) {
            showError("Log de número ≤ 0");
            return;
        }
        
        let result;
        switch (func) {
            case "log":
                result = Math.log10(numValue);
                break;
            case "ln":
                result = Math.log(numValue);
                break;
            default:
                return;
        }
        
        if (!isValidNumber(result)) {
            showError("Resultado inválido");
            return;
        }
        
        buffer = formatDisplayNumber(safeRound(result));
        updateScreen();
    } catch (error) {
        console.error(`Error in ${func} function:`, error);
        showError("Error");
    }
}

/**
 * Handles square root with validation
 */
function handleSquareRoot() {
    try {
        const numValue = parseFloat(buffer);
        if (!isValidNumber(numValue)) {
            showError("Entrada inválida");
            return;
        }
        
        if (numValue < 0) {
            showError("√ de número negativo");
            return;
        }
        
        const result = Math.sqrt(numValue);
        buffer = formatDisplayNumber(safeRound(result));
        updateScreen();
    } catch (error) {
        console.error('Error in square root:', error);
        showError("Error");
    }
}

/**
 * Handles power of 2 with overflow check
 */
function handleSquare() {
    try {
        const numValue = parseFloat(buffer);
        if (!isValidNumber(numValue)) {
            showError("Entrada inválida");
            return;
        }
        
        const result = Math.pow(numValue, 2);
        
        if (!isValidNumber(result)) {
            showError("Resultado muy grande");
            return;
        }
        
        buffer = formatDisplayNumber(safeRound(result));
        updateScreen();
    } catch (error) {
        console.error('Error in square operation:', error);
        showError("Error");
    }
}

/**
 * ============================================================
 *                    UI INTERACTION FUNCTIONS
 * ============================================================
 */

/**
 * Updates the history display in the sidebar
 * Shows the last 10 calculations with expression and result
 */
function updateHistoryDisplay() {
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
    if (!screen) return;
    
    console.log(message); // For debugging
    
    const originalBuffer = buffer;
    const originalStyle = {
        fontSize: screen.style.fontSize,
        color: screen.style.color
    };
    
    screen.textContent = message;
    screen.style.fontSize = '24px';
    screen.style.color = '#FF9500';
    
    setTimeout(() => {
        buffer = originalBuffer;
        updateScreen();
        screen.style.fontSize = originalStyle.fontSize || '48px';
        screen.style.color = originalStyle.color || '#FFFFFF';
    }, 2000);
}

/**
 * Safely toggles sidebar visibility with error handling
 */
function toggleSidebar() {
    try {
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('sidebarOverlay');
        const hamburgerBtn = document.getElementById('hamburgerBtn');
        
        if (sidebar) sidebar.classList.toggle('active');
        if (overlay) overlay.classList.toggle('active');
        if (hamburgerBtn) hamburgerBtn.classList.toggle('active');
    } catch (error) {
        console.error('Error toggling sidebar:', error);
    }
}

/**
 * ============================================================
 *                    MAIN SYMBOL HANDLER (ENHANCED)
 * ============================================================
 */

/**
 * Main function that handles all calculator button inputs with enhanced error handling
 * @param {string} symbol - The symbol from button press or keyboard input
 */
function handleSymbol(symbol) {
    try {
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
                const intBuffer = parseFloat(buffer);
                if (!isValidNumber(intBuffer)) {
                    showError("Entrada inválida");
                    return;
                }
                
                const result = flushOperationAndReturn(intBuffer);
                if (isValidNumber(result)) {
                    const calculation = `${runningTotal} ${previousOperator} ${buffer} = ${formatDisplayNumber(result)}`;
                    
                    previousOperator = null;
                    buffer = formatDisplayNumber(result);
                    
                    // Add to history if not duplicate
                    if (calculatorHistory[calculatorHistory.length - 1] !== calculation) {
                        calculatorHistory.push(calculation);
                        updateHistoryDisplay();
                    }
                    
                    runningTotal = 0;
                    updateScreen();
                }
                break;

            case "←":
                // Backspace: remove last digit or reset to "0"
                if (buffer === "Error" || buffer === "Infinity" || buffer === "-Infinity") {
                    buffer = "0";
                } else {
                    buffer = buffer.length === 1 ? "0" : buffer.slice(0, -1);
                }
                updateScreen();
                break;

            case ".":
                // Add decimal point if not already present and buffer is valid
                if (buffer === "Error" || buffer === "Infinity" || buffer === "-Infinity") {
                    buffer = "0.";
                } else if (!buffer.includes(".")) {
                    buffer += ".";
                }
                updateScreen();
                break;

            // === MATHEMATICAL OPERATORS ===
            case "+":
            case "−":
            case "×":
            case "÷":
                handleMath(symbol);
                break;

            // === ENHANCED SCIENTIFIC FUNCTIONS ===
            case "sin":
            case "cos":
            case "tan":
                handleTrigFunction(symbol);
                break;
                
            case "log":
            case "ln":
                handleLogFunction(symbol);
                break;
                
            case "√":
                handleSquareRoot();
                break;
                
            case "x²":
                handleSquare();
                break;
                
            case "(":
                showMessage("Paréntesis no implementado");
                break;

            // === UNIT CONVERSION FUNCTIONS (ENHANCED) ===
            case "°C→°F":
                try {
                    const celsius = parseFloat(buffer);
                    if (!isValidNumber(celsius)) {
                        showError("Entrada inválida");
                        return;
                    }
                    const fahrenheit = safeRound((celsius * 9/5) + 32);
                    buffer = formatDisplayNumber(fahrenheit);
                    showMessage(`${formatDisplayNumber(celsius)}°C = ${buffer}°F`);
                    updateScreen();
                } catch (error) {
                    console.error('Error in temperature conversion:', error);
                    showError("Error");
                }
                break;
                
            case "km→mi":
                try {
                    const km = parseFloat(buffer);
                    if (!isValidNumber(km) || km < 0) {
                        showError("Entrada inválida");
                        return;
                    }
                    const miles = safeRound(km * 0.621371);
                    buffer = formatDisplayNumber(miles);
                    showMessage(`${formatDisplayNumber(km)}km = ${buffer}mi`);
                    updateScreen();
                } catch (error) {
                    console.error('Error in distance conversion:', error);
                    showError("Error");
                }
                break;
                
            case "kg→lb":
                try {
                    const kg = parseFloat(buffer);
                    if (!isValidNumber(kg) || kg < 0) {
                        showError("Entrada inválida");
                        return;
                    }
                    const pounds = safeRound(kg * 2.20462);
                    buffer = formatDisplayNumber(pounds);
                    showMessage(`${formatDisplayNumber(kg)}kg = ${buffer}lb`);
                    updateScreen();
                } catch (error) {
                    console.error('Error in weight conversion:', error);
                    showError("Error");
                }
                break;
                
            case "m→ft":
                try {
                    const meters = parseFloat(buffer);
                    if (!isValidNumber(meters) || meters < 0) {
                        showError("Entrada inválida");
                        return;
                    }
                    const feet = safeRound(meters * 3.28084);
                    buffer = formatDisplayNumber(feet);
                    showMessage(`${formatDisplayNumber(meters)}m = ${buffer}ft`);
                    updateScreen();
                } catch (error) {
                    console.error('Error in length conversion:', error);
                    showError("Error");
                }
                break;

            // === MATHEMATICAL CONSTANTS ===
            case "π":
                buffer = formatDisplayNumber(Math.PI);
                updateScreen();
                break;
                
            case "e":
                buffer = formatDisplayNumber(Math.E);
                updateScreen();
                break;

            default:
                // Handle numeric input (0-9)
                if (!isNaN(parseInt(symbol)) && symbol.length === 1) {
                    handleNumber(symbol);
                }
                break;
        }
    } catch (error) {
        console.error('Error in handleSymbol:', error);
        showError("Error");
    }
}

/**
 * ============================================================
 *                    INITIALIZATION & EVENT HANDLERS
 * ============================================================
 */

/**
 * Main initialization function with comprehensive error handling
 */
document.addEventListener('DOMContentLoaded', function() {
    try {
        // Initialize screen reference
        screen = document.querySelector('.screen');
        if (!screen) {
            console.error('Calculator screen element not found');
            return;
        }
        
        // Initialize display with "0"
        updateScreen();

        // === CALCULATOR BUTTON EVENT LISTENERS ===
        document.querySelectorAll('.calc-button').forEach(button => {
            button.addEventListener('click', () => {
                try {
                    // Special handling for icon button
                    if (button.classList.contains('icon-btn')) {
                        console.log('Calculator icon clicked - could show info or settings');
                        return;
                    }
                    
                    const symbol = button.textContent.trim();
                    handleSymbol(symbol);
                } catch (error) {
                    console.error('Error in button click handler:', error);
                    showError("Error");
                }
            });
        });

        // === SIDEBAR/HAMBURGER MENU FUNCTIONALITY ===
        const hamburgerBtn = document.getElementById('hamburgerBtn');
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

        // === MODE SWITCHING FUNCTIONALITY ===
        document.querySelectorAll('.menu-option').forEach(option => {
            option.addEventListener('click', (e) => {
                try {
                    document.querySelectorAll('.menu-option').forEach(opt => opt.classList.remove('active'));
                    e.target.classList.add('active');
                    
                    const mode = e.target.dataset.mode;
                    console.log('Switching to mode:', mode);
                } catch (error) {
                    console.error('Error in mode switching:', error);
                }
            });
        });

        // === HISTORY MANAGEMENT FUNCTIONS ===
        const clearHistoryBtn = document.getElementById('clearHistory');
        if (clearHistoryBtn) {
            clearHistoryBtn.addEventListener('click', () => {
                try {
                    if (calculatorHistory.length === 0) {
                        showMessage('No hay historial para borrar');
                        return;
                    }
                    
                    const confirmDelete = confirm('¿Estás seguro de que quieres borrar todo el historial?');
                    if (confirmDelete) {
                        calculatorHistory = [];
                        updateHistoryDisplay();
                        showMessage('Historial borrado');
                    }
                } catch (error) {
                    console.error('Error clearing history:', error);
                    showError("Error");
                }
            });
        }

        const editHistoryBtn = document.getElementById('editHistory');
        if (editHistoryBtn) {
            editHistoryBtn.addEventListener('click', () => {
                try {
                    if (calculatorHistory.length === 0) {
                        showMessage('No hay historial para editar');
                        return;
                    }
                    
                    const lastCalculation = calculatorHistory[calculatorHistory.length - 1];
                    if (lastCalculation) {
                        const parts = lastCalculation.split(' = ');
                        const expression = parts[0];
                        const match = expression.match(/[\d.]+$/);
                        if (match && isValidNumber(parseFloat(match[0]))) {
                            buffer = match[0];
                            updateScreen();
                            showMessage('Última operación cargada para editar');
                        }
                    }
                } catch (error) {
                    console.error('Error editing history:', error);
                    showError("Error");
                }
            });
        }

        // === SPLASH SCREEN HANDLING ===
        const splashScreen = document.getElementById('splashScreen');
        if (splashScreen) {
            setTimeout(() => {
                splashScreen.classList.add('hidden');
                setTimeout(() => {
                    splashScreen.remove();
                }, 300);
            }, 2000);
            
            splashScreen.addEventListener('click', () => {
                splashScreen.classList.add('hidden');
                setTimeout(() => {
                    splashScreen.remove();
                }, 300);
            });
        }

        // === ENHANCED KEYBOARD SUPPORT ===
        document.addEventListener('keydown', (event) => {
            try {
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
            } catch (error) {
                console.error('Error in keyboard handler:', error);
                showError("Error");
            }
        });

    } catch (error) {
        console.error('Error in DOMContentLoaded:', error);
        if (screen) {
            screen.textContent = "Error de inicialización";
        }
    }
});