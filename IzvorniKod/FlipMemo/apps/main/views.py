from django.shortcuts import render, HttpResponse, redirect
from django.http import JsonResponse
from apps.main.models import CustomUser, PermissionLevel
from apps.main import apis
from django.contrib.auth.decorators import user_passes_test
from django.views import View
from apps.main.database import Database as db
from dataclasses import dataclass
import dataclasses
import json
from apps.main.dto import UserDTO

class MainViews():

    def temp_func(request):
        return HttpResponse("Test")

    #@user_passes_test(lambda user: user.permission_level == PermissionLevel.ADMIN_LEVEL)
    @staticmethod
    def get_students(request):
        if request.method == 'GET':
            database = db()
            students = database.get_students()
            students_dict = []
            for student in students:
                students_dict.append(dataclasses.asdict(student))
            json_data = json.dumps(students_dict)

            return JsonResponse(json_data, content_type='application/json', safe=False)

    #@user_passes_test(lambda user: user.permission_level == PermissionLevel.ADMIN_LEVEL)
    @staticmethod
    def get_administrators(request):
        if request.method == 'GET':
            database = db()
            admins = database.get_admins()
            admins_dict = []
            for admin in admins:
                admins_dict.append(dataclasses.asdict(admin))
            json_data = json.dumps(admins_dict)

            return JsonResponse(json_data, content_type='application/json', safe=False)

    #@user_passes_test(lambda user: user.permission_level == PermissionLevel.ADMIN_LEVEL)
    @staticmethod
    def add_administrator(request):
        if request.method == 'POST':
            json_data = json.loads(request.body.decode('utf-8'))
            mail = json_data.get('mail')

            try:
                user = CustomUser.objects.get(email=mail)
                MainViews.set_admin_rights(True, user)
                return redirect('Test') #TODO change this
            except CustomUser.DoesNotExist:
                #TODO: handle
                pass
            
    @staticmethod
    #@user_passes_test(lambda user: user.permission_level == PermissionLevel.ADMIN_LEVEL)
    def remove_administrator(request):
        if request.method == 'POST':
            json_data = json.loads(request.body.decode('utf-8'))
            mail = json_data.get('mail')

            try:
                user = CustomUser.objects.get(email=mail)
                MainViews.set_admin_rights(False, user)
                return redirect('Test') #TODO change this
            except CustomUser.DoesNotExist:
                #TODO: handle
                pass

    @staticmethod
    def set_admin_rights(state, user):
        old_userDTO = user.to_dto()
        user.permission_level = PermissionLevel.ADMIN_LEVEL if state else PermissionLevel.USER_LEVEL
        user.is_superuser = state
        user.save()
        userDTO = user.to_dto()
        database = db()
        database.modify_user(old_userDTO, userDTO)

    @staticmethod
    def delete_user(request):
        if request.method == 'POST':
            json_data = json.loads(request.body.decode('utf-8'))

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
                userDTO = user.to_dto()
                database = db()
                database.delete_user(userDTO)
                user.delete()
            except CustomUser.DoesNotExist:
                #todo: handle
                pass

            return JsonResponse({'message': 'deleted'})
