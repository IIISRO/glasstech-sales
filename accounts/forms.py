from django import forms
from django.core.exceptions import ValidationError
from .models import User



class RegistrationForm(forms.ModelForm):
    class Meta:
        model = User
        fields = ('first_name','last_name','email','password')
        widgets = {

            'first_name': forms.TextInput(attrs={
                'required':'required',
                'class':"form-control",
                'id':'first-name',
                'placeholder':('Adı')
            }),
            'last_name': forms.TextInput(attrs={
                'required':'required',
                'class':"form-control",
                'id':'last-name',
                'placeholder':('Soyadı')
            }),
            'email': forms.EmailInput(attrs={
                'required':'required',
                'class':"form-control",
                'id':'email',
                'placeholder':('E-mail')
            }),
            'password': forms.PasswordInput(attrs={
                'required':'required',
                'class':"form-control",
                'id':'password',
                'placeholder':('Şifrə')
            })
        }

    def clean_first_name(self):
        return self.cleaned_data['first_name'].capitalize()
    def clean_last_name(self):
        return self.cleaned_data['last_name'].capitalize()
