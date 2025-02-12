console.log('Problem Script Loaded.');

// Development Plan

//  - popup description of buttons on hover

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

// History
const btnHst = document.querySelector('#history-button');
const hstPanel = document.querySelector('#history-panel');

// question history
let history = [];

// question structures
let problem = [];
let answer = [];

// Mode toggles
let shiftMode = 0; // stores a shift mode in the shift cycle
let cursorMode = false; // controls activation of cursor mode features
let cursorModeToggled = false; // prevents defaulting on timeout cursor navigation

// format toggles
let formatSuperscript = false;
let formatSubscript = false;

// Global Indexes
let cursorIdx = 0;

// Caches
let formatErrorCache = {};
let cursorModeCache = {};

// error messages
const error = {
    empty: 'Error: Empty string',
    operation: 'Error: invalid operation',
    consecutive: 'Error: No consecutive operations',
    paren: 'Error: Invalid parenthesis',
    noFraction: 'Error: No fractional argument',
    reqOperation: 'Error: Requires operation',
    reqBase: 'Error: Invalid base for exponent',
    reqPower: 'Error: Invalid power for exponent',
    exponent: 'Error: invalid exponent form',
    reqRadicand: 'Error: Invalid radicand for radical',
    radical: 'Error: invalid radical form',
}

// special number info
const specialInfo = [
    {symbol: 'π', value: Math.PI}, // pi
    {symbol: 'τ', value: Math.PI * 2}, // tau
    {symbol: 'e', value: Math.E}, // Euler's number
];

// operation info
const operation = {
    add: '+',
    sub: '−', // dash: -, hyphen: —, minus: − ,
    mult: '×',
    div: '÷',
    exp: '^',
    rad: '√',
};

// key function info
const keyInfo = [
    // static values
    {key: 'rndx', funct: (x) => rndx(x)}, // generates a random number between 0 - x
    {key: 'rndy', funct: (x) => rndy(x)}, // generates random number between -x - x

    // static operations
    {key: 'abs', funct: (x) => Math.abs(x)}, // absolute value
    {key: 'floor', funct: (x) => Math.floor(x)}, // rounds to integer just below
    {key: 'ceil', funct: (x) => Math.ceil(x)}, // rounds to integer just above
    
    // key functions
    {key: 'sin', funct: (x) => Math.sin(x)}, // sine
    {key: 'asin', funct: (x) => Math.asin(x)}, // arch sine
    {key: 'sinh', funct: (x) => Math.sinh(x)}, // hyperbolic sine
    {key: 'asinh', funct: (x) => Math.asinh(x)}, // arch hyperbolic sine

    {key: 'cos', funct: (x) => Math.cos(x)}, // cosine
    {key: 'acos', funct: (x) => Math.acos(x)}, // arch cosine
    {key: 'cosh', funct: (x) => Math.cosh(x)}, // hyperbolic cosine
    {key: 'acosh', funct: (x) => Math.acosh(x)}, // arch hyperbolic cosine

    {key: 'tan', funct: (x) => Math.tan(x)}, // tangent
    {key: 'atan', funct: (x) => Math.atan(x)}, // arch tangent
    {key: 'tanh', funct: (x) => Math.tanh(x)}, // hyperbolic tangent
    {key: 'atanh', funct: (x) => Math.atanh(x)}, // arch hypberbolic tangent

    {key: 'log10', funct: (x) => Math.log10(x)}, // logarithm (base 10)
    {key: 'log2', funct: (x) => Math.log2(x)}, // logarithm (base 2)
    {key: 'ln', funct: (x) => Math.log(x)}, // natural logarithm
    
    {key: 'round', funct: (x) => Math.round(x)}, // rounds to nearest integer

    
    {key: '!', funct: (x) => factorial(x)}, // factorial of x
    {key: 'Σn', funct: (x) => summateVariable(x)}, // summation from 1 to x, where x represents the upper bound n
    {key: 'Σain', funct: (x) => productSum(x)}, // product sum : i * n, where 0 < i < x && 0 < x
    {key: `Σn${operation.div}ai`, funct: (x) => quotientSum2(x)}, // quotient sum : n / i, where 0 < i < x && 0 < x
    {key: `Σai${operation.div}n`, funct: (x) => quotientSum1(x)}, // quotient sum : i / n, where 0 < i < x && 0 < x
];

// custom key functions
function rndx(x) {
    // rand val 0 - x
    if (x === 0) {
        return 0;
    } else if (x > 0) {
        return Math.floor(Math.random() * (x + 1));
    } else {
        // less than zero
        return NaN;
    }
};

function rndy(x) {
    // rand val -x - x
    const range = Math.abs(x) * 2 + 1;
    const val = Math.floor(Math.random() * range);
    return -Math.abs(x) + val;
};

function factorial(x) {
    if (x === 0) {
        return 0;
    } else if (x > 0) {
        let y = 1;
        for (let i = 1; i <= x; i++) {
            y *= i;
        }
        return y;
    } else {
        // less than zero
        return NaN;
    }
};

// summation functions
function summateVariable(x) {
    if (Math.floor(x) === x) {
        if (x === 0) {
            return 0;
        } else if (x > 0) {
            let sum = 0;
            for (let i = 1; i <= x; i++) {
                sum += i;
            }
            return sum;
        } else {
            // less than zero
            return NaN;
        }
    } else {
        // no fractional arguments
        serveError(error.noFraction);
        return NaN;
    }
};

function productSum(x) {
    if (Math.floor(x) === x) {
        if (x === 0) {
            return 0;
        } else if (x > 0) {
            let sum = 0;
            for (let i = 1; i <= x; i++) {
                sum += x * i;
            }
            return sum;
        } else {
            // less than zero
            return NaN;
        }
    } else {
        // no fractional arguments
        serveError(error.noFraction);
        return NaN;
    }
};

function quotientSum1(x) {
    if (Math.floor(x) === x) {
        if (x === 0) {
            return 0;
        } else if (x > 0) {
            let sum = 0;
            for (let i = 1; i <= x; i++) {
                sum += i / x;
            }
            return sum;
        } else {
            // less than zero
            return NaN;
        }
    } else {
        // no fractional arguments
        serveError(error.noFraction);
        return NaN;
    }
};

function quotientSum2(x) {
    if (Math.floor(x) === x) {
        if (x === 0) {
            return 0;
        } else if (x > 0) {
            let sum = 0;
            for (let i = 1; i <= x; i++) {
                sum += x / i;
            }
            return sum;
        } else {
            // less than zero
            return NaN;
        }
    } else {
        // no fractional arguments
        serveError(error.noFraction);
        return NaN;
    }
};

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
        shiftBtn4.innerHTML = 'log<sub id="btn-shift-4-sub" class="key">10</sub>';
        shiftBtn5.innerHTML = 'round';
        shiftBtn6.innerHTML = 'rand';
    } else if (shiftMode === 1) {
        // shift 1
        shiftBtn1.innerText = 'asin';
        shiftBtn2.innerText = 'acos';
        shiftBtn3.innerText = 'atan';
        shiftBtn4.innerHTML = 'log<sub id="btn-shift-4-sub" class="key">2</sub>';
        shiftBtn5.innerHTML = '!x';
        shiftBtn6.innerHTML = 'rndx';
    } else if (shiftMode === 2) {
        shiftBtn1.innerText = 'sinh';
        shiftBtn2.innerText = 'cosh';
        shiftBtn3.innerText = 'tanh';
        shiftBtn4.innerHTML = 'ln';
        shiftBtn5.innerHTML = 'Σn';
        shiftBtn6.innerHTML = 'rndy';
    } else if (shiftMode === 3) {
        shiftBtn1.innerText = 'asinh';
        shiftBtn2.innerText = 'acosh';
        shiftBtn3.innerText = 'atanh';
        // Σ = html entity: &sum; + html code: &#8721;
        // ∏ = html entity: &prod; + html code: &#8719;
        shiftBtn4.innerHTML = `<div id="btn-shift-4-div" class="key" style="display: flex; align-items: center; font-size: ${21 * Number(window.getComputedStyle(calc).getPropertyValue('--scale-calc-size'))}px">Σ<div id="btn-shift-4-div-child" class="key" style="font-size: ${15 * Number(window.getComputedStyle(calc).getPropertyValue('--scale-calc-size'))}px">a<sub id="btn-shift-6-sub" class="key" style="font-size:${11.2 * Number(window.getComputedStyle(calc).getPropertyValue('--scale-calc-size'))}px">i</sub>n</div></div>`;
        shiftBtn5.innerHTML = `<div id="btn-shift-5-div" class="key" style="display: flex; align-items: center; font-size: ${21 * Number(window.getComputedStyle(calc).getPropertyValue('--scale-calc-size'))}px">Σ<div id="btn-shift-5-div-child" class="key" style="font-size: ${15 * Number(window.getComputedStyle(calc).getPropertyValue('--scale-calc-size'))}px">n${operation.div}a<sub id="btn-shift-6-sub" class="key" style="font-size:${11.2 * Number(window.getComputedStyle(calc).getPropertyValue('--scale-calc-size'))}px">i</sub></div></div>`;
        shiftBtn6.innerHTML = `<div id="btn-shift-6-div" class="key" style="display: flex; align-items: center; font-size: ${21 * Number(window.getComputedStyle(calc).getPropertyValue('--scale-calc-size'))}px">Σ<div id="btn-shift-6-div-child" class="key" style="font-size: ${15 * Number(window.getComputedStyle(calc).getPropertyValue('--scale-calc-size'))}px">a<sub id="btn-shift-6-sub" class="key" style="font-size:${11.2 * Number(window.getComputedStyle(calc).getPropertyValue('--scale-calc-size'))}px">i</sub>${operation.div}n</div></div>`;
    }
};

// RESPONSIVE SUMMATION KEY FUNCTION BUTTONS
// NOTE: must use a different identifier than in indexInterface.js debouncer for function and global variable
let debounceCache2 = {};
function debounce2(funct, defer) {
    clearTimeout(debounceCache2);
    debounceCache2 = setTimeout(() => {
        clearTimeout(debounceCache2);
        funct();
    }, defer)
};

function formatShiftBtn() {
    // updates shift buttons along with scaleIt function in indexInterface.js
    if (shiftMode === 3) {
        shiftBtn4.innerHTML = `<div id="btn-shift-4-div" class="key" style="display: flex; align-items: center; font-size: ${21 * Number(window.getComputedStyle(calc).getPropertyValue('--scale-calc-size'))}px">Σ<div id="btn-shift-4-div-child" class="key" style="font-size: ${15 * Number(window.getComputedStyle(calc).getPropertyValue('--scale-calc-size'))}px">a<sub id="btn-shift-6-sub" class="key" style="font-size:${11.2 * Number(window.getComputedStyle(calc).getPropertyValue('--scale-calc-size'))}px">i</sub>n</div></div>`;
        shiftBtn5.innerHTML = `<div id="btn-shift-5-div" class="key" style="display: flex; align-items: center; font-size: ${21 * Number(window.getComputedStyle(calc).getPropertyValue('--scale-calc-size'))}px">Σ<div id="btn-shift-5-div-child" class="key" style="font-size: ${15 * Number(window.getComputedStyle(calc).getPropertyValue('--scale-calc-size'))}px">n${operation.div}a<sub id="btn-shift-6-sub" class="key" style="font-size:${11.2 * Number(window.getComputedStyle(calc).getPropertyValue('--scale-calc-size'))}px">i</sub></div></div>`;
        shiftBtn6.innerHTML = `<div id="btn-shift-6-div" class="key" style="display: flex; align-items: center; font-size: ${21 * Number(window.getComputedStyle(calc).getPropertyValue('--scale-calc-size'))}px">Σ<div id="btn-shift-6-div-child" class="key" style="font-size: ${15 * Number(window.getComputedStyle(calc).getPropertyValue('--scale-calc-size'))}px">a<sub id="btn-shift-6-sub" class="key" style="font-size:${11.2 * Number(window.getComputedStyle(calc).getPropertyValue('--scale-calc-size'))}px">i</sub>${operation.div}n</div></div>`;
    }
};

window.addEventListener('resize', () => debounce2(formatShiftBtn, 11));

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
};

function cursorForward() {
    cursorContinue();
    const len = problem.length;
    if (len > 0 && cursorIdx + 1 < len) {
        cursorIdx += 1;
        updateProblem('cursor');
    }
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

// formatting
function removeFormatElements(i) {
    // returns a string without format elements from string in given problem structure index
    const str = problem[i];
    if (str.length > 1) { // bypass if single character
        let string = '';
        let addToStr = true;
        for (let i = 0; i < str.length; i++) {
            const char = str.slice(i, i + 1);
            if (char === '<') {
                addToStr = false;
            } else if (char === '>') {
                addToStr = true;
                continue;
            }
            if (addToStr) {
                string += char;
            }
        }
        return string;
    } else {
        return str;
    }
};

function expFormat() {
    // tests whether to format for exponent (false = no format; true = format)
    if (problem.length === 0) {
        // nothing to validate
        return false;
    } else {
        if (!cursorMode) {
            // default mode
            const str = problem[problem.length - 1];
            if (str === '^') {
                return true;
            } else {
                return false;
            }
        } else {
            // cursorMode
            const str = problem.slice(cursorIdx, cursorIdx + 1)[0];
            if (str === '^') {
                return true;
            } else {
                return false;
            }
        }
    }
};

// Structuring
function insert(char) {
    if (!cursorMode) {
        // defaultly inserts at end of problem
        if (!formatSuperscript) {
            if (!expFormat()) {
                // no formatting
                problem.push(char);
            } else {
                // apply superscript formatting
                problem.push('<sup>' + char + '</sup>');
            }
        } else {
            // apply superscript formatting
            problem.push('<sup>' + char + '</sup>');
        }
        updateProblem();
    } else {
        // in cursor mode, inserts at cursor index
        if (problem.length > 0) {
            // non-empty problem structure
            if (cursorIdx === 0) {
                // cursor at start
                problem.unshift(char);
                updateProblem('cursor');
            } else {
                // cursor at middle and end
                if (!formatSuperscript) {
                    if (!expFormat()) {
                        // no formatting
                        problem.splice(cursorIdx + 1, 0, char);
                    } else {
                        // apply superscript formatting
                        problem.splice(cursorIdx + 1, 0, '<sup>' + char + '</sup>');
                    }
                } else {
                    // apply superscript formatting
                    problem.splice(cursorIdx + 1, 0, '<sup>' + char + '</sup>');
                }
                cursorForward();
            }
        } else {
            // empty problem structure
            problem.push(char);
            cursorForward();
            updateProblem('cursor');
        }
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
    answer = struct;
};

function getSection(open, close) {
    // returns section for calculation
    let ref = [];
    for (let i = 0; i < answer.length; i++) {
        if (answer[i] === open || answer[i] === close) {
            ref.push({char: answer[i], index: i});
        }
    }
    if (ref.length > 0) {
        let start, end;
        let section = [];
        for (let i = 0; i < ref.length; i++) {
            if (ref[i].char === open && i + 1 < ref.length && ref[i + 1].char === close) {
                start = ref[i].index;
                end = ref[i + 1].index;
            }
        }
        for (let i = start + 1; i < end; i++) {
            section.push(answer[i]);
        }
        return true && {start: start, end: end, sect: section};
    } else {
        return false;
    }
};

function section() {
    let section = getSection('(', ')');
    let count = 0;
    while (count < 10 && section) {
        answer = restructure(calculate(section.sect), section.start, section.end, answer);
        // prepare for next iteraton
        section = getSection('(', ')');
        count += 1;
    }
    answer = calculate(answer);
};

// Key Functions
function keyFunction(key, funct, prob) {
    // generalizes single argument key functions
    let idx = getIdx(key, prob);
    let x = 0;
    while (x < 100 && idx !== false) {
        x += 1;
        let solution;
        if (prob[idx + 1] === '(') {
            // expression argument
            let expression = [];
            let nest = 0;
            for (let i = idx + 1; i < prob.length; i++) {
                expression.push(prob[i]);
                if (prob[i] === '(') {
                    nest += 1;
                } else if (prob[i] === ')') {
                    nest -= 1;
                    if (nest === 0) {
                        break;
                    }
                }
            }
        } else {
            // single argument
            solution = funct(Number(prob[idx + 1]));
        }
        prob = restructure(solution, idx, idx + 1, prob);
        idx = getIdx(key, prob);
    }
    return prob;
};

function runKeyFunctions(prob) {
    // runs all key functions
    let p = prob;
    for (let i = 0; i < keyInfo.length; i++) {
        p = keyFunction(keyInfo[i].key, keyInfo[i].funct, p);
    }
    return p;
};

// calculation
function calculate(prob) {
    // run key functions
    console.log('Running key functions...');
    prob = runKeyFunctions(prob);
    console.log('Ran.');
    console.log('Performing Arithmetic...');
    // parameters
    const max = 10;
    // perform all Exponents and Radicals as they appear from left to right
    let expIdx = getIdx(operation.exp, prob);
    let radIdx = getIdx(operation.rad, prob);
    let count = 0;
    while (count < max && expIdx !== false || count <max && radIdx !== false) {
        count += 1;
        if (radIdx === false && expIdx !== false) {
            // only exponents
            const base = Number(prob[expIdx - 1]);
            const power = Number(prob[expIdx + 1]);
            const exponentiation = base**power;
            prob = restructure(exponentiation, expIdx - 1, expIdx + 1, prob);
            expIdx = getIdx(operation.mult, prob);

        } else if (expIdx === false && radIdx !== false) {
            // only radicals
            if (radIdx === 0 || radIdx - 1 > -1 && isOp(radIdx - 1) || radIdx - 1 > -1 && isKey(radIdx - 1)) {
                // if radical symbol at start or operation just before radical symbol or key function just before radical symbol
                // then no index of radication,
                // so assume square root
                const radicand = Number(prob[radIdx + 1]);
                const radication = radicand**(1/2);
                prob = restructure(radication, radIdx, radIdx + 1, prob);
                radIdx = getIdx(operation.div, prob);
            } else {
                // use index of radication
                const index = Number(prob[radIdx - 1]);
                const radicand = Number(prob[radIdx + 1]);
                const radication = radicand**(1/index);
                prob = restructure(radication, radIdx - 1, radIdx + 1, prob);
                radIdx = getIdx(operation.div, prob);
            }

        } else if (expIdx !== false && radIdx !== false && expIdx < radIdx) {
            // exponents
            const base = Number(prob[expIdx - 1]);
            const power = Number(prob[expIdx + 1]);
            const exponentiation = base**power;
            prob = restructure(exponentiation, expIdx - 1, expIdx + 1, prob);
            expIdx = getIdx(operation.mult, prob);
            radIdx = getIdx(operation.div, prob);
            // then radicals
            if (radIdx === 0 || radIdx - 1 > -1 && isOp(radIdx - 1) || radIdx - 1 > -1 && isKey(radIdx - 1)) {
                // if radical symbol at start or operation just before radical symbol or key function just before radical symbol
                // then no index of radication,
                // so assume square root
                const radicand = Number(prob[radIdx + 1]);
                const radication = radicand**(1/2);
                prob = restructure(radication, radIdx, radIdx + 1, prob);
                radIdx = getIdx(operation.div, prob);
            } else {
                // use index of radication
                const index = Number(prob[radIdx - 1]);
                const radicand = Number(prob[radIdx + 1]);
                const radication = radicand**(1/index);
                prob = restructure(radication, radIdx - 1, radIdx + 1, prob);
                radIdx = getIdx(operation.div, prob);
            }

        } else if (expIdx !== false && radIdx !== false && expIdx > radIdx) {
            // radicals
            if (radIdx === 0 || radIdx - 1 > -1 && isOp(radIdx - 1) || radIdx - 1 > -1 && isKey(radIdx - 1)) {
                // if radical symbol at start or operation just before radical symbol or key function just before radical symbol
                // then no index of radication,
                // so assume square root
                const radicand = Number(prob[radIdx + 1]);
                const radication = radicand**(1/2);
                prob = restructure(radication, radIdx, radIdx + 1, prob);
                radIdx = getIdx(operation.div, prob);
            } else {
                // use index of radication
                const index = Number(prob[radIdx - 1]);
                const radicand = Number(prob[radIdx + 1]);
                const radication = radicand**(1/index);
                prob = restructure(radication, radIdx - 1, radIdx + 1, prob);
                radIdx = getIdx(operation.div, prob);
            }
            // update index due to restructure
            expIdx = getIdx(operation.mult, prob);
            // then exponents
            const base = Number(prob[expIdx - 1]);
            const power = Number(prob[expIdx + 1]);
            const exponentiation = base**power;
            prob = restructure(exponentiation, expIdx - 1, expIdx + 1, prob);
            expIdx = getIdx(operation.mult, prob);
        }
    }

    // perform all Multiplications and Divisions as they appear from left to right
    let mIdx = getIdx(operation.mult, prob);
    let dIdx = getIdx(operation.div, prob);
    count = 0;
    while (count < max && mIdx !== false || count <max && dIdx !== false) {
        count += 1;
        if (dIdx === false && mIdx !== false) {
            // only multiplication
            const multiplier = Number(prob[mIdx - 1]);
            const mulitplicand = Number(prob[mIdx + 1]);
            const product = multiplier * mulitplicand;
            prob = restructure(product, mIdx - 1, mIdx + 1, prob);
            mIdx = getIdx(operation.mult, prob);

        } else if (mIdx === false && dIdx !== false) {
            // only division
            const dividend = Number(prob[dIdx - 1]);
            const divisor = Number(prob[dIdx + 1]);
            const quotient = dividend / divisor;
            prob = restructure(quotient, dIdx - 1, dIdx + 1, prob);
            dIdx = getIdx(operation.div, prob);

        } else if (mIdx !== false && dIdx !== false && mIdx < dIdx) {
            // multiply
            const multiplier = Number(prob[mIdx - 1]);
            const mulitplicand = Number(prob[mIdx + 1]);
            const product = multiplier * mulitplicand;
            prob = restructure(product, mIdx - 1, mIdx + 1, prob);
            mIdx = getIdx(operation.mult, prob);
            // update index due to restructure
            dIdx = getIdx(operation.div, prob);
            // then divide
            const dividend = Number(prob[dIdx - 1]);
            const divisor = Number(prob[dIdx + 1]);
            const quotient = dividend / divisor;
            prob = restructure(quotient, dIdx - 1, dIdx + 1, prob);
            dIdx = getIdx(operation.div, prob);

        } else if (mIdx !== false && dIdx !== false && mIdx > dIdx) {
            // divide
            const dividend = Number(prob[dIdx - 1]);
            const divisor = Number(prob[dIdx + 1]);
            const quotient = dividend / divisor;
            prob = restructure(quotient, dIdx - 1, dIdx + 1, prob);
            dIdx = getIdx(operation.div, prob);
            // update index due to restructure
            mIdx = getIdx(operation.mult, prob);
            // then multiply
            const multiplier = Number(prob[mIdx - 1]);
            const mulitplicand = Number(prob[mIdx + 1]);
            const product = multiplier * mulitplicand;
            prob = restructure(product, mIdx - 1, mIdx + 1, prob);
            mIdx = getIdx(operation.mult, prob);
        }
    }
    
    // perform all Additions and Subtractions as they appear from left to right
    let aIdx = getIdx(operation.add, prob);
    let sIdx = getIdx(operation.sub, prob);
    count = 0;
    while (count < max && aIdx !== false || count < max && sIdx !== false) {
        count += 1;
        if (sIdx === false && aIdx !== false) {
            // only addition
            const augend = Number(prob[aIdx - 1]);
            const addend = Number(prob[aIdx + 1]);
            const total = augend + addend;
            prob = restructure(total, aIdx - 1, aIdx + 1, prob);
            aIdx = getIdx(operation.add, prob);

        } else if (aIdx === false && sIdx !== false) {
            // only subtraction
            const minuend = Number(prob[sIdx - 1]);
            const subtrahend = Number(prob[sIdx + 1]);
            const difference = minuend - subtrahend;
            prob = restructure(difference, sIdx - 1, sIdx + 1, prob);
            sIdx = getIdx(operation.sub, prob);

        } else if (aIdx !== false && sIdx !== false && aIdx < sIdx) {
            // add
            const augend = Number(prob[aIdx - 1]);
            const addend = Number(prob[aIdx + 1]);
            const total = augend + addend;
            prob = restructure(total, aIdx - 1, aIdx + 1, prob);
            aIdx = getIdx(operation.add, prob);
            // update index due to restructure
            sIdx = getIdx(operation.sub, prob);
            // then subtract
            const minuend = Number(prob[sIdx - 1]);
            const subtrahend = Number(prob[sIdx + 1]);
            const difference = minuend - subtrahend;
            prob = restructure(difference, sIdx - 1, sIdx + 1, prob);
            sIdx = getIdx(operation.sub, prob);

        } else if (aIdx !== false && sIdx !== false && aIdx > sIdx) {
            // subtract
            const minuend = Number(prob[sIdx - 1]);
            const subtrahend = Number(prob[sIdx + 1]);
            const difference = minuend - subtrahend;
            prob = restructure(difference, sIdx - 1, sIdx + 1, prob);
            sIdx = getIdx(operation.sub, prob);
            // update index due to restructure
            aIdx = getIdx(operation.add, prob);
            // then add
            const augend = Number(prob[aIdx - 1]);
            const addend = Number(prob[aIdx + 1]);
            const total = augend + addend;
            prob = restructure(total, aIdx - 1, aIdx + 1, prob);
            aIdx = getIdx(operation.add, prob);
        }
    }
    console.log('Performed.');
    return prob;
};

// tests
function isKey(i) {
    // test for match of str at problem index i with key property of keyInfo structure
    // excludes static values (random number generator functions)
    const str = removeFormatElements(i);
    for (let i = 2; i < keyInfo.length; i++) {
        if (keyInfo[i].key === str) {
            return true;
        }
    }
    return false;
};

function isSpecial(i) {
    // test for match of str with symbol property of specialInfo structure
    const str = removeFormatElements(i);
    for (let i = 0; i < specialInfo.length; i++) {
        if (specialInfo[i].symbol === str) {
            return true;
        }
    }
    return false;
};

function isOp(i) {
    // test for match of str with value in operation object
    const str = removeFormatElements(i);
    const values = Object.values(operation);
    const result = values.filter((key) => str === key);
    if (result.length > 0) {
        return true;
    } else {
        return false;
    }
};

function findOpen(start, open, close) {
    // finds opening index for open and close char pairs
    // accounts for nesting
    let index = 0;
    let nest = 0;
    for (let i = start; i > -1; i--) {
        const str = removeFormatElements(i);
        if (str === open) {
            nest += 1;
            if (nest === 0) {
                index = i;
                break;
            }
        } else if (str === close) {
            nest -= 1;
        }
    }
    return index;
};

function findOpen2(start, open, close) {
    // finds opening index for open and close char pairs
    // accounts for nesting
    let index = 0;
    let nest = 0;
    for (let i = start; i > -1; i--) {
        const str = removeFormatElements(i);
        if (str === open) {
            if (nest === 0) {
                index = i;
                break;
            }
            nest += 1;
        } else if (str === close) {
            nest -= 1;
        }
    }
    return index;
};

// error functions
function serveError(error) {
    Q.innerText = error;
    clearTimeout(formatErrorCache);
    formatErrorCache = setTimeout(() => {
        updateProblem('cursor');
        clearTimeout(formatErrorCache);
    }, 1300)
};

// pre validation
function validOp() {
    // pre-validates that an operation can be added to the problem structure
    if (problem.length === 0) {
        // cannot operate on empty string
        serveError(error.operation);
        return false;
    } else {
        // run validation
        if (!cursorMode) {

            // default

            const i = problem.length - 1;
            const str = removeFormatElements(i);
            if (str === ')' || !isNaN(str) || isSpecial(i)) {
                // last str is ')' or a regular number or a special number
                return true;
            }
        } else {

            // cursor mode
            const str = removeFormatElements(cursorIdx);
            if (str === ')' || !isNaN(str) || isSpecial(cursorIdx)) {
                // last str is ')' or a regular number or a special number
                return true;
            }
        }
    }
    serveError(error.operation);
    return false;
};

function validQuant(key = false, special = false) {
    // pre-validates regular numbers, special numbers and key functions
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

                    const i = problem.length - 1;
                    const str = removeFormatElements(i);

                    if (str !== ')') {
                        if (!isSpecial(i)) {
                            // last str is not a special number
                            if (formatSuperscript) {
                                // allow superscript formatting
                                return true;
                            } else {
                                if (formatSubscript) {
                                    // allow subscript formatting
                                    return true;
                                } else {
                                    // test formatting
                                    if (str === problem[i] && !isNaN(i)) {
                                        // last str is not a formatted number
                                        return true;
                                    } else {
                                        // last str is a formatted number
                                        serveError(error.reqOperation);
                                        return false;
                                    }
                                }
                            }

                        }
                    }
                    // last str is a special number
                    serveError(error.reqOperation);
                    return false;

                } else {

                    // key function

                    const i = problem.length - 1;
                    const str = removeFormatElements(i);
                    if (str !== ')') {
                        if (isNaN(str)) {
                            // last str is not a number
                            if (!isSpecial(i)) {
                                // last str is not a special number
                                if (!isKey(i)) {
                                    // last str is not key
                                    if (expFormat()) {
                                        // start of a power expression
                                        formatSuperscript = true;
                                        insert('(');
                                        return true;
                                    } else {
                                        return true;
                                    }
                                }
                            }
                        }
                    }
                    // last str is a number or a special number or a key
                    serveError(error.reqOperation);
                    return false;

                }

            } else {

                // special numbers

                const i = problem.length - 1;
                const str = removeFormatElements(i);
                if (str !== ')') {
                    if (isNaN(str)) {
                        // last str is not a number
                        if (!isSpecial(i)) {
                            // last str is not a special number
                            return true;
                        }
                    }
                }
                // last str is a number or a special number
                serveError(error.reqOperation);
                return false;

            }
        } else {
            // cursor mode
            if (!special) {
                // not special numbers
                if (!key) {

                    // regular numbers

                    const str = removeFormatElements(cursorIdx);
                    if (str !== ')') {
                        if (!isSpecial(cursorIdx)) {
                            // str at cursorIdx is not a special number
                            if (str === problem[cursorIdx]) {
                                return true;
                            } else {
                                // last str is a formatted number
                                serveError(error.reqOperation);
                            }
                        }
                    }
                    // str at cursorIdx is special number
                    serveError(error.reqOperation);
                    return false;

                } else {

                    // key function

                    const str = removeFormatElements(cursorIdx);
                    if (str !== ')') {
                        if (isNaN(str)) {
                            // str at cursorIdx is not a number
                            if (!isSpecial(cursorIdx)) {
                                // str at cursorIdx is not a special number
                                if (!isKey(cursorIdx)) {
                                    // str at cursorIdx is not key
                                    return true;
                                }
                            }
                        }
                    }
                    // str at cursorIdx is a number or a special number or a key
                    serveError(error.reqOperation);
                    return false;

                }

            } else {

                // special numbers

                const str = removeFormatElements(cursorIdx);
                if (str !== ')') {
                    if (isNaN(str)) {
                        // str at cursorIdx is not a number
                        if (!isSpecial(cursorIdx)) {
                            // str at cursorIdx is not a special number
                            return true;
                        }
                    }
                }
                // str at cursorIdx is a number or a special number
                serveError(error.reqOperation);
                return false;

            }
        }
    }
};

// handlers (pre validates, formats and inserts)
function handleRadical() {
    if (problem.length === 0) {
        // nothing to validate
        insert(operation.rad);
    } else {
        // validate
        if (!cursorMode) {
            const str = removeFormatElements(problem.length - 1);
            // default mode
            if (str === ')') {
                // index of radication is an expression
                // get starting parenthesis index
                const start = findOpen(problem.length - 1, '(', ')');
                // format section
                let section = [];
                for (let i = start; i < problem.length; i++) {
                    section.push(`<sup>${removeFormatElements(i)}</sup>`);
                }
                // update changes to problem structure
                problem = restructure(section, start, problem.length - 1, problem);
                // add radical symbol
                insert(operation.rad);
            } else {
                if (!isKey(problem.length - 1)) {
                    // not a key
                    if (!isOp(problem.length - 1)) {
                        // is a regular number or a special number
                        problem.pop();
                        insert(`<sup>${str}</sup>`);
                        insert(operation.rad);
                    } else {
                        // is operation
                        insert(operation.rad);
                    }
                } else {
                    // no radical just after key function
                    serveError(error.radical);
                }
            } 
        } else {
            // cursor mode
            const str = removeFormatElements(cursorIdx);
            if (str === ')') {
                // index of radication is an expression
                // get starting parenthesis index
                const start = findOpen(cursorIdx, '(', ')');
                // format section
                let section = [];
                for (let i = start; i < problem.length; i++) {
                    section.push(`<sup>${problem[i]}</sup>`);
                }
                // update changes to problem structure
                problem = restructure(section, start, problem.length - 1, problem);
                // add radical symbol
                insert(operation.rad);
            } else {
                if (!isKey(cursorIdx)) {
                    // not a key
                    if (!isOp(cursorIdx)) {
                        // is a regular number or a special number
                        problem.splice(cursorIdx, 1);
                        insert(`<sup>${str}</sup>`);
                        insert(operation.rad);
                    } else {
                        // is operation
                        insert(operation.rad);
                    }
                } else {
                    // no radical just after key function
                    serveError(error.input);
                }
            }
        }
    }
};

function handlePower() {
    if (problem.length === 0) {
        serveError(error.reqBase);
    } else {
        if (!cursorMode) {
            const i = problem.length - 1;
            // default mode
            if (!isNaN(removeFormatElements(i)) || isSpecial(i)) {
                // base is a number or a special number
                insert(operation.exp);
            } else {
                // base is neither a number nor special number
                serveError(error.reqBase);
            }
        } else {
            // cursor mode
            if (!isNaN(removeFormatElements(cursorIdx)) || isSpecial(cursorIdx)) {
                // base is a number or a special number
                insert(operation.exp);
            } else {
                // base is neither a number nor special number
                serveError(error.reqBase);
            }
        }
    }
};

function handleParen(closing = false) {
    // pre-validates parenthesis on paren buttons
    if (problem.length === 0) {
        if (closing) {
            // no closing parenthesis at start of problem
            serveError(error.paren);
        } else {
            // nothing to validate
            if (closing) {
                insert(')');
            } else {
                insert('(');
            }
        }
    } else {
        if (!cursorMode) {
            // default mode
            const i = problem.length - 1;
            const str = removeFormatElements(i);
            if (!closing) {
                // opening parens

                if (str !== ')') {
                    // last str is not a closing parenthesis
                    if (isNaN(str)) {
                        // last str is not regular a number
                        if (!isSpecial(i)) {
                            // last str is not a special number
                            if (str === operation.exp) {
                                // start of a power expression
                                formatSuperscript = true;
                                insert('(');
                            } else {
                                // start of normal expression
                                insert('(');
                            }
                        } else {
                            // last str is a special number
                            serveError(error.reqOperation);
                        }
                    } else {
                        // last str is a regular number
                        serveError(error.reqOperation);
                    }
                } else {
                    // cannot place ( right after )
                    serveError(error.paren);
                }
            } else {
                // closing parens

                let removed = false;
                // remove parenthesis around single special numbers
                if (isSpecial(i) && i - 1 > -1 && removeFormatElements(i - 1) === '(') {
                    removed = true;
                    problem.splice(i - 1, 1);
                    updateProblem();
                    if (i - 2 > -1 && removeFormatElements(i - 2) === operation.exp) {
                        formatSuperscript = false;
                    }
                } else {
                    // remove parenthesis around single multidigit values
                    for (let x = i; x > -1; x--) {
                        const a = removeFormatElements(x);
                        if (a === '(') {
                            removed = true;
                            problem.splice(x, 1);
                            updateProblem();
                            if (x - 1 > -1 && removeFormatElements(x - 1) === operation.exp) {
                                formatSuperscript = false;
                            }
                            break;
                        } else if (isNaN(a)) {
                            if (a === '.') {
                                continue;
                            } else {
                                break;
                            }
                        }
                    }
                }
                
                if (!removed) {
                    // if not removed
                    if (str !== '(') {
                        // last str is not a opening parenthesis
                        if (!isOp(i)) {
                            // last str is not an operation
                            if (!isKey(i)) {
                                // last str is not a key function
                                const start = findOpen2(i, '(', ')');
                                console.log(start);
                                if (start - 1 > -1 && removeFormatElements(start - 1) === '^') {
                                    // end of power expression
                                    insert(')');
                                    formatSuperscript = false;
                                } else {
                                    // end of normal expression
                                    insert(')');
                                }
                            } else {
                                // cannot close parenthesis after key function
                                serveError(error.paren);
                            }
                        } else {
                            // cannot close parenthesis after operation
                            serveError(error.paren);
                        }
                    } else {
                        // cannot place ) right after (
                        serveError(error.paren);
                    }
                }
            }
        } else {
            // cursor mode
            const i = cursorIdx;
            const str = removeFormatElements(i);
            if (!closing) {
                // opening parens
                if (str !== ')') {
                    // last str is not a closing parenthesis
                    if (isNaN(str)) {
                        // last str is not a regular number
                        if (!isSpecial(i)) {
                            // last str is not a special number
                            insert('(');
                        } else {
                            // last str is a special number
                            serveError(error.reqOperation);
                        }
                    } else {
                        // last str is a regular number
                        serveError(error.reqOperation);
                    }
                } else {
                    // cannot place ( right after )
                    serveError(error.paren);
                }
            } else {
                // closing parens
                if (str !== '(') {
                    // str at cursorIdx is not a opening parenthesis
                    if (!isOp(i)) {
                        // str at cursorIdx is not an operation
                        if (!isKey(i)) {
                            // str at cursorIdx is not a key function
                            insert(')');
                        } else {
                            // cannot close parenthesis after key function
                            serveError(error.paren);
                        }
                    } else {
                        // cannot close parenthesis after operation
                        serveError(error.paren);
                    }
                } else {
                    // cannot place ) right after (
                    serveError(error.paren);
                }
            }
        }
    }
};

// post validation
function validParenthesis(prob) {
    // post-validates parenthesis in copy of problem structure
    let nestLvl = 0;
    let parens = [];
    for (let i = 0; i < prob.length; i++) {
        if (prob[i] === '(') {
            parens.push('(');
            nestLvl += 1;
        } else if (prob[i] === ')') {
            parens.push(')');
            nestLvl -= 1;
        }
    }
    // if there are parenthesis
    if (parens.length > 0) {
        if (nestLvl !== 0) {
            // no non-zero sum of nestLvl
            serveError(error.paren);
            return false;
        } else if (parens[0] === ')') {
            // no closing paren at start
            serveError(error.paren);
            return false;
        } else if (parens[parens.length - 1] === '(') {
            // no opening paren at end
            serveError(error.paren);
            return false;
        } else {
            // match each open paren to a closing paren (accounting for nesting)
            for (let i = 0; i < prob.length; i++) {
                if (prob[i] === '(') {
                    // search for match
                    let x = 0;
                    for (let j = i; j < prob.length; j++) {
                        if (prob[j] === ')') {
                            x -= 1;
                        } else if (prob[j] === "(") {
                            x += 1;
                        }
                        if (x === 0) {
                            break;
                        }
                    }
                    if (x !== 0) {
                        // missing match
                        serveError(error.paren);
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

function validOperations(prob) {
    // post-validates operations in copy of problem structure
    if (prob[0] !== operation.rad && isOp(0) || isOp(prob.length - 1)) {
        // no operations on start or end of problem
        serveError(error.operation);
        return false;
    } else {
        for (let i = 0; i < prob.length; i++) {
            // exponent form test
            if (prob[i] === operation.exp) {
                if (i - 1 > -1 && i + 1 < prob.length) {
                    if (isNaN(prob[i - 1]) && !isSpecial(i - 1)) {
                        // invalid base exponent form
                        serveError(error.reqBase);
                        return false;
                    } else if (isNaN(prob[i + 1]) && !isSpecial(i + 1)) {
                        // invalid power exponent form
                        serveError(error.reqPower);
                        return false;
                    }
                } else {
                    // invalid exponent form
                    serveError(error.exponent);
                    return false;
                }
            }
            
            // radical form test
            if (prob[i] === operation.rad) {
                if (i + 1 < prob.length) {
                    if (isNaN(prob[i + 1]) && !isSpecial(i + 1)) {
                        // invalid radical form
                        serveError(error.reqRadicand);
                        return false;
                    }
                } else {
                    // invalid radical form
                    serveError(error.radical);
                    return false;
                }
            }
            
            // consecutive operations test
            if (isOp(i) && i + 1 < prob.length && isOp(i + 1)) {
                // no consecutive operations
                serveError(error.consecutive);
                return false;
            }
        }
    }
    // if nothing returns false
    return true;
};

function validProblem() {
    // post-validates problem after structuring
    // validate string data
    if (problem.length === 0) {
        // empty problem
        serveError(error.empty);
    } else {
        // removes format elements on copy of problem
        let prob = [];
        for (let i = 0; i < problem.length; i++) {
            prob.push(removeFormatElements(i));
        }

        // validate parenthesis
        if (validParenthesis(prob)) {
            if (validOperations(prob)) {
                // add further validation here
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
};

// display functions
function updateProblem(cursor = null) {
    // clear problem in display
    Q.innerHTML = '';
    for (let i = 0; i < problem.length; i++) {
        // build element
        const div = document.createElement('div');
        div.innerHTML = problem[i];
        // lay element
        Q.appendChild(div);
    }
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
    if (validProblem()) {
        console.log('Valid.');

        // evaluate problem structure into answer structure

        // remove formatElements in problem structure
        for (let i = 0; i < problem.length; i++) {
            problem.splice(i, 1, removeFormatElements(i));
        }

        console.log('Structuring strings...');
        structureString();
        console.log('Structured.');
        // convert special number symbols to values
        console.log('Converting special number symbols to values...');
        specialNumberValues();
        console.log('Converted.');
        // perform arithmetic
        console.log('Solving...');
        section();
        // display answer
        console.log('Solved.');
        updateAnswer();

        // reset program for next question

        // save question to history
        if (history.length < 10) {
            // convert problem structure to string
            let prob = '';
            problem.forEach((p) => {
                prob += p;
            });
            history.unshift({prob: prob, ans: answer[0]});
        } else {
            history.pop();
            history.unshift({prob: prob, ans: answer[0]});
        }

        // clear data
        problem = [];
        answer = [];

        // handle cursor mode
        cursorMode = false;
        updateToggleDisplay();
        cursorDefault();

        // prevent format carry-over
        formatSuperscript = false;
        formatSubscript = false;

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
                if (validQuant(false, true)) {
                    insert(specialInfo[0].symbol);
                }
            } else if (id === 'btn-tau') {
                if (validQuant(false, true)) {
                    insert(specialInfo[1].symbol);
                }
            } else if (id === 'btn-euler') {
                if (validQuant(false, true)) {
                    insert(specialInfo[2].symbol);
                }
            }

        } else if (type === 'operation') {
            if (id === 'btn-plus') {
                if (validOp()) {
                    insert(operation.add);
                }
            } else if (id === 'btn-minus') {
                if (validOp()) {
                    insert(operation.sub);
                }
            } else if (id === 'btn-multiply') {
                if (validOp()) {
                    insert(operation.mult);
                }
            } else if (id === 'btn-divide') {
                if (validOp()) {
                    insert(operation.div);
                }
            } else if (id === 'btn-sign' || id === 'btn-sign-sup' || id === 'btn-sign-sub') {
                insert('(');
                insert('-');
            } else if (id === 'btn-power' || id === 'btn-power-sup') {
                handlePower();
            } else if (id === 'btn-root' || id === 'btn-root-sup') {
                handleRadical();
            } else if (id === 'btn-absolute-value') {
                if (validQuant(true)) {
                    insert('abs');
                }
            } else if (id === 'btn-floor') {
                if (validQuant(true)) {
                    insert('floor');
                }
            } else if (id === 'btn-ceil') {
                if (validQuant(true)) {
                    insert('ceil');
                }
            }

        } else if (type === 'special') {
            if (id === 'btn-clear') {
                console.log('clear');
                // clear data in structures
                problem = [];
                answer = [];
                // toggle off cursor mode (leave shift mode)
                cursorMode = false;
                // disable all formatting
                formatSuperscript = false;
                formatSubscript = false;
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
                handleParen();
            } else if (id === 'btn-paren-close') {
                handleParen(true);
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
                        insert('asin');
                    } else if (shiftMode === 2) {
                        insert('sinh');
                    } else if (shiftMode === 3) {
                        insert('asinh');
                    }
                }
            } else if (id === 'btn-shift-2') {
                if (validQuant(true)) {
                    if (shiftMode === 0) {
                        // default
                        insert('cos');
                    } else if (shiftMode === 1) {
                        insert('acos');
                    } else if (shiftMode === 2) {
                        insert('cosh');
                    } else if (shiftMode === 3) {
                        insert('acosh');
                    }
                }
            } else if (id === 'btn-shift-3') {
                if (validQuant(true)) {
                    if (shiftMode === 0) {
                        // default
                        insert('tan');
                    } else if (shiftMode === 1) {
                        insert('atan');
                    } else if (shiftMode === 2) {
                        insert('tanh');
                    } else if (shiftMode === 3) {
                        insert('atanh');
                    }
                }
            } else if (id === 'btn-shift-4' || id === 'btn-shift-4-div' || id === 'btn-shift-4-div-child' || id === 'btn-shift-4-sub') {
                if (validQuant(true)) {
                    if (shiftMode === 0) {
                        // default
                        insert('log<sub>10</sub>');
                    } else if (shiftMode === 1) {
                        insert('log<sub>2</sub>');
                    } else if (shiftMode === 2) {
                        insert('ln');
                    } else if (shiftMode === 3) {
                        insert(`Σa<sub>i</sub>n`);
                    }
                }
            } else if (id === 'btn-shift-5' || id === 'btn-shift-5-div' || id === 'btn-shift-5-div-child') {
                if (validQuant(true)) {
                    if (shiftMode === 0) {
                        insert('round');
                    } else if (shiftMode === 1) {;
                        insert('!');
                    } else if (shiftMode === 2) {
                        insert('Σn');
                    } else if (shiftMode === 3) {
                        insert(`Σn${operation.div}a<sub>i</sub>`);
                    }
                }
            } else if (id === 'btn-shift-6' || id === 'btn-shift-6-div' || id === 'btn-shift-6-div-child' || id === 'btn-shift-6-sub') {
                if (validQuant(true)) {
                    if (shiftMode === 0) {
                        insert(`${Math.random()}`); // rand button generates a random number between 0 - 1 && not 1
                    } else if (shiftMode === 1) {
                        insert('rndx');
                    } else if (shiftMode === 2) {
                        insert('rndy');
                    } else if (shiftMode === 3) {
                        insert(`Σa<sub>i</sub>${operation.div}n`);
                    }
                }
            }
        }
    }
});

// History controls
btnHst.addEventListener('click', () => {
    console.log('history');
    if (window.getComputedStyle(hstPanel).getPropertyValue('opacity') === '0') {
        if (history.length > 0) {
            history.forEach((hist) => {
                const div = document.createElement('div');
                div.innerText = `${hist.prob} = ${hist.ans}`;
                div.style.borderBottom = '1px solid #adafb8';
                hstPanel.appendChild(div);
            });
        } else {
            const div = document.createElement('div');
            div.innerText = 'No History';
            hstPanel.appendChild(div);
        }
        hstPanel.style.opacity = 1;
    } else {
        hstPanel.style.opacity = 0;
        hstPanel.innerHTML = '';
    }
});
