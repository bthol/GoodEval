import math

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

    # print(arrVar)

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

    # # print(arrVar)

    # # Perform all divisions
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
    
    # # print(arrVar)
    
    # # Perform all additions
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
    
    # # print(arrVar)
    
    # # perform all subtractions
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
                arr_sect = arrVar[parens[i]["index"] + 1:parens[i + 1]["index"]]
                osme.append({"solution": operations(arr_sect)[0], "start": parens[i]["index"] + 1, "end": parens[i + 1]["index"]})
        
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
    return solve(structure_string(str))

# problem = "4+(8*4/2)-(10+2^(2+1)+2)"
problem = "(2)√(4)"
answer = calculate(problem)
print(answer)