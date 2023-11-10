from django.shortcuts import render, redirect
from django.views.generic.list import ListView
from apps.main.models import User
from apps.main.dto import UserDTO
from django.core.mail import send_mail

def login(request):
    return render(request, 'login.html')

def signup(request):

    if request.method == 'POST':
        email = request.POST.get('email')

        user = User
        user.email = email

        user.save()

        return redirect('login')

    return render(request, 'signup.html')

class ProfileView(ListView):
    model = User
    fields = ['user_name', 'name', 'last_name', 'email', 'password']
    template_name = 'profile.html'
    login_required = True
