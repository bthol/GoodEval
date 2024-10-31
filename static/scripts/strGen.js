console.log('String Generator Script Loaded.');

// Development Plan
//  - in updateProblem function, create a new dom element for every character + correct layout
//  - editable problem (rather than entering it perfectly or clearing)
//      - add backspace button that removes last charater and updates
//  - Semenatic colorization for parenthesis to ensure equal number of opening and closing
//      - reden opening parens starting from last to indicate the need for closing parens
//  - 

// Display
const Q = document.querySelector('#screen-content');
const A = document.querySelector('#screen-answer');

// Data Strcutures
let input = {
    'problem': '',
    'use_logs': '0', // 1 activates logs && 0 deactivates logs
}

let problem = [];

function updateProblem(problem) {
    Q.innerHTML = '';
    let string = '';
    for (let i = 0; i < problem.length; i++) {
        string += problem[i];
        const div = document.createElement('div');
        div.innerText = problem[i];
        Q.appendChild(div);
    }
    input.problem = string;
};

// string validation
let formatError = {};
function invalidFormatError() {
    Q.innerText = 'Error: invalid format';
    clearTimeout(formatError);
    formatError = setTimeout(() => {
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
    //  - equal number of opening and closing parenthesis
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
    console.log('debounced');
    clearTimeout(debounceCache);
    debounceCache = setTimeout(() => {
        clearTimeout(debounceCache);
        funct();
    }, deference)
};

async function evaluate() {
    console.log(input);
    if (validStringStructure(input.problem)) {
        console.log('requested evaluation');
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
                problem.push('0');
                updateProblem(problem);
            } else if (id === 'btn-num1') {
                console.log(1);
                problem.push('1');
                updateProblem(problem);
            } else if (id === 'btn-num2') {
                console.log(2);
                problem.push('2');
                updateProblem(problem);
            } else if (id === 'btn-num3') {
                console.log(3);
                problem.push('3');
                updateProblem(problem);
            } else if (id === 'btn-num4') {
                console.log(4);
                problem.push('4');
                updateProblem(problem);
            } else if (id === 'btn-num5') {
                console.log(5);
                problem.push('5');
                updateProblem(problem);
            } else if (id === 'btn-num6') {
                console.log(6);
                problem.push('6');
                updateProblem(problem);
            } else if (id === 'btn-num7') {
                console.log(7);
                problem.push('7');
                updateProblem(problem);
            } else if (id === 'btn-num8') {
                console.log(8);
                problem.push('8');
                updateProblem(problem);
            } else if (id === 'btn-num9') {
                console.log(9);
                problem.push('9');
                updateProblem(problem);
            } else if (id === 'btn-pi') {
                console.log('π');
                problem.push('π');
                updateProblem(problem);
            } else if (id === 'btn-euler') {
                console.log("euler's number");
                problem.push('e');
                updateProblem(problem);
            }

        } else if (type === 'operation') {
            if (id === 'btn-plus') {
                console.log('plus');
                if (validOp(input.problem)) {
                    problem.push('+');
                    updateProblem(problem);
                } else {
                    invalidFormatError();
                }
            } else if (id === 'btn-minus') {
                console.log('minus');
                if (validOp(input.problem)) {
                    problem.push('-');
                    updateProblem(problem);
                } else {
                    invalidFormatError();
                }
            } else if (id === 'btn-multiply') {
                console.log('multiply');
                if (validOp(input.problem)) {
                    problem.push('*');
                    updateProblem(problem);
                } else {
                    invalidFormatError();
                }
            } else if (id === 'btn-divide') {
                console.log('divide');
                if (validOp(input.problem)) {
                    problem.push('/');
                    updateProblem(problem);
                } else {
                    invalidFormatError();
                }
            } else if (id === 'btn-sign') {
                console.log('sign');
                    problem.push('(-');
                    updateProblem(problem);
            } else if (id === 'btn-squared') {
                console.log('squared');
                if (validOp(input.problem)) {
                    problem.push('^2');
                    updateProblem(problem);
                } else {
                    invalidFormatError();
                }
            } else if (id === 'btn-power') {
                console.log('power');
                if (validOp(input.problem)) {
                    problem.push('^(');
                    updateProblem(problem);
                } else {
                    invalidFormatError();
                }
            } else if (id === 'btn-root') {
                console.log('square root');
                problem.push('√(');
                updateProblem(problem);
            } else if (id === 'btn-absolute-value') {
                console.log('absolute value');
                problem.push('abs(');
                updateProblem(problem);
            }

        } else if (type === 'trigonomic') {
            if (id === 'btn-sine') {
                console.log('sine');
                problem.push('sin(');
                updateProblem(problem);
            } else if (id === 'btn-cosine') {
                console.log('cosine');
                problem.push('cos(');
                updateProblem(problem);
            } else if (id === 'btn-tangent') {
                console.log('tangent');
                problem.push('tan(');
                updateProblem(problem);
            } else if (id === 'btn-secant') {
                console.log('secant');
                problem.push('sec(');
                updateProblem(problem);
            } else if (id === 'btn-cosecant') {
                console.log('cosecant');
                problem.push('csc(');
                updateProblem(problem);
            } else if (id === 'btn-cotangent') {
                console.log('cotangent');
                problem.push('cot(');
                updateProblem(problem);
            }

        } else if (type === 'special') {
            if (id === 'btn-clear') {
                console.log('clear');
                problem = [];
                updateProblem(problem);
            } else if (id === 'btn-equals') {
                debounce(evaluate, 1000);
            } else if (id === 'btn-decimal') {
                console.log('decimal');
                if (isNaN(problem[problem.length - 1])) {
                    problem.push('0.')
                } else {
                    problem.push('.');
                }
                updateProblem(problem);
            } else if (id === 'btn-paren-open') {
                problem.push('(');
                updateProblem(problem);
            } else if (id === 'btn-paren-close') {
                problem.push(')');
                updateProblem(problem);
            }
        }
    }
});
