
def divide(*args):
  i = 1
  dividend = args[0]
  while i < len(args):
    dividend = dividend / args[i]
    i = i + 1
  print(dividend)
  
divide(20, 2, 5)

def multiply(*args):
  i = 1
  val = args[0]
  while i < len(args):
    val = val * args[i]
    i = i + 1
  print(val)

multiply(5, 5, 5)

def add(*args):
  i = 1
  sum = args[0]
  while i < len(args):
    sum = sum + args[i]
    i = i + 1
  print(sum)

add(1, 2, 1)

def subtract(*args):
  i = 1
  difference = args[0]
  while i < len(args):
    difference = difference - args[i]
    i = i + 1
  print(difference)

subtract(10, 3, 2)

