console.log('Interface Script Loaded.');

// DOM selections
const calc = document.body.querySelector('.calculator-background');
const nav = document.body.querySelector('nav');
const themeSelect = document.body.querySelector('#select-theme');
const hstPanelTest = document.body.querySelector('#history-panel');
const navArrowContainer = document.body.querySelector('#nav-menu-arrow');
const arrowNav = document.body.querySelector('#nav-arrow');

// calculate navHeight for dynamic interface
let navContentHeight = window.getComputedStyle(document.querySelector('nav')).getPropertyValue('--nav-content-height');
navContentHeight = Number(navContentHeight.substring(0, navContentHeight.length - 2));

let navBorderHeight = window.getComputedStyle(document.querySelector('nav')).getPropertyValue('--nav-border-height');
navBorderHeight = Number(navBorderHeight.substring(0, navBorderHeight.length - 2));

const navHeight = navContentHeight + navBorderHeight * 4;
let navState = false;

// logic for opening and closing the nav menu via the arrow
navArrowContainer.addEventListener('click', () => {
    if (window.getComputedStyle(hstPanelTest).getPropertyValue('opacity') === '0') {
        navState = !navState;
        if (navState === true) {
            // orientation
            navArrowContainer.classList.remove('downward-arrow');
            navArrowContainer.classList.add('upward-arrow');
            // animation
            arrowNav.classList.remove('downward-arrow-anim');
            arrowNav.classList.add('upward-arrow-anim');
            nav.style.top = '0px';
        } else {
            // orientation
            navArrowContainer.classList.remove('upward-arrow');
            navArrowContainer.classList.add('downward-arrow');
            // animation
            arrowNav.classList.remove('upward-arrow-anim');
            arrowNav.classList.add('downward-arrow-anim');
            nav.style.top = `-${navHeight}px`;
        }
    }
});

// handle arrow animation in relation to history panel display
navArrowContainer.addEventListener('mouseover', () => {
    if (window.getComputedStyle(hstPanelTest).getPropertyValue('opacity') === '1') {
        arrowNav.classList.remove('downward-arrow-anim');
        arrowNav.classList.remove('upward-arrow-anim');
        navArrowContainer.style.cursor = 'default';
    } else {
        navArrowContainer.style.cursor = 'pointer';
        if (navState === true) {
            arrowNav.classList.add('upward-arrow-anim');
        } else {
            arrowNav.classList.add('downward-arrow-anim');
        }
    }
});

// themes for Calculator
function setThemeModern() {
    calc.classList.remove('color-theme-2');
    calc.classList.remove('color-theme-3');
    calc.classList.remove('color-theme-4');
    calc.classList.add('color-theme-1');
};

function setThemeRetro() {
    calc.classList.remove('color-theme-1');
    calc.classList.remove('color-theme-3');
    calc.classList.remove('color-theme-4');
    calc.classList.add('color-theme-2');
};

function setThemeSleek() {
    calc.classList.remove('color-theme-1');
    calc.classList.remove('color-theme-2');
    calc.classList.remove('color-theme-4');
    calc.classList.add('color-theme-3');
};

function setThemeUmbral() {
    calc.classList.remove('color-theme-1');
    calc.classList.remove('color-theme-2');
    calc.classList.remove('color-theme-3');
    calc.classList.add('color-theme-4');
};

themeSelect.addEventListener('change', () => {
    if (themeSelect.value === 'modern-theme') {
        setThemeModern();
    } else if (themeSelect.value === 'retro-theme') {
        setThemeRetro();
    } else if (themeSelect.value === 'sleek-theme') {
        setThemeSleek();
    } else if (themeSelect.value === 'umbral-theme') {
        setThemeUmbral();
    }
});

// responsive calculator scaling

// viewport dimensional reference
let vh = window.innerHeight; // viewport height
let vw = window.innerWidth; // viewport width

// initial scale value
let scale = 1;

// calculator dimensional reference

// fixed initial calculator height
let cHeight = window.getComputedStyle(document.querySelector('.calculator-background')).getPropertyValue('height');
cHeight = Number(cHeight.substring(0, cHeight.length - 2)); // px

// fixed initial calculator width
let cWidth = window.getComputedStyle(document.querySelector('.calculator-background')).getPropertyValue('width');
cWidth = Number(cWidth.substring(0, cWidth.length - 2)); // px

// dynamical calculator height
let ch = cHeight; // px

// dynamical calculator width
let cw = cWidth; // px

// scaling function
function scaleIt() {
    // determine amount by which to scale calculator using viewport dimensions

    // update viewport dimensions
    vw = window.innerWidth;
    vh = window.innerHeight;

    // update calculator dimensions
    cw = cWidth * scale; // px
    ch = cHeight * scale; // px

    // compare values

    const hDiff = vh - ch;
    if (hDiff !== 0) {
        // is diff in height
        const wDiff = vw - cw;
        if (wDiff !== 0) {
            // is diff in width

            // max scale for height
            const hScale = (ch + hDiff) / cHeight;

            // max scale for width
            const wScale = (cw + wDiff) / cWidth;
            
            // both positive
            if (hDiff > 0 && wDiff > 0) {
                // identify smaller scale
                if (hScale < wScale) {
                    // use height scale
                    scale = hScale;
                    // set the new scale attribute to trigger style re-render
                    document.body.setAttribute('style', `--scale-calc-size: ${scale * cHeight}px`);
                } else if (hScale > wScale) {
                    // use width scale
                    scale = wScale;
                    // set the new scale attribute to trigger style re-render
                    document.body.setAttribute('style', `--scale-calc-size: ${scale * cHeight}px`);
                } else {
                    // use either bc they are the same
                    scale = hScale;
                    // set the new scale attribute to trigger style re-render
                    document.body.setAttribute('style', `--scale-calc-size: ${scale * cHeight}px`);
                }

            // both negative
            } else if (hDiff < 0 && wDiff < 0) {
                // identify smaller scale
                if (hScale > wScale) {
                    // use width scale
                    scale = wScale;
                    // set the new scale attribute to trigger style re-render
                    document.body.setAttribute('style', `--scale-calc-size: ${scale * cHeight}px`);
                } else if (hScale < wScale) {
                    // use height scale
                    scale = hScale;
                    // set the new scale attribute to trigger style re-render
                    document.body.setAttribute('style', `--scale-calc-size: ${scale * cHeight}px`);
                } else {
                    // use either bc they are the same
                    scale = hScale;
                    // set the new scale attribute to trigger style re-render
                    document.body.setAttribute('style', `--scale-calc-size: ${scale * cHeight}px`);
                }
            
            // negative height
            } else if (hDiff < 0 && wDiff > 0) {
                // scale to max height
                scale = hScale;
                // set the new scale attribute to trigger style re-render
                document.body.setAttribute('style', `--scale-calc-size: ${scale * cHeight}px`);
                
            // negative width
            } else if (hDiff > 0 && wDiff < 0) {
                // scale to max width
                scale = wScale;
                // set the new scale attribute to trigger style re-render
                document.body.setAttribute('style', `--scale-calc-size: ${scale * cHeight}px`);
            }
        
        } else {
            // no difference of width
            if (hDiff < 0) {
                // scale down from max width by height
                scale = (ch + hDiff) / cHeight;
                // set the new scale attribute to trigger style re-render
                document.body.setAttribute('style', `--scale-calc-size: ${scale * cHeight}px`);
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
            document.body.setAttribute('style', `--scale-calc-size: ${scale * cHeight}px`);
        } // no difference of height and positive difference of width = overscaling height
    }
};

function conditionalRender() {
    // adjust view by breakpoints
    const selectThemeContainer = document.body.querySelector('#select-theme-container');
    if (window.innerWidth < 712) {
        if (selectThemeContainer.firstElementChild.getAttributeNode('for') !== null) {
            // first child is label tag
            // remove label
            selectThemeContainer.removeChild(selectThemeContainer.firstElementChild);
        }
    } else {
        if (selectThemeContainer.firstElementChild.id === 'select-theme') {
            // first child is select tag = no label element
            // add label
            const label = document.createElement('label');
            label.setAttribute('for', 'select-theme');
            label.innerText = 'Theme';
            selectThemeContainer.prepend(label);
        }
    }
};

// debounce functions
let debounceCache = {};
function debounce(funct, defer) {
    clearTimeout(debounceCache);
    debounceCache = setTimeout(() => {
        clearTimeout(debounceCache);
        funct();
    }, defer)
};

let debounceCache2 = {};
function debounce2(funct, defer) {
    clearTimeout(debounceCache2);
    debounceCache2 = setTimeout(() => {
        clearTimeout(debounceCache2);
        funct();
    }, defer)
};

// call functions on loadtime
conditionalRender();
scaleIt();

// dynamically update scale attribute
window.addEventListener('resize', () => {
    debounce(conditionalRender, 10);
    debounce2(scaleIt, 5);
});