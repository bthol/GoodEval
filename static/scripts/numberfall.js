console.log('Numberfall script loaded');

// parameters
const fallTime = 1000; // milliseconds to fall to bottom of screen
const maxDrops = 50; // maximum number of drops on screen at a time (maxDrops < fallTime)
const colNum = 11; // number of columns for numbers (numbers go between columns)
const rainLast = 1; //number of seconds for the duration of numberfall

// pallete for number colors
const dropPallete = ['rgb(0, 128, 0)', 'rgb(0, 191, 0)', 'rgb(10, 255, 10)'];

// column positions
const columns = [];
const colWidth = 100 / colNum;
for (let i = 1; i < colNum + 1; i++) {
    columns.push(`${colWidth * i}`);
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

function genDrop() {
    const drop = document.createElement('div');
    // give drop a random number (0 - 9)
    drop.innerText = Math.floor(Math.random() * 10);

    // pick number color from pallete (varies in lumosity to give sense of depth)
    drop.style.color = dropPallete[Math.floor(Math.random() * dropPallete.length)];

    // position drop at top in random column
    drop.style.position = 'absolute';
    drop.style.left = `${columns[Math.floor(Math.random() * colNum)]}vw`;
    drop.style.top = '0vh';

    // class drop for selection
    const dropIDstr = `number-drop${dropID}`;
    drop.id = dropIDstr;
    
    // add drop to "sky"
    document.body.appendChild(drop);

    // let the drop fall
    document.body.querySelector(`#${dropIDstr}`).animate(falling, fallingOptions);
    const cache = setTimeout(() => {
        // drop hit ground (remove it)
        document.body.querySelector(`#${dropIDstr}`).remove();
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
    }, fallTime / maxDrops );
    
    setTimeout(() => {
        clearInterval(intervalCache);
    }, rainLast * 1000);
};
numberfall(); // example of effect on load