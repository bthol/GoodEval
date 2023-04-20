from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader

def render_root(req):
    return HttpResponse("root")
    # template = loader.get_template('../index.html')
    # return HttpResponse(template.render())

def say_hello(req):
    return HttpResponse("hello world")
