from django.shortcuts import render, redirect
from django.views.generic.list import ListView
from apps.main.models import CustomUser
from apps.main.dto import UserDTO
from django.core.mail import send_mail
from django.contrib import messages
from django.contrib.auth import authenticate, login

def login(request):

    if request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')

#        user = authenticate(email=email, password=password)

#        if user is not None:
#            login(request, user)
#            return redirect('profile')
#        else:
#            messages.error('Wrong email or password')
#            return redirect('login')

    return render(request, 'login.html')

def signup(request):

    if request.method == 'POST':
        email = request.POST.get('email')

        user = CustomUser()
        user.email = email
        user.name = ''
        user.username = ''
        user.password = ''
        user.permission_level = 0
        user.last_name = ''

#        if CustomUser.objects.filter(email=email):
#            messages.error(request, 'Email already exists!')

#        user.save()

        send_mail(
            'Inicijalni password',
            'Budala',
            'settings.EMAIL_HOST_USER',
            [email],
            fail_silently=False
        )

        return redirect('login')

    return render(request, 'signup.html')

def profile(request):
    return render(request, 'profile.html')

def edit_profile(request):

    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        name = request.POST.get('name')
        last_name = request.POST.get('last_name')
        email = request.POST.get('email')

        user = CustomUser()
        user.username = username
        user.password = password
        user.name = name
        user.last_name = last_name
        user.email = email

#        user.save()
        
        return redirect('profile')

    return render(request, 'edit_profile.html')