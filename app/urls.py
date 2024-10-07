from django.contrib import admin
from django.urls import path
from . import views

# urlConf
urlpatterns = [
    path("", views.render_index, name="index"),
    path("", views.evaluate, name="eval"),
]