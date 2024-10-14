console.log('String Generator Script Loaded.');

let problem = '';

// Display
const Q = document.querySelector('#screen-content');
const A = document.querySelector('#screen-answer');

Q.innerText = 'sd[[sin(100+4*((-26)+1))],1]+0.5';
A.innerText = '1';

// User Interface Control
const btns = document.querySelector('.btns');
btns.addEventListener('click', (e) => {
    // single listener on wrap element for event delegation
    if (e.target.classList[0] !== 'top-button-container' && e.target.classList[0] !== 'bottom-button-container') {
        // exclude the container elements
        const type = e.target.classList[0];
        const id = e.target.id;
        
        // reduce number of tests
        // by testing types
        // tested from largest to smallest number of members in type
        // member ids tested from most to least estimated frequency of usage
        if (type === 'numpad') {
            if (id === 'btn-num0') {
                console.log(0);
            } else if (id === 'btn-num1') {
                console.log(1);
            } else if (id === 'btn-num2') {
                console.log(2);
            } else if (id === 'btn-num3') {
                console.log(3);
            } else if (id === 'btn-num4') {
                console.log(4);
            } else if (id === 'btn-num5') {
                console.log(5);
            } else if (id === 'btn-num6') {
                console.log(6);
            } else if (id === 'btn-num7') {
                console.log(7);
            } else if (id === 'btn-num8') {
                console.log(8);
            } else if (id === 'btn-num9') {
                console.log(9);
            } else if (id === 'btn-pi') {
                console.log('pi');
            } else if (id === 'btn-euler') {
                console.log('euler');
            }

        } else if (type === 'operation') {
            if (id === 'btn-plus') {
                console.log('plus');
            } else if (id === 'btn-minus') {
                console.log('minus');
            } else if (id === 'btn-multiply') {
                console.log('multiply');
            } else if (id === 'btn-divide') {
                console.log('divide');
            } else if (id === 'btn-sign') {
                console.log('sign')
            } else if (id === 'btn-squared') {
                console.log('squared');
            } else if (id === 'btn-cubed') {
                console.log('cubed');
            } else if (id === 'btn-root') {
                console.log('square root');
            } else if (id === 'btn-absolute-value') {
                console.log('absolute value');
            }

        } else if (type === 'trigonomic') {
            if (id === 'btn-sine') {
                console.log('sine');
            } else if (id === 'btn-cosine') {
                console.log('cosine');
            } else if (id === 'btn-tangent') {
                console.log('tangent');
            } else if (id === 'btn-secant') {
                console.log('secant');
            } else if (id === 'cosecant') {
                console.log('cosecant');
            } else if (id === 'cotangent') {
                console.log('cotangent');
            }

        } else if (type === 'special') {
            if (id === 'btn-clear') {
                console.log('clear');
            } else if (id === 'btn-equals') {
                console.log('equals');
            } else if (id === 'btn-decimal') {
                console.log('decimal');
            }
        }
    }
});
