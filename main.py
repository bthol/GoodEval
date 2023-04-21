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

calc = "2*2+2*3/2-5"
calc_mult = "24+26-12*2/2"

def str_array(str):
    arr = []
    digits = ""
    for i in range(0, len(str)):
        try:
            int(str[i])
        except:
            arr.append(digits)
            digits = ""
            arr.append(str[i])
        else:
            digits = digits + "%s" % str[i]
        finally:
            if (i == len(str) - 1):
                arr.append(digits)
    return arr

# str_array(calc_mult)

def calculate(str):
    arr = str_array(str)
    print(arr)

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
    print(m)

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
    print(d)
    
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
    print(a)
    
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
    print(s)

calculate(calc_mult)