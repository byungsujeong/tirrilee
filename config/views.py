from django.shortcuts import render

def main(request):
    # runserver 시 main페이지 호출
    return render(request, 'main.html')