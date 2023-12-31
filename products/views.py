from django.shortcuts import render
from django.views.generic import CreateView
from .models import Product
from django.urls import reverse_lazy
from .forms import CreateProductForm
from django.contrib.messages.views import SuccessMessageMixin
from django.views.generic import View
from sales.models import OfferRevisionPackageService, ServiceUsedProduct, Contract
from datetime import date

# Create your views here.

class CreateProduct(SuccessMessageMixin, CreateView):
    model = Product
    template_name = 'product-create.html'
    form_class = CreateProductForm
    success_url = reverse_lazy('core:dashboard')
    success_message = "Məhsul əlavə edildi!"

class ListSalesProduct(View):

    def get(self, request):
        products = Product.objects.all()
        products_list =  []
        for product in products:
            temp=[]
            prod_added = False
            if request.GET.get('date'):
                from_date = list(map(int, list(request.GET.get('date', '').split('-')[0].split('/'))))
                to_date = list(map(int, list(request.GET.get('date', '').split('-')[1].split('/'))))
                services = OfferRevisionPackageService.objects.filter(package__revision__is_active = True).filter(package__revision__offer__status = 'Uğurlu').filter(product = product).filter(created_at__gte=date(from_date[2],from_date[1],from_date[0]),
                             created_at__lte=date(to_date[2],to_date[1],to_date[0])).order_by('created_at')
            else:
                services = OfferRevisionPackageService.objects.filter(package__revision__is_active = True).filter(package__revision__offer__status = 'Uğurlu').filter(product = product)
            for service in services:
                product_item = {'name':service.product.name,'unit':service.product.unit,'category':service.product.category, 'quantity':0.0,'total':0, 'useds':{'name':'','unit':'','category':'','quantity':0,'total':0}}
                product_item['quantity'] = service.quantity
                product_item['total'] = int(service.price * service.quantity)

                if service.services_used_products.first():
                    used_prod = service.services_used_products.first()
                    product_item['useds']['name'] = used_prod.product.name
                    product_item['useds']['unit'] = used_prod.product.unit
                    product_item['useds']['category'] = used_prod.product.category 
                    product_item['useds']['quantity'] = used_prod.quantity
                    product_item['useds']['total'] = int(used_prod.quantity * used_prod.price)

                if len(temp)>0:
                    added = False
                    for prod in temp:
                        if prod['name'] == product_item['name'] and prod['useds']['name']==product_item['useds']['name']:
                            prod['quantity']+=product_item['quantity']
                            prod['total']+=product_item['total']
                            prod['useds']['quantity'] += product_item['useds']['quantity']
                            prod['useds']['total'] += product_item['useds']['total']
                            added=True

                    if not added:
                        temp.append(product_item)
            
                else:
                    temp.append(product_item)
                prod_added =  True

            if prod_added:
                products_list.extend(temp)
            else:
                products_list.append({'name':product.name,'unit':product.unit,'category':product.category, 'quantity':0,'total':0, 'useds':{'name':'','unit':'','category':'','quantity':0,'total':0}})

        context = {
            'product_list': products_list
        }
     
        return render(request, 'products-sales-list.html', context=context)
    