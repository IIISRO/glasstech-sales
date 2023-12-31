from django.urls import path
from .views import OfferReview, OfferEdit, OfferNewRevisionCreate, OfferDetail, OrderReview, OrderDetail, OffersList, OrderEdit, OrdersList, create_offer, export_offer_docx, create_order, export_order_docx

app_name = 'sales'

urlpatterns = [
    path('review/offer/<str:number>', OfferReview.as_view(), name='offer-review'),
    path('create/offer', create_offer, name='create-offer'),
    path('edit/offer/<str:number>', OfferEdit.as_view(), name='offer-edit'), 
    path('offer/<str:number>/create/new-revision', OfferNewRevisionCreate.as_view(), name='offer-new-rev-create'), 
    path('export-docx/offer/<str:number>', export_offer_docx, name='export-docx-offer'), 
    path('detail/offer/<str:number>', OfferDetail.as_view(), name='offer-detail'), 
    path('offers', OffersList.as_view(), name='offers-list'), 
    path('create/order', create_order, name='create-order'),
    path('review/order/<str:number>', OrderReview.as_view(), name='order-review'), 
    path('detail/order/<str:number>', OrderDetail.as_view(), name='order-detail'), 
    path('export-docx/order/<str:number>', export_order_docx, name='export-docx-order'), 
    path('edit/order/<str:number>', OrderEdit.as_view(), name='order-edit'), 
    path('orders', OrdersList.as_view(), name='orders-list'), 








]