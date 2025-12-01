from django.views.decorators.cache import cache_page
from django.urls import path
from .views import dashboard

app_name = 'core'




urlpatterns = [
    path("", cache_page(60 * 5)(dashboard), name="dashboard"),
]
