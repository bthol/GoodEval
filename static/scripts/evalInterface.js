console.log('Interface Logic Script Loaded.');

function addDot() {
    const dot = document.createElement('div');
    dot.classList.add('elipses-dot');
    document.querySelector('.elipses-container').appendChild(dot);
};

function removeDots() {
    document.querySelector('.elipses-container').innerHTML = '';
};

let interval = {};
let intervalCount = 1;

function runAnimation() {
    addDot();
    clearInterval(interval);
    interval = setInterval(() => {
        if (intervalCount < 8) {
            addDot();
            intervalCount += 1;
        } else {
            clearInterval(interval);
            intervalCount = 1;
            setTimeout(() => {
                removeDots();
                runAnimation();
            }, 600);
        }
    }, 525);
};
runAnimation();