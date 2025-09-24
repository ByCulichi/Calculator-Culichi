/* ============================================================
    IMATH Calculator - Complete JavaScript Implementation
   ============================================================ */

// Global calculator state variables
let buffer = "0";
let runningTotal = 0;
let previousOperator = null;
let calculatorHistory = [];

// Get display element
const screen = document.querySelector('.screen');

// Core calculator functions
function updateScreen() {
    // Display negative numbers in parentheses for clarity
    let displayValue = buffer;
    if (buffer.startsWith("-") && buffer !== "-0" && buffer !== "0") {
        displayValue = `(${buffer})`;
    }
    screen.textContent = displayValue;
}

function handleACButton() {
    buffer = "0";
    runningTotal = 0;
    previousOperator = null;
    updateScreen();
}

function handlePlusMinusButton() {
    if (buffer === "0") return;
    if (buffer.charAt(0) === "-") {
        buffer = buffer.substring(1);
    } else {
        buffer = "-" + buffer;
    }
    updateScreen();
}

function handlePercentage() {
    buffer = String(parseFloat(buffer) / 100);
    updateScreen();
}

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

function handleNumber(numString) {
    if (buffer === "0") {
        buffer = numString;
    } else {
        buffer += numString;
    }
    updateScreen();
}

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

function showMessage(message) {
    console.log(message); // For debugging
}

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
    hamburgerBtn.classList.toggle('active');
}

function handleSymbol(symbol) {
    switch (symbol) {
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
            if (calculatorHistory[calculatorHistory.length - 1] !== calculation) {
                calculatorHistory.push(calculation);
                updateHistoryDisplay();
            }
            runningTotal = 0;
            updateScreen();
            break;

        case "←":
            buffer = buffer.length === 1 ? "0" : buffer.slice(0, -1);
            updateScreen();
            break;

        case ".":
            if (!buffer.includes(".")) {
                buffer += ".";
                updateScreen();
            }
            break;

        case "+":
        case "−":
        case "×":
        case "÷":
            handleMath(symbol);
            break;

        // Scientific functions
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
            showMessage("Paréntesis no implementado");
            break;

        // Conversiones
        case "°C→°F":
            const celsius = parseFloat(buffer);
            buffer = String((celsius * 9/5) + 32);
            showMessage(`${celsius}°C = ${buffer}°F`);
            updateScreen();
            break;
        case "km→mi":
            const km = parseFloat(buffer);
            buffer = String(km * 0.621371);
            showMessage(`${km}km = ${buffer}mi`);
            updateScreen();
            break;
        case "kg→lb":
            const kg = parseFloat(buffer);
            buffer = String(kg * 2.20462);
            showMessage(`${kg}kg = ${buffer}lb`);
            updateScreen();
            break;
        case "m→ft":
            const meters = parseFloat(buffer);
            buffer = String(meters * 3.28084);
            showMessage(`${meters}m = ${buffer}ft`);
            updateScreen();
            break;
        case "π":
            buffer = String(Math.PI);
            updateScreen();
            break;
        case "e":
            buffer = String(Math.E);
            updateScreen();
            break;

        default:
            // Handle number inputs
            if (!isNaN(parseInt(symbol))) {
                handleNumber(symbol);
            }
            break;
    }
}

/* ------------------------------
    Initialization and Event Handlers
   ------------------------------ */
document.addEventListener('DOMContentLoaded', function() {
    // Initialize display
    updateScreen();

    // Add event listeners to all calculator buttons
    document.querySelectorAll('.calc-button').forEach(button => {
        button.addEventListener('click', () => {
            // Special handling for icon button
            if (button.classList.contains('icon-btn')) {
                console.log('Calculator icon clicked - could show info or settings');
                return; // Don't process as a symbol
            }
            
            const symbol = button.textContent.trim();
            handleSymbol(symbol);
        });
    });

    // Hamburger menu functionality
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

    // Bottom menu functionality - REMOVED since bottom menu button no longer exists
    // The icon is now inside the calculator keypad

    // Menu options handling
    document.querySelectorAll('.menu-option').forEach(option => {
        option.addEventListener('click', (e) => {
            // Remove active from all options
            document.querySelectorAll('.menu-option').forEach(opt => opt.classList.remove('active'));
            // Add active to clicked option
            e.target.classList.add('active');
            
            // Here you can add mode switching logic
            const mode = e.target.dataset.mode;
            console.log('Switching to mode:', mode);
            
            // Close menu
            setTimeout(() => {
                toggleBottomMenu();
            }, 300);
        });
    });

    // Clear history button
    const clearHistoryBtn = document.getElementById('clearHistory');
    if (clearHistoryBtn) {
        clearHistoryBtn.addEventListener('click', () => {
            calculatorHistory = [];
            updateHistoryDisplay();
        });
    }

    // Edit history button (placeholder)
    const editHistoryBtn = document.getElementById('editHistory');
    if (editHistoryBtn) {
        editHistoryBtn.addEventListener('click', () => {
            console.log('Edit history functionality would go here');
        });
    }

    // Splash Screen handling
    const splashScreen = document.getElementById('splashScreen');
    if (splashScreen) {
        // Auto dismiss after 2 seconds
        setTimeout(() => {
            splashScreen.classList.add('hidden');
            // Remove from DOM after transition
            setTimeout(() => {
                splashScreen.remove();
            }, 300);
        }, 2000);
        
        // Allow tap to dismiss
        splashScreen.addEventListener('click', () => {
            splashScreen.classList.add('hidden');
            setTimeout(() => {
                splashScreen.remove();
            }, 300);
        });
    }

    // Keyboard support
    document.addEventListener('keydown', (event) => {
        const key = event.key;
        
        // Number keys
        if (key >= '0' && key <= '9') {
            handleSymbol(key);
        }
        // Operators
        else if (key === '+') {
            handleSymbol('+');
        } else if (key === '-') {
            handleSymbol('−');
        } else if (key === '*') {
            handleSymbol('×');
        } else if (key === '/') {
            event.preventDefault();
            handleSymbol('÷');
        }
        // Special keys
        else if (key === 'Enter' || key === '=') {
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
});