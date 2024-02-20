from rest_framework import serializers
from sales.models import Offer, OfferRevision, OfferRevisionPackage, OfferRevisionPackageService, ServiceUsedProduct, Order
from accounts.models import User

class ServiceUsedProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceUsedProduct
        fields = '__all__'


class OfferRevisionPackageServiceSerializer(serializers.ModelSerializer):
    product = serializers.SerializerMethodField()
    used_products = serializers.SerializerMethodField()
    
    class Meta:
        model = OfferRevisionPackageService
        fields = (
            'id',
            'package',
            'product',
            'quantity',
            'price',
            'detail',
            'used_products'
        )
    def get_product(self, obj):
        return {'id': obj.product.id, 'name': obj.product.name, 'unit': obj.product.unit}
    def get_used_products(self, obj):
        return ServiceUsedProductSerializer(obj.services_used_products.all().order_by('created_at'), many=True).data
class OfferRevisionPackageSerializer(serializers.ModelSerializer):

    services = serializers.SerializerMethodField()

    class Meta:
        model = OfferRevisionPackage
        fields = (
            'id',
            'revision',
            'tax',
            'discount',
            'delv',
            'services'
        )

    def get_services(self, obj):

        return OfferRevisionPackageServiceSerializer(obj.package_services.all().order_by('created_at'), many=True).data

class OfferRevisionSerializer(serializers.ModelSerializer):

    offer_creator = serializers.SerializerMethodField()
    offer_approver = serializers.SerializerMethodField()
    date = serializers.SerializerMethodField()
    
    packages = serializers.SerializerMethodField()


    class Meta:
        model = OfferRevision
        fields = (
            'id',
            'date',
            'offer',
            'offer_creator',
            'offer_approver',
            'number',
            'note',
            'pay_delv_cond',
            'delv_time',
            'is_active',
            'packages'
        )
    def get_packages(self, obj):
        return OfferRevisionPackageSerializer(obj.revision_packages.all().order_by('created_at'), many=True).data
    def get_offer_creator(self, obj):
        return {'id': obj.offer_creator.id, 'full_name': obj.offer_creator.get_full_name()}
    def get_offer_approver(self, obj):
        return {'id': obj.offer_approver.id, 'full_name': obj.offer_approver.get_full_name()}
    def get_date(self,obj):
        return obj.date()

class OfferSerializer(serializers.ModelSerializer):

    revisions = serializers.SerializerMethodField()
    class Meta:
        model = Offer
        fields = (
            'customer',
            'number',
            'status',
            'potency',
            'status_change_reason',
            'revisions',
        )
    def get_revisions(self, obj):
        return OfferRevisionSerializer(obj.offer_revisions.all(), many=True).data
    
class OfferUpdateDeleteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Offer
        fields = '__all__'

class  OrderUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'

class  OffersListSerializer(serializers.ModelSerializer):
    date = serializers.SerializerMethodField()
    customer = serializers.SerializerMethodField()
    price = serializers.SerializerMethodField()

    class Meta:
        model = Offer
        fields = (
            'customer',
            'number',
            'status',
            'potency',
            'price',
            'date'
        )
    def get_date(self, obj):
        return obj.date()
    def get_customer(self, obj):
        customer =  {
            'id': obj.customer.id,
            'name': obj.customer.get_full_name()
        }
        return customer
    def get_price(self, obj):
        prices = []
        for package in obj.offer_revisions.filter(is_active = True).first().revision_packages.all():
           prices.append(package.get_price())
        return max(prices)
    
class  OrdersListSerializer(serializers.ModelSerializer):
    date = serializers.SerializerMethodField()
    total = serializers.SerializerMethodField()
    customer = serializers.SerializerMethodField()
    customer_history = serializers.SerializerMethodField()

    class Meta:
        model = Order
        fields = (
            'customer',
            'customer_history',
            'number',
            'status',
            'total',
            'date'
        )
    def get_date(self, obj):
        return obj.date()
    def get_customer(self, obj):
        customer =  {
            'id': obj.contract.offer.customer.id,
            'name': obj.contract.offer.customer.get_full_name()
        }
        return customer
    def get_customer_history(self,  obj):
        if obj.contract.offer.customer.customer_offers.count() > 1:
            return "Köhnə Müştəri"
        else:    
            return 'İlk dəfə işləyən'
    def get_total(self, obj):
        return obj.total_price()