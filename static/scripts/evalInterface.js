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
