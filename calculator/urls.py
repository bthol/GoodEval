from django.contrib import admin
from django.urls import path
from . import views

# URL Configuration
urlpatterns = [
    path("~/", views.render_root),
    path("hello/", views.say_hello),
]