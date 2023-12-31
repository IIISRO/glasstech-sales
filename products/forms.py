
from django import forms
from .models import Product

class CreateProductForm(forms.ModelForm):

    name = forms.CharField(
        required=True,
        widget=forms.TextInput(
            attrs={'placeholder': 'Adı', 'class': 'form-control'}
    ))
    unit = forms.CharField(
        required=True,
        widget=forms.TextInput(
            attrs={'placeholder': 'Vahidi', 'class': 'form-control'}
    ))

    category = forms.ChoiceField(
        choices=Product.CATEGORIES,
        required=True,
        widget=forms.Select(
            attrs={'placeholder': 'Kateqoriyası', 'class': 'form-control'}
    ))


    class Meta:
        model = Product
        fields = [
            'name',
            'unit',
            'category',
        ]
