from django.http import JsonResponse
from .models import CustomUser
import json

from rest_framework.views import APIView
from rest_framework import permissions
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect
from django.utils.decorators import method_decorator


class DeleteUserViewAdmin(APIView):
    permission_classes = (permissions.IsAdminUser, )

    def put(self, request, format=None):
        try:
            CustomUser.objects.get(email=request.data["email"]).delete()

            return JsonResponse({'success': 'User deleted successfully', 'email': request.data["email"]}, content_type='application/json', safe=False)
        except Exception as e:
            print(e)
            return JsonResponse({'error': 'Something went wrong when trying to delete user'})


class GetStudentsView(APIView):
    permission_classes = (permissions.IsAdminUser, )

    def get(self, request, format=None):
        students = CustomUser.objects.filter(is_staff__in=[False])

        students_list = []

        for student in students:
            students_list.append(student.to_dict())

        json_data = json.dumps(students_list)

        return JsonResponse({'students': json_data}, content_type='application/json', safe=False)


class GetAdministratorsView(APIView):
    permission_classes = (permissions.IsAdminUser, )

    def get(self, request, format=None):
        admins = CustomUser.objects.filter(is_staff__in=[True])

        admins_list = []

        for admin in admins:
            admins_list.append(admin.to_dict())

        json_data = json.dumps(admins_list)

        return JsonResponse({'admins': json_data}, content_type='application/json', safe=False)


class AddAdministratorView(APIView):
    permission_classes = (permissions.IsAdminUser, )

    def put(self, request, format=None):
        try:
            user = CustomUser.objects.get(email=request.data["email"])
            user.is_superuser = True
            user.is_staff = True
            user.save()

            return JsonResponse({'success': 'yes', 'email': request.data["email"]}, content_type='application/json', safe=False)

        except CustomUser.DoesNotExist:
            pass


class RemoveAdministratorView(APIView):
    permission_classes = (permissions.IsAdminUser, )

    def put(self, request, format=None):
        try:
            user = CustomUser.objects.get(email=request.data["email"])
            user.is_superuser = False
            user.is_staff = False
            user.save()

            return JsonResponse({'success': 'yes', 'email': request.data["email"]}, content_type='application/json', safe=False)

        except CustomUser.DoesNotExist:
            pass
