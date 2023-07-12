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

"3*(100-5*(2+8)-18)"
calc = "(5-(5-3))+(5+2)-(251-249)"
# calc = "(5-2)+7-1"

def structure_string(str):
    arr = []
    digits = ""
    for i in range(0, len(str)):
        try:
            int(str[i])
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

def operations(arr):
    # Perform all multiplications
    m = []
    place = -1
    for i in range(0, len(arr)):
        if (i == place):
            continue
        if arr[i] == "*":
            m = m[:-1]
            val = int(arr[i - 1]) * int(arr[i + 1])
            m.append("%s" % val)
            place = i + 1
        else:
            m.append(arr[i])
    # print(m)

    # Perform all divisions
    d = []
    place = -1
    for i in range(0, len(m)):
        if (i == place):
            continue
        if m[i] == "/":
            d = d[:-1]
            val = int(int(m[i - 1]) / int(m[i + 1]))
            d.append("%s" % val)
            place = i + 1
        else:
            d.append(m[i])
    # print(d)
    
    # Perform all additions 
    a = []
    place = -1
    for i in range(0, len(d)):
        if (i == place):
            continue
        if d[i] == "+":
            a = a[:-1]
            val = int(d[i - 1]) + int(d[i + 1])
            a.append("%s" % val)
            place = i + 1
        else:
            a.append(d[i])
    # print(a)
    
    # perform all subtractions
    s = []
    place = -1
    for i in range(0, len(a)):
        if (i == place):
            continue
        if a[i] == "-":
            s = s[:-1]
            val = int(a[i - 1]) - int(a[i + 1])
            s.append("%s" % val)
            place = i + 1
        else:
            s.append(a[i])
    # print(s)
    return s

def solve(arr):
    parens = []
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
        osme = []
        for i in range(0, len(parens)):
            if parens[i]["char"] == "(" and parens[i + 1]["char"] == ")":
                arr_sect = arrVar[parens[i]["index"] + 1:parens[i + 1]["index"]]
                osme.append({"solution": operations(arr_sect)[0], "idx_start": parens[i]["index"] + 1, "idx_end": parens[i + 1]["index"]})
       
        # figure out how to use osme idx info to build new array accounting for solutions in every iteration
        # then assign that to arrVar
        for i in range(0, len(osme)):
            arr_before = arrVar[0:osme[len(osme) - 1 - i]["idx_start"] - 1]
            arr_after = arrVar[osme[len(osme) - 1 - i]["idx_end"] + 1:len(arrVar)]
            arr_before.append(osme[len(osme) - 1 - i]["solution"])
            arrVar = arr_before + arr_after
        print(arrVar)

def calculate(str):
    arr = structure_string(str)
    print(arr)
    solve(arr)

calculate(calc)