from django.db import models
from django.contrib.auth.models import AbstractUser
import uuid
from djongo.models import ObjectIdField
from django.forms.models import model_to_dict

class CustomIDField(models.CharField):
    def __init__(self, *args, **kwargs):
        kwargs['max_length'] = kwargs.get('max_length', 36)
        kwargs['unique'] = kwargs.get('unique', True)
        kwargs['default'] = kwargs.get('default', self.generate_id)
        super().__init__(*args, **kwargs)

    def generate_id(self):
        return str(uuid.uuid4())

class PermissionLevel(models.TextChoices):
    ADMIN_LEVEL = 'ADMIN'
    USER_LEVEL = 'USER'

class CustomUser(AbstractUser):

    _id = ObjectIdField()
    username = models.CharField(max_length=32, unique=False)
    password = models.CharField(max_length=255)
    name = models.CharField(max_length=32)
    last_name = models.CharField(max_length=32)
    email = models.CharField(max_length=255, unique=True)
    permission_level = models.CharField(max_length=5, choices=PermissionLevel.choices, default=PermissionLevel.USER_LEVEL)
    has_initial_pass = models.BooleanField(default=True)

    def to_dict(self):
        return model_to_dict(self, fields=["username", "name", "last_name", "email", "has_initial_pass"])
    
    def __str__(self) -> str:
        return self.email