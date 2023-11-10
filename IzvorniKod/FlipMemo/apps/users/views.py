from django.shortcuts import render
from django.views.generic.edit import CreateView
from django.views.generic.list import ListView
from apps.main.models import CustomUser
from django.urls import reverse_lazy
from .forms import SignupForm
from apps.main.dto import UserDTO
from django.core.mail import send_mail

class SignupView(CreateView):
    form_class = SignupForm
    template_name = 'signup.html'
    success_url = reverse_lazy('login')
    
    def form_valid(self, form):
        
        user_dto = UserDTO(
            user_name='',
            password='',
            name='',
            last_name='',
            email=form.cleaned_data['email'],
            permission_level=0
        )

        initial_password = '12345678'
        send_mail(
            'Your initial password',
            'Your initial password is: {initial_password}',
            'lov587395@gmail.com',
            [user_dto.email],
            fail_silently=False,
        )

        return super().form_valid(form)
    

class ProfileView(ListView):
    model = CustomUser
    fields = ['user_name', 'name', 'last_name', 'email', 'password']
    template_name = 'profile.html'
    login_required = True
