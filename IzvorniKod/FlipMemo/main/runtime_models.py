from collections import defaultdict
from enum import Enum
import random

class Singleton:
    _instance = None

    def __new__(cls, *args, **kwargs):
        if not cls._instance:
            cls._instance = super(Singleton, cls).__new__(cls)
        return cls._instance
    
class Mode(Enum):
    LTC = 0,
    CTL = 1,
    AUD = 2,
    REC = 3
    
class RuntimeSession(Singleton):
    def __init__(self):
        if not hasattr(self, '_initialized'):
            self.session_data = defaultdict(SessionData)
            self._initialized = True

    def create_session(self, student_id, mode="", selected_dictionary=""):
        self.session_data[student_id] = SessionData(mode, selected_dictionary)

    def generate_question(self, student_id):
        from .models import Dictionary, Word
        dict_id = self.session_data[student_id].selected_dictionary
        dictionary = Dictionary.objects.filter(_id=dict_id).last()
        words = Word.objects.filter(parent_dict=dictionary)
        random_word = random.choice(words)

        self.session_data[student_id].current_question.word_correct = random_word.word_str # TODO

class SessionData:
    def __init__(self, mode, selected_dictionary):
        self.answers_correct = 0
        self.answers_incorrect = 0
        self.mode = mode
        self.selected_dictionary = selected_dictionary
        self.current_question = Question()

class Question:
    def __init__(self):
        self.word_question = ""
        self.word_answers = ["", "", ""]
        self.word_correct = ""
