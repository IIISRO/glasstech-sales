from django.db import models
from django.contrib.auth.models import AbstractUser
from core.models import  AbstractModel
# Create your models here.

    
class User(AbstractUser):
    pp = models.ImageField(blank=True, upload_to='UsersPPs/')
    mobil = models.CharField(max_length=15,null=True,blank=True)


class StaffGroup(AbstractModel):
    name = models.CharField(max_length=20)