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
            break;

        case "←":
            buffer = buffer.length === 1 ? "0" : buffer.slice(0, -1);
            break;

        case ".":
            if (!buffer.includes(".")) buffer += ".";
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
            buffer = String(Math.pow(parseFloat(buffer), 2));
            break;
        case "(":
            showMessage("Paréntesis no implementado");
            break;

        // Conversiones
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
        case "π":
            buffer = String(Math.PI);
            break;
        case "e":
            buffer = String(Math.E);
            break;

        case "🧮":
            toggleSidebar();
            break;
    }
}