console.log('Interface Script Loaded.');

// event delegation for extensible software card interface
document.querySelector('.software-card-container').addEventListener('click', (event) => {
    if (event.target.classList[0] === 'software-card-arrow') {
        const text = event.target.parentNode.querySelector('.software-card-text');
        if (text.offsetHeight === 0) {
            // hide all other text (only show text for selected card)
            document.querySelectorAll('.software-card-text').forEach((content) => {
                content.style.height = '0';
                content.parentNode.querySelector('.software-card-arrow').classList.remove('arrow-up');
                content.parentNode.querySelector('.software-card-arrow').classList.add('arrow-down');
            });
            // show text
            event.target.parentNode.querySelector('.software-card-text').style.height = 'max-content';
            // arrow faces up
            event.target.classList.remove('arrow-down');
            event.target.classList.add('arrow-up');
        } else {
            // hide text
            event.target.parentNode.querySelector('.software-card-text').style.height = '0';
            // arrow faces down
            event.target.classList.remove('arrow-up');
            event.target.classList.add('arrow-down');
        }
    }
});