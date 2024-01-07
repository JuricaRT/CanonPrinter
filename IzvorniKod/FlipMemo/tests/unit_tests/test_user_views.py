from django.test import TestCase, Client
from main.models import CustomUser

class TestLoginView(TestCase):
    TEST_USER_EMAIL = "testuser@test.com"
    TEST_USER_PASSWORD = "testpassword123"

    def setUp(self):
        self.client = Client(headers={"Accept": "application/json", "Content-Type": "application/json"})

        test_user = CustomUser.objects.create_user(
            email=self.TEST_USER_EMAIL,
            username="DefaultUsername",
            name="John",
            last_name="Doe",
        )

        test_user.set_password(self.TEST_USER_PASSWORD)
        test_user.save()
        

    def test_successful_login(self):
        r = self.client.post("/login", {"email" : self.TEST_USER_EMAIL, "password" : self.TEST_USER_PASSWORD})
        self.assertEqual("success", list(r.json().keys())[0])
    
        
    def test_unsuccessful_login(self):
        r = self.client.post("/login", {"email" : self.TEST_USER_EMAIL, "password" : "wrong_password132643"})
        self.assertEqual("error", list(r.json().keys())[0])

        
    def tearDown(self):
        CustomUser.objects.get(email=self.TEST_USER_EMAIL).delete()


class TestEditProfileView(TestCase):
    TEST_USER_EMAIL = "testuser@test.com"
    TEST_USER_PASSWORD = "testpassword123"

    def setUp(self):
        self.client = Client(headers={"Accept": "application/json", "Content-Type": "application/json"})
        
        test_user = CustomUser.objects.create_user(
            email=self.TEST_USER_EMAIL,
            username="DefaultUsername",
            name="John",
            last_name="Doe",
        )

        test_user.set_password(self.TEST_USER_PASSWORD)
        test_user.save()
        
        #
        self.client.post("/login", {"email" : self.TEST_USER_EMAIL, "password" : self.TEST_USER_PASSWORD})

        
    def test_successful_edit_profile(self):
        new_data = {"username" : "noviusername123", "_name" : "novoime", "last_name" : "novoprezime"}
        
        self.client.post("/edit_profile", new_data)

        test_user = CustomUser.objects.get(email=self.TEST_USER_EMAIL)

        changed_data = {"username": test_user.username, "_name": test_user.name, "last_name": test_user.last_name}

        self.assertDictEqual(new_data, changed_data)

        
    def tearDown(self):
        CustomUser.objects.get(email=self.TEST_USER_EMAIL).delete()
