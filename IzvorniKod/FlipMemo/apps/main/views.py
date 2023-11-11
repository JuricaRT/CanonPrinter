from django.shortcuts import render, HttpResponse, redirect
from apps.main.models import CustomUser, PermissionLevel
from apps.main import apis

def temp_func(request):
    return HttpResponse("Test")

def get_students(request):
    if request.method == 'GET':
        admins = CustomUser.objects.filter(permission_level=PermissionLevel.USER_LEVEL)
        return render(request, 'Test', {'admins': admins})
    pass

def get_administrators(request):
    if request.method == 'GET':
        admins = CustomUser.objects.filter(permission_level=PermissionLevel.ADMIN_LEVEL)
        return render(request, 'Test', {'admins': admins})
    pass

def add_administrator(request):
    if request.method == 'POST':
        username = request.POST.get("username")

        try:
            user = CustomUser.objects.get(username=username)
            set_admin_rights(False, user)
            return redirect('Test') #TODO change this
        except CustomUser.DoesNotExist:
            #TODO: handle
            pass
        
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
            user = CustomUser.objects.delete(username=username)
        except CustomUser.DoesNotExist:
            #todo: handle
            pass