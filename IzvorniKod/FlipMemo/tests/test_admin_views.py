from django.test import TestCase, Client
from main.models import CustomUser

class TestAddAdministratorView(TestCase):
    TEST_ADMIN_EMAIL = "testadminuser@test.com"
    TEST_ADMIN_PASSWORD = "admin"
    
    TEST_USER_EMAIL = "testuser@test.com"
    TEST_USER_PASSWORD = "testpassword123"

    def setUp(self):
        self.client = Client(headers={"Accept": "application/json", "Content-Type": "application/json"})
        
        test_user = CustomUser.objects.create_user(
            email=self.TEST_USER_EMAIL,
            username="DefaultUsername1",
            name="John1",
            last_name="Doe1",
        )

        test_user.set_password(self.TEST_USER_PASSWORD)
        test_user.save()

        admin_user = CustomUser.objects.create_user(
            email=self.TEST_ADMIN_EMAIL,
            username="DefaultUsername2",
            name="John2",
            last_name="Doe2",
        )

        admin_user.set_password(self.TEST_ADMIN_PASSWORD)
        admin_user.is_superuser = True
        admin_user.is_staff = True
        admin_user.save()
        
        #
        self.client.post("/login", {"email" : self.TEST_ADMIN_EMAIL, "password" : self.TEST_ADMIN_PASSWORD})

        
    def test_add_admin_user_exists(self):
        self.client.post("/add_admin", {"email" : self.TEST_USER_EMAIL})

        user_is_admin_after_add = CustomUser.objects.get(email=self.TEST_USER_EMAIL).is_staff

        self.assertEqual(user_is_admin_after_add, True)

        
    def test_delete_user_doesnt_exist(self):
        r = self.client.post("/delete_user_admin", {"email" : "nemaga@nema.com"})
        
        self.assertEqual("error", list(r.json().keys())[0])

        
    def tearDown(self):   
        CustomUser.objects.get(email=self.TEST_USER_EMAIL).delete()
        CustomUser.objects.get(email=self.TEST_ADMIN_EMAIL).delete()
