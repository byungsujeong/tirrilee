from django.urls import path
from members import views

urlpatterns = [
    # members 메인페이지 요청 시 login 기능 수행
    path('', views.login),
    # members/signup 페이지 요청 시 signup 기능 수행
    path('signup', views.signup),
    # 이하 sign과 동일함. 각 기능은 views에 주석처리함.
    path('overlapCheck', views.overlapCheck),
    path('join', views.join),
    path('signin', views.signin),
    path('logout', views.logout),
    path('mypage', views.mypage),
    path('update', views.update),
]
