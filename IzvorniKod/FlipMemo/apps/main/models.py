from django.db import models
from enum import Enum
import dto

class PermissionLevel(models.TextChoices):
    ADMIN_LEVEL = 'ADMIN'
    USER_LEVEL = 'USER'


class User(models.Model):
    user_name = models.CharField(max_length=32)
    password = models.CharField(max_length=255)
    name = models.CharField(max_length=32)
    last_name = models.CharField(max_length=32)
    email = models.CharField(max_length=255)
    permission_level = models.CharField(max_length=5, choices=PermissionLevel.choices, default=PermissionLevel.USER_LEVEL)

    def register():
        return
    
    def login():
        return
    
    def view_user_data():
        return
    
    def change_user_data():
        return
    
    def delete_user():
        return  

    def to_dto(self):
        user_dto = dto.UserDTO()
        user_dto.user_name = self.user_name
        user_dto.password = self.password
        user_dto.name = self.name 
        user_dto.email = self.email      
        user_dto.permission_level = self.permission_level
        return user_dto      
    
class Administrator(User):
    def add_administrator(user_name):
        return
    
    def create_dictionary(): #passes dictionary
        return
    
    def add_word(): #passes dictionary, word
        return
    
    def remove_word(): #passes dictionary, word
        return
    
    def change_word(): #passes dictionary, old_word, new_word
        return
    
class Student(User):
    #session attr
    def select_learning_mode(): #passes mode
        return
    
    def select_dictionary(): #passes dictionary
        return
    
    def init_learning(): #passes nothing
        return
