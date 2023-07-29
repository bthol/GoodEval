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

# calc = "5+8-10"
# calc = "(5-(5-3))+(5+(10-8))-(251-249)"
# calc = "10^(1+1)-(2^(3)*10+20)"
# calc = "10^(1+(5-4))*8"
calc = "2*5*3*2"

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
    # perform all exponentiations
    # e = []
    # place = -1
    # for i in range(0, len(arr)):
    #     if (i == place):
    #         continue
    #     if arr[i] == "^":
    #         e = e[:-1]

    #         base = float(arr[i - 1])
    #         if base / 1 % 1 == 0:
    #             base = int(base)

    #         power = float(arr[i + 1])
    #         if power / 1 % 1 == 0:
    #             power = int(power)

    #         exponentiation = math.pow(base, power)

    #         e.append("%s" % exponentiation)
    #     else:
    #         e.append(arr[i])
    # print(e)

    # Perform all multiplications
    arrVar = arr
    print(arrVar)

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
        print(arrVar)
        ref = getVals("*", arrVar)
    return arrVar
    # print(m)

    # Perform all divisions
    # d = []
    # place = -1
    # for i in range(0, len(e)):
    #     if (i == place):
    #         continue
    #     if e[i] == "/":
    #         d = d[:-1]

    #         dividend = float(e[i - 1])
    #         if dividend / 1 % 1 == 0:
    #             dividend = int(dividend)

    #         divisor = float(e[i + 1])
    #         if divisor / 1 % 1 == 0:
    #             divisor = int(divisor)
            
    #         quotient = dividend / divisor

    #         d.append("%s" % quotient)

    #         place = i + 1
    #     else:
    #         d.append(m[i])
    # print(d)
    
    # Perform all additions 
    # a = []
    # place = -1
    # for i in range(0, len(d)):
    #     if (i == place):
    #         continue
    #     if d[i] == "+":
    #         a = a[:-1]

    #         augend = float(m[i - 1])
    #         if augend / 1 % 1 == 0:
    #             augend = int(augend)

    #         addend = float(m[i + 1])
    #         if addend / 1 % 1 == 0:
    #             addend = int(addend)
            
    #         total = augend + addend

    #         a.append("%s" % total)

    #         place = i + 1
    #     else:
    #         a.append(d[i])
    # print(a)
    
    # perform all subtractions
    # s = []
    # place = -1
    # for i in range(0, len(a)):
    #     if (i == place):
    #         continue
    #     if a[i] == "-":
    #         s = s[:-1]
            
    #         minuend = float(m[i - 1])
    #         if minuend / 1 % 1 == 0:
    #             minuend = int(minuend)

    #         subtrahend = float(m[i + 1])
    #         if subtrahend / 1 % 1 == 0:
    #             subtrahend = int(subtrahend)
            
    #         difference = minuend - subtrahend

    #         s.append("%s" % difference)
    #         place = i + 1
    #     else:
    #         s.append(a[i])
    # print(s)
    # return s

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

        # print(arrVar)    
    print(operations(arrVar)[0])

def calculate(str):
    print(str)
    arr = structure_string(str)
    solve(arr)

calculate(calc)