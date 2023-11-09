from apps.main.models import User
from django.contrib.auth.forms import AuthenticationForm
from django.forms import ModelForm
from django import forms


class UserLoginForm(AuthenticationForm):
    username = forms.CharField(label='Email', widget=forms.TextInput(
        attrs={'class': 'form-control'}))
    password = forms.CharField(widget=forms.PasswordInput(
        attrs={'class': 'form-control'}))

class SignupForm(ModelForm):
    class Meta:
        model = User
        fields = ['email']
