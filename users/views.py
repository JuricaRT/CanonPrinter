from django.shortcuts import render, redirect, HttpResponse
from django.views.generic.list import ListView
from main.models import CustomUser
from main.dto import UserDTO
from django.core.mail import send_mail
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from django.views import View
from django.http import JsonResponse
from django.conf import settings
import json
import smtplib
import random
import string
from main.database import Database as db
import dataclasses
from django.contrib.auth.decorators import login_required
from main import dto

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
                _pass = user.password
                send_json_data = (
                    {
                        'has_initial_pass': user.has_initial_pass,
                        'email': mail,
                        'password': _pass,
                        'is_authenticated': True, 
                        'message': 'ok',
                    }
                )
                return JsonResponse(send_json_data, safe=False)
            else:
                print('Wrong username or password')
                return JsonResponse({'message': 'invalid'})

    @staticmethod
    def logout_user(request):

        if request.method == 'POST':
            try:
                logout(request)
                send_json_data = (
                    {
                        'message': 'ok'
                    }
                )
            except Exception as e:
                print(e)
                send_json_data = (
                    {
                        'message': 'logout_fail',
                    }
                )                
            return JsonResponse(send_json_data, safe=False)



    @staticmethod
    def signup(request):
        if request.method == 'POST':
            json_data = json.loads(request.body.decode('utf-8'))

            userDTO = UserDTO(
                username="DefaultUser",
                name="John",
                last_name="Doe",
                email=json_data.get('mail'),
                password=None,
                permission_level=None,
                has_initial_pass=None
            )

            print(userDTO.email)

            if CustomUser.objects.filter(email=userDTO.email).exists():
                # todo handle error
                return JsonResponse({'status': 'exists'})

            new_user = CustomUser.objects.create_user(
                username=userDTO.username,
                email=userDTO.email,
                name=userDTO.name,
                last_name=userDTO.last_name,
            )

            rand_pass = ''.join(random.SystemRandom().choice(
                string.ascii_uppercase + string.digits + string.ascii_lowercase) for _ in range(20))

            new_user.set_password(rand_pass)

            userDTO.password = new_user.password
            userDTO.permission_level = 0
            userDTO.has_initial_pass = True
            database = db()
            database.add_user(userDTO)

            new_user.save()

            try:
                send_mail(
                    'Welcome to FlipMemo',
                    f'Thank you for registering. Your initial password is: {rand_pass}',
                    settings.EMAIL_HOST_USER,
                    [userDTO.email],
                    fail_silently=False
                )
            except smtplib.SMTPServerDisconnected as e:
                print(f'SMTPServerDisconnected: {e}')

            return JsonResponse({'message': 'ok'})

    @staticmethod
    def profile(request):

        if request.method == 'POST':
            json_data = json.loads(request.body.decode('utf-8'))
            print(json_data)
            userDTO = UserDTO(
                username='',
                password='',
                name='',
                last_name='',
                email=json_data.get('mail'),
                permission_level=None,
                has_initial_pass=None
            )

            try:
                user = CustomUser.objects.get(email=userDTO.email)
            except:
                user = None

            if user == None:
                # Error?
                return

            send_json_data = (
                {
                    'username': user.username,
                    'password': user.password,
                    'name': user.name,
                    'last_name': user.last_name,
                    'email': user.email
                }
            )

            return JsonResponse(send_json_data, content_type='application/json')
        
    @staticmethod
    def admin_status(request):
        if request.method == 'POST':
            json_data = json.loads(request.body.decode('utf-8'))
            user = CustomUser.objects.get(email=json_data.get('email'))

            json_return = ({'isAdmin': dto.permission_level_to_int(user.permission_level)})
            return JsonResponse(json_return, content_type='application/json')


    @staticmethod
    def edit_profile(request):

        if request.method == 'POST':
            json_data = json.loads(request.body.decode('utf-8'))

            userDTO = UserDTO(
                username=json_data.get('username') or None,
                password=json_data.get('password') or None,
                name=json_data.get('name') or None,
                last_name=json_data.get('last_name') or None,
                email=json_data.get('mail'),
                permission_level=None,
                has_initial_pass=json_data.get('initialPass') or False
            )
            print(userDTO)
            try:
                user = CustomUser.objects.get(email=userDTO.email)
            except:
                user = None

            if user == None:
                # Error?
                return

            old_userDTO = user.to_dto()

            if userDTO.username is not None:
                user.username = userDTO.username
            if userDTO.username is not None:
                user.name = userDTO.name
            if userDTO.username is not None:
                user.last_name = userDTO.last_name
            user.has_initial_pass = userDTO.has_initial_pass
            if userDTO.password is not None:
                user.set_password(userDTO.password)

            user.save()
            new_userDTO = user.to_dto()
            print(old_userDTO)
            print(new_userDTO)
            database = db()
            database.modify_user(old_userDTO, new_userDTO)

            return JsonResponse({'message': 'ok'})
