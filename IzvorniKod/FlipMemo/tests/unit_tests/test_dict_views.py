from django.test import TestCase, Client
from main.models import CustomUser, Dictionary, Word

class TestCreateDictionaryView(TestCase):
    TEST_ADMIN_EMAIL = "testadminuser@test.com"
    TEST_ADMIN_PASSWORD = "admin"
    TEST_DICT_NAME = "Spanjolski123"
    TEST_DICT_LANG = "Spanish"

    def setUp(self):
        self.client = Client(headers={"Accept": "application/json", "Content-Type": "application/json"})
        
        admin_user = CustomUser.objects.create_user(
            email=self.TEST_ADMIN_EMAIL,
            username="DefaultUsername",
            name="John",
            last_name="Doe",
        )

        admin_user.set_password(self.TEST_ADMIN_PASSWORD)
        admin_user.is_superuser = True
        admin_user.is_staff = True
        admin_user.save()
        
        #
        self.client.post("/login", {"email" : self.TEST_ADMIN_EMAIL, "password" : self.TEST_ADMIN_PASSWORD})


    def test_create_dictionary_successful(self):
        self.client.post("/create_dictionary", {"dict_name" : self.TEST_DICT_NAME, "language": self.TEST_DICT_LANG})
        dict_after_create = Dictionary.objects.get(dict_name=self.TEST_DICT_NAME, language=self.TEST_DICT_LANG).to_dict()
        self.assertDictEqual({"dict_name" : self.TEST_DICT_NAME, "language": self.TEST_DICT_LANG}, dict_after_create)


    def test_create_dictionary_exists(self):
        self.client.post("/create_dictionary", {"dict_name" : self.TEST_DICT_NAME, "language": self.TEST_DICT_LANG})
        r = self.client.post("/create_dictionary", {"dict_name" : self.TEST_DICT_NAME, "language": self.TEST_DICT_LANG})
        self.assertEqual(("status", "exists"), list(r.json().items())[0])


    def tearDown(self):
        CustomUser.objects.get(email=self.TEST_ADMIN_EMAIL).delete()


class TestAddWordView(TestCase):
    TEST_ADMIN_EMAIL = "testadminuser@test.com"
    TEST_ADMIN_PASSWORD = "admin"
    TEST_DICT_NAME = "Spanjolski123"
    TEST_DICT_LANG = "Spanish"

    new_word_params = {
            "dict_name": TEST_DICT_NAME,
            "language": TEST_DICT_LANG,
            "word_str" : "contrato",
            "cro_translation" : "ugovor",
            "definition" : """pravni posao zaključen suglasnim očitovanjem volja dviju ili više osoba  
                              usmjerenim na proizvođenje pravom dopuštenih pravnih učinaka koji se sastoje u postanku, 
                              prestanku ili promjeni pravnih odnosa.""",
            "word_type" : "noun"
    }
    
    
    def setUp(self):
        self.client = Client(headers={"Accept": "application/json", "Content-Type": "application/json"})
        
        admin_user = CustomUser.objects.create_user(
            email=self.TEST_ADMIN_EMAIL,
            username="DefaultUsername",
            name="John",
            last_name="Doe",
        )

        admin_user.set_password(self.TEST_ADMIN_PASSWORD)
        admin_user.is_superuser = True
        admin_user.is_staff = True
        admin_user.save()
        
        #
        self.client.post("/login", {"email" : self.TEST_ADMIN_EMAIL, "password" : self.TEST_ADMIN_PASSWORD})


        test_dictionary = Dictionary.objects.create(dict_name=self.TEST_DICT_NAME, language=self.TEST_DICT_LANG)
        test_dictionary.save()


    def test_add_word_successful(self):

        self.client.post("/add_word", self.new_word_params)

        word = Word.objects.get(parent_dict__dict_name=self.TEST_DICT_NAME, parent_dict__language=self.TEST_DICT_LANG).to_dict()
        word["dict_name"] = self.TEST_DICT_NAME
        del word["_id"]

        self.assertDictEqual(self.new_word_params, word)


    def test_add_word_dictionary_doesnt_exist(self):
        new_word_params = {
            "dict_name": "Engleski321",
            "language": "English",
            "word_str" : "to dance",
            "cro_translation" : "plesati",
            "definition" : "jel se moze to definirat",
            "word_type" : "verb"
        }

        r = self.client.post("/add_word", new_word_params)

        self.assertEqual("error", list(r.json().keys())[0])


    def test_add_word_word_already_in_dictionary(self):
        
        self.client.post("/add_word", self.new_word_params)

        r = self.client.post("/add_word", self.new_word_params)

        self.assertEqual(("status", "exists"), list(r.json().items())[0])


    def tearDown(self):
        CustomUser.objects.get(email=self.TEST_ADMIN_EMAIL).delete()
        Dictionary.objects.get(dict_name=self.TEST_DICT_NAME, language=self.TEST_DICT_LANG).delete()