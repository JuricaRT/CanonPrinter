from django.contrib.auth.backends import ModelBackend
from .models import CustomUser

class FlipMemoAuthBackend(ModelBackend):
    def authenticate(self, request, email=None, password=None, **kwargs):
        # Your authentication logic using your own database
        user = CustomUser.objects.get(email=email)
        if user.check_password(password):
            return user
        return None