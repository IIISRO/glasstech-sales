from django.contrib import admin
from .models import Backlog, TermsOfSale
# Register your models here.

admin.site.register(Backlog)
admin.site.register(TermsOfSale)



# @admin.register(TermsOfSale)
# class TermsOfSaleAdmin(admin.ModelAdmin):
#     list_display = ('get_title_display', 'is_active', 'created_at', 'updated_at')
#     list_filter = ('title', 'is_active')
#     search_fields = ('content',)
#     ordering = ('-created_at',)
#     readonly_fields = ('created_at', 'updated_at')
#
#     fieldsets = (
#         (None, {
#             'fields': ('title', 'content', 'is_active')
#         }),
#         ('Tarixlər', {
#             'fields': ('created_at', 'updated_at'),
#             'classes': ('collapse',)
#         }),
#     )

