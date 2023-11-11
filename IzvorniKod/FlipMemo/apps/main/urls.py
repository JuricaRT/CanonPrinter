from django.urls import path
from . import views
from apps.users import views as user_views
from django.contrib.auth import views as auth_views
from apps.users import forms
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path("", views.temp_func, name="Test"),
    path('login/', user_views.login, name='login'),
    path('signup/', user_views.signup, name='signup'),
    path('profile/', user_views.profile, name='profile'),
]