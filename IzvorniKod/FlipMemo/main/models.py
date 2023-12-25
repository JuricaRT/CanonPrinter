from django.db import models
from django.contrib.auth.models import AbstractUser
import uuid, djongo
from djongo.models import ObjectIdField, ManyToManyField, ForeignKey, UniqueConstraint
from django.forms.models import model_to_dict

class CustomIDField(models.CharField): # :(
    def __init__(self, *args, **kwargs):
        kwargs['max_length'] = kwargs.get('max_length', 36)
        kwargs['unique'] = kwargs.get('unique', True)
        kwargs['default'] = kwargs.get('default', self.generate_id)
        super().__init__(*args, **kwargs)

    def generate_id(self):
        return str(uuid.uuid4())
    
class TransientModel(models.Model):
    def save(*args, **kwargs):
        pass

    class Meta:
        abstract = True
        managed = False

class CustomUser(AbstractUser):

    _id = ObjectIdField()
    username = models.CharField(max_length=32, unique=False)
    password = models.CharField(max_length=255)
    name = models.CharField(max_length=32)
    last_name = models.CharField(max_length=32)
    email = models.CharField(max_length=255, unique=True)
    has_initial_pass = models.BooleanField(default=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    def to_dict(self):
        return model_to_dict(self, fields=["username", "name", "last_name", "email", "has_initial_pass"])
    
    def __str__(self) -> str:
        return self.email
    
class StudyData(models.Model):
    _id = ObjectIdField()
    student_id = ForeignKey(CustomUser, on_delete=models.CASCADE)

class Dictionary(models.Model):
    _id = ObjectIdField()
    dict_name = models.CharField(max_length=64)
    language = models.CharField(max_length=32)

    class Meta:
        unique_together = [['dict_name', 'language']]
        #constraints = [
        #    UniqueConstraint(fields=['dict_name', 'language'], name='unique_dictnaming')
        #]

class Word(models.Model):
    _id = ObjectIdField()
    parent_dict = ManyToManyField(Dictionary)
    language = models.CharField(max_length=32)
    word_str = models.TextField()
    cro_translation = models.TextField()
    definition = models.TextField()
    word_type = models.CharField(max_length=32)
    audio_bytes = models.BinaryField(null=True)

class Session(TransientModel):
    MODE_CHOICES = (
        ("LTC", "LangToCro"),
        ("CTL", "CroToLang"),
        ("AUD", "AudioPrompt"),
        ("REC", "VoiceRecording")
    )

    _id = ObjectIdField()
    student_id = ForeignKey(CustomUser, on_delete=models.CASCADE)
    answers_correct = models.IntegerField()
    answers_incorrect = models.IntegerField()
    mode = models.CharField(max_length=16, choices=MODE_CHOICES, default="LTC")
    selected_dictionary = ForeignKey(Dictionary, on_delete=models.CASCADE)
    current_question = ForeignKey('Question', on_delete=models.SET(None)) 

class Question(TransientModel):
    _id = ObjectIdField()
    session_id = ForeignKey(Session, on_delete=models.CASCADE)
    word_question = ForeignKey(Word, related_name='word_question', on_delete=models.CASCADE)
    word_answers = ManyToManyField(Word, related_name='word_answers')
    word_correct = ForeignKey(Word, related_name='word_correct', on_delete=models.CASCADE)




