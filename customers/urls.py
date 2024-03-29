from django.urls import path
from .views import CreateCustomerView, CustomersList, CustomerProfile, CustomerEdit

app_name = 'customers'

urlpatterns = [
    path('create/customer', CreateCustomerView.as_view(), name='create-customer'),
    path('list', CustomersList.as_view(), name='customers-list'),
    path('profile/<int:pk>', CustomerProfile.as_view(), name='customer-profile'),
    path('edit/customer/<int:pk>', CustomerEdit.as_view(), name='edit-customer'),


]