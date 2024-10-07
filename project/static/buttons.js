console.log("linked JavaScript");
const body = document.querySelector('#body');

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