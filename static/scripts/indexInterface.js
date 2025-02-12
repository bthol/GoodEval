console.log('Interface Script Loaded.');

// DOM selections
const calc = document.querySelector('.calculator-background');
const nav = document.querySelector('nav');

// calculate navHeight for dynamic interface
let navContentHeight = window.getComputedStyle(document.querySelector('nav')).getPropertyValue('--nav-content-height');
navContentHeight = Number(navContentHeight.substring(0, navContentHeight.length - 2));

let navBorderHeight = window.getComputedStyle(document.querySelector('nav')).getPropertyValue('--nav-border-height');
navBorderHeight = Number(navBorderHeight.substring(0, navBorderHeight.length - 2));

const navHeight = navContentHeight + navBorderHeight * 4;
let navState = false;

// logic for opening and closing the nav menu via the arrow
const navArrow = document.querySelector('#nav-menu-arrow');
navArrow.addEventListener('click', () => {
    navState = !navState;
    if (navState === true) {
        navArrow.classList.remove('downward-arrow');
        navArrow.classList.add('upward-arrow');
        nav.style.top = '0px';
    } else {
        navArrow.classList.remove('upward-arrow');
        navArrow.classList.add('downward-arrow');
        nav.style.top = `-${navHeight}px`;
    }
});

// theme buttons for Calculator
const btnModern = document.querySelector(`#modern-theme`);
function setThemeModern() {
    calc.classList.remove("color-theme-2");
    calc.classList.remove("color-theme-3");
    calc.classList.remove("color-theme-4");
    calc.classList.add("color-theme-1");
};
btnModern.addEventListener("click", setThemeModern);

const btnRetro = document.querySelector(`#retro-theme`);
function setThemeRetro() {
    calc.classList.remove("color-theme-1");
    calc.classList.remove("color-theme-3");
    calc.classList.remove("color-theme-4");
    calc.classList.add("color-theme-2");
};
btnRetro.addEventListener("click", setThemeRetro);

const btnSleek = document.querySelector(`#sleek-theme`);
function setThemeSleek() {
    calc.classList.remove("color-theme-1");
    calc.classList.remove("color-theme-2");
    calc.classList.remove("color-theme-4");
    calc.classList.add("color-theme-3");
};
btnSleek.addEventListener("click", setThemeSleek);

const btnUmbral = document.querySelector(`#umbral-theme`);
function setThemeUmbral() {
    calc.classList.remove("color-theme-1");
    calc.classList.remove("color-theme-2");
    calc.classList.remove("color-theme-3");
    calc.classList.add("color-theme-4");
};
btnUmbral.addEventListener("click", setThemeUmbral);

// responsive calculator scaling

// initial scale value (should be 1; included in case of change)
let scale = Number(window.getComputedStyle(document.body).getPropertyValue('--scale-calc-size'));

// viewport dimensional reference
let vw = window.innerWidth; // viewport width
let vh = window.innerHeight; // viewport height

// calculator dimensional reference
// initial calculator height
let cHeight = window.getComputedStyle(document.querySelector('.calculator-background')).getPropertyValue('height');
cHeight = Number(cHeight.substring(0, cHeight.length - 2)); // px

// initial calculator width
let cWidth = window.getComputedStyle(document.querySelector('.calculator-background')).getPropertyValue('width');
cWidth = Number(cWidth.substring(0, cWidth.length - 2)); // px

// dynamical height and width for scaling calculator
// leave cHeight and cWidth unscaled to prevent double scaling
let ch = cHeight * scale; // px
let cw = cWidth * scale; // px

// scaling function
function scaleIt() {
    // determine amount by which to scale calculator using viewport dimensions
    // update scale value
    scale = Number(window.getComputedStyle(document.body).getPropertyValue('--scale-calc-size'));

    // update viewport dimensions
    vw = window.innerWidth;
    vh = window.innerHeight;

    // update calculator dimensions
    cw = (cWidth * scale) / 100 * vw; // convert vmin to px
    ch = (cHeight * scale) / 100 * vh; // convert vmin to px

    // compare differences

    const hDiff = vh - ch;
    if (hDiff !== 0) {
        // diff in height
        const wDiff = vw - cw;
        if (wDiff !== 0) {
            // diff in width

            // max scale for height
            const hScale = (ch + hDiff) / cHeight;

            // max scale for width
            const wScale = (cw + wDiff) / cWidth;
            
            // both positive
            if (hDiff > 0 && wDiff > 0) {
                // identify larger scale
                if (hScale > wScale) {
                    // use height scale
                    scale = hScale;
                    // set the new scale attribute to trigger style re-render
                    document.body.setAttribute('style', `--scale-calc-size: ${scale}`);
                    // updateNavHeight();
                } else if (hScale < wScale) {
                    // use width scale
                    scale = wScale;
                    // set the new scale attribute to trigger style re-render
                    document.body.setAttribute('style', `--scale-calc-size: ${scale}`);
                    // updateNavHeight();
                } else {
                    // use either bc they are the same
                    scale = hScale;
                    // set the new scale attribute to trigger style re-render
                    document.body.setAttribute('style', `--scale-calc-size: ${scale}`);
                    // updateNavHeight();
                }

            // both negative
            } else if (hDiff < 0 && wDiff < 0) {
                // identify smaller scale
                if (hScale > wScale) {
                    // use width scale
                    scale = wScale;
                    // set the new scale attribute to trigger style re-render
                    document.body.setAttribute('style', `--scale-calc-size: ${scale}`);
                    // updateNavHeight();
                } else if (hScale < wScale) {
                    // use height scale
                    scale = hScale;
                    // set the new scale attribute to trigger style re-render
                    document.body.setAttribute('style', `--scale-calc-size: ${scale}`);
                    // updateNavHeight();
                } else {
                    // use either bc they are the same
                    scale = hScale;
                    // set the new scale attribute to trigger style re-render
                    document.body.setAttribute('style', `--scale-calc-size: ${scale}`);
                    // updateNavHeight();
                }
            
            // negative height
            } else if (hDiff < 0 && wDiff > 0) {
                // scale to max height
                scale = hScale;
                // set the new scale attribute to trigger style re-render
                document.body.setAttribute('style', `--scale-calc-size: ${scale}`);
                // updateNavHeight();
                
            // negative width
            } else if (hDiff > 0 && wDiff < 0) {
                // scale to max height
                scale = wScale;
                // set the new scale attribute to trigger style re-render
                document.body.setAttribute('style', `--scale-calc-size: ${scale}`);
                // updateNavHeight();
            }
        
        } else {
            // no difference of width
            if (hDiff < 0) {
                // scale down from max width by height
                scale = (ch + hDiff) / cHeight;
                // set the new scale attribute to trigger style re-render
                document.body.setAttribute('style', `--scale-calc-size: ${scale}`);
                // updateNavHeight();
            } // no difference of width and positive difference of height = overscaling width
        }
        
    } else {
        // no difference of height = test difference of width
        const wDiff = vw - cw;
        if (wDiff < 0) {
            // there is a negative difference of width (positive = scale up; negative = scale down)
            // scale down from max height by width
            scale = (cw + wDiff) / cWidth;
            // set the new scale attribute to trigger style re-render
            document.body.setAttribute('style', `--scale-calc-size: ${scale}`);
            // updateNavHeight();
        } // no difference of height and positive difference of width = overscaling height
    }
};
scaleIt();

// general purpose debounce
let debounceCache = {};
function debounce(funct, defer) {
    clearTimeout(debounceCache);
    debounceCache = setTimeout(() => {
        clearTimeout(debounceCache);
        funct();
    }, defer)
};

// dynamically update scale attribute
window.addEventListener('resize', () => debounce(scaleIt, 10));