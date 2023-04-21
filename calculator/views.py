from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader

def render_index(request):
    return render(request, "index.html")

def by_id(request, id):
    return HttpResponse("id : %s" % id)

def urls_root(request):
    return HttpResponse("url root")
    # template = loader.get_template('../index.html')
    # return HttpResponse(template.render())
    # return render(request, 'index.html')

def say_hello(req):
    return HttpResponse("hello world")
