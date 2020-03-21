from django.db import models

# Create your models here.
# DB 모델 정의(어드민 페이지에서 비밀번호가 한번에 노출되는 것을 방지하기 위해 __str__ 함수에 pw는 제외)
class Members(models.Model):
    member_id =models.CharField(max_length=40)
    member_pw = models.CharField(max_length=40)
    member_name = models.CharField(max_length=20)
    member_email = models.CharField(max_length=50)
    member_type = models.CharField(max_length=10)

    def __str__(self):
        return self.member_id + ', ' + self.member_name + ', ' + self.member_email + ', ' + self.member_type