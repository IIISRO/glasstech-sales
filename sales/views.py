from typing import Any
from django.shortcuts import render, get_object_or_404
from .models import Offer, OfferRevision, OfferRevisionPackage, OfferRevisionPackageService, Order, Contract, ServiceUsedProduct
from customers.models import Customer
from products.models import Product
from datetime import datetime, date
from accounts.models import User
from django.urls import reverse
import json
from django.http import JsonResponse, Http404
from django.views.generic import View, DetailView
from django.contrib import messages
from core.models import Backlog
from django.contrib.contenttypes.models import ContentType
from django.db.models import Count
# Create your views here.

class OfferReview(View):
    def get(self, request, number):
        offer = get_object_or_404(Offer,  number = number)
        context =  {
            'offer' : offer,
        }
        return render(request, 'offer-review.html', context)

def create_offer(request):
    if request.method == "POST":
        data = json.loads(request.body)
        if not data:
            raise Http404
        offer = Offer.objects.create(
            customer = Customer.objects.get(id = data['customer']),
            number = data['number'],
            )
        revision = OfferRevision.objects.create(
            offer = offer,
            offer_creator = User.objects.get(id = data['offer_creator']),
            offer_approver = User.objects.get(id = data['offer_approver']),
            note = data['note'],
            pay_delv_cond = data['offer_pay_delv_cond'],
            delv_time = data['offer_delv_time'],
        )
        for package in data['packages']:
            new_package = OfferRevisionPackage.objects.create(
                revision = revision,
                tax = package['tax'],
                discount = package['discount'],
                delv = package['delv']
            )
            for service in package['services']:
                new_service = OfferRevisionPackageService.objects.create(
                    package = new_package,
                    product = Product.objects.get(id = service['product']),
                    quantity = service['quantity'],
                    price = service['price'],
                    detail = service['detail']
                )
                for used in service['used_materials']:
                    ServiceUsedProduct.objects.create(
                        service = new_service,
                        product = Product.objects.get(id = used['product_id']),
                        price = used['price'],
                        quantity = used['quantity']
                    )

        messages.add_message(request, messages.SUCCESS, (f"Təklif NO: {data['number']} yaradıldı!"))
        return JsonResponse('yaradildi', safe=False)
    else:
        customer_id = request.GET.get('customer','')
        if customer_id:
            customer = get_object_or_404(Customer, id = int(customer_id)) 
            last_offer_number = Offer.objects.filter(customer = customer).order_by('-created_at')
            if last_offer_number.exists():
                offers_count = int(last_offer_number.first().number.split('-')[-1])
            else:
                offers_count = 0
            offer_number = f"{datetime.now().strftime('%d%m%y')}-{customer_id}-{offers_count+1}"

            ckeditor_upload = reverse('ckeditor_upload')
            ckeditor_browse = reverse('ckeditor_browse')

            context = {
                'ckeditor_upload':ckeditor_upload,
                'ckeditor_browse':ckeditor_browse,
                'customer':customer,
                'offer_number':offer_number,
                'date':datetime.now().strftime('%d.%m.%Y'),
                'users':User.objects.filter(id__gt = 1),
                'products':Product.objects.all(),
            }   

            return render(request, 'offer-create.html', context)
        raise Http404

class OfferEdit(View):
    def get(self, request, number):

        offer = get_object_or_404(Offer , number = number, status = "Aktiv")

        context = {
            'offer': offer,
            'products': Product.objects.all(),
            'users': User.objects.filter(id__gt = 1),
        }

        return render(request, 'offer-edit.html', context)
    def post(self,request,number):
        data = json.loads(request.body)
        if not data:
            raise Http404
        offer = get_object_or_404(Offer, number=number)
        revision = offer.offer_revisions.get(is_active = True)
        revision.offer_creator = User.objects.get(id = data['offer_creator'])
        revision.offer_approver = User.objects.get(id = data['offer_approver'])
        revision.note = data['note']
        revision.pay_delv_cond = data['offer_pay_delv_cond']
        revision.delv_time = data['offer_delv_time']
        revision.save()
        for updated_package in data['packages']:
            if not updated_package['id']:
                new_package = OfferRevisionPackage.objects.create(
                revision = revision,
                tax = updated_package['tax'],
                discount = updated_package['discount'],
                delv = updated_package['delv']

                )
                for updated_service in updated_package['services']:
                    new_service = OfferRevisionPackageService.objects.create(
                        package = new_package,
                        product = Product.objects.get(id = updated_service['product']),
                        quantity = updated_service['quantity'],
                        price = updated_service['price'],
                        detail = updated_service['detail']
                    )
                    for updated_usedprod in updated_service['used_materials']:
                        ServiceUsedProduct.objects.create(
                            service = new_service,
                            product = Product.objects.get(id = updated_usedprod['product_id']),
                            price = updated_usedprod['price'],
                            quantity = updated_usedprod['quantity']
                        )

            else:
                package = OfferRevisionPackage.objects.get(id = updated_package['id'])
                package.tax = updated_package['tax']
                package.discount = updated_package['discount']
                package.delv = updated_package['delv']
                package.save()
                for updated_service in updated_package['services']:
                    if not updated_service['id']:
                        new_service = OfferRevisionPackageService.objects.create(
                            package = package,
                            product = Product.objects.get(id = updated_service['product']),
                            quantity = updated_service['quantity'],
                            price = updated_service['price'],
                            detail = updated_service['detail']
                        )
                        for updated_usedprod in updated_service['used_materials']:
                            ServiceUsedProduct.objects.create(
                                service = new_service,
                                product = Product.objects.get(id = updated_usedprod['product_id']),
                                price = updated_usedprod['price'],
                                quantity = updated_usedprod['quantity']
                            )
                    else:
                        service = OfferRevisionPackageService.objects.filter(id = updated_service['id'])
                        if service.exists():
                            service = service[0]
                            service.product = Product.objects.get(id = updated_service['product'])
                            service.quantity = updated_service['quantity']
                            service.price = updated_service['price']
                            service.detail = updated_service['detail']
                            service.save()
                            for updated_usedprod in updated_service['used_materials']:
                                if not updated_usedprod['id']:
                                    ServiceUsedProduct.objects.create(
                                        service = service,
                                        product = Product.objects.get(id = updated_usedprod['product_id']),
                                        price = updated_usedprod['price'],
                                        quantity = updated_usedprod['quantity']
                                    )
                                else:
                                    usedprod = ServiceUsedProduct.objects.get(id = updated_usedprod['id'])
                                    usedprod.product = Product.objects.get(id = updated_usedprod['product_id'])
                                    usedprod.price = updated_usedprod['price']
                                    usedprod.quantity = updated_usedprod['quantity']
                                    usedprod.save()
                           
        # removing
        for package_id in data['removedPackagesIDS']:
            package = OfferRevisionPackage.objects.filter(id = package_id)
            if package.exists():
                package.first().delete()
        for service_id in data['removedServicesIDS']:
            service = OfferRevisionPackageService.objects.filter(id = service_id)
            if service.exists():
                service.first().delete()
        for usedprod_id in data['removedUsedProdsIDS']:
            usedprod = ServiceUsedProduct.objects.filter(id = usedprod_id)
            if usedprod.exists():
                usedprod.first().delete()
        messages.add_message(request, messages.SUCCESS, (f"Təklif NO: {number} məlumatları yeniləndi!"))
                        
        return JsonResponse('yaradildi', safe=False)

class OfferNewRevisionCreate(View):
    def get(self, request, number):

        offer = get_object_or_404(Offer , number = number, status = 'Aktiv')
        revisions  = offer.offer_revisions.all().order_by('-created_at')
        context = {
            'offer': offer,
            'revisions': revisions,
            'products': Product.objects.all(),
            'users':User.objects.filter(id__gt = 1),
            'date': datetime.now().strftime('%d.%m.%Y'),
            'new_revision_number': "{:03d}".format(int(revisions.first().number) + 1)
        }

        return render(request, 'offer-new-rev-create.html', context)
    def post(self,request,number):
        data = json.loads(request.body)
        if not data:
            raise Http404
        offer = Offer.objects.get(number = number)
         # handle is_active
        for active_rev in offer.offer_revisions.filter(is_active = True):
            active_rev.is_active = False
            active_rev.save()
        revision = OfferRevision.objects.create(
            offer = offer,
            offer_creator = User.objects.get(id = data['offer_creator']),
            offer_approver = User.objects.get(id = data['offer_approver']),
            note = data['note'],
            pay_delv_cond = data['offer_pay_delv_cond'],
            delv_time = data['offer_delv_time'],
            number = data['number']
        )
        for package in data['packages']:
            new_package = OfferRevisionPackage.objects.create(
                revision = revision,
                tax = package['tax'],
                discount = package['discount'],
                delv = package['delv']

            )
            for service in package['services']:
                new_service = OfferRevisionPackageService.objects.create(
                    package = new_package,
                    product = Product.objects.get(id = service['product']),
                    quantity = service['quantity'],
                    price = service['price'],
                    detail = service['detail']
                )
                for used in service['used_materials']:
                    ServiceUsedProduct.objects.create(
                        service = new_service,
                        product = Product.objects.get(id = used['product_id']),
                        price = used['price'],
                        quantity = used['quantity']
                    )
        
        messages.add_message(request, messages.SUCCESS, (f"Təklif NO: {offer.number} yeni REV{data['number']} yaradıldı!"))
        return JsonResponse('yaradildi', safe=False)

def export_offer_docx(request, number):
    offer = get_object_or_404(Offer, number = number)
    revision = offer.offer_revisions.get(is_active = True)
   
    context = {
        'offer': offer,
        'revision': revision
    }
    messages.add_message(request, messages.SUCCESS, (f"Təklif NO: {number} DOCX Çıxarıldı!"))
    
    return render(request,'offer-docx.html', context)

class OfferDetail(DetailView):
    model = Offer
    template_name = "offer-detail.html"
    slug_url_kwarg = 'number'
    slug_field = 'number'
    
    def get_context_data(self, **kwargs):
        context = super(OfferDetail, self).get_context_data(**kwargs)
        offer = self.get_object()
        revisions = context['offer'].offer_revisions.all().order_by('created_at')
        offer_revision = revisions.filter(is_active = True).first()
        backlogs = Backlog.objects.filter(content_type=ContentType.objects.get_for_model(offer), object_id=offer.id)
        content_type = ContentType.objects.get_for_model(offer)
        
        context['revisions'] = revisions
        context['offer_revision'] = offer_revision
        context['backlogs'] = backlogs.order_by('created_at')
        context['users'] =  User.objects.filter(id__gt = 1),
        context['content_type'] = content_type.id
        if Order.objects.filter(contract__offer = offer).exists():
            context['order_num'] = Order.objects.get(contract__offer = offer).number

       
        return context
    
class OffersList(View):
    def get(self, request):
        last_month_offer = Offer.objects.filter(created_at__year= date.today().year, created_at__month=date.today().month - 1).count()
        this_month_offer = Offer.objects.filter(created_at__year= date.today().year, created_at__month=date.today().month).count()
        if  not last_month_offer == 0:
            precent = ((this_month_offer - last_month_offer) / last_month_offer) * 100
        else:
            precent = this_month_offer
        context = {
            'offers': Offer.objects.all().order_by('-created_at'),
            'precent': round(precent, 2)
        }
        return render(request, 'offers-list.html', context) 

def create_order(request):

    offer_number = request.GET.get('offer','')
    offer = get_object_or_404(Offer, number = offer_number) 
    if not Contract.objects.filter(offer__number = offer_number).exists() and offer.status == "Aktiv":
        if request.method == 'POST':
            data = json.loads(request.body)
            if not data:
                raise Http404
            contract = Contract.objects.create(offer = offer)
            Order.objects.create(
                contract = contract,
                number = data['number'],
                project_name = data['project_name'],
                saller = User.objects.get(id = data['saller']),
                plan_note = data['plan_note'],
                equipment_note = data['equipment_note'],
                production_note = data['production_note'],
                packaging_note = data['packaging_note'],
                transportation_note = data['transport_note'],
                installation_note = data['installation_note'],
                note = data['note'],
                prepayment = data['pre_pay'],
                nps = data['nps'],
                order_recipient = User.objects.get(id = data['order_recipient']),
                
                order_accountant = User.objects.get(id = data['order_accountant']) if data['order_accountant'] else None,
                order_production = User.objects.get(id = data['order_production']) if data['order_production'] else None,
                order_installer = User.objects.get(id = data['order_install']) if data['order_install'] else None,
            )
           
            offer.status = 'Uğurlu'
            offer.save()
            messages.add_message(request, messages.SUCCESS, (f"Sifariş NO: {data['number']} Yaradıldı!"))

            return JsonResponse('ok', safe=False)
        else:

            # bir paket oldugun yoxlamag
            if offer.offer_revisions.filter(is_active = True).first().revision_packages.count()>1:
                raise Http404
            
            last_order_number = Order.objects.filter(contract__offer__customer = offer.customer).order_by('-created_at')
            if last_order_number.exists():
                order_count = int(last_order_number.first().number.split('-')[-1])
            else:
                order_count = 0
            number = f'{datetime.now().strftime("%d%m%y")}-{offer.customer.id}-{order_count+1}'

            ckeditor_upload = reverse('ckeditor_upload')
            ckeditor_browse = reverse('ckeditor_browse')

            context = {
                'ckeditor_upload':ckeditor_upload,
                'ckeditor_browse':ckeditor_browse,
                'offer':offer,
                'number': number,
                'date':datetime.now().strftime('%d.%m.%Y'),
                'users':User.objects.filter(id__gt = 1),
                'products':Product.objects.all(),
            }   

            return render(request, 'order-create.html', context)
    raise Http404

class OrderReview(DetailView):
    model = Order
    template_name = 'order-review.html'
    slug_url_kwarg = 'number'
    slug_field = 'number'  

class OrderDetail(DetailView):
    model = Order  
    template_name = 'order-detail.html'
    slug_url_kwarg = 'number'
    slug_field = 'number'

    def get_context_data(self, **kwargs):
        context = super(OrderDetail, self).get_context_data(**kwargs)
        order = self.get_object()
        order_contracted_offer_revision = order.contract.offer.offer_revisions.filter(is_active = True).first()
        content_type = ContentType.objects.get_for_model(order)
        context['users'] = User.objects.filter(id__gt = 1),
        context['order_contracted_offer_revision'] = order_contracted_offer_revision
        context['backlogs'] = Backlog.objects.filter(content_type=ContentType.objects.get_for_model(order), object_id=order.id)
        context['offer_backlogs'] =  Backlog.objects.filter(content_type=ContentType.objects.get_for_model(order.contract.offer), object_id=order.contract.offer.id)
        context['content_type'] = content_type.id

        return context
    
def export_order_docx(request, number):
    messages.add_message(request, messages.SUCCESS, (f"Sifariş NO: {number} DOCX Çıxarıldı!"))
    
    return render(request, 'order-docx.html', context={'order':Order.objects.get(number=number)})

class OrderEdit(View):
    def get(self, request, number):

        order = get_object_or_404(Order , number = number, status = "Davamedir")
        products = Product.objects.all()
        context = {
            'order': order,
            'products': products,
            'users':User.objects.filter(id__gt = 1),
            "offer": order.contract.offer
        }

        return render(request, 'order-edit.html', context)
    
class OrdersList(View):
    def get(self, request):
        order_yan = Order.objects.filter(created_at__year=date.today().year, created_at__month=1)
        order_feb = Order.objects.filter(created_at__year=date.today().year, created_at__month=2)
        order_mar = Order.objects.filter(created_at__year=date.today().year, created_at__month=3)
        order_apr = Order.objects.filter(created_at__year=date.today().year, created_at__month=4)
        order_may = Order.objects.filter(created_at__year=date.today().year, created_at__month=5)
        order_jun = Order.objects.filter(created_at__year=date.today().year, created_at__month=6)
        order_jul = Order.objects.filter(created_at__year=date.today().year, created_at__month=7)
        order_aug = Order.objects.filter(created_at__year=date.today().year, created_at__month=8)
        order_sep = Order.objects.filter(created_at__year=date.today().year, created_at__month=9)
        order_oct = Order.objects.filter(created_at__year=date.today().year, created_at__month=10)
        order_nov = Order.objects.filter(created_at__year=date.today().year, created_at__month=11)
        order_dec = Order.objects.filter(created_at__year=date.today().year, created_at__month=12)
        avarges = [
            {'this_year':0,'last_year':0},
            {'this_year':0,'last_year':0},
            {'this_year':0,'last_year':0},
            {'this_year':0,'last_year':0},
            {'this_year':0,'last_year':0},
            {'this_year':0,'last_year':0},
            {'this_year':0,'last_year':0},
            {'this_year':0,'last_year':0},
            {'this_year':0,'last_year':0},
            {'this_year':0,'last_year':0},
            {'this_year':0,'last_year':0},
            {'this_year':0,'last_year':0},

        ]
        for month in range(date.today().month):
            avarage = avarges[month]

            order_this_year = Order.objects.filter(created_at__year=date.today().year, created_at__month=month+1)
            total_price_this_year = 0
            for order in order_this_year:
                total_price_this_year += order.total_price()
            if total_price_this_year:
                avarage['this_year'] = total_price_this_year // order_this_year.count()

            order_last_year = Order.objects.filter(created_at__year=date.today().year-1, created_at__month=month+1)
            total_price_last_year = 0
            for order in order_last_year:
                total_price_last_year += order.total_price()
            if total_price_last_year:
                avarage['last_year'] = total_price_last_year // order_last_year.count()
        this_year_total_avg = 0
        for avg in avarges[:date.today().month]:
            this_year_total_avg += avg['this_year']
        last_year_total_avg = 0
        for avg in avarges[:date.today().month]:
            last_year_total_avg += avg['last_year']
            
        if  not last_year_total_avg == 0:
            precent = ((this_year_total_avg - last_year_total_avg) / last_year_total_avg) * 100
        else:
            precent = this_year_total_avg  

        context = { 
        'orders_year':Order.objects.filter(created_at__year=date.today().year).count(),
        'cust_fst_order_jan': order_yan.annotate(customer_offer_count=Count('contract__offer__customer__customer_offers')).filter(customer_offer_count=1).count(),
        'cust_fst_order_feb': order_feb.annotate(customer_offer_count=Count('contract__offer__customer__customer_offers')).filter(customer_offer_count=1).count(),
        'cust_fst_order_mar': order_mar.annotate(customer_offer_count=Count('contract__offer__customer__customer_offers')).filter(customer_offer_count=1).count(),
        'cust_fst_order_apr': order_apr.annotate(customer_offer_count=Count('contract__offer__customer__customer_offers')).filter(customer_offer_count=1).count(),
        'cust_fst_order_may': order_may.annotate(customer_offer_count=Count('contract__offer__customer__customer_offers')).filter(customer_offer_count=1).count(),
        'cust_fst_order_jun': order_jun.annotate(customer_offer_count=Count('contract__offer__customer__customer_offers')).filter(customer_offer_count=1).count(),
        'cust_fst_order_jul': order_jul.annotate(customer_offer_count=Count('contract__offer__customer__customer_offers')).filter(customer_offer_count=1).count(),
        'cust_fst_order_aug': order_aug.annotate(customer_offer_count=Count('contract__offer__customer__customer_offers')).filter(customer_offer_count=1).count(),
        'cust_fst_order_sep': order_sep.annotate(customer_offer_count=Count('contract__offer__customer__customer_offers')).filter(customer_offer_count=1).count(),
        'cust_fst_order_oct': order_oct.annotate(customer_offer_count=Count('contract__offer__customer__customer_offers')).filter(customer_offer_count=1).count(),
        'cust_fst_order_nov': order_nov.annotate(customer_offer_count=Count('contract__offer__customer__customer_offers')).filter(customer_offer_count=1).count(),
        'cust_fst_order_dec': order_dec.annotate(customer_offer_count=Count('contract__offer__customer__customer_offers')).filter(customer_offer_count=1).count(),
        'cust_alw_order_jan': order_yan.annotate(customer_offer_count=Count('contract__offer__customer__customer_offers')).filter(customer_offer_count__gt=1).count(),
        'cust_alw_order_feb': order_feb.annotate(customer_offer_count=Count('contract__offer__customer__customer_offers')).filter(customer_offer_count__gt=1).count(),
        'cust_alw_order_mar': order_mar.annotate(customer_offer_count=Count('contract__offer__customer__customer_offers')).filter(customer_offer_count__gt=1).count(),
        'cust_alw_order_apr': order_apr.annotate(customer_offer_count=Count('contract__offer__customer__customer_offers')).filter(customer_offer_count__gt=1).count(),
        'cust_alw_order_may': order_may.annotate(customer_offer_count=Count('contract__offer__customer__customer_offers')).filter(customer_offer_count__gt=1).count(),
        'cust_alw_order_jun': order_jun.annotate(customer_offer_count=Count('contract__offer__customer__customer_offers')).filter(customer_offer_count__gt=1).count(),
        'cust_alw_order_jul': order_jul.annotate(customer_offer_count=Count('contract__offer__customer__customer_offers')).filter(customer_offer_count__gt=1).count(),
        'cust_alw_order_aug': order_aug.annotate(customer_offer_count=Count('contract__offer__customer__customer_offers')).filter(customer_offer_count__gt=1).count(),
        'cust_alw_order_sep': order_sep.annotate(customer_offer_count=Count('contract__offer__customer__customer_offers')).filter(customer_offer_count__gt=1).count(),
        'cust_alw_order_oct': order_oct.annotate(customer_offer_count=Count('contract__offer__customer__customer_offers')).filter(customer_offer_count__gt=1).count(),
        'cust_alw_order_nov': order_nov.annotate(customer_offer_count=Count('contract__offer__customer__customer_offers')).filter(customer_offer_count__gt=1).count(),
        'cust_alw_order_dec': order_dec.annotate(customer_offer_count=Count('contract__offer__customer__customer_offers')).filter(customer_offer_count__gt=1).count(),
        'avarges': avarges[:date.today().month],
        'this_year_total_avg':int(this_year_total_avg),
        'precent': round(precent, 2)
        }
        return render(request, 'orders-list.html', context) 
