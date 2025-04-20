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

let dotInterval = {};
let dotCount = 1;

function startLoader() {
    addDot();
    clearInterval(dotInterval);
    dotInterval = setInterval(() => {
        if (dotCount < 10) {
            addDot();
            dotCount += 1;
        } else {
            clearInterval(dotInterval);
            dotCount = 1;
            setTimeout(() => {
                removeDots();
                startLoader();
            }, 525);
        }
    }, 525);
};

function stopLoader() {
    removeDots();
    clearInterval(dotInterval);
    dotCount = 1;
};

// Evaluates problem string by request to Eval API
const evalBtn = document.querySelector('#evaluate-button');
evalBtn.addEventListener('click', () => {
    // select answer field
    const answer = document.querySelector('#answer-field');

    // clear previous answer
    answer.innerText = '';

    // get problem string
    const problem = document.querySelector('#problem-string').value;

    // start loader
    startLoader();

    // fetch request to Eval API with problem string JSON object in body
    // fetch("URL FOR Eval API", {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ input: problem })
    // })
    // .then(response => response.json())
    // .then((data) => {
    //     console.log(data);
    //     // update answer field with response
    //     answer.innerText = stringify(data);
    //     // stop loader
    //     stopLoader();
    // });
});