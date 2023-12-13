import math

# parameters
# the paren_limit parameter controls the maximum number of levels of parenthesis nesting
paren_limit = 100

info = {
    "system_operations": [
        {"name": "info", "about": "Prints program information."},
    ],
    "key_functions": [
        {"name":"asin", "syntax": "asin(x)", "about": "Gets arc sine of x, where x is a value or an expression that evaluates out to a value."},
        {"name": "acos", "syntax": "acos(x)", "about": "Gets arc cosine of x, where x is a value or an expression that evaluates out to a value."},
        {"name": "atan", "syntax": "atan(x)", "about": "Gets arc tangent of x, where x is a value or an expression that evaluates out to a value."},
        {"name": "sin", "syntax": "sin(x)", "about": "Gets sine of x, where x is a value or an expression that evaluates out to a value."},
        {"name": "cos", "syntax": "cos(x)", "about": "Gets cosine of x, where x is a value or an expression that evaluates out to a value."},
        {"name":"tan", "syntax": "tan(x)", "about": "Gets tangent of x, where x is a value or an expression that evaluates out to a value."},
        {"name":"sd", "syntax": "sd[a,b]", "about": "Gets the standard deviation of the set of values within square brackets, where that set has at least two comma demarcated values. Please, no spaces between values and no subsets."},
        {"name":"mean", "syntax": "mean[a,b]", "about": "Gets the mean of the the set of values within square brackets, where that set has at least two comma demarcated values. Please, no spaces between values and no subsets."},
        {"name":"lcm", "syntax": "lcm[a,b]", "about": "Gets the least common multiple of two values within square brackets. Please, no spaces between values and no subsets."},
    ],
}

def restructure(solution, start, end, arr):
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

def getWord(word, arr):
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
    arrVar = arr
    ref = getWord(word, arrVar)
    while ref is not None:
        arrVar = restructure(word, ref["first"], ref["last"] - 1, arrVar)
        ref = getWord(word, arrVar)
    return arrVar

def structure_string(str):
    # structure values & operations & characters
    arr = []
    digits = ""
    for i in range(0, len(str)):
        try:
            str[i] == "." or int(str[i])
        except:
            # handle negatives
            if str[i - 1] == "(" and str[i] == "-":
                digits = digits + "%s" % str[i]
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
    print(arr)

    # structure keywords
    for i in range(0, len(info["system_operations"])):
        arr = word_struct(info["system_operations"][i]["name"], arr)

    for i in range(0, len(info["key_functions"])):
        arr = word_struct(info["key_functions"][i]["name"], arr)
    print(arr)

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

def getIdx(str, arr):
    val = None
    for i in range(0, len(arr)):
        if arr[i] == str:
            val = i
            break
    return val

def keyFunctions(arr):
    arrVar = arr

    # perform all sine functions
    ref = getIdx("sin", arrVar)
    while ref is not None:
        x = float(arrVar[ref + 1])
        if x / 1 % 1 == 0:
            x = int(x)
        
        y = math.sin(x)

        before = arrVar[0:ref]
        after = []
        if ref < len(arrVar) - 2:
            after = arrVar[ref + 2: len(arrVar)]
        arrVar = before
        arrVar.append("%s" % y)
        arrVar = arrVar + after
        ref = getIdx("sin", arrVar)
        print(arrVar)

    # perform all cosine functions
    ref = getIdx("cos", arrVar)
    while ref is not None:
        x = float(arrVar[ref + 1])
        if x / 1 % 1 == 0:
            x = int(x)
        
        y = math.cos(x)

        before = arrVar[0:ref]
        after = []
        if ref < len(arrVar) - 2:
            after = arrVar[ref + 2: len(arrVar)]
        arrVar = before
        arrVar.append("%s" % y)
        arrVar = arrVar + after
        ref = getIdx("cos", arrVar)
        print(arrVar)

    # perform all tangent functions
    ref = getIdx("tan", arrVar)
    while ref is not None:
        x = float(arrVar[ref + 1])
        if x / 1 % 1 == 0:
            x = int(x)
        
        y = math.tan(x)

        before = arrVar[0:ref]
        after = []
        if ref < len(arrVar) - 2:
            after = arrVar[ref + 2: len(arrVar)]
        arrVar = before
        arrVar.append("%s" % y)
        arrVar = arrVar + after
        ref = getIdx("tan", arrVar)
        print(arrVar)
    
    # perform all arc sine functions
    ref = getIdx("asin", arrVar)
    while ref is not None:
        x = float(arrVar[ref + 1])
        if x / 1 % 1 == 0:
            x = int(x)
        
        y = math.asin(x)

        before = arrVar[0:ref]
        after = []
        if ref < len(arrVar) - 2:
            after = arrVar[ref + 2: len(arrVar)]
        arrVar = before
        arrVar.append("%s" % y)
        arrVar = arrVar + after
        ref = getIdx("asin", arrVar)
        print(arrVar)

    # perform all arc cosine functions
    ref = getIdx("acos", arrVar)
    while ref is not None:
        x = float(arrVar[ref + 1])
        if x / 1 % 1 == 0:
            x = int(x)
        
        y = math.acos(x)

        before = arrVar[0:ref]
        after = []
        if ref < len(arrVar) - 2:
            after = arrVar[ref + 2: len(arrVar)]
        arrVar = before
        arrVar.append("%s" % y)
        arrVar = arrVar + after
        ref = getIdx("acos", arrVar)
        print(arrVar)

    # perform all arc tangent functions
    ref = getIdx("atan", arrVar)
    while ref is not None:
        x = float(arrVar[ref + 1])
        if x / 1 % 1 == 0:
            x = int(x)
        
        y = math.atan(x)

        before = arrVar[0:ref]
        after = []
        if ref < len(arrVar) - 2:
            after = arrVar[ref + 2: len(arrVar)]
        arrVar = before
        arrVar.append("%s" % y)
        arrVar = arrVar + after
        ref = getIdx("atan", arrVar)
        print(arrVar)
    
    # perform all Standard Deviation functions
    ref = getIdx("sd", arrVar)
    while ref is not None:
        # get string string set
        set_1 = arrVar[ref + 1]
        print(set_1)

        # convert string set to numeral set
        set_2 = []
        for i in set_1:
            x = float(i)
            if x / 1 % 1 == 0:
                x = int(x)
            set_2.append(x)

        # perform calculation using numeral set
        mean = sum(set_2) / len(set_2)
        set_3 = []
        for i in set_2:
            set_3.append(math.pow(i - mean, 2))
        sd = math.pow(sum(set_3)/len(set_3), 1/2)

        before = arrVar[0:ref]
        after = []
        if ref < len(arrVar) - 2:
            after = arrVar[ref + 2: len(arrVar)]
        arrVar = before
        arrVar.append("%s" % sd)
        arrVar = arrVar + after
        ref = getIdx("sd", arrVar)
        print(arrVar)
    
    # perform all Mean functions
    ref = getIdx("mean", arrVar)
    while ref is not None:
        # get string string set
        set_1 = arrVar[ref + 1]
        print(set_1)

        # convert string set to numeral set
        set_2 = []
        for i in set_1:
            x = float(i)
            if x / 1 % 1 == 0:
                x = int(x)
            set_2.append(x)

        # perform calculation using numeral set
        mean = sum(set_2) / len(set_2)

        before = arrVar[0:ref]
        after = []
        if ref < len(arrVar) - 2:
            after = arrVar[ref + 2: len(arrVar)]
        arrVar = before
        arrVar.append("%s" % mean)
        arrVar = arrVar + after
        ref = getIdx("mean", arrVar)
        print(arrVar)
    
    # perform all Least Common Multiple functions
    ref = getIdx("lcm", arrVar)
    while ref is not None:
        # get string string set
        set_1 = arrVar[ref + 1]
        print(set_1)

        # convert string set to numeral set
        set_2 = []
        for i in set_1:
            x = float(i)
            if x / 1 % 1 == 0:
                x = int(x)
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

        before = arrVar[0:ref]
        after = []
        if ref < len(arrVar) - 2:
            after = arrVar[ref + 2: len(arrVar)]
        arrVar = before
        arrVar.append("%s" % lcm)
        arrVar = arrVar + after
        ref = getIdx("lcm", arrVar)
        print(arrVar)

    return arrVar

def operations(arr):
    arrVar = arr
    # perform all Multiplications and Divisions as they apear from left to right
    m_ref = getIdx("*", arrVar)
    d_ref = getIdx("/", arrVar)
    while m_ref is not None or d_ref is not None:
        if d_ref is None and m_ref is not None or m_ref is not None and d_ref is not None and m_ref < d_ref:
            multiplicand = float(arrVar[m_ref - 1])
            if multiplicand / 1 % 1 == 0:
                multiplicand = int(multiplicand)

            multiplier = float(arrVar[m_ref + 1])
            if multiplier / 1 % 1 == 0:
                multiplier = int(multiplier)

            product = multiplicand * multiplier
            arrVar = restructure(product, m_ref - 1, m_ref + 1, arrVar)
            m_ref = getIdx("*", arrVar)
            d_ref = getIdx("/", arrVar)
            print(arrVar)
        elif m_ref is None and d_ref is not None or d_ref is not None and m_ref is not None and d_ref < m_ref:
            dividend = float(arrVar[d_ref - 1])
            if dividend / 1 % 1 == 0:
                dividend = int(dividend)

            divisor = float(arrVar[d_ref + 1])
            if divisor / 1 % 1 == 0:
                divisor = int(divisor)

            quotient = dividend / divisor
            arrVar = restructure(quotient, d_ref - 1, d_ref + 1, arrVar)
            m_ref = getIdx("*", arrVar)
            d_ref = getIdx("/", arrVar)
            print(arrVar)
    
    # perform all Additions and Subtractions as they apear from left to right
    a_ref = getIdx("+", arrVar)
    s_ref = getIdx("-", arrVar)
    while a_ref is not None or s_ref is not None:
        if s_ref is None and a_ref is not None or a_ref is not None and s_ref is not None and a_ref < s_ref:
            augend = float(arrVar[a_ref - 1])
            if augend / 1 % 1 == 0:
                augend = int(augend)

            addend = float(arrVar[a_ref + 1])
            if addend / 1 % 1 == 0:
                addend = int(addend)

            total = augend + addend
            arrVar = restructure(total, a_ref - 1, a_ref + 1, arrVar)
            a_ref = getIdx("+", arrVar)
            s_ref = getIdx("-", arrVar)
            print(arrVar)
        elif a_ref is None and s_ref is not None or s_ref is not None and a_ref is not None and s_ref < a_ref:
            minuend = float(arrVar[s_ref - 1])
            if minuend / 1 % 1 == 0:
                minuend = int(minuend)

            subtrahend = float(arrVar[s_ref + 1])
            if subtrahend / 1 % 1 == 0:
                subtrahend = int(subtrahend)

            difference = minuend - subtrahend
            arrVar = restructure(difference, s_ref - 1, s_ref + 1, arrVar)
            a_ref = getIdx("+", arrVar)
            s_ref = getIdx("-", arrVar)
            print(arrVar)
    return arrVar

def calculate(arr):
    arrVar = arr

    # perform all key functions
    arrVar = keyFunctions(arrVar)

    # perform all exponentiations
    ref = getIdx("^", arrVar)
    while ref is not None:
        base = float(arrVar[ref - 1])
        if base / 1 % 1 == 0:
            base = int(base)

        exponent = float(arrVar[ref + 1])
        if exponent / 1 % 1 == 0:
            exponent = int(exponent)

        power = math.pow(base, exponent)

        before = arrVar[0:ref - 1]
        after = []
        if ref < len(arrVar) - 2:
            after = arrVar[ref + 2: len(arrVar)]
        arrVar = before
        arrVar.append("%s" % power)
        arrVar = arrVar + after
        ref = getIdx("^", arrVar)
        print(arrVar)

    # Perform all roots
    ref = getIdx("√", arrVar)
    while ref is not None:
        degree = float(arrVar[ref - 1])
        if degree / 1 % 1 == 0:
            degree = int(degree)

        radicand = float(arrVar[ref + 1])
        if radicand / 1 % 1 == 0:
            radicand = int(radicand)

        root = math.pow(radicand, 1/degree)

        before = arrVar[0:ref - 1]
        after = []
        if ref < len(arrVar) - 2:
            after = arrVar[ref + 2: len(arrVar)]
        arrVar = before
        arrVar.append("%s" % root)
        arrVar = arrVar + after
        ref = getIdx("√", arrVar)
        print(arrVar)
    
    # perform arithmetic operations in operator precedence
    arrVar = operations(arrVar)

    return arrVar[0]

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
        x = x + 1
        # test for distribution
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

def system_ops(arr):
    system_operation = False

    ref = getIdx("info", arr)
    if ref is not None:
        system_operation = True
        print("")
        print("System Operations")
        print("")

        for i in range(0, len(info["system_operations"])):
            print(info["system_operations"][i]["name"] + ": " + info["system_operations"][i]["about"])
            print("")
        print("")
        print("Key Functions")
        print("")

        for i in range(0, len(info["key_functions"])):
            print("Name: " + info["key_functions"][i]["name"])
            print("Syntax: " + info["key_functions"][i]["syntax"])
            print("About: " + info["key_functions"][i]["about"])
            print("")

    return system_operation

def evaluate(str):
    print(str)
    structure = structure_string(str)
    system_operation = system_ops(structure)
    if system_operation == True:
        return ""
    else:
        return section(distribute(structure))

# problem = "info"
# problem = "sd[0,1]+sd[0,1]"

problem = "lcm[2,3]"

# problem = "sd[0,sd[0,1]+sd[0,1]]"
# sd[0,sd[0,1]+sd[0,1]] = sd[0, 1] = 1
# ["sd", "[", "0", ",", "sd", "[", "0", "1", "]", "+", "sd", "[", "0", "1", "]", "]"]
# [[*][]]
# [[*]]
# [*]
# ["sd", ["0", "sd", ["0", "1"], "+", "sd", ["0", "1"]]]

# NO SUBSETS

# add the following key functions
# Least common multiple
# weighted mean
# prime factorization
# Greatest common factor

answer = evaluate(problem)
print(answer)