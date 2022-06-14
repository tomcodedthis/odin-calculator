// Global Variables

const numberBtns = document.querySelectorAll('.number');
const operatorBtns = document.querySelectorAll('.operator');
const resultText = document.getElementById('result-text');

let resultArray = [];
let resultA = 0;
let resultB = 0;
let operator = '';
let opOn = false;

// Keyboard input

window.onkeydown = keyPress;

function keyPress(e) {

    if (e.code === 'Space') {       // Avoids NaN error
        
        return

    }

    if (e.key == 0 || e.key == 1 || e.key == 2 || e.key == 3 || e.key == 4 
        || e.key == 5 || e.key == 6 || e.key == 7 || e.key == 8 || e.key == 9) {        // Press's number button on number keydown

        document.getElementById(`${e.key}`).click();

    } else if (e.key == 'Enter' || e.key == 'Backspace' || e.key == '+' 
        || e.key == '-' || e.key == '*' || e.key ==  '/') {     // Press's operator button on operator keydown

        document.getElementById(`${e.key}`).click();

    } else {

        return

    }
}

// Number input

numberBtns.forEach(btn => btn.addEventListener('click', numberInput));

function numberInput(e) {

    let number = e.target.innerText;

    highlightBtn(e);

    resultArray.push(number);
    resultA = parseInt(resultArray.join(''));

    resultText.innerText = resultA;
    resultText.style.animationName = 'none';

}

// Operator input

operatorBtns.forEach(btn => btn.addEventListener('click', runFunction));

function runFunction(e) {

    target = e.target.id;

    highlightBtn(e);

    if (resultB == 0 || resultB == 'infinity') {        // Avoids small bugs

        resultB = resultA;

    }

    if (target == 'Backspace') {       // Resets the calc

        resultB = 0;
        opOn = false;

        resultText.innerText = '|';
        resultText.style.animationName = 'resultsBlink';

    } else if (target == 'Enter') {     // Returns the formula

        if (operator == '+') {

            resultB = add(resultA, resultB);

        } else if (operator == '-') {

            resultB = subtract(resultA, resultB);

        } else if (operator == '*') {

            resultB = multiply(resultA, resultB);
            
        } else if (operator == '/') {

            resultB = divide(resultA, resultB);

            if (resultA == 0) {

                resultB = 'infinity';
            
            }

        } else {

            return
        
        }

        resultText.innerText = resultB;
        operator = '';
        opOn = false;

    } else if (target == '+') {      // Add

        if (opOn) {       // Runs previous function first

            document.getElementById(`Enter`).click();
    
        }

        operator = '+';
        opOn = true;

    } else if (target == '-') {        // Subtract

        if (opOn) {       // Runs previous function first

            document.getElementById(`Enter`).click();
    
        }

        operator = '-';
        opOn = true;

    } else if (target == '*') {        // Multiply

        if (opOn) {       // Runs previous function first

            document.getElementById(`Enter`).click();
    
        }

        operator = '*';
        opOn = true;

    } else if (target == '/') {        // Divide

        if (opOn) {       // Runs previous function first

            document.getElementById(`Enter`).click();
    
        }

        operator = '/';
        opOn = true;

    } else {

        if (resultB == 0) {
            
            return

        } else {

            resultText.innerText = resultB;

        }

    }

    resultA = 0;
    resultArray = [];

}

// Math functions

function add(resultA, resultB) {

    resultB += resultA;

    return resultB

}

function subtract(resultA, resultB) {

    if (resultB == 0) {     // Stops minus numbers

        resultB = resultA;

    } else {

        resultB -= resultA;

    }

    return resultB

}

function multiply(resultA, resultB) {

    if (resultB == 0) {

        resultB = resultA;

    } else if (resultA == 0) {

        resultB = 0;

    } else {

        resultB *= resultA;

    }

    return resultB

}

function divide(resultA, resultB) {

    if (resultB == 0) {

        resultB = resultA;

    } else if (resultA == 0) {

        resultB = 0;       

    } else {

        resultB /= resultA;

    }

    return resultB

}

// Global style functions

function highlightBtn(e) {

    e.target.style.backgroundColor = 'var(--black)';

    setTimeout(() => {      // Resets to original stlye

        e.target.style.backgroundColor = '';
    
    }, 200);

}