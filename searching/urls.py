from django.urls import path
from searching import views

urlpatterns = [
    path('', views.searching),
]
