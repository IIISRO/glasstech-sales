from django.urls import path
from .views import CreateProduct, ListSalesProduct, ProductDetail, get_templates

app_name = 'products'

urlpatterns = [
    path('create/product',CreateProduct.as_view(), name='create_product'),
    path('sales/list',ListSalesProduct.as_view(), name='list_sales_product'),
    path('detail/<int:pk>',ProductDetail.as_view(), name='product_detail'),
    path('get-templates/<int:pk>', get_templates, name='get-product-templates')


]