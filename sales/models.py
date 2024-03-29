from typing import Any
from django.db import models
from core.models  import  AbstractModel
from customers.models  import Customer
from products.models  import Product
from accounts.models import User
from ckeditor_uploader.fields import RichTextUploadingField
# Create your models here.

class Offer(AbstractModel):
    STATUSES  = [
        ('Aktiv', 'Aktiv'),
        ('Uğurlu', 'Uğurlu'),
        ('Uğursuz', 'Uğursuz')
    ]
    POTENCY_LEVELS = [
        ('PİS', 'PİS'),
        ('ORTA', 'ORTA'),
        ('YAXŞI', 'YAXŞI')
    ]
    customer = models.ForeignKey(Customer, on_delete=models.PROTECT, related_name='customer_offers')
    number =  models.CharField(max_length=50, blank=True, null=True)
    status =  models.CharField(choices=STATUSES, null=True, blank=True, max_length=8, default='Aktiv')
    status_change_reason = models.TextField(blank=True, null=True)
    potency = models.CharField(choices=POTENCY_LEVELS, null=True, blank=True, max_length=6)

    def __str__(self):
        return f'Təklif {self.number}' or "Offer"
    def date(self):
        return self.created_at.strftime('%d.%m.%Y')
    
class OfferRevision(AbstractModel):
    offer = models.ForeignKey(Offer, on_delete=models.CASCADE, related_name='offer_revisions')
    offer_creator = models.ForeignKey(User, on_delete=models.PROTECT,  related_name='user_created_offers')
    offer_approver = models.ForeignKey(User, on_delete=models.PROTECT,  related_name='user_approved_offers')
    number =  models.CharField('number', max_length=3, default='001')
    note = RichTextUploadingField(blank=True, null=True)
    pay_delv_cond = RichTextUploadingField(blank=True, null=True)
    delv_time = models.CharField('delivery time', max_length=30)
    is_active = models.BooleanField(default=True)
    
    def __str__(self):
        return f'{self.offer}-REV{self.number}'
   
    def date(self):
        return self.created_at.strftime('%d.%m.%Y')
    


class OfferRevisionPackage(AbstractModel):
    revision = models.ForeignKey(OfferRevision, on_delete=models.CASCADE, related_name='revision_packages')
    tax = models.PositiveIntegerField(blank=True, null=True)
    discount = models.PositiveIntegerField(blank=True, null=True)
    delv = models.PositiveIntegerField(blank=True, null=True)
    

    def __str__(self):
        return f'{self.revision}-package'
    
    def get_price(self):
        total_price = sum(service.price*service.quantity for service in self.package_services.all())
        if self.delv:
            total_price += self.delv
        if self.discount:
            total_price -= self.discount
        if self.tax:
            total_price += self.tax
        return total_price

class OfferRevisionPackageService(AbstractModel):
    package = models.ForeignKey(OfferRevisionPackage, on_delete=models.CASCADE, related_name='package_services')
    product = models.ForeignKey(Product, on_delete=models.PROTECT, related_name='product_services')
    quantity = models.FloatField(default=0.0)
    price =  models.FloatField(default=0.0)
    detail = RichTextUploadingField(null=True, blank=True)

    def __str__(self):
        return f'{self.package}-service'


class Contract(AbstractModel):
    offer = models.ForeignKey(Offer, on_delete=models.CASCADE, related_name='offer_contracts')
    
    def __str__(self):
        return f'{self.offer}-contract'

class Order(AbstractModel):
    STATUSES  = [   
        ('Davamedir', 'Davamedir'),
        ('Tamamlandı', 'Tamamlandı')
    ]
    QUESTIONS_ANSWER = [
        ('PİS', 'PİS'),
        ('ORTA', 'ORTA'),
        ('YAXŞI', 'YAXŞI')
    ]
    contract = models.ForeignKey(Contract, on_delete=models.CASCADE, related_name='contract_orders')
    number =  models.CharField(max_length=50, blank=True, null=True)
    project_name = models.TextField(blank=False, null=False)
    saller = models.ForeignKey(User, on_delete=models.PROTECT, related_name='saller_orders')
    plan_note =  models.TextField(blank=True, null=True)
    equipment_note = models.TextField(blank=True, null=True)
    production_note  = models.TextField(blank=True, null=True)
    packaging_note = models.TextField(blank=True, null=True)
    transportation_note = models.TextField(blank=True, null=True)
    installation_note = models.TextField(blank=True, null=True)
    note = models.TextField(max_length=255, blank=True, null=True)
    prepayment = models.TextField(max_length=255, blank=False, null=False)
    nps = models.TextField('next payment  schedule', blank=True, null=True)
    order_recipient = models.ForeignKey(User, on_delete=models.PROTECT, related_name='recipient_orders')
    order_accountant = models.ForeignKey(User, on_delete=models.PROTECT, blank=True, null=True, related_name='order_accountant')
    order_production = models.ForeignKey(User, on_delete=models.PROTECT, blank=True, null=True, related_name='order_production')
    order_installer = models.ForeignKey(User, on_delete=models.PROTECT, blank=True, null=True, related_name='order_install')
    status_change_reason = models.TextField(blank=True, null=True)
    status =  models.CharField(choices=STATUSES, default='Davamedir', max_length=11)
    customer_feedback = models.TextField(null=True, blank=True)
    question_corporation_profency = models.CharField(choices=QUESTIONS_ANSWER, null=True, blank=True, max_length=6)
    question_operativeness = models.CharField(choices=QUESTIONS_ANSWER, null=True, blank=True, max_length=6)
    question_personals_communication = models.CharField(choices=QUESTIONS_ANSWER, null=True, blank=True, max_length=6)
    question_delv_install_team = models.CharField(choices=QUESTIONS_ANSWER, null=True, blank=True, max_length=6)
    question_order_expectation = models.CharField(choices=QUESTIONS_ANSWER, null=True, blank=True, max_length=6)
    handover = models.ImageField('handover', blank=True, upload_to='OrderHandovers/')

    def __str__(self):
        return f'Sifariş {self.number}'

    def date(self):
        return self.created_at.strftime('%d.%m.%Y')
    def total_price(self):
        package = OfferRevision.objects.filter(offer = self.contract.offer).filter(is_active = True).first().revision_packages.first()
        total_price = 0
        for service in  package.package_services.all():
            total_price += service.quantity*service.price
        if package.delv:
            total_price += package.delv
        if  package.discount:
            total_price  -= package.discount
        if package.tax:
            total_price += package.tax

        return total_price

class ServiceUsedProduct(AbstractModel):
    service = models.ForeignKey(OfferRevisionPackageService, on_delete=models.CASCADE, related_name='services_used_products')
    product = models.ForeignKey(Product, on_delete=models.PROTECT, related_name='products_useds')
    quantity =  models.FloatField(default=0.0)
    price =  models.FloatField(default=0.0)



