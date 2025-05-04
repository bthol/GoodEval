console.log('Interface Script Loaded.');

// parameters
const addRate = 45;
const removeRate = 35;
const numberOfDots = 10;
const loaderDuration = addRate * numberOfDots + removeRate;

// global state variables
let dotInterval = {};
let dotCount = 1;
let debounceRequest = {};
let errorTimeout = {};

// data structures
const connectionStatus = [
    'offline',
    'online'
];

const errors = {
    emptyString: 'Invalid: empty string',
    parenthesis: 'Invalid: parenthesis'
};

// DOM selections
const connectionStatusDisplay = document.querySelector('#connection-status');
const loader = document.querySelector('.elipses-container');
const errorDisplay = document.querySelector('#error-display');

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
            setTimeout(() => {
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

// display initial status
if (window.navigator.onLine === true) {
    // connected
    connectionStatusDisplay.innerText = connectionStatus[1];
} else {
    // disconnected
    connectionStatusDisplay.innerText = connectionStatus[0];
}

// update status on connection events
window.addEventListener('online', () => {
    // connected
    connectionStatusDisplay.innerText = connectionStatus[1];
});

window.addEventListener('offline', () => {
    // disconnected
    connectionStatusDisplay.innerText = connectionStatus[0];
});

// problem string validation
function serveError(error) {
    errorDisplay.innerText = error;
    clearTimeout(errorTimeout);
    errorTimeout = setTimeout(() => {
        clearTimeout(errorTimeout);
        errorDisplay.innerText = '';
    }, 2000);
};

function validParenthesis(prob) {
    // post-validates parenthesis in prob argument
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
            serveError(errors.parenthesis);
            return false;
        } else if (parens[0] === ')') {
            // no closing paren at start
            serveError(errors.parenthesis);
            return false;
        } else if (parens[parens.length - 1] === '(') {
            // no opening paren at end
            serveError(errors.parenthesis);
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
                        serveError(errors.parenthesis);
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

// Evaluate problem string by request to Eval API
const evalBtn = document.querySelector('#evaluate-button');
evalBtn.addEventListener('click', () => {
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
            if (problem.length === 0) {

                // empty string
                serveError(errors.emptyString);

            } else {
                
                // non-empty string
                console.log('passed1');
                
                // run parenthesis test
                if (validParenthesis(problem)) {
                    // add further validation before "valid = true"
                    console.log('passed2');
                    valid = true;
                }
            }

            // make request if valid
            if (valid) {

                // start loader
                startLoader();

                // // fetch request to Eval API
                // const root = 'https://eval-api-8ece55f267c1.herokuapp.com/';
                // fetch(`${root}/eval/answer`, {
                //     method: 'POST',
                //     headers: {
                //         'Content-Type': 'application/json',
                //     },
                //     body: JSON.stringify({ problem: problem, use_logs: "0" })
                // })
                // .then(response => response.json())
                // .then((data) => {
                //     setTimeout(() => {
                //         // stop loader after a single duration
                //         stopLoader();
                //         // update answer field with response
                //         answer.innerText = data;
                //     }, loaderDuration);
                // });

            }
        }, 1000);

    } else {
        // highlight connection status
        connectionStatusDisplay.style.color = '#a90d00';
        setTimeout(() => {
            connectionStatusDisplay.style.color = '#2fff2f';
        }, 1000);
    }

});