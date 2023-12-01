from django.urls import path
from . import views
from apps.users import views as user_views
from apps.main.admin import custom_admin_site
from django.contrib import admin
from .admin import CustomAdminSite

urlpatterns = [
    path("login", user_views.LoginView.as_view()),
    path('authenticated', user_views.CheckAuthenticatedView.as_view()),
    path('logout', user_views.LogoutView.as_view()),
    path('signup', user_views.SignupView.as_view()),
    path('csrf_cookie', user_views.GetCSRFToken.as_view()),
    path('profile', user_views.UserProfileView.as_view()),
    path("edit_profile", user_views.EditProfileView.as_view()),
    path("delete_user", views.DeleteUserView.as_view()),

    path("get_admins/", views.GetAdministratorsView.as_view()),
    path("add_admin/", views.AddAdministratorView.as_view()),
    path("remove_admin/", views.RemoveAdministratorView.as_view()),
    path("get_students/", views.GetStudentsView.as_view()),
    path('admin/', custom_admin_site.urls),
    path("admin_status", user_views.AdminStatusView.as_view())
]

admin.site = CustomAdminSite()
admin.autodiscover()