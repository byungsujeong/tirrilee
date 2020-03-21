from django.contrib import admin
from members.models import Members

# Register your models here.
# 어드민(관리자) 페이지 등록
admin.site.register(Members)