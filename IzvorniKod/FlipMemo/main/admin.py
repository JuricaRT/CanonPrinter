from django.contrib import admin
from django.http.request import HttpRequest
from .models import CustomUser
from django.contrib.admin import AdminSite
from .models import PermissionLevel
from django.contrib.auth import get_user_model
from typing import Any

class CustomAdminSite(AdminSite):
    model = CustomUser

    def has_permission(self, request):

        if request.method == 'GET':
            if request.user.is_anonymous:
                return False

        username = request.POST.get('username')
        print(username)
        try:
            user = CustomUser.objects.get(email=username)
            if user.permission_level == PermissionLevel.ADMIN_LEVEL:
                user.is_staff = True
                user.is_active = True
                user.save()
                return True
        except Exception as e:
            print(e)


    def get_user(self, user_id):
        UserModel = get_user_model()
        try:
            return UserModel.objects.get(pk=user_id)
        except UserModel.DoesNotExist:
            return None


class CustomAdmin(admin.ModelAdmin):
    model = CustomUser
    
    def has_add_permission(self, request):
        return True
    
    def has_change_permission(self, request: HttpRequest, obj: Any | None = ...) -> bool:
        return True
    
    def has_delete_permission(self, request: HttpRequest, obj: Any | None = ...) -> bool:
        return True

    def has_module_permission(self, request: HttpRequest) -> bool:
        return True
    
    def has_view_permission(self, request: HttpRequest, obj: Any | None = ...) -> bool:
        return True

custom_admin_site = CustomAdminSite(name='customadmin')
custom_admin_site.register(CustomUser, CustomAdmin)
