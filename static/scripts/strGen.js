console.log('String Generator Script Loaded.');

// Display
const Q = document.querySelector('#screen-content');
const A = document.querySelector('#screen-answer');

// Q.innerText = 'sd[[sin(100+4*((-26)+1))],1]+0.5';
Q.innerText = '';
A.innerText = '';

// object
let input = {
    'problem': '',
    'use_logs': '0',
}

// booleans for input testing
let value = false;
let operation = false;

// general purpose debounce
let debounceCache = {};
function debounce(funct, deference) {
    console.log("debounced");
    clearTimeout(debounceCache);
    debounceCache = setTimeout(() => {
        clearTimeout(debounceCache);
        funct();
    }, deference)
};

function evaluate() {
    console.log("requested evaluation");
    console.log(input);
};

// User Interface Control
const btns = document.querySelector('.btns');
btns.addEventListener('click', (e) => {
    // single listener on wrap element for event delegation
    if (e.target.classList[0] !== 'top-button-container' && e.target.classList[0] !== 'bottom-button-container') {
        // exclude the container elements
        const type = e.target.classList[0];
        const id = e.target.id;
        
        // reduce number of tests by testing types
        // tested from largest to smallest number of members in type
        // member ids tested from most to least estimated frequency of usage
        if (type === 'numpad') {
            if (id === 'btn-num0') {
                console.log(0);
                input.problem += '0';
                Q.innerText = input.problem;
            } else if (id === 'btn-num1') {
                console.log(1);
                input.problem += '1';
                Q.innerText = input.problem;
            } else if (id === 'btn-num2') {
                console.log(2);
                input.problem += '2';
                Q.innerText = input.problem;
            } else if (id === 'btn-num3') {
                console.log(3);
                input.problem += '3';
                Q.innerText = input.problem;
            } else if (id === 'btn-num4') {
                console.log(4);
                input.problem += '4';
                Q.innerText = input.problem;
            } else if (id === 'btn-num5') {
                console.log(5);
                input.problem += '5';
                Q.innerText = input.problem;
            } else if (id === 'btn-num6') {
                console.log(6);
                input.problem += '6';
                Q.innerText = input.problem;
            } else if (id === 'btn-num7') {
                console.log(7);
                input.problem += '7';
                Q.innerText = input.problem;
            } else if (id === 'btn-num8') {
                console.log(8);
                input.problem += '8';
                Q.innerText = input.problem;
            } else if (id === 'btn-num9') {
                console.log(9);
                input.problem += '9';
                Q.innerText = input.problem;
            } else if (id === 'btn-pi') {
                console.log('pi');
                input.problem += 'pi';
                Q.innerText = input.problem;
            } else if (id === 'btn-euler') {
                console.log('euler');
                input.problem += 'e';
                Q.innerText = input.problem;
            }

        } else if (type === 'operation') {
            if (id === 'btn-plus') {
                console.log('plus');
                input.problem += '+';
                Q.innerText = input.problem;
            } else if (id === 'btn-minus') {
                console.log('minus');
                input.problem += '-';
                Q.innerText = input.problem;
            } else if (id === 'btn-multiply') {
                console.log('multiply');
                input.problem += '*';
                Q.innerText = input.problem;
            } else if (id === 'btn-divide') {
                console.log('divide');
                input.problem += '/';
                Q.innerText = input.problem;
            } else if (id === 'btn-sign') {
                console.log('sign');
                input.problem += '-(';
                Q.innerText = input.problem;
            } else if (id === 'btn-squared') {
                console.log('squared');
                input.problem += '^2';
                Q.innerText = input.problem;
            } else if (id === 'btn-cubed') {
                console.log('cubed');
                input.problem += '^3';
                Q.innerText = input.problem;
            } else if (id === 'btn-root') {
                console.log('square root');
                input.problem += '√(';
                Q.innerText = input.problem;
            } else if (id === 'btn-absolute-value') {
                console.log('absolute value');
                input.problem += 'abs(';
                Q.innerText = input.problem;
            }

        } else if (type === 'trigonomic') {
            if (id === 'btn-sine') {
                console.log('sine');
                input.problem += 'sin(';
                Q.innerText = input.problem;
            } else if (id === 'btn-cosine') {
                console.log('cosine');
                input.problem += 'cos(';
                Q.innerText = input.problem;
            } else if (id === 'btn-tangent') {
                console.log('tangent');
                input.problem += 'tan(';
                Q.innerText = input.problem;
            } else if (id === 'btn-secant') {
                console.log('secant');
                input.problem += 'sec(';
                Q.innerText = input.problem;
            } else if (id === 'cosecant') {
                console.log('cosecant');
                input.problem += 'csc(';
                Q.innerText = input.problem;
            } else if (id === 'cotangent') {
                console.log('cotangent');
                input.problem += 'cot(';
                Q.innerText = input.problem;
            }

        } else if (type === 'special') {
            if (id === 'btn-clear') {
                console.log('clear');
                input.problem = ''
                Q.innerText = '';
            } else if (id === 'btn-equals') {
                debounce(evaluate, 1000);
            } else if (id === 'btn-decimal') {
                console.log('decimal');
                input.problem += '.';
                Q.innerText = input.problem;
            }
        }
    }
});
