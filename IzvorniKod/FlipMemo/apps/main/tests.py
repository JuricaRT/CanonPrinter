from django.test import SimpleTestCase, TestCase
from apps.main.models import CustomUser, PermissionLevel
from django.db import transaction
from unittest import skip
from apps.main import views

# Create your tests here.

@skip("nepotrebno")
class AdminTests(SimpleTestCase):
    databases = ['default']

    def test_get_users(self):
        users = CustomUser.objects.all()
        print(users)
        for user in users:
            if user.username == 'kristijan':
                user.permission_level = PermissionLevel.ADMIN_LEVEL
                user.save()

    def tearDown(self) -> None:
        pass

    @classmethod
    def tearDownClass(cls):
        pass
    

