console.log('Interface script loaded');

// parameters
const maxRank = 10; // sets the maximum rank for matrices

// Function to find the Greatest Common Divisor (GCD) using the Euclidean algorithm
function gcd(a, b) {
  if (b === 0) {
    return a;
  }
  return gcd(b, a % b);
};

// Function to find the Least Common Multiple (LCM)
function lcm(a, b) {
  if (a === 0 || b === 0) {
    return 0; // LCM is 0 if either number is 0
  }
  return Math.abs(a * b) / gcd(a, b);
};

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

function common(domainA, domainB) {
    // returns what elements domainA and domainB have in common
    let common = [];
    for (let i = 0; i < domainA.length; i++) {
        for (let j = 0; j < domainB.length; j++) {
            if (domainA[i] === domainB[j]) {
                common.push(domainA[i]);
            }
        }
    }
    return common;
};

function removeDuplicates(domain) {
    // returns domain removed of duplicates
    let duplicates = true;
    let x = 0;
    while (x < 1000 && duplicates) {
        x += 1;
        let restart = false;
        for (let i = 0; i < domain.length; i++) {
            for (let j = i; j < domain.length; j++) {
                if (i !== j && domain[i] === domain[j]) {
                    // remove duplicate
                    if (j !== domain.length - 1) {
                        domain = domain.slice(0, j).concat(domain.slice(j + 1, domain.length));
                    } else {
                        domain = domain.slice(0, i).concat(domain.slice(i + 1, domain.length));
                    }
                    restart = true;
                    break;
                }
                if (restart) {
                    break;
                }
            }
            if (restart) {
                break;
            }
        }
        if (restart) {
            continue
        }
        duplicates = false;
    }
    return domain;
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

function modulo(a,m) {
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

// Matrix display

function buildMatrix(mat, row, col) {
    // builds a matrix
    // mat = matrix letter (e.g., A, B, C)
    // col = number of columns
    // rows = number of rows
    const matrixContainer = document.createElement('div');
    matrixContainer.setAttribute('id',`matrix-id-${mat}`);
    matrixContainer.setAttribute('class',`matrix`);
    for (let c = 1; c < Number(col) + 1; c++) {
        for (let r = 1; r < Number(row) + 1; r++) {
            // store matrix value id
            const matVal = `${mat} ${r},${c}`;

            // create label
            const label = document.createElement('label');
            label.setAttribute('for', matVal);
            label.innerText = matVal;

            // create matrix value
            const x = document.createElement('input');
            x.setAttribute('type', 'number');
            x.setAttribute('value', '0');
            x.setAttribute('name', `${mat}-${r},${c}`);
            x.setAttribute('class', `matrix-${mat}-row-${r} matrix-${mat}-col-${c}`);
            x.innerText = matVal;

            // append elements
            matrixContainer.appendChild(label);
            matrixContainer.appendChild(x);
        }
    }

    // return matrix
    return matrixContainer;
};

function displayProductMatrix(rows, cols, vals) {
    // build product matrix element
    const matProd = document.createElement('div');
    matProd.setAttribute('class','matrix');
    
    let count = 0;
    for (let c = 1; c < cols + 1; c++) {
        for (let r = 1; r < rows + 1; r++) {
            // build elements
            const label = document.createElement('div');
            label.innerText = `C ${r},${c}`;
            
            const matProdVal = document.createElement('div');
            matProdVal.innerText = `${vals[count]}`; 
            
            // append elements
            matProd.appendChild(label);
            matProd.appendChild(matProdVal);
            
            // update for next iteration
            count += 1;
        }
    }
    
    // display answer
    document.querySelector('#answer-field').appendChild(matProd);
};

function buildOption(name, selected = false) {
    const option = document.createElement('option');
    option.setAttribute('name', name);
    option.setAttribute('value', name);
    option.innerText = name;
    if (selected) {option.setAttribute('selected', true)};
    return option;
};

function updateMatrixForm() {
    
    // store parameters
    const option = document.querySelector('#operator-type').value;
    
    // matrix A parameters
    let columnsA = '2';
    let rowsA = '2';
    const columnElementA = document.querySelector('#col-rank-a');
    if (columnElementA !== null) {
        columnsA = columnElementA.value;
    }
    const rowElementA = document.querySelector('#row-rank-a');
    if (rowElementA !== null) {
        rowsA = rowElementA.value;
    }
    
    // matrix B parameters
    let columnsB = '2';
    let rowsB = '2';
    const columnElementB = document.querySelector('#col-rank-b');
    if (columnElementB !== null) {
        columnsB = columnElementB.value;
    }
    const rowElementB = document.querySelector('#row-rank-b');
    if (rowElementB !== null) {
        rowsB = rowElementB.value;
    }

    // remove listeners
    const operandType = document.querySelector('#operand-type');
    if (operandType !== null) {
        operandType.removeEventListener('change', updateMatrixForm);
    }

    const colRankA = document.querySelector('#col-rank-a');
    if (colRankA !== null) {
        colRankA.removeEventListener('change', updateMatrixForm);
    }

    const rowRankA = document.querySelector('#row-rank-a');
    if (rowRankA !== null) {
        rowRankA.removeEventListener('change', updateMatrixForm);
    }
    
    const colRankB = document.querySelector('#col-rank-b');
    if (colRankB !== null) {
        colRankB.removeEventListener('change', updateMatrixForm);
    }
    
    const rowRankB = document.querySelector('#row-rank-b');
    if (rowRankB !== null) {
        rowRankB.removeEventListener('change', updateMatrixForm);
    }

    // clear previous elements
    containerElement.innerHTML = '';

    // clear previous answer
    document.querySelector('#answer-field').innerHTML = '';

    // render correct content
    if (option === 'matrix addition') {
        // operator selector label
        const selectLabel = document.createElement('label');
        selectLabel.setAttribute('for', 'operator-type');
        selectLabel.innerText = 'Operator';
        
        // operator selection
        const select = document.createElement('select');
        select.setAttribute('id', 'operator-type');
        select.setAttribute('name', 'operator-type');
        select.setAttribute('required', 'true');
        select.setAttribute('value', 'matrix addition');

        select.appendChild(buildOption('matrix addition', true));
        select.appendChild(buildOption('matrix multiplication'));
        select.appendChild(buildOption('matrix subtraction'));
        // select.appendChild(buildOption('mutliply by inverse'));
        select.appendChild(buildOption('scalar multiplication'));
        select.appendChild(buildOption('negation'));
        select.appendChild(buildOption('inversion'));
        select.appendChild(buildOption('transposition'));
        select.appendChild(buildOption('determinant'));

        // Matrix A
        const labelA = document.createElement('label');
        labelA.setAttribute('for', 'Matrix A');
        labelA.innerText = 'Matrix A';
        
        const rowRankA = document.createElement('input');
        rowRankA.setAttribute('id', 'row-rank-a');
        rowRankA.setAttribute('type', 'number');
        rowRankA.setAttribute('name', 'row-rank-a');
        rowRankA.setAttribute('min', '2');
        rowRankA.setAttribute('value', rowsA);
        rowRankA.setAttribute('required', 'true');
        
        const colRankA = document.createElement('input');
        colRankA.setAttribute('id', 'col-rank-a');
        colRankA.setAttribute('type', 'number');
        colRankA.setAttribute('name', 'col-rank-a');
        colRankA.setAttribute('min', '2');
        colRankA.setAttribute('value', columnsA);
        colRankA.setAttribute('required', 'true');

        // Matrix B
        const labelB = document.createElement('label');
        labelB.setAttribute('for', 'Matrix B');
        labelB.innerText = 'Matrix B';
        
        const rowRankB = document.createElement('input');
        rowRankB.setAttribute('id', 'row-rank-b');
        rowRankB.setAttribute('type', 'number');
        rowRankB.setAttribute('name', 'row-rank-b');
        rowRankB.setAttribute('min', '2');
        rowRankB.setAttribute('value', rowsB);
        rowRankB.setAttribute('required', 'true');

        const colRankB = document.createElement('input');
        colRankB.setAttribute('id', 'col-rank-b');
        colRankB.setAttribute('type', 'number');
        colRankB.setAttribute('name', 'col-rank-b');
        colRankB.setAttribute('min', '2');
        colRankB.setAttribute('value', columnsB);
        colRankB.setAttribute('required', 'true');

        // append elements
        containerElement.appendChild(selectLabel);
        containerElement.appendChild(select);

        containerElement.appendChild(labelA);
        containerElement.appendChild(rowRankA);
        containerElement.appendChild(colRankA);
        
        containerElement.appendChild(labelB);
        containerElement.appendChild(rowRankB);
        containerElement.appendChild(colRankB);

        containerElement.appendChild(buildMatrix('A', rowsA, columnsA));
        containerElement.appendChild(buildMatrix('B', rowsB, columnsB));

    } else if (option === 'matrix multiplication') {
        // operator selector label
        const selectLabel = document.createElement('label');
        selectLabel.setAttribute('for', 'operator-type');
        selectLabel.innerText = 'Operator';
        
        // operator selection
        const select = document.createElement('select');
        select.setAttribute('id', 'operator-type');
        select.setAttribute('name', 'operator-type');
        select.setAttribute('required', 'true');
        select.setAttribute('value', 'matrix addition');

        select.appendChild(buildOption('matrix addition'));
        select.appendChild(buildOption('matrix multiplication', true));
        select.appendChild(buildOption('matrix subtraction'));
        // select.appendChild(buildOption('mutliply by inverse'));
        select.appendChild(buildOption('scalar multiplication'));
        select.appendChild(buildOption('negation'));
        select.appendChild(buildOption('inversion'));
        select.appendChild(buildOption('transposition'));
        select.appendChild(buildOption('determinant'));

        // Matrix A
        const labelA = document.createElement('label');
        labelA.setAttribute('for', 'Matrix A');
        labelA.innerText = 'Matrix A';
        
        const rowRankA = document.createElement('input');
        rowRankA.setAttribute('id', 'row-rank-a');
        rowRankA.setAttribute('type', 'number');
        rowRankA.setAttribute('name', 'row-rank-a');
        rowRankA.setAttribute('min', '2');
        rowRankA.setAttribute('value', rowsA);
        rowRankA.setAttribute('required', 'true');
        
        const colRankA = document.createElement('input');
        colRankA.setAttribute('id', 'col-rank-a');
        colRankA.setAttribute('type', 'number');
        colRankA.setAttribute('name', 'col-rank-a');
        colRankA.setAttribute('min', '2');
        colRankA.setAttribute('value', columnsA);
        colRankA.setAttribute('required', 'true');

        // Matrix B
        const labelB = document.createElement('label');
        labelB.setAttribute('for', 'Matrix B');
        labelB.innerText = 'Matrix B';
        
        const rowRankB = document.createElement('input');
        rowRankB.setAttribute('id', 'row-rank-b');
        rowRankB.setAttribute('type', 'number');
        rowRankB.setAttribute('name', 'row-rank-b');
        rowRankB.setAttribute('min', '2');
        rowRankB.setAttribute('value', rowsB);
        rowRankB.setAttribute('required', 'true');

        const colRankB = document.createElement('input');
        colRankB.setAttribute('id', 'col-rank-b');
        colRankB.setAttribute('type', 'number');
        colRankB.setAttribute('name', 'col-rank-b');
        colRankB.setAttribute('min', '2');
        colRankB.setAttribute('value', columnsB);
        colRankB.setAttribute('required', 'true');

        // append elements
        containerElement.appendChild(selectLabel);
        containerElement.appendChild(select);

        containerElement.appendChild(labelA);
        containerElement.appendChild(rowRankA);
        containerElement.appendChild(colRankA);
        
        containerElement.appendChild(labelB);
        containerElement.appendChild(rowRankB);
        containerElement.appendChild(colRankB);

        containerElement.appendChild(buildMatrix('A', rowsA, columnsA));
        containerElement.appendChild(buildMatrix('B', rowsB, columnsB));

    } else if (option === 'matrix subtraction') {
        // operator selector label
        const selectLabel = document.createElement('label');
        selectLabel.setAttribute('for', 'operator-type');
        selectLabel.innerText = 'Operator';
        
        // operator selection
        const select = document.createElement('select');
        select.setAttribute('id', 'operator-type');
        select.setAttribute('name', 'operator-type');
        select.setAttribute('required', 'true');
        select.setAttribute('value', 'matrix addition');

        select.appendChild(buildOption('matrix addition'));
        select.appendChild(buildOption('matrix multiplication'));
        select.appendChild(buildOption('matrix subtraction', true));
        // select.appendChild(buildOption('mutliply by inverse'));
        select.appendChild(buildOption('scalar multiplication'));
        select.appendChild(buildOption('negation'));
        select.appendChild(buildOption('inversion'));
        select.appendChild(buildOption('transposition'));
        select.appendChild(buildOption('determinant'));

        // Matrix A
        const labelA = document.createElement('label');
        labelA.setAttribute('for', 'Matrix A');
        labelA.innerText = 'Matrix A';
        
        const rowRankA = document.createElement('input');
        rowRankA.setAttribute('id', 'row-rank-a');
        rowRankA.setAttribute('type', 'number');
        rowRankA.setAttribute('name', 'row-rank-a');
        rowRankA.setAttribute('min', '2');
        rowRankA.setAttribute('value', rowsA);
        rowRankA.setAttribute('required', 'true');
        
        const colRankA = document.createElement('input');
        colRankA.setAttribute('id', 'col-rank-a');
        colRankA.setAttribute('type', 'number');
        colRankA.setAttribute('name', 'col-rank-a');
        colRankA.setAttribute('min', '2');
        colRankA.setAttribute('value', columnsA);
        colRankA.setAttribute('required', 'true');

        // Matrix B
        const labelB = document.createElement('label');
        labelB.setAttribute('for', 'Matrix B');
        labelB.innerText = 'Matrix B';
        
        const rowRankB = document.createElement('input');
        rowRankB.setAttribute('id', 'row-rank-b');
        rowRankB.setAttribute('type', 'number');
        rowRankB.setAttribute('name', 'row-rank-b');
        rowRankB.setAttribute('min', '2');
        rowRankB.setAttribute('value', rowsB);
        rowRankB.setAttribute('required', 'true');

        const colRankB = document.createElement('input');
        colRankB.setAttribute('id', 'col-rank-b');
        colRankB.setAttribute('type', 'number');
        colRankB.setAttribute('name', 'col-rank-b');
        colRankB.setAttribute('min', '2');
        colRankB.setAttribute('value', columnsB);
        colRankB.setAttribute('required', 'true');

        // append elements
        containerElement.appendChild(selectLabel);
        containerElement.appendChild(select);

        containerElement.appendChild(labelA);
        containerElement.appendChild(rowRankA);
        containerElement.appendChild(colRankA);
        
        containerElement.appendChild(labelB);
        containerElement.appendChild(rowRankB);
        containerElement.appendChild(colRankB);

        containerElement.appendChild(buildMatrix('A', rowsA, columnsA));
        containerElement.appendChild(buildMatrix('B', rowsB, columnsB));

    } else if (option === 'multiply by inverse') {
    } else if (option === 'scalar multiplication') {
        // operator selector label
        const selectLabel = document.createElement('label');
        selectLabel.setAttribute('for', 'operator-type');
        selectLabel.innerText = 'Operator';
        
        // operator selection
        const select = document.createElement('select');
        select.setAttribute('id', 'operator-type');
        select.setAttribute('name', 'operator-type');
        select.setAttribute('required', 'true');
        select.setAttribute('value', 'matrix addition');

        select.appendChild(buildOption('matrix addition'));
        select.appendChild(buildOption('matrix multiplication'));
        select.appendChild(buildOption('matrix subtraction'));
        // select.appendChild(buildOption('mutliply by inverse'));
        select.appendChild(buildOption('scalar multiplication', true));
        select.appendChild(buildOption('negation'));
        select.appendChild(buildOption('inversion'));
        select.appendChild(buildOption('transposition'));
        select.appendChild(buildOption('determinant'));

        // Scalar
        const labelS = document.createElement('label');
        labelS.setAttribute('for', 'scalar');
        labelS.innerText = 'Scalar';

        const scalar = document.createElement('input');
        scalar.setAttribute('id','scalar');
        scalar.setAttribute('type','number');
        scalar.setAttribute('name','scalar');
        scalar.setAttribute('value','1');
        scalar.setAttribute('required','true');
        
        // Matrix A
        const labelA = document.createElement('label');
        labelA.setAttribute('for', 'Matrix A');
        labelA.innerText = 'Matrix A';
        
        const rowRankA = document.createElement('input');
        rowRankA.setAttribute('id', 'row-rank-a');
        rowRankA.setAttribute('type', 'number');
        rowRankA.setAttribute('name', 'row-rank-a');
        rowRankA.setAttribute('min', '2');
        rowRankA.setAttribute('value', rowsA);
        rowRankA.setAttribute('required', 'true');
        
        const colRankA = document.createElement('input');
        colRankA.setAttribute('id', 'col-rank-a');
        colRankA.setAttribute('type', 'number');
        colRankA.setAttribute('name', 'col-rank-a');
        colRankA.setAttribute('min', '2');
        colRankA.setAttribute('value', columnsA);
        colRankA.setAttribute('required', 'true');

        // append elements
        containerElement.appendChild(selectLabel);
        containerElement.appendChild(select);
        
        containerElement.appendChild(labelS);
        containerElement.appendChild(scalar);

        containerElement.appendChild(labelA);
        containerElement.appendChild(rowRankA);
        containerElement.appendChild(colRankA);

        containerElement.appendChild(buildMatrix('A', rowsA, columnsA));

    } else if (option === 'negation') {
        // operator selector label
        const selectLabel = document.createElement('label');
        selectLabel.setAttribute('for', 'operator-type');
        selectLabel.innerText = 'Operator';
        
        // operator selection
        const select = document.createElement('select');
        select.setAttribute('id', 'operator-type');
        select.setAttribute('name', 'operator-type');
        select.setAttribute('required', 'true');
        select.setAttribute('value', 'matrix addition');

        select.appendChild(buildOption('matrix addition'));
        select.appendChild(buildOption('matrix multiplication'));
        select.appendChild(buildOption('matrix subtraction'));
        // select.appendChild(buildOption('mutliply by inverse'));
        select.appendChild(buildOption('scalar multiplication'));
        select.appendChild(buildOption('negation', true));
        select.appendChild(buildOption('inversion'));
        select.appendChild(buildOption('transposition'));
        select.appendChild(buildOption('determinant'));

        // Matrix A
        const labelA = document.createElement('label');
        labelA.setAttribute('for', 'Matrix A');
        labelA.innerText = 'Matrix A';
        
        const rowRankA = document.createElement('input');
        rowRankA.setAttribute('id', 'row-rank-a');
        rowRankA.setAttribute('type', 'number');
        rowRankA.setAttribute('name', 'row-rank-a');
        rowRankA.setAttribute('min', '2');
        rowRankA.setAttribute('value', rowsA);
        rowRankA.setAttribute('required', 'true');
        
        const colRankA = document.createElement('input');
        colRankA.setAttribute('id', 'col-rank-a');
        colRankA.setAttribute('type', 'number');
        colRankA.setAttribute('name', 'col-rank-a');
        colRankA.setAttribute('min', '2');
        colRankA.setAttribute('value', columnsA);
        colRankA.setAttribute('required', 'true');

        // append elements
        containerElement.appendChild(selectLabel);
        containerElement.appendChild(select);

        containerElement.appendChild(labelA);
        containerElement.appendChild(rowRankA);
        containerElement.appendChild(colRankA);

        containerElement.appendChild(buildMatrix('A', rowsA, columnsA));

    } else if (option === 'inversion') {
        // operator selector label
        const selectLabel = document.createElement('label');
        selectLabel.setAttribute('for', 'operator-type');
        selectLabel.innerText = 'Operator';
        
        // operator selection
        const select = document.createElement('select');
        select.setAttribute('id', 'operator-type');
        select.setAttribute('name', 'operator-type');
        select.setAttribute('required', 'true');
        select.setAttribute('value', 'matrix addition');

        select.appendChild(buildOption('matrix addition'));
        select.appendChild(buildOption('matrix multiplication'));
        select.appendChild(buildOption('matrix subtraction'));
        // select.appendChild(buildOption('mutliply by inverse'));
        select.appendChild(buildOption('scalar multiplication'));
        select.appendChild(buildOption('negation'));
        select.appendChild(buildOption('inversion', true));
        select.appendChild(buildOption('transposition'));
        select.appendChild(buildOption('determinant'));

        // Matrix A
        const labelA = document.createElement('label');
        labelA.setAttribute('for', 'Matrix A');
        labelA.innerText = 'Matrix A';
        
        const rowRankA = document.createElement('input');
        rowRankA.setAttribute('id', 'row-rank-a');
        rowRankA.setAttribute('type', 'number');
        rowRankA.setAttribute('name', 'row-rank-a');
        rowRankA.setAttribute('min', '2');
        rowRankA.setAttribute('value', rowsA);
        rowRankA.setAttribute('required', 'true');
        
        const colRankA = document.createElement('input');
        colRankA.setAttribute('id', 'col-rank-a');
        colRankA.setAttribute('type', 'number');
        colRankA.setAttribute('name', 'col-rank-a');
        colRankA.setAttribute('min', '2');
        colRankA.setAttribute('value', columnsA);
        colRankA.setAttribute('required', 'true');

        // append elements
        containerElement.appendChild(selectLabel);
        containerElement.appendChild(select);

        containerElement.appendChild(labelA);
        containerElement.appendChild(rowRankA);
        containerElement.appendChild(colRankA);

        containerElement.appendChild(buildMatrix('A', rowsA, columnsA));

    } else if (option === 'transposition') {
        // operator selector label
        const selectLabel = document.createElement('label');
        selectLabel.setAttribute('for', 'operator-type');
        selectLabel.innerText = 'Operator';
        
        // operator selection
        const select = document.createElement('select');
        select.setAttribute('id', 'operator-type');
        select.setAttribute('name', 'operator-type');
        select.setAttribute('required', 'true');
        select.setAttribute('value', 'matrix addition');

        select.appendChild(buildOption('matrix addition'));
        select.appendChild(buildOption('matrix multiplication'));
        select.appendChild(buildOption('matrix subtraction'));
        // select.appendChild(buildOption('mutliply by inverse'));
        select.appendChild(buildOption('scalar multiplication'));
        select.appendChild(buildOption('negation'));
        select.appendChild(buildOption('inversion'));
        select.appendChild(buildOption('transposition', true));
        select.appendChild(buildOption('determinant'));

        // Matrix A
        const labelA = document.createElement('label');
        labelA.setAttribute('for', 'Matrix A');
        labelA.innerText = 'Matrix A';
        
        const rowRankA = document.createElement('input');
        rowRankA.setAttribute('id', 'row-rank-a');
        rowRankA.setAttribute('type', 'number');
        rowRankA.setAttribute('name', 'row-rank-a');
        rowRankA.setAttribute('min', '2');
        rowRankA.setAttribute('value', rowsA);
        rowRankA.setAttribute('required', 'true');
        
        const colRankA = document.createElement('input');
        colRankA.setAttribute('id', 'col-rank-a');
        colRankA.setAttribute('type', 'number');
        colRankA.setAttribute('name', 'col-rank-a');
        colRankA.setAttribute('min', '2');
        colRankA.setAttribute('value', columnsA);
        colRankA.setAttribute('required', 'true');

        // append elements
        containerElement.appendChild(selectLabel);
        containerElement.appendChild(select);

        containerElement.appendChild(labelA);
        containerElement.appendChild(rowRankA);
        containerElement.appendChild(colRankA);

        containerElement.appendChild(buildMatrix('A', rowsA, columnsA));

    } else if (option === 'determinant') {
        // operator selector label
        const selectLabel = document.createElement('label');
        selectLabel.setAttribute('for', 'operator-type');
        selectLabel.innerText = 'Operator';
        
        // operator selection
        const select = document.createElement('select');
        select.setAttribute('id', 'operator-type');
        select.setAttribute('name', 'operator-type');
        select.setAttribute('required', 'true');
        select.setAttribute('value', 'matrix addition');

        select.appendChild(buildOption('matrix addition'));
        select.appendChild(buildOption('matrix multiplication'));
        select.appendChild(buildOption('matrix subtraction'));
        // select.appendChild(buildOption('mutliply by inverse'));
        select.appendChild(buildOption('scalar multiplication'));
        select.appendChild(buildOption('negation'));
        select.appendChild(buildOption('inversion'));
        select.appendChild(buildOption('transposition'));
        select.appendChild(buildOption('determinant', true));

        // Matrix A
        const labelA = document.createElement('label');
        labelA.setAttribute('for', 'Matrix A');
        labelA.innerText = 'Matrix A';
        
        const rowRankA = document.createElement('input');
        rowRankA.setAttribute('id', 'row-rank-a');
        rowRankA.setAttribute('type', 'number');
        rowRankA.setAttribute('name', 'row-rank-a');
        rowRankA.setAttribute('min', '2');
        rowRankA.setAttribute('value', rowsA);
        rowRankA.setAttribute('required', 'true');
        
        const colRankA = document.createElement('input');
        colRankA.setAttribute('id', 'col-rank-a');
        colRankA.setAttribute('type', 'number');
        colRankA.setAttribute('name', 'col-rank-a');
        colRankA.setAttribute('min', '2');
        colRankA.setAttribute('value', columnsA);
        colRankA.setAttribute('required', 'true');

        // append elements
        containerElement.appendChild(selectLabel);
        containerElement.appendChild(select);

        containerElement.appendChild(labelA);
        containerElement.appendChild(rowRankA);
        containerElement.appendChild(colRankA);

        containerElement.appendChild(buildMatrix('A', rowsA, columnsA));
    }

    // add listeners
    const element1 = document.querySelector('#operator-type');
    if (element1 !== null) {
        element1.addEventListener('change', updateMatrixForm);
    }
    
    const element2 = document.querySelector('#col-rank-a');
    if (element2 !== null) {
        element2.addEventListener('change', updateMatrixForm);
    }

    const element3 = document.querySelector('#row-rank-a');
    if (element3 !== null) {
        element3.addEventListener('change', updateMatrixForm);
    }

    const element4 = document.querySelector('#col-rank-b');
    if (element4 !== null) {
        element4.addEventListener('change', updateMatrixForm);
    }

    const element5 = document.querySelector('#row-rank-b');
    if (element5 !== null) {
        element5.addEventListener('change', updateMatrixForm);
    }
};

// Matrix logic

function getScalars(matrix) {
    // store length
    const rank = matrix.length;

    // collect scalars
    let scalars = [];

    // collection
    for (let i = 0; i < rank; i++) {
        // add scalar
        scalars.push(matrix[i][0]);
    }

    return scalars;
};

function getMinors(matrix, mom = false) {
    // store length
    const rank = matrix.length;

    // collect minor submatrices (n - x by n - x submatrices "minors" of n by n matrix)
    let minors = [];

    // collection
    if (!mom) {
        for (let i = 0; i < rank; i++) {
    
            // build minor
            let minor = [];
            for (let col = 0; col < rank; col++) {
    
                let minorColumn = [];
                for (let row = 0; row < rank; row++) {
                    if (col !== i && row !== 0) {
                        minorColumn.push(matrix[col][row]);
                    }
                }
    
                // don't add empty columns
                if (minorColumn.length > 0) {
                    minor.push(minorColumn);
                }
    
            }
    
            // add submatrix to submatrices
            minors.push(minor);
        }
    } else {
        // matrix of minors
        let r = 0;
        let c = 0;
        for (let i = 1; i <= rank**2; i++) {
    
            // build minor
            let minor = [];
            for (let col = 0; col < rank; col++) {
                
                let minorColumn = [];
                for (let row = 0; row < rank; row++) {

                    if (col !== c && row !== r) {
                        minorColumn.push(matrix[col][row]);
                    }

                }
    
                // don't add empty columns
                if (minorColumn.length > 0) {
                    minor.push(minorColumn);
                }

            }
    
            // add submatrix to submatrices
            minors.push(minor);

            // update row and column to be ommitted from minor
            c += 1;
            if (c === rank) {
                c = 0;
            }
            if (i % rank === 0) {
                r += 1;
            }
        }
    }

    return minors;
};

function calculateMatrix(scalar, matrix) {
    return (matrix[0][0] * matrix[1][1] - matrix[1][0] * matrix[0][1]) * scalar;
};

function getDeterminant(matrix) {
    let rank = matrix.length;
    if (rank === 2) {
        // find det(A) for 2 X 2 matrix
        // where A is a 2 x 2 matrix with rows a,b and d,c, det(A) = ad − bc
        return matrix[0][0] * matrix[1][1] - matrix[1][0] * matrix[0][1];
        
    } else {
        // find det(A) for n X n matrix, where n is a positive integer and n > 2
        
        // Laplace Expansion Method
        let determinant = 0;
        
        let minors = getMinors(matrix); // set of minors
        let scalars = getScalars(matrix); // set of scalars

        let test = minors[0].length;
        let x = 1
        
        // break matrix into minors
        while (x < maxRank - 2 && test > 2) {
            // runs for matrices with rank 4 and up to maxrank
            
            if (x === 1) { // rank 4
                // get new set of minors + new set of scalars
                for (let a = 0; a < minors.length; a++) {
                    scalars[a] = [scalars[a], getScalars(minors[a])];
                    minors.splice(a, 1, getMinors(minors[a]));
                }
                
                // get length of first minor in last minors set to test if 2 by 2
                test = minors[0][0].length;
                
            } else if (x === 2) { // rank 5
                // get new set of minors + new set of scalars
                for (let a = 0; a < minors.length; a++) {
                    for (let b = 0; b < minors[a].length; b++) {
                        scalars[a][1][b] = [scalars[a][1][b], getScalars(minors[a][b])];
                        minors[a].splice(b, 1, getMinors(minors[a][b]));
                    }
                }

                // get length of first minor in last minors set to test if 2 by 2
                test = minors[0][0][0].length;
                
            } else if (x === 3) { // rank 6
                // get new set of minors + new set of scalars
                for (let a = 0; a < minors.length; a++) {
                    for (let b = 0; b < minors[a].length; b++) {
                        for (let c = 0; c < minors[a][b].length; c++) {
                            scalars[a][1][b][1][c] = [scalars[a][1][b][1][c] , getScalars(minors[a][b][c])];
                            minors[a][b].splice(c, 1, getMinors(minors[a][b][c]));
                        }
                    }
                }

                // get length of first minor in last minors set to test if 2 by 2
                test = minors[0][0][0][0].length;
                
            } else if (x === 4) { // rank 7
                // get new set of minors + new set of scalars
                for (let a = 0; a < minors.length; a++) {
                    for (let b = 0; b < minors[a].length; b++) {
                        for (let c = 0; c < minors[a][b].length; c++) {
                            for (let d = 0 ; d < minors[a][b][c].length; d++) {
                                scalars[a][1][b][1][c][1][d] = [scalars[a][1][b][1][c][1][d], getScalars(minors[a][b][c][d])];
                                minors[a][b][c].splice(d, 1, getMinors(minors[a][b][c][d]));
                            }
                        }
                    }
                }

                // get length of first minor in last minors set to test if 2 by 2
                test = minors[0][0][0][0][0].length;
                
            } else if (x === 5) { // rank 8
                // get new set of minors + new set of scalars
                for (let a = 0; a < minors.length; a++) {
                    for (let b = 0; b < minors[a].length; b++) {
                        for (let c = 0; c < minors[a][b].length; c++) {
                            for (let d = 0 ; d < minors[a][b][c].length; d++) {
                                for (let e = 0; e < minors[a][b][c][d].length; e++) {
                                    scalars[a][1][b][1][c][1][d][1][e] = [scalars[a][1][b][1][c][1][e], getScalars(minors[a][b][c][d][e])];
                                    minors[a][b][c][d].splice(e, 1, getMinors(minors[a][b][c][d][e]));
                                }
                            }
                        }
                    }
                }
                
                // get length of first minor in last minors set to test if 2 by 2
                test = minors[0][0][0][0][0][0].length;
                
            } else if (x === 6) { // rank 9
                // get new set of minors + new set of scalars
                for (let a = 0; a < minors.length; a++) {
                    for (let b = 0; b < minors[a].length; b++) {
                        for (let c = 0; c < minors[a][b].length; c++) {
                            for (let d = 0 ; d < minors[a][b][c].length; d++) {
                                for (let e = 0; e < minors[a][b][c][d].length; e++) {
                                    for (let f = 0; f < minors[a][b][c][d][e].length; f++) {
                                        scalars[a][1][b][1][c][1][d][1][e][1][f] = [scalars[a][1][b][1][c][1][d][1][e][1][f], getScalars(minors[a][b][c][d][e][f])];
                                        minors[a][b][c][d][e].splice(f, 1, getMinors(minors[a][b][c][d][e][f]));
                                    }
                                }
                            }
                        }
                    }
                }
                
                // get length of first minor in last minors set to test if 2 by 2
                test = minors[0][0][0][0][0][0][0].length;
                
            } else if (x === 7) { // rank 10
                // get new set of minors + new set of scalars
                for (let a = 0; a < minors.length; a++) {
                    for (let b = 0; b < minors[a].length; b++) {
                        for (let c = 0; c < minors[a][b].length; c++) {
                            for (let d = 0 ; d < minors[a][b][c].length; d++) {
                                for (let e = 0; e < minors[a][b][c][d].length; e++) {
                                    for (let f = 0; f < minors[a][b][c][d][e].length; f++) {
                                        for (let g = 0; g < minors[a][b][c][d][e][f].length; g++) {
                                            scalars[a][1][b][1][c][1][d][1][e][1][f][1][g] = [scalars[a][1][b][1][c][1][d][1][e][1][f][1][g], getScalars(minors[a][b][c][d][e][f][g])];
                                            minors[a][b][c][d][e][f].splice(g, 1, getMinors(minors[a][b][c][d][e][f][g]));
                                        }
                                    }
                                }
                            }
                        }
                    }
                }

                // get length of first minor in last minors set to test if 2 by 2
                test = minors[0][0][0][0][0][0][0][0].length;
            }

            // // count levels of nesting
            x += 1;
        }
        
        // console.log(minors);
        // console.log(scalars);

        // calculate determinant with minors and scalars
        if (rank === 3) {
            // compile solution
            compile = 0;
            op = true;
            for (let a = 0; a < minors.length; a++) {
                if (op) {
                    op = !op;
                    compile += calculateMatrix(scalars[a], minors[a]);
                } else {
                    op = !op;
                    compile -= calculateMatrix(scalars[a], minors[a]);
                }
            }

            // apply solution
            determinant = compile;

        } else if (rank === 4) {
            // compile solution
            comp = 0;
            op = true;
            for (let a = 0; a < minors.length; a++) {
                comp2 = 0;
                op2 = true;
                for (let b = 0; b < minors[a].length; b++) {
                    if (op2) {
                        // add
                        op2 = !op2;
                        comp2 += calculateMatrix(scalars[a][1][b], minors[a][b]);
                    } else {
                        op2 = !op2;
                        // subtract
                        comp2 -= calculateMatrix(scalars[a][1][b], minors[a][b]);
                    }
                }
                if (op) {
                    op = !op;
                    comp += comp2 * scalars[a][0];
                } else {
                    op = !op;
                    comp -= comp2 * scalars[a][0];
                }
            }

            // apply solution
            determinant = comp;

        } else if (rank === 5) {
            // compile solution
            comp = 0;
            op = true;
            for (let a = 0; a < minors.length; a++) {
                comp2 = 0;
                op2 = true;
                for (let b = 0; b < minors[a].length; b++) {
                    comp3 = 0;
                    op3 = true;
                    for (let c = 0; c < minors[a][b].length; c++) {
                        if (op3) {
                            // add
                            op3 = !op3;
                            comp3 += calculateMatrix(scalars[a][1][b][1][c], minors[a][b][c]);
                        } else {
                            op3 = !op3;
                            // subtract
                            comp3 -= calculateMatrix(scalars[a][1][b][1][c], minors[a][b][c]);
                        }
                    }
                    if (op2) {
                        op2 = !op2;
                        comp += comp2 * scalars[a][1][b][0];
                    } else {
                        op2 = !op2;
                        comp -= comp2 * scalars[a][1][b][0];
                    }
                }
                if (op) {
                    op = !op;
                    comp += comp2 * scalars[a][0];
                } else {
                    op = !op;
                    comp -= comp2 * scalars[a][0];
                }
            }

            // apply solution
            determinant = comp;

        } else if (rank === 6) {
            // compile solution
            comp = 0;
            op = true;
            for (let a = 0; a < minors.length; a++) {
                comp2 = 0;
                op2 = true;
                for (let b = 0; b < minors[a].length; b++) {
                    comp3 = 0;
                    op3 = true;
                    for (let c = 0; c < minors[a][b].length; c++) {
                        comp4 = 0;
                        op4 = true;
                        for (let d = 0; d < minors[a][b][c].length; d++) {
                            if (op4) {
                                // add
                                op4 = !op4;
                                comp4 += calculateMatrix(scalars[a][1][b][1][c][1][d], minors[a][b][c][d]);
                            } else {
                                op4 = !op4;
                                // subtract
                                comp4 -= calculateMatrix(scalars[a][1][b][1][c][1][d], minors[a][b][c][d]);
                            }
                        }
                        if (op3) {
                            // add
                            op3 = !op3;
                            comp3 += comp4 * scalars[a][1][b][1][c][0];
                        } else {
                            op3 = !op3;
                            // subtract
                            comp3 -= comp4 * scalars[a][1][b][1][c][0];
                        }
                    }
                    if (op2) {
                        op2 = !op2;
                        comp += comp2 * scalars[a][1][b][0];
                    } else {
                        op2 = !op2;
                        comp -= comp2 * scalars[a][1][b][0];
                    }
                }
                if (op) {
                    op = !op;
                    comp += comp2 * scalars[a][0];
                } else {
                    op = !op;
                    comp -= comp2 * scalars[a][0];
                }
            }

            // apply solution
            determinant = comp;

        } else if (rank === 7) {
            // compile solution
            comp = 0;
            op = true;
            for (let a = 0; a < minors.length; a++) {
                comp2 = 0;
                op2 = true;
                for (let b = 0; b < minors[a].length; b++) {
                    comp3 = 0;
                    op3 = true;
                    for (let c = 0; c < minors[a][b].length; c++) {
                        comp4 = 0;
                        op4 = true;
                        for (let d = 0; d < minors[a][b][c].length; d++) {
                            comp5 = 0;
                            op5 = true;
                            for (let e = 0; e < minors[a][b][c][d].length; e++) {
                                if (op5) {
                                    // add
                                    op5 = !op5;
                                    comp5 += calculateMatrix(scalars[a][1][b][1][c][1][d][1][e], minors[a][b][c][d][e]);
                                } else {
                                    op5 = !op5;
                                    // subtract
                                    comp5 -= calculateMatrix(scalars[a][1][b][1][c][1][d][1][e], minors[a][b][c][d][e]);
                                }
                            }
                            if (op4) {
                                // add
                                op4 = !op4;
                                comp4 += comp5 * scalars[a][1][b][1][c][1][d][0];
                            } else {
                                op4 = !op4;
                                // subtract
                                comp4 -= comp5 * scalars[a][1][b][1][c][1][d][0];
                            }
                        }
                        if (op3) {
                            // add
                            op3 = !op3;
                            comp3 += comp4 * scalars[a][1][b][1][c][0];
                        } else {
                            op3 = !op3;
                            // subtract
                            comp3 -= comp4 * scalars[a][1][b][1][c][0];
                        }
                    }
                    if (op2) {
                        op2 = !op2;
                        comp += comp2 * scalars[a][1][b][0];
                    } else {
                        op2 = !op2;
                        comp -= comp2 * scalars[a][1][b][0];
                    }
                }
                if (op) {
                    op = !op;
                    comp += comp2 * scalars[a][0];
                } else {
                    op = !op;
                    comp -= comp2 * scalars[a][0];
                }
            }

            // apply solution
            determinant = comp;

        } else if (rank === 8) {
            // compile solution
            comp = 0;
            op = true;
            for (let a = 0; a < minors.length; a++) {
                comp2 = 0;
                op2 = true;
                for (let b = 0; b < minors[a].length; b++) {
                    comp3 = 0;
                    op3 = true;
                    for (let c = 0; c < minors[a][b].length; c++) {
                        comp4 = 0;
                        op4 = true;
                        for (let d = 0; d < minors[a][b][c].length; d++) {
                            comp5 = 0;
                            op5 = true;
                            for (let e = 0; e < minors[a][b][c][d].length; e++) {
                                comp6 = 0;
                                op6 = true;
                                for (let f = 0; f < minors[a][b][c][d][e].length; f++) {
                                    if (op6) {
                                        // add
                                        op6 = !op6;
                                        comp6 += calculateMatrix(scalars[a][1][b][1][c][1][d][1][e][1][f], minors[a][b][c][d][e][f]);
                                    } else {
                                        op6 = !op6;
                                        // subtract
                                        comp6 -= calculateMatrix(scalars[a][1][b][1][c][1][d][1][e][1][f], minors[a][b][c][d][e][f]);
                                    }
                                }
                                if (op5) {
                                    // add
                                    op5 = !op5;
                                    comp5 += comp6 * scalars[a][1][b][1][c][1][d][1][e][0];
                                } else {
                                    op5 = !op5;
                                    // subtract
                                    comp5 -= comp6 * scalars[a][1][b][1][c][1][d][1][e][0];
                                }
                            }
                            if (op4) {
                                // add
                                op4 = !op4;
                                comp4 += comp5 * scalars[a][1][b][1][c][1][d][0];
                            } else {
                                op4 = !op4;
                                // subtract
                                comp4 -= comp5 * scalars[a][1][b][1][c][1][d][0];
                            }
                        }
                        if (op3) {
                            // add
                            op3 = !op3;
                            comp3 += comp4 * scalars[a][1][b][1][c][0];
                        } else {
                            op3 = !op3;
                            // subtract
                            comp3 -= comp4 * scalars[a][1][b][1][c][0];
                        }
                    }
                    if (op2) {
                        op2 = !op2;
                        comp += comp2 * scalars[a][1][b][0];
                    } else {
                        op2 = !op2;
                        comp -= comp2 * scalars[a][1][b][0];
                    }
                }
                if (op) {
                    op = !op;
                    comp += comp2 * scalars[a][0];
                } else {
                    op = !op;
                    comp -= comp2 * scalars[a][0];
                }
            }

            // apply solution
            determinant = comp;

        } else if (rank === 9) {
            // compile solution
            comp = 0;
            op = true;
            for (let a = 0; a < minors.length; a++) {
                comp2 = 0;
                op2 = true;
                for (let b = 0; b < minors[a].length; b++) {
                    comp3 = 0;
                    op3 = true;
                    for (let c = 0; c < minors[a][b].length; c++) {
                        comp4 = 0;
                        op4 = true;
                        for (let d = 0; d < minors[a][b][c].length; d++) {
                            comp5 = 0;
                            op5 = true;
                            for (let e = 0; e < minors[a][b][c][d].length; e++) {
                                comp6 = 0;
                                op6 = true;
                                for (let f = 0; f < minors[a][b][c][d][e].length; f++) {
                                    comp7 = 0;
                                    op7 = true;
                                    for (let g = 0; g < minors[a][b][c][d][e][f].length; g++) {
                                        if (op7) {
                                            // add
                                            op7 = !op7;
                                            comp7 += calculateMatrix(scalars[a][1][b][1][c][1][d][1][e][1][f][1][g], minors[a][b][c][d][e][f][g]);
                                        } else {
                                            op7 = !op7;
                                            // subtract
                                            comp7 -= calculateMatrix(scalars[a][1][b][1][c][1][d][1][e][1][f][1][g], minors[a][b][c][d][e][f][g]);
                                        }
                                    }
                                    if (op6) {
                                        // add
                                        op6 = !op6;
                                        comp6 += comp7 * scalars[a][1][b][1][c][1][d][1][e][1][f][0];
                                    } else {
                                        op6 = !op6;
                                        // subtract
                                        comp6 -= comp7 * scalars[a][1][b][1][c][1][d][1][e][1][f][0];
                                    }
                                }
                                if (op5) {
                                    // add
                                    op5 = !op5;
                                    comp5 += comp6 * scalars[a][1][b][1][c][1][d][1][e][0];
                                } else {
                                    op5 = !op5;
                                    // subtract
                                    comp5 -= comp6 * scalars[a][1][b][1][c][1][d][1][e][0];
                                }
                            }
                            if (op4) {
                                // add
                                op4 = !op4;
                                comp4 += comp5 * scalars[a][1][b][1][c][1][d][0];
                            } else {
                                op4 = !op4;
                                // subtract
                                comp4 -= comp5 * scalars[a][1][b][1][c][1][d][0];
                            }
                        }
                        if (op3) {
                            // add
                            op3 = !op3;
                            comp3 += comp4 * scalars[a][1][b][1][c][0];
                        } else {
                            op3 = !op3;
                            // subtract
                            comp3 -= comp4 * scalars[a][1][b][1][c][0];
                        }
                    }
                    if (op2) {
                        op2 = !op2;
                        comp += comp2 * scalars[a][1][b][0];
                    } else {
                        op2 = !op2;
                        comp -= comp2 * scalars[a][1][b][0];
                    }
                }
                if (op) {
                    op = !op;
                    comp += comp2 * scalars[a][0];
                } else {
                    op = !op;
                    comp -= comp2 * scalars[a][0];
                }
            }

            // apply solution
            determinant = comp;

        } else if (rank === 10) {
            // compile solution
            comp = 0;
            op = true;
            for (let a = 0; a < minors.length; a++) {
                comp2 = 0;
                op2 = true;
                for (let b = 0; b < minors[a].length; b++) {
                    comp3 = 0;
                    op3 = true;
                    for (let c = 0; c < minors[a][b].length; c++) {
                        comp4 = 0;
                        op4 = true;
                        for (let d = 0; d < minors[a][b][c].length; d++) {
                            comp5 = 0;
                            op5 = true;
                            for (let e = 0; e < minors[a][b][c][d].length; e++) {
                                comp6 = 0;
                                op6 = true;
                                for (let f = 0; f < minors[a][b][c][d][e].length; f++) {
                                    comp7 = 0;
                                    op7 = true;
                                    for (let g = 0; g < minors[a][b][c][d][e][f].length; g++) {
                                        comp8 = 0;
                                        op8 = true;
                                        for (let h = 0; h < minors[a][b][c][d][e][f][g].length; h++) {
                                            if (op8) {
                                                // add
                                                op8 = !op8;
                                                comp8 += calculateMatrix(scalars[a][1][b][1][c][1][d][1][e][1][f][1][g][1][h], minors[a][b][c][d][e][f][g][h]);
                                            } else {
                                                op8 = !op8;
                                                // subtract
                                                comp8 -= calculateMatrix(scalars[a][1][b][1][c][1][d][1][e][1][f][1][g][1][h], minors[a][b][c][d][e][f][g][h]);
                                            }
                                        }
                                        if (op7) {
                                            // add
                                            op7 = !op7;
                                            comp7 += comp8 * scalars[a][1][b][1][c][1][d][1][e][1][f][1][g][0];
                                        } else {
                                            op7 = !op7;
                                            // subtract
                                            comp7 -= comp8 * scalars[a][1][b][1][c][1][d][1][e][1][f][1][g][0];
                                        }
                                    }
                                    if (op6) {
                                        // add
                                        op6 = !op6;
                                        comp6 += comp7 * scalars[a][1][b][1][c][1][d][1][e][1][f][0];
                                    } else {
                                        op6 = !op6;
                                        // subtract
                                        comp6 -= comp7 * scalars[a][1][b][1][c][1][d][1][e][1][f][0];
                                    }
                                }
                                if (op5) {
                                    // add
                                    op5 = !op5;
                                    comp5 += comp6 * scalars[a][1][b][1][c][1][d][1][e][0];
                                } else {
                                    op5 = !op5;
                                    // subtract
                                    comp5 -= comp6 * scalars[a][1][b][1][c][1][d][1][e][0];
                                }
                            }
                            if (op4) {
                                // add
                                op4 = !op4;
                                comp4 += comp5 * scalars[a][1][b][1][c][1][d][0];
                            } else {
                                op4 = !op4;
                                // subtract
                                comp4 -= comp5 * scalars[a][1][b][1][c][1][d][0];
                            }
                        }
                        if (op3) {
                            // add
                            op3 = !op3;
                            comp3 += comp4 * scalars[a][1][b][1][c][0];
                        } else {
                            op3 = !op3;
                            // subtract
                            comp3 -= comp4 * scalars[a][1][b][1][c][0];
                        }
                    }
                    if (op2) {
                        op2 = !op2;
                        comp += comp2 * scalars[a][1][b][0];
                    } else {
                        op2 = !op2;
                        comp -= comp2 * scalars[a][1][b][0];
                    }
                }
                if (op) {
                    op = !op;
                    comp += comp2 * scalars[a][0];
                } else {
                    op = !op;
                    comp -= comp2 * scalars[a][0];
                }
            }

            // apply solution
            determinant = comp;

        }

        // console.log(determinant);
        return determinant;
    }
};

function isZeroRows(matrix) {
    // returns true if it finds a zero row, else false
    let zeroes = 0;
    for (let row = 0; row < matrix[0].length; row++) {
        zeroes = 0;
        for (let column = 0; column < matrix.length; column++) {
            if (matrix[column][row] == 0) {
                zeroes += 1;
            }
        }
        if (zeroes === matrix[0].length) {
            return true;
        }
    }
    return false;
};

function isZeroCols(matrix) {
    // returns true if it finds a zero column, else false
    let zeroes = 0;
    for (let column = 0; column < matrix.length; column++) {
        zeroes = 0;
        for (let row = 0; row < matrix[0].length; row++) {
            if (matrix[column][row] == 0) {
                zeroes += 1;
            }
        }
        if (zeroes === matrix.length) {
            return true;
        }
    }
    return false;
};

function isDuplicateRows(matrix) {
    // test for duplicate rows
    // duplicate rows are essentially an elementary operation away from being rows with all zeroes
    let duplicateRows = false;
    let currentIndex = 0;
    let sameCount = 0;
    let test = [];
    let current = [];

    for (a in matrix) {
        // get current row to compare against various test rows
        current = [];
        for (let column = 0; column < matrix.length; column++) {
            current.push(matrix[column][currentIndex]);
        }

        // get and compare rows
        for (let row = currentIndex + 1; row < matrix[0].length; row++) {
            // get next test row
            test = [];
            for (let column = 0; column < matrix.length; column++) {
                test.push(matrix[column][row]);
            }

            // compare test row against current row
            sameCount = 0
            for (let i = 0; i < matrix[0].length; i++) {
                if (current[i] === test[i]) {
                    sameCount += 1;
                }
            }
            if (sameCount === matrix[0].length) {
                duplicateRows = true;
                break;
            }
        }

        if (duplicateRows === false) {
            currentIndex += 1;
        } else {
            break;
        }
    }

    return duplicateRows;
};

function isDuplicateCols(matrix) {
    // test for duplicate cols
    let duplicateCols = false;
    let currentIndex = 0;
    let sameCount = 0;
    let test = [];
    let current = [];
    for (a in matrix) {
        // get current column to compare against various test columns
        current = [];
        for (let row = 0; row < matrix[0].length; row++) {
            current.push(matrix[currentIndex][row]);
        }

        // get and compare columns
        for (let column = currentIndex + 1; column < matrix.length; column++) {
            // get next test column
            test = [];
            for (let row = 0; row < matrix[0].length; row++) {
                test.push(matrix[column][row]);
            }

            // compare test column against current column
            sameCount = 0
            for (let i = 0; i < matrix.length; i++) {
                if (current[i] === test[i]) {
                    sameCount += 1;
                }
            }
            if (sameCount === matrix.length) {
                duplicateCols = true;
                break;
            }
        }

        if (duplicateCols === false) {
            currentIndex += 1;
        } else {
            break;
        }
    }

    return duplicateCols;
};

// elementary row operations

function interchangeRows(row1, row2, matrix) {
    // elementary row operation to switch row1 with row 2
    // get row vals
    let r1 = [];
    let r2 = [];
    for (let col = 0; col < matrix.length; col++) {
        r1.push(matrix[col][row1]);
    }
    for (let col = 0; col < matrix.length; col++) {
        r2.push(matrix[col][row2]);
    }
    // apply vals to rows
    for (let i = 0; i < matrix.length; i++) {
        matrix[i][row1] = r2[i]
    }
    for (let i = 0; i < matrix.length; i++) {
        matrix[i][row2] = r1[i]
    }
    // return matrix with interchanged rows
    return matrix
};

function scaleRow(row, multiplier, matrix) {
    // elementary row operation to multiply a row by a non-zero number
    if (multiplier !== 0) {
        for (let col = 0; col < matrix.length; col++) {
            matrix[col][row] = matrix[col][row] * multiplier;
        }
    }
    // return matrix with multiplied row
    return matrix;
};

function rowAddition(row1, row2, matrix, multiplier = 1) {
    // elementary row operation to add a non-zero multiple of row1 to row2, where those are different rows
    
    // get row vals
    let r1 = [];
    let r2 = [];
    for (let col = 0; col < matrix.length; col++) {
        r1.push(matrix[col][row1]);
    }
    for (let col = 0; col < matrix.length; col++) {
        r2.push(matrix[col][row2]);
    }

    if (multiplier !== 0) {
        if (multiplier !== 1) {
            // multiply row 1 values by non-zero multiplier
            for (let i = 0; i < r1.length; i++) {
                r1[i] = r1[i] * multiplier;
            }
            // add multiplied row 1 values to values of row 2
            for (let i = 0; i < r1.length; i++) {
                matrix[i][row2] = r2[i] + r1[i];
            }
        } else {
            // add multiplied row 1 values to values of row 2
            for (let i = 0; i < r1.length; i++) {
                matrix[i][row2] = r1[i] + r2[i];
            }
        }
    }

    // return matrix with multiplied row
    return matrix;
};

// dynamically update form elements
const containerElement = document.querySelector('#dynamic-content-container');
function updateForm() {

    // remove listeners

    // Sets

    const maxSet = document.querySelector('#maximum-set-value');
    if (maxSet !== null) {
        maxSet.removeEventListener('change', maximumSetValueValid);
    }

    const minSet = document.querySelector('#minimum-set-value');
    if (minSet !== null) {
        minSet.removeEventListener('change', minimumSetValueValid);
    }

    const operendType = document.querySelector('#operend-type');
    if (operendType !== null) {
        operendType.removeEventListener('change', updateSetFormInput);
    }

    // Codomains

    // Domain A
    const maxDomA = document.querySelector('#maximum-domain-a');
    if (maxDomA !== null) {
        maxDomA.removeEventListener('change', maximumDomainValueValidA);
    }

    const minDomA = document.querySelector('#minimum-domain-a');
    if (minDomA !== null) {
        minDomA.removeEventListener('change', minimumDomainValueValidA);
    }

    // Domain B
    const maxDomB = document.querySelector('#minimum-domain-a');
    if (maxDomB !== null) {
        maxDomB.removeEventListener('change', maximumDomainValueValidB);
    }

    const minDomB = document.querySelector('#minimum-domain-b');
    if (minDomB !== null) {
        minDomB.removeEventListener('change', minimumDomainValueValidB);
    }

    // Matrix
    const operandType = document.querySelector('#operand-type');
    if (operandType !== null) {
        operandType.removeEventListener('change', updateMatrixForm);
    }

    const colRankA = document.querySelector('#col-rank-a');
    if (colRankA !== null) {
        colRankA.removeEventListener('change', updateMatrixForm);
    }

    const rowRankA = document.querySelector('#row-rank-a');
    if (rowRankA !== null) {
        rowRankA.removeEventListener('change', updateMatrixForm);
    }
    
    const colRankB = document.querySelector('#col-rank-b');
    if (colRankB !== null) {
        colRankB.removeEventListener('change', updateMatrixForm);
    }
    
    const rowRankB = document.querySelector('#row-rank-b');
    if (rowRankB !== null) {
        rowRankB.removeEventListener('change', updateMatrixForm);
    }

    // clear previous elements
    containerElement.innerHTML = '';

    // clear previous answer
    document.querySelector('#answer-field').innerHTML = '';

    // get type data from form
    const type = document.querySelector('#operand-type').value;

    // render form by type
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
        option13.setAttribute('name', 'modulo');
        option13.setAttribute('value', 'modulo');
        option13.innerText = 'modulo';
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
        selectLabel2.innerText = 'Operend';

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
        option5l1.setAttribute('name', 'modulo');
        option5l1.setAttribute('value', 'modulo');
        option5l1.innerText = 'modulo';
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
        document.querySelector('#maximum-set-value').addEventListener('change', maximumSetValueValid);
        document.querySelector('#minimum-set-value').addEventListener('change', minimumSetValueValid);
        document.querySelector('#operend-type').addEventListener('change', updateSetFormInput);

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
        document.querySelector('#maximum-domain-a').addEventListener('change', maximumDomainValueValidA);
        document.querySelector('#minimum-domain-a').addEventListener('change', minimumDomainValueValidA);
        
        document.querySelector('#maximum-domain-b').addEventListener('change', maximumDomainValueValidB);
        document.querySelector('#minimum-domain-b').addEventListener('change', minimumDomainValueValidB);

    } else if (type === 'matrix') {
        // parameters
        const defaultColumns = 2;
        const defaultRows = 2;

        // operator selector label
        const selectLabel = document.createElement('label');
        selectLabel.setAttribute('for', 'operator-type');
        selectLabel.innerText = 'Operator';
        
        // operator selection
        const select = document.createElement('select');
        select.setAttribute('id', 'operator-type');
        select.setAttribute('name', 'operator-type');
        select.setAttribute('required', 'true');
        select.setAttribute('value', 'matrix addition');

        select.appendChild(buildOption('matrix addition', true));
        select.appendChild(buildOption('matrix multiplication'));
        select.appendChild(buildOption('matrix subtraction'));
        // select.appendChild(buildOption('mutliply by inverse'));
        select.appendChild(buildOption('scalar multiplication'));
        select.appendChild(buildOption('negation'));
        select.appendChild(buildOption('inversion'));
        select.appendChild(buildOption('transposition'));
        select.appendChild(buildOption('determinant'));

        // Matrix A
        const labelA = document.createElement('label');
        labelA.setAttribute('for', 'Matrix A');
        labelA.innerText = 'Matrix A';

        const rowRankA = document.createElement('input');
        rowRankA.setAttribute('id', 'row-rank-a');
        rowRankA.setAttribute('type', 'number');
        rowRankA.setAttribute('name', 'row-rank-a');
        rowRankA.setAttribute('min', '2');
        rowRankA.setAttribute('value', `${defaultRows}`);
        rowRankA.setAttribute('required', 'true');
        
        const colRankA = document.createElement('input');
        colRankA.setAttribute('id', 'col-rank-a');
        colRankA.setAttribute('type', 'number');
        colRankA.setAttribute('name', 'col-rank-a');
        colRankA.setAttribute('min', '2');
        colRankA.setAttribute('value', `${defaultColumns}`);
        colRankA.setAttribute('required', 'true');
        
        // Matrix B
        const labelB = document.createElement('label');
        labelB.setAttribute('for', 'Matrix B');
        labelB.innerText = 'Matrix B';
        
        const rowRankB = document.createElement('input');
        rowRankB.setAttribute('id', 'row-rank-b');
        rowRankB.setAttribute('type', 'number');
        rowRankB.setAttribute('name', 'row-rank-b');
        rowRankB.setAttribute('min', '2');
        rowRankB.setAttribute('value', `${defaultRows}`);
        rowRankB.setAttribute('required', 'true');

        const colRankB = document.createElement('input');
        colRankB.setAttribute('id', 'col-rank-b');
        colRankB.setAttribute('type', 'number');
        colRankB.setAttribute('name', 'col-rank-b');
        colRankB.setAttribute('min', '2');
        colRankB.setAttribute('value', `${defaultColumns}`);
        colRankB.setAttribute('required', 'true');

        // append elements
        containerElement.appendChild(selectLabel);
        containerElement.appendChild(select);

        containerElement.appendChild(labelA);
        containerElement.appendChild(rowRankA);
        containerElement.appendChild(colRankA);
        
        containerElement.appendChild(labelB);
        containerElement.appendChild(rowRankB);
        containerElement.appendChild(colRankB);

        containerElement.appendChild(buildMatrix('A', defaultRows, defaultColumns));
        containerElement.appendChild(buildMatrix('B', defaultRows, defaultColumns));

        // add listeners
        document.querySelector('#operator-type').addEventListener('change', updateMatrixForm);
        document.querySelector('#col-rank-a').addEventListener('change', updateMatrixForm);
        document.querySelector('#row-rank-a').addEventListener('change', updateMatrixForm);
        document.querySelector('#col-rank-b').addEventListener('change', updateMatrixForm);
        document.querySelector('#row-rank-b').addEventListener('change', updateMatrixForm);

    }

    // handle answer-field overflow
    const answerField = document.querySelector('#answer-field');
    if (answerField.scrollWidth > answerField.offsetWidth || answerField.scrollHeight > answerField.offsetHeight) {
        answerField.setAttribute('style', 'padding-bottom: 10px');
    } else {
        answerField.setAttribute('style', 'padding-bottom: 0px');
    }
};
updateForm();
document.querySelector('#operand-type').addEventListener('change', updateForm);

// operate button click
document.querySelector('#operate-button').addEventListener('click', () => {
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
        } else if (operatorType === 'modulo') {
            answer = modulo(a,b);
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
                } else if (operatorType === 'modulo') {
                    // initialize with first element in list
                    answer = set[0];
                    // operate on set in order and assign to answer variable
                    for (let i = 1; i < set.length; i++) {
                        answer = modulo(answer,set[i]);
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
                } else if (operatorType === 'modulo') {
                    // declare an empty array to contain set of operated elements
                    let operated = [];
                    // operate on set and assign to answer variable
                    for (let i = 0; i < set.length; i++) {
                        operated.push(modulo(set[i], elementalOperand));
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
            for (let i = 0; i <= Math.abs(maximumA - minimumA); i = i + 0.1) {
                const num = minimumA + i;
                const str = num.toString();
                const parts = str.split('.', 2);
                if (parts.length > 1) {
                    const x = Number(parts[0] + '.' + parts[1].slice(0, 1));
                    domainA.push(x);
                } else {
                    const x = Number(parts[0]);
                    domainA.push(x);
                }
            }
            domainA.push(maximumA);
        } else if (numberTypeA === 'rational-hundredth') {
            for (let i = 0; i <= Math.abs(maximumA - minimumA); i = i + 0.01) {
                const num = minimumA + i;
                const str = num.toString();
                const parts = str.split('.', 2);
                if (parts.length > 1) {
                    const x = Number(parts[0] + '.' + parts[1].slice(0, 2));
                    domainA.push(x);
                } else {
                    const x = Number(parts[0]);
                    domainA.push(x);
                }
            }
            domainA.push(maximumA);
        } else if (numberTypeA === 'rational-thousandth') {
            for (let i = 0; i <= Math.abs(maximumA - minimumA); i = i + 0.001) {
                const num = minimumA + i;
                const str = num.toString();
                const parts = str.split('.', 2);
                if (parts.length > 1) {
                    const x = Number(parts[0] + '.' + parts[1].slice(0, 3));
                    domainA.push(x);
                } else {
                    const x = Number(parts[0]);
                    domainA.push(x);
                }
            }
            domainA.push(maximumA);
        }

        // build domain b
        let domainB = [];
        if (numberTypeB === 'integers') {
            for (let i = minimumB; i <= maximumB; i++) {
                domainB.push(i);
            }
        } else if (numberTypeB === 'rational-tenth') {
            for (let i = 0; i <= Math.abs(maximumB - minimumB); i = i + 0.1) {
                const num = minimumB + i;
                const str = num.toString();
                const parts = str.split('.', 2);
                if (parts.length > 1) {
                    const x = Number(parts[0] + '.' + parts[1].slice(0, 1));
                    domainB.push(x);
                } else {
                    const x = Number(parts[0]);
                    domainB.push(x);
                }
            }
            domainB.push(maximumB);
        } else if (numberTypeB === 'rational-hundredth') {
            for (let i = 0; i <= Math.abs(maximumB - minimumB); i = i + 0.01) {
                const num = minimumB + i;
                const str = num.toString();
                const parts = str.split('.', 2);
                if (parts.length > 1) {
                    const x = Number(parts[0] + '.' + parts[1].slice(0, 2));
                    domainB.push(x);
                } else {
                    const x = Number(parts[0]);
                    domainB.push(x);
                }
            }
            domainB.push(maximumB);
        } else if (numberTypeB === 'rational-thousandth') {
            for (let i = 0; i <= Math.abs(maximumB - minimumB); i = i + 0.001) {
                const num = minimumB + i;
                const str = num.toString();
                const parts = str.split('.', 2);
                if (parts.length > 1) {
                    const x = Number(parts[0] + '.' + parts[1].slice(0, 3));
                    domainB.push(x);
                } else {
                    const x = Number(parts[0]);
                    domainB.push(x);
                }
            }
            domainB.push(maximumB);
        }

        // remove duplicates
        domainA = removeDuplicates(domainA);
        domainB = removeDuplicates(domainB);

        // linear operators
        if (operatorType === 'conjunction') {
            answer = conjunction(domainA, domainB);
            if (answer.length === 0) {
                answer = 0;
            }

            // get display data
            const percentA = common(answer, domainA).length / domainA.length * 100;
            const percentB = common(answer, domainB).length / domainB.length * 100;

            // display answer
            answerField.innerHTML = `<div>Conjunction</div> <div class="answer-data-layout"> <div class="answer-data-col-1">Percent A: </div> <div class="answer-data-col-2">${percentA}%</div> </div> <div class="answer-data-layout"> <div class="answer-data-col-1">Percent B: </div> <div class="answer-data-col-2">${percentB}%</div> </div> <div class="answer-data-layout"> <div class="answer-data-col-1">Elements: </div> <div class="answer-data-col-2">${answer.toString()}</div> </div> <div>Domain A</div> <div class="answer-data-layout"> <div class="answer-data-col-1">Elements: </div> <div class="answer-data-col-2">${domainA.toString()}</div> </div> <div>Domain B</div> <div class="answer-data-layout"> <div class="answer-data-col-1">Elements: </div> <div class="answer-data-col-2">${domainB.toString()}</div> </div>`;
        } else if (operatorType === 'disjunction') {
            answer = disjunction(domainA, domainB);
            if (answer.length === 0) {
                answer = 0;
            }

            // get display data
            const percentA = common(answer, domainA).length / domainA.length * 100;
            const percentB = common(answer, domainB).length / domainB.length * 100;

            // display answer
            answerField.innerHTML = `<div>Disjunction</div> <div class="answer-data-layout"> <div class="answer-data-col-1">Percent A: </div> <div class="answer-data-col-2">${percentA}%</div> </div> <div class="answer-data-layout"> <div class="answer-data-col-1">Percent B: </div> <div class="answer-data-col-2">${percentB}%</div> </div> <div class="answer-data-layout"> <div class="answer-data-col-1">Elements: </div> <div class="answer-data-col-2">${answer.toString()}</div> </div> <div>Domain A</div> <div class="answer-data-layout"> <div class="answer-data-col-1">Elements: </div> <div class="answer-data-col-2">${domainA.toString()}</div> </div> <div>Domain B</div> <div class="answer-data-layout"> <div class="answer-data-col-1">Elements: </div> <div class="answer-data-col-2">${domainB.toString()}</div> </div>`;
        }
    } else if (operandType === 'matrix') {
        if (operatorType === 'matrix addition') {
            // get matrix ranks
            const rowRankA = Number(document.querySelector('#row-rank-a').value);
            const colRankA = Number(document.querySelector('#col-rank-a').value);
            const rowRankB = Number(document.querySelector('#row-rank-b').value);
            const colRankB = Number(document.querySelector('#col-rank-b').value);

            // compare ranks between matrices
            if (rowRankA === rowRankB && colRankA === colRankB) {

                // initialize strutures
                let valsA = []; // contains all values of Matrix A in order
                let valsB = []; // contains all values of Matrix B in order
                let vals = []; // contains sums of all elements in valsA and valsB
                
                // determine larger rank
                if (rowRankA < colRankA) {

                    // columns have larger rank
                    
                    // populate valsA
                    for (let i = 1; i < colRankA + 1; i++) {
                        document.querySelectorAll(`.matrix-A-row-${i}`).forEach((val) => {
                            valsA.push(Number(val.value));
                        });
                    }
                    
                    // populate valsB
                    for (let i = 1; i < colRankB + 1; i++) {
                        document.querySelectorAll(`.matrix-B-row-${i}`).forEach((val) => {
                            valsB.push(Number(val.value));
                        });
                    }
        
                    // populate vals
                    for (let i = 0; i < valsA.length; i++) {
                        vals.push(valsA[i] + valsB[i]);
                    }

                } else {

                    // ranks are the same or rows have larger rank

                    // populate valsA
                    for (let i = 1; i < rowRankA + 1; i++) {
                        document.querySelectorAll(`.matrix-A-col-${i}`).forEach((val) => {
                            valsA.push(Number(val.value));
                        });
                    }
                    
                    // populate valsB
                    for (let i = 1; i < rowRankB + 1; i++) {
                        document.querySelectorAll(`.matrix-B-col-${i}`).forEach((val) => {
                            valsB.push(Number(val.value));
                        });
                    }
        
                    // populate vals
                    for (let i = 0; i < valsA.length; i++) {
                        vals.push(valsA[i] + valsB[i]);
                    }
                }

                displayProductMatrix(rowRankA, colRankA, vals);

            } else {
                // display error
                answerField.innerText = 'Matrices have different rank';
            }

        } else if (operatorType === 'matrix multiplication') {
            // get matrix ranks
            const rowRankA = Number(document.querySelector('#row-rank-a').value);
            const colRankA = Number(document.querySelector('#col-rank-a').value);
            const rowRankB = Number(document.querySelector('#row-rank-b').value);
            const colRankB = Number(document.querySelector('#col-rank-b').value);

            // compare ranks between matrices
            if (rowRankA === colRankB && colRankA === rowRankB) {

                // initialize strutures
                let valsA = []; // contains all values of Matrix A in order
                let valsB = []; // contains all values of Matrix B in order
                let vals = []; // contains sums of all elements in valsA and valsB

                for (let i = 1; i < colRankB + 1; i++) {
                    for (let j = 1; j < rowRankA + 1; j++) {

                        // clear data
                        valsA = [];
                        valsB = [];

                        // get values
                        document.querySelectorAll(`.matrix-A-row-${j}`).forEach((val) => {
                            valsA.push(Number(val.value));
                        });
                        document.querySelectorAll(`.matrix-B-col-${i}`).forEach((val) => {
                            valsB.push(Number(val.value));
                        });

                        // calculate dot product
                        let sum = 0;
                        for (let k = 0; k < valsA.length; k++) {
                            sum += valsA[k] * valsB[k];
                        }

                        // append solution
                        vals.push(sum);
                    }
                }

                displayProductMatrix(rowRankA, colRankB, vals);

            } else {
                // display error
                answerField.innerText = 'A row ≠ B col or A col ≠ B row';
            }

        } else if (operatorType === 'matrix subtraction') {
            // get matrix ranks
            const rowRankA = Number(document.querySelector('#row-rank-a').value);
            const colRankA = Number(document.querySelector('#col-rank-a').value);
            const rowRankB = Number(document.querySelector('#row-rank-b').value);
            const colRankB = Number(document.querySelector('#col-rank-b').value);

            // compare ranks between matrices
            if (rowRankA === rowRankB && colRankA === colRankB) {

                // initialize strutures
                let valsA = []; // contains all values of Matrix A in order
                let valsB = []; // contains all values of Matrix B in order
                let vals = []; // contains sums of all elements in valsA and valsB
                
                // determine larger rank
                if (rowRankA < colRankA) {

                    // columns have larger rank
                    
                    // populate valsA
                    for (let i = 1; i < colRankA + 1; i++) {
                        document.querySelectorAll(`.matrix-A-row-${i}`).forEach((val) => {
                            valsA.push(Number(val.value));
                        });
                    }
                    
                    // populate valsB
                    for (let i = 1; i < colRankB + 1; i++) {
                        document.querySelectorAll(`.matrix-B-row-${i}`).forEach((val) => {
                            valsB.push(Number(val.value));
                        });
                    }
        
                    // populate vals
                    for (let i = 0; i < valsA.length; i++) {
                        vals.push(valsA[i] - valsB[i]);
                    }

                } else {

                    // ranks are the same or rows have larger rank

                    // populate valsA
                    for (let i = 1; i < rowRankA + 1; i++) {
                        document.querySelectorAll(`.matrix-A-col-${i}`).forEach((val) => {
                            valsA.push(Number(val.value));
                        });
                    }
                    
                    // populate valsB
                    for (let i = 1; i < rowRankB + 1; i++) {
                        document.querySelectorAll(`.matrix-B-col-${i}`).forEach((val) => {
                            valsB.push(Number(val.value));
                        });
                    }
        
                    // populate vals
                    for (let i = 0; i < valsA.length; i++) {
                        vals.push(valsA[i] - valsB[i]);
                    }
                }

                displayProductMatrix(rowRankA, colRankA, vals);

            } else {
                // display error
                answerField.innerText = 'Matrices have different rank';
            }

        } else if (operatorType === 'multiply by inverse') {
        } else if (operatorType === 'scalar multiplication') {
            // get scalar
            const scalar = Number(document.querySelector('#scalar').value);

            // get matrix ranks
            const rowRankA = Number(document.querySelector('#row-rank-a').value);
            const colRankA = Number(document.querySelector('#col-rank-a').value);

            // initialize strutures
            let valsA = []; // contains each value of Matrix A in display order
            let vals = []; // contains negated values

            // populate valsA with columns
            for (let i = 0; i < colRankA; i++) {
                document.querySelectorAll(`.matrix-A-col-${i + 1}`).forEach((val) => {
                    valsA.push(val.value);
                });
            }

            // negate all the vals
            valsA.forEach((val) => {
                vals.push(scalar * val);
            });

            // display results
            displayProductMatrix(rowRankA, colRankA, vals);

        } else if (operatorType === 'negation') {

            // get matrix ranks
            const rowRankA = Number(document.querySelector('#row-rank-a').value);
            const colRankA = Number(document.querySelector('#col-rank-a').value);

            // initialize strutures
            let valsA = []; // contains each value of Matrix A in display order
            let vals = []; // contains negated values

            // populate valsA with columns
            for (let i = 0; i < colRankA; i++) {
                document.querySelectorAll(`.matrix-A-col-${i + 1}`).forEach((val) => {
                    valsA.push(val.value);
                });
            }

            // negate all the vals
            valsA.forEach((val) => {
                vals.push(-Number(val));
            });

            // display results
            displayProductMatrix(rowRankA, colRankA, vals);

        } else if (operatorType === 'inversion') {
            // get matrix ranks
            const rowRankA = Number(document.querySelector('#row-rank-a').value);
            const colRankA = Number(document.querySelector('#col-rank-a').value);

            // compare ranks between matrices
            if (rowRankA === colRankA) {
                // is a square matrix
                if (rowRankA < maxRank) { // exclude the maximum and beyond for safe processing
                    // initialize strutures
                    let matrix = []; // contains 2D array; 1st D = column number; 2nd D = row number; matrix[column][row]
                    let identityMatrix = []; // contains the identity matrix of matrix
                    let vals = []; // contains values of inverted matrix
        
                    // populate matrix with columns and rows
                    for (let i = 0; i < colRankA; i++) {
                        let column = [];
                        const col = document.querySelectorAll(`.matrix-A-col-${i + 1}`);
                        for (let j = 0; j < rowRankA; j++) {
                            column.push(Math.floor(Number(col[j].value)));
                        }
                        matrix.push(column);
                    }

                    // test for rows and columns with all zeroes
                    // test for rows and columns with duplicates
                    let zeroRows = isZeroRows(matrix); // test for zero rows first
                    let zeroCols = true;
                    let duplicateRows = true;
                    let duplicateCols = true;
                    
                    // if no zero rows
                    if (!zeroRows) {
                        zeroCols = isZeroCols(matrix); // then, test for zero columns
                        
                        // if no zero columns
                        if (!zeroCols) {
                            duplicateRows = isDuplicateRows(matrix);

                            // if no duplicate rows
                            if (!duplicateRows) {
                                duplicateCols = isDuplicateCols(matrix);
                                
                                // if there are duplicate columns
                                if (duplicateCols) {
                                    // display error
                                    answerField.innerText = 'contains duplicate columns';
                                }
                                
                            } else {
                                // display error
                                answerField.innerText = 'contains duplicate rows';
                            }

                        } else {
                            // display error
                            answerField.innerText = 'contains column with all zeroes';
                        }

                    } else {
                        // display error
                        answerField.innerText = 'contains row with all zeroes';
                    }

                    if (!zeroRows && !zeroCols && !duplicateRows && !duplicateCols) {
                        
                        // calculate determinant of matrix
                        const determinant = getDeterminant(matrix);
    
                        if (determinant !== 0) {
                            // conditions for matrix inversion
                            // non-zero determinant
                            // no zero rows
                            // no zero columns
                            // no duplicate rows
                            // no duplicate columns
                            // is square matrix
                            
                            // Method 1: Gauss Jordan Elimination
                            // get reduced row echelon form of matrix, applying same operations to identity matrix
                            // reduced row echelon form  = upper and lower triangle matrix for square matrices
                            // once reduced row echelon form is achieved with the given matrix,
                            // then, the identity matrix will be the inverse of the given matrix

                            // build identity matrix
                            let indexOfOne = 0;
                            for (let i = 0; i < colRankA; i++) {
                                let column = [];
                                for (let j = 0; j < rowRankA; j++) {
                                    if (j === indexOfOne) {
                                        column.push(1);
                                    } else {
                                        column.push(0);
                                    }
                                }
                                identityMatrix.push(column);
                                indexOfOne += 1;
                            }

                            let stop = false;
                            let operating = true;
                            let operations = 0;
                            const maximum = (maxRank - 1) ** 2 * 10; // number of elements in the matrix * 10
                            while (operations < maximum && operating && !zeroRows && !zeroCols) {
                                // determine pivot column and pivot element
                                for (let i = 0; i < colRankA; i++) {
                                    for (let j = 0; j < rowRankA; j++) {
                                        // i = pivot column index
                                        // j = pivot element row index
                                        // matrix[i][j] = pivot element of the matrix
                                        const pivot = matrix[i][j];

                                        if (i === j) {
                                            // is a diagonal
                                            if (pivot === 1) {
                                                if (i === colRankA - 1) {
                                                    // terminating condition
                                                    // no pivot element on last element
                                                    operating = false;
                                                    stop = true;
                                                    break;
                                                } else {
                                                    // skip diagonals with value of one
                                                    continue;
                                                }
                                            } else if (pivot === 0) {
                                                // zero valued diagonal pivot element

                                                // find row k for row interchange
                                                for (let k = 0; k < rowRankA; k++) {
                                                    if (matrix[i][k] !== 0) {
                                                        // matrix
                                                        matrix = interchangeRows(k, j, matrix);
                                                        // identity
                                                        identityMatrix = interchangeRows(k, j, identityMatrix);
                                                        break;
                                                    }
                                                }

                                                // stop iterating and determine next pivot element
                                                stop = true;
                                                break;
                                            }
                                            
                                        } else if (pivot !== 0) {
                                            // non-diagonal and non-zero pivot element

                                            for (let k = 0; k < rowRankA; k++) {
                                                // search for a non-zero value in other row of pivot column
                                                if (k !== j  && matrix[i][k] !== 0) {
                                                    // matrix[i][k] is that value
                                                    // get LCM of matrix[i][j] and matrix[i][k]
                                                    const tovip = matrix[i][k];
                                                    const LCM = lcm(pivot, tovip);

                                                    // use LCM to get scalars
                                                    const scalarA = LCM / pivot;
                                                    const scalarB = -(LCM / tovip);

                                                    // get rows
                                                    let r1 = [];
                                                    let r2 = [];
                                                    let r1i = [];
                                                    let r2i = [];
                                                    for (let a = 0; a < colRankA; a++) {
                                                        // matrix
                                                        r1.push(matrix[a][j]);
                                                        r2.push(matrix[a][k]);
                                                        // identity
                                                        r1i.push(identityMatrix[a][j]);
                                                        r2i.push(identityMatrix[a][k]);
                                                    }

                                                    // scale rows
                                                    for (let a = 0; a < colRankA; a++) {
                                                        // matrix
                                                        r1[a] = r1[a] * scalarA;
                                                        r2[a] = r2[a] * scalarB;
                                                        // identity
                                                        r1i[a] = r1i[a] * scalarA;
                                                        r2i[a] = r2i[a] * scalarB;
                                                    }

                                                    // add rows
                                                    let r3 = [];
                                                    let r3i = [];
                                                    for (let a = 0; a < colRankA; a++) {
                                                        // matrix
                                                        r3.push(r1[a] + r2[a]);
                                                        // identity
                                                        r3i.push(r1i[a] + r2i[a]);
                                                    }

                                                    // assign summed row to matrix
                                                    for (let a = 0; a < colRankA; a++) {
                                                        // matrix
                                                        matrix[a][j] = r3[a];
                                                        // identity
                                                        identityMatrix[a][j] = r3i[a];
                                                    }

                                                    break;
                                                }
                                            }

                                            // test for zero rows
                                            zeroRows = isZeroRows(matrix);

                                            // if no zero rows
                                            if (!zeroRows) {
                                                zeroCols = isZeroCols(matrix); // then, test for zero columns

                                                // if there are zero columns
                                                if (zeroCols) {
                                                    // display error
                                                    answerField.innerText = 'contains column with all zeroes';
                                                }

                                            } else {
                                                // display error
                                                answerField.innerText = 'contains row with all zeroes';
                                            }
                                            
                                            // stop iterating and determine next pivot element
                                            stop = true;
                                            break;
                                        }
                                    }
                                    // if stop is true, operation already performed
                                    // so no need to search for pivot column
                                    if (stop) {
                                        stop = false;
                                        break;
                                    }
                                }
                                // count each operation
                                operations += 1;
                            }

                            if (operations < maximum) {
                                // format solution into vals structure
                                for (let i = 0; i < identityMatrix.length; i++) {
                                    for (let j = 0; j < identityMatrix[i].length; j++) {
                                        vals.push(identityMatrix[i][j]);
                                    }
                                }
        
                                // display results
                                displayProductMatrix(rowRankA, colRankA, vals);
                                answerField.innerHTML = `<div class="answer-data-layout"> <div class="answer-data-col-1">Inversion Method:</div> <div class="answer-data-col-2">Gauss Jordan Elimination</div> </div> <div class="answer-data-layout"> <div class="answer-data-col-1">Row Operations:</div> <div class="answer-data-col-2">${operations - 1}</div> </div> </div> ${answerField.innerHTML}`;
                            
                            } else {

                                // Method 2: Matrix of Minors, Cofactors, Adjugates

                                // repopulate matrix
                                matrix = [];
                                for (let i = 0; i < colRankA; i++) {
                                    let column = [];
                                    const col = document.querySelectorAll(`.matrix-A-col-${i + 1}`);
                                    for (let j = 0; j < rowRankA; j++) {
                                        column.push(Math.floor(Number(col[j].value)));
                                    }
                                    matrix.push(column);
                                }

                                // get matrix of minors
                                const minors = getMinors(matrix, true);
                                
                                for (let col = 0; col < colRankA; col++) {
                                    for (let row = 0; row < rowRankA; row++) {
                                        matrix[col][row] = getDeterminant(minors[col + row]);
                                    }
                                }

                                // matrix now represents a matrix of minors

                                // get matrix of cofactors
                                let negate = false;
                                for (let col = 0; col < colRankA; col++) {
                                    for (let row = 0; row < rowRankA; row++) {
                                        if (negate) {
                                            matrix[col][row] = -Math.abs(matrix[col][row]);
                                        } else {
                                            matrix[col][row] = Math.abs(matrix[col][row]);
                                        }
                                        negate = !negate;
                                    }
                                }

                                // matrix now represents a matrix of cofactors

                                // get adjugate
                                let adjugate = []; // contains each column as a row

                                // populate vals with transposed values
                                for (let row = 0; row < rowRankA; row++) {
                                    let column = [];
                                    for (let col = 0; col < colRankA; col++) {
                                        column.push(matrix[col][row]);
                                    }
                                    adjugate.push(column);
                                }

                                // scale by the inverse determinant
                                const inverseDeterminant = 1 / determinant;
                                for (let col = 0; col < colRankA; col++) {
                                    for (let row = 0; row < rowRankA; row++) {
                                        adjugate[col][row] = adjugate[col][row] * inverseDeterminant;
                                    }
                                }

                                // format solution into vals structure
                                for (let col = 0; col < colRankA; col++) {
                                    for (let row = 0; row < rowRankA; row++) {
                                        vals.push(adjugate[col][row]);
                                    }
                                }
        
                                // display results
                                displayProductMatrix(rowRankA, colRankA, vals);
                                answerField.innerHTML = `<div class="answer-data-layout"> <div class="answer-data-col-1">Inversion Method:</div> <div class="answer-data-col-2">Matrix of Minors</div> </div> </div> ${answerField.innerHTML}`;
                            
                            }
                            
        
                        } else {
                            // display error
                            answerField.innerText = 'Determinant is equal to zero';
                        }

                    }

                } else {
                    // display error
                    answerField.innerText = `maximum rank of ${maxRank - 1} exceeded`;
                }

            } else {
                // display error
                answerField.innerText = 'not a square matrix';
            }

        } else if (operatorType === 'transposition') {
            
            // get matrix ranks
            const rowRankA = Number(document.querySelector('#row-rank-a').value);
            const colRankA = Number(document.querySelector('#col-rank-a').value);

            // initialize strutures
            let valsA = []; // contains each column of Matrix A in order
            let vals = []; // contains each column as a row

            // populate valsA with columns
            for (let i = 0; i < colRankA; i++) {
                let column = [];
                document.querySelectorAll(`.matrix-A-col-${i + 1}`).forEach((val) => {
                    column.push(val.value);
                });
                valsA.push(column);
            }

            // populate vals with transposed values
            for (let i = 0; i < rowRankA; i++) {
                for (let j = 0; j < colRankA; j++) {
                    vals.push(valsA[j][i]);
                }
            }

            // display results
            displayProductMatrix(colRankA, rowRankA, vals);

        } else if (operatorType === 'determinant') {
            // get matrix ranks
            const colRankA = Number(document.querySelector('#col-rank-a').value);

            // initialize strutures
            let matrix = [];

            // populate matrix with columns
            for (let i = 0; i < colRankA; i++) {
                let column = [];
                document.querySelectorAll(`.matrix-A-col-${i + 1}`).forEach((val) => {
                    column.push(Number(val.value));
                });
                matrix.push(column);
            }

            if (matrix.length >= maxRank) {
                // display error
                answerField.innerText = `maximum rank of ${maxRank - 1} exceeded`;
            } else {
                // display answer
                answerField.innerText = `${getDeterminant(matrix)}`;
            }


        } else {
            // display error
            answerField.innerText = NaN;
        }
    }

    // handle answer-field overflow
    if (answerField.scrollWidth > answerField.offsetWidth || answerField.scrollHeight > answerField.offsetHeight) {
        answerField.setAttribute('style', 'padding-bottom: 10px');
    } else {
        answerField.setAttribute('style', 'padding-bottom: 0px');
    }
});