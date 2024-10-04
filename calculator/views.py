from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader

from evaluator_file import *

# view functions handle requests and send responses 
def render_index(request):
    return render(request, "index.html")

# use handle requests as calculations
evaluator({"problem": "10+8*(9-2*(10/5))+sin(0)", "use_logs": False})