console.log('String Generator Script Loaded.');

// Display
const Q = document.querySelector('#screen-content');
const A = document.querySelector('#screen-answer');

// object
let input = {
    'problem': '',
    'use_logs': '0', // 1 activates logs && 0 deactivates logs
}

// string validation
let value = false;
let operation = false;

function invalidFormatError() {
    Q.innerText = "Error: invalid format";
    const c = setTimeout(() => {
        Q.innerText = input.problem;
    }, 1000)
};

function structureString(problem) {
    let struct = [];
    let buffer = "";
    for (let i = 0; i < problem.length; i++) {
        const char = problem.slice(i, i + 1);
        // skip spaces
        if (char === " ") {
            continue;
        } else {
            if (char === "." || !isNaN(char)) {
                buffer += char;
            } else {
                // handle negatives start
                if (char === "-" && struct[struct.length - 1] === "(") {
                    struct.pop();
                    buffer = char;
                } else if (char === ")") {
                    try {
                        if (Number(buffer) < 0) {
                            struct.push(buffer);
                            buffer = "";
                            // handle negatives end
                        } else {
                            struct.push(buffer);
                            buffer = "";
                            struct.push(char);
                        }
                    } catch {
                        if (buffer.length > 0) {
                            struct.push(buffer);
                        }
                        buffer = "";
                        struct.push(char);
                    }
                } else {
                    if (buffer.length > 0) {
                        struct.push(buffer);
                    }
                    buffer = "";
                    struct.push(char);
                }

            }
            // push buffer at end
            if (i === problem.length - 1 && buffer.length > 0) {
                struct.push(buffer);
            }
        }
    }
    console.log(struct);
    return struct;
};

function validStringStructure(problem) {
    // break string down by character
    let validity = true;
    const struct = structureString(problem);
    // test struct for validity
    // Invalid if:
    //  - 
    //  - 
    //  - 
    return validity;
};

function validOp(problem) {
    let validity = true;
    if (problem.length === 0) {
        validity = false;
    } else {
        const char = problem.slice(problem.length - 1, problem.length);
        if (isNaN(char) && char !== ")") {
            validity = false;
        }
    }
    return validity;
};

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

async function evaluate() {
    console.log(input);
    if (validString(input.problem)) {
        console.log("requested evaluation");
        // const response = await 
    }
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
                console.log('π');
                input.problem += 'π';
                Q.innerText = input.problem;
            } else if (id === 'btn-euler') {
                console.log("euler's number");
                input.problem += 'e';
                Q.innerText = input.problem;
            }

        } else if (type === 'operation') {
            if (id === 'btn-plus') {
                console.log('plus');
                if (validOp(input.problem)) {
                    input.problem += '+';
                    Q.innerText = input.problem;
                } else {
                    invalidFormatError();
                }
            } else if (id === 'btn-minus') {
                console.log('minus');
                if (validOp(input.problem)) {
                    input.problem += '-';
                    Q.innerText = input.problem;
                } else {
                    invalidFormatError();
                }
            } else if (id === 'btn-multiply') {
                console.log('multiply');
                if (validOp(input.problem)) {
                    input.problem += '*';
                    Q.innerText = input.problem;
                } else {
                    invalidFormatError();
                }
            } else if (id === 'btn-divide') {
                console.log('divide');
                if (validOp(input.problem)) {
                    input.problem += '/';
                    Q.innerText = input.problem;
                } else {
                    invalidFormatError();
                }
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
                if (validOp(input.problem)) {
                    input.problem += '√(';
                    Q.innerText = input.problem;
                } else {
                    invalidFormatError();
                }
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
                input.problem = '';
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
