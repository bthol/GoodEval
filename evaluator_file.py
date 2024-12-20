import math
import numpy as np

# PROGRAMIC PROCESS

# Phase I: Entity Structuring and Analysis
# Description: Analyzes problem string to create structure from string data and analyzes structure to identify program entities from structure data, including and limited to multi-digit numbers, negative numbers, decimal numbers, mathematical operators, parenthesis, sets and keywords.

# Phase II: Structural Manipulation
# Description: Bypassed unless, as identified in Phase I, there are parenthesis, in which case, a test for distribution is run, where either there is distribution and the distribution and section functions manipulate the structure accordingly or there isn't distribution and only the section function manipulates the structure accordingly.

# Phase III: Key Functions
# Description: Bypassed unless, in one case, there are parenthesis and keywords, in which case search for and run key functions or, in another case, there are square brackets and keywords, in which case manipulate the structure to form sets and search for and run key functions.

# Phase IV: Calculation
# Description: Search for and run appropriate mathematical operation on contents of structure, restructure with solution, and repeat until no operations are remaining.

# PROGRAM PARAMETERS

# the paren_limit parameter controls the maximum number of levels of parenthesis nesting in any one evaluation
paren_limit = 10

# the poly_degree_limit parameter controls the maximum degree of a polynomial expression resulting from factoring in any one evaluation
poly_degree_limit = 10

# the poly_fact_limit parameter controls the maximum number of times that polynomial expressions can be factored out in any one evaluation
poly_fact_limit = 10

# the pi_limit parameter controls the maximum number of instances of any one constant allowed in any one evaluation
c_limit = 10

# the key_limit parameter controls the maximum number of the same key function allowed in any one evaluation
key_limit = 10

# PROGRAM ENTITY REFERENCE

# system_operation indicates whether there are system operations, True, or not, False
# If True, terminates program after system operations are complete
system_operation = False

# is_paren indicates whether there are parenthesis, True, or not, False
# If False, bypasses distribute and section functions
is_paren = False

# is_dist indicates whether there is distribution, True, or not, False
# If False, bypasses distribute function
is_dist = False

# is_poly_fact indicates whether there is a need to factor out into an expression with polynomial multiplication, True, or not, False
# If False, bypasses poly_mult function
is_poly_fact = False

# is_brack indicates whether there are square brackets, True, or not, False
# If False, bypasses key_functions function
is_brack = False

# is_exp indicates whether there are exponentiations, True, or not, False
# If False, bypasses exponentiation
is_exp = False

# is_root indicates whether there are roots, True, or not, False
# If False, bypasses roots
is_root = False

# is_mult indicates whether there are multiplications, True, or not, False
# If False, bypasses multiplication
is_mult = False

# is_div indicates whether there are divisions, True, or not, False
# If False, bypasses division
is_div = False

# is_add indicates whether there are additions, True, or not, False
# If False, bypasses additions
is_add = False

# is_sub indicates whether there are subtractions, True, or not, False
# If False, bypasses subtractions
is_sub = False

# is_key stores strings for each kind of keyword in problem string
# If is_key is empty, bypasses key_functions function
is_key = []

# key_modules structure represent which key functions modules should be run or bypassed on call
key_modules = [
    {"module":"trigonomic", "use":False},
    {"module":"geometric", "use":False},
    {"module":"combinatoric", "use":False},
    {"module":"statistical", "use":False},
]

# use_logs determines whether or not to use logging
# if use_logs is "1", then logging is active, otherwise it remains defaultly inactive
use_logs = ""

# Program Information
info = {
    "system_operations": [
        {"name": "info", "about": "Prints program information, i.e. system operations, program entities, key functions, and their related information."},
    ],
    
    "operations": [
        {"name":"Negative Numbers", "syntax":"(-x)"},
        {"name":"Exponentiation", "syntax":"^"},
        {"name":"root", "syntax":"√"}, # alt code 251
        {"name":"Multiplication", "syntax":"*"},
        {"name":"Division", "syntax":"/"},
        {"name":"Addition", "syntax":"+"},
        {"name":"Subtraction", "syntax":"-"},
    ],

    "constants": [
        {"name":"π", "syntax":"pi"}, # alt code 227
        {"name":"Euler's Number", "syntax":"euler"},
    ],

    "key_functions": [
        # Trigonomic Module
        [
            # Fundamental
            {"name":"Sine", "key": "sin", "syntax": "sin(x)", "about": "Gets the sine of x, where x is a value or an expression that evaluates to a value."},
            
            {"name":"Arcus Sine", "key":"asin", "syntax": "asin(x)", "about": "Gets the arcus sine, i.e. the inverse sine, of x, where x is a value or an expression that evaluates to a value."},

            {"name":"Cosine", "key": "cos", "syntax": "cos(x)", "about": "Gets the cosine of x, where x is a value or an expression that evaluates to a value."},

            {"name":"Arcus Cosine", "key": "acos", "syntax": "acos(x)", "about": "Gets the arc cosine, i.e. the inverse of cosine, of x, where x is a value or an expression that evaluates to a value."},
            
            {"name":"Tangent", "key":"tan", "syntax": "tan(x)", "about": "Gets the tangent of x, where x is a value or an expression that evaluates to a value."},
            
            {"name":"Arcus Tangent", "key": "atan", "syntax": "atan(x)", "about": "Gets the arcus tangent, i.e. the inverse tangent, of x, where x is a value or an expression that evaluates to a value."},
                
            # Reciprocal
            # {"name":"Cosecant", "key":"csc", "syntax": "csc(x)", "about": "Gets the cosecant, i.e. the reciprocal sine, of x, where x is a value or an expression that evaluates to a value."},
            
            # {"name":"Arcus Cosecant", "key":"csc", "syntax": "csc(x)", "about": "Gets the arcus cosecant, i.e. the inverse reciprocal sine, of x, where x is a value or an expression that evaluates to a value."},
            
            # {"name":"Secant", "key":"sec", "syntax": "sec(x)", "about": "Gets the secant, i.e. the reciprocal cosine, of x, where x is a value or an expression that evaluates to a value."},
            
            # {"name":"Arcus Secant", "key":"sec", "syntax": "sec(x)", "about": "Gets the arcus secant, i.e. the inverse reciprocal cosine, of x, where x is a value or an expression that evaluates to a value."},
            
            # {"name":"Cotangent", "key":"cot", "syntax": "cot(x)", "about": "Gets the cotangent, i.e. the reciprocal tangent, of x, where x is a value or an expression that evaluates to a value."},
            
            # {"name":"Arcus Cotangent", "key":"cot", "syntax": "cot(x)", "about": "Gets the arcus cotangent, i.e. the inverse reciprocal tangent, of x, where x is a value or an expression that evaluates to a value."},

            # Hyperbolic
            {"name":"Hyperbolic Sine", "key":"sinh", "syntax": "sinh(x)", "about": "Gets the hyperbolic sine, i.e the sine of hyperbola instead of circle, of x, where x is a value or an expression that evaluates to a value."},
            
            {"name":"Arcus Hyperbolic Sine", "key":"asinh", "syntax": "asinh(x)", "about": "Gets the arcus hyperbolic sine, i.e the inverse sine of hyperbola instead of circle, of x, where x is a value or an expression that evaluates to a value."},
            
            {"name":"Hyperbolic Cosine", "key":"cosh", "syntax": "cosh(x)", "about": "Gets the hyperbolic cosine, i.e the cosine of hyperbola instead of circle, of x, where x is a value or an expression that evaluates to a value."},
            
            {"name":"Arcus Hyperbolic Cosine", "key":"acosh", "syntax": "acosh(x)", "about": "Gets the arcus hyperbolic cosine, i.e the inverse cosine of hyperbola instead of circle, of x, where x is a value or an expression that evaluates to a value."},
            
            {"name":"Hyperbolic Tangent", "key":"tanh", "syntax": "tanh(x)", "about": "Gets the hyperbolic tangent, i.e the tangent of hyperbola instead of circle, of x, where x is a value or an expression that evaluates to a value."},
            
            {"name":"Arcus Hyperbolic Tangent", "key":"atanh", "syntax": "atanh(x)", "about": "Gets the arcus hyperbolic tangent, i.e the inverse tangent of hyperbola instead of circle, of x, where x is a value or an expression that evaluates to a value."},
        ],

        # Geometeric Module
        [
            # Triangles
            {"name":"Right Triangle Hypotenuse", "key":"hypot", "syntax": "hypot[a,b]", "about": "Gets the hypotenuse length of a right triangle given leg lengths a and b, where a and b are a value or an expression that evaluates to a value wrapped within square brackets, e.g. hypot[a,[b+x]]."},
            
            {"name":"Heron's Formula", "key":"heron", "syntax": "heron[a,b,c]", "about": "Gets the area of a scalene triangle given side lengths a, b, and c, where a, b, and c are a value or an expression that evaluates to a value wrapped within square brackets, e.g. heron[a,b,[c+x]]."},
        ],

        # Combinatoric Module
        [
            {"name":"Factorial", "key":"fact", "syntax": "fact(x)", "about": "Gets the factorial of x, where x is a value or an expression that evaluates to a value."},

            {"name":"Permutation", "key":"perm", "syntax": "perm[n,r]", "about": "Gets a permutation given n number of objects with r number of objects per permutation, where n and r are values or an expression that evaulates to a value wrapped within square brackets, e.g. perm[n,[r+x]]."},

            {"name":"Combination", "key":"comb", "syntax": "comb[n,r]", "about": "Gets a combination given n number of objects with r number of objects per combination, where n and r are  values or an expression that evaulates to a value wrapped within square brackets, e.g. comb[n,[r+x]]."},
        ],

        # Statistical Module
        [
            {"name":"Standard Deviation", "key":"sd", "syntax": "sd[a,b]", "about": "Gets the standard deviation of the set of items within square brackets, where that set has at least two comma-demarcated items. An item may be a value or an expression that evaulates to a value wrapped within square brackets, e.g. var[a,[b+x]]."},
            
            {"name":"Variance", "key":"var", "syntax": "var[a,b]", "about": "Gets the variance of the set of items within square brackets, where that set has at least two comma-demarcated items. An item may be a value or an expression that evaulates to a value wrapped within square brackets, e.g. sd[a,[b+x]]."},
                
            # Means
            {"name":"Harmonic Mean", "key":"meanh", "syntax": "meanh[a,b]", "about": "Gets the geometeric mean of the the set of items within square brackets, where that set has at least two comma-demarcated items, and each item is a value or an expression that evaulates to a value wrapped within square brackets, e.g. meang[10,[2+3]]."},

            {"name":"Geometeric Mean", "key":"meang", "syntax": "meang[a,b]", "about": "Gets the harmonic mean of the the set of items within square brackets, where that set has at least two comma-demarcated items, and each item is a value or an expression that evaulates to a value wrapped within square brackets, e.g. meanh[10,[2+3]]."},

            {"name":"Weighted Mean", "key":"meanw", "syntax": "meanw[[a,w1],[b,w2]]", "about": "Gets the weighted mean of the the set of items within square brackets, where that set has at least two comma-demarcated items, and each item is a value and a weight for that value wrapped in square brackets, e.g. meanw[[10,60],[20,40]]."},

            {"name":"Mean", "key":"mean", "syntax": "mean[a,b]", "about": "Gets the mean of the the set of values within square brackets, where that set has at least two comma demarcated items, and each item is a value or an expression that evaluates to a value, e.g. mean[a,[b+x]]."},

            {"name":"Root Mean Square", "key":"rms", "syntax": "rms[a1,a2]", "about": "Gets the geometeric mean of the the set of items within square brackets, where that set has at least two comma-demarcated items, and each item is a value or an expression that evaulates to a value wrapped within square brackets, e.g. rms[10,[2+3]]."},
                
            # Et Cetera
            {"name":"Greatest Common Factor", "key":"gcf", "syntax": "gcf[a,b]", "about": "Gets the greatest common factor of a and b within square brackets, where a and b are values or expressions that evaluate to values wrapped in square brackets, e.g. gcf[a,[b+x]]."},

            {"name":"Least Common Multiple", "key":"lcm", "syntax": "lcm[a,b]", "about": "Gets the least common multiple of values a and b within square brackets, where a and b are values or expressions that evaluate to values wrapped in square brackets, e.g. lcm[a,[b+x]]."},
            
            {"name":"Logarithm", "key":"log", "syntax": "log[x,b]", "about": "Gets the logarithm of x with base b, where x and b are values or an expression wrapped in square brackets that evaluates to a value."},

            {"name":"Natural Log", "key":"ln", "syntax": "ln(x)", "about": "Gets the natural log of x with base e, where x is a value or an expression wrapped in square brackets that evaluates to a value."},
        ],
    ],
}

def evaluator(input):
    # process_log is an object literal that stores string values for all process checkpoints during evalution
    # use_logs indicates whether to use logs, True, or not, False
    # note: log_process is run on every restructure, run for calculation reference, and run for process labels
    global info
    global key_modules
    global use_logs
    process_log = {"0":"no logging"}
    def log_process(log = ""):
        if use_logs == "1":
            new_key = int(list(process_log.keys())[-1]) + 1
            process_log["%s" % new_key] = log
  
    # STRUCTURE START
    def num_cast(str):
        # a single data type converter for all your data type conversion needs
        try:
            num = float(str)
            if (num / 1 % 1 == 0):
                num = int(num)
            return num
        except:
            return False
    
    def restructure(solution, start, end, arr):
        # A single restructure function for all your restructuring needs!
        structure = []
        if start != 0:
            structure = structure + arr[0:start]
        if solution != None:
            if isinstance(solution, list):
                if solution[0] == "[":
                    # remove square brackets from set
                    del(solution[0])
                    del(solution[len(solution) - 1])
                    # remove commas from set
                    sol = []
                    for i in solution:
                        if i != ",":
                            sol.append(i)
                    # append set
                    structure.append(sol)
                else:
                    # concatenate lists
                    structure = structure + solution
            else:
                structure.append(solution)
        if end != len(arr) - 1:
            structure = structure + arr[end + 1:len(arr)]
        # log new structure
        log_process(structure)
        return structure

    def get_word(word, arr):
        # finds a given keyword within the structure
        wordLen = len(word)
        ref = None
        for i in range(0, len(arr)):
            if (i > len(arr) - wordLen):
                # stop search if remaining indexes of arr is less than length of word
                break
            # test for first and last letter of word
            if arr[i] == word[0] and arr[i + wordLen - 1] == word[wordLen - 1]:
                # get string between first and last letter index
                str = ""
                for l in range(0, wordLen):
                    str = str + arr[i + l]
                # compare string with word
                if str == word:
                    ref = {"first": i, "last": i + wordLen}
                    break
        return ref

    def word_struct(word, arr, module = None):
        # structures a given keyword
        global is_key
        arrVar = arr
        ref = get_word(word, arrVar)
        s = True
        if module == None:
            while ref is not None:
                # for every word found in arr
                if s == True:
                    # for first word found
                    # add key to is_key structure
                    is_key = [word] + is_key
                    s = False
                # restructure with keyword
                arrVar = restructure(word, ref["first"], ref["last"] - 1, arrVar)
                # find next word or None
                ref = get_word(word, arrVar)
        else:
            # for key function modules
            while ref is not None:
                # for every word found in arr
                if s == True:
                    # for first word found
                    # add key to is_key structure
                    is_key = [word] + is_key
                    # activate key module
                    key_modules[module]["use"] = True
                    s = False
                # restructure with keyword
                arrVar = restructure(word, ref["first"], ref["last"] - 1, arrVar)
                # find next word or None
                ref = get_word(word, arrVar)

        return arrVar

    def structure_sets(arr):
        # generates substructures, i.e. "sets", within structure
        # sets exist so that an expression can be accessed at a single index for key functions
        global is_brack
        if is_brack == True:
            log_process("Structure Sets")
            log_process(arr)
            # structure sets
            sets_ref = []
            for i in range(0, len(arr)):
                if arr[i] == "[":
                    sets_ref.append({"char": "[", "index": i})
                elif arr[i] == "]":
                    sets_ref.append({"char": "]", "index": i})
            # identify next set to structure using reference
            while len(sets_ref) > 0:
                for i in range(0, len(sets_ref)):
                    if sets_ref[i]["char"] == "[" and sets_ref[i + 1]["char"] == "]":
                        # build set
                        start_index = sets_ref[i]["index"]
                        end_index = sets_ref[i + 1]["index"]
                        solution_length = abs(start_index - end_index) + 1
                        the_set_itself = []
                        for i in range(0, solution_length):
                            the_set_itself.append(arr[start_index + i])

                        # restructure
                        arr = restructure(the_set_itself, start_index, end_index, arr)
                        
                        # update reference
                        sets_ref = []
                        for i in range(0, len(arr)):
                            if arr[i] == "[":
                                sets_ref.append({"char": "[", "index": i})
                            elif arr[i] == "]":
                                sets_ref.append({"char": "]", "index": i})
                        break
        return arr

    def identify_entities(arr):
        # Identify parenthesis
        global is_paren
        for i in range(0, len(arr)):
            if arr[i] == "(":
                is_paren = True
                break
        
        # identify distribution
        global is_dist
        if (is_paren):
            for i in range(0, len(arr)):
                if i != 0 and i != len(arr):
                    if (arr[i] == "(" and arr[i - 1] == "*") or (arr[i] == ")" and i < len(arr) - 1 and arr[i + 1] == "*"):
                        # multiplicative distribution
                        is_dist = True
                        break
        
        # Identify exponentiation
        global is_exp
        for i in range(0, len(arr)):
            if arr[i] == "^":
                is_exp = True
                break
        
        # identify polynomial factoring
        global is_poly_fact
        if (is_paren and is_exp):
            for i in range(0, len(arr)):
                if i != 0 and i != len(arr):
                    if (arr[i] == ")" and i < len(arr) - 1 and arr[i + 1] == "^"):
                        # exponential distribution
                        is_poly_fact = True
                        break
        
        # Identify square brackets
        global is_brack
        for i in range(0, len(arr)):
            if arr[i] == "[":
                is_brack = True
                break
        
        # Identify roots
        global is_root
        for i in range(0, len(arr)):
            if arr[i] == "√":
                is_root = True
                break
        
        # Identify multiplication
        global is_mult
        for i in range(0, len(arr)):
            if arr[i] == "*":
                is_mult = True
                break
        
        # Identify division
        global is_div
        for i in range(0, len(arr)):
            if arr[i] == "/":
                is_div = True
                break
        
        # Identify addition
        global is_add
        for i in range(0, len(arr)):
            if arr[i] == "+":
                is_add = True
                break
        
        # Identify subtraction
        global is_sub
        for i in range(0, len(arr)):
            if arr[i] == "-":
                is_sub = True
                break

    # Phase I Process
    def structure_string(str):
        # Analyzes string to generate structure containing string data
        log_process("Structuring")
        # structure multi-digit numbers, negative numbers, decimal numbers, mathematical operations, parenthesis, and square brackets
        arr = []
        digits = ""
        for i in range(0, len(str)):
            if str[i] == " ":
                continue
            else:
                try:
                    str[i] == "." or int(str[i])
                except:
                    # handle negatives
                    if str[i] == "-" and str[i - 1] == "(":
                        arr.pop()
                        digits = "%s" % str[i]
                    elif str[i] == ")":
                        try:
                            if int(digits) < 0:
                                arr.append(digits)
                                digits = ""
                            else:
                                arr.append(digits)
                                digits = ""
                                arr.append(str[i])
                        except:
                            if len(digits) > 0:
                                arr.append(digits)
                            digits = ""
                            arr.append(str[i])
                    else:
                        if len(digits) > 0:
                            arr.append(digits)
                        digits = ""
                        arr.append(str[i])
                else:
                    digits = digits + "%s" % str[i]
                finally:
                    if (i == len(str) - 1 and len(digits) > 0):
                        arr.append(digits)
        log_process(arr)

        log_process("Constants")
        # structure pi
        ref = get_word("pi", arr)
        itr = 0
        while itr < c_limit and ref is not None:
            itr = itr + 1
            arr = restructure(np.pi, ref["first"], ref["last"] - 1, arr)
            ref = get_word("pi", arr)
        
        # structure euler's number
        ref = get_word("euler", arr)
        itr = 0
        while itr < c_limit and ref is not None:
            itr = itr + 1
            arr = restructure(np.e, ref["first"], ref["last"] - 1, arr)
            ref = get_word("euler", arr)

        # structure keywords
        log_process("Keywords")

        # system operations
        for i in range(0, len(info["system_operations"])):
            arr = word_struct(info["system_operations"][i]["name"], arr)
        
        # key functions
        for module in range(0, len(info["key_functions"])):
            for i in range(0, len(info["key_functions"][module])):
                arr = word_struct(info["key_functions"][module][i]["key"], arr, module)
        log_process(key_modules)

        return arr
    # STRUCTURE END

    # OPERATIONS START
    def exponentiate(base, exponent):
        base = float(base)
        if base / 1 % 1 == 0:
            base = int(base)

        exponent = float(exponent)
        if exponent / 1 % 1 == 0:
            exponent = int(exponent)

        power = math.pow(base, exponent)

        return power

    def root(radicand, degree):
        radicand = float(radicand)
        if radicand / 1 % 1 == 0:
            radicand = int(radicand)

        degree = float(degree)
        if degree / 1 % 1 == 0:
            degree = int(degree)

        root = math.pow(radicand, 1/degree)

        return root

    def multiply(multiplicand, multiplier):
        multiplicand = float(multiplicand)
        if multiplicand / 1 % 1 == 0:
            multiplicand = int(multiplicand)

        multiplier = float(multiplier)
        if multiplier / 1 % 1 == 0:
            multiplier = int(multiplier)

        product = multiplicand * multiplier

        return product

    def divide(dividend, divisor):
        dividend = float(dividend)
        if dividend / 1 % 1 == 0:
            dividend = int(dividend)

        divisor = float(divisor)
        if divisor / 1 % 1 == 0:
            divisor = int(divisor)

        quotient = dividend / divisor

        return quotient

    def add(augend, addend):
        augend = float(augend)
        if augend / 1 % 1 == 0:
            augend = int(augend)

        addend = float(addend)
        if addend / 1 % 1 == 0:
            addend = int(addend)

        total = augend + addend

        return total

    def subtract(minuend, subtrahend):
        minuend = float(minuend)
        if minuend / 1 % 1 == 0:
            minuend = int(minuend)

        subtrahend = float(subtrahend)
        if subtrahend / 1 % 1 == 0:
            subtrahend = int(subtrahend)

        difference = minuend - subtrahend

        return difference

    def factorial(x):
        y = 1
        for i in range(int(x), 1, -1):
            y = y * i
        return y

    def get_mean(arr):
        return sum(arr) / len(arr)
    
    # OPERATIONS END

    # KEY FUNCTIONS START
    def getIdx(str, arr):
        # gets index of string in structure
        val = None
        for i in range(0, len(arr)):
            if arr[i] == str:
                val = i
                break
        return val

    def trigonomic(arr):
        # key function module for trigonomic functions
        arrVar = arr
        if key_modules[0]["use"] == True:
            # perform all sine functions
            ref = getIdx("sin", arrVar)
            itr = 0
            while itr < key_limit and ref is not None:
                itr = itr + 1

                x = num_cast(arrVar[ref + 1])
                y = math.sin(x)

                # Log keyword
                log_process(arrVar[ref])
                arrVar = restructure(y, ref, ref + 1, arrVar)
                ref = getIdx("sin", arrVar)

            # perform all arcus sine functions
            ref = getIdx("asin", arrVar)
            itr = 0
            while itr < key_limit and ref is not None:
                itr = itr + 1
                
                x = num_cast(arrVar[ref + 1])
                y = math.asin(x)

                # Log keyword
                log_process(arrVar[ref])
                arrVar = restructure(y, ref, ref + 1, arrVar)
                ref = getIdx("asin", arrVar)
            
            # perform all cosine functions
            ref = getIdx("cos", arrVar)
            itr = 0
            while itr < key_limit and ref is not None:
                itr = itr + 1

                x = num_cast(arrVar[ref + 1])
                y = math.cos(x)

                # Log keyword
                log_process(arrVar[ref])
                arrVar = restructure(y, ref, ref + 1, arrVar)
                ref = getIdx("cos", arrVar)

            
            # perform all arcus cosine functions
            ref = getIdx("acos", arrVar)
            itr = 0
            while itr < key_limit and ref is not None:
                itr = itr + 1
                
                x = num_cast(arrVar[ref + 1])
                y = math.acos(x)

                # Log keyword
                log_process(arrVar[ref])
                arrVar = restructure(y, ref, ref + 1, arrVar)
                ref = getIdx("acos", arrVar)

            # perform all tangent functions
            ref = getIdx("tan", arrVar)
            itr = 0
            while itr < key_limit and ref is not None:
                itr = itr + 1

                x = num_cast(arrVar[ref + 1])
                y = math.tan(x)

                # Log keyword
                log_process(arrVar[ref])
                arrVar = restructure(y, ref, ref + 1, arrVar)
                ref = getIdx("tan", arrVar)
            
            # perform all arcus tangent functions
            ref = getIdx("atan", arrVar)
            itr = 0
            while itr < key_limit and ref is not None:
                itr = itr + 1

                x = num_cast(arrVar[ref + 1])
                y = math.atan(x)

                # Log keyword
                log_process(arrVar[ref])
                arrVar = restructure(y, ref, ref + 1, arrVar)
                ref = getIdx("atan", arrVar)

            # perform all hyperbolic sine functions
            ref = getIdx("sinh", arrVar)
            itr = 0
            while itr < key_limit and ref is not None:
                itr = itr + 1

                x = num_cast(arrVar[ref + 1])
                y = np.sinh(x)

                # Log keyword
                log_process(arrVar[ref])
                arrVar = restructure(y, ref, ref + 1, arrVar)
                ref = getIdx("sinh", arrVar)
            
            # perform all arcus hyperbolic sine functions
            ref = getIdx("asinh", arrVar)
            itr = 0
            while itr < key_limit and ref is not None:
                itr = itr + 1

                x = num_cast(arrVar[ref + 1])
                y = np.asinh(x)

                # Log keyword
                log_process(arrVar[ref])
                arrVar = restructure(y, ref, ref + 1, arrVar)
                ref = getIdx("asinh", arrVar)
            
            # perform all hyperbolic cosine functions
            ref = getIdx("cosh", arrVar)
            itr = 0
            while itr < key_limit and ref is not None:
                itr = itr + 1

                x = num_cast(arrVar[ref + 1])
                y = np.sinh(x)

                # Log keyword
                log_process(arrVar[ref])
                arrVar = restructure(y, ref, ref + 1, arrVar)
                ref = getIdx("cosh", arrVar)
            
            # perform all arcus hyperbolic cosine functions
            ref = getIdx("acosh", arrVar)
            itr = 0
            while itr < key_limit and ref is not None:
                itr = itr + 1

                x = num_cast(arrVar[ref + 1])
                y = np.asinh(x)

                # Log keyword
                log_process(arrVar[ref])
                arrVar = restructure(y, ref, ref + 1, arrVar)
                ref = getIdx("acosh", arrVar)
            
            # perform all hyperbolic tangent functions
            ref = getIdx("tanh", arrVar)
            itr = 0
            while itr < key_limit and ref is not None:
                itr = itr + 1

                x = num_cast(arrVar[ref + 1])
                y = np.sinh(x)

                # Log keyword
                log_process(arrVar[ref])
                arrVar = restructure(y, ref, ref + 1, arrVar)
                ref = getIdx("tanh", arrVar)
            
            # perform all arcus hyperbolic tangent functions
            ref = getIdx("atanh", arrVar)
            itr = 0
            while itr < key_limit and ref is not None:
                itr = itr + 1

                x = num_cast(arrVar[ref + 1])
                y = np.asinh(x)

                # Log keyword
                log_process(arrVar[ref])
                arrVar = restructure(y, ref, ref + 1, arrVar)
                ref = getIdx("atanh", arrVar)

        return arrVar

    def geometric(arr):
        # key function module for geometric functions
        arrVar = arr
        if key_modules[1]["use"] == True:
            # perform all right triangle hypotenuse functions
            ref = getIdx("hypot", arrVar)
            itr = 0
            while itr < key_limit and ref is not None:
                itr = itr + 1
                # get string set
                set_1 = arrVar[ref + 1]
                log_process(set_1)

                # convert string set to numeral set
                set_2 = []
                for i in set_1:
                    if isinstance(i, str):
                        x = num_cast(i)
                        set_2.append(x)
                    else:
                        x = section(distribute(i))
                        set_2.append(x)

                # perform calculation using numeral set
                leg1 = set_2[0]
                leg2 = set_2[1]
                
                y = np.hypot(leg1, leg2)

                # Log keyword
                log_process(arrVar[ref])
                arrVar = restructure(y, ref, ref + 1, arrVar)
                ref = getIdx("hypot", arrVar)

            # perform all Heron's Formula functions
            ref = getIdx("heron", arrVar)
            itr = 0
            while itr < key_limit and ref is not None:
                itr = itr + 1
                # get string set
                set_1 = arrVar[ref + 1]
                log_process(set_1)

                # convert string set to numeral set
                set_2 = []
                for i in set_1:
                    if isinstance(i, str):
                        x = num_cast(i)
                        set_2.append(x)
                    else:
                        x = section(distribute(i))
                        set_2.append(x)
                
                # perform calculation using numeral set
                # side lengths
                a = set_2[0]
                b = set_2[1]
                c = set_2[2]
                
                # semiperimeter
                s = (a + b + c) / 2
                
                # area calculation
                area = (s * (s - a) * (s - b) * (s - c))**0.5

                # Log keyword
                log_process(arrVar[ref])
                arrVar = restructure(area, ref, ref + 1, arrVar)
                ref = getIdx("heron", arrVar)

        return arrVar

    def combinatoric(arr):
        # key function module for combinatoric functions
        arrVar = arr

        if key_modules[2]["use"] == True:
            # perform all Factorial functions
            ref = getIdx("fact", arrVar)
            itr = 0
            while itr < key_limit and ref is not None:
                itr = itr + 1

                x = num_cast(arrVar[ref + 1])
                y = factorial(x)

                # Log keyword
                log_process(arrVar[ref])
                arrVar = restructure(y, ref, ref + 1, arrVar)
                ref = getIdx("fact", arrVar)

            # perform all Permutation functions
            ref = getIdx("perm", arrVar)
            itr = 0
            while itr < key_limit and ref is not None:
                itr = itr + 1
                # get string set
                set_1 = arrVar[ref + 1]
                log_process(set_1)

                # convert string set to numeral set
                set_2 = []
                for i in set_1:
                    if isinstance(i, str):
                        x = float(i)
                        set_2.append(x)
                    else:
                        x = section(distribute(i))
                        set_2.append(x)

                # perform calculation using numeral set
                n = set_2[0]
                r = set_2[1]
                perm = factorial(n) / factorial(n - r)

                # Log keyword
                log_process(arrVar[ref])
                arrVar = restructure(perm, ref, ref + 1, arrVar)
                ref = getIdx("perm", arrVar)
            
            # perform all Combination functions
            ref = getIdx("comb", arrVar)
            itr = 0
            while itr < key_limit and ref is not None:
                itr = itr + 1
                # get string set
                set_1 = arrVar[ref + 1]
                log_process(set_1)

                # convert string set to numeral set
                set_2 = []
                for i in set_1:
                    if isinstance(i, str):
                        x = float(i)
                        set_2.append(x)
                    else:
                        x = section(distribute(i))
                        set_2.append(x)

                # perform calculation using numeral set
                n = set_2[0]
                r = set_2[1]
                comb = factorial(n) / (factorial(r) * factorial(n - r))

                # Log keyword
                log_process(arrVar[ref])
                arrVar = restructure(comb, ref, ref + 1, arrVar)
                ref = getIdx("comb", arrVar)

        return arrVar

    def statistical(arr):
        # key function module for statistical functions
        arrVar = arr
        if key_modules[3]["use"] == True:
            
            # perform all Standard Deviation functions
            ref = getIdx("sd", arrVar)
            itr = 0
            while itr < key_limit and ref is not None:
                itr = itr + 1
                # get string set
                set_1 = arrVar[ref + 1]
                log_process(set_1)

                # convert string set to numeral set
                set_2 = []
                for i in set_1:
                    if isinstance(i, str):
                        x = num_cast(i)
                        set_2.append(x)
                    else:
                        x = section(distribute(i))
                        set_2.append(x)

                # perform calculation using numeral set
                mean = get_mean(set_2)
                set_3 = []
                for i in set_2:
                    set_3.append(math.pow(i - mean, 2))
                sd = math.pow(sum(set_3)/len(set_3), 1/2)

                # Log keyword
                log_process(arrVar[ref])
                arrVar = restructure(sd, ref, ref + 1, arrVar)
                ref = getIdx("sd", arrVar)
            
            # perform all Variance functions
            ref = getIdx("var", arrVar)
            itr = 0
            while itr < key_limit and ref is not None:
                itr = itr + 1
                # get string set
                set_1 = arrVar[ref + 1]
                log_process(set_1)

                # convert string set to numeral set
                set_2 = []
                for i in set_1:
                    if isinstance(i, str):
                        x = num_cast(i)
                        set_2.append(x)
                    else:
                        x = section(distribute(i))
                        set_2.append(x)

                # perform calculation using numeral set
                mean = get_mean(set_2)
                set_3 = []
                for i in set_2:
                    set_3.append(math.pow(i - mean, 2))
                sd = sum(set_3)/len(set_3)

                # Log keyword
                log_process(arrVar[ref])
                arrVar = restructure(sd, ref, ref + 1, arrVar)
                ref = getIdx("var", arrVar)

            # perform all Harmonic Mean functions
            ref = getIdx("meanh", arrVar)
            itr = 0
            while itr < key_limit and ref is not None:
                itr = itr + 1
                # get string set
                set_1 = arrVar[ref + 1]
                log_process(set_1)

                set_2 = []
                for i in set_1:
                    if isinstance(i, str):
                        x = float(i)
                        set_2.append(1/x)
                    else:
                        x = calculate(section(distribute(i)))
                        set_2.append(1/x)

                # perform calculation using numeral set
                mean = len(set_2) / sum(set_2)

                # Log keyword
                log_process(arrVar[ref])
                arrVar = restructure(mean, ref, ref + 1, arrVar)
                ref = getIdx("meanh", arrVar)
            
            # perform all Geometeric Mean functions
            ref = getIdx("meang", arrVar)
            itr = 0
            while itr < key_limit and ref is not None:
                itr = itr + 1
                # get string set
                set_1 = arrVar[ref + 1]
                log_process(set_1)

                set_2 = 1
                for i in set_1:
                    if isinstance(i, str):
                        x = float(i)
                        set_2 = set_2 * x
                    else:
                        x = section(distribute(i))
                        set_2 = set_2 * x

                # perform calculation using numeral set
                mean = math.pow(set_2, 1/len(set_1))

                # Log keyword
                log_process(arrVar[ref])
                arrVar = restructure(mean, ref, ref + 1, arrVar)
                ref = getIdx("meang", arrVar)

            # perform all Weighted Mean functions
            ref = getIdx("meanw", arrVar)
            itr = 0
            while itr < key_limit and ref is not None:
            
                itr = itr + 1
                # get string set
                set_1 = arrVar[ref + 1]
                log_process(set_1)

                # get weights and total of weights
                n = 0
                weights = []
                for i in set_1:
                    weight = float(i[1])
                    weights.append(weight)
                    n = n + weight
                
                # get weighted numeral set
                set_2 = []
                iter = 0
                for i in set_1:
                    val = float(i[0])
                    set_2.append(weights[iter] * val)
                    iter = iter + 1

                # perform calculation using numeral set
                mean = sum(set_2) / n

                # Log keyword
                log_process(arrVar[ref])
                arrVar = restructure(mean, ref, ref + 1, arrVar)
                ref = getIdx("meanw", arrVar)

            # perform all Mean functions
            ref = getIdx("mean", arrVar)
            itr = 0
            while itr < key_limit and ref is not None:
                itr = itr + 1
                # get string set
                set_1 = arrVar[ref + 1]
                log_process(set_1)

                # convert string set to numeral set
                set_2 = []
                for i in set_1:
                    if isinstance(i, str):
                        x = num_cast(i)
                        set_2.append(x)
                    else:
                        x = section(distribute(i))
                        set_2.append(x)

                # perform calculation using numeral set
                mean = get_mean(set_2)

                # Log keyword
                log_process(arrVar[ref])
                arrVar = restructure(mean, ref, ref + 1, arrVar)
                ref = getIdx("mean", arrVar)
            
            # perform all Root Mean Square functions
            ref = getIdx("rms", arrVar)
            itr = 0
            while itr < key_limit and ref is not None:
                itr = itr + 1
                # get string set
                set_1 = arrVar[ref + 1]
                log_process(set_1)

                # convert string set to numeral set
                set_2 = []
                for i in set_1:
                    if isinstance(i, str):
                        x = num_cast(i)
                        set_2.append(x)
                    else:
                        x = section(distribute(i))
                        set_2.append(x)

                # perform calculation using numeral set
                square = []
                for i in set_2:
                    square.append(math.pow(i, 2))
                mean = get_mean(square)
                root = math.pow(mean, 1/2)

                # Log keyword
                log_process(arrVar[ref])
                arrVar = restructure(root, ref, ref + 1, arrVar)
                ref = getIdx("rms", arrVar)
            
            # perform all Greatest Common Factor functions
            ref = getIdx("gcf", arrVar)
            itr = 0
            while itr < key_limit and ref is not None:
                itr = itr + 1
                # get string set
                set_1 = arrVar[ref + 1]
                log_process(set_1)

                # convert string set to numeral set
                set_2 = []
                for i in set_1:
                    if isinstance(i, str):
                        x = num_cast(i)
                        set_2.append(x)
                    else:
                        x = section(distribute(i))
                        set_2.append(x)

                # perform calculation using numeral set
                gcf = 0
                val1 = set_2[0]
                val2 = set_2[1]
                if val1 != val2:
                    facts_1 = []
                    facts_2 = []

                    def factor(x):
                        factors = []
                        for i in range(x, 0, -1):
                            if x / i % 1 == 0:
                                factors.append(i)
                        return factors
                    
                    # account for limiting factor
                    if val1 > val2:
                        # filter extra factors
                        facts = factor(val1)
                        for i in facts:
                            if i < val2:
                                facts_1.append(i)
                        facts_2 = factor(val2)
                    else:
                        # filter extra factors
                        facts = factor(val2)
                        for i in facts:
                            if i < val1:
                                facts_2.append(i)
                        facts_1 = factor(val1)

                    log_process(facts_1)
                    log_process(facts_2)

                    # search for common factors
                    for i in facts_1:
                        for j in facts_2:
                            if i == j:
                                gcf = j
                                break
                        if gcf != 0:
                            break
                else:
                    gcf = set_2[0]
                
                # Log keyword
                log_process(arrVar[ref])
                arrVar = restructure(gcf, ref, ref + 1, arrVar)
                ref = getIdx("gcf", arrVar)
            
            # perform all Least Common Multiple functions
            ref = getIdx("lcm", arrVar)
            itr = 0
            while itr < key_limit and ref is not None:
                itr = itr + 1
                # get string set
                set_1 = arrVar[ref + 1]
                log_process(set_1)

                # convert string set to numeral set
                set_2 = []
                for i in set_1:
                    if isinstance(i, str):
                        x = num_cast(i)
                        set_2.append(x)
                    else:
                        x = section(distribute(i))
                        set_2.append(x)

                # perform calculation using numeral set
                lcm = 0
                mult_1 = [set_2[0]]
                mult_2 = [set_2[1]]
                same = False
                x = 0
                while x < 100 and same != True:
                    x = x + 1

                    # search for common multiples
                    for i in mult_1:
                        for j in mult_2:
                            if i == j:
                                same = True
                                lcm = i

                    # if no multiples were found, add next multiple to each list, and test again
                    if same != True:
                        mult_1.append(mult_1[0] * x)
                        mult_2.append(mult_2[0] * x)

                # Log keyword
                log_process(arrVar[ref])
                arrVar = restructure(lcm, ref, ref + 1, arrVar)
                ref = getIdx("lcm", arrVar)
            
            # perform all Logarithm functions
            ref = getIdx("log", arrVar)
            itr = 0
            while itr < key_limit and ref is not None:
                itr = itr + 1
                # get string string set
                set_1 = arrVar[ref + 1]
                log_process(set_1)

                # convert string set to numeral set
                set_2 = []
                for i in set_1:
                    if isinstance(i, str):
                        x = num_cast(i)
                        set_2.append(x)
                    else:
                        x = section(distribute(i))
                        set_2.append(x)
                
                x = set_2[0]
                b = set_2[1]
                y = math.log(x, b)

                # Log keyword
                log_process(arrVar[ref])
                arrVar = restructure(y, ref, ref + 1, arrVar)
                ref = getIdx("log", arrVar)
            
            # perform all Natural Logarithm functions
            ref = getIdx("ln", arrVar)
            itr = 0
            while itr < key_limit and ref is not None:
                itr = itr + 1

                x = num_cast(arrVar[ref + 1])
                y = math.log(x)

                # Log keyword
                log_process(arrVar[ref])
                arrVar = restructure(y, ref, ref + 1, arrVar)
                ref = getIdx("ln", arrVar)
            
        return arrVar

    def key_functions(arr):
        # conditionally runs key function modules
        # Log process label for key functions
        log_process("Key Functions")
        arrVar = arr
        # TRIGONOMIC FUNCTIONS
        arrVar = trigonomic(arrVar)
        # GEOMETRIC FUNCTIONS
        arrVar = geometric(arrVar)
        # COMBINATORIC FUNCTIONS
        arrVar = combinatoric(arrVar)
        # STATISTICAL FUNCTIONS
        arrVar = statistical(arrVar)
        
        return arrVar
    # KEY FUNCTIONS END

    # Phase III and IV Process
    def calculate(arr):
        # scans for operations and calculates
        log_process("Calculating")
        arrVar = arr
        # Phase III
        # perform all key functions
        is_key_len = len(is_key)
        # if there are required program entities for key functions: parenthesis and keywords or square brackets and keywords
        if is_paren == True and is_key_len > 0  or is_brack == True and is_key_len > 0:
            # then test if there are keys in section
            keys_in_section = False
            for i in range(0, is_key_len):
                for j in range(0, len(arrVar)):
                    if is_key[i] == arrVar[j]:
                        keys_in_section = True
                        break
                if keys_in_section == True:
                    break
            if keys_in_section == True:
                # run key functions
                arrVar = key_functions(arrVar)

        # Phase IV
        # perform all arithmetic operations in operator precedence
        
        # perform all Multiplications and Divisions as they appear from left to right
        if is_mult == True and is_div == True:
            m_ref = getIdx("*", arrVar)
            d_ref = getIdx("/", arrVar)
            while m_ref is not None or d_ref is not None:
                if d_ref is None and m_ref is not None:
                    # Only Multiply
                    x = multiply(arrVar[m_ref - 1], arrVar[m_ref + 1])
                    arrVar = restructure(x, m_ref - 1, m_ref + 1, arrVar)
                    m_ref = getIdx("*", arrVar)

                elif m_ref is None and d_ref is not None:
                    # Only Divide
                    x = divide(arrVar[d_ref - 1], arrVar[d_ref + 1])
                    arrVar = restructure(x, d_ref - 1, d_ref + 1, arrVar)
                    d_ref = getIdx("/", arrVar)

                elif m_ref is not None and d_ref is not None and m_ref < d_ref:
                    # Multiply first
                    x = multiply(arrVar[m_ref - 1], arrVar[m_ref + 1])
                    arrVar = restructure(x, m_ref - 1, m_ref + 1, arrVar)

                    d_ref = getIdx("/", arrVar)
                    y = divide(arrVar[d_ref - 1], arrVar[d_ref + 1])
                    arrVar = restructure(y, d_ref - 1, d_ref + 1, arrVar)

                    m_ref = getIdx("*", arrVar)
                    d_ref = getIdx("/", arrVar)

                elif d_ref is not None and m_ref is not None and d_ref < m_ref:
                    # Divide First
                    x = divide(arrVar[d_ref - 1], arrVar[d_ref + 1])
                    arrVar = restructure(x, d_ref - 1, d_ref + 1, arrVar)
                    m_ref = getIdx("*", arrVar)

                    y = multiply(arrVar[m_ref - 1], arrVar[m_ref + 1])
                    arrVar = restructure(y, m_ref - 1, m_ref + 1, arrVar)

                    m_ref = getIdx("*", arrVar)
                    d_ref = getIdx("/", arrVar)

        elif is_mult == True:
            m_ref = getIdx("*", arrVar)
            while m_ref is not None:
                x = multiply(arrVar[m_ref - 1], arrVar[m_ref + 1])
                arrVar = restructure(x, m_ref - 1, m_ref + 1, arrVar)
                m_ref = getIdx("*", arrVar)

        elif is_div == True:
            d_ref = getIdx("/", arrVar)
            while d_ref is not None:
                x = divide(arrVar[d_ref - 1], arrVar[d_ref + 1])
                arrVar = restructure(x, d_ref - 1, d_ref + 1, arrVar)
                d_ref = getIdx("/", arrVar)

        # perform all Additions and Subtractions as they appear from left to right
        if is_add == True and is_sub == True:
            a_ref = getIdx("+", arrVar)
            s_ref = getIdx("-", arrVar)
            while a_ref is not None or s_ref is not None:
                if s_ref is None and a_ref is not None:
                    # only add
                    x = add(arrVar[a_ref - 1], arrVar[a_ref + 1])
                    arrVar = restructure(x, a_ref - 1, a_ref + 1, arrVar)
                    a_ref = getIdx("+", arrVar)

                elif a_ref is None and s_ref is not None:
                    # only subtract
                    x = subtract(arrVar[s_ref - 1], arrVar[s_ref + 1])
                    arrVar = restructure(x, s_ref - 1, s_ref + 1, arrVar)
                    s_ref = getIdx("-", arrVar)

                elif a_ref is not None and s_ref is not None and a_ref < s_ref:
                    # add first
                    x = add(arrVar[a_ref - 1], arrVar[a_ref + 1])
                    arrVar = restructure(x, a_ref - 1, a_ref + 1, arrVar)
                    a_ref = getIdx("+", arrVar)

                    s_ref = getIdx("-", arrVar)
                    y = subtract(arrVar[s_ref - 1], arrVar[s_ref + 1])
                    arrVar = restructure(y, s_ref - 1, s_ref + 1, arrVar)

                    a_ref = getIdx("+", arrVar)
                    s_ref = getIdx("-", arrVar)

                elif s_ref is not None and a_ref is not None and s_ref < a_ref:
                    # subtract first
                    x = subtract(arrVar[s_ref - 1], arrVar[s_ref + 1])
                    arrVar = restructure(x, s_ref - 1, s_ref + 1, arrVar)
                    s_ref = getIdx("-", arrVar)

                    a_ref = getIdx("+", arrVar)
                    y = add(arrVar[a_ref - 1], arrVar[a_ref + 1])
                    arrVar = restructure(y, a_ref - 1, a_ref + 1, arrVar)

                    a_ref = getIdx("+", arrVar)
                    s_ref = getIdx("-", arrVar)
        
        elif is_add == True:
            a_ref = getIdx("+", arrVar)
            while a_ref is not None:
                x = add(arrVar[a_ref - 1], arrVar[a_ref + 1])
                arrVar = restructure(x, a_ref - 1, a_ref + 1, arrVar)
                a_ref = getIdx("+", arrVar)
        
        elif is_sub == True:
            s_ref = getIdx("-", arrVar)
            while s_ref is not None:
                x = subtract(arrVar[s_ref - 1], arrVar[s_ref + 1])
                arrVar = restructure(x, s_ref - 1, s_ref + 1, arrVar)
                s_ref = getIdx("-", arrVar)
        
        # perform all exponentiations
        if is_exp == True:
            ref = getIdx("^", arrVar)
            while ref is not None:
                x = exponentiate(arrVar[ref - 1], arrVar[ref + 1])
                arrVar = restructure(x, ref - 1, ref + 1, arrVar)
                ref = getIdx("^", arrVar)

        # Perform all square roots
        if is_root == True:
            ref = getIdx("√", arrVar)
            while ref is not None:
                x = root(arrVar[ref + 1], 2)
                arrVar = restructure(x, ref, ref + 1, arrVar)
                ref = getIdx("√", arrVar)
        
        return arrVar[0]

    # Phase II Process START
    def section(arr):
        # performs calculations in order of parenthesis nesting
        global is_paren
        arrVar = arr
        thresh = 0
        while is_paren == True and thresh < paren_limit:
            thresh = thresh + 1
            parens = []
            count = 0
            for i in range(0, len(arrVar)):
                if arrVar[i] == "(":
                    count = count + 1
                    parens.append({"index": i, "char": "("})
                elif arrVar[i] == ")":
                    count = count + 1
                    parens.append({"index": i, "char": ")"})
            if count == 0:
                is_paren = False
                continue
            else:
                log_process("Parenthesis")
            osme = []
            for i in range(0, len(parens)):
                if parens[i]["char"] == "(" and parens[i + 1]["char"] == ")":
                    # get section to be solved
                    arr_sect = arrVar[parens[i]["index"] + 1:parens[i + 1]["index"]]
                    # send to osme for restructing
                    osme.append({"section": arr_sect, "start": parens[i]["index"] + 1, "end": parens[i + 1]["index"]})
            
            # print(osme)

            for i in range(0, len(osme)):
                start = osme[len(osme) - 1 - i]["start"] - 1
                end = osme[len(osme) - 1 - i]["end"] + 1
                section = osme[len(osme) - 1 - i]["section"]
                log_process(section)
                if len(section) > 1:
                    section = calculate(section)
                arrVar = restructure(section, start, end - 1, arrVar)

        arrVar = calculate(arrVar)
        return arrVar

    def distrib(arr):
        # restructures with distributed terms
        global is_dist
        arrVar = arr
        x = 0
        while is_dist == True and x < paren_limit:
            log_process("Distribution")
            x = x + 1
            # runs distribution process
            parens = []
            for i in range(0, len(arrVar)):
                # differentiate between pairs of conditions + store in reference structure
                if arrVar[i] == "(":
                    if arrVar[i - 1] == "*" and i > 0:
                        parens.append({"char": "(", "index": i, "mult": True})
                    else:
                        parens.append({"char": "(", "index": i, "mult": False})
                elif arrVar[i] == ")":
                    if i < len(arrVar) - 1 and arrVar[i + 1] == "*":
                        parens.append({"char": ")", "index": i, "mult": True})
                    else:
                        parens.append({"char": ")", "index": i, "mult": False})
            # print(parens)

            # get section for distribution
            start = 0
            search_start = False
            start_count = 0

            end = 0
            search_end = False
            end_count = 0

            ref = 0
            monomial_start = False
            monomial_end = False

            for i in range(0, len(parens)):
                if parens[i]["mult"] == True and parens[i]["char"] == "(":
                    search_end = True
                    if arrVar[parens[i]["index"] - 2] != ")":
                        start = parens[i]["index"] - 2
                        monomial_start = True

                if parens[i]["mult"] == True and parens[i]["char"] == ")":
                    search_start = True
                    ref = i
                    if arrVar[parens[i]["index"] + 2] != "(":
                        end = parens[i]["index"] + 2
                        monomial_end = True
                
                # search for start
                if search_start == True:
                    for i in range(0, len(parens)):
                        if parens[ref - i]["char"] == "(":
                            start_count = start_count + 1
                        elif parens[ref - i]["char"] == ")":
                            start_count = start_count - 1
                        if start_count == 0 and parens[ref - i]["char"] == "(":
                            start = parens[ref - i]["index"]
                            search_start = False
                            break

                # search for end
                if search_end == True:
                    if parens[i]["char"] == "(":
                        end_count = end_count + 1
                    elif parens[i]["char"] == ")":
                        end_count = end_count - 1
                    if end_count == 0 and parens[i]["char"] == ")":
                        end = parens[i]["index"]
                        search_end = False
                
            section = arrVar[start:end + 1]

            # add parens to monomial to indentify term
            if monomial_start == True:
                monomial = section[0]
                section.pop(0)
                section.insert(0, ")")
                section.insert(0, monomial)
                section.insert(0, "(")
            if monomial_end == True:
                monomial = section[len(section) - 1]
                section.pop()
                section.append("(")
                section.append(monomial)
                section.append(")")
            log_process(section)

            # get terms from section
            terms1 = []
            terms2 = []
            compile = []
            negate_list = False
            level = 0
            last_level = level
            for i in range(0, len(section)):
                last_level = level
                if section[i] == "(":
                    level = level + 1
                elif section[i] == ")":
                    level = level - 1
                if i != len(section) - 1 and level == 0 and section[i] == ")":
                    terms1 = terms2
                    terms2 = []
                try:
                    # lists
                    if level > 1:
                        if last_level == 1 and section[i - 1] == "-":
                            negate_list = True
                        term = section[i]
                        try:
                            term = float(term)
                            if term % 1 == 0:
                                term = int(term)
                            if negate_list == True or section[i - 1] == "-":
                                term = term * -1
                            compile.append(term)
                        except:
                            compile.append(term)
                    elif level == 1 and last_level > 1:
                        length = len(compile)
                        if section[i - length] == "-":
                            for i in range(0, length):
                                try:
                                    val = float(compile[i])
                                    if val % 1 == 0:
                                        val = int(val)
                                    val = val * -1
                                    val = str(val)
                                    compile.pop(i)
                                    compile.insert(i, val)
                                except:
                                    continue
                        compile.append(")")
                        terms2.append(compile)
                        compile = []

                    # numbers
                    term = float(section[i])
                    if term % 1 == 0:
                        term = int(term)
                    if section[i - 1] == "-":
                        term = term * -1
                    if level == 1:
                        terms2.append(term)
                except:
                    continue
            # print(terms1)
            # print(terms2)

            # use nested iteration to distribute every term from terms1 over every term in terms2
            solution = []
            def itr_append(arr):
                for i in range(0, len(arr)):
                    solution.append(arr[i])    

            for i in range(0, len(terms1)):     
                for j in range(0, len(terms2)):
                    if i == 0 and j == 0:
                        if isinstance(terms1[i], list):
                            itr_append(terms1[i])
                            solution.append("*")
                        else:
                            solution.append(str(terms1[i]))
                            solution.append("*")
                        if isinstance(terms2[j], list):
                            itr_append(terms2[j])
                        else:
                            solution.append(str(terms2[j]))
                    else:
                        solution.append("+")
                        # solution.append("(")
                        if isinstance(terms1[i], list):
                            itr_append(terms1[i])
                            solution.append("*")
                        else:
                            solution.append(str(terms1[i]))
                            solution.append("*")
                        if isinstance(terms2[j], list):
                            itr_append(terms2[j])
                        else:
                            solution.append(str(terms2[j]))
            log_process(solution)

            arrVar = restructure(solution, start, end, arrVar)

            # test for distribution
            is_dist = False
            for i in range(0, len(arrVar)):
                if i != 0 and i != len(arrVar):
                    # test for two pairs of conditions that indicate distribution
                    if (arrVar[i] == "(" and arrVar[i - 1] == "*") or (arrVar[i] == ")" and i < len(arrVar) - 1 and arrVar[i + 1] == "*"):
                        is_dist = True
                        break
        return arrVar
    
    def distribute(arr):
        # restructures with distributed terms
        global is_dist
        arrVar = arr

        print(arrVar)

        x = 0
        while is_dist == True and x < paren_limit:
            # runs distribution process
            x = x + 1
            log_process("Distribution")
            
            refer = []
            for i in range(0, len(arrVar)):
                if arrVar[i] == "(" or arrVar[i] == ")" or arrVar[i] == "*":
                    refer.append({"char": arrVar[i], "index": i})

            # get section for distribution
            start = 0
            end = 0
            section = []
            for i in range(0, len(refer)):
                # search for a case of distribution
                # by testing if the current object's index value (only a "*") and previous object's index value are 1 index away from each other in arrVar and are the ")" and "*" characters
                # or if the current object's index value (only a "*") and next object's index values are 1 index away from each other in arrVar and are the "*" and "(" characters
                if refer[i]["char"] == "*" and i > 0 and arrVar[refer[i]["index"] - 1] == ")" or refer[i]["char"] == "*" and refer[i]["index"] + 1 < len(arrVar) and arrVar[refer[i]["index"] + 1] == "(":
                    # case of distribution
                    
                    # search for start
                    if i > 0 and refer[i - 1]["char"] == ")" and refer[i]["index"] == refer[i - 1]["index"] + 1:
                        a = 0
                        for j in range(0, i):
                            # backtrack to find start
                            if refer[i - j - 1]["char"] == "(":
                                a += 1
                                if a == 0:
                                    start = refer[i - j - 1]["index"]
                                    break
                            elif refer[i - j - 1]["char"] == ")":
                                a -= 1
                    else:
                        # first nomial is a monomial
                        start = i
                    
                    # search for end
                    searching = True
                    itr = 0
                    while itr < 2 and searching == True:
                        print(itr)
                        itr += 1
                        # if the current and next objects have characters that are right next to each other in arrVar
                        if i + 1 < len(refer) and refer[i]["index"] == refer[i + 1]["index"] - 1:
                            # and the character in the next object is a "("
                            if refer[i + 1]["char"] == "(":
                                nest = 0
                                # fronttrack to find end
                                for j in range(refer[i]["index"], len(arrVar)):
                                    if arrVar[j] == "(":
                                        nest += 1
                                    elif arrVar[j] == ")":
                                        nest -= 1
                                        if nest == 0:
                                            # if at last character
                                            if j == len(arrVar) - 1:
                                                end = j
                                                break
                                            # else next character is "*"
                                            elif arrVar[j + 1] != "*":
                                                end = j
                                                break
                        else:
                            # test for last nomial
                            if i + 1 == len(refer):
                                # end of structure
                                end = refer[i]["index"] + 1
                                searching = False
                            elif refer[i]["index"] + 2 < len(arrVar) and arrVar[refer[i]["index"] + 2] == "*":
                                # case of the intermittent monomial
                                # search for next case of distribution
                                print(refer[i])
                                for j in range(i, len(refer)):
                                    if refer[j]["char"] == "*" and refer[j]["index"] + 1 < len(arrVar) and arrVar[refer[j]["index"] + 1] == "(":
                                        nest = 0
                                        # fronttrack to find end
                                        for k in range(refer[j]["index"], len(arrVar)):
                                            if arrVar[k] == "(":
                                                nest += 1
                                            elif arrVar[k] == ")":
                                                nest -= 1
                                                if nest == 0:
                                                    # if at last character
                                                    if k == len(arrVar) - 1:
                                                        end = k
                                                        break
                                                    # else next character is "*"
                                                    elif arrVar[k + 1] != "*":
                                                        end = k
                                                        break

                            elif refer[i]["index"] + 2 < len(arrVar) and arrVar[refer[i]["index"] + 2] != "*":
                                # no further multiplication in case of distribution
                                end = refer[i]["index"] + 1
                                searching = False
                    
                    # build section
                    for j in range(start, end + 1):
                        section.append(arrVar[j])
                    log_process(section)

                    # print(start)
                    # print(end)
                    print(section)

                    # terminate loop to prevent further searching for case of distribution
                    break

            # reference structure for section with distribution
            sect_struct = []

            # test for leading monomial
            if section[0] != "(":
                sect_struct.append([[section[0]]]) # monomial

            # Get info using the Count Zero method
            count = 0
            for i in range(0, len(section)):
                # only test on update to prevent false positives
                # positive case indicates index in section of the end of the first binomial+
                is_zero = False
                if section[i] == "(":
                    # update count
                    count += 1
                    # test count
                    if count == 0:
                        is_zero = True
                elif section[i] == ")":
                    # update count
                    count -= 1
                    # test count
                    if count == 0:
                        is_zero = True
                
                if is_zero == True:
                    # each zero counted after update count is the last index of another nomial
                    nomial = []
                    term = []
                    nest = 0
                    # backtrack to start of nomial
                    # + identify terms as-you-go
                    for k in range(0, i + 1):
                        char = section[i - k]
                        try:
                            # test for number
                            int(char)
                            # insert character at start of term structure since iterating backward
                            term.insert(0, char)
                            print(term)
                        except:
                            # count zeros
                            if char == "(":
                                print("plus")
                                nest += 1
                                if nest == 0:
                                    # zero identified
                                    nomial.insert(0, term) # add term to polynomial
                                    term = [] # clear term buffer
                                    break

                                elif nest > -2:
                                    # add first character of expression term
                                    term.insert(0, char)

                            elif char == ")":
                                print("minus")
                                nest -= 1
                            
                            elif nest == -1 and char == "+":
                                nomial.insert(0, term)
                                term = [] # clear term buffer
                            
                            elif nest == -1 and char == "-":
                                if section[i - k + 1] == "(":
                                    # negate expression term
                                    term.insert(0, "*")
                                    term.insert(0, "-1")
                                    nomial.insert(0, term)
                                    term = [] # clear term buffer
                                else:
                                    # negate previous term
                                    term.pop(0) # remove positive value
                                    term.insert(0, "-%s" % section[i - k + 1]) # add negated value
                                    nomial.insert(0, term)
                                    term = [] # clear term buffer  

                            if nest < -1:
                                term.insert(0, char)
                                print(term)

                    sect_struct.append(nomial)
            
            # test for ending monomial
            if section[len(section) - 1] != ")":
                sect_struct.append([[section[len(section) - 1]]])

            print(sect_struct)

            # total number of nomials
            nomials_total = len(sect_struct)

            # total number of terms
            terms_total = 0
            for i in range(0, len(sect_struct)):
                terms_total += len(sect_struct[i])
            
            # total number of terms in product of distribution
            product_terms_total = 0
            for i in range(0, len(sect_struct)):
                # get terms of current nomial
                k = len(sect_struct[i])
                # sum previous terms
                s = 0
                for l in range(0, i):
                    s += len(sect_struct[l])
                s += k
                product_terms_total += k * (terms_total - s)
            
            print(nomials_total)
            print(terms_total)
            print(product_terms_total)

            # construct product expression
            term1 = 0
            nomial1 = 0
            term2 = 0
            nomial2 = 0

            multiplier = []
            multiplicand = []
            product = []

            for i in range(0, product_terms_total):
                
                # initialize
                if nomial2 == 0:
                    multiplier = sect_struct[nomial1][term1]
                    nomial2 += 1
                    multiplicand = sect_struct[nomial2][term2]

                # update indexes
                if term2 + 1 != len(sect_struct[nomial2]):
                    # mid term
                    term2 += 1
                else:
                    # last term of nomial for the multiplicand
                    term2 = 0 # first term of next nomial
                    if nomial2 + 1 != nomials_total:
                        # mid nomial for multiplicand
                        nomial2 += 1
                        term2 = 0
                    else:
                        # last nomial for multiplicand
                        
                        # update multiplier
                        if term1 + 1 != len(sect_struct[nomial1]):
                            # mid term
                            term1 += 1
                            multiplier = sect_struct[nomial1][term1]
                        else:
                            # last term
                            nomial1 += 1
                            term1 = 0
                            multiplier = sect_struct[nomial1][term1]
                        
                        # update indexes after
                        nomial1 += 1
                        if nomial1 + 1 != nomials_total:
                            nomial2 = nomial1 + 1
                            term2 = 0
                        else:
                            break

                # update multiplicand
                print("nomial: %s" % str(int(nomial2) + 1))
                print("term: %s" % str(int(term2) + 1))
                multiplicand = sect_struct[nomial2][term2]

                # append concatenation of multiplier and multiplicand to product
                product.append(multiplier + ["*"] + multiplicand + ["+"])

            print(product)

            # restructure with product expression

            # identify further distribution
            is_dist = False


        return arrVar
    
    def poly_fact(arr):
        # factors out into expressions that multiply polynomials
        global is_poly_fact
        global is_dist
        global is_mult
        arrVar = arr
        x = 0
        while is_poly_fact == True and x < poly_fact_limit:
            x = x + 1
            # get idexes of "^" in arrVar to determine number of instances of factoring
            idxs = []
            for i in range(1, len(arrVar) - 1):
                if arrVar[i] == "^" and arrVar[i - 1] == ")":
                    idxs.append(i)
            
            # run factoring that many times
            for i in range(0, len(idxs)):
                # log for each instance of factoring
                log_process("Start Factoring")
                # get base expression
                sect_start_idx = 0
                sect_end_idx = 0
                power = 0
                base = []
                x = 0
                for j in range(idxs[i], 0, -1):
                    if arrVar[j] == "(":
                        x += 1
                        if x == 0:
                            sect_start_idx = j
                            break
                    elif arrVar[j] == ")":
                        x -= 1
                
                for j in range(sect_start_idx, idxs[i]):
                    base.append(arrVar[j])
                
                # log base expression
                log_process("Base expression = %s" % base)

                # get power if expression else value
                if arrVar[idxs[i] + 1] == "(":
                    # is an expression
                    expression = []
                    x = 0
                    for j in range(idxs[i] + 1, len(arrVar)):
                        if arrVar[j] == "(":
                            x += 1
                            expression.append(arrVar[j])
                        elif arrVar[j] == ")":
                            x -= 1
                            expression.append(arrVar[j])
                            if x == 0:
                                sect_end_idx = j
                                break
                        else:
                            expression.append(arrVar[j])
                    
                    # log power expression
                    print(expression)
                    log_process("Power expression = %s" % expression)

                    # calculate power value from power expression
                    power = distribute(expression)
                    power = section(power)
                else:
                    # is a value
                    sect_end_idx = idxs[i] + 1
                    power = arrVar[idxs[i] + 1]
                
                power = num_cast(power)

                # log power value
                log_process("Power value = %s" % power)

                # test power for special cases
                if power == 0:
                    # x^0 = 1
                    arrVar = restructure(["1"], sect_start_idx, sect_end_idx, arrVar)
                elif power < 0:
                    # x^-y = 1/(x^y)
                    sect = ["1", "/", "("] + base
                    for j in range(0, abs(power) - 1):
                        sect = sect + ["*"]
                        sect = sect + base
                    sect = sect + [")"]
                    arrVar = restructure(sect, sect_start_idx, sect_end_idx, arrVar)
                else:
                    sect = base
                    for j in range(0, power - 1):
                        sect = sect + ["*"]
                        sect = sect + base
                    arrVar = restructure(sect, sect_start_idx, sect_end_idx, arrVar)

                log_process(arrVar)
                is_dist = True
                is_mult = True
                arrVar = distribute(arrVar)
                log_process("End Factoring")

        return arrVar
    # Phase II Process END

    # System Operations
    def get_info():
        # system function for displaying system information in logs
        log_process()
        log_process("System Operations")
        log_process()

        for i in range(0, len(info["system_operations"])):
            log_process(info["system_operations"][i]["name"] + ": " + info["system_operations"][i]["about"])
            log_process()
        
        log_process()
        log_process("Program Entities")
        log_process()

        log_process("Operations")
        for i in range(0, len(info["operations"])):
            log_process(info["operations"][i]["name"] + ": " + info["operations"][i]["syntax"])
            log_process()
        
        log_process("Constants")
        for i in range(0, len(info["constants"])):
            log_process(info["constants"][i]["name"] + ": " + info["constants"][i]["syntax"])
            log_process()

        log_process()
        log_process("Key Functions")
        log_process()

        for module in range(0, len(info["key_functions"])):
            for i in range(0, len(info["key_functions"][module])):
                log_process("Name: " + info["key_functions"][module][i]["name"])
                log_process("Syntax: " + info["key_functions"][module][i]["syntax"])
                log_process("About: " + info["key_functions"][module][i]["about"])
                log_process()
        
    def system_ops(arr):
        # tests for and runs all system functions
        global system_operation

        ref = getIdx("info", arr)
        if ref is not None:
            system_operation = True
            get_info()

        return system_operation

    def evaluate(str):
        # top level function runs high level functions
        global system_operation
        # structure string data
        structure = structure_string(str)
        # test for and run system operation
        system_ops(structure)
        # if no system operations, then continue evaluation
        if system_operation == False:
            # change first log
            if use_logs == "1":
                process_log["0"] = "Process Log Start"
            # Identify program entities in structured string
            identify_entities(structure)
            # restructure to factor out any polynomial multiplication
            structure = poly_fact(structure)
            # restructure to distribute out terms
            structure = distribute(structure)
            # restructure for "sets" (substructures)
            structure = structure_sets(structure)
            # solve section by section
            structure = section(structure)

            return structure

    # # Evaluation
    # use_logs = input["use_logs"]

    # print(input["problem"])
    # answer = evaluate(input["problem"])

    # output = {
    #     "problem": input["problem"],
    #     "answer": answer,
    #     "logs": process_log,
    # }

    # return output
    
    # TESTING
    # Simulated Program Input
    test = {
        # "problem": "info",
        # "problem": "sd[[sin(100+4*((-26)+1))],1]+0.5",
        # "problem": "(2*(4-3))^(2*(3-2))", # should be 4
        # "problem": "(2+3)^(2*(3-1)-1)", # should be 37
        # "problem": "3+(2+4)^2+3", # should be 42
        # "problem": "3*(4-1)", # monomial start
        # "problem": "(2+3)*4", # monomial end
        "problem": "1+(2+3)*4*(7-2)", # monomial intermittent
        # "problem": "1+(2-(2+11))*(4+1-2)*(9-7)+(4*8-5)",
        # "problem": "(1+2)*(3+4)*(5+6)",
        "use_logs": "0",
    }
    use_logs = test["use_logs"]

    # Evaluation
    answer = evaluate(test["problem"])

    # Simulated Program Output
    output = {
        "problem": test["problem"],
        "answer": answer,
        "logs": process_log,
    }

    # Prints feedback for program development
    logs = """"""
    process_log_keys = list(process_log.keys())
    for key in process_log_keys:
        logs += """%s
""" % process_log[key]

    print(test["problem"])
    print(answer)
    print(logs)
    # print("Output Object: %s" % output)

evaluator("") # remove or comment out after testing