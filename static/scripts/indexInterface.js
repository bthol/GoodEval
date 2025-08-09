console.log('Interface Script Loaded.');

// event delegation for extensible software card interface
function softwareCardUpdate(event) {
    const className = event.target.classList[0];
    // if target is software arrow container or has arrow class and parent is software arrow container
    if (className === 'software-card-arrow' || className === 'arrow' && event.target.parentNode.classList[0] === 'software-card-arrow') {

        let root = event.target;

        if (className === 'arrow') {
            root = event.target.parentNode;
        }
        
        if (root.parentNode.querySelector('.software-card-text').offsetHeight === 0) {

            // hide all other text (only show text for selected card)
            document.querySelectorAll('.software-card-text').forEach((content) => {
                content.style.height = '0';
                content.parentNode.querySelector('.software-card-arrow').childNodes[0].classList.remove('arrow-up');
                content.parentNode.querySelector('.software-card-arrow').childNodes[0].classList.add('arrow-down');
            });

            // show text
            root.parentNode.querySelector('.software-card-text').style.height = 'max-content';

            // arrow faces up
            root.childNodes[0].classList.remove('arrow-down');
            root.childNodes[0].classList.add('arrow-up');

        } else {

            // hide text
            root.parentNode.querySelector('.software-card-text').style.height = '0';

            // arrow faces down
            root.childNodes[0].classList.remove('arrow-up');
            root.childNodes[0].classList.add('arrow-down');

        }

    }
}

document.querySelector('.software-card-container').addEventListener('click', softwareCardUpdate);
document.querySelector('.software-card-container').addEventListener('touchstart', softwareCardUpdate);
