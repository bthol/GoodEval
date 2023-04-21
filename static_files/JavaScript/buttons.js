console.log("linked JavaScript");
const btnModern = document.querySelector(`#modern-theme`);
const body = document.querySelector(`#body`);
btnModern.addEventListener("click", setThemeModern);
function setThemeModern() {
    body.classList.remove("color-theme-2");
    body.classList.remove("color-theme-3");
    body.classList.remove("color-theme-4");
    body.classList.add("color-theme-1");
};
const btnRetro = document.querySelector(`#retro-theme`);
btnRetro.addEventListener("click", setThemeRetro);
function setThemeRetro() {
    body.classList.remove("color-theme-1");
    body.classList.remove("color-theme-3");
    body.classList.remove("color-theme-4");
    body.classList.add("color-theme-2");
};
const btnSleek = document.querySelector(`#sleek-theme`);
btnSleek.addEventListener("click", setThemeSleek);
function setThemeSleek() {
    body.classList.remove("color-theme-1");
    body.classList.remove("color-theme-2");
    body.classList.remove("color-theme-4");
    body.classList.add("color-theme-3");
};
const btnUmbral = document.querySelector(`#umbral-theme`);
btnUmbral.addEventListener("click", setThemeUmbral);
function setThemeUmbral() {
    body.classList.remove("color-theme-1");
    body.classList.remove("color-theme-2");
    body.classList.remove("color-theme-3");
    body.classList.add("color-theme-4");
};