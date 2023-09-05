import math

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
    while ref is not None:
        before = arrVar[0:ref["first"]]
        after = arrVar[ref["last"]: len(arrVar)]
        arrVar = before
        arrVar.append(word)
        arrVar = arrVar + after
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

def specialFunctions(arr):
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

    arrVar = specialFunctions(arrVar)

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

    arrVar = specialFunctions(arrVar)

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

    arrVar = specialFunctions(arrVar)

    # Perform all multiplications
    ref = getIdx("*", arrVar)
    while ref is not None:
        multiplicand = float(arrVar[ref - 1])
        if multiplicand / 1 % 1 == 0:
            multiplicand = int(multiplicand)

        multiplier = float(arrVar[ref + 1])
        if multiplier / 1 % 1 == 0:
            multiplier = int(multiplier)

        product = multiplicand * multiplier

        before = arrVar[0:ref - 1]
        after = []
        if ref < len(arrVar) - 2:
            after = arrVar[ref + 2: len(arrVar)]
        arrVar = before
        arrVar.append("%s" % product)
        arrVar = arrVar + after
        ref = getIdx("*", arrVar)
        print(arrVar)

    arrVar = specialFunctions(arrVar)

    # Perform all divisions
    ref = getIdx("/", arrVar)
    while ref is not None:
        dividend = float(arrVar[ref - 1])
        if dividend / 1 % 1 == 0:
            dividend = int(dividend)

        divisor = float(arrVar[ref + 1])
        if divisor / 1 % 1 == 0:
            divisor = int(divisor)

        quotient = dividend / divisor

        before = arrVar[0:ref - 1]
        after = []
        if ref < len(arrVar) - 2:
            after = arrVar[ref + 2: len(arrVar)]
        arrVar = before
        arrVar.append("%s" % quotient)
        arrVar = arrVar + after
        ref = getIdx("/", arrVar)
        print(arrVar)
    
    arrVar = specialFunctions(arrVar)

    # Perform all additions
    ref = getIdx("+", arrVar)
    while ref is not None:
        augend = float(arrVar[ref - 1])
        if augend / 1 % 1 == 0:
            augend = int(augend)

        addend = float(arrVar[ref + 1])
        if addend / 1 % 1 == 0:
            addend = int(addend)

        total = augend + addend

        before = arrVar[0:ref - 1]
        after = []
        if ref < len(arrVar) - 2:
            after = arrVar[ref + 2: len(arrVar)]
        arrVar = before
        arrVar.append("%s" % total)
        arrVar = arrVar + after
        ref = getIdx("+", arrVar)
        print(arrVar)
    
    arrVar = specialFunctions(arrVar)

    # perform all subtractions
    ref = getIdx("-", arrVar)
    while ref is not None:
        minuend = float(arrVar[ref - 1])
        if minuend / 1 % 1 == 0:
            minuend = int(minuend)

        subtrahend = float(arrVar[ref + 1])
        if subtrahend / 1 % 1 == 0:
            subtrahend = int(subtrahend)

        difference = minuend - subtrahend

        before = arrVar[0:ref - 1]
        after = []
        if ref < len(arrVar) - 2:
            after = arrVar[ref + 2: len(arrVar)]
        arrVar = before
        arrVar.append("%s" % difference)
        arrVar = arrVar + after
        ref = getIdx("-", arrVar)
        print(arrVar)

    arrVar = specialFunctions(arrVar)

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
    
    arrVar = specialFunctions(arrVar)

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
    
    arrVar = specialFunctions(arrVar)

    return arrVar[0]

def section(arr):
    arrVar = arr
    more_parens = True
    thresh = 0
    while more_parens and thresh < 100:
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

            if arrVar[start - 1] == "*":
                distVal = arrVar[start - 2]
                for i in range(0, len(section)):
                    if section[i] == "/":
                        # distribute across terms
                        section = restructure([section[i - 1], "*", distVal], i - 1, i - 1, section)
                        print(section)
                        section = restructure([section[i + 3], "*", distVal], i + 3, i + 3, section)
                        print(section)

            arrVar = restructure(operations(section), start, end, arrVar)
        arrVar = restructure(None, 0, 1, arrVar)
        print(arrVar)

    answer = operations(arrVar)
    return answer

def calculate(str):
    print(str)
    return section(structure_string(str))

# problem = "1+(8*4/2)+4-(10+2^(2+1)+2)"
# problem = "cos(48)*(tan(1-1)+2-sin(0))/2"
# problem = "sin(34.8+15.2-5-45)+2-cos(73.34*sin(0))"

problem = "5*(4/2)"
# problem = "(5*4/5*2)"

answer = calculate(problem)
print(answer)
