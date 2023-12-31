from django.urls import path
from .views import CreateProduct, ListSalesProduct

app_name = 'products'

urlpatterns = [
    path('create/product',CreateProduct.as_view(), name='create_product'),
    path('sales/list',ListSalesProduct.as_view(), name='list_sales_product'),

]