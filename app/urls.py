from django.urls import path
from . import views

# urlConf
urlpatterns = [
    path("", views.render_index, name="index"),
    path("eval/", views.evaluate, name="eval"),
]