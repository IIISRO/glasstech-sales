from django.db import models
from  core.models import AbstractModel
# Create your models here.

class Product(AbstractModel):
    CATEGORIES = [
        ('məhsul','məhsul'),
        ('sistem', 'sistem'),
    ]
    name =  models.CharField(max_length=100, null=False, blank=False)
    unit =  models.CharField(null=False, blank=False, max_length=50)
    category =  models.CharField(choices=CATEGORIES, null=False, blank=False, max_length=7)

    def __str__(self):
        return f'{self.name}({self.category})'