console.log('Interface script loaded');

function nonEmptyDomains(domainA, domainB) {
    if (domainA.length !== 0 && domainB !== 0) {
        return true;
    } else {
        return false;
    }
};

// logical operators on codomains
function conjunction(domainA, domainB) {
    // returns the conjunction of non-empty groups A and B
    if (nonEmptyDomains(domainA, domainB)) {
        // non-empty groups
        let conjunction = [];
        for (let i = 0; i < domainB.length; i++) {
            // each element in group B
            for (let j = 0; j < domainA.length; j++) {
                // each element in group A
                if (domainB[i] === domainA[j]) {
                    conjunction.push(domainB[i]);
                }
            }
        }
        return conjunction;
    }
};

function disjunction(domainA, domainB) {
    // returns the disjunction of non-empty groups A and B
    if (nonEmptyDomains(domainA, domainB)) {
        // non-empty groups
        let disjunction = [];
        if (domainA.length > domainB.length) {
            for (let i = 0; i < domainA.length; i++) {
                // each element in group A
                let is = false;
                for (let j = 0; j < domainB.length; j++) {
                    // each element in group B
                    if (domainA[i] === domainB[j]) {
                        is = true;
                        break;
                    }
                }
                if (!is) {
                    disjunction.push(domainA[i]);
                }
            }
        } else {
            for (let i = 0; i < domainB.length; i++) {
                // each element in group B
                let is = false;
                for (let j = 0; j < domainA.length; j++) {
                    // each element in group A
                    if (domainB[i] === domainA[j]) {
                        is = true;
                        break;
                    }
                }
                if (!is) {
                    disjunction.push(domainB[i]);
                }
            }
        }
        return disjunction;
    }
};

// group operators on codomains
function isSubdomain(domainA, domainB) {
    // tests if domain B is a subdomain of domain A
    if (nonEmptyDomains(domainA, domainB)) {
        // non-empty domains
        const conjunct = conjunction(domainA, domainB);
        // if the conjunction of domain A and domain B = domain B
        if (conjunct.length === domainB.length) {
            // Domain B is a subdomain
            return true;
        } else {
            // Domain B is NOT a subdomain
            return false;
        }
    }
};

function isIdenticalDomain(domainA, domainB) {
    // returns true if domain A is identical to domain B
    if (nonEmptyDomains(domainA, domainB)) {
        // non-empty domains
        const conjunct = conjunction(domainA, domainB);
        if (conjunct.length > 0) {
            // at least partial conjunction
            if (domainA.length === domainB.length) {
                // equivalent domain cardinalities
                if (conjunct.length === domainA.length && conjunct.length === domainB.length) {
                    // conjunct of domains' cardinality equivalent each domain cardinality
                    // Identical: domains share cardinalities and all members.
                    return true;
                } else {
                    // conjunct of domains' cardinality unequivalent each domain cardinality
                    // Partially identical: domains share caridinality some members.
                    return 'Partially identical: domains share caridinality and some members.';
                }
            } else {
                // Unidentical: domain cardinalities do not equate.
                return 'Unidentical: domains cardinalities do not equate.';
            }
        } else {
            // conjunction is an empty domain
            // Unidentical: domain share no members.
            return 'Unidentical: domains share no members.';
        }
    }
};

// binary operators (arithmetic) on quantities
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
    return a**b;
};

function radication(a,b) {
    return Math.pow(a,1/b);
};

function modulus(a,m) {
    if (a > m) {
        // return ((a/m) - Math.floor(a/m)) * m;
        return ((a % m) + m) % m;
    } else {
        return 0;
    }
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

// form input validation

// Set

function maximumSetValueValid() {
    // validates input on change event
    const maxVal = Number(document.querySelector('#maximum-set-value').value);
    const minVal = Number(document.querySelector('#minimum-set-value').value);
    // prevent maximum from being lowered below minimum
    if (maxVal < minVal) {
        document.querySelector('#maximum-set-value').value = minVal;
    }
};

function minimumSetValueValid() {
    // validates input on change event
    const maxVal = Number(document.querySelector('#maximum-set-value').value);
    const minVal = Number(document.querySelector('#minimum-set-value').value);
    // prevent minimum from being raised above maximum
    if (minVal > maxVal) {
        document.querySelector('#minimum-set-value').value = maxVal;
    }
};

function updateSetFormInput() {
    // get operend type
    const operendType = document.querySelector('#operend-type');

    if (operendType.value === 'set') {
        const elementalOperand = document.querySelector('#elemental-operand');
        if (elementalOperand !== null) {
            elementalOperand.remove();
        }
    } else if (operendType.value === 'element') {
        // build element
        const input = document.createElement('input');
        input.setAttribute('id', 'elemental-operand');
        input.setAttribute('type', 'number');
        input.setAttribute('placeholder', 'elemental operand');
        input.setAttribute('required', 'true');

    
        // display new input after operend type
        operendType.after(input);
    }
};

// Codomain

function maximumDomainValueValidA() {
    // validates input on change event
    const maxVal = Number(document.querySelector('#maximum-domain-a').value);
    const minVal = Number(document.querySelector('#minimum-domain-a').value);
    // prevent maximum from being lowered below minimum
    if (maxVal < minVal) {
        document.querySelector('#maximum-domain-a').value = minVal;
    }
};

function minimumDomainValueValidA() {
    // validates input on change event
    const maxVal = Number(document.querySelector('#maximum-domain-a').value);
    const minVal = Number(document.querySelector('#minimum-domain-a').value);
    // prevent minimum from being raised above maximum
    if (minVal > maxVal) {
        document.querySelector('#minimum-domain-a').value = maxVal;
    }
};

function maximumDomainValueValidB() {
    // validates input on change event
    const maxVal = Number(document.querySelector('#maximum-domain-b').value);
    const minVal = Number(document.querySelector('#minimum-domain-b').value);
    // prevent maximum from being lowered below minimum
    if (maxVal < minVal) {
        document.querySelector('#maximum-domain-b').value = minVal;
    }
};

function minimumDomainValueValidB() {
    // validates input on change event
    const maxVal = Number(document.querySelector('#maximum-domain-b').value);
    const minVal = Number(document.querySelector('#minimum-domain-b').value);
    // prevent minimum from being raised above maximum
    if (minVal > maxVal) {
        document.querySelector('#minimum-domain-b').value = maxVal;
    }
};

// dynamically update form elements
const containerElement = document.querySelector('#dynamic-content-container');
function updateForm() {

    // remove listeners

    // Sets

    const maxSet = document.querySelector('#maximum-set-value');
    if (maxSet !== null) {
        maxSet.removeEventListener("change", maximumSetValueValid);
    }

    const minSet = document.querySelector('#minimum-set-value');
    if (minSet !== null) {
        minSet.removeEventListener("change", minimumSetValueValid);
    }

    const operendType = document.querySelector('#operend-type');
    if (operendType !== null) {
        operendType.removeEventListener("change", updateSetFormInput);
    }

    // Codomains

    // Domain A
    const maxDomA = document.querySelector('#maximum-domain-a');
    if (maxDomA !== null) {
        maxDomA.removeEventListener("change", maximumDomainValueValidA);
    }

    const minDomA = document.querySelector('#minimum-domain-a');
    if (minDomA !== null) {
        minDomA.removeEventListener("change", minimumDomainValueValidA);
    }

    // Domain B
    const maxDomB = document.querySelector('#minimum-domain-a');
    if (maxDomB !== null) {
        maxDomB.removeEventListener("change", maximumDomainValueValidB);
    }

    const minDomB = document.querySelector('#minimum-domain-b');
    if (minDomB !== null) {
        minDomB.removeEventListener("change", minimumDomainValueValidB);
    }

    // clear previous elements
    containerElement.innerHTML = '';
    // clear previous answer
    document.querySelector('#answer-field').innerHTML = '';
    // get type data from form
    const type = document.querySelector('#operand-type').value;
    if (type === 'quantity') {
        // clear previous answer
        document.querySelector('#answer-field').innerHTML = '';
        // clear previous elements
        containerElement.innerHTML = '';

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
        
        const option13 = document.createElement('option');
        option13.setAttribute('name', 'modulus');
        option13.setAttribute('value', 'modulus');
        option13.innerText = 'modulus';
        select.appendChild(option13);

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

        // operend selector label
        const selectLabel2 = document.createElement('label');
        selectLabel2.setAttribute('for', 'operend-type');
        selectLabel2.innerText = 'Operend Type';

        // operend selection
        const select2 = document.createElement('select');
        select2.setAttribute('id', 'operend-type');
        select2.setAttribute('name', 'operend-type');
        select2.setAttribute('required', 'true');
        select2.setAttribute('value', 'set');

        const option1l2 = document.createElement('option');
        option1l2.setAttribute('name', 'set');
        option1l2.setAttribute('value', 'set');
        option1l2.innerText = 'Set';
        select2.appendChild(option1l2);
        
        const option2l2 = document.createElement('option');
        option2l2.setAttribute('name', 'element');
        option2l2.setAttribute('value', 'element');
        option2l2.innerText = 'Element';
        select2.appendChild(option2l2);

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

        const option1l1 = document.createElement('option');
        option1l1.setAttribute('name', 'addition');
        option1l1.setAttribute('value', 'addition');
        option1l1.innerText = 'addition';
        select.appendChild(option1l1);
        
        const option2l1 = document.createElement('option');
        option2l1.setAttribute('name', 'subtraction');
        option2l1.setAttribute('value', 'subtraction');
        option2l1.innerText = 'subtraction';
        select.appendChild(option2l1);
        
        const option3l1 = document.createElement('option');
        option3l1.setAttribute('name', 'multiplication');
        option3l1.setAttribute('value', 'multiplication');
        option3l1.innerText = 'multiplication';
        select.appendChild(option3l1);

        const option4l1 = document.createElement('option');
        option4l1.setAttribute('name', 'division');
        option4l1.setAttribute('value', 'division');
        option4l1.innerText = 'division';
        select.appendChild(option4l1);
        
        const option5l1 = document.createElement('option');
        option5l1.setAttribute('name', 'modulus');
        option5l1.setAttribute('value', 'modulus');
        option5l1.innerText = 'modulus';
        select.appendChild(option5l1);
        
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
        containerElement.appendChild(selectLabel2);
        containerElement.appendChild(select2);
        containerElement.appendChild(selectLabel);
        containerElement.appendChild(select);
        containerElement.appendChild(operandLabel);
        containerElement.appendChild(maximum);
        containerElement.appendChild(minimum);
        containerElement.appendChild(step);

        // add listeners
        document.querySelector('#maximum-set-value').addEventListener("change", maximumSetValueValid);
        document.querySelector('#minimum-set-value').addEventListener("change", minimumSetValueValid);
        document.querySelector('#operend-type').addEventListener("change", updateSetFormInput);

    } else if (type === 'codomain') {

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
        select.setAttribute('value', 'conjunction');

        const option1 = document.createElement('option');
        option1.setAttribute('name', 'conjunction');
        option1.setAttribute('value', 'conjunction');
        option1.innerText = 'conjunction';
        select.appendChild(option1);
        
        const option2 = document.createElement('option');
        option2.setAttribute('name', 'disjunction');
        option2.setAttribute('value', 'disjunction');
        option2.innerText = 'disjunction';
        select.appendChild(option2);

        // Domain A
        const labelA = document.createElement('label');
        labelA.setAttribute('for', 'number-type-domain-a');
        labelA.innerText = 'Domain A';

        const selectA = document.createElement('select');
        selectA.setAttribute('id', 'number-type-domain-a');
        selectA.setAttribute('name', 'number-type-domain-a');
        selectA.setAttribute('required', 'true');

        const option1A = document.createElement('option');
        option1A.setAttribute('name', 'integers');
        option1A.setAttribute('value', 'integers');
        option1A.innerText = 'Integers';
        selectA.appendChild(option1A);
        
        const option2A = document.createElement('option');
        option2A.setAttribute('name', 'rational');
        option2A.setAttribute('value', 'rational-tenth');
        option2A.innerText = 'Rational (nearest tenth)';
        selectA.appendChild(option2A);
        
        const option3A = document.createElement('option');
        option3A.setAttribute('name', 'rational');
        option3A.setAttribute('value', 'rational-hundredth');
        option3A.innerText = 'Rational (nearest hundredth)';
        selectA.appendChild(option3A);
        
        const option4A = document.createElement('option');
        option4A.setAttribute('name', 'rational');
        option4A.setAttribute('value', 'rational-thousandth');
        option4A.innerText = 'Rational (nearest thousandth)';
        selectA.appendChild(option4A);

        const maximumA = document.createElement('input');
        maximumA.setAttribute('id', 'maximum-domain-a');
        maximumA.setAttribute('type', 'number');
        maximumA.setAttribute('placeholder', 'maximum');
        maximumA.setAttribute('required', 'true');
        
        const minimumA = document.createElement('input');
        minimumA.setAttribute('id', 'minimum-domain-a');
        minimumA.setAttribute('type', 'number');
        minimumA.setAttribute('placeholder', 'minimum');
        minimumA.setAttribute('required', 'true');

        // Domain B
        const labelB = document.createElement('label');
        labelB.setAttribute('for', 'number-type-domain-b');
        labelB.innerText = 'Domain B';

        const selectB = document.createElement('select');
        selectB.setAttribute('id', 'number-type-domain-b');
        selectB.setAttribute('name', 'number-type-domain-b');
        selectB.setAttribute('required', 'true');

        const option1B = document.createElement('option');
        option1B.setAttribute('name', 'integers');
        option1B.setAttribute('value', 'integers');
        option1B.innerText = 'Integers';
        selectB.appendChild(option1B);

        const option2B = document.createElement('option');
        option2B.setAttribute('name', 'rational');
        option2B.setAttribute('value', 'rational-tenth');
        option2B.innerText = 'Rational (nearest tenth)';
        selectB.appendChild(option2B);
        
        const option3B = document.createElement('option');
        option3B.setAttribute('name', 'rational');
        option3B.setAttribute('value', 'rational-hundredth');
        option3B.innerText = 'Rational (nearest hundredth)';
        selectB.appendChild(option3B);
        
        const option4B = document.createElement('option');
        option4B.setAttribute('name', 'rational');
        option4B.setAttribute('value', 'rational-thousandth');
        option4B.innerText = 'Rational (nearest thousandth)';
        selectB.appendChild(option4B);
        
        const maximumB = document.createElement('input');
        maximumB.setAttribute('id', 'maximum-domain-b');
        maximumB.setAttribute('type', 'number');
        maximumB.setAttribute('placeholder', 'maximum');
        maximumB.setAttribute('required', 'true');

        const minimumB = document.createElement('input');
        minimumB.setAttribute('id', 'minimum-domain-b');
        minimumB.setAttribute('type', 'number');
        minimumB.setAttribute('placeholder', 'minimum');
        minimumB.setAttribute('required', 'true');

        // append elements
        containerElement.appendChild(selectLabel);
        containerElement.appendChild(select);

        containerElement.appendChild(labelA);
        containerElement.appendChild(selectA);
        containerElement.appendChild(maximumA);
        containerElement.appendChild(minimumA);
        
        containerElement.appendChild(labelB);
        containerElement.appendChild(selectB);
        containerElement.appendChild(maximumB);
        containerElement.appendChild(minimumB);

        // add listeners
        document.querySelector('#maximum-domain-a').addEventListener("change", maximumDomainValueValidA);
        document.querySelector('#minimum-domain-a').addEventListener("change", minimumDomainValueValidA);
        
        document.querySelector('#maximum-domain-b').addEventListener("change", maximumDomainValueValidB);
        document.querySelector('#minimum-domain-b').addEventListener("change", minimumDomainValueValidB);
    }
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
        
        // modular arithmetic
        } else if (operatorType === 'modulus') {
            answer = modulus(a,b);
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
        
        // return results based on special cases for set length
        if (set.length === 1) {
            
            // assign element in singleton set to answer variable
            answer = set[0];

        } else if (set.length < 1) {
            
            // empty sets return 0
            answer = 0;
            
        } else {
            
            // set length that is greater than 1

            // get operend type
            const operend = document.querySelector('#operend-type').value;

            // change operation based on operend
            if (operend === 'set') {

                // test for and run operations on set
                if (operatorType === 'addition') {
                    // initialize with identity element
                    answer = 0;
                    // operate on set and assign to answer variable
                    for (let i = 0; i < set.length; i++) {
                        answer = addition(answer,set[i]);
                    }
                } else if (operatorType === 'subtraction') {
                    // initialize with first element in list
                    answer = set[0];
                    // operate on set and assign to answer variable
                    for (let i = 1; i < set.length; i++) {
                        answer = subtraction(answer,set[i]);
                    }
                } else if (operatorType === 'multiplication') {
                    // initialize with identity element
                    answer = 1;
                    // operate on set and assign to answer variable
                    for (let i = 0; i < set.length; i++) {
                        answer = multiplication(answer,set[i]);
                    }
                } else if (operatorType === 'division') {
                    // initialize with first element in list
                    answer = set[0];
                    // operate on set in order and assign to answer variable
                    for (let i = 1; i < set.length; i++) {
                        answer = division(answer,set[i]);
                    }
                } else if (operatorType === 'modulus') {
                    // initialize with first element in list
                    answer = set[0];
                    // operate on set in order and assign to answer variable
                    for (let i = 1; i < set.length; i++) {
                        answer = modulus(answer,set[i]);
                    }
                }

                // display answer
                answerField.innerHTML = `<di>Result</div><div>${answer}</div><div>Original Set</div><div>${set.toString()}</div>`;

            } else if (operend === 'element') {

                // get elemental operand
                const elementalOperand = Number(document.querySelector('#elemental-operand').value);

                // test for and run operations on set
                if (operatorType === 'addition') {
                    // declare an empty array to contain set of operated elements
                    let operated = [];
                    // operate on set and assign to answer variable
                    for (let i = 0; i < set.length; i++) {
                        operated.push(addition(set[i], elementalOperand));
                    }
                    // assign operated array to answer variable as a string
                    answer = operated.toString();
                } else if (operatorType === 'subtraction') {
                    // declare an empty array to contain set of operated elements
                    let operated = [];
                    // operate on set and assign to answer variable
                    for (let i = 0; i < set.length; i++) {
                        operated.push(subtraction(set[i], elementalOperand));
                    }
                    // assign operated array to answer variable as a string
                    answer = operated.toString();
                } else if (operatorType === 'multiplication') {
                    // declare an empty array to contain set of operated elements
                    let operated = [];
                    // operate on set and assign to answer variable
                    for (let i = 0; i < set.length; i++) {
                        operated.push(multiplication(set[i], elementalOperand));
                    }
                    // assign operated array to answer variable as a string
                    answer = operated.toString();
                } else if (operatorType === 'division') {
                    // declare an empty array to contain set of operated elements
                    let operated = [];
                    // operate on set and assign to answer variable
                    for (let i = 0; i < set.length; i++) {
                        operated.push(division(set[i], elementalOperand));
                    }
                    // assign operated array to answer variable as a string
                    answer = operated.toString();
                } else if (operatorType === 'modulus') {
                    // declare an empty array to contain set of operated elements
                    let operated = [];
                    // operate on set and assign to answer variable
                    for (let i = 0; i < set.length; i++) {
                        operated.push(modulus(set[i], elementalOperand));
                    }
                    // assign operated array to answer variable as a string
                    answer = operated.toString();
                }

                // display answer
                answerField.innerHTML = `<di>Resultant Set</div><div>${answer}</div><div>Original Set</div><div>${set.toString()}</div>`;
            }
        }
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
            for (let i = minimumA; i <= maximumA; i++) {
                domainA.push(i);
            }
        } else if (numberTypeA === 'rational-tenth') {
            for (let i = minimumA; i <= maximumA; i = i + 0.1) {
                domainA.push(i);
            }
        } else if (numberTypeA === 'rational-hundredth') {
            for (let i = minimumA; i <= maximumA; i = i + 0.01) {
                domainB.push(i);
            }
        } else if (numberTypeA === 'rational-thousandth') {
            for (let i = minimumA; i <= maximumA; i = i + 0.001) {
                domainB.push(i);
            }
        }

        // build domain b
        let domainB = [];
        if (numberTypeB === 'integers') {
            for (let i = minimumB; i <= maximumB; i++) {
                domainB.push(i);
            }
        } else if (numberTypeB === 'rational-tenth') {
            for (let i = minimumB; i <= maximumB; i = i + 0.1) {
                domainB.push(i);
            }
        } else if (numberTypeB === 'rational-hundredth') {
            for (let i = minimumB; i <= maximumB; i = i + 0.01) {
                domainB.push(i);
            }
        } else if (numberTypeB === 'rational-thousandth') {
            for (let i = minimumB; i <= maximumB; i = i + 0.001) {
                domainB.push(i);
            }
        }

        // linear operators
        if (operatorType === 'conjunction') {
            answer = conjunction(domainA, domainB);
            if (answer.length === 0) {
                answer = 0;
            }
            // display answer
            answerField.innerHTML = `<div>Conjunction</div><div>${answer.toString()}</div><div>Domain A</div><div>${domainA.toString()}</div><div>Domain B</div><div>${domainB.toString()}</div>`;
        } else if (operatorType === 'disjunction') {
            answer = disjunction(domainA, domainB);
            if (answer.length === 0) {
                answer = 0;
            }
            // display answer
            answerField.innerHTML = `<div>Disjunction</div><div>${answer.toString()}</div><div>Domain A</div><div>${domainA.toString()}</div><div>Domain B</div><div>${domainB.toString()}</div>`;
        }
    }
});