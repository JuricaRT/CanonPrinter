from django.shortcuts import render, redirect
from django.views.generic.list import ListView
<<<<<<< HEAD
from apps.main.models import User
=======
from apps.main.models import CustomUser
from django.urls import reverse_lazy
from .forms import SignupForm
>>>>>>> refs/remotes/origin/dev
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
    model = CustomUser
    fields = ['user_name', 'name', 'last_name', 'email', 'password']
    template_name = 'profile.html'
    login_required = True
