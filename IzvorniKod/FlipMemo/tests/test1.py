from django.test import SimpleTestCase, TestCase
from apps.main.models import CustomUser, PermissionLevel
from django.db import transaction
from unittest import skip
from apps.main import views
from django.urls import reverse
from django.core.mail import send_mail
import smtplib
from django.conf import settings

class AdminTests(TestCase):
    def test_admin_funcs(self):

        try:
            send_mail(
                'Welcome to FlipMemo',
                f'Thank you for registering. Your initial password is: {1234}',
                settings.EMAIL_HOST_USER,
                ['kristijan.milic02@gmail.com'],
                fail_silently=False
            )
            print("HERE")
        except smtplib.SMTPServerDisconnected as e:
            print(f'SMTPServerDisconnected: {e}')        

        input()
        return
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
        data = response.json()
        print(data[0]['fields']['name'])
            

        response = self.client.post('/add_admin/', {'username': 'test_usernew2'})

        print("ADMINS: johny doee")
        response = self.client.get('/get_admins/')
        print(response.content)

        response = self.client.post('/delete_user/', {'username': 'test_usernew2'})
        print("ADMINS: SAMO JEDAN")
        response = self.client.get('/get_admins/')
        print(response.content)