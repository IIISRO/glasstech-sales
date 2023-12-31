
from django import forms
from .models import Customer

class CreateCustomerForm(forms.ModelForm):

    name = forms.CharField(
        required=True,
        widget=forms.TextInput(
            attrs={'placeholder': 'Ad', 'class': 'form-control'}
    ))
    surname = forms.CharField(
        required=True,
        widget=forms.TextInput(
            attrs={'placeholder': 'Soyad', 'class': 'form-control'}
    ))
    company_name = forms.CharField(
        required=False,
        widget=forms.TextInput(
            attrs={'placeholder': 'Firma adı', 'class': 'form-control'}
    ))
    email = forms.EmailField(
        required=False,
        widget=forms.TextInput(
            attrs={'placeholder': 'E-mail', 'class': 'form-control'}
    ))
    web = forms.CharField(
        required=False,
        max_length=30,
        widget=forms.TextInput(
            attrs={'placeholder': 'Link', 'class': 'form-control'}
    ))
    bio = forms.CharField(
        required=False,
        max_length=70,
        widget=forms.TextInput(
            attrs={'placeholder': 'Bio', 'class': 'form-control'}
    ))
    phone = forms.CharField(
        required=False,
        max_length=20,
        widget=forms.TextInput(
            attrs={'placeholder': 'Telefon', 'class': 'form-control'}
    ))
    mobile = forms.CharField(
        required=True,
        max_length=20,
        widget=forms.TextInput(
            attrs={'placeholder': 'Mobil', 'class': 'form-control'}
    ))
    reference = forms.ChoiceField(
        choices=Customer.REFERENCES,
        widget=forms.Select(
            attrs={'placeholder': 'Referans', 'class': 'form-control'}
    ))
    c_type = forms.ChoiceField(
        choices=Customer.C_TYPES,
        widget=forms.Select(
            attrs={'placeholder': 'Müştəri tipi', 'class': 'form-control'}
    ))
    c_category = forms.ChoiceField(
        choices=Customer.C_CATEGORIES,
        widget=forms.Select(
            attrs={'placeholder': 'Müştəri kateqoriyası', 'class': 'form-control'}
    ))
    pp = forms.ImageField(
        required=False,
        widget=forms.FileInput(
            attrs={'class': 'custom-file-input', 'id': 'customFile'}
    ))


    class Meta:
        model = Customer
        fields = [
            'name',
            'surname',
            'company_name',
            'email',
            'phone',
            'mobile',
            'web',
            'bio',
            'reference',
            'c_type',
            'c_category',
            'pp'
        ]
