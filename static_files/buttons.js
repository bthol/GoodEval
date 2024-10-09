console.log("linked JavaScript");
const body = document.querySelector('.body');
const nav = document.querySelector('nav');

// logic for opening and closing the nav menu via the arrow
let navState = false;
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
        nav.style.top = '-80px';
    }
});

// theme buttons for Calculator
const btnModern = document.querySelector(`#modern-theme`);
function setThemeModern() {
    body.classList.remove("color-theme-2");
    body.classList.remove("color-theme-3");
    body.classList.remove("color-theme-4");
    body.classList.add("color-theme-1");
};
btnModern.addEventListener("click", setThemeModern);

const btnRetro = document.querySelector(`#retro-theme`);
function setThemeRetro() {
    body.classList.remove("color-theme-1");
    body.classList.remove("color-theme-3");
    body.classList.remove("color-theme-4");
    body.classList.add("color-theme-2");
};
btnRetro.addEventListener("click", setThemeRetro);

const btnSleek = document.querySelector(`#sleek-theme`);
function setThemeSleek() {
    body.classList.remove("color-theme-1");
    body.classList.remove("color-theme-2");
    body.classList.remove("color-theme-4");
    body.classList.add("color-theme-3");
};
btnSleek.addEventListener("click", setThemeSleek);

const btnUmbral = document.querySelector(`#umbral-theme`);
function setThemeUmbral() {
    body.classList.remove("color-theme-1");
    body.classList.remove("color-theme-2");
    body.classList.remove("color-theme-3");
    body.classList.add("color-theme-4");
};
btnUmbral.addEventListener("click", setThemeUmbral);
