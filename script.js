// Global Variables

const numberBtns = document.querySelectorAll('.number');
const operatorBtns = document.querySelectorAll('.operator');
const resultText = document.getElementById('result-text');

let resultArray = [];
let resultA = 0;
let resultB = 0;

let addOn = false;
let subtractOn = false;
let multiplyOn = false;
let divideOn = false;

// Keyboard shortcut inputs

window.onkeydown = keyInput;

function keyInput(e) {

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

numberBtns.forEach(btn => btn.addEventListener('click', enterNumber));

function enterNumber(e) {

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

    if (target == 'Backspace') {       // Resets the calc

        turnOffVar();
        resultB = 0;

        resultText.innerText = '|';
        resultText.style.animationName = 'resultsBlink';

    } else if (target == '+' || target == 'Enter' && addOn) {      // Add

        turnOffVar();
        addOn = true;

        resultB += resultA;
        resultText.innerText = resultB;

    } else if (target == '-' || target == 'Enter' && subtractOn) {        // Subtract

        turnOffVar();
        subtractOn = true;

        if (resultB == 0) {     // Stops minus numbers

            resultB = resultA;
            resultText.innerText = resultA;

        } else {

            resultB -= resultA;
            resultText.innerText = resultB;

        }

    } else if (target == '*' || target == 'Enter' && multiplyOn) {        // Multiply

        turnOffVar();
        multiplyOn = true;

        if (resultB == 0) {

            resultB = resultA;
            resultText.innerText = resultA;

        } else if (resultA == 0) {

            resultText.innerText = resultB;            

        } else {

            resultB *= resultA;
            resultText.innerText = resultB;

        }

    } else if (target == '/' || target == 'Enter' && divideOn) {        // Divide

        turnOffVar();
        divideOn = true;
        
        if (resultB == 0) {

            resultB = resultA;
            resultText.innerText = resultA;

        } else if (resultA == 0) {

            resultText.innerText = resultB;            

        } else {

            resultB /= resultA;
            resultText.innerText = resultB;

        }

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

// Global functions

function turnOffVar() {

    addOn = false;
    subtractOn = false;
    multiplyOn = false;
    divideOn = false;

}

// Global style functions

function highlightBtn(e) {

    e.target.style.backgroundColor = 'var(--black)';

    setTimeout(() => {

        e.target.style.backgroundColor = 'var(--dark-grey)';
    
    }, 200);

}