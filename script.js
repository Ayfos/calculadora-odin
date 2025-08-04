const add = function (a, b) {

    return a + b;

}

const subtract = function (a, b) {
    return a - b;
}

const multiply = function (a, b) {
    return a * b;
}

const divide = function (a, b) {
    if (b === 0) {
        return "¡No puedes dividir por cero! Inténtalo con otra cosa 😉";
    }
    return a / b;
}

function operate(a, operator, b) {

    switch (operator) {

        case '+':
            return add(a, b);

        case '-':
            return subtract(a, b);

        case '*':
            return multiply(a, b);

        case '/':

            return divide(a, b);

        default:
            return "Operador no válido. Por favor, usa +, -, * o /.";
    }
}

function parseDisplay() {
    const val = display.textContent;
    return isNaN(Number(val)) ? 0 : Number(val);
}

function roundResult(num) {
    return Math.round(num * 1e6) / 1e6;
}


// Variables para almacenar datos y controlar el estado de la calculadora

let firstNumber = '';
let secondNumber = '';
let operator = '';
let resetDisplay = false;

// Selectores de elementos del DOM

const display = document.querySelector('.display');

const buttonsNumbers = document.querySelectorAll('.number');

const buttonsOperators = document.querySelectorAll('.operator');

const buttonEqual = document.querySelector('.equal');

const buttonBackspace = document.querySelector('.backspace');

const buttonClear = document.querySelector('.clear');

// Event listeners para los botones de números

for (let i = 0; i < buttonsNumbers.length; i++) {
    buttonsNumbers[i].addEventListener('click', function () {
 

        if (display.textContent === '0' || resetDisplay) {
            display.textContent = '';
            resetDisplay = false;
        }
        display.textContent += this.textContent;

    });
}

// Event listeners para los botones de operadores

for (let i = 0; i < buttonsOperators.length; i++) {

    buttonsOperators[i].addEventListener('click', function () {
        if (operator && resetDisplay) {
            // Si el usuario pulsa operador dos veces seguidas, solo actualizamos el operador
            operator = this.textContent;
            return;
        }
        if (!operator) {
            firstNumber = parseDisplay();
        } else if (!resetDisplay) {
            // Operar si ya hay operador y no está en reset
            secondNumber = parseDisplay();
            const result = operate(firstNumber, operator, secondNumber);
            display.textContent = result;
            firstNumber = result;
        }
        operator = this.textContent;
        resetDisplay = true;
    });

}

// Event listener para el botón de igual

buttonEqual.addEventListener('click', function () {
    if (!operator) return;
    secondNumber = parseDisplay();
    let result = operate(firstNumber, operator, secondNumber);

    if (typeof result !== 'number') {
        // Resultado es un string (mensaje error)
        operator = '';
        resetDisplay = true;
    } else {
        firstNumber = result;
        operator = '';
        resetDisplay = true;
    }
    display.textContent = result;
});



// Event listener para el botón de limpiar

buttonClear.addEventListener('click', function () {
    display.textContent = '0';
    firstNumber = '';
    secondNumber = '';
    operator = '';
    resetDisplay = false;
});

// para decimal

const buttonDecimal = document.querySelector('.decimal');
buttonDecimal.addEventListener('click', function () {
    if (resetDisplay) {
        display.textContent = '0.';
        resetDisplay = false;
        return;
    }
    if (!display.textContent.includes('.')) {
        display.textContent += '.';
    }
});


// Event listener para el botón de retroceso
buttonBackspace.addEventListener('click', function () {
    if (resetDisplay) {
        display.textContent = '0';
        resetDisplay = false;
        return; // Salimos porque acabamos de limpiar
    }

    if (display.textContent.length > 1) {
        // Quitamos el último carácter
        display.textContent = display.textContent.slice(0, -1);
    } else {
        // Si queda un solo carácter, ponemos '0'
        display.textContent = '0';
    }
});
// Event listener para el teclado

document.addEventListener('keydown', function (e) {
    const key = e.key;

    // Números del 0 al 9
    if (key >= '0' && key <= '9') {
        if (display.textContent === '0' || resetDisplay) {
            display.textContent = '';
            resetDisplay = false;
        }
        display.textContent += key;
        return;
    }

    // Operadores
    if (['+', '-', '*', '/'].includes(key)) {
        if (operator && resetDisplay) {
            operator = key; // Cambiamos operador si se pulsa otro sin número
            return;
        }
        if (!operator) {
            firstNumber = parseDisplay();
        } else if (!resetDisplay) {
            secondNumber = parseDisplay();
            const result = operate(firstNumber, operator, secondNumber);
            display.textContent = result;
            firstNumber = result;
        }
        operator = key;
        resetDisplay = true;
        return;
    }

    // Igual (Enter o =)
    if (key === 'Enter' || key === '=') {
        if (!operator) return;
        secondNumber = parseDisplay();
        let result = operate(firstNumber, operator, secondNumber);
        result = typeof result === 'number' ? roundResult(result) : result;
        display.textContent = result;
        firstNumber = result;
        operator = '';
        resetDisplay = true;
        return;
    }

    // Punto decimal
    if (key === '.') {
        if (resetDisplay) {
            display.textContent = '0.';
            resetDisplay = false;
            return;
        }
        if (!display.textContent.includes('.')) {
            display.textContent += '.';
        }
        return;
    }

    // Retroceso (Backspace)
    if (key === 'Backspace') {
        if (resetDisplay) {
            display.textContent = '0';
            resetDisplay = false;
            return;
        }
        if (display.textContent.length > 1) {
            display.textContent = display.textContent.slice(0, -1);
        } else {
            display.textContent = '0';
        }
        return;
    }

    // Limpiar (Delete)
    if (key === 'Delete') {
        display.textContent = '0';
        firstNumber = '';
        secondNumber = '';
        operator = '';
        resetDisplay = false;
        return;
    }
});


