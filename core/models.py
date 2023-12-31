from django.db import models
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from django.db.models.signals import post_save

# Create your models here.

class AbstractModel(models.Model):
    created_at=models.DateTimeField(auto_now_add=True)
    update_at=models.DateTimeField(auto_now=True)

    class Meta:
        abstract=True

from accounts.models import User
from sales.models import Offer, OfferRevision, Order

class Backlog(AbstractModel):
    title = models.CharField(null=True, blank=True,  max_length=50)
    by = models.ForeignKey(User, on_delete=models.PROTECT, related_name='user_logs')
    mention = models.ForeignKey(User, on_delete=models.SET_NULL, blank=True, null=True, related_name='user_mentioned_logs')
    message = models.CharField(max_length=100, null=False, blank = False)
    content_type = models.ForeignKey(ContentType, on_delete=models.SET_NULL, null=True, blank=True)
    object_id = models.PositiveIntegerField(null=True, blank=True)
    about = GenericForeignKey('content_type', 'object_id')

    def __str__(self):
        return f'{self.by} {self.about}'
    
    def date(self):
        return self.created_at.strftime('%d.%m.%Y')
    
    def create_offer_backlog(sender,instance, **kwargs):
        if kwargs['created']:
            message = f'Təklif {instance.number} yaradıldı.'
            title = 'Yeni Təklif'
            Backlog.objects.create(by=User.objects.get(id=1),message=message, about=instance, title=title)
    post_save.connect(create_offer_backlog, sender=Offer)
    def create_order_backlog(sender,instance, **kwargs):
        if kwargs['created']:
            message = f'Sifariş {instance.number} yaradıldı.'
            title = 'Yeni Sifariş'
            Backlog.objects.create(by=User.objects.get(id=1),message=message, about=instance, title=title)
    post_save.connect(create_order_backlog, sender=Order)
    def create_revision_backlog(sender,instance, **kwargs):
        if instance.number != '001':
            if kwargs['created']:
                message = f'Təklif {instance.offer.number} yeni REV{instance.number} yaradıldı.'
                title = 'Yeni Revision'
                Backlog.objects.create(by=User.objects.get(id=1),message=message, about=instance.offer, title=title)
    post_save.connect(create_revision_backlog, sender=OfferRevision)
