from django.shortcuts import render

# Create your views here.
def arts(request):
    return render(request, "arts.html")