console.log('Interface script loaded');

function positive(group) {
    // returns the positive subgroup
    return group.filter((x) => x > 0);
};

function negative(group) {
    // returns the negative subgroup
    return group.filter((x) => x < 0);
};

function even(group) {
    // returns the even subgroup
    return group.filter((x) => {if (x % 2 === 0) {return true} else {return false}});
};

function odd(group) {
    // returns the odd subgroup
    return group.filter((x) => {if (x % 2 === 1) {return true} else {return false}});
};

function nonEmptyGroups(groupA, groupB) {
    if (groupA.length === 0) {
        // can't compare empty groups
        return 'group A is empty';
    } else {
        if (groupB.length === 0) {
            // can't compare empty groups
            return 'group B is empty';
        } else {
            // non-empty groups
            return true;
        }
    }
};

function conjunction(groupA, groupB) {
    // returns the conjunction of non-empty groups A and B
    if (nonEmptyGroups(groupA, groupB)) {
        // non-empty groups
        let conjunction = [];
        for (let i = 0; i < groupB.length; i++) {
            // each element in group B
            for (let j = 0; j < groupA.length; j++) {
                // each element in group A
                if (groupB[i] === groupA[j]) {
                    conjunction.push(groupB[i]);
                }
            }
        }
        return conjunction;
    }
};

function disjunction(groupA, groupB) {
    // returns the disjunction of non-empty groups A and B
    if (nonEmptyGroups(groupA, groupB)) {
        // non-empty groups
        let disjunction = [];
        if (groupA.length > groupB.length) {
            for (let i = 0; i < groupA.length; i++) {
                // each element in group A
                let is = false;
                for (let j = 0; j < groupB.length; j++) {
                    // each element in group B
                    if (groupA[i] === groupB[j]) {
                        is = true;
                        break;
                    }
                }
                if (!is) {
                    disjunction.push(groupA[i]);
                }
            }
        } else {
            for (let i = 0; i < groupB.length; i++) {
                // each element in group B
                let is = false;
                for (let j = 0; j < groupA.length; j++) {
                    // each element in group A
                    if (groupB[i] === groupA[j]) {
                        is = true;
                        break;
                    }
                }
                if (!is) {
                    disjunction.push(groupB[i]);
                }
            }
        }
        return disjunction;
    }
};

function isSubgroup(groupA, groupB) {
    // tests if group B is a subgroup of group A
    if (nonEmptyGroups(groupA, groupB)) {
        // non-empty groups
        const conjunct = conjunction(groupA, groupB);
        // if the conjunction of group A and Group B = Group B
        if (conjunct.length === groupB.length) {
            // Group B is a subgroup
            return true;
        } else {
            // Group B is NOT a subgroup
            return false;
        }
    }
};

function isIdenticalGroup(groupA, groupB) {
    // returns true if groupA is identical to groupB
    if (nonEmptyGroups(groupA, groupB)) {
        // non-empty groups
        const conjunct = conjunction(groupA, groupB);
        if (conjunct.length > 0) {
            // at least partial conjunction
            if (groupA.length === groupB.length) {
                // equivalent group cardinalities
                if (conjunct.length === groupA.length && conjunct.length === groupB.length) {
                    // conjunct of groups cardinality equivalent each group cardinality
                    // Identical: groups share cardinalities and all members.
                    return true;
                } else {
                    // conjunct of groups cardinality unequivalent each group cardinality
                    // Partially identical: groups share caridinality some members.
                    return 'Partially identical: groups share caridinality and some members.';
                }
            } else {
                // Unidentical: group cardinalities do not equate.
                return 'Unidentical: group cardinalities do not equate.';
            }
        } else {
            // conjunction is an empty group
            // Unidentical: groups share no members.
            return 'Unidentical: groups share no members.';
        }
    }
};

// linear operator
function translation(groupA, translate) {
    let groupB = [];
    for (let i = 0; i < groupA.length; i++) {
        groupB.push(groupA[i] + translate);
    }
    return groupB;
};

// arithmetic operators
function addition(a,b) {
    return a + b;
};

function subtraction(a,b) {
    return a - b;
};

function multiplication(a,b) {
    return a * b;
};

function division(a,b) {
    return a / b;
};

function exponentiation(a,b) {
    return Math.pow(a,b);
};

function radication(a,b) {
    return Math.pow(a,1/b);
};

// generalizes superoperation for operators with identity elements
function spropr(a, b, op, id) {
    // a = operand 1 = number operated on
    // b = operand 2 = number of operations
    // op = binary operator = function for operation
    // id = identity for operation
    // e.g.
    //  - additive identity = 0; x + 0 = x
    //  - multiplicative identity = 1; x * 1 = x
    let y = id;
    for (let i = 0; i < b; i++) {
        y = op(a, y);
    }
    return y;
};

// dynamically update form elements
const containerElement = document.querySelector('#dynamic-content-container');
function updateForm() {
    // clear previous answer
    document.querySelector('#answer-field').innerHTML = '';
    // clear previous elements
    containerElement.innerHTML = '';
    // get type data from form
    const type = document.querySelector('#operand-type').value;
    if (type === 'quantity') {
        // build elements

        // operator selector label
        const selectLabel = document.createElement('label');
        selectLabel.setAttribute('for', 'operator-type');
        selectLabel.innerText = 'Operator';
        
        // operator selection
        const select = document.createElement('select');
        select.setAttribute('id', 'operator-type');
        select.setAttribute('name', 'operator-type');
        select.setAttribute('required', 'true');
        select.setAttribute('value', 'addition');

        const option1 = document.createElement('option');
        option1.setAttribute('name', 'addition');
        option1.setAttribute('value', 'addition');
        option1.innerText = 'addition';
        select.appendChild(option1);
        
        const option2 = document.createElement('option');
        option2.setAttribute('name', 'subtraction');
        option2.setAttribute('value', 'subtraction');
        option2.innerText = 'subtraction';
        select.appendChild(option2);
        
        const option3 = document.createElement('option');
        option3.setAttribute('name', 'multiplication');
        option3.setAttribute('value', 'multiplication');
        option3.innerText = 'multiplication';
        select.appendChild(option3);
        
        const option4 = document.createElement('option');
        option4.setAttribute('name', 'division');
        option4.setAttribute('value', 'division');
        option4.innerText = 'division';
        select.appendChild(option4);
        
        const option5 = document.createElement('option');
        option5.setAttribute('name', 'exponentiation');
        option5.setAttribute('value', 'exponentiation');
        option5.innerText = 'exponentiation';
        select.appendChild(option5);
        
        const option6 = document.createElement('option');
        option6.setAttribute('name', 'radication');
        option6.setAttribute('value', 'radication');
        option6.innerText = 'radication';
        select.appendChild(option6);
        
        const option7 = document.createElement('option');
        option7.setAttribute('name', 'superaddition');
        option7.setAttribute('value', 'superaddition');
        option7.innerText = 'superaddition';
        select.appendChild(option7);
        
        const option8 = document.createElement('option');
        option8.setAttribute('name', 'supersubtraction');
        option8.setAttribute('value', 'supersubtraction');
        option8.innerText = 'supersubtraction';
        select.appendChild(option8);
        
        const option9 = document.createElement('option');
        option9.setAttribute('name', 'supermultiplication');
        option9.setAttribute('value', 'supermultiplication');
        option9.innerText = 'supermultiplication';
        select.appendChild(option9);
        
        const option10 = document.createElement('option');
        option10.setAttribute('name', 'superdivision');
        option10.setAttribute('value', 'superdivision');
        option10.innerText = 'superdivision';
        select.appendChild(option10);
        
        const option11 = document.createElement('option');
        option11.setAttribute('name', 'superexponentiation');
        option11.setAttribute('value', 'superexponentiation');
        option11.innerText = 'superexponentiation';
        select.appendChild(option11);
        
        const option12 = document.createElement('option');
        option12.setAttribute('name', 'superradication');
        option12.setAttribute('value', 'superradication');
        option12.innerText = 'superradication';
        select.appendChild(option12);

        // operand label
        const operandLabel = document.createElement('label');
        operandLabel.innerText = 'Operands';

        // operands
        const quantityA = document.createElement('input');
        quantityA.setAttribute('id', 'quantity-a');
        quantityA.setAttribute('type', 'number');
        quantityA.setAttribute('value', '1');
        quantityA.setAttribute('required', 'true');
        
        const quantityB = document.createElement('input');
        quantityB.setAttribute('id', 'quantity-b');
        quantityB.setAttribute('type', 'number');
        quantityB.setAttribute('value', '1');
        quantityB.setAttribute('required', 'true');

        // append new elements
        containerElement.appendChild(selectLabel);
        containerElement.appendChild(select);
        containerElement.appendChild(operandLabel);
        containerElement.appendChild(quantityA);
        containerElement.appendChild(quantityB);

    } else if (type === 'set') {
        // build elements

        // operator selector label
        const selectLabel = document.createElement('label');
        selectLabel.setAttribute('for', 'operator-type');
        selectLabel.innerText = 'Operator';
        
        // operator selection
        const select = document.createElement('select');
        select.setAttribute('id', 'operator-type');
        select.setAttribute('name', 'operator-type');
        select.setAttribute('required', 'true');
        select.setAttribute('value', 'addition');

        const option1 = document.createElement('option');
        option1.setAttribute('name', 'addition');
        option1.setAttribute('value', 'addition');
        option1.innerText = 'addition';
        select.appendChild(option1);
        
        const option2 = document.createElement('option');
        option2.setAttribute('name', 'subtraction');
        option2.setAttribute('value', 'subtraction');
        option2.innerText = 'subtraction';
        select.appendChild(option2);
        
        const option3 = document.createElement('option');
        option3.setAttribute('name', 'multiplication');
        option3.setAttribute('value', 'multiplication');
        option3.innerText = 'multiplication';
        select.appendChild(option3);

        const option4 = document.createElement('option');
        option4.setAttribute('name', 'division');
        option4.setAttribute('value', 'division');
        option4.innerText = 'division';
        select.appendChild(option4);
        
        // operand label
        const operandLabel = document.createElement('label');
        operandLabel.innerText = 'Set Properties';

        const maximum = document.createElement('input');
        maximum.setAttribute('id', 'maximum-set-value');
        maximum.setAttribute('type', 'number');
        maximum.setAttribute('placeholder', 'maximum');
        maximum.setAttribute('required', 'true');
        
        const minimum = document.createElement('input');
        minimum.setAttribute('id', 'minimum-set-value');
        minimum.setAttribute('type', 'number');
        minimum.setAttribute('placeholder', 'minimum');
        minimum.setAttribute('required', 'true');
        
        const step = document.createElement('input');
        step.setAttribute('id', 'step-set-value');
        step.setAttribute('type', 'number');
        step.setAttribute('placeholder', 'step');
        step.setAttribute('min', '1');
        step.setAttribute('required', 'true');

        // append elements
        containerElement.appendChild(selectLabel);
        containerElement.appendChild(select);
        containerElement.appendChild(operandLabel);
        containerElement.appendChild(maximum);
        containerElement.appendChild(minimum);
        containerElement.appendChild(step);
    } 
    // } else if (type === 'codomain') {
    //     // build elements

    //     // A
    //     const labelA = document.createElement('label');
    //     labelA.setAttribute('for', 'number-type-domain-a');
    //     labelA.innerText = 'Domain A';

    //     const selectA = document.createElement('select');
    //     selectA.setAttribute('id', 'number-type-group-a');
    //     selectA.setAttribute('name', 'number-type-group-a');
    //     selectA.setAttribute('required', 'true');

    //     const option1A = document.createElement('option');
    //     option1A.setAttribute('name', 'integers');
    //     option1A.setAttribute('value', 'integers');
    //     option1A.innerText = 'Integers';
    //     selectA.appendChild(option1A);
        
    //     const option2A = document.createElement('option');
    //     option2A.setAttribute('name', 'rational');
    //     option2A.setAttribute('value', 'rational');
    //     option2A.innerText = 'Rational';
    //     selectA.appendChild(option2A);

    //     const maximumA = document.createElement('input');
    //     maximumA.setAttribute('id', 'maximum-domain-a');
    //     maximumA.setAttribute('type', 'number');
    //     maximumA.setAttribute('placeholder', 'maximum');
    //     maximumA.setAttribute('required', 'true');
        
    //     const minimumA = document.createElement('input');
    //     minimumA.setAttribute('id', 'minimum-domain-a');
    //     minimumA.setAttribute('type', 'number');
    //     minimumA.setAttribute('placeholder', 'minimum');
    //     minimumA.setAttribute('required', 'true');

    //     // B
    //     const labelB = document.createElement('label');
    //     labelB.setAttribute('for', 'number-type-domain-b');
    //     labelB.innerText = 'Domain B';

    //     const selectB = document.createElement('select');
    //     selectB.setAttribute('id', 'number-type-group-b');
    //     selectB.setAttribute('name', 'number-type-group-b');
    //     selectB.setAttribute('required', 'true');

    //     const option1B = document.createElement('option');
    //     option1B.setAttribute('name', 'integers');
    //     option1B.setAttribute('value', 'integers');
    //     option1B.innerText = 'Integers';
    //     selectB.appendChild(option1B);
        
    //     const option2B = document.createElement('option');
    //     option2B.setAttribute('name', 'rational');
    //     option2B.setAttribute('value', 'rational');
    //     option2B.innerText = 'Rational';
    //     selectB.appendChild(option2B);
        
    //     const maximumB = document.createElement('input');
    //     maximumB.setAttribute('id', 'minimum-domain-b');
    //     maximumB.setAttribute('type', 'number');
    //     maximumB.setAttribute('placeholder', 'minimum');
    //     maximumB.setAttribute('required', 'true');

    //     const minimumB = document.createElement('input');
    //     minimumB.setAttribute('id', 'minimum-domain-b');
    //     minimumB.setAttribute('type', 'number');
    //     minimumB.setAttribute('placeholder', 'minimum');
    //     minimumB.setAttribute('required', 'true');

    //     // append elements
    //     containerElement.appendChild(labelA);
    //     containerElement.appendChild(selectA);
    //     containerElement.appendChild(maximumA);
    //     containerElement.appendChild(minimumA);
        
    //     containerElement.appendChild(labelB);
    //     containerElement.appendChild(selectB);
    //     containerElement.appendChild(maximumB);
    //     containerElement.appendChild(minimumB);
    // }
};
updateForm();
document.querySelector('#operand-type').addEventListener('change', updateForm);

// operate button click
document.querySelector('#operate-button').addEventListener('click', (event) => {
    // prevent default to prevent page refresh
    event.preventDefault();

    // clear previous answer
    const answerField = document.querySelector('#answer-field');
    answerField.innerHTML = '';

    // get operand type from select element
    const operandType = document.querySelector('#operand-type').value;

    // get operator type from select element
    const operatorType = document.querySelector('#operator-type').value;

    // calculate answer
    let answer = 0;
    if (operandType === 'quantity') {
        // get quantities
        const a = Number(document.querySelector('#quantity-a').value);
        const b = Number(document.querySelector('#quantity-b').value);

        // binary operators (arithmetic)
        if (operatorType === 'addition') {
            answer = addition(a,b);
        } else if (operatorType === 'subtraction') {
            answer = subtraction(a,b);
        } else if (operatorType === 'multiplication') {
            answer = multiplication(a,b);
        } else if (operatorType === 'division') {
            answer = division(a,b);
        } else if (operatorType === 'exponentiation') {
            answer =exponentiation(a,b);
        } else if (operatorType === 'radication') {
            answer = radication(a,b);
        
        // superoperators
        } else if (operatorType === 'superaddition') {
            answer = spropr(a,b,addition,0);
        } else if (operatorType === 'supersubtraction') {
            answer = spropr(a,b,subtraction,0);
        } else if (operatorType === 'supermultiplication') {
            answer = spropr(a,b,multiplication,1);
        } else if (operatorType === 'superdivision') {
            answer = spropr(a,b,division,1);
        } else if (operatorType === 'superexponentiation') {
            answer = spropr(a,b,exponentiation,1);
        } else if (operatorType === 'superradication') {
            answer = spropr(a,b,radication,1);
        }

        // display answer
        document.querySelector('#answer-field').innerText = `${answer}`;

    } else if (operandType === 'set') {
        // get set properties
        const minimum = Number(document.querySelector('#minimum-set-value').value);
        const maximum = Number(document.querySelector('#maximum-set-value').value);
        const step = Number(document.querySelector('#step-set-value').value);

        // build set
        let set = [];
        if (step > 0) {
            for (let i = minimum; i <= maximum; i += step) {
                set.push(i);
            }
        }

        // test for and run operation
        if (operatorType === 'addition') {

            if (set.length > 1) {
                // initialize with identity element
                answer = 0;
                // operate on set and assign to answer variable
                for (let i = 0; i < set.length; i++) {
                    answer = addition(answer,set[i]);
                }
            } else if (set.length === 1) {
                // assign singleton set to answer
                answer = set[0];
            } else {
                // values less than 1; empty set
                answer = 0;
            }

        } else if (operatorType === 'subtraction') {

            if (set.length > 1) {
                // initialize with first element in list
                answer = set[0];
                // operate on set and assign to answer variable
                for (let i = 1; i < set.length; i++) {
                    answer = subtraction(answer,set[i]);
                }
            } else if (set.length === 1) {
                // assign singleton set to answer
                answer = set[0];
            } else {
                // values less than 1; empty set
                answer = 0;
            }

        } else if (operatorType === 'multiplication') {

            if (set.length > 1) {
                // initialize with identity element
                answer = 1;
                // operate on set and assign to answer variable
                for (let i = 0; i < set.length; i++) {
                    answer = multiplication(answer,set[i]);
                }
            } else if (set.length === 1) {
                // assign singleton set to answer
                answer = set[0];
            } else {
                // values less than 1; empty set
                answer = 0;
            }

        } else if (operatorType === 'division') {

            if (set.length > 1) {
                // initialize with first element in list
                answer = set[0];
                // operate on set in order and assign to answer variable
                for (let i = 1; i < set.length; i++) {
                    answer = division(answer,set[i]);
                }
            } else if (set.length === 1) {
                // assign singleton set to answer
                answer = set[0];
            } else {
                // values less than 1; empty set
                answer = 0;
            }

        }

        // display answer
        answerField.innerHTML = `<div>${answer}</div>`;

        // display set
        const setElement = document.createElement('div');
        setElement.innerText = set.toString();
        answerField.appendChild(setElement);

    } else if (operandType === 'codomain') {
        // get domain properties for domain A
        const numberTypeA = document.querySelector('#number-type-domain-a').value;
        const minimumA = Number(document.querySelector('#minimum-domain-a').value);
        const maximumA = Number(document.querySelector('#maximum-domain-a').value);
        
        // get domain properties for domain B
        const numberTypeB = document.querySelector('#number-type-domain-b').value;
        const minimumB = Number(document.querySelector('#minimum-domain-b').value);
        const maximumB = Number(document.querySelector('#maximum-domain-b').value);

        // use properties to structure data as a domain

        // build domain A
        let domainA = [];
        if (numberTypeA === 'integers') {
            for (let i = minimumA; i < maximumA; i++) {
                domainA.push(i);
            }
        } else if (numberTypeA === 'rational') {
            for (let i = minimumA; i < maximumA; i = i + 0.001) {
                domainA.push(i);
            }
        }

        // build domain b
        let domainB = [];
        if (numberTypeB === 'integers') {
            for (let i = minimumB; i < maximumB; i++) {
                domainB.push(i);
            }
        } else if (numberTypeB === 'rational') {
            for (let i = minimumB; i < maximumB; i = i + 0.001) {
                domainB.push(i);
            }
        }

        // // linear operators
        // if (operatorType === '') {
        //     // example of linear operator being assigned to "answer" variable
        // }

        // display answer
        document.querySelector('#answer-field').innerText = `${answer}`;

    }
});