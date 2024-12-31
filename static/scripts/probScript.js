console.log('Problem Script Loaded.');

// Development Plan
//  - conditionally declare key functions by key module in evaluator_file.py
//  - add shift and alpha buttons for alternate button functionality:
//  - design sign button to wrap current value or display error (especially multidigit values)

// Display
const T = document.querySelector('#screen-toggles');
const Q = document.querySelector('#screen-content');
const A = document.querySelector('#screen-answer');


// Object literal for evaluation request
let input = {
    'problem': '',
    'use_logs': '0', // 1 activates logs && 0 deactivates logs
}

// char structure for problem
let problem = [];

// Mode toggles
let shiftMode= false;
let cursorMode = false;
let cursorModeToggled = false; // prevents defaulting on nav

// Global Indexes
let cursorIdx = 0;

// Caches
let formatErrorCache = {};
let cursorModeCache = {};

// key function info
const info = [
    {key: "sin", funct: (x) => Math.sin(x)},
    {key: "cos", funct: (x) => Math.cos(x)},
    {key: "tan", funct: (x) => Math.tan(x)},
    {key: "sec", funct: (x) => Math.sec(x)},
    {key: "csc", funct: (x) => Math.csc(x)},
    {key: "cot", funct: (x) => Math.cot(x)},
];

function updateProblem(problem, type = null) {
    // clear problem in display
    Q.innerHTML = '';
    let string = '';
    for (let i = 0; i < problem.length; i++) {
        // compile string
        string += problem[i];
        // build element
        const div = document.createElement('div');
        div.innerText = problem[i];
        // lay element
        Q.appendChild(div);
    }
    input.problem = string;
    cursorDefault(type);
};

function updateAnswer(problem) {
    // clear answer in display
    A.innerHTML = '';
    // compile string
    let string = '';
    for (let i = 0; i < problem.length; i++) {
        string += problem[i];
    }
    // build element
    const div = document.createElement('div');
    div.innerText = string;
    // lay element
    A.appendChild(div);
}

function updateToggleDisplay() {
    if (shiftMode && cursorMode) { // shift + cursor
        T.querySelector('.shift-mode').innerText = 'shift';
        T.querySelector('.cursor-mode').innerText = 'cursor';
    } else if (shiftMode && !cursorMode) {  // shift
        T.querySelector('.shift-mode').innerText = 'shift';
        T.querySelector('.cursor-mode').innerText = '';
    } else if (!shiftMode && cursorMode) {  // cursor
        T.querySelector('.shift-mode').innerText = '';
        T.querySelector('.cursor-mode').innerText = 'cursor';
    } else {                                // neither
        T.querySelector('.shift-mode').innerText = '';
        T.querySelector('.cursor-mode').innerText = '';
    }
};

// Cursor Mode Toggles
function cursorDefault(type = null) {
    // default cursor position to end
    if (cursorMode === false || type !== 'cursor') {
        cursorIdx = problem.length - 1;
    }
};

function cursorContinue() {
    // creates a 10 second timeout for cursor mode
    // called by cursor nav buttons
    // bypass if cursor mode activated through toggle
    if (!cursorModeToggled) {
        cursorMode = true;
        updateToggleDisplay();
        clearTimeout(cursorModeCache);
        cursorModeCache = setTimeout(() => {
            // discontinue cursor mode
            console.log("cursor mode discontinued");
            cursorMode = false;
            updateToggleDisplay();
            cursorDefault();
        }, 10000); // 10 second timeout
    }
};

function toggleCursorMode() {
    cursorMode = !cursorMode;
    cursorModeToggled = cursorMode;
    if (!cursorMode) {
        // discontinue cursor mode
        clearTimeout(cursorModeCache);
    }
    updateToggleDisplay();
};

// Cursor Mode Navigation
function cursorBack() {
    const len = problem.length;
    if (len > 0 && cursorIdx - 1 > -1) {
        cursorIdx -= 1;
    }
    console.log(cursorIdx);
};

function cursorForward() {
    const len = problem.length;
    if (len > 0 && cursorIdx + 1 < len) {
        cursorIdx += 1;
    }
    console.log(cursorIdx);
};

function backspace(problem) {
    const len = problem.length;
    if (len > 0) {
        problem = problem.splice(cursorIdx, 1);
        cursorIdx -= 1;
    }
};

// Shift Mode Toggles
function toggleShiftMode() {
    shiftMode = !shiftMode;
    updateToggleDisplay();
};

function getIdx(key, problemStructure) {
    // returns index of key in problem structure
    for (let i = 0; i < problemStructure.length; i++) {
        if (problemStructure[i] === key) {
            return i;
        }
    }
    return false;
};

// structuring
function restructure(solution, start, end, problemStructure) {
    let before = [];
    for (let i = 0; i < start; i++) {
        before.push(problemStructure[i])
    }
    let after = [];
    for (let i = end + 1; i < problemStructure.length; i++) {
        after.push(problemStructure[i])
    }
    if (typeof solution === 'string') {
        before.push(solution);
        return before.concat(after);
    } else if (typeof solution === 'number') {
        before.push(`${solution}`);
        return before.concat(after);
    } else {
        return before.concat(solution).concat(after);
    }
};

function structureKey(key, problem) {
    // searches for and restructures key in problem
    let struct = problem;

    // store key length
    const keyLen = key.length;

    // structure key
    let keyStruct = [];
    for (let i = 0; i < keyLen; i++) {
        keyStruct.push(key.slice(i, i + 1));
    }

    // search for match
    let x = 0; // limit to prevent infinite loop/memory overloading
    let searching = true; // boolean switch to manually turn off loop before limit
    while (x < 4 && searching == true) {
        // each key search (loops if key match is found)
        x += 1;
        // get current struct length (restructure in previous key search changes length)
        const structLen = struct.length;
        // initialize match variable to true
        let match = true;
        // structLen - keyLen = last starting index for key in struct before key length exceeds remaining struct
        for (let i = 0; i < structLen - keyLen; i++) {
            // test first character match + length of key relative to remaining structure + last character match
            if (struct[i] === keyStruct[0] && i + keyLen - 1 < structLen && struct[i + keyLen - 1] === keyStruct[keyLen - 1]) {
                // match letter for letter
                for (let j = 0; j < keyStruct.length; j++) {
                    if (keyStruct[j] !== struct[i + j]) {
                        // letter didn't match
                        match = false;
                        break;
                    }
                }
                if (match) {
                    // matches letter for letter
                    struct = restructure(key, i, i + keyLen, struct);
                    break;
                } else {
                    // reinitialize match variable for next match test
                    match = true;
                }
            }
            if (i === structLen - keyLen - 1) {
                // if no match at last test
                match = false;
            }
        }
        if (!match) {
            searching = false;
        }
    }
    return struct;
};

function structureString(problem) {
    // emulates backend string structuring algorithm
    let struct = [];
    let buffer = "";
    try {
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
                                if (buffer.length > 0) {
                                    struct.push(buffer);
                                    buffer = "";
                                }
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
    } catch (error) {
        console.log(error);
    }
    // structure keys
    for (i = 0; i < info.length; i++) {
        struct = structureKey(info[i].key, struct);
    }
    console.log(struct);
    return struct;
};

// key functions
function keyFunction(key, funct, problem) {
    // generalizes single argument key functions
    let prob = problem;
    let idx = getIdx(key, prob);
    let x = 0;
    while (x < 100 && idx !== false) {
        x += 1;
        const solution = funct(Number(problem[idx + 1]));
        prob = restructure(solution, idx, idx + 1, prob);
        idx = getIdx(key, prob);
    }
    return prob;
};

function runKeyFunctions(problem) {
    // runs all key functions
    prob = problem;
    for (let i = 0; i < info.length; i++) {
        prob = keyFunction(info[i].key, info[i].funct, prob);
    }
    return prob;
};

// calculation
function calculate(problem) {
    // parameters
    const max = 5;
    // performs arithmetic operations on problem structure
    prob = problem;
    // perform all Multiplications and Divisions as they appear from left to right
    let mIdx = getIdx("*", prob);
    let dIdx = getIdx("/", prob);
    count = 0;
    while (count < max && mIdx !== false || count <max && dIdx !== false) {
        count += 1;
        if (dIdx === false && mIdx !== false) {
            // only multiplication
            const multiplier = Number(prob[mIdx - 1]);
            const mulitplicand = Number(prob[mIdx + 1]);
            const product = multiplier * mulitplicand;
            prob = restructure(product, mIdx - 1, mIdx + 1, prob);
            mIdx = getIdx("*", prob);
        } else if (mIdx === false && dIdx !== false) {
            // only division
            const dividend = Number(prob[dIdx - 1]);
            const divisor = Number(prob[dIdx + 1]);
            const quotient = dividend / divisor;
            prob = restructure(quotient, dIdx - 1, dIdx + 1, prob);
            dIdx = getIdx("/", prob);
        } else if (mIdx !== false && dIdx !== false && mIdx < dIdx) {
            // multiply
            const multiplier = Number(prob[mIdx - 1]);
            const mulitplicand = Number(prob[mIdx + 1]);
            const product = multiplier * mulitplicand;
            prob = restructure(product, mIdx - 1, mIdx + 1, prob);
            mIdx = getIdx("*", prob);
            // then divide
            const dividend = Number(prob[dIdx - 1]);
            const divisor = Number(prob[dIdx + 1]);
            const quotient = dividend / divisor;
            prob = restructure(quotient, dIdx - 1, dIdx + 1, prob);
            dIdx = getIdx("/", prob);
        } else if (mIdx !== false && dIdx !== false && mIdx > dIdx) {
            // divide
            const dividend = Number(prob[dIdx - 1]);
            const divisor = Number(prob[dIdx + 1]);
            const quotient = dividend / divisor;
            prob = restructure(quotient, dIdx - 1, dIdx + 1, prob);
            dIdx = getIdx("/", prob);
            // then multiply
            const multiplier = Number(prob[mIdx - 1]);
            const mulitplicand = Number(prob[mIdx + 1]);
            const product = multiplier * mulitplicand;
            prob = restructure(product, mIdx - 1, mIdx + 1, prob);
            mIdx = getIdx("*", prob);
        }
    }
    
    // perform all Additions and Subtractions as they appear from left to right
    let aIdx = getIdx("+", prob);
    let sIdx = getIdx("-", prob);
    count = 0;
    while (count < max && aIdx !== false || count < max && sIdx !== false) {
        count += 1;
        if (sIdx === false && aIdx !== false) {
            // only addition
            const augend = Number(prob[aIdx - 1]);
            const addend = Number(prob[aIdx + 1]);
            const total = augend + addend;
            prob = restructure(total, aIdx - 1, aIdx + 1, prob);
            aIdx = getIdx("+", prob);
        } else if (aIdx === false && sIdx !== false) {
            // only subtraction
            const minuend = Number(prob[sIdx - 1]);
            const subtrahend = Number(prob[sIdx + 1]);
            const difference = minuend - subtrahend;
            prob = restructure(difference, sIdx - 1, sIdx + 1, prob);
            sIdx = getIdx("-", prob);
        } else if (aIdx !== false && sIdx !== false && aIdx < sIdx) {
            // add
            const augend = Number(prob[aIdx - 1]);
            const addend = Number(prob[aIdx + 1]);
            const total = augend + addend;
            prob = restructure(total, aIdx - 1, aIdx + 1, prob);
            aIdx = getIdx("+", prob);
            // then subtract
            const minuend = Number(prob[sIdx - 1]);
            const subtrahend = Number(prob[sIdx + 1]);
            const difference = minuend - subtrahend;
            prob = restructure(difference, sIdx - 1, sIdx + 1, prob);
            sIdx = getIdx("-", prob);
        } else if (aIdx !== false && sIdx !== false && aIdx > sIdx) {
            // subtract
            const minuend = Number(prob[sIdx - 1]);
            const subtrahend = Number(prob[sIdx + 1]);
            const difference = minuend - subtrahend;
            prob = restructure(difference, sIdx - 1, sIdx + 1, prob);
            sIdx = getIdx("-", prob);
            // then add
            const augend = Number(prob[aIdx - 1]);
            const addend = Number(prob[aIdx + 1]);
            const total = augend + addend;
            prob = restructure(total, aIdx - 1, aIdx + 1, prob);
            aIdx = getIdx("+", prob);
        }
    }

    return prob;
};

// string validation
function customError(error) {
    Q.innerText = error;
    clearTimeout(formatErrorCache);
    formatErrorCache = setTimeout(() => {
        Q.innerText = input.problem;
        clearTimeout(formatErrorCache);
    }, 1300)
};

function validParens(problem) {
    // validates parenthesis in problem structure
    let nestLvl = 0;
    let parens = [];
    for (let i = 0; i < problem.length; i++) {
        if (problem[i] === '(') {
            parens.push('(');
            nestLvl += 1;
        } else if (problem[i] === ')') {
            parens.push(')');
            nestLvl -= 1;
        }
    }
    // if there are parenthesis
    if (parens.length > 0) {
        if (nestLvl !== 0) {
            // no non-zero sum of nestLvl
            return false;
        } else if (parens[0] === ')') {
            // no closing paren at start
            return false;
        } else if (parens[parens.length - 1] === '(') {
            // no opening paren at end
            return false;
        } else {
            // match each open paren to a closing paren (accounting for nesting)
            for (let i = 0; i < problem.length; i++) {
                if (problem[i] === '(') {
                    // search for match
                    let x = 0;
                    for (let j = i; j < problem.length; j++) {
                        if (problem[j] === ')') {
                            x -= 1;
                        } else if (problem[j] === "(") {
                            x += 1;
                        }
                        if (x === 0) {
                            break;
                        }
                    }
                    if (x !== 0) {
                        // missing match
                        return false;
                    }
                }
            }
        }
        return true;
    } else {
        // can't test parens format with no parens
        return true;
    }
};

function validProblem(problem) {
    // post-validates problem after structuring
    let validity = false;
    // validate string data
    if (problem.length < 1) {
        customError('Error: Empty string');
        return false;
    } else {
        // validate parenthesis
        validity = validParens(problem);
        if (validity === false) {
            customError('Error: Invalid parenthesis');
            return false;
        } else if (validity === true) {
            // add further validation here
            return true;
        }
    }
};

function validOp(problem) {
    // pre-validates that an operation can be added to the problem structure
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

function validQuant(problem) {
    // pre-validates that a quantity (or open parenthesis) can be added to the problem structure
    if (!isNaN(problem[problem.length - 1]) || problem[problem.length - 1] === 'pi' || problem[problem.length - 1] === 'euler') {
        customError('Error: requires operation');
        return false;
    } else {
        return true;
    }
};

// debounce evaluate requests
let debounceCache = {};
function debounce(funct, deference) {
    console.log('debounced');
    clearTimeout(debounceCache);
    debounceCache = setTimeout(() => {
        clearTimeout(debounceCache);
        funct();
    }, deference)
};

function evaluate() {
    // run on equal button click
    let problem = input.problem; // local problem variable; not global array
    // structure problem string into problem structure
    console.log('Structuring...');
    problem = structureString(problem);
    console.log('Structured. \n\nValidating...');
    if (validProblem(problem)) {
        console.log('Valid.\n\n Evaluating...');
        problem = runKeyFunctions(problem);
        problem = calculate(problem);
        console.log('Solved.');
        updateAnswer(problem);
    } else {
        console.log('Invalid.');
    }
};

// User Interface Control
const btns = document.querySelector('.btns');
// single listener on wrap element for event delegation
btns.addEventListener('click', (e) => {
    // exclude the container elements
    if (e.target.classList[0] !== 'top-button-container' && e.target.classList[0] !== 'bottom-button-container') {
        // get target info
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
                if (validQuant(problem)) {
                    problem.push('pi');
                    updateProblem(problem);
                }
            } else if (id === 'btn-euler') {
                console.log("euler's number");
                if (validQuant(problem)) {
                    problem.push('euler');
                    updateProblem(problem);
                }
            }

        } else if (type === 'operation') {
            if (id === 'btn-plus') {
                console.log('plus');
                if (validOp(input.problem)) {
                    problem.push('+');
                    updateProblem(problem);
                } else {
                    customError('Error: invalid operation');
                }
            } else if (id === 'btn-minus') {
                console.log('minus');
                if (validOp(input.problem)) {
                    problem.push('-');
                    updateProblem(problem);
                } else {
                    customError('Error: invalid operation');
                }
            } else if (id === 'btn-multiply') {
                console.log('multiply');
                if (validOp(input.problem)) {
                    problem.push('*');
                    updateProblem(problem);
                } else {
                    customError('Error: invalid operation');
                }
            } else if (id === 'btn-divide') {
                console.log('divide');
                if (validOp(input.problem)) {
                    problem.push('/');
                    updateProblem(problem);
                } else {
                    customError('Error: invalid operation');
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
                    customError('Error: invalid format');
                }
            } else if (id === 'btn-power') {
                console.log('power');
                if (validOp(input.problem)) {
                    problem.push('^(');
                    updateProblem(problem);
                } else {
                    customError('Error: invalid format');
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
                updateAnswer(problem);
                cursorDefault();
            } else if (id === 'btn-equals') {
                evaluate();
            } else if (id === 'btn-shift') {
                toggleShiftMode();
            } else if (id === 'btn-decimal') {
                console.log('decimal');
                if (isNaN(problem[problem.length - 1])) {
                    problem.push('0.')
                } else {
                    problem.push('.');
                }
                updateProblem(problem);
            } else if (id === 'btn-paren-open') {
                console.log('(');
                if (validQuant(problem)) {
                    problem.push('(');
                    updateProblem(problem);
                }
            } else if (id === 'btn-paren-close') {
                console.log(')');
                if (problem[problem.length - 1] === "(") {
                    // no parens without content between them
                    customError('Error: invalid format');
                } else if (problem.length - 2 > -1 && problem[problem.length - 2] === "(") {
                    // remove parens around single value
                    const value = problem[problem.length - 1];
                    problem.pop();
                    problem.pop();
                    problem.push(value);
                    updateProblem(problem);
                } else {
                    problem.push(')');
                    updateProblem(problem);
                }
            }

        } else if (type === 'cursor') {
            if (id === 'btn-backspace') {
                console.log('<—');
                cursorContinue();
                backspace(problem);
                updateProblem(problem, type);
            } else if (id === 'btn-cursor-mode') {
                console.log("cursor mode toggled");
                toggleCursorMode();
            } else if (id === 'btn-cursor-forward') {
                console.log('>');
                cursorContinue();
                cursorForward();
                updateProblem(problem, type);
            } else if (id === 'btn-cursor-backward') {
                console.log('<');
                cursorContinue();
                cursorBack();
                updateProblem(problem, type);
            }
        }
    }
});
