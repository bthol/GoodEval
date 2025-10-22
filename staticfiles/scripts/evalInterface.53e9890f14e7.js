console.log('Interface Script Loaded.');

// parameters
const addRate = 50;
const numberOfDots = 10;
const loaderAnimationTime = addRate * numberOfDots;
const removeRate = loaderAnimationTime * .75;
const loaderDuration = addRate * numberOfDots + removeRate;
const requestDuration = loaderDuration + 30000; // loader duration + 30 seconds

// global state variables
let dotInterval = {};
let dotCount = 1;
let debounceRequest = {};
let errorTimeout = {};

// DOM selections
const connectionStatusDisplay = document.querySelector('#connection-status');
const loader = document.querySelector('.elipses-container');

const problemField = document.querySelector('#problem-field');
const answerField = document.querySelector('#answer-field');
const evalBTN = document.querySelector('#evaluate-button');

const searchType = document.querySelector('#search-type');
const searchField = document.querySelector('#search-field');
const resultContainer = document.querySelector('#search-result-container');
const searchBTN = document.querySelector('#search-button');

// update dom data
loader.setAttribute('style', `--anim-time: ${loaderAnimationTime}ms`);

// data structures
const connectionStatus = [
    'offline',
    'online'
];

let INFORMATION = {};

const error = {
    emptyString: 'Invalid: empty string',
    parenthesis: 'Invalid: parenthesis',
    operation: 'Invalid: operation',
    connectionFailed: 'Error: connection failed',
    connectionTimeout: 'Error: connection attempt timed out',
    dataNotFound: 'Error: data not found'
};

// operation characters
const operations = {
    addition: '+',
    subtraction: '-',
    multiplication: '*',
    division: '/',
    exponentiation: '^',
    radication: '√',
};

// loader animation
function startLoader() {

    // add dot
    const dot = document.createElement('div');
    dot.classList.add('elipses-dot');
    loader.appendChild(dot);

    clearInterval(dotInterval);
    dotInterval = setInterval(() => {
        if (dotCount < numberOfDots) {

            // add dot
            const dot = document.createElement('div');
            dot.classList.add('elipses-dot');
            loader.appendChild(dot);

            dotCount += 1;
        } else {
            clearInterval(dotInterval);
            dotCount = 1;
            const x = setTimeout(() => {
                clearTimeout(x);
                loader.innerHTML = '';
                startLoader();
            }, removeRate);
        }
    }, addRate);
};

function stopLoader() {
    loader.innerHTML = '';
    clearInterval(dotInterval);
    dotCount = 1;
};

// problem string validation
function serveError(error) {
    // displays string in error argument on page for 3000 ms
    answerField.innerText = error;
    clearTimeout(errorTimeout);
    errorTimeout = setTimeout(() => {
        clearTimeout(errorTimeout);
        answerField.innerText = '';
    }, 3000);
};

function validParen(prob) {
    // post-validates parenthesis in problem string
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
            serveError(error.parenthesis);
            return false;
        } else if (parens[0] === ')') {
            // no closing paren at start
            serveError(error.parenthesis);
            return false;
        } else if (parens[parens.length - 1] === '(') {
            // no opening paren at end
            serveError(error.parenthesis);
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
                        serveError(error.parenthesis);
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

function isOp(index, prob) {
    // tests if character at index in prob string is an operation
    if (index < prob.length) {
        const char = prob.substring(index, index + 1);
        const values = Object.values(operations);
        for (let i = 0; i < values.length; i++) {
            if (char === values[i]) {
                // found a match
                return true;
            }
        }
        // none matched
        return false;
    }
};

function validOp(prob) {
    // post-validates operations in problem string

    // test for operations on start or end of problem
    if (isOp(0, prob) && prob[0] !== operations.radication || isOp(prob.length - 1, prob)) {
        serveError(error.operation);
        return false;
    } else {
        for (let i = 0; i < prob.length; i++) {
            // consecutive operations test
            if (isOp(i, prob) && i + 1 < prob.length && isOp(i + 1, prob)) {
                // no consecutive operations
                serveError(error.operation);
                return false;
            }
        }
        // if nothing returns false
        return true;
    }
};

// Evaluate problem string by request to Eval API
function evalReq() {
    // test for internet connection
    if (window.navigator.onLine === true) {
        // debounce to prevent excessive requests
        clearTimeout(debounceRequest);
        debounceRequest = setTimeout(() => {
            // debounced
            clearTimeout(debounceRequest);

            // select answer field
            const answer = document.querySelector('#answer-field');
            
            // clear previous answer
            answer.innerText = '';
            
            // get problem string
            const problem = document.querySelector('#problem-field').value;
            
            // validate problem
            let valid = false;
            
            // run empty string test
            if (problem === null || problem.length === 0) {

                // empty string
                serveError(error.emptyString);

            } else {
                
                // non-empty string

                // run parenthesis test
                if (validParen(problem)) {
                    // valid parenthesis
                    
                    // run operation test
                    if (validOp(problem)) {
                        // add further validation here; before "valid = true"
                        valid = true;
                    }
                }
            }

            // make request if valid
            if (valid) {
                // 3 cases of request
                    // Case 1: responds with answer
                    // Case 2: responds with error
                    // Case 3: connection timeout

                // start loader
                startLoader();

                // start connection timeout
                const root = 'https://eval-api-8ece55f267c1.herokuapp.com/';
                const controller = new AbortController();
                let loaderDelay = {};
                const connectionTimeout = setTimeout(() => {
                    // cleanup cache
                    clearTimeout(connectionTimeout);
                    const delay = setTimeout(() => {

                        // Case 3: Connection timeout

                        // abort request
                        controller.abort();

                        // cleanup cache
                        clearTimeout(loaderDelay);
                        clearTimeout(delay);
                        // stop loader after a single duration
                        stopLoader();
                        // focus on input field
                        problemField.focus();
                        // update answer field with error message
                        serveError(error.connectionTimeout);

                    }, loaderDuration)
                }, requestDuration - loaderDuration);

                // fetch request to Eval API
                try {
                    fetch(`${root}/eval/answer`, {
                        method: 'POST',
                        signal: controller.signal,
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ problem: problem, use_logs: "0" })
                    })
                    .then(response => response.json())
                    .then((data) => {
                        // cancel connection timeout
                        clearTimeout(connectionTimeout);
                        loaderDelay = setTimeout(() => {

                            // Case 1: responds with answer

                            // cleanup cache
                            clearTimeout(loaderDelay);
                            // stop loader after a single duration
                            stopLoader();
                            // focus on output field
                            answerField.focus();
                            // update answer field with answer in response
                            answer.innerText = data;

                        }, loaderDuration);
                    })
                } catch {
                    // cancel connection timeout
                    clearTimeout(connectionTimeout);
                    loaderDelay = setTimeout(() => {

                        // Case 2: responds with error

                        // cleanup cache
                        clearTimeout(loaderDelay);
                        // stop loader after a single duration
                        stopLoader();
                        // focus on input field
                        problemField.focus();
                        // update answer field with error message
                        serveError(error.connectionFailed);

                    }, loaderDuration);
                }
            }

        }, 1000);


    } else {
        // highlight connection status
        connectionStatusDisplay.style.color = '#a90d00';
        setTimeout(() => {
            connectionStatusDisplay.style.color = '#2fff2f';
        }, 1000);
    }
};

function searchReq() {
    if (searchField.value == null || searchField.value.length === 0) {
        // empty string
        serveError(error.emptyString);
    } else {
        const query = searchField.value.toUpperCase();
        // test for local data
        if (Object.keys(INFORMATION).length === 0) {
            // test for internet connection
            if (window.navigator.onLine === true) {
                // debounce to prevent excessive requests
                clearTimeout(debounceRequest);
                debounceRequest = setTimeout(() => {
                    // debounced
                    clearTimeout(debounceRequest);
                        
                    // start loader
                    startLoader();
        
                    // 3 cases of request
                        // Case 1: responds with answer
                        // Case 2: responds with error
                        // Case 3: connection timeout
        
                    // fetch request to Eval API
                    const root = 'https://eval-api-8ece55f267c1.herokuapp.com/';
                    const controller = new AbortController();
                    let loaderDelay = {};
                    const connectionTimeout = setTimeout(() => {
                        // cleanup cache
                        clearTimeout(connectionTimeout);
                        const delay = setTimeout(() => {
        
                            // Case 3: Connection timeout
                            
                            // abort request
                            controller.abort();
                            
                            // cleanup cache
                            clearTimeout(loaderDelay);
                            clearTimeout(delay);
                            // stop loader after a single duration
                            stopLoader();
                            // focus on input field
                            problemField.focus();
                            // update answer field with error message
                            answer.innerText = error.connectionTimeout;
        
                        }, loaderDuration)
                    }, requestDuration - loaderDuration);
        
                    try {
                        fetch(`${root}/eval/info`, {
                            method: 'GET',
                            signal: controller.signal,
                            headers: {
                                'Content-Type': 'application/json',
                            },
                        })
                        .then(response => response.json())
                        .then((data) => {
                            loaderDelay = setTimeout(() => {
        
                                // Case 1: responds with answer

                                // store in local data structure
                                INFORMATION = data;
        
                                // cleanup cache
                                clearTimeout(loaderDelay);
                                clearTimeout(connectionTimeout);
        
                                // stop loader after a single duration
                                stopLoader();
            
                                // focus on output field
                                resultContainer.focus();
            
                                // clear previous info
                                resultContainer.innerHTML = '';
        
                                // use query to search through data
                                if (query === 'INFO') {
                                    // returns all program info
        
                                    // build elements for display format
                                    const headTitle = document.createElement('h2');
                                    headTitle.innerText = 'Program Information';
                                    
                                    const constantTitle = document.createElement('h3');
                                    constantTitle.innerText = 'Constants';
                
                                    const operationTitle = document.createElement('h3');
                                    operationTitle.innerText = 'Operations';
                                    
                                    const variablesTitle = document.createElement('h3');
                                    variablesTitle.innerText = 'Valid Variables';
                
                                    const keysTitle = document.createElement('h3');
                                    keysTitle.innerText = 'Key Functions';
                
                                    // assemble and append elements to display
                                    resultContainer.appendChild(headTitle);
                                    
                                    resultContainer.appendChild(addSpace());
                                    resultContainer.appendChild(constantTitle);
                                    resultContainer.appendChild(addSpace());
                                    for (let i = 0; i < data.constants.length; i++) {
                                        const constant = document.createElement('div');
                                        constant.innerText = `Name: ${data.constants[i].name}\nSyntax: ${data.constants[i].syntax}\n\n`;
                                        resultContainer.appendChild(constant);
                                    }
                                    
                                    resultContainer.appendChild(addSpace());
                                    resultContainer.appendChild(operationTitle);
                                    resultContainer.appendChild(addSpace());
                                    for (let i = 0; i < data.operations.length; i++) {
                                        const operation = document.createElement('div');
                                        operation.innerText = `Name: ${data.operations[i].name}\nSyntax: ${data.operations[i].syntax}\n\n`;
                                        resultContainer.appendChild(operation);
                                    }
                                    
                                    resultContainer.appendChild(addSpace());
                                    resultContainer.appendChild(variablesTitle);
                                    resultContainer.appendChild(addSpace());
                                    const vars = document.createElement('div');
                                    vars.innerText = data.variables.join(', ');
                                    resultContainer.appendChild(vars);
                                    resultContainer.appendChild(addSpace());
        
                                    resultContainer.appendChild(addSpace());
                                    resultContainer.appendChild(keysTitle);
                                    resultContainer.appendChild(addSpace());
                                    for (let i = 0; i < data.key_functions.length; i++) {
                                        for (let j = 0; j < data.key_functions[i].length; j++) {
                                            const key_function = document.createElement('div');
                                            key_function.innerText = `Name: ${data.key_functions[i][j].name}\nSyntax: ${data.key_functions[i][j].syntax}\nAbout: ${data.key_functions[i][j].about}\n\n`;
                                            resultContainer.appendChild(key_function);
                                        }
                                    }
                                    resultContainer.appendChild(addSpace());
                                } else {
                                    // search for specific function
                                    if (searchType.value === 'search-type-name') {
                                        let searching = true;
                                        for (let module of data.key_functions) {
                                            for (let obj of module) {
                                                if (obj.name.toUpperCase() === query) {
                                                    // build elements for display format
                                                    const headTitle = document.createElement('h3');
                                                    headTitle.innerText = `The ${obj.name} Key Function`;
            
                                                    const key = document.createElement('div');
                                                    key.innerText = 'Keyword: ' + obj.key;
            
                                                    const syntax = document.createElement('div');
                                                    syntax.innerText = 'Syntax: ' + obj.syntax;
            
                                                    const about = document.createElement('div');
                                                    about.innerText = 'Description: ' + obj.about;
            
                                                    resultContainer.appendChild(headTitle);
                                                    resultContainer.appendChild(addSpace());
                                                    resultContainer.appendChild(key);
                                                    resultContainer.appendChild(addSpace());
                                                    resultContainer.appendChild(syntax);
                                                    resultContainer.appendChild(addSpace());
                                                    resultContainer.appendChild(about);
                                                    resultContainer.appendChild(addSpace());
            
                                                    searching = false;
                                                    break;
                                                }
                                            }
                                            if (!searching) {
                                                break;
                                            }
                                        }
    
                                        if (searching) {
                                            // data not found
                                            serveError(error.dataNotFound);
                                        }
    
                                    } else if (searchType.value === 'search-type-key') {
                                        let searching = true;
                                        for (let module of data.key_functions) {
                                            for (let obj of module) {
                                                if (obj.key.toUpperCase() === query) {
                                                    // build elements for display format
                                                    const headTitle = document.createElement('h3');
                                                    headTitle.innerText = `The ${obj.name} Key Function`;
            
                                                    const key = document.createElement('div');
                                                    key.innerText = 'Keyword: ' + obj.key;
            
                                                    const syntax = document.createElement('div');
                                                    syntax.innerText = 'Syntax: ' + obj.syntax;
            
                                                    const about = document.createElement('div');
                                                    about.innerText = 'Description: ' + obj.about;
            
                                                    resultContainer.appendChild(headTitle);
                                                    resultContainer.appendChild(addSpace());
                                                    resultContainer.appendChild(key);
                                                    resultContainer.appendChild(addSpace());
                                                    resultContainer.appendChild(syntax);
                                                    resultContainer.appendChild(addSpace());
                                                    resultContainer.appendChild(about);
                                                    resultContainer.appendChild(addSpace());
            
                                                    searching = false;
                                                    break;
                                                }
                                            }
                                            if (!searching) {
                                                break;
                                            }
                                        }
    
                                        if (searching) {
                                            // data not found
                                            serveError(error.dataNotFound);
                                        }
            
                                    } else {
                                        // data not found
                                        serveError(error.dataNotFound);
                                    }
                                }
                                
                            }, loaderDuration);
                        });
                    } catch {
                        // cancel connection timeout
                        loaderDelay = setTimeout(() => {
        
                            // Case 2: responds with error
        
                            // cleanup cache
                            clearTimeout(loaderDelay);
                            clearTimeout(connectionTimeout);
                            // stop loader after a single duration
                            stopLoader();
                            // focus on input field
                            searchField.focus();
                            // update answer field with error message
                            serveError(error.connectionFailed);
        
                        }, loaderDuration);
                    }
                }, 1000);
            } else {
                // highlight connection status
                connectionStatusDisplay.style.color = '#a90d00';
                setTimeout(() => {
                    connectionStatusDisplay.style.color = '#2fff2f';
                }, 1000);
            }
        } else {

            // use local data

            // debounce to prevent excessive requests
            clearTimeout(debounceRequest);
            debounceRequest = setTimeout(() => {
                // debounced
                clearTimeout(debounceRequest);
                    
                // focus on output field
                resultContainer.focus();

                // clear previous info
                resultContainer.innerHTML = '';

                // use query to search through data
                if (query === 'INFO') {
                    // returns all program info

                    // build elements for display format
                    const headTitle = document.createElement('h2');
                    headTitle.innerText = 'Program Information';
                    
                    const constantTitle = document.createElement('h3');
                    constantTitle.innerText = 'Constants';

                    const operationTitle = document.createElement('h3');
                    operationTitle.innerText = 'Operations';
                    
                    const variablesTitle = document.createElement('h3');
                    variablesTitle.innerText = 'Valid Variables';

                    const keysTitle = document.createElement('h3');
                    keysTitle.innerText = 'Key Functions';

                    // assemble and append elements to display
                    resultContainer.appendChild(headTitle);
                    
                    resultContainer.appendChild(addSpace());
                    resultContainer.appendChild(constantTitle);
                    resultContainer.appendChild(addSpace());
                    for (let i = 0; i < INFORMATION.constants.length; i++) {
                        const constant = document.createElement('div');
                        constant.innerText = `Name: ${INFORMATION.constants[i].name}\nSyntax: ${INFORMATION.constants[i].syntax}\n\n`;
                        resultContainer.appendChild(constant);
                    }
                    
                    resultContainer.appendChild(addSpace());
                    resultContainer.appendChild(operationTitle);
                    resultContainer.appendChild(addSpace());
                    for (let i = 0; i < INFORMATION.operations.length; i++) {
                        const operation = document.createElement('div');
                        operation.innerText = `Name: ${INFORMATION.operations[i].name}\nSyntax: ${INFORMATION.operations[i].syntax}\n\n`;
                        resultContainer.appendChild(operation);
                    }
                    
                    resultContainer.appendChild(addSpace());
                    resultContainer.appendChild(variablesTitle);
                    resultContainer.appendChild(addSpace());
                    const vars = document.createElement('div');
                    vars.innerText = INFORMATION.variables.join(', ');
                    resultContainer.appendChild(vars);
                    resultContainer.appendChild(addSpace());

                    resultContainer.appendChild(addSpace());
                    resultContainer.appendChild(keysTitle);
                    resultContainer.appendChild(addSpace());
                    for (let i = 0; i < INFORMATION.key_functions.length; i++) {
                        for (let j = 0; j < INFORMATION.key_functions[i].length; j++) {
                            const key_function = document.createElement('div');
                            key_function.innerText = `Name: ${INFORMATION.key_functions[i][j].name}\nSyntax: ${INFORMATION.key_functions[i][j].syntax}\nAbout: ${INFORMATION.key_functions[i][j].about}\n\n`;
                            resultContainer.appendChild(key_function);
                        }
                    }
                    resultContainer.appendChild(addSpace());
                } else {
                    // search for specific function
                    if (searchType.value === 'search-type-name') {
                        let searching = true;
                        for (let module of INFORMATION.key_functions) {
                            for (let obj of module) {
                                if (obj.name.toUpperCase() === query) {
                                    // build elements for display format
                                    const headTitle = document.createElement('h3');
                                    headTitle.innerText = `The ${obj.name} Key Function`;

                                    const key = document.createElement('div');
                                    key.innerText = 'Keyword: ' + obj.key;

                                    const syntax = document.createElement('div');
                                    syntax.innerText = 'Syntax: ' + obj.syntax;

                                    const about = document.createElement('div');
                                    about.innerText = 'Description: ' + obj.about;

                                    resultContainer.appendChild(headTitle);
                                    resultContainer.appendChild(addSpace());
                                    resultContainer.appendChild(key);
                                    resultContainer.appendChild(addSpace());
                                    resultContainer.appendChild(syntax);
                                    resultContainer.appendChild(addSpace());
                                    resultContainer.appendChild(about);
                                    resultContainer.appendChild(addSpace());

                                    searching = false;
                                    break;
                                }
                            }
                            if (!searching) {
                                break;
                            }
                        }

                        if (searching) {
                            // data not found
                            serveError(error.dataNotFound);
                        }

                    } else if (searchType.value === 'search-type-key') {
                        let searching = true;
                        for (let module of INFORMATION.key_functions) {
                            for (let obj of module) {
                                if (obj.key.toUpperCase() === query) {
                                    // build elements for display format
                                    const headTitle = document.createElement('h3');
                                    headTitle.innerText = `The ${obj.name} Key Function`;

                                    const key = document.createElement('div');
                                    key.innerText = 'Keyword: ' + obj.key;

                                    const syntax = document.createElement('div');
                                    syntax.innerText = 'Syntax: ' + obj.syntax;

                                    const about = document.createElement('div');
                                    about.innerText = 'Description: ' + obj.about;

                                    resultContainer.appendChild(headTitle);
                                    resultContainer.appendChild(addSpace());
                                    resultContainer.appendChild(key);
                                    resultContainer.appendChild(addSpace());
                                    resultContainer.appendChild(syntax);
                                    resultContainer.appendChild(addSpace());
                                    resultContainer.appendChild(about);
                                    resultContainer.appendChild(addSpace());

                                    searching = false;
                                    break;
                                }
                            }
                            if (!searching) {
                                break;
                            }
                        }

                        if (searching) {
                            // data not found
                            serveError(error.dataNotFound);
                        }

                    } else {
                        // data not found
                        serveError(error.dataNotFound);
                    }
                }
            }, 1000);
        }
    }
};

function addSpace() {
    const space = document.createElement('br');
    return space;
};

// display initial status
if (window.navigator.onLine === true) {
    // connected
    connectionStatusDisplay.innerText = connectionStatus[1];
} else {
    // disconnected
    connectionStatusDisplay.innerText = connectionStatus[0];
}

// user controls

// update status on connection events
window.addEventListener('online', () => {
    // connected
    connectionStatusDisplay.innerText = connectionStatus[1];
});

window.addEventListener('offline', () => {
    // disconnected
    connectionStatusDisplay.innerText = connectionStatus[0];
});

evalBTN.addEventListener('click', evalReq);
document.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        evalReq();
    }
});

// search button displays program information
searchBTN.addEventListener('click', searchReq);
