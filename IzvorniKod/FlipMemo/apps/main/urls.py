from django.urls import path
from . import views
from apps.users import views as user_views
from django.contrib.auth import views as auth_views
from apps.users import forms
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path("", views.temp_func, name="Test"),
    path('login/', auth_views.LoginView.as_view(template_name='login.html', authentication_form=forms.UserLoginForm), name='login'),
    path('signup/', user_views.SignupView.as_view(), name='signup'),
    path('profile/', user_views.ProfileView.as_view(), name='profile'),
]