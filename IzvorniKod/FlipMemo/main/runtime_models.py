from collections import defaultdict
from enum import IntEnum
import random

from .models import Dictionary, Word, StudyData, StudyDataDictionary, StudyDataWords, CustomUser

class Singleton:
    _instance = None

    def __new__(cls, *args, **kwargs):
        if not cls._instance:
            cls._instance = super(Singleton, cls).__new__(cls)
        return cls._instance
    
class Mode(IntEnum):
    LTC = 0, # LangToCro
    CTL = 1, # CroToLang
    AUD = 2, # AudioPrompt
    REC = 3  # VoiceRecording
    
class RuntimeSession(Singleton):
    def __init__(self):
        self.session_data = defaultdict(SessionData)

    def create_session(self, student_id, mode, selected_dictionary):
        self.session_data[student_id] = SessionData(mode, selected_dictionary)

    def generate_question(self, student_id, study_data_dictionary, study_data_words):
        
        dictionary = self.session_data[student_id].selected_dictionary
        mode = self.session_data[student_id].mode
        session_data = self.session_data[student_id]

        words = Word.objects.filter(parent_dict=dictionary)

        if study_data_words is None:
            study_data_words = StudyDataWords.objects.filter(study_data_dictionary=study_data_dictionary)

        words_dict = [word.to_dict() for word in words]
        study_data_words_dict = [word.to_dict() for word in study_data_words]
        for study_word in study_data_words_dict:
            words_dict = [item for item in words_dict if item['_id'] != study_word['_word']]

        random_word_id = random.choice(words_dict)
        random_word = Word.objects.get(_id=random_word_id['_id'])

        session_data.current_question.word = random_word

        match mode:
            case Mode.LTC:
                self.session_data[student_id].current_question.word_question = random_word.word_str
                self.session_data[student_id].current_question.word_correct = random_word.cro_translation

                type = random_word.word_type
                other_words = words.filter(word_type=type)
                other_words_dict = [other_word.to_dict() for other_word in other_words]
                other_words_dict.remove(random_word.to_dict())

                for i in range(3):
                    other_word = random.choice(other_words_dict)
                    other_words_dict.remove(other_word)
                    self.session_data[student_id].current_question.word_answers[i] = other_word["cro_translation"]
            case Mode.CTL:
                self.session_data[student_id].current_question.word_question = random_word.cro_translation
                self.session_data[student_id].current_question.word_correct = random_word.word_str

                type = random_word.word_type
                other_words = words.filter(word_type=type)
                other_words_dict = [other_word.to_dict() for other_word in other_words]
                other_words_dict.remove(random_word.to_dict())

                for i in range(3):
                    other_word = random.choice(other_words_dict)
                    other_words_dict.remove(other_word)
                    self.session_data[student_id].current_question.word_answers[i] = other_word["word_str"]
            case Mode.AUD:
                self.session_data[student_id].current_question.word_correct = random_word.word_str
                self.session_data[student_id].current_question.word_question = random_word.word_str                
            case Mode.REC:
                self.session_data[student_id].current_question.word_correct = random_word.word_str
                self.session_data[student_id].current_question.word_question = random_word.word_str
            case _:
                session_data.current_question.set_question("", "", "")

    def destroy_session(self, student_id):
        del self.session_data[student_id]

class SessionData:
    def __init__(self, mode, selected_dictionary):
        self.answers_correct = 0
        self.answers_incorrect = 0
        self.mode = mode
        self.selected_dictionary = selected_dictionary
        self.current_question = Question()

class Question:
    def __init__(self):
        self.word = None
        self.word_question = ""
        self.word_answers = ["", "", ""]
        self.word_correct = ""

    def set_question(self, question, answers, correct):
        self.word = None
        self.word_question = question
        self.word_answers = answers
        self.word_correct = correct


runtime_session = RuntimeSession()