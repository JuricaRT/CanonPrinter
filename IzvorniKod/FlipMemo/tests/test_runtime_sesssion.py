import json
import os
from django.test import TestCase, Client
from main.models import Dictionary
from main.runtime_models import RuntimeSession, Mode
from main.dict_views import add_word_list

class TestRuntimeSession(TestCase):
    TEST_USER_ID = 1337
    TEST_MODE = Mode.LTC

    TEST_DICT_NAME = "Engleski rjecnik"
    TEST_DICT_LANG = "Engleski"

    TEST_USER_EMAIL = "testuser@test.com"
    TEST_USER_PASSWORD = "testpassword123"

    words = json.load(open(os.path.join(os.path.abspath("."), "tests", "test_words.json")))

    def setUp(self):
        self.client = Client(headers={"Accept": "application/json", "Content-Type": "application/json"})
        self.runtime_session = RuntimeSession()
        self.test_dict = Dictionary.objects.create(dict_name=self.TEST_DICT_NAME, language=self.TEST_DICT_LANG)
        add_word_list(self.test_dict, self.words)


    def test_create_session(self):
        self.runtime_session.create_session(self.TEST_USER_ID, self.TEST_MODE, self.test_dict)


        self.assertEquals((self.TEST_USER_ID in self.runtime_session.session_data), True)

        self.assertDictEqual(self.runtime_session.session_data[self.TEST_USER_ID].selected_dictionary.to_dict(),
                             self.test_dict.to_dict())
        
        self.assertEquals(self.runtime_session.session_data[self.TEST_USER_ID].mode, self.TEST_MODE)


    def test_destroy_session(self):
        self.runtime_session.create_session(self.TEST_USER_ID, self.TEST_MODE, self.test_dict)

        self.runtime_session.destroy_session(self.TEST_USER_ID)

        self.assertEquals((self.TEST_USER_ID not in self.runtime_session.session_data), True)


    def test_generate_question_not_empty(self):
        self.runtime_session.create_session(self.TEST_USER_ID, self.TEST_MODE, self.test_dict)

        self.runtime_session.generate_question(self.TEST_USER_ID)

        current_question = self.runtime_session.session_data[self.TEST_USER_ID].current_question
        
        q = (current_question.word_question, current_question.word_answers, current_question.word_correct)

        self.assertNotEqual(q, ("","",""))


    def test_generate_question_random(self):
        self.runtime_session.create_session(self.TEST_USER_ID, self.TEST_MODE, self.test_dict)

        self.runtime_session.generate_question(self.TEST_USER_ID)
        current_question = self.runtime_session.session_data[self.TEST_USER_ID].current_question
        q1 = (current_question.word_question, current_question.word_answers, current_question.word_correct)

        
        self.runtime_session.generate_question(self.TEST_USER_ID)
        next_question = self.runtime_session.session_data[self.TEST_USER_ID].current_question
        q2 = (next_question.word_question, next_question.word_answers, next_question.word_correct)
        
        self.assertNotEqual(q1, q2)


    def tearDown(self):
        Dictionary.objects.get(dict_name=self.TEST_DICT_NAME, language=self.TEST_DICT_LANG).delete()