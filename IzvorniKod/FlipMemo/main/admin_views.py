from django.http import JsonResponse
from .models import CustomUser, PermissionLevel
import json

from rest_framework.views import APIView
from rest_framework import permissions
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect
from django.utils.decorators import method_decorator

class DeleteUserViewAdmin(APIView):
    permission_classes = (permissions.IsAdminUser, )

    def post(self, request, format=None):
        try:
            CustomUser.objects.get(email=request.data["email"]).delete()

            return JsonResponse({ 'success': 'User deleted successfully' })
        except Exception as e:
            print(e)
            return JsonResponse({ 'error': 'Something went wrong when trying to delete user' })


class GetStudentsView(APIView):
    permission_classes = (permissions.IsAdminUser, )

    def get(self, request, format=None):
        #students = CustomUser.objects.filter(permission_level=PermissionLevel.USER_LEVEL)
        #students = CustomUser.objects.filter(is_staff=False)
        users = CustomUser.objects.all()

        students_list = []

        for user in users:
            if (not user.__dict__["is_staff"]):
                students_list.append(user.to_dict())

        json_data = json.dumps(students_list)
        
        return JsonResponse({'students': json_data}, content_type='application/json', safe=False)   


class GetAdministratorsView(APIView):
    permission_classes = (permissions.IsAdminUser, )

    def get(self, request, format=None):
        #admins = CustomUser.objects.filter(permission_level=PermissionLevel.ADMIN_LEVEL)
        #admins = CustomUser.objects.filter(is_staff=True)
        users = CustomUser.objects.all()
    
        admins_list = []

        for user in users:
            if (user.__dict__["is_staff"]):
                admins_list.append(user.to_dict())

        json_data = json.dumps(admins_list)

        return JsonResponse({'admins': json_data}, content_type='application/json', safe=False) 


class AddAdministratorView(APIView):
    permission_classes = (permissions.IsAdminUser, )

    def post(self, request, format=None):
        try:
            user = CustomUser.objects.get(email=request.data["email"])
            user.is_superuser = True
            user.is_staff = True
            user.permission_level = PermissionLevel.ADMIN_LEVEL # TODO: makni ovo
            user.save()
            return JsonResponse({"success": "yes"})
        
        except CustomUser.DoesNotExist:
            pass        


class RemoveAdministratorView(APIView):
    permission_classes = (permissions.IsAdminUser, )

    def post(self, request, format=None):
        try:
            user = CustomUser.objects.get(email=request.data["email"])
            user.is_superuser = False
            user.is_staff = False
            user.permission_level = PermissionLevel.USER_LEVEL # TODO: makni ovo
            user.save()
            return JsonResponse({"success": "yes"})
        
        except CustomUser.DoesNotExist:
            pass