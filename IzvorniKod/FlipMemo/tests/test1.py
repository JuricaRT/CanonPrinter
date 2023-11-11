from django.test import SimpleTestCase, TestCase
from apps.main.models import CustomUser, PermissionLevel
from django.db import transaction
from unittest import skip
from apps.main import views
from django.urls import reverse
import xml.etree.ElementTree as ET

class AdminTests(TestCase):
    def test_admin_funcs(self):
        self.client.post('/signup/', 
            {
                'username': 'test_user',
                'password': 'test_pass',
                'email': "test@mail.com",
                'name': "john",
                "last_name": "doe"                
            }
        )

        self.client.post('/login/', 
            {
                'username': 'test_user',
                'password': 'test_pass'                
            }
        )

        print("ADMINS: SHOULD'T BE ALLOWED")
        response = self.client.get('/get_admins/')
        print(response)
        print("STUDENTS: SHOULDN'T BE ALLOWED")
        response = self.client.get('/get_students/')
        print(response)

        testuser = CustomUser.objects.get(username='test_user')
        testuser.permission_level = PermissionLevel.ADMIN_LEVEL
        testuser.save()

        print("ADMINS:")
        response = self.client.get('/get_admins/')
        print(response)
        print("STUDENTS: SHOULD BE EMPTY")
        response = self.client.get('/get_students/')
        print(response)

        self.client.post('/signup/', 
            {
                'username': 'test_user2',
                'password': 'test_pass2',
                'email': "test2@mail.com",
                'name': "john",
                "last_name": "doe"                
            }
        )

        response = self.client.post('/edit_profile/', {
            'username': 'test_usernew2',
            'email': 'test2@mail.com',
            'name': 'johny',
            'last_name': 'doee'
        })

        print("STUDENTS: JOHNY DOEE")
        response = self.client.get('/get_students/')
        root = ET.fromstring(response.content)
        print(root.find(".//field[@name='name']").text + ' ' + root.find(".//field[@name='last_name']").text)

        response = self.client.post('/add_admin/', {'username': 'test_usernew2'})

        print("ADMINS: johny doee")
        response = self.client.get('/get_admins/')
        root = ET.fromstring(response.content)
        print(response.content)

        response = self.client.post('/delete_user/', {'username': 'test_usernew2'})
        print("ADMINS: SAMO JEDAN")
        response = self.client.get('/get_admins/')
        root = ET.fromstring(response.content)
        print(response.content)