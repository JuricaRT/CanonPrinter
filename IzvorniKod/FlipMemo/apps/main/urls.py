from django.urls import path
from . import views
from apps.users import views as user_views
from django.contrib.auth import views as auth_views
from apps.users import forms
from django.conf.urls.static import static
from django.conf import settings
from apps.main.admin import custom_admin_site, LoginView
from django.contrib import admin
from .admin import CustomAdminSite

urlpatterns = [
    path("", views.MainViews.temp_func, name="Test"),
    
    path("login", user_views.LoginView.as_view()),
    path('authenticated', user_views.CheckAuthenticatedView.as_view()),
    path('logout', user_views.LogoutView.as_view()),
    path('signup', user_views.SignupView.as_view()),
    path('csrf_cookie', user_views.GetCSRFToken.as_view()),
    path('profile', user_views.UserProfileView.as_view()),
    path("edit_profile", user_views.EditProfileView.as_view()),
    path("delete_user", views.DeleteUserView.as_view()),

    path('get_admins/', views.MainViews.get_administrators, name='get_admins'),
    path('add_admin/', views.MainViews.add_administrator, name='add_admin'),
    path('remove_admin/', views.MainViews.remove_administrator, name='remove_admin'),
    
    path('get_students/', views.MainViews.get_students, name='get_students'),
    path('admin/', custom_admin_site.urls),
    path("admin_status", user_views.AdminStatusView.as_view())
]

admin.site = CustomAdminSite()
admin.autodiscover()