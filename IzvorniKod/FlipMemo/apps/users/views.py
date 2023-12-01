from apps.main.models import CustomUser
from apps.main.dto import UserDTO
from django.core.mail import send_mail
from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse
from django.conf import settings
import smtplib
import random
import string
from apps.main.database import Database as db
from apps.main import dto

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
        user = self.request.user
        try:
            isAuthenticated = user.is_authenticated

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
        data = self.request.data

        userDTO = UserDTO(
                username="DefaultUser",
                name="John",
                last_name="Doe",
                email=data["email"],
                password=None,
                permission_level=None,
                has_initial_pass=None
        )

        if CustomUser.objects.filter(email=userDTO.email).exists():
            # todo handle error
            return JsonResponse({'status': 'exists'})

        new_user = CustomUser.objects.create_user(
                username=userDTO.username,
                email=userDTO.email,
                name=userDTO.name,
                last_name=userDTO.last_name,
        )

        rand_pass = ''.join(random.SystemRandom().choice(string.ascii_uppercase + string.digits + string.ascii_lowercase) for _ in range(20))

        new_user.set_password(rand_pass)

        userDTO.password = new_user.password
        userDTO.permission_level = 0
        userDTO.has_initial_pass = True
        
        database = db()
        database.add_user(userDTO)

        new_user.save()

        try:
            send_mail(
                'Welcome to FlipMemo',
                f'Thank you for registering. Your initial password is: {rand_pass}',
                settings.EMAIL_HOST_USER,
                [userDTO.email],
                fail_silently=False
            )
        except smtplib.SMTPServerDisconnected as e:
            print(f'SMTPServerDisconnected: {e}')

        return JsonResponse({'message': 'ok'})

@method_decorator(csrf_protect, name="dispatch")
class LoginView(APIView):
    permission_classes = (permissions.AllowAny, )

    def post(self, request, format=None):
        data = self.request.data
        
        email = data['email']
        password = data['password']
        
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
    def post(self, request, format=None):
        try:
            user_email = self.request.data["email"]
            user = CustomUser.objects.get(email=user_email)

            return JsonResponse(
                {
                    'username': user.username,
                    'password': user.password,
                    'name': user.name,
                    'last_name': user.last_name,
                    'email': user.email
                }
            )
        except:
            return JsonResponse({ 'error': 'Something went wrong when retrieving profile' })

class AdminStatusView(APIView):
    def post(self, request, format=None):
        try:
            user_email = self.request.data["email"]
            user = CustomUser.objects.get(email=user_email)

            return JsonResponse({'isAdmin': dto.permission_level_to_int(user.permission_level)})
        except:
            return JsonResponse({"error": "something wrong with admin status"})


class EditProfileView(APIView):
    def post(self, request, format=None):
        try:
            
            ### temp
            user_email = self.request.data["email"]

            user = CustomUser.objects.get(email=user_email)
            user.username="test123"

            user.save()
            
            old_userDTO = user.to_dto()
            new_userDTO = user.to_dto()

            new_userDTO.set_username("test123")

            database = db()
            database.modify_user(old_userDTO, new_userDTO)

            return JsonResponse({"message" : "ok"})

        except:
            return JsonResponse({"error": "something wrong with edit profile"})