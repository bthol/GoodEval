console.log('Interface Script Loaded.');

// loader animation
function addDot() {
    const dot = document.createElement('div');
    dot.classList.add('elipses-dot');
    document.querySelector('.elipses-container').appendChild(dot);
};

function removeDots() {
    document.querySelector('.elipses-container').innerHTML = '';
};

const addRate = 45;
const removeRate = 35;
const numberOfDots = 10;
const loaderDuration = addRate * numberOfDots + removeRate;
let dotInterval = {};
let dotCount = 1;

function startLoader() {
    addDot();
    clearInterval(dotInterval);
    dotInterval = setInterval(() => {
        if (dotCount < numberOfDots) {
            addDot();
            dotCount += 1;
        } else {
            clearInterval(dotInterval);
            dotCount = 1;
            setTimeout(() => {
                removeDots();
                startLoader();
            }, removeRate);
        }
    }, addRate);
};

function stopLoader() {
    removeDots();
    clearInterval(dotInterval);
    dotCount = 1;
};

// Evaluates problem string by request to Eval API
const evalBtn = document.querySelector('#evaluate-button');
evalBtn.addEventListener('click', () => {
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
    fetch(`${root}/eval`, {
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
            answer.innerText = data.answer;
        }, loaderDuration);
    });
});