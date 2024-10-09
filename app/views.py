from django.shortcuts import render

from django.http import HttpResponse
from django.template import loader

from evaluator_file import *

# view functions handle requests and send responses
def render_index(request):
    return render(request, "index.html")

# handle requests as calculations
def evaluate(request):
    return render(request, "eval.html")
