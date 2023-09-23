import math

# limit over which while loops stop to prevent infinite loop
itr_limit = 100

# keywords listed from longest to shortest strings
keywords = ["asin", "acos", "atan", "sin", "cos", "tan"]

def restructure(solution, start, end, arr):
    structure = []
    if start != 0:
        structure = structure + arr[0:start]
    if solution != None:
        if isinstance(solution, list):
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
    thresh = 0
    while ref is not None and thresh < itr_limit:
        thresh = thresh + 1
        arrVar = restructure(word, ref["first"], ref["last"] - 1, arrVar)
        ref = getWord(word, arrVar)

    return arrVar

def structure_string(str):
    # structure values & characters
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
    for i in range(0, len(keywords)):
        arr = word_struct(keywords[i], arr)
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

def calculate(arr):
    arrVar = arr

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

    arrVar = keyFunctions(arrVar)

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

    arrVar = operations(arrVar)

    return arrVar[0]

def section(arr):
    arrVar = arr
    more_parens = True
    thresh = 0
    while more_parens and thresh < itr_limit:
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
                # distribution
                # if parens[i]["index"] - 1
                # send to osme for restructing
                osme.append({"section": arr_sect, "start": parens[i]["index"] + 1, "end": parens[i + 1]["index"]})
        
        # print(osme)

        for i in range(0, len(osme)):
            start = osme[len(osme) - 1 - i]["start"] - 1
            end = osme[len(osme) - 1 - i]["end"] + 1
            section = osme[len(osme) - 1 - i]["section"]
            print(section)

            if arrVar[start - 1] == "*":
                distVal = arrVar[start - 2]
                for i in range(0, len(section)):
                    if section[i] == "+" or  section[i] == "-" or section[i] == "*" or section[i] == "/":
                        # distribute across terms
                        section = restructure([section[i - 1], "*", distVal], i - 1, i - 1, section)
                        print(section)
                        section = restructure([section[i + 3], "*", distVal], i + 3, i + 3, section)
                        print(section)

            arrVar = restructure(calculate(section), start, end - 1, arrVar)

        print(arrVar)

    answer = calculate(arrVar)
    return answer

def evaluate(str):
    print(str)
    return section(structure_string(str))

# problem = "1+(8*4/2)+4-(10+2^(2+1)+2)"
# problem = "cos(48)*(tan(1-1)+2-sin(0))/2"
# problem = "sin(34.8+15.2-5-45)+2-cos(73.34*sin(0))"
# problem = "5*(4/2)"
# problem = "8/2*8/32"
# problem = "8-2+4-9"

problem = "100-50/2*3+25"
operations(structure_string(problem))
# answer = evaluate(problem)
# print(answer)