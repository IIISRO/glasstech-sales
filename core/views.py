from django.shortcuts import render
from sales.models  import Offer, Order
from customers.models import Customer
from datetime import date
# Create your views here.


def error_404_view(request, exception):
    return render(request, '404.html')


def dashboard(request):
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
        
    last_month_offer = Offer.objects.filter(created_at__year= date.today().year, created_at__month=date.today().month - 1).count()
    this_month_offer = Offer.objects.filter(created_at__year= date.today().year, created_at__month=date.today().month).count()
    if  not last_month_offer == 0:
        precent_offer = ((this_month_offer - last_month_offer) / last_month_offer) * 100
    else:
        precent_offer = this_month_offer
    context = {
        'suc_offer_count': Offer.objects.filter(status = 'Uğurlu').filter(created_at__year= date.today().year, created_at__month=date.today().month).count(),
        'fail_offer_count': Offer.objects.filter(status = 'Uğursuz').filter(created_at__year= date.today().year, created_at__month=date.today().month).count(),
        'active_order_count': Order.objects.filter(status = 'Davamedir').filter(created_at__year= date.today().year, created_at__month=date.today().month).count(),
        'customers_count': Customer.objects.filter(created_at__year= date.today().year, created_at__month=date.today().month).count(),
        'avarges': avarges[:date.today().month],
        'this_year_total_avg':int(this_year_total_avg),
        'precent_order': round(precent, 2),
        'date_year': f'1/1/{date.today().year}-{date.today().day}/{date.today().month}/{date.today().year}',
        'precent_offer':precent_offer

    }
    
        
    return render(request,'dashboard.html',context=context)

