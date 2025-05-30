// validates problem string before request to Eval API

// reference structure
const operations = {
    addition: '+',
    subtraction: '-',
    multiplication: '*',
    division: '/'
};

const error = {
    emptyString: 'Invalid: empty string',
    parenthesis: 'Invalid: parenthesis',
    operation: 'Invalid: operation',
};

// problem string validation
function valid(prob) {
    // validate problem
    
    // run empty string test
    if (problem.length === 0) {

        // empty string

        return error.emptyString;

    } else {
        
        // non-empty string
        
        // run parenthesis test

        let nestLvl = 0;
        let parens = [];
        for (let i = 0; i < prob.length; i++) {
            if (prob[i] === '(') {
                parens.push('(');
                nestLvl += 1;
            } else if (prob[i] === ')') {
                parens.push(')');
                nestLvl -= 1;
            }
        }
        if (parens.length > 0) {
            // there are parenthesis
            if (nestLvl !== 0) {
                // no non-zero sum of nestLvl
                return error.parenthesis;
            } else if (parens[0] === ')') {
                // no closing paren at start
                return error.parenthesis;
            } else if (parens[parens.length - 1] === '(') {
                // no opening paren at end
                return error.parenthesis;
            } else {
                // match each open paren to a closing paren (accounting for nesting)
                for (let i = 0; i < prob.length; i++) {
                    if (prob[i] === '(') {
                        // search for match
                        let x = 0;
                        for (let j = i; j < prob.length; j++) {
                            if (prob[j] === ')') {
                                x -= 1;
                            } else if (prob[j] === "(") {
                                x += 1;
                            }
                            if (x === 0) {
                                break;
                            }
                        }
                        if (x !== 0) {
                            // missing match
                            return error.parenthesis;
                        }
                    }
                }
            }
        }

        // run operation test

        function isOp(index, prob) {
            // tests if character at index in prob string is an operation
            if (index < prob.length) {
                const char = prob.substring(index, index + 1);
                const values = Object.values(operations);
                for (let i = 0; i < values.length; i++) {
                    if (char === values[i]) {
                        // found a match
                        return true;
                    }
                }
                // none matched
                return false;
            }
        };

        if (isOp(0, prob) || isOp(prob.length - 1, prob)) {
            return error.operation;
        } else {
            for (let i = 0; i < prob.length; i++) {
                // consecutive operations test
                if (isOp(i, prob) && i + 1 < prob.length && isOp(i + 1, prob)) {
                    // no consecutive operations
                    return error.operation;
                }
            }
        }

        // no invalidations caught
        return true;
    }
};