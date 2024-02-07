import math

# Programic Process

# Phase I: Entity Analysis and Structure
# Description: Analyzes String to identify and structure entities, including multi-digit numbers, negative numbers, decimal numbers, mathematical operations, parenthesis, sets and keywords.

# Phase II: Bypass or Structural Manipulation
# Description: Bypassed unless, as identified in Phase I, there are parenthesis, in which case distribute and section functions manipulate the structure accordingly.

# Phase III: Bypass or Key Functions
# Description: Bypassed unless there are parenthesis and keywords, in which case search for and run key functions or there are square brackets and keywords, in which case create manipulate the structure to form sets and search for and run key functions.

# Phase IV: Calculation
# Description: Search for and run appropriate mathematical operation on contents of structure, restructure with solution, and repeat until no operations are remaining.

# reference

# √ character shortcut (using number pad; "+" means press and hold): alt + 2 + 5 + 1

# PARAMETERS
# the paren_limit parameter controls the maximum number of levels of parenthesis nesting in any one evaluation
paren_limit = 10

# the pi_limit parameter controls the maximum number of instances of pi allowed in any one evaluation
pi_limit = 10

# the key_limit parameter controls the maximum number of the same key function allowed in any one evaluation
key_limit = 10

# ENTITY REFERENCE
# system_operation indicates whether there are system operations, True, or not, False
# If True, terminates program after system operations are complete
system_operation = False

# is_paren indicates whether there are parenthesis, True, or not, False
# If False, bypasses distribute and section functions
is_paren = False

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

# is_key stores all the kinds of keys in problem string
# If is_key list is empty, bypasses key_functions function
is_key = []

# Information
info = {
    "system_operations": [
        {"name": "info", "about": "Prints program information."},
    ],
    "program_entities": [
        {"name":"Negative Numbers", "syntax":"(-x)"},
        {"name":"Exponentiation", "syntax":"^"},
        {"name":"roots", "syntax":"√"},
        {"name":"Multiplication", "syntax":"*"},
        {"name":"Division", "syntax":"/"},
        {"name":"Addition", "syntax":"+"},
        {"name":"Subtraction", "syntax":"-"},
    ],
    "key_functions": [
        
        # Trigonomic
        {"name":"Arc Sine", "key":"asin", "syntax": "asin(x)", "about": "Gets arc sine of x, where x is a value or an expression that evaluates to a value."},
        {"name":"Arc Cosine", "key": "acos", "syntax": "acos(x)", "about": "Gets arc cosine of x, where x is a value or an expression that evaluates to a value."},
        {"name":"Arc Tangent", "key": "atan", "syntax": "atan(x)", "about": "Gets arc tangent of x, where x is a value or an expression that evaluates to a value."},
        {"name":"Sine", "key": "sin", "syntax": "sin(x)", "about": "Gets sine of x, where x is a value or an expression that evaluates to a value."},
        {"name":"Cosine", "key": "cos", "syntax": "cos(x)", "about": "Gets cosine of x, where x is a value or an expression that evaluates to a value."},
        {"name":"Tangent", "key":"tan", "syntax": "tan(x)", "about": "Gets tangent of x, where x is a value or an expression that evaluates to a value."},
        
        # Logarithm
        {"name":"Logarithm", "key":"log", "syntax": "log[x,b]", "about": "Gets logarithm of x with base b, where x and b are values or an expression wrapped in square brackets that evaluates to a value."},
        {"name":"Natural Log", "key":"ln", "syntax": "ln(x)", "about": "Gets natural log of x with base e, where x is a value or an expression wrapped in square brackets that evaluates to a value."},
        
        # Statistical
        {"name":"Factorial", "key":"fact", "syntax": "fact(x)", "about": "Gets factorial of x, where x is a value or an expression that evaluates to a value."},
        {"name":"Permutation", "key":"perm", "syntax": "perm[n,r]", "about": "Gets permutation given n number of objects with r number of objects per permutation, where n and r are values or an expression that evaulates to a value wrapped within square brackets, e.g. perm[n,[r+x]]."},
        {"name":"Combination", "key":"comb", "syntax": "comb[n,r]", "about": "Gets combination given n number of objects with r number of objects per combination, where n and r are  values or an expression that evaulates to a value wrapped within square brackets, e.g. comb[n,[r+x]]."},
        {"name":"Standard Deviation", "key":"sd", "syntax": "sd[a,b]", "about": "Gets the standard deviation of the set of items within square brackets, where that set has at least two comma-demarcated items and no spaces between items. An item may be a value or an expression that evaulates to a value wrapped within square brackets, e.g. sd[a,[b+x]]."},
        {"name":"Harmonic Mean", "key":"meanh", "syntax": "meanh[a,b]", "about": "Gets the geometeric mean of the the set of items within square brackets, where that set has at least two comma-demarcated items with no spaces between them, and each item is a value or an expression that evaulates to a value wrapped within square brackets, e.g. meang[10,[2+3]]."},
        {"name":"Geometeric Mean", "key":"meang", "syntax": "meang[a,b]", "about": "Gets the harmonic mean of the the set of items within square brackets, where that set has at least two comma-demarcated items with no spaces between them, and each item is a value or an expression that evaulates to a value wrapped within square brackets, e.g. meanh[10,[2+3]]."},
        {"name":"Weighted Mean", "key":"meanw", "syntax": "meanw[[a,w1],[b,w2]]", "about": "Gets the weighted mean of the the set of items within square brackets, where that set has at least two comma-demarcated items with no spaces between them, and each item is a value and a weight for that value wrapped in square brackets, e.g. meanw[[10,60],[20,40]]."},
        {"name":"Mean", "key":"mean", "syntax": "mean[a,b]", "about": "Gets the mean of the the set of values within square brackets, where that set has at least two comma demarcated items with no spaces between them, and each item is a value or an expression that evaluates to a value, e.g. mean[a,[b+x]]."},
        {"name":"Root Mean Square", "key":"rms", "syntax": "rms[a1,a2]", "about": "Gets the geometeric mean of the the set of items within square brackets, where that set has at least two comma-demarcated items with no spaces between them, and each item is a value or an expression that evaulates to a value wrapped within square brackets, e.g. rms[10,[2+3]]."},
        {"name":"Greatest Common Factor", "key":"gcf", "syntax": "gcf[a,b]", "about": "Gets the greatest common factor of a and b within square brackets, where a and b are values or expressions that evaluate to values wrapped in square brackets, e.g. gcf[a,[b+x]]."},
        {"name":"Least Common Multiple", "key":"lcm", "syntax": "lcm[a,b]", "about": "Gets the least common multiple of values a and b within square brackets, where a and b are values or expressions that evaluate to values wrapped in square brackets, e.g. lcm[a,[b+x]]."},
        
        # 2D Geometery
        {"name":"Triangle Area", "key":"tria", "syntax": "tria[b,h]", "about": "Gets area of triangle of base b and height h, where b and h are values or an expression that evaluates to a value wrapped in square brackets, e.g. tria[b,[h+x]]."},
        {"name":"Triangle Perimeter", "key":"trip", "syntax": "trip[a,b,c]", "about": "Gets perimeter of triangle of side lengths a, b, and c, where a, b, and c are values or an expression that evaluates to a value wrapped in square brackets, e.g. trip[a,b,[c+x]]."},
        {"name":"Quadrilateral Area", "key":"quada", "syntax": "quada[b,h]", "about": "Gets area of quadrilateral of base b and height h, where b and h are values or an expression that evaluates to a value wrapped in square brackets, e.g. quada[b,[h+x]]."},
        {"name":"Quadrilateral Perimeter", "key":"quadp", "syntax": "quadp[a,b,c,d]", "about": "Gets perimeter of quadrilateral side lengths a, b, c, and d, where a, b, c, and d are values or an expression that evaluates to a value wrapped in square brackets, e.g. quadp[a,b,c,[d+x]]."},
        {"name":"Regular n-gon Area", "key":"ngona", "syntax": "ngona[a,n]", "about": "Gets area of regular n-gon with side length a and number of sides n, where a and n are values or an expression that evaluates to a value wrapped in square brackets, e.g. ngona[s,[n+x]]."},
        {"name":"Regular n-gon Perimeter", "key":"ngonp", "syntax": "ngonp[a,n]", "about": "Gets perimeter of regular n-gon of with side length a and number of sides n, where a and n are values or an expression that evaluates to a value wrapped in square brackets, e.g. ngonp[s,[n+x]]."},
        {"name":"Circle Area", "key":"circlea", "syntax": "circlea(r)", "about": "Gets area of circle with radius r, where r is a value or an expression that evaluates to a value."},
        {"name":"Circle Perimeter", "key":"circlep", "syntax": "circlep(r)", "about": "Gets perimeter of circle with radius r, where r is a value or an expression that evaluates to a value."},
        
        # 3D Geometery
        {"name": "Cylinder Volume", "key": "cylinderv", "syntax": "cylinderv[r,h]", "about": "Gets volume of cylinder with base radius r and height h, where r and h are values or expressions that evaluate to values wrapped in square brackets, e.g. cylinderv[r,[h+x]]"},
        {"name": "Cylinder Surafce Area", "key": "cylindersa", "syntax": "cylindersa[r,h]", "about": "Gets surface area of cylinder with base radius r and height h, where r and h are values or expressions that evaluate to values wrapped in square brackets, e.g. cylinderv[r,[h+x]]"},
    ],
}

# STRUCTURE START
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
    return structure

def get_word(word, arr):
    wordLen = len(word)
    ref = None
    for i in range(0, len(arr) - 1):
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

def word_struct(word, arr):
    global is_key
    arrVar = arr
    ref = get_word(word, arrVar)
    s = True
    while ref is not None:
        if s == True:
            is_key = [word] + is_key
            s = False
        arrVar = restructure(word, ref["first"], ref["last"] - 1, arrVar)
        ref = get_word(word, arrVar)
    return arrVar

def structure_sets(arr):
    # structure sets
    sets_ref = []
    for i in range(0, len(arr)):
        if arr[i] == "[":
            sets_ref.append({"char": "[", "index": i})
        elif arr[i] == "]":
            sets_ref.append({"char": "]", "index": i})
    while len(sets_ref) > 0:
        # identify next set to structure using reference
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
    print(arr)
    return arr

def identify_entities(arr):
    # Identify parenthesis
    global is_paren
    for i in range(0, len(arr)):
        if arr[i] == "(":
            is_paren = True
            break
    
    # Identify square brackets
    global is_brack
    for i in range(0, len(arr)):
        if arr[i] == "[":
            is_brack = True
            break
    
    # Identify exponentiation
    global is_exp
    for i in range(0, len(arr)):
        if arr[i] == "^":
            is_exp = True
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
    
    return arr

# Phase I Process
def structure_string(str):
    # structure multi-digit numbers, negative numbers, decimal numbers, pi, mathematical operations, parenthesis, and square brackets
    arr = []
    digits = ""
    for i in range(0, len(str)):
        try:
            str[i] == "." or int(str[i])
        except:
            # handle negatives
            if str[i - 1] == "(" and str[i] == "-":
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
    # print(arr)

    # structure pi
    ref = get_word("pi", arr)
    itr = 0
    while itr < pi_limit and ref is not None:
        itr = itr + 1
        arr = restructure(math.pi, ref["first"], ref["last"] - 1, arr)
        ref = get_word("pi", arr)

    # structure keywords
    s = True
    for i in range(0, len(info["system_operations"])):
        arr = word_struct(info["system_operations"][i]["name"], arr)

    for i in range(0, len(info["key_functions"])):
        arr = word_struct(info["key_functions"][i]["key"], arr)
    # print(arr)

    print(arr)
    return arr
# STRUCTURE END

# KEY FUNCTIONS START
def getIdx(str, arr):
    val = None
    for i in range(0, len(arr)):
        if arr[i] == str:
            val = i
            break
    return val

def trigonomic(arr):
    arrVar = arr
    # perform all sine functions
    ref = getIdx("sin", arrVar)
    itr = 0
    while itr < key_limit and ref is not None:
        itr = itr + 1
        x = float(arrVar[ref + 1])
        if x / 1 % 1 == 0:
            x = int(x)
        
        y = math.sin(x)

        arrVar = restructure(y, ref, ref + 1, arrVar)
        ref = getIdx("sin", arrVar)
        print(arrVar)

    # perform all cosine functions
    ref = getIdx("cos", arrVar)
    itr = 0
    while itr < key_limit and ref is not None:
        itr = itr + 1
        x = float(arrVar[ref + 1])
        if x / 1 % 1 == 0:
            x = int(x)
        
        y = math.cos(x)

        arrVar = restructure(y, ref, ref + 1, arrVar)
        ref = getIdx("cos", arrVar)
        print(arrVar)

    # perform all tangent functions
    ref = getIdx("tan", arrVar)
    itr = 0
    while itr < key_limit and ref is not None:
        itr = itr + 1
        x = float(arrVar[ref + 1])
        if x / 1 % 1 == 0:
            x = int(x)
        
        y = math.tan(x)

        arrVar = restructure(y, ref, ref + 1, arrVar)
        ref = getIdx("tan", arrVar)
        print(arrVar)
    
    # perform all arc sine functions
    ref = getIdx("asin", arrVar)
    itr = 0
    while itr < key_limit and ref is not None:
        itr = itr + 1
        x = float(arrVar[ref + 1])
        if x / 1 % 1 == 0:
            x = int(x)
        
        y = math.asin(x)

        arrVar = restructure(y, ref, ref + 1, arrVar)
        ref = getIdx("asin", arrVar)
        print(arrVar)

    # perform all arc cosine functions
    ref = getIdx("acos", arrVar)
    itr = 0
    while itr < key_limit and ref is not None:
        itr = itr + 1
        x = float(arrVar[ref + 1])
        if x / 1 % 1 == 0:
            x = int(x)
        
        y = math.acos(x)

        arrVar = restructure(y, ref, ref + 1, arrVar)
        ref = getIdx("acos", arrVar)
        print(arrVar)

    # perform all arc tangent functions
    ref = getIdx("atan", arrVar)
    itr = 0
    while itr < key_limit and ref is not None:
        itr = itr + 1
        x = float(arrVar[ref + 1])
        if x / 1 % 1 == 0:
            x = int(x)
        
        y = math.atan(x)

        arrVar = restructure(y, ref, ref + 1, arrVar)
        ref = getIdx("atan", arrVar)
        print(arrVar)

    return arrVar

def logarithmic(arr):
    arrVar = arr
    # perform all Logarithm functions
    ref = getIdx("log", arrVar)
    itr = 0
    while itr < key_limit and ref is not None:
        itr = itr + 1
        # get string string set
        set_1 = arrVar[ref + 1]
        print(set_1)

        # convert string set to numeral set
        set_2 = []
        for i in set_1:
            if isinstance(i, str):
                x = float(i)
                if x / 1 % 1 == 0:
                    x = int(x)
                set_2.append(x)
            else:
                x = section(distribute(i))
                set_2.append(x)
        
        x = set_2[0]
        b = set_2[1]
        y = math.log(x, b)

        arrVar = restructure(y, ref, ref + 1, arrVar)
        ref = getIdx("log", arrVar)
        print(arrVar)
    
    # perform all Natural Logarithm functions
    ref = getIdx("ln", arrVar)
    itr = 0
    while itr < key_limit and ref is not None:
        itr = itr + 1
        x = float(arrVar[ref + 1])
        if x / 1 % 1 == 0:
            x = int(x)
        y = math.log(x)

        arrVar = restructure(y, ref, ref + 1, arrVar)
        ref = getIdx("ln", arrVar)
        print(arrVar)
    
    return arrVar
    
def statistical(arr):
    arrVar = arr
    # perform all Factorial functions
    ref = getIdx("fact", arrVar)
    itr = 0
    while itr < key_limit and ref is not None:
        itr = itr + 1
        x = float(arrVar[ref + 1])
        if x / 1 % 1 == 0:
            x = int(x)
        y = 1
        for i in range(x, 1, -1):
            y = y * i

        arrVar = restructure(y, ref, ref + 1, arrVar)
        ref = getIdx("fact", arrVar)
        print(arrVar)

    # perform all Permutation functions
    ref = getIdx("perm", arrVar)
    itr = 0
    while itr < key_limit and ref is not None:
        itr = itr + 1
        # get string set
        set_1 = arrVar[ref + 1]
        print(set_1)

        # convert string set to numeral set
        set_2 = []
        for i in set_1:
            if isinstance(i, str):
                x = float(i)
                set_2.append(x)
            else:
                x = section(distribute(i))
                set_2.append(x)
        print(set_2)
        # perform calculation using numeral set
        def factorial(x):
            y = 1
            for i in range(int(x), 1, -1):
                y = y * i
            return y
        
        n = set_2[0]
        r = set_2[1]

        numerator = factorial(n)
        denominator = factorial(n - r)

        perm = numerator / denominator

        arrVar = restructure(perm, ref, ref + 1, arrVar)
        ref = getIdx("perm", arrVar)
        print(arrVar)
    
    # perform all Combination functions
    ref = getIdx("comb", arrVar)
    itr = 0
    while itr < key_limit and ref is not None:
        itr = itr + 1
        # get string set
        set_1 = arrVar[ref + 1]
        print(set_1)

        # convert string set to numeral set
        set_2 = []
        for i in set_1:
            if isinstance(i, str):
                x = float(i)
                set_2.append(x)
            else:
                x = section(distribute(i))
                set_2.append(x)
        print(set_2)
        # perform calculation using numeral set
        def factorial(x):
            y = 1
            for i in range(int(x), 1, -1):
                y = y * i
            return y
        
        n = set_2[0]
        r = set_2[1]

        numerator = factorial(n)

        val1 = factorial(r)
        val2 = factorial(n - r)
        denominator = val1 * val2

        comb = numerator / denominator

        arrVar = restructure(comb, ref, ref + 1, arrVar)
        ref = getIdx("comb", arrVar)
        print(arrVar)
    
    # perform all Standard Deviation functions
    ref = getIdx("sd", arrVar)
    itr = 0
    while itr < key_limit and ref is not None:
        itr = itr + 1
        # get string set
        set_1 = arrVar[ref + 1]
        print(set_1)

        # convert string set to numeral set
        set_2 = []
        for i in set_1:
            if isinstance(i, str):
                x = float(i)
                if x / 1 % 1 == 0:
                    x = int(x)
                set_2.append(x)
            else:
                x = section(distribute(i))
                set_2.append(x)

        # perform calculation using numeral set
        mean = sum(set_2) / len(set_2)
        set_3 = []
        for i in set_2:
            set_3.append(math.pow(i - mean, 2))
        sd = math.pow(sum(set_3)/len(set_3), 1/2)

        arrVar = restructure(sd, ref, ref + 1, arrVar)
        ref = getIdx("sd", arrVar)
        print(arrVar)

    # perform all Harmonic Mean functions
    ref = getIdx("meanh", arrVar)
    itr = 0
    while itr < key_limit and ref is not None:
        itr = itr + 1
        # get string set
        set_1 = arrVar[ref + 1]
        print(set_1)

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

        arrVar = restructure(mean, ref, ref + 1, arrVar)
        ref = getIdx("meanh", arrVar)
        print(arrVar)
    
    # perform all Geometeric Mean functions
    ref = getIdx("meang", arrVar)
    itr = 0
    while itr < key_limit and ref is not None:
        itr = itr + 1
        # get string set
        set_1 = arrVar[ref + 1]
        print(set_1)

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

        arrVar = restructure(mean, ref, ref + 1, arrVar)
        ref = getIdx("meang", arrVar)
        print(arrVar)

    # perform all Weighted Mean functions
    ref = getIdx("meanw", arrVar)
    itr = 0
    while itr < key_limit and ref is not None:
    
        itr = itr + 1
        # get string set
        set_1 = arrVar[ref + 1]
        print(set_1)

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

        arrVar = restructure(mean, ref, ref + 1, arrVar)
        ref = getIdx("meanw", arrVar)
        print(arrVar)

    # perform all Mean functions
    ref = getIdx("mean", arrVar)
    itr = 0
    while itr < key_limit and ref is not None:
        itr = itr + 1
        # get string set
        set_1 = arrVar[ref + 1]
        print(set_1)

        # convert string set to numeral set
        set_2 = []
        for i in set_1:
            if isinstance(i, str):
                x = float(i)
                if x / 1 % 1 == 0:
                    x = int(x)
                set_2.append(x)
            else:
                x = section(distribute(i))
                set_2.append(x)

        # perform calculation using numeral set
        mean = sum(set_2) / len(set_2)

        arrVar = restructure(mean, ref, ref + 1, arrVar)
        ref = getIdx("mean", arrVar)
        print(arrVar)
    
    # perform all Root Mean Square functions
    ref = getIdx("rms", arrVar)
    itr = 0
    while itr < key_limit and ref is not None:
        itr = itr + 1
        # get string set
        set_1 = arrVar[ref + 1]
        print(set_1)

        # convert string set to numeral set
        set_2 = []
        for i in set_1:
            if isinstance(i, str):
                x = float(i)
                if x / 1 % 1 == 0:
                    x = int(x)
                set_2.append(x)
            else:
                x = section(distribute(i))
                set_2.append(x)

        # perform calculation using numeral set
        square = []
        for i in set_2:
            square.append(math.pow(i, 2))
        mean = sum(square) / len(square)
        root = math.pow(mean, 1/2)

        arrVar = restructure(root, ref, ref + 1, arrVar)
        ref = getIdx("rms", arrVar)
        print(arrVar)
    
    # perform all Greatest Common Factor functions
    ref = getIdx("gcf", arrVar)
    itr = 0
    while itr < key_limit and ref is not None:
        itr = itr + 1
        # get string set
        set_1 = arrVar[ref + 1]
        print(set_1)

        # convert string set to numeral set
        set_2 = []
        for i in set_1:
            if isinstance(i, str):
                x = float(i)
                if x / 1 % 1 == 0:
                    x = int(x)
                set_2.append(x)
            else:
                x = section(distribute(i))
                set_2.append(x)

        # perform calculation using numeral set
        gcf = 0
        val1 = set_2[0]
        val2 = set_2[1]
        if val1 != val2:
            fact_1 = []
            fact_2 = []

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
                        fact_1.append(i)
                fact_2 = factor(val2)
            else:
                # filter extra factors
                facts = factor(val2)
                for i in facts:
                    if i < val1:
                        fact_2.append(i)
                fact_1 = factor(val1)

            print(fact_1)
            print(fact_2)

            # search for common factors
            for i in fact_1:
                for j in fact_2:
                    if i == j:
                        gcf = j
                        break
                if gcf != 0:
                    break
        else:
            gcf = set_2[0]
        
        arrVar = restructure(gcf, ref, ref + 1, arrVar)
        ref = getIdx("gcf", arrVar)
        print(arrVar)
    
    # perform all Least Common Multiple functions
    ref = getIdx("lcm", arrVar)
    itr = 0
    while itr < key_limit and ref is not None:
        itr = itr + 1
        # get string set
        set_1 = arrVar[ref + 1]
        print(set_1)

        # convert string set to numeral set
        set_2 = []
        for i in set_1:
            if isinstance(i, str):
                x = float(i)
                if x / 1 % 1 == 0:
                    x = int(x)
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

        arrVar = restructure(lcm, ref, ref + 1, arrVar)
        ref = getIdx("lcm", arrVar)
        print(arrVar)
    
    return arrVar

def geometeric2D(arr):
    arrVar = arr
    # Triangle
    # perform all Triangle Area functions
    ref = getIdx("tria", arrVar)
    itr = 0
    while itr < key_limit and ref is not None:
        itr = itr + 1
        # get string set
        set_1 = arrVar[ref + 1]
        print(set_1)

        # convert string set to numeral set
        set_2 = []
        for i in set_1:
            if isinstance(i, str):
                x = float(i)
                if x / 1 % 1 == 0:
                    x = int(x)
                set_2.append(x)
            else:
                x = section(distribute(i))
                set_2.append(x)

        # perform calculation using numeral set
        base = set_2[0]
        height = set_2[1]
        area = .5 * base * height
        
        arrVar = restructure(area, ref, ref + 1, arrVar)
        ref = getIdx("tria", arrVar)
        print(arrVar)
    
    # perform all Triangle Perimeter functions
    ref = getIdx("trip", arrVar)
    itr = 0
    while itr < key_limit and ref is not None:
        itr = itr + 1
        # get string set
        set_1 = arrVar[ref + 1]
        print(set_1)

        # convert string set to numeral set
        set_2 = []
        for i in set_1:
            if isinstance(i, str):
                x = float(i)
                if x / 1 % 1 == 0:
                    x = int(x)
                set_2.append(x)
            else:
                x = section(distribute(i))
                set_2.append(x)

        # perform calculation using numeral set
        a = set_2[0]
        b = set_2[1]
        c = set_2[2]

        perimeter = a + b + c
        
        arrVar = restructure(perimeter, ref, ref + 1, arrVar)
        ref = getIdx("trip", arrVar)
        print(arrVar)

    # Quadrilateral
    # perform all Quadrilateral Area functions
    ref = getIdx("quada", arrVar)
    itr = 0
    while itr < key_limit and ref is not None:
        itr = itr + 1
        # get string set
        set_1 = arrVar[ref + 1]
        print(set_1)

        # convert string set to numeral set
        set_2 = []
        for i in set_1:
            if isinstance(i, str):
                x = float(i)
                if x / 1 % 1 == 0:
                    x = int(x)
                set_2.append(x)
            else:
                x = section(distribute(i))
                set_2.append(x)

        # perform calculation using numeral set
        base = set_2[0]
        height = set_2[1]
        area = base * height
        
        arrVar = restructure(area, ref, ref + 1, arrVar)
        ref = getIdx("quada", arrVar)
        print(arrVar)
    
    # perform all Quadrilateral Perimeter functions
    ref = getIdx("quadp", arrVar)
    itr = 0
    while itr < key_limit and ref is not None:
        itr = itr + 1
        # get string set
        set_1 = arrVar[ref + 1]
        print(set_1)

        # convert string set to numeral set
        set_2 = []
        for i in set_1:
            if isinstance(i, str):
                x = float(i)
                if x / 1 % 1 == 0:
                    x = int(x)
                set_2.append(x)
            else:
                x = section(distribute(i))
                set_2.append(x)

        # perform calculation using numeral set
        a = set_2[0]
        b = set_2[1]
        c = set_2[2]
        d = set_2[3]

        perimeter = a + b + c + d
        
        arrVar = restructure(perimeter, ref, ref + 1, arrVar)
        ref = getIdx("quadp", arrVar)
        print(arrVar)
    
    # n-Gon
    # perform all Regular n-Gon Area functions
    ref = getIdx("ngona", arrVar)
    itr = 0
    while itr < key_limit and ref is not None:
        itr = itr + 1
        # get string set
        set_1 = arrVar[ref + 1]
        print(set_1)

        # convert string set to numeral set
        set_2 = []
        for i in set_1:
            if isinstance(i, str):
                x = float(i)
                if x / 1 % 1 == 0:
                    x = int(x)
                set_2.append(x)
            else:
                x = section(distribute(i))
                set_2.append(x)

        # perform calculation using numeral set
        a = math.pow(set_2[0], 2)
        n = set_2[1]
        trig = 1 / math.tan(math.pi / n)
        area = .25 * a * n * trig
        
        arrVar = restructure(area, ref, ref + 1, arrVar)
        ref = getIdx("ngona", arrVar)
        print(arrVar)
    
    # perform all Regular n-Gon Perimeter functions
    ref = getIdx("ngonp", arrVar)
    itr = 0
    while itr < key_limit and ref is not None:
        itr = itr + 1
        # get string set
        set_1 = arrVar[ref + 1]
        print(set_1)

        # convert string set to numeral set
        set_2 = []
        for i in set_1:
            if isinstance(i, str):
                x = float(i)
                if x / 1 % 1 == 0:
                    x = int(x)
                set_2.append(x)
            else:
                x = section(distribute(i))
                set_2.append(x)

        # perform calculation using numeral set
        a = set_2[0]
        n = set_2[1]
        perimeter = a * n
        
        arrVar = restructure(perimeter, ref, ref + 1, arrVar)
        ref = getIdx("ngonp", arrVar)
        print(arrVar)
    
    # Circle
    # perform all Circle Area functions
    ref = getIdx("circlea", arrVar)
    itr = 0
    while itr < key_limit and ref is not None:
        itr = itr + 1

        r = float(arrVar[ref + 1])
        if r / 1 % 1 == 0:
            r = int(r)

        area = math.pi * math.pow(r, 2)
        
        arrVar = restructure(area, ref, ref + 1, arrVar)
        ref = getIdx("circlea", arrVar)
        print(arrVar)

    # perform all Circle Perimeter functions
    ref = getIdx("circlep", arrVar)
    itr = 0
    while itr < key_limit and ref is not None:
        itr = itr + 1

        r = float(arrVar[ref + 1])
        if r / 1 % 1 == 0:
            r = int(r)

        perimeter = 2 * math.pi * r
        
        arrVar = restructure(perimeter, ref, ref + 1, arrVar)
        ref = getIdx("circlep", arrVar)
        print(arrVar)
    
    return arrVar

def geometeric3D(arr):
    arrVar = arr
    # perform all Cylinder Volume functions
    ref = getIdx("cylinderp", arrVar)
    itr = 0
    while itr < key_limit and ref is not None:
        itr = itr + 1
        # get string set
        set_1 = arrVar[ref + 1]
        print(set_1)

        # convert string set to numeral set
        set_2 = []
        for i in set_1:
            if isinstance(i, str):
                x = float(i)
                if x / 1 % 1 == 0:
                    x = int(x)
                set_2.append(x)
            else:
                x = section(distribute(i))
                set_2.append(x)

        # perform calculation using numeral set
        radius = set_2[0]
        height = set_2[1]
        base_area = math.pi * math.pow(radius, 2)
        volume = base_area * height
        
        arrVar = restructure(volume, ref, ref + 1, arrVar)
        ref = getIdx("cylinderp", arrVar)
        print(arrVar)

    # perform all Cylinder Surface Area functions
    # sum of the circumference of the base times the height and the area of the base times two
    ref = getIdx("cylindersa", arrVar)
    itr = 0
    while itr < key_limit and ref is not None:
        itr = itr + 1
        # get string set
        set_1 = arrVar[ref + 1]
        print(set_1)

        # convert string set to numeral set
        set_2 = []
        for i in set_1:
            if isinstance(i, str):
                x = float(i)
                if x / 1 % 1 == 0:
                    x = int(x)
                set_2.append(x)
            else:
                x = section(distribute(i))
                set_2.append(x)

        # perform calculation using numeral set
        radius = set_2[0]
        height = set_2[1]
        base_area = math.pi * math.pow(radius, 2)
        base_circumference = 2 * math.pi * radius
        surface_area = base_circumference * height + 2 * base_area
        
        arrVar = restructure(surface_area, ref, ref + 1, arrVar)
        ref = getIdx("cylindersa", arrVar)
        print(arrVar)

    # perform all Cone Volume functions
    # perform all Cone Surface Area functions
    # perform all Rectangular Prism Volume functions
    # perform all Rectangular Prism Surface Area functions
        
    # Platonic Solids
    # perform all Tertrahedron Volume functions
    # perform all Tertrahedron Surface Area functions
    # perform all Cube Volume functions
    # perform all Cube Surface Area functions
    # perform all Octahedron Volume functions
    # perform all Octahedron Surface Area functions
    # perform all Dodecahedron Volume functions
    # perform all Dodecahedron Surface Area functions
    # perform all Icosahedron Volume functions
    # perform all Icosahedron Surface Area functions

    return arrVar

# Phase III process
def key_functions(arr):
    arrVar = arr
    # TRIGONOMIC FUNCTIONS
    arrVar = trigonomic(arrVar)
    # LOGARITHMIC FUNCTIONS
    arrVar = logarithmic(arrVar)
    # STATISTICAL FUNCTIONS
    arrVar = statistical(arrVar)
    # 2D GEOMTERIC FUNCTIONS
    arrVar = geometeric2D(arrVar)
    # 3D GEOMTERIC FUNCTIONS
    arrVar = geometeric3D(arrVar)
    
    return arrVar
# KEY FUNCTIONS END

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
# OPERATIONS END

# Phase IV Process
def calculate(arr):
    arrVar = arr

    # perform all key functions
    is_key_len = len(is_key)
    if is_paren == True and is_key_len > 0  or is_brack == True and is_key_len > 0:
        arrVar = key_functions(arrVar)

    # perform all arithmetic operations in operator precedence
    # perform all exponentiations
    if is_exp == True:
        ref = getIdx("^", arrVar)
        while ref is not None:
            arrVar = restructure(exponentiate(arrVar[ref - 1], arrVar[ref + 1]), ref - 1, ref + 1, arrVar)
            ref = getIdx("^", arrVar)
            print(arrVar)

    # Perform all square roots
    if is_root == True:
        ref = getIdx("√", arrVar)
        while ref is not None:
            arrVar = restructure(root(arrVar[ref + 1], 2), ref, ref + 1, arrVar)
            ref = getIdx("√", arrVar)
            print(arrVar)
    
    # perform all Multiplications and Divisions as they appear from left to right
    if is_mult == True and is_div == True:
        m_ref = getIdx("*", arrVar)
        d_ref = getIdx("/", arrVar)
        while m_ref is not None or d_ref is not None:
            if d_ref is None and m_ref is not None:
                # Only Multiply
                arrVar = restructure(multiply(arrVar[m_ref - 1], arrVar[m_ref + 1]), m_ref - 1, m_ref + 1, arrVar)
                m_ref = getIdx("*", arrVar)
                print(arrVar)

            elif m_ref is None and d_ref is not None:
                # Only Divide
                arrVar = restructure(divide(arrVar[d_ref - 1], arrVar[d_ref + 1]), d_ref - 1, d_ref + 1, arrVar)
                d_ref = getIdx("/", arrVar)
                print(arrVar)

            elif m_ref is not None and d_ref is not None and m_ref < d_ref:
                # Multiply first
                arrVar = restructure(multiply(arrVar[m_ref - 1], arrVar[m_ref + 1]), m_ref - 1, m_ref + 1, arrVar)
                print(arrVar)

                d_ref = getIdx("/", arrVar)
                arrVar = restructure(divide(arrVar[d_ref - 1], arrVar[d_ref + 1]), d_ref - 1, d_ref + 1, arrVar)
                print(arrVar)

                m_ref = getIdx("*", arrVar)
                d_ref = getIdx("/", arrVar)

            elif d_ref is not None and m_ref is not None and d_ref < m_ref:
                # Divide First
                arrVar = restructure(divide(arrVar[d_ref - 1], arrVar[d_ref + 1]), d_ref - 1, d_ref + 1, arrVar)
                print(arrVar)
                m_ref = getIdx("*", arrVar)

                arrVar = restructure(multiply(arrVar[m_ref - 1], arrVar[m_ref + 1]), m_ref - 1, m_ref + 1, arrVar)
                print(arrVar)

                m_ref = getIdx("*", arrVar)
                d_ref = getIdx("/", arrVar)
    elif is_mult == True:
        m_ref = getIdx("*", arrVar)
        while m_ref is not None:
            arrVar = restructure(multiply(arrVar[m_ref - 1], arrVar[m_ref + 1]), m_ref - 1, m_ref + 1, arrVar)
            m_ref = getIdx("*", arrVar)
            print(arrVar)
    elif is_div == True:
        d_ref = getIdx("/", arrVar)
        while d_ref is not None:
            arrVar = restructure(divide(arrVar[d_ref - 1], arrVar[d_ref + 1]), d_ref - 1, d_ref + 1, arrVar)
            d_ref = getIdx("/", arrVar)
            print(arrVar)

    # perform all Additions and Subtractions as they appear from left to right
    if is_add == True and is_sub == True:
        a_ref = getIdx("+", arrVar)
        s_ref = getIdx("-", arrVar)
        while a_ref is not None or s_ref is not None:
            if s_ref is None and a_ref is not None:
                # only add
                arrVar = restructure(add(arrVar[a_ref - 1], arrVar[a_ref + 1]), a_ref - 1, a_ref + 1, arrVar)
                a_ref = getIdx("+", arrVar)
                print(arrVar)

            elif a_ref is None and s_ref is not None:
                # only subtract
                arrVar = restructure(subtract(arrVar[s_ref - 1], arrVar[s_ref + 1]), s_ref - 1, s_ref + 1, arrVar)
                s_ref = getIdx("-", arrVar)
                print(arrVar)

            elif a_ref is not None and s_ref is not None and a_ref < s_ref:
                # add first
                arrVar = restructure(add(arrVar[a_ref - 1], arrVar[a_ref + 1]), a_ref - 1, a_ref + 1, arrVar)
                a_ref = getIdx("+", arrVar)
                print(arrVar)

                s_ref = getIdx("-", arrVar)
                arrVar = restructure(subtract(arrVar[s_ref - 1], arrVar[s_ref + 1]), s_ref - 1, s_ref + 1, arrVar)
                print(arrVar)

                a_ref = getIdx("+", arrVar)
                s_ref = getIdx("-", arrVar)

            elif s_ref is not None and a_ref is not None and s_ref < a_ref:
                # subtract first
                arrVar = restructure(subtract(arrVar[s_ref - 1], arrVar[s_ref + 1]), s_ref - 1, s_ref + 1, arrVar)
                s_ref = getIdx("-", arrVar)
                print(arrVar)

                a_ref = getIdx("+", arrVar)
                arrVar = restructure(add(arrVar[a_ref - 1], arrVar[a_ref + 1]), a_ref - 1, a_ref + 1, arrVar)
                print(arrVar)

                a_ref = getIdx("+", arrVar)
                s_ref = getIdx("-", arrVar)
    elif is_add == True:
        a_ref = getIdx("+", arrVar)
        while a_ref is not None:
            arrVar = restructure(add(arrVar[a_ref - 1], arrVar[a_ref + 1]), a_ref - 1, a_ref + 1, arrVar)
            a_ref = getIdx("+", arrVar)
            print(arrVar)
    elif is_sub == True:
        s_ref = getIdx("-", arrVar)
        while s_ref is not None:
            arrVar = restructure(subtract(arrVar[s_ref - 1], arrVar[s_ref + 1]), s_ref - 1, s_ref + 1, arrVar)
            s_ref = getIdx("-", arrVar)
            print(arrVar)
    
    return arrVar[0]

# Phase II Process START
def section(arr):
    arrVar = arr
    more_parens = True
    thresh = 0
    while more_parens and thresh < paren_limit:
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
            more_parens = False
            continue
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
            print(section)
            arrVar = restructure(calculate(section), start, end - 1, arrVar)

        print(arrVar)
    answer = calculate(arrVar)
    return answer

def distribute(arr):
    arrVar = arr
    isDist = True
    x = 0
    while isDist == True and x < paren_limit:
        # test for distribution
        x = x + 1
        for i in range(0, len(arrVar)):
            isDist = False
            if i != 0 and i != len(arrVar):
                # test for two pairs of conditions that indicate distribution
                if (arrVar[i] == "(" and arrVar[i - 1] == "*") or (arrVar[i] == ")" and i < len(arrVar) - 1 and arrVar[i + 1] == "*"):
                    isDist = True
                    break

        # run distribution process
        if isDist == True:
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
            print(section)

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
                        # solution.append(")")
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
                        # solution.append(")")
            print(solution)

            arrVar = restructure(solution, start, end, arrVar)
            print(arrVar)
    
    return arrVar
# Phase II Process END

# System Operations
def get_info():
    print("")
    print("System Operations")
    print("")

    for i in range(0, len(info["system_operations"])):
        print(info["system_operations"][i]["name"] + ": " + info["system_operations"][i]["about"])
        print("")
    
    print("")
    print("Program Entities")
    print("")

    for i in range(0, len(info["program_entities"])):
        print(info["program_entities"][i]["name"] + ": " + info["program_entities"][i]["syntax"])
        print("")

    print("")
    print("Key Functions")
    print("")

    for i in range(0, len(info["key_functions"])):
        print("Name: " + info["key_functions"][i]["name"])
        print("Syntax: " + info["key_functions"][i]["syntax"])
        print("About: " + info["key_functions"][i]["about"])
        print("")

def system_ops(arr):
    global system_operation

    ref = getIdx("info", arr)
    if ref is not None:
        system_operation = True
        get_info()

    return system_operation

def evaluate(str):
    print(str)
    structure = structure_string(str)
    system_ops(structure)
    global system_operation
    if system_operation == True:
        return ""
    else:
        identify_entities(structure)
        if is_brack == True and is_paren == True:
            structure = section(structure_sets(distribute(structure)))
        elif is_brack == True and is_paren == False:
            structure = calculate(structure_sets(structure))
        elif is_brack == False and is_paren == True:
            structure = section(distribute(structure))
        else:
            structure = calculate(structure)
        return structure

# problem = "info"
# problem = "sd[[sin(100+4*((-26)+1))],1]+0.5"
# problem = "cylinderv[[√(1/pi)],10]"
problem = "pi*2"
answer = evaluate(problem)
print(answer)