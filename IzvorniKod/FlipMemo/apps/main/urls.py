from django.urls import path
from . import views
from apps.users import views as user_views
from django.contrib.auth import views as auth_views
from apps.users import forms
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path("", views.temp_func, name="Test"),
    path('login/', user_views.login_user, name='login'),
    path('signup/', user_views.signup, name='signup'),
    path('profile/', user_views.profile, name='profile'),
    path('edit_profile/', user_views.edit_profile, name='edit_profile'),
    path('get_admins/', views.get_administrators, name='get_admins'),
    path('add_admin/', views.add_administrator, name='add_admins'),
    path('remove_admin/', views.remove_administrator, name='remove_admin'),
    path('delete_user/', views.delete_user, name='delete_user'),
    path('get_students/', views.get_students, name='get_admins'),
]