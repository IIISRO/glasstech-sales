from django.contrib import admin
from .models import Offer,OfferRevisionPackage,OfferRevisionPackageService,Order, OfferRevision, Contract,ServiceUsedProduct
# Register your models here.
admin.site.register(Offer)
admin.site.register(OfferRevisionPackage)
admin.site.register(OfferRevisionPackageService)
admin.site.register(Order)
admin.site.register(OfferRevision)
admin.site.register(Contract)
admin.site.register(ServiceUsedProduct)