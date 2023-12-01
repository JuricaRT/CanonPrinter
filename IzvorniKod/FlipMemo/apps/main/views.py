from django.http import JsonResponse
from apps.main.models import CustomUser, PermissionLevel
from apps.main.database import Database as db
import dataclasses
import json

from rest_framework.views import APIView
from rest_framework import permissions
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect
from django.utils.decorators import method_decorator

class DeleteUserView(APIView):
    def get(self, request, format=None):
        user_mail = self.request.data["email"]
        try:
            database = db()
            
            database.delete_user(user_mail)

            CustomUser.objects.get(email=user_mail).delete()

            return JsonResponse({ 'success': 'User deleted successfully' })
        except Exception as e:
            print(e)
            return JsonResponse({ 'error': 'Something went wrong when trying to delete user' })


class GetStudentsView(APIView):
    def get(self, request, format=None):
        database = db()
        students = database.get_students()
        students_dict = []
        for student in students:
            students_dict.append(dataclasses.asdict(student))
        json_data = json.dumps(students_dict)

        return JsonResponse(json_data, content_type='application/json', safe=False)   


class GetAdministratorsView(APIView):
    def get(self, request, format=None):
        database = db()
        admins = database.get_admins()
        admins_dict = []
        for admin in admins:
            admins_dict.append(dataclasses.asdict(admin))
        json_data = json.dumps(admins_dict)

        return JsonResponse(json_data, content_type='application/json', safe=False) 


def set_admin_rights(state, user):
    old_userDTO = user.to_dto()
    user.permission_level = PermissionLevel.ADMIN_LEVEL if state else PermissionLevel.USER_LEVEL
    user.is_superuser = state
    user.save()
    userDTO = user.to_dto()
    database = db()
    database.modify_user(old_userDTO, userDTO)

class AddAdministratorView(APIView):
    def post(self, request, format=None):
        json_data = json.loads(request.body.decode('utf-8'))
        mail = json_data.get('email')

        try:
            user = CustomUser.objects.get(email=mail)
            set_admin_rights(True, user)
            return JsonResponse({"success": "yes"})

        
        except CustomUser.DoesNotExist:
            #TODO: handle
            pass        

class RemoveAdministratorView(APIView):
    def post(self, request, format=None):
        json_data = json.loads(request.body.decode('utf-8'))
        mail = json_data.get('email')

        try:
            user = CustomUser.objects.get(email=mail)
            set_admin_rights(False, user)
            return JsonResponse({"success": "yes"})
        except CustomUser.DoesNotExist:
            #TODO: handle
            pass