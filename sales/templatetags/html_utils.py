from django import template
from django.utils.safestring import mark_safe
import html
import re

register = template.Library()

@register.filter
def decode_and_strip(value):
    if not value:
        return ''
    text_only = re.sub(r'<[^>]*?>', '', value)
    decoded = html.unescape(text_only)
    return mark_safe(decoded)
