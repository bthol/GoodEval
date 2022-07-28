const btnSilver = document.querySelector(`#silver-lining-theme`);
btnSilver.addEventListener("click", setThemeSilver);
function setThemeSilver() {
    document.body.classList.remove("color-theme-2");
    document.body.classList.add("color-theme-1");
};
const btnFuturo = document.querySelector(`#futuro-theme`);
btnFuturo.addEventListener("click", setThemeFuturo);
function setThemeFuturo() {
    document.body.classList.remove("color-theme-1");
    document.body.classList.add("color-theme-2");
};