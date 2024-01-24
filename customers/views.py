from typing import Any
from django.shortcuts import render
from django.views.generic import CreateView
from .models import Customer
from .forms import CreateCustomerForm
from django.urls import reverse_lazy
from django.contrib.messages.views import SuccessMessageMixin
import datetime
from django.views.generic import View, DetailView
from core.models import Backlog
from sales.models import Order
from django.contrib.contenttypes.models import ContentType
from accounts.models import User
from django.views.generic.edit import UpdateView 


# Create your views here.

class CreateCustomerView(SuccessMessageMixin, CreateView):
    model = Customer
    template_name = 'create-customer.html'
    form_class = CreateCustomerForm
    success_url = reverse_lazy('customers:customers-list')
    success_message = "Müştəri əlavə edildi!"

class CustomersList(View):
    def get(self, request):
        context = {
            'customes': Customer.objects.all(),

            'customer_year': Customer.objects.filter(created_at__year=datetime.date.today().year).count(),
            'customer_jan': Customer.objects.filter(created_at__year=datetime.date.today().year, created_at__month=1).count(),
            'customer_feb': Customer.objects.filter(created_at__year=datetime.date.today().year, created_at__month=2).count(),
            'customer_mar': Customer.objects.filter(created_at__year=datetime.date.today().year, created_at__month=3).count(),
            'customer_apr': Customer.objects.filter(created_at__year=datetime.date.today().year, created_at__month=4).count(),
            'customer_may': Customer.objects.filter(created_at__year=datetime.date.today().year, created_at__month=5).count(),
            'customer_jun': Customer.objects.filter(created_at__year=datetime.date.today().year, created_at__month=6).count(),
            'customer_jul': Customer.objects.filter(created_at__year=datetime.date.today().year, created_at__month=7).count(),
            'customer_aug': Customer.objects.filter(created_at__year=datetime.date.today().year, created_at__month=8).count(),
            'customer_sep': Customer.objects.filter(created_at__year=datetime.date.today().year, created_at__month=9).count(),
            'customer_oct': Customer.objects.filter(created_at__year=datetime.date.today().year, created_at__month=10).count(),
            'customer_nov': Customer.objects.filter(created_at__year=datetime.date.today().year, created_at__month=11).count(),
            'customer_dec': Customer.objects.filter(created_at__year=datetime.date.today().year, created_at__month=12).count(),


            'ref_selfcustomer': Customer.objects.filter(reference = 'Biz tapmışıq').count(),
            'ref_igcustomer': Customer.objects.filter(reference = 'Instagram').count(),
            'ref_fbcustomer': Customer.objects.filter(reference = 'Facebook').count(),
            'ref_licustomer': Customer.objects.filter(reference = 'Linkedin').count(),
            'ref_webcustomer': Customer.objects.filter(reference = 'WEB').count(),
            'ref_calledcustomer': Customer.objects.filter(reference = 'Eşitmə').count(),

        }
        return render(request, 'customers-list.html', context)
    
class CustomerProfile(DetailView):
    model = Customer
    template_name = 'customer-profile.html'

    def get_context_data(self, **kwargs):
        context = super(CustomerProfile, self).get_context_data(**kwargs)
        customer = self.get_object()
        backlogs = Backlog.objects.filter(content_type=ContentType.objects.get_for_model(customer), object_id=customer.id)
        content_type = ContentType.objects.get_for_model(customer)
        offers = customer.customer_offers.all()
        orders_count = 0 
        for offer in offers:
            offer_backlogs = Backlog.objects.filter(content_type=ContentType.objects.get_for_model(offer), object_id=offer.id)
            backlogs = backlogs.union(offer_backlogs)
            orders = Order.objects.filter(contract__offer = offer)
            if orders.exists():
                orders_count += orders.count()
                order = orders.first()
                order_backlogs = Backlog.objects.filter(content_type=ContentType.objects.get_for_model(order), object_id=order.id)
                backlogs = backlogs.union(order_backlogs)


        context['backlogs'] = backlogs.order_by('-created_at')
        context['offers_count'] = offers.count()
        context['orders_count'] =  orders_count
        context['users'] = User.objects.all()
        context['content_type'] = content_type.id

        return context

class CustomerEdit(SuccessMessageMixin, UpdateView):
    model = Customer
    form_class = CreateCustomerForm
    template_name = 'edit-customer.html'
    success_message = "Müştəri məlumatları yeniləndi!"
    


