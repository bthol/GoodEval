// The Numberfall Effect Module
console.log('Numberfall script loaded');

// parameters
const colNum = 20; // number of columns for numbers
const fallTime = 151; // milliseconds for drop to fall to bottom of screen
const maxDrops = 100; // maximum number of drops added per fallTime
const dropRate = fallTime / maxDrops; // period of time between genDrop calls
const rainLast = fallTime * 2; // milliseconds duration of window for numberfall effect

// parameter reference

// dropRate minimum = 1
// maxDrops minimum = 2
// fallTime minimum = 2
// rainLast minimum = fallTime

// adjust rainlast by multiplying falltime

// dropRate = fallTime => nthDrop = 1
// dropRate > fallTime => nthDrop = 1 while falling and 0 after fall of last and before drop of next


// pallete for number colors
const dropPallete = ['rgb(0, 128, 0)', 'rgb(0, 191, 0)', 'rgb(10, 255, 10)'];

// column positions
const columns = [];
const colWidth = 100 / (colNum + 2); // width of each column adjusted for margin
const colMiddle = colWidth * 0.5 - .5; // middle position of column minus half content width
for (let i = 0; i < colNum; i++) {
    columns.push(`${colWidth * i + colMiddle + colWidth}`);
}

// structures for animation function
const falling = [
    { transform: 'translateY(0vh)'}, // top
    { transform: 'translateY(96vh)'}, // bottom
];

const fallingOptions = {
    duration: fallTime,
    iterations: 1,
};


// state variables
let dropID = 0;
let nthDrop = 0; // number of drops at a given point in time

function genDrop() {
    // create drop element
    const drop = document.createElement('div');

    // remove cursor events + non-sectable for drops
    drop.style.pointerEvents = 'none';
    drop.style.userSelect = 'none';

    // give drop a random number (0 - 9)
    drop.innerText = Math.floor(Math.random() * 10);

    // pick number color from pallete (varies in lumosity to give sense of depth)
    drop.style.color = dropPallete[Math.floor(Math.random() * dropPallete.length)];

    // size drop for viewport
    drop.style.fontSize = '3.5em';

    // position drop at top in random column
    drop.style.position = 'absolute';
    drop.style.left = `${columns[Math.floor(Math.random() * colNum)]}vw`;
    drop.style.top = '0vh';

    // type drop for selection
    const dropIDstr = `number-drop${dropID}`;
    drop.id = dropIDstr;
    
    // add drop to "sky"
    document.body.appendChild(drop);
    nthDrop += 1;
    // console.log(nthDrop);
    
    // let the drop fall
    document.body.querySelector(`#${dropIDstr}`).animate(falling, fallingOptions);
    const cache = setTimeout(() => {
        // drop hit ground (remove it)
        document.body.querySelector(`#${dropIDstr}`).remove();
        nthDrop -= 1;
        // console.log(nthDrop);
        clearTimeout(cache);
    }, fallTime);

    // update id so unique on next drop
    dropID += 1;
};

// make it rain
function numberfall() {
    const intervalCache = setInterval(() => {
        // add a new drop
        genDrop();
    }, dropRate);
    
    setTimeout(() => {
        // stop raining
        clearInterval(intervalCache);
    }, rainLast);
};

// attach numberfall to clear button
document.querySelector('#btn-clear').addEventListener('click', numberfall);