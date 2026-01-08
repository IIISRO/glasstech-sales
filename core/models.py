from django.db import models
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from django.db.models.signals import post_save
from ckeditor_uploader.fields import RichTextUploadingField


# Create your models here.

class AbstractModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True, db_index=False)
    update_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


from accounts.models import User
from sales.models import Offer, OfferRevision, Order


class Backlog(AbstractModel):
    title = models.CharField(null=True, blank=True, max_length=50)
    by = models.ForeignKey(User, on_delete=models.PROTECT, related_name='user_logs')
    mention = models.ForeignKey(User, on_delete=models.SET_NULL, blank=True, null=True,
                                related_name='user_mentioned_logs')
    message = models.CharField(max_length=100, null=False, blank=False)
    content_type = models.ForeignKey(ContentType, on_delete=models.SET_NULL, null=True, blank=True)
    object_id = models.PositiveIntegerField(null=True, blank=True)
    about = GenericForeignKey('content_type', 'object_id')

    def __str__(self):
        return f'{self.by} {self.about}'

    def date(self):
        return self.created_at.strftime('%d.%m.%Y')

    def create_offer_backlog(sender, instance, **kwargs):
        if kwargs['created']:
            message = f'Təklif {instance.number} yaradıldı.'
            title = 'Yeni Təklif'
            Backlog.objects.create(by=User.objects.get(id=1), message=message, about=instance, title=title)

    post_save.connect(create_offer_backlog, sender=Offer)

    def create_order_backlog(sender, instance, **kwargs):
        if kwargs['created']:
            message = f'Sifariş {instance.number} yaradıldı.'
            title = 'Yeni Sifariş'
            Backlog.objects.create(by=User.objects.get(id=1), message=message, about=instance, title=title)

    post_save.connect(create_order_backlog, sender=Order)

    def create_revision_backlog(sender, instance, **kwargs):
        if instance.number != '001':
            if kwargs['created']:
                message = f'Təklif {instance.offer.number} yeni REV{instance.number} yaradıldı.'
                title = 'Yeni Revision'
                Backlog.objects.create(by=User.objects.get(id=1), message=message, about=instance.offer, title=title)

    post_save.connect(create_revision_backlog, sender=OfferRevision)


class TermsOfSale(AbstractModel):
    class TitleChoices(models.TextChoices):
        SELLER_RIGHTS = 'SELLER', 'Satıcının hüquq və öhdəlikləri'
        BUYER_RIGHTS = 'BUYER', 'Alıcının hüquq və öhdəlikləri'
        DELIVERY_TERMS = 'DELIVERY', 'Çatdırılma şərtləri'

    title = models.CharField(
        max_length=20,
        choices=TitleChoices.choices,
        verbose_name="Başlıq"
    )
    content = RichTextUploadingField(verbose_name="Mətn")
    is_active = models.BooleanField(default=True, verbose_name="Aktivdir?")

    class Meta:
        verbose_name = "Satış şərti"
        verbose_name_plural = "Satış şərtləri"
        ordering = ['-created_at']

    def __str__(self):
        return self.get_title_display()

    def save(self, *args, **kwargs):
        if self.is_active:
            TermsOfSale.objects.filter(
                title=self.title,
                is_active=True
            ).exclude(pk=self.pk).update(is_active=False)

        super().save(*args, **kwargs)






