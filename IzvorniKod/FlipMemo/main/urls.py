from django.urls import path
import main.user_views as user_views
import main.admin_views as admin_views
from .admin import custom_admin_site
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
    path("delete_user_admin", admin_views.DeleteUserViewAdmin.as_view()),
    path("delete_user", user_views.DeleteUserView.as_view()),

    path("get_admins", admin_views.GetAdministratorsView.as_view()),
    path("add_admin", admin_views.AddAdministratorView.as_view()),
    path("remove_admin", admin_views.RemoveAdministratorView.as_view()),
    path("get_students", admin_views.GetStudentsView.as_view()),
    path('admin', custom_admin_site.urls)
]

admin.site = CustomAdminSite()
admin.autodiscover()