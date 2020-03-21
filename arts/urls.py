from django.urls import path
from arts import views

urlpatterns = [
    path('', views.arts),
]
