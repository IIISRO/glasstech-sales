from django.utils.deprecation import MiddlewareMixin
from django.urls import reverse_lazy
from django.shortcuts import redirect

class CheckUserIsAuthenticatedMiddleware(MiddlewareMixin):
    def process_request(self, request):
     if not request.user.is_authenticated and request.path != reverse_lazy('accounts:login'):
            if request.path == '/admin/' or request.path == '/admin/login/':
                pass
            else:
                return redirect(reverse_lazy('accounts:login'))