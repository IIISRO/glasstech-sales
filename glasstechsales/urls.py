"""
URL configuration for glasstechsales project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('admin/', admin.site.urls),
    path('ckeditor/', include('ckeditor_uploader.urls')),
    path('', include('core.urls', namespace="core")),
    path('customers/', include('customers.urls', namespace="customers")),
    path('sales/', include('sales.urls', namespace="sales")),
    path('accounts/', include('accounts.urls', namespace="accounts")),
    path('api/v1/sales/', include('sales.api.urls', namespace = 'salesApi')),
    path('api/v1/core/', include('core.api.urls', namespace = 'coreApi')),
    path('products/', include('products.urls', namespace="products")),


]
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT) + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

handler404 = 'core.views.error_404_view'