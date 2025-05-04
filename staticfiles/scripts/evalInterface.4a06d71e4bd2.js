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
let displayTimout = {};

// data structures
const connectionStatus = [
    'offline',
    'online'
];

// DOM selections
const connectionStatusDisplay = document.querySelector('#connection-status');
const loader = document.querySelector('.elipses-container');

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
            
            // start loader
            startLoader();

            // select answer field
            const answer = document.querySelector('#answer-field');
        
            // clear previous answer
            answer.innerText = '';
        
            // get problem string
            const problem = document.querySelector('#problem-field').value;

            // fetch request to Eval API
            const root = 'https://eval-api-8ece55f267c1.herokuapp.com/';
            fetch(`${root}/eval/answer`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ problem: problem, use_logs: "0" })
            })
            .then(response => response.json())
            .then((data) => {
                setTimeout(() => {
                    // stop loader after a single duration
                    stopLoader();
                    // update answer field with response
                    answer.innerText = data;
                }, loaderDuration);
            });

        }, 1000);

    } else {
        // highlight connection status
        connectionStatusDisplay.style.color = '#a90d00';
        setTimeout(() => {
            connectionStatusDisplay.style.color = '#2fff2f';
        }, 1000);
    }

});