from django.shortcuts import render, HttpResponse, redirect
from django.http import JsonResponse
from apps.main.models import CustomUser, PermissionLevel
from apps.main import apis
from django.contrib.auth.decorators import user_passes_test
from django.core import serializers

def temp_func(request):
    return HttpResponse("Test")

@user_passes_test(lambda user: user.permission_level == PermissionLevel.ADMIN_LEVEL)
def get_students(request):
    if request.method == 'GET':
        students = CustomUser.objects.filter(permission_level=PermissionLevel.USER_LEVEL)
        serializer = serializers.get_serializer('xml')
        xml_serializer = serializer()
        xml_data = xml_serializer.serialize(students)
        return HttpResponse(xml_data, content_type='application/xml')

@user_passes_test(lambda user: user.permission_level == PermissionLevel.ADMIN_LEVEL)
def get_administrators(request):
    if request.method == 'GET':
        admins = CustomUser.objects.filter(permission_level=PermissionLevel.ADMIN_LEVEL)
        serializer = serializers.get_serializer('xml')
        xml_serializer = serializer()
        xml_data = xml_serializer.serialize(admins)
        return HttpResponse(xml_data, content_type='application/xml')

@user_passes_test(lambda user: user.permission_level == PermissionLevel.ADMIN_LEVEL)
def add_administrator(request):
    if request.method == 'POST':
        username = request.POST.get("username")

        try:
            user = CustomUser.objects.get(username=username)
            set_admin_rights(True, user)
            return redirect('Test') #TODO change this
        except CustomUser.DoesNotExist:
            #TODO: handle
            pass
        
@user_passes_test(lambda user: user.permission_level == PermissionLevel.ADMIN_LEVEL)
def remove_administrator(request):
    if request.method == 'POST':
        username = request.POST.get("username")

        try:
            user = CustomUser.objects.get(username=username)
            set_admin_rights(False, user)
            return redirect('Test') #TODO change this
        except CustomUser.DoesNotExist:
            #TODO: handle
            pass

def set_admin_rights(state, user):
    user.permission_level = PermissionLevel.ADMIN_LEVEL if state else PermissionLevel.USER_LEVEL
    user.is_superuser = state
    user.save()

def delete_user(request):
    if request.method == 'POST':
        username = request.POST.get("username")

        try:
            user = CustomUser.objects.get(username=username)
            user.delete()
        except CustomUser.DoesNotExist:
            #todo: handle
            pass

        return HttpResponse("Test")
