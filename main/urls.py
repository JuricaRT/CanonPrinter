from django.urls import path
from . import views
from users import views as user_views
from django.contrib.auth import views as auth_views
from users import forms
from django.conf.urls.static import static
from django.conf import settings
from main.admin import custom_admin_site, LoginView
from django.contrib import admin
from .admin import CustomAdminSite

urlpatterns = [
    #path("", views.MainViews.temp_func, name="Test"),
    path('login/', user_views.UsersView.login_user, name='login'),
    path('logout/', user_views.UsersView.logout_user, name='logout'),
    path('signup/', user_views.UsersView.signup, name='signup'),
    path('profile/', user_views.UsersView.profile, name='profile'),
    path('edit_profile/', user_views.UsersView.edit_profile, name='edit_profile'),
    path('get_admins/', views.MainViews.get_administrators, name='get_admins'),
    path('add_admin/', views.MainViews.add_administrator, name='add_admin'),
    path('remove_admin/', views.MainViews.remove_administrator, name='remove_admin'),
    path('delete_user/', views.MainViews.delete_user, name='delete_user'),
    path('get_students/', views.MainViews.get_students, name='get_students'),
    path('admin/', custom_admin_site.urls),
    path('admin_status/', user_views.UsersView.admin_status, name='admin_status'),
]

admin.site = CustomAdminSite()
admin.autodiscover()