from django.shortcuts import render

# from django.http import HttpResponse
# from django.template import loader
# from django.core.management import call_command

# view functions handle requests and send responses

# Landing Page
def render_index(request):
    return render(request, "index.html")

# The GoodEval Calculator (default)
def render_calculator(request):
    return render(request, "calculator.html")

# The GoodEval Evaluator
def render_evaluator(request):
    return render(request, "evaluator.html")
