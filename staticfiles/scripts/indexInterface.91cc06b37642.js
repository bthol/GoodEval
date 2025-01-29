console.log('Interface Script Loaded.');

// DOM selections
const calc = document.querySelector('.calculator-background');
const nav = document.querySelector('nav');

// calculate navHeight for dynamic interface
const bh = getComputedStyle(nav).getPropertyValue('--nav-border-height');
const ch = getComputedStyle(nav).getPropertyValue('--nav-content-height');
const navHeight = Number(bh.slice(0, bh.length - 4)) * 4 + Number(ch.slice(0, ch.length - 4));

// logic for opening and closing the nav menu via the arrow
let navState = false;
const navArrow = document.querySelector('#nav-menu-arrow');
navArrow.addEventListener('click', () => {
    navState = !navState;
    if (navState === true) {
        navArrow.classList.remove('downward-arrow');
        navArrow.classList.add('upward-arrow');
        nav.style.top = '0vmin';
    } else {
        navArrow.classList.remove('upward-arrow');
        navArrow.classList.add('downward-arrow');
        nav.style.top = `-${navHeight}vmin`;
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