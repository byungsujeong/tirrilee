from django.http import HttpResponse
from django.shortcuts import render, redirect
from members.models import Members

# Create your views here.
# 로그인 화면 이동 정의
def login(request):
    return render(request, 'login.html')

# 회원가입 화면 이동 정의
def signup(request):
    return render(request, 'signup.html')

# id 중복확인 정의
def overlapCheck(request):
    # ajax로 넘긴 데이터 get
    data = request.GET
    m = Members.objects.filter(member_id=data['member_id'])
    try:
        if m[0].member_id == data['member_id']:
            data=1
    # 아이디가 없어서 오류가 발생하면 data는 0
    except:
        data=0
    # data를 ajax success result값으로 받기 위해 HttpResponse로 data 반환
    return HttpResponse(data)

def join(request):
    # ajax로 넘긴 데이터 post
    data = request.POST

    # DB insert 작업
    m = Members(member_id=data['member_id'], member_pw=data['member_pw'], member_name=data['member_name'],
                member_email=data['member_email'], member_type=data['member_type'])
    m.save()

    # ajax통신에서 result 반환 받아 기능 처리하기 위함.
    data=1
    return HttpResponse(data)

# 로그인처리 정의
def signin(request):
    data = request.POST
    # 로그인 요청 시 넘어오는 id를 조건으로 데이터 가져오기
    session = Members.objects.filter(member_id=data['member_id'])
    # flag default 0으로 지정
    flag = 0

    # 가져온 데이터 인덱스 0값을 가져왔을 때 오류가 발생하면 아이디가 없는 것(try-except)
    try:
        # 가져온 데이터의 pw와 입력한 pw가 일치한경우 아이디를 세션에 등록하여 로그인 처리
        if session[0].member_pw == data['member_pw']:
            request.session['member_id'] = data['member_id']
            return redirect('/')
        # pw가 다른경우 flag2를 넘겨 pw가 틀리다는 alert 발생
        else:
            flag = 2
            dic_flag = {'flag': flag}
            return render(request, 'login.html', dic_flag)
    # id데이터가 없는 경우
    except:
        # flag1을 넘겨 없는 id가 없다는 alert 발생
        flag = 1
        dic_flag = {'flag': flag}
        return render(request, 'login.html', dic_flag)

# 로그아웃 정의
def logout(request):
    # 세션에 등록된 id값을 삭제
    del request.session['member_id']
    return redirect('/')

# 마이페이지 이동 정의
def mypage(request):
    # 세션 id를 통해 해당 레코드 select
    member_id = request.session.get('member_id')
    m = Members.objects.filter(member_id=member_id)[0]
    # template에서 보여지는 email형식을 위해 @ 기준으로 스플릿
    member_email1 = m.member_email.split('@')[0]
    member_email2 = m.member_email.split('@')[1]
    # 데이터를 딕셔너리 형태로 변환하여 넘김
    data = {'dto': m, 'member_email1': member_email1, 'member_email2': member_email2}
    return render(request, 'mypage.html', data)

# 업데이트 처리 정의
def update(request):
    # ajax로 넘김 데이터 post
    data = request.POST
    # update 진행
    Members.objects.filter(member_id=data['member_id']).update(member_pw=data['member_pw'],member_name=data['member_name'], member_email=data['member_email'], member_type=data['member_type'])
    # ajax통신에서 success result 값으로 기능 수행하기 위한 데이터
    data = 1
    return HttpResponse(data)
