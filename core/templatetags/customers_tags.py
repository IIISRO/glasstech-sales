from django import template
from customers.models import Customer

register = template.Library()

@register.simple_tag
def CustomersList():
    customers = Customer.objects.all().order_by('c_category')
    return customers