from rest_framework.views import APIView
from rest_framework.generics import UpdateAPIView, DestroyAPIView
from .serializers import OfferSerializer, OfferUpdateDeleteSerializer, OrderUpdateSerializer, OffersListSerializer, OrdersListSerializer
from sales.models import Offer, Order
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from rest_framework import permissions
from django.contrib import messages
from customers.models import Customer
from datetime import date

class OfferApi(APIView):
    permission_classes = (permissions.IsAuthenticated,)
        
    def get(self, request, *args, **kwargs):
        offer = get_object_or_404(Offer, number = self.kwargs.get('number'))
        product_data = OfferSerializer(offer).data
       
        return Response(product_data)  
 
class OfferDeleteApi(DestroyAPIView):
    serializer_class = OfferSerializer
    permission_classes = (permissions.IsAuthenticated,)
    queryset = Offer

    def delete(self, request, *args, **kwargs):
        messages.add_message(request, messages.SUCCESS, (f"Təklif NO: {self.get_object().number} Silindi!"))
        
        return super().delete(request, *args, **kwargs)


class OfferUpdateApi(UpdateAPIView):
    serializer_class = OfferUpdateDeleteSerializer
    http_method_names = ["patch"]
    permission_classes = (permissions.IsAuthenticated,)
    queryset = Offer

    def update(self, request, *args, **kwargs):
        super().update(request, *args, **kwargs)
        messages.add_message(request, messages.SUCCESS, (f"Təklif NO: {self.get_object().number} Dəyişikliklər Yadda Saxlanıldı!"))
        # müştırinin potensiyallıqı
        customer = Customer.objects.get(id = self.get_object().customer.id)
        offers_pis = Offer.objects.filter(customer = customer).filter(potency = 'PİS').count()
        offers_orta = Offer.objects.filter(customer = customer).filter(potency = 'ORTA').count()
        offers_yaxsi = Offer.objects.filter(customer = customer).filter(potency = 'YAXŞI').count()
        if offers_pis == 0 and  offers_orta  ==  0 and offers_yaxsi == 0:
            customer_potency = None
        elif offers_pis == offers_orta == offers_yaxsi or offers_pis == offers_orta > offers_yaxsi or offers_orta == offers_yaxsi > offers_pis or offers_pis == offers_yaxsi > offers_orta:
            customer_potency  = 'ORTA'
        else:
            offer_potency = {
                'PİS': offers_pis,
                'ORTA': offers_orta,
                'YAXŞI': offers_yaxsi
            }
            customer_potency = list(max(offer_potency.items(), key=lambda item: item[1]))[0]

        customer.potency = customer_potency
        customer.save()
        return Response('ok')
    
class OrderUpdateApi(UpdateAPIView):
    serializer_class = OrderUpdateSerializer
    http_method_names = ["patch"]
    permission_classes = (permissions.IsAuthenticated,)
    queryset = Order

    def update(self, request, *args, **kwargs):
        messages.add_message(request, messages.SUCCESS, (f"Sifariş NO: {self.get_object().number} Dəyişikliklər Yadda Saxlanıldı!"))
    
        return super().update(request, *args, **kwargs)
    
class OffersListApi(APIView):
    permission_classes = (permissions.IsAuthenticated,)
        
    def get(self, request, *args, **kwargs):
        if request.GET.get('date', ''):
            from_date = list(map(int, list(request.GET.get('date', '').split('-')[0].split('/'))))
            to_date = list(map(int, list(request.GET.get('date', '').split('-')[1].split('/'))))
            offers_list = Offer.objects.filter(created_at__gte=date(from_date[2],from_date[1],from_date[0]),
                                created_at__lte=date(to_date[2],to_date[1],to_date[0])).order_by('-created_at')
        else:
            offers_list = Offer.objects.all().order_by('-created_at')
        offers = OffersListSerializer(offers_list, many=True).data
       
        return Response(offers)  
    
class OrdersListApi(APIView):
    permission_classes = (permissions.IsAuthenticated,)
        
    def get(self, request, *args, **kwargs):
        if request.GET.get('date', ''):
            from_date = list(map(int, list(request.GET.get('date', '').split('-')[0].split('/'))))
            to_date = list(map(int, list(request.GET.get('date', '').split('-')[1].split('/'))))
            orders_list = Order.objects.filter(created_at__gte=date(from_date[2],from_date[1],from_date[0]),
                                created_at__lte=date(to_date[2],to_date[1],to_date[0])).order_by('-created_at')
        else:
            orders_list = Order.objects.all().order_by('-created_at')
        offers = OrdersListSerializer(orders_list, many=True).data
       
        return Response(offers)  