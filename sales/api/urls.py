from django.urls import path
from .views import OfferApi, OfferUpdateApi, OfferDeleteApi,  OrderUpdateApi, OffersListApi, OrdersListApi

app_name = 'salesApi'

urlpatterns = [
    
    path('offer/<str:number>', OfferApi.as_view(), name='offerapi'),
    path('update/offer/<int:pk>', OfferUpdateApi.as_view(), name='offer-updateapi'),
    path('delete/offer/<int:pk>', OfferDeleteApi.as_view(), name='offer-deleteapi'),
    path('update/order/<int:pk>', OrderUpdateApi.as_view(), name='order-updateapi'),
    path('offers', OffersListApi.as_view(), name='offers-listapi'),
    path('orders', OrdersListApi.as_view(), name='orders-listapi'),





]