from django.urls import path
from . import views

# urlConf
urlpatterns = [
    path("", views.render_index, name="index"),
    path("calculator/", views.render_calculator, name="calc"),
    path("evaluator/", views.render_evaluator, name="eval"),
    path("operator/", views.render_operator, name="oper"),
]