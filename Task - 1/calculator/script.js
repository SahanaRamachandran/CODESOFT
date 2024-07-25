document.addEventListener("DOMContentLoaded", function() {
    const display = document.getElementById('display');
    const buttons = Array.from(document.getElementsByClassName('btn'));
    let currentInput = '';
    let operator = null;
    let previousInput = '';
    
    buttons.map( button => {
        button.addEventListener('click', (e) => {
            const value = e.target.innerText;
            
            if (value === 'C') {
                currentInput = '';
                previousInput = '';
                operator = null;
                display.innerText = '0';
            } else if (value === '←') {
                currentInput = currentInput.slice(0, -1);
                display.innerText = currentInput || '0';
            } else if (value === '=') {
                if (currentInput && operator && previousInput) {
                    currentInput = evaluate(previousInput, currentInput, operator);
                    display.innerText = currentInput;
                    operator = null;
                    previousInput = '';
                }
            } else if (['+', '-', '*', '/'].includes(value)) {
                if (currentInput) {
                    if (operator) {
                        currentInput = evaluate(previousInput, currentInput, operator);
                        display.innerText = currentInput;
                    }
                    previousInput = currentInput;
                    currentInput = '';
                    operator = value;
                }
            } else {
                currentInput += value;
                display.innerText = currentInput;
            }
        });
    });

    function evaluate(num1, num2, op) {
        const n1 = parseFloat(num1);
        const n2 = parseFloat(num2);
        if (op === '+') return (n1 + n2).toString();
        if (op === '-') return (n1 - n2).toString();
        if (op === '*') return (n1 * n2).toString();
        if (op === '/') return (n1 / n2).toString();
        return '';
    }
});
