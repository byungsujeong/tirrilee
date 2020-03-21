from django.shortcuts import render

# Create your views here.
def searching(request):
    return render(request, "searching.html")