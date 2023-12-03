from main.models import CustomUser
from django.core.mail import send_mail
from django.contrib.auth import authenticate, login, logout, update_session_auth_hash
from django.http import JsonResponse
from django.conf import settings
import smtplib
import random
import string

from rest_framework.views import APIView
from rest_framework import permissions
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect
from django.utils.decorators import method_decorator


@method_decorator(ensure_csrf_cookie, name="dispatch")
class GetCSRFToken(APIView):
    permission_classes = (permissions.AllowAny, )
    
    def get(self, request, format=None):
        return JsonResponse({ 'success': 'CSRF cookie set' })


@method_decorator(csrf_protect, name="dispatch")
class CheckAuthenticatedView(APIView):
    permission_classes = (permissions.AllowAny, )

    def get(self, request, format=None):
        try:
            isAuthenticated = request.user.is_authenticated

            if isAuthenticated:
                return JsonResponse({ 'isAuthenticated': 'success' })
            else:
                return JsonResponse({ 'isAuthenticated': 'error' })
        except:
            return JsonResponse({ 'error': 'Something went wrong when checking authentication status' })


@method_decorator(csrf_protect, name="dispatch")
class SignupView(APIView):
    permission_classes = (permissions.AllowAny, )

    def post(self, request, format=None):
        signup_email = request.data["email"]

        if CustomUser.objects.filter(email=signup_email).exists():
            # todo handle error
            return JsonResponse({'status': 'exists'})

        new_user = CustomUser.objects.create_user(
            email=signup_email,
            username="DefaultUsername",
            name="John",
            last_name="Doe",
        )

        rand_pass = ''.join(random.SystemRandom().choice(string.ascii_uppercase + string.digits + string.ascii_lowercase) for _ in range(20))

        new_user.set_password(rand_pass)

        new_user.save()

        try:
            send_mail(
                'Welcome to FlipMemo',
                f'Thank you for registering. Your initial password is: {rand_pass}',
                settings.EMAIL_HOST_USER,
                [signup_email],
                fail_silently=False
            )
        except smtplib.SMTPServerDisconnected as e:
            print(f'SMTPServerDisconnected: {e}')

        return JsonResponse({'message': 'ok'})


@method_decorator(csrf_protect, name="dispatch")
class LoginView(APIView):
    permission_classes = (permissions.AllowAny, )

    def post(self, request, format=None):
        email = request.data['email']
        password = request.data['password']
        
        user = authenticate(email=email, password=password)

        if user is not None:
            login(request, user)
            return JsonResponse({'success': 'User authenticated'})
        else:
            return JsonResponse({ 'error': 'Error Authenticating' })


class LogoutView(APIView):
    # if you do not use permissions.AllowAny, it is automatically csrf_protected

    def post(self, request, format=None):
        try:
            logout(request)
            return JsonResponse({ 'success': 'Logged Out' })
        except:
            return JsonResponse({ 'error': 'Something went wrong when logging out' })
        

class UserProfileView(APIView):
    def get(self, request, format=None):
        try:
            return JsonResponse(
                {
                    'username': request.user.username,
                    'password': request.user.password,
                    'name': request.user.name,
                    'last_name': request.user.last_name,
                    'email': request.user.email,
                    'has_initial_pass': request.user.has_initial_pass,
                    'is_admin': request.user.is_superuser
                }
            )
        
        except:
            return JsonResponse({ 'error': 'Something went wrong when retrieving profile' })


class EditProfileView(APIView):
    def put(self, request, format=None):
        try:
            request.user.username = request.data["username"]
            
            if request.data["passwordSet"] is True: 
                request.user.set_password(request.data["password"]) # session invalidated 
                # https://docs.djangoproject.com/en/4.2/topics/auth/default/#session-invalidation-on-password-change
                update_session_auth_hash(request, request.user)

            request.user.name = request.data["_name"]
            request.user.last_name = request.data["last_name"]

            request.user.save()

            return JsonResponse(
                {
                    'username': request.user.username,
                    'password': request.user.password,
                    'name': request.user.name,
                    'last_name': request.user.last_name,
                    'email': request.user.email,
                    'has_initial_pass': request.user.has_initial_pass,
                    'is_admin': request.user.is_superuser
                }
            )
        except:
            return JsonResponse({"error": "something wrong with edit profile"})
        
class ChangeInitialPassView(APIView):
    def put(self, request, format=None):
        try:            
            request.user.set_password(request.data["password"]) # session invalidated 
            # https://docs.djangoproject.com/en/4.2/topics/auth/default/#session-invalidation-on-password-change
            update_session_auth_hash(request, request.user)

            request.user.has_initial_pass = False

            request.user.save()

            return JsonResponse(
                {
                    'username': request.user.username,
                    'password': request.user.password,
                    'name': request.user.name,
                    'last_name': request.user.last_name,
                    'email': request.user.email,
                    'has_initial_pass': request.user.has_initial_pass,
                    'is_admin': request.user.is_superuser
                }
            )
        except:
            return JsonResponse({"error": "something wrong with edit profile"})
        

class DeleteUserView(APIView):
    def delete(self, request, format=None):
        try:
            request.user.delete()

            return JsonResponse({ 'success': 'User deleted successfully' })
        
        except Exception as e:
            print(e)
            return JsonResponse({ 'error': 'Something went wrong when trying to delete user' })
