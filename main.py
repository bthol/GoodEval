import math

def divide(*args):
    i = 1
    dividend = args[0]
    while i < len(args):
        dividend = dividend / args[i]
        i = i + 1
    print(dividend)

# divide(20, 2, 5)

def multiply(*args):
    i = 1
    val = args[0]
    while i < len(args):
        val = val * args[i]
        i = i + 1
    print(val)

# multiply(5, 5, 5)

def add(*args):
    i = 1
    sum = args[0]
    while i < len(args):
        sum = sum + args[i]
        i = i + 1
    print(sum)

# add(1, 2, 1)

def subtract(*args):
    i = 1
    difference = args[0]
    while i < len(args):
        difference = difference - args[i]
        i = i + 1
    print(difference)

# subtract(10, 3, 2)



def structure_string(str):
    arr = []
    digits = ""
    for i in range(0, len(str)):
        try:
            str[i] == "." or int(str[i])
        except:
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

def getVals(str, arr):
    vals = []
    for i in range(0, len(arr)):
        if arr[i] == str:
            vals.append(arr[i - 1])
            vals.append(arr[i + 1])
            vals.append(i)
            break
    return vals

def operations(arr):
    arrVar = arr

    # perform all exponentiations
    ref = getVals("^", arrVar)
    while len(ref) != 0:
        base = float(ref[0])
        if base / 1 % 1 == 0:
            base = int(base)

        power = float(ref[1])
        if power / 1 % 1 == 0:
            power = int(power)

        exponentiation = math.pow(base, power)

        before = arrVar[0:ref[2] - 1]
        after = []
        if ref[2] < len(arrVar) - 2:
            after = arrVar[ref[2] + 2: len(arrVar)]
            
        arrVar = before
        arrVar.append("%s" % exponentiation)
        arrVar = arrVar + after
        ref = getVals("^", arrVar)
        print(arrVar)

    # print(arrVar)

    # Perform all multiplications
    ref = getVals("*", arrVar)
    while len(ref) != 0:
        multiplicand = float(ref[0])
        if multiplicand / 1 % 1 == 0:
            multiplicand = int(multiplicand)

        multiplier = float(ref[1])
        if multiplier / 1 % 1 == 0:
            multiplier = int(multiplier)

        product = multiplicand * multiplier

        before = arrVar[0:ref[2] - 1]
        after = []
        if ref[2] < len(arrVar) - 2:
            after = arrVar[ref[2] + 2: len(arrVar)]

        arrVar = before
        arrVar.append("%s" % product)
        arrVar = arrVar + after
        ref = getVals("*", arrVar)
        print(arrVar)

    # print(arrVar)

    # Perform all divisions
    ref = getVals("/", arrVar)
    while len(ref) != 0:
        dividend = float(ref[0])
        if dividend / 1 % 1 == 0:
            dividend = int(dividend)

        divisor = float(ref[1])
        if divisor / 1 % 1 == 0:
            divisor = int(divisor)

        quotient = dividend / divisor

        before = arrVar[0:ref[2] - 1]
        after = []
        if ref[2] < len(arrVar) - 2:
            after = arrVar[ref[2] + 2: len(arrVar)]

        arrVar = before
        arrVar.append("%s" % quotient)
        arrVar = arrVar + after
        ref = getVals("/", arrVar)
        print(arrVar)
    
    # print(arrVar)
    
    # Perform all additions
    ref = getVals("+", arrVar)
    while len(ref) != 0:
        augend = float(ref[0])
        if augend / 1 % 1 == 0:
            augend = int(augend)

        addend = float(ref[1])
        if addend / 1 % 1 == 0:
            addend = int(addend)

        total = augend + addend

        before = arrVar[0:ref[2] - 1]
        after = []
        if ref[2] < len(arrVar) - 2:
            after = arrVar[ref[2] + 2: len(arrVar)]

        arrVar = before
        arrVar.append("%s" % total)
        arrVar = arrVar + after
        ref = getVals("+", arrVar)
        print(arrVar)
    
    # print(arrVar)
    
    # perform all subtractions
    ref = getVals("-", arrVar)
    while len(ref) != 0:
        minuend = float(ref[0])
        if minuend / 1 % 1 == 0:
            subtrahend = int(minuend)

        subtrahend = float(ref[1])
        if subtrahend / 1 % 1 == 0:
            subtrahend = int(subtrahend)

        difference = minuend - subtrahend

        before = arrVar[0:ref[2] - 1]
        after = []
        if ref[2] < len(arrVar) - 2:
            after = arrVar[ref[2] + 2: len(arrVar)]

        arrVar = before
        arrVar.append("%s" % difference)
        arrVar = arrVar + after
        ref = getVals("-", arrVar)
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

answer = calculate("2*(5*3^(1+45-44))+10")
print(answer)