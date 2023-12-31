from django.shortcuts import render, redirect
from django.contrib.auth.views import LoginView
from django.views.generic import View
from .forms import RegistrationForm
from  .helpers import send_pass
from django.urls import reverse_lazy
from django.http import Http404
from django.contrib import messages


# from django.urls import reverse

# Create your views here.

class LoginPageView(LoginView):
    redirect_authenticated_user = True
    template_name = 'login.html'

class RegisterView(View):
    def get(self, request):
        if request.user.is_superuser:
            form =  RegistrationForm()
            return render(request, 'register.html', context={'form':form})
        raise Http404
    def post(self, request):
        if request.user.is_superuser:
            form = RegistrationForm(request.POST)
            if form.is_valid():
                user = form.save(commit=False)
                user.set_password(form.cleaned_data['password'])
                user.username = f'{user.first_name}{user.last_name}'
                user.save()
                send_pass(user.username ,form.cleaned_data['password'], user.email)
                messages.success(request, 'İstifadəçi adı və şifrə mail-ə göndərildi')
                return redirect(reverse_lazy('core:dashboard'))
        raise Http404