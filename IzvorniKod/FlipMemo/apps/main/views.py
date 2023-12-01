from django.http import JsonResponse
from apps.main.models import CustomUser, PermissionLevel
import json

from rest_framework.views import APIView
from rest_framework import permissions
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect
from django.utils.decorators import method_decorator

class AdminStatusView(APIView):
    def post(self, request, format=None):
        try:
            user_email = self.request.data["email"]
            user = CustomUser.objects.get(email=user_email)

            return JsonResponse({'isAdmin': user.permission_level == PermissionLevel.ADMIN_LEVEL})
        except:
            return JsonResponse({"error": "something wrong with admin status"})

class DeleteUserView(APIView):
    def get(self, request, format=None):
        user_mail = self.request.data["email"]
        try:
            CustomUser.objects.get(email=user_mail).delete()

            return JsonResponse({ 'success': 'User deleted successfully' })
        except Exception as e:
            print(e)
            return JsonResponse({ 'error': 'Something went wrong when trying to delete user' })


class GetStudentsView(APIView):
    def get(self, request, format=None):
        students = CustomUser.objects.filter(permission_level=PermissionLevel.USER_LEVEL)

        students_list = []

        for student in students:
            students_list.append(student.to_dict())

        json_data = json.dumps(students_list)
        
        return JsonResponse(json_data, content_type='application/json', safe=False)   


class GetAdministratorsView(APIView):
    def get(self, request, format=None):
        admins = CustomUser.objects.filter(permission_level=PermissionLevel.ADMIN_LEVEL)

        admins_list = []
        
        for admin in admins:
            admins_list.append(admin.to_dict())

        json_data = json.dumps(admins_list)

        return JsonResponse(json_data, content_type='application/json', safe=False) 

class AddAdministratorView(APIView):
    def post(self, request, format=None):
        
        user_email = self.request.data["email"]

        try:
            user = CustomUser.objects.get(email=user_email)
            user.is_superuser = True
            user.permission_level = PermissionLevel.ADMIN_LEVEL
            user.save()
            return JsonResponse({"success": "yes"})
        
        except CustomUser.DoesNotExist:
            #TODO: handle
            pass        

class RemoveAdministratorView(APIView):
    def post(self, request, format=None):

        user_email = self.request.data["email"]
        
        try:
            user = CustomUser.objects.get(email=user_email)
            user.is_superuser = False
            user.permission_level = PermissionLevel.USER_LEVEL
            user.save()
            return JsonResponse({"success": "yes"})
        
        except CustomUser.DoesNotExist:
            #TODO: handle
            pass