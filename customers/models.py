from django.db import models
from core.models import AbstractModel

# Create your models here.

class Customer(AbstractModel):
    REFERENCES = [
        ('Biz tapmışıq', "Biz tapmışıq"),
        ('Instagram', "Instagram"),
        ('Facebook', "Facebook"),
        ('Linkedin', 'Linkedin'),
        ('WEB', 'WEB'),
        ('Eşitmə', 'Eşitmə')

    ]
    C_TYPES  = [
        ('Müştəri', 'Müştəri'),
        ('Partnyor', 'Partnyor')
    ]
    C_CATEGORIES  = [
        ('A1', 'A1'),
        ('A2', 'A2'),
        ('B1', 'B1'),
        ('B2', 'B2'),
        ('C1', 'C1'),
        ('C2', 'C2')
    ]
    POTENCY_LEVELS = [
        ('PİS', 'PİS'),
        ('ORTA', 'ORTA'),
        ('YAXŞI', 'YAXŞI')
    ]
    name = models.CharField(null=False, blank=False, max_length=15)
    surname = models.CharField(null=False, blank=False, max_length=15)
    company_name = models.CharField(null=True, blank=True, max_length=30)
    email = models.EmailField(null=True, blank=True)
    phone = models.CharField(null=True, blank=True, max_length=20)
    mobile = models.CharField(null=False, blank=False, max_length=20)
    web = models.CharField(null=True, blank=True, max_length=30)
    bio = models.CharField(null=True, blank=True, max_length=70)
    reference = models.CharField(choices=REFERENCES, null=False, blank=False, max_length=15)
    c_type =  models.CharField('customer type', choices=C_TYPES, null=False, blank=False, max_length=10)
    c_category = models.CharField('custimer category', choices=C_CATEGORIES, null=False, blank=False, max_length=10)
    potency = models.CharField(choices=POTENCY_LEVELS, null=True, blank=True, max_length=6)
    pp = models.ImageField(blank=True, upload_to='CustomersPPs/')
    
    def __str__(self):
        return f'{self.name} {self.surname}({self.c_category})'
    
    def get_full_name(self):
        return f'{self.name} {self.surname}'
    
    def date(self):           
        return self.created_at.strftime('%d.%m.%Y')
