from django.db import models
from django.contrib.auth.models import AbstractUser
from enum import Enum
from . import dto

class PermissionLevel(models.TextChoices):
    ADMIN_LEVEL = 'ADMIN'
    USER_LEVEL = 'USER'


class CustomUser(AbstractUser):

    username = models.CharField(max_length=32, unique=False)
    password = models.CharField(max_length=255)
    name = models.CharField(max_length=32)
    last_name = models.CharField(max_length=32)
    email = models.CharField(max_length=255, unique=True)
    permission_level = models.CharField(max_length=5, choices=PermissionLevel.choices, default=PermissionLevel.USER_LEVEL)

    @staticmethod
    def register(self):
        return
    
    @staticmethod
    def login(self):
        return
    
    @staticmethod
    def view_user_data(self):
        return
    
    @staticmethod
    def change_user_data(self):
        return
    
    @staticmethod
    def delete_user(self):
        return  

    def to_dto(self):
        user_dto = dto.UserDTO()
        user_dto.user_name = self.username
        user_dto.password = self.password
        user_dto.name = self.name 
        user_dto.email = self.email      
        user_dto.permission_level = dto.permission_level_to_int(self.permission_level)
        return user_dto      

    def __str__(self) -> str:
        return self.email
    
class Administrator(CustomUser):
    def add_administrator(self, user_name):
        return
    
    def create_dictionary(self): #passes dictionary
        return
    
    def add_word(self): #passes dictionary, word
        return
    
    def remove_word(self): #passes dictionary, word
        return
    
    def change_word(self): #passes dictionary, old_word, new_word
        return
    
    def delete_user(self, user_name):
        return
    
class Student(CustomUser):
    #session attr
    def select_learning_mode(self): #passes mode
        return
    
    def select_dictionary(self): #passes dictionary
        return
    
    def init_learning(self): #passes nothing
        return
