from django.shortcuts import render, redirect, HttpResponse
from django.views.generic.list import ListView
from apps.main.models import CustomUser
from apps.main.dto import UserDTO
from django.core.mail import send_mail
from django.contrib import messages
from django.contrib.auth import authenticate, login
from django.views import View
from django.http import JsonResponse
from django.conf import settings
import json
import smtplib
import random
import string
from apps.main.database import Database as db
import dataclasses

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
                print('Wrong username or password')
                return JsonResponse({'message': 'invalid'})

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
                has_initial_pass=True
            )

            print(userDTO.email)

            if CustomUser.objects.filter(email=userDTO.email).exists():
                # todo handle error
                return

            new_user = CustomUser.objects.create_user(
                username=userDTO.username,
                email=userDTO.email,
                name=userDTO.name,
                last_name=userDTO.last_name,
            )

            rand_pass = ''.join(random.SystemRandom().choice(string.ascii_uppercase + string.digits + string.ascii_lowercase) for _ in range(20))

            new_user.set_password(rand_pass)

            userDTO.password = new_user.password
            userDTO.permission_level = 0
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
        
        if request.method == 'GET':
            user = request.user
            database = db()
            users = database.get_users()
            for u in users:
                if u == user:
                    user_dict = dataclasses.asdict(u)
                    json_data = json.dumps(user_dict)

                return JsonResponse(json_data, content_type='application/json')

    @staticmethod
    def edit_profile(request):

        if request.method == 'POST':
            json_data = json.loads(request.body.decode('utf-8'))

            userDTO = UserDTO(
                username=json_data.get('username'),
                password=json_data.get('password'),
                name=json_data.get('name'),
                last_name=json_data.get('last_name'),
                email=json_data.get('email'),
                permission_level=None
            )

            try:
                user = CustomUser.objects.get(email=userDTO.email)
            except:
                user = None

            if user == None:
                # Error?
                return

            old_userDTO = user.to_dto()

            user.username = userDTO.username
            user.name = userDTO.name
            user.last_name = userDTO.last_name
            user.email = userDTO.email
            user.set_password(userDTO.password)

            new_userDTO = user.to_dto()
            database = db()
            database.modify_user(old_userDTO, new_userDTO)

            user.save()

            return JsonResponse({'message': 'ok'})
