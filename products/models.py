from django.db import models
from  core.models import AbstractModel
from ckeditor_uploader.fields import RichTextUploadingField

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
    
class ProductDescriptionTemplate(AbstractModel):
    product = models.ForeignKey('Product', null = False, blank = False, on_delete = models.CASCADE, related_name='product_descriptions')
    description = RichTextUploadingField(blank=True, null=True)

    def __str__(self):
        return f'{self.product.name}-Template'