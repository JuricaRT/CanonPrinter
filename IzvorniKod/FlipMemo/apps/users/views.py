from django.shortcuts import render, redirect, HttpResponse
from django.views.generic.list import ListView
from apps.main.models import CustomUser
from apps.main.dto import UserDTO
from django.core.mail import send_mail
from django.contrib import messages
from django.contrib.auth import authenticate, login
from django.views import View
from django.http import JsonResponse
import json
import smtplib


class UsersView():

    @staticmethod
    def login_user(request):

        if request.method == 'POST':
            json_data = json.loads(request.body.decode('utf-8'))
            mail = json_data.get('mail')
            password = json_data.get('password')

            print(f'{mail} {password}')

            user = authenticate(email=mail, password=password)

            if user is not None:
                login(request, user)
                return JsonResponse({'message': 'ok'})
            else:
                messages.error('Wrong username or password')
                return JsonResponse({'message': 'invalid'})

    @staticmethod
    def signup(request):
        if request.method == 'POST':
            json_data = json.loads(request.body.decode('utf-8'))

            print("HERE")

            userDTO = UserDTO(
                username=None,
                name=None,
                last_name=None,
                email=json_data.get('mail'),
                password=None,
                permission_level=None
            )

            print(userDTO.email)

            if CustomUser.objects.filter(username=userDTO.username).exists():
                # todo handle error
                return

            if CustomUser.objects.filter(email=userDTO.email).exists():
                # todo handle error
                return

            new_user = CustomUser.objects.create_user(
                username=userDTO.username,
                email=userDTO.email,
                name=userDTO.name,
                last_name=userDTO.last_name,
            )

            initial_pass = 'canonprinter'

            new_user.set_password(initial_pass)

            new_user.save()

            try:
                send_mail(
                    'Welcome to FlipMemo',
                    f'Thank you for registering. Your initial password is: {initial_pass}',
                    'settings.EMAIL_HOST_USER',
                    [userDTO.email],
                    fail_silently=False
                )
            except smtplib.SMTPServerDisconnected as e:
                print(f'SMTPServerDisconnected: {e}')

            return JsonResponse({'message': 'ok'})

    @staticmethod
    def profile(request):
        return render(request, 'profile.html')

    @staticmethod
    def edit_profile(request):

        if request.method == 'POST':
            userDTO = UserDTO(
                username=request.POST.get('username'),
                password=None,
                name=request.POST.get('name'),
                last_name=request.POST.get('last_name'),
                email=request.POST.get('email'),
                permission_level=None
            )

            try:
                user = CustomUser.objects.get(email=userDTO.email)
            except:
                user = None

            if user == None:
                # Error?
                return redirect('profile')

            user.username = userDTO.username
            user.name = userDTO.name
            user.last_name = userDTO.last_name
            user.email = userDTO.email

            user.save()

            return redirect('profile')

        return render(request, 'edit_profile.html')
