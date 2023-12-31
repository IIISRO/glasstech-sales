from django.urls import path
from .views import BacklogCreateApi

app_name = 'coreApi'

urlpatterns = [
    
    path('create/backlog', BacklogCreateApi.as_view(), name='backlog-createapi'),

]