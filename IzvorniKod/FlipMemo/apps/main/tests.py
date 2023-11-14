from django.test import SimpleTestCase, TestCase
from apps.main.models import CustomUser, PermissionLevel
from django.db import transaction
from unittest import skip
from apps.main import views
from apps.main.dto import UserDTO
from apps.main.database import Database as db

# Create your tests here.

@skip("nepotrebno")
class AdminTests(SimpleTestCase):
    databases = ['default']

    def test_get_users(self):
        userDTO = UserDTO(
            username="KristijanAdmin",
            name="K",
            last_name="M",
            email="tempmail@temp.temp",
            password="admin",
            permission_level=1,
            has_initial_pass=None
        )

        print(userDTO.email)

        if CustomUser.objects.filter(email=userDTO.email).exists():
            # todo handle error
            return

        new_user = CustomUser.objects.create_user(
            username=userDTO.username,
            email=userDTO.email,
            name=userDTO.name,
            last_name=userDTO.last_name,
            permission_level=PermissionLevel.ADMIN_LEVEL,
        )

        new_user.set_password(userDTO.password)

        userDTO.password = new_user.password
        userDTO.permission_level = 0
        userDTO.has_initial_pass = True
        database = db()
        database.add_user(userDTO)

        new_user.save()

    def tearDown(self) -> None:
        pass

    @classmethod
    def tearDownClass(cls):
        pass
    

