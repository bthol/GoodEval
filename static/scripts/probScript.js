console.log('Problem Script Loaded.');

// Development Plan
//  - determine if validQuant can be refactored to only test for operations

//  - remove parenthesis around multidigit values

//  - develop interface for optionally displaying history

//  - key functions solve expressions before using solution as argument

//  - solve by section with new parenthesis function (based on algorithm in evaluator_fil.py)

//  - further design sign button functionality
//     - remove negation on already negated term
//     - wrap previous term in parens

// Display
const T = document.querySelector('#screen-toggles');
const Q = document.querySelector('#screen-content');
const A = document.querySelector('#screen-answer');

// shiftable buttons
const shiftBtn1 = document.querySelector('#btn-shift-1');
const shiftBtn2 = document.querySelector('#btn-shift-2');
const shiftBtn3 = document.querySelector('#btn-shift-3');
const shiftBtn4 = document.querySelector('#btn-shift-4');
const shiftBtn5 = document.querySelector('#btn-shift-5');
const shiftBtn6 = document.querySelector('#btn-shift-6');
const shiftBtn7 = document.querySelector('#btn-shift-7');


// Object literal for evaluation request
let input = {
    'problem': '',
    'use_logs': '0', // 1 activates logs && 0 deactivates logs
};

// question structures
let problem = [];
let answer = [];

// question history
let history = [];

// Mode toggles
let shiftMode = 0; // 0 value indicates default mode
let cursorMode = false;
let cursorModeToggled = false; // prevents defaulting on nav

// Global Indexes
let cursorIdx = 0;

// Caches
let formatErrorCache = {};
let cursorModeCache = {};

// key function info
const keyInfo = [
    {key: 'sin', funct: (x) => Math.sin(x)}, // sine
    {key: 'cos', funct: (x) => Math.cos(x)}, // cosine
    {key: 'tan', funct: (x) => Math.tan(x)}, // tangent
    {key: 'sec', funct: (x) => Math.sec(x)}, // secant
    {key: 'csc', funct: (x) => Math.csc(x)}, // cosecant
    {key: 'cot', funct: (x) => Math.cot(x)}, // cotangent
    {key: 'log', funct: (x) => Math.log(x)}, // logarithm
    {key: 'ln', funct: (x) => Math.ln(x)}, // natural logarithm
    {key: 'abs', funct: (x) => Math.abs(x)}, // absolute value
];

// special number info
const specialInfo = [
    {symbol: 'π', value: Math.PI}, // pi
    {symbol: 'τ', value: Math.PI * 2}, // tau
    {symbol: 'e', value: Math.E}, // Euler's number
];

// Shift Mode Toggles
function toggleShiftMode() {
    if (shiftMode !== 3) {
        shiftMode += 1;
    } else {
        shiftMode = 0;
    }
    updateToggleDisplay();
    if (shiftMode === 0) {
        // default
        shiftBtn1.innerText = 'sin';
        shiftBtn2.innerText = 'cos';
        shiftBtn3.innerText = 'tan';
        shiftBtn4.innerText = 'log';
        shiftBtn5.innerText = 'ln';
        shiftBtn6.innerText = '0';
        shiftBtn7.innerText = '0';
    } else if (shiftMode === 1) {
        // shift 1
        shiftBtn1.innerText = 'sec';
        shiftBtn2.innerText = 'csc';
        shiftBtn3.innerText = 'cot';
        shiftBtn4.innerHTML = 'log<sup>-1</sup>';
        shiftBtn5.innerHTML = 'ln<sup>-1</sup>';
        shiftBtn6.innerText = '1';
        shiftBtn7.innerText = '1';
    } else if (shiftMode === 2) {
        shiftBtn1.innerText = 'sec2';
        shiftBtn2.innerText = 'csc2';
        shiftBtn3.innerText = 'cot2';
        shiftBtn4.innerHTML = 'log<sup>-1</sup>2';
        shiftBtn5.innerHTML = 'ln<sup>-1</sup>2';
        shiftBtn6.innerText = '2';
        shiftBtn7.innerText = '2';
    } else if (shiftMode === 3) {
        shiftBtn1.innerText = 'sec3';
        shiftBtn2.innerText = 'csc3';
        shiftBtn3.innerText = 'cot3';
        shiftBtn4.innerHTML = 'log<sup>-1</sup>3';
        shiftBtn5.innerHTML = 'ln<sup>-1</sup>3';
        shiftBtn6.innerText = '3';
        shiftBtn7.innerText = '3';
    }
};

// Cursor Mode Toggles
function cursorDefault(cursor = null) {
    // default cursor position to end
    // prevents if cursor argument contains 'cursor' string
    if (cursorMode === false || cursor !== 'cursor') {
        cursorIdx = problem.length - 1;
    }
};

function cursorContinue() {
    // creates a 10 second timeout for cursor mode
    // called by cursor nav buttons
    // bypass if cursor mode activated through toggle
    if (!cursorModeToggled) {
        // start/continue cursor mode
        cursorMode = true;
        // update display
        updateToggleDisplay();
        // create timeout
        clearTimeout(cursorModeCache);
        cursorModeCache = setTimeout(() => {
            // discontinue cursor mode
            console.log("cursor mode discontinued");
            cursorMode = false;
            // update display
            updateProblem();
            updateToggleDisplay();
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
    if (problem.length > 0) {
        updateProblem();
    }
    updateToggleDisplay();
};

// Cursor Mode Navigation
function cursorBack() {
    cursorContinue();
    const len = problem.length;
    if (len > 0 && cursorIdx - 1 > -1) {
        cursorIdx -= 1;
        updateProblem('cursor');
    }
    console.log(cursorIdx);
};

function cursorForward() {
    cursorContinue();
    const len = problem.length;
    if (len > 0 && cursorIdx + 1 < len) {
        cursorIdx += 1;
        updateProblem('cursor');
    }
    console.log(cursorIdx);
};

function backspace() {
    if (problem.length > 0) {
        if (!cursorMode) {
            // default
            problem.splice(problem.length - 1, 1);
            cursorIdx = problem.length - 1;
            updateProblem();
        } else {
            // cursor mode
            if (cursorIdx === 0) {
                // first index
                problem.shift();
                updateProblem('cursor');
            } else {
                if (cursorIdx === problem.length - 1) {
                    // last index
                    problem.pop();
                    cursorBack();
                } else {
                    // middle index
                    problem.splice(cursorIdx, 1);
                    cursorBack();
                }
            }
        }
    }
};

// Structuring
function insert(char) {
    console.log(char);
    if (!cursorMode) {
        // defaultly inserts at end of problem
        problem.push(char);
        updateProblem();
    } else {
        // in cursor mode, inserts at cursor index
        if (problem.length > 0) {
            // non-empty problem structure
            if (cursorIdx === 0) {
                problem.unshift(char);
            } else {
                problem.splice(cursorIdx + 1, 0, char);
            }
        } else {
            // empty problem structure
            problem.push(char);
            updateProblem();
        }
        cursorForward();
    }
};

function restructure(solution, start, end, problem) {
    let before = [];
    for (let i = 0; i < start; i++) {
        before.push(problem[i])
    }
    let after = [];
    for (let i = end + 1; i < problem.length; i++) {
        after.push(problem[i])
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

function getIdx(key, struct) {
    // returns index of key in iterable structure
    for (let i = 0; i < struct.length; i++) {
        if (struct[i] === key) {
            return i;
        }
    }
    return false;
};

function specialNumberValues() {
    // convert special number symbols to values for calculation in whole problem structure
    for (let i = 0; i < specialInfo.length; i++) {
        let idx = getIdx(specialInfo[i].symbol, answer);
        let itr = 0;
        while (itr < 100 && idx !== false) {
            answer = restructure(specialInfo[i].value, idx, idx + 1, answer);
            idx = getIdx(specialInfo[i].symbol, answer);
        }
    }
};

function structureString() {
    // emulates backend string structuring algorithm
    let struct = [];
    let buffer = "";
    try {
        for (let i = 0; i < problem.length; i++) {
            const char = problem.slice(i, i + 1)[0];
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
    
    console.log(struct);
    answer = struct;
};

// Key Functions
function keyFunction(key, funct) {
    // generalizes single argument key functions
    let idx = getIdx(key, answer);
    let x = 0;
    while (x < 100 && idx !== false) {
        x += 1;
        let solution;
        if (answer[idx + 1] === '(') {
            // expression argument
            let expression = [];
            let nest = 0;
            for (let i = idx + 1; i < answer.length; i++) {
                expression.push(answer[i]);
                if (answer[i] === '(') {
                    nest += 1;
                } else if (answer[i] === ')') {
                    nest -= 1;
                    if (nest === 0) {
                        break;
                    }
                }
            }
            console.log(expression);
        } else {
            // single argument
            solution = funct(Number(answer[idx + 1]));
        }
        answer = restructure(solution, idx, idx + 1, answer);
        idx = getIdx(key, answer);
    }
};

function runKeyFunctions() {
    // runs all key functions
    for (let i = 0; i < keyInfo.length; i++) {
        keyFunction(keyInfo[i].key, keyInfo[i].funct);
    }
};

// calculation
function calculate(prob) {
    // parameters
    const max = 5;
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
        updateProblem('cursor');
        clearTimeout(formatErrorCache);
    }, 1300)
};

function isEmptyProblem() {
    if (problem.length === 0) {
        customError('Error: Empty String');
        return true;
    } else {
        return false;
    }
};

function isKey(str) {
    // test for match of str with key property of keyInfo structure
    for (let i = 0; i < keyInfo.length; i++) {
        if (keyInfo[i].key === str) {
            return true;
        }
    }
    return false;
};

function isSpecial(str) {
    // test for match of str with symbol property of specialInfo structure
    for (let i = 0; i < specialInfo.length; i++) {
        if (specialInfo[i].symbol === str) {
            return true;
        }
    }
    return false;
};

function validOp() {
    // pre-validates that an operation can be added to the problem structure
    if (isEmptyProblem()) {
        // cannot operate on empty string
        return false;
    } else {
        // run validation
        if (!cursorMode) {
            // default
            const str = problem.slice(problem.length - 1, problem.length)[0];
            if (isNaN(str) && str !== ")" && !isSpecial(str)) {
                customError('Error: invalid operation');
                return false;
            }
        } else {
            // cursor mode
            const str = problem.slice(cursorIdx, cursorIdx + 1);
            if (isNaN(str) && str !== ")" && !isSpecial(str)) {
                customError('Error: invalid operation');
                return false;
            }
        }
    }
    return true;
};

function validQuant(key = false, special = false) {
    // pre-validates that a quantity (or open parenthesis character: '(' ) can be added to the problem structure
    if (problem.length === 0) {
        // nothing to validate
        return true;
    } else {
        // run validation
        if (!cursorMode) {
            // default mode
            if (!special) {
                // not special numbers
                if (!key) {
                    // regular numbers
                    console.log('pass');
                    const str = problem.slice(problem.length - 1, problem.length)[0];
                    if (!isSpecial(str)) {
                        // last str is not a special number
                        return true;
                    } else {
                        // last str is a special number
                        customError('Error: requires operation');
                        return false;
                    }
                } else {
                    // key function
                    const str = problem.slice(problem.length - 1, problem.length)[0];
                    if (isNaN(str)) {
                        // last str is not a number
                        if (!isSpecial(str)) {
                            // last str is not a special number
                            if (!isKey(str)) {
                                // last str is not key
                                return true;
                            } else {
                                // last str is key
                                customError('Error: requires operation');
                                return false;
                            }
                        } else {
                            // last str is a special number
                            customError('Error: requires operation');
                            return false;
                        }
                    } else {
                        // last str is a number
                        customError('Error: requires operation');
                        return false;
                    }
                }
            } else {
                // special numbers
                const str = problem.slice(problem.length - 1, problem.length)[0];
                if (isNaN(str)) {
                    // last str is not a number
                    if (!isSpecial(str)) {
                        // last str is not a special number
                        return true;
                    } else {
                        // last str is a special number
                        customError('Error: requires operation');
                        return false;
                    }
                } else {
                    // last str is a number
                    customError('Error: requires operation');
                    return false;
                }
            }
        } else {
            // cursor mode
            if (!special) {
                if (!key) {
                    // regular numbers
                    const str = problem.slice(cursorIdx, cursorIdx + 1)[0];
                    if (!isSpecial(str)) {
                        // str on cursor is not a special number
                        return true;
                    } else {
                        // str on cursor is special number
                        customError('Error: requires operation');
                        return false;
                    }
                } else {
                    // key function
                    const str = problem.slice(cursorIdx, cursorIdx + 1)[0];
                    if (isNaN(str)) {
                        // last str is not a number
                        if (!isSpecial(str)) {
                            // last str is not a special number
                            if (!isKey(str)) {
                                // last str is not key
                                return true;
                            } else {
                                // last str is key
                                customError('Error: requires operation');
                                return false;
                            }
                        } else {
                            // last str is a special number
                            customError('Error: requires operation');
                            return false;
                        }
                    } else {
                        // last str is a number
                        customError('Error: requires operation');
                        return false;
                    }
                }
            } else {
                // special numbers
                const str = problem.slice(cursorIdx, cursorIdx + 1)[0];
                if (isNaN(str)) {
                    // last str is not a number
                    if (!isSpecial(str)) {
                        // last str is not a special number
                        return true;
                    } else {
                        // last str is a special number
                        customError('Error: requires operation');
                        return false;
                    }
                } else {
                    // last str is a number
                    customError('Error: requires operation');
                    return false;
                }
            }
        }
    }
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
    if (!isEmptyProblem()) {
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

// display functions
function updateProblem(cursor = null) {
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
    cursorDefault(cursor);
    cursorHighlight();
};

function updateAnswer() {
    // clear answer in display
    A.innerHTML = '';
    // compile string
    let string = '';
    for (let i = 0; i < answer.length; i++) {
        string += answer[i];
    }
    // build element
    const div = document.createElement('div');
    div.innerText = string;
    // lay element
    A.appendChild(div);
};

function updateToggleDisplay() {
    // update cursor mode
    if (cursorMode) {
        T.querySelector('.cursor-mode').innerText = 'cursor';
    } else {
        T.querySelector('.cursor-mode').innerText = '';
    }
    // update shift mode
    if (shiftMode === 0) {
        T.querySelector('.shift-mode').innerText = '';
    } else if (shiftMode === 1) {
        T.querySelector('.shift-mode').innerText = 'shift1';
    } else if (shiftMode === 2) {
        T.querySelector('.shift-mode').innerText = 'shift2';
    } else if (shiftMode === 3) {
        T.querySelector('.shift-mode').innerText = 'shift3';
    }
};

function cursorHighlight() {
    if (cursorMode) {
        const screenContent = document.querySelector('#screen-content').childNodes;
        screenContent[cursorIdx].style.color = 'red';
    }
};

function evaluate() {
    // run on equal button click
    console.log(problem);
    console.log('Validating...');
    if (validProblem(problem)) {

        // evaluate problem into answer structure

        console.log('Valid.');
        console.log('Structuring strings...');
        structureString();
        console.log('done.');
        // convert special number symbols to values
        console.log('Converting special number symbols to values...');
        specialNumberValues();
        console.log('Done.');
        // run all key functions
        console.log('Running key functions...');
        runKeyFunctions();
        console.log('Done.');
        // perform arithmetic
        console.log('Performing arithmetic...');
        answer = calculate(answer);
        console.log('Done.');
        // display answer
        console.log('Solved.');
        updateAnswer();

        // reset program for next question

        // save question to history
        if (history.length < 10) {
            history.unshift({prob: problem, ans: answer});
        } else {
            history.pop();
            history.unshift({prob: problem, ans: answer});
        }
        console.log(history);

        // clear data
        problem = [];
        answer = [];

        // handle modes
        shiftMode = false;
        cursorMode = false;
        updateToggleDisplay();

        // prevent cursor navigation until further input
        cursorDefault();

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
        // clear cache for input while error is displaying
        clearTimeout(formatErrorCache);
        // get target info
        const type = e.target.classList[0];
        const id = e.target.id;
        // reduce number of tests by testing types
        // tested from largest to smallest number of members in type
        // member ids tested from most to least estimated frequency of usage
        if (type === 'numpad') {
            if (id === 'btn-num0') {
                if (validQuant()) {
                    insert('0');
                }
            } else if (id === 'btn-num1') {
                if (validQuant()) {
                    insert('1');
                }
            } else if (id === 'btn-num2') {
                if (validQuant()) {
                    insert('2');
                }
            } else if (id === 'btn-num3') {
                if (validQuant()) {
                    insert('3');
                }
            } else if (id === 'btn-num4') {
                if (validQuant()) {
                    insert('4');
                }
            } else if (id === 'btn-num5') {
                if (validQuant()) {
                    insert('5');
                }
            } else if (id === 'btn-num6') {
                if (validQuant()) {
                    insert('6');
                }
            } else if (id === 'btn-num7') {
                if (validQuant()) {
                    insert('7');
                }
            } else if (id === 'btn-num8') {
                if (validQuant()) {
                    insert('8');
                }
            } else if (id === 'btn-num9') {
                if (validQuant()) {
                    insert('9');
                }
            } else if (id === 'btn-pi') {
                if (validQuant()) {
                    insert(specialInfo[0].symbol);
                }
            } else if (id === 'btn-tau') {
                if (validQuant()) {
                    insert(specialInfo[1].symbol);
                }
            } else if (id === 'btn-euler') {
                if (validQuant()) {
                    insert(specialInfo[2].symbol);
                }
            }
        } else if (type === 'operation') {
            if (id === 'btn-plus') {
                if (validOp()) {
                    insert('+');
                }
            } else if (id === 'btn-minus') {
                if (validOp()) {
                    insert('-');
                }
            } else if (id === 'btn-multiply') {
                if (validOp()) {
                    insert('*');
                }
            } else if (id === 'btn-divide') {
                if (validOp()) {
                    insert('/');
                }
            } else if (id === 'btn-sign') {
                insert('(');
                insert('-');
            } else if (id === 'btn-power' || id === 'btn-power-sup') {
                if (validOp()) {
                    insert('^');
                }
            } else if (id === 'btn-root' || id === 'btn-root-sup') {
                insert('√');
            } else if (id === 'btn-absolute-value') {
                insert('abs');
            }

        } else if (type === 'special') {
            if (id === 'btn-clear') {
                console.log('clear');
                // clear data in problem structure
                problem = [];
                // toggle off cursor mode (leave shift mode)
                cursorMode = false;
                // update display to reflect changes
                updateProblem();
                updateAnswer();
                updateToggleDisplay();
            } else if (id === 'btn-equals') {
                evaluate();
            } else if (id === 'btn-shift') {
                toggleShiftMode();
            } else if (id === 'btn-decimal') {
                if (isNaN(problem[problem.length - 1])) {
                    insert('0');
                    insert('.');
                } else {
                    insert('.');
                }
                updateProblem();
            } else if (id === 'btn-paren-open') {
                if (validQuant(problem)) {
                    insert('(');
                }
            } else if (id === 'btn-paren-close') {
                if (!cursorMode) {
                    // default
                    if (problem[problem.length - 1] === "(") {
                        // no parens without content between them
                        problem.pop();
                        updateProblem();
                    } else if (problem.length - 2 > -1 && problem[problem.length - 2] === "(") {
                        // remove parens around single value
                        const value = problem[problem.length - 1];
                        problem.pop();
                        problem.pop();
                        problem.push(value);
                        updateProblem();
                    } else {
                        insert(')');
                    }
                } else {
                    // cursor mode
                    if (cursorIdx > -1 && problem[cursorIdx - 1] === "(") {
                        // no parens without content between them
                        problem.pop();
                        updateProblem('cursor');
                    } else if (cursorIdx - 2 > -1 && problem[cursorIdx - 2] === "(") {
                        // remove parens around single value
                        const value = problem[cursorIdx];
                        problem.pop();
                        problem.pop();
                        problem.push(value);
                        updateProblem('cursor');
                    } else {
                        insert(')');
                    }
                }
            }

        } else if (type === 'cursor') {
            if (id === 'btn-backspace') {
                console.log('<—');
                backspace(problem);
            } else if (id === 'btn-cursor-mode') {
                console.log("cursor mode toggled");
                toggleCursorMode();
            } else if (id === 'btn-cursor-forward') {
                console.log('>');
                cursorForward();
            } else if (id === 'btn-cursor-backward') {
                console.log('<');
                cursorBack();
            }
        
        // key function buttons
        } else if (type === 'key') {
            if (id === 'btn-shift-1') {
                if (validQuant(true)) {
                    if (shiftMode === 0) {
                        // default
                        insert('sin');
                    } else if (shiftMode === 1) {
                        // shift 1
                        insert('sec');
                    }
                }
            } else if (id === 'btn-shift-2') {
                if (validQuant(true)) {
                    if (shiftMode === 0) {
                        // default
                        insert('cos');
                    } else if (shiftMode === 1) {
                        // shift 1
                        insert('csc');
                    }
                }
            } else if (id === 'btn-shift-3') {
                if (validQuant(true)) {
                    if (shiftMode === 0) {
                        // default
                        insert('tan');
                    } else if (shiftMode === 1) {
                        // shift 1
                        insert('cot');
                    }
                }
            } else if (id === 'btn-shift-4') {
                if (validQuant(true)) {
                    if (shiftMode === 0) {
                        // default
                        insert('log');
                    } else if (shiftMode === 1) {
                        // shift 1
                        insert('log-');
                    }
                }
            } else if (id === 'btn-shift-5') {
                if (validQuant(true)) {
                    if (shiftMode === 0) {
                        // default
                        insert('ln');
                    } else if (shiftMode === 1) {
                        // shift 1
                        insert('ln-');
                    }
                }
            } else if (id === 'btn-shift-6') {
                // something
                console.log('btn-shift-6');
            } else if (id === 'btn-shift-7') {
                // something
                console.log('btn-shift-7');
            }
        }
    }
});
