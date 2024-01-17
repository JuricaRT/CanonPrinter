import json
import os
from django.test import TestCase, Client
from main.models import CustomUser, Dictionary, StudyDataDictionary, StudyDataWords, StudyData
from main.runtime_models import RuntimeSession, Mode
from main.dict_views import add_word_list

class TestRuntimeSession(TestCase):
    TEST_MODE = Mode.LTC

    TEST_DICT_NAME = "Engleski rjecnik"
    TEST_DICT_LANG = "Engleski"

    TEST_USER_EMAIL = "testuser@test.com"
    TEST_USER_PASSWORD = "testpassword123"

    words = json.load(open(os.path.join(os.path.abspath("."), "tests", "unit_tests", "test_words.json")))

    def setUp(self):
        self.client = Client(headers={"Accept": "application/json", "Content-Type": "application/json"})
        self.runtime_session = RuntimeSession()
        self.test_dict = Dictionary.objects.create(dict_name=self.TEST_DICT_NAME, language=self.TEST_DICT_LANG)
        self.test_dict.save()
        add_word_list(self.test_dict, self.words)
        
        self.test_user = CustomUser.objects.create_user(
            email=self.TEST_USER_EMAIL,
            username="DefaultUsername",
            name="John",
            last_name="Doe",
        )

        self.test_user.set_password(self.TEST_USER_PASSWORD)
        self.test_user.save()
        
        self.study_data = StudyData.objects.create(student_id=self.test_user)
        self.study_data.save()
        
        self.study_data_dictionary = StudyDataDictionary.objects.create(study_data=self.study_data,
                                                                        _dict=self.test_dict)
        
        self.study_data_dictionary.save()


    def test_create_session(self):
        self.runtime_session.create_session(self.test_user._id, self.TEST_MODE, self.test_dict)

        self.assertEquals((self.test_user._id in self.runtime_session.session_data), True)

        self.assertDictEqual(self.runtime_session.session_data[self.test_user._id].selected_dictionary.to_dict(),
                             self.test_dict.to_dict())
        
        self.assertEquals(self.runtime_session.session_data[self.test_user._id].mode, self.TEST_MODE)

    
    def test_destroy_session(self):
        self.runtime_session.create_session(self.test_user._id, self.TEST_MODE, self.test_dict)

        self.runtime_session.destroy_session(self.test_user._id)

        self.assertEquals((self.test_user._id not in self.runtime_session.session_data), True)

    
    def test_generate_question_not_empty(self):
        self.runtime_session.create_session(self.test_user._id, self.TEST_MODE, self.test_dict)

        self.runtime_session.generate_question(self.test_user._id, self.study_data_dictionary, None)

        current_question = self.runtime_session.session_data[self.test_user._id].current_question
        
        q = (current_question.word_question, current_question.word_answers, current_question.word_correct)

        self.assertNotEqual(q, ("","",""))


    def test_generate_question_random(self):
        self.runtime_session.create_session(self.test_user._id, self.TEST_MODE, self.test_dict)

        self.runtime_session.generate_question(self.test_user._id, self.study_data_dictionary, None)
        current_question = self.runtime_session.session_data[self.test_user._id].current_question
        q1 = (current_question.word_question, current_question.word_answers, current_question.word_correct)

        
        self.runtime_session.generate_question(self.test_user._id, self.study_data_dictionary, None)
        next_question = self.runtime_session.session_data[self.test_user._id].current_question
        q2 = (next_question.word_question, next_question.word_answers, next_question.word_correct)
        
        self.assertNotEqual(q1, q2)

    
    def tearDown(self):
        self.test_user.delete()
        self.test_dict.delete()
        self.study_data.delete()
        self.study_data_dictionary.delete()