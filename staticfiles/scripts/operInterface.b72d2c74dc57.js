console.log('Interface script loaded');

// arithmetic operators
function addition(a,b) {
    return a + b;
};

function subtraction(a,b) {
    return a - b;
};

function multiplication(a,b) {
    return a * b;
};

function division(a,b) {
    return a / b;
};

function exponentiation(a,b) {
    return Math.pow(a,b);
};

function radication(a,b) {
    return Math.pow(a,1/b);
};

// generalizes superoperation for operators with identity elements
function spropr(a, b, op, id) {
    // a = operand 1 = number operated on
    // b = operand 2 = number of operations
    // op = binary operator = function for operation
    // id = identity for operation
    // e.g.
    //  - additive identity = 0; x + 0 = x
    //  - multiplicative identity = 1; x * 1 = x
    let y = id;
    for (let i = 0; i < b; i++) {
        y = op(a, y);
    }
    return y;
};

document.querySelector('#operate-button').addEventListener('click', (event) => {
    // runs on operate button click
    event.preventDefault();

    // get operator type from select element
    const operatorType = document.querySelector('#operator-type').value;

    // get arguments
    const a = Number(document.querySelector('#variable-a').value);
    const b = Number(document.querySelector('#variable-b').value);

    // calculate answer
    let answer = 0;
    if (operatorType === 'addition') {
        answer = addition(a,b);
    } else if (operatorType === 'subtraction') {
        answer = subtraction(a,b);
    } else if (operatorType === 'multiplication') {
        answer = multiplication(a,b);
    } else if (operatorType === 'division') {
        answer = division(a,b);
    } else if (operatorType === 'exponentiation') {
        answer =exponentiation(a,b);
    } else if (operatorType === 'radication') {
        answer = radication(a,b);
    } else if (operatorType === 'superaddition') {
        answer = spropr(a,b,addition,0);
    } else if (operatorType === 'supersubtraction') {
        answer = spropr(a,b,subtraction,0);
    } else if (operatorType === 'supermultiplication') {
        answer = spropr(a,b,multiplication,1);
    } else if (operatorType === 'superdivision') {
        answer = spropr(a,b,division,1);
    } else if (operatorType === 'superexponentiation') {
        answer = spropr(a,b,exponentiation,1);
    } else if (operatorType === 'superradication') {
        answer = spropr(a,b,radication,1);
    }

    // display answer
    document.querySelector('#answer-field').innerText = `${answer}`;
});