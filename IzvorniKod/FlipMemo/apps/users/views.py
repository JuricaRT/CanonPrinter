from django.shortcuts import render, redirect
from django.views.generic.list import ListView
from apps.main.models import CustomUser
from apps.main.dto import UserDTO
from django.core.mail import send_mail
from django.contrib import messages
from django.contrib.auth import authenticate, login
from django.http import JsonResponse

def login(request):

    if request.method == 'POST':
        email = request.POST.get('mail')
        password = request.POST.get('password')

        return JsonResponse({'message': 'ok'})
    return JsonResponse({'message': 'no'})
#        email = request.POST.get('email')
#        password = request.POST.get('password')
#
 #       user = authenticate(email=email, password=password)
#
 #       if user is not None:
#            login(request, user)
#            return redirect('profile')
#        else:
#            messages.error('Wrong email or password')
#            return redirect('login')
#
#    return render(request, 'login.html')

def signup(request):

    if request.method == 'POST':
        userDTO = UserDTO(
            username = request.POST.get('username'),
            name = request.POST.get('name'),
            last_name = request.POST.get('last_name'),
            email = request.POST.get('email'),
        )

        unencrypted_pass = request.POST.get('password')

        if CustomUser.objects.filter(username=userDTO.username).exists():
            #todo handle error
            return
        
        if CustomUser.objects.filter(email=userDTO.email).exists():
            #todo handle error
            return

        new_user = CustomUser.objects.create_user(
            username=userDTO.username,
            email=userDTO.email,
            name=userDTO.name,
            last_name=userDTO.last_name,
        )

        new_user.set_password(unencrypted_pass)

        new_user.save()

        #send_mail(
        #    'Inicijalni password',
        #    'Budala',
        #    'settings.EMAIL_HOST_USER',
        #    [email],
        #    fail_silently=False
        #)

        return redirect('login')

    return render(request, 'signup.html')

def profile(request):
    return render(request, 'profile.html')

def edit_profile(request):

    if request.method == 'POST':
        userDTO = UserDTO(
            username = request.POST.get('username'),
            password = request.POST.get('password'),
            name = request.POST.get('name'),
            last_name = request.POST.get('last_name'),
            email = request.POST.get('email')
        )

        try:
            user = CustomUser.objects.get(email=userDTO.email)
        except:
            user = None

        if user == None:
            #Error?
            return redirect('profile')

        user.username = userDTO.username
        user.password = userDTO.password
        user.name = userDTO.name
        user.last_name = userDTO.last_name
        user.email = userDTO.email

        user.save()
        
        return redirect('profile')

    return render(request, 'edit_profile.html')