import math

keywords = ["asin", "acos", "atan", "sin", "cos", "tan"]

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
                if i == 0:
                    ref = {"first": i, "last": i + wordLen}
                else:
                    ref = {"first": i - 1, "last": i + wordLen}
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
    
    # structure for keywords
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

def operations(arr):
    arrVar = arr

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
    
    return arrVar

def solve(arr):
    arrVar = arr
    more_parens = True
    while more_parens:
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
                # solve section
                print(arr_sect)
                solution = operations(arr_sect)[0]
                # send to osme for restructing
                osme.append({"solution": solution, "start": parens[i]["index"] + 1, "end": parens[i + 1]["index"]})
        
        # print(osme)

        for i in range(0, len(osme)):
            start = osme[len(osme) - 1 - i]["start"] - 1
            end = osme[len(osme) - 1 - i]["end"] + 1
            arr_before = arrVar[0:start]
            arr_after = arrVar[end:len(arrVar)]
            arr_before.append(osme[len(osme) - 1 - i]["solution"])
            arrVar = arr_before + arr_after

        print(arrVar)

    answer = operations(arrVar)
    return answer[0]

def calculate(str):
    print(str)
    structured = structure_string(str)
    return solve(structured)

# problem = "1+(8*4/2)+4-(10+2^(2+1)+2)"
# problem = "cos(48)*(tan(1-1)+2-sin(0))/2"
problem = "sin90"
operations(structure_string(problem))
# answer = calculate(problem)
# print(answer)

# trigonomic functions
# print(math.sin(0))
# sn cs tn an as at
# print(math.cos(0))
# print(math.tan(0))
# print(math.asin(0))
# print(math.acos(0))
# print(math.atan(0))