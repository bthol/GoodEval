const btnModern = document.querySelector(`#modern-theme`);
btnModern.addEventListener("click", setThemeModern);
function setThemeModern() {
    document.body.classList.remove("color-theme-2");
    document.body.classList.remove("color-theme-3");
    document.body.classList.remove("color-theme-4");
    document.body.classList.add("color-theme-1");
};
const btnRetro = document.querySelector(`#retro-theme`);
btnRetro.addEventListener("click", setThemeRetro);
function setThemeRetro() {
    document.body.classList.remove("color-theme-1");
    document.body.classList.remove("color-theme-3");
    document.body.classList.remove("color-theme-4");
    document.body.classList.add("color-theme-2");
};
const btnSleek = document.querySelector(`#sleek-theme`);
btnSleek.addEventListener("click", setThemeSleek);
function setThemeSleek() {
    document.body.classList.remove("color-theme-1");
    document.body.classList.remove("color-theme-2");
    document.body.classList.remove("color-theme-4");
    document.body.classList.add("color-theme-3");
};
const btnUmbral = document.querySelector(`#umbral-theme`);
btnUmbral.addEventListener("click", setThemeUmbral);
function setThemeUmbral() {
    document.body.classList.remove("color-theme-1");
    document.body.classList.remove("color-theme-2");
    document.body.classList.remove("color-theme-3");
    document.body.classList.add("color-theme-4");
};