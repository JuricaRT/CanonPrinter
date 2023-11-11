from pymongo import MongoClient
from os import environ
from apps.main import dto

client: MongoClient = None

def _db_init():
    global client
        
    client = MongoClient(environ["DB_CONNECTION_STRING"])

# Ovdje dodavajte prototipove funckija za pristup bazi podataka koje vam trebaju.
# npr.:
#  
# def add_user(name: str, [itd.]) -> None:
#    """[Opis funkcuionalnosti ako iz imena funkcije nije očito.
#    Korsitite type-hintig za parametre i povratne vrijednosti!!!]"""
#    pass
# 
# Ja ću dalje implementirati tijela funckija da obavljaju traženu funkcionalnost.
# Ovaj modul možete importati iz bilo kojih aplikacija ovako: "import FlipMemo.database as db"
# i ne koristite privatne funkcije (one kojima ime pocinje sa '_').

def modify_user(target_username: str, userDTO: dto.UserDTO):
    return

def add_user(userDTO: dto.UserDTO):
    return

def delete_user(userDTO: dto.UserDTO):
    return

def set_role(target_username: str, role: int): #0 user, 1 admin, ostalo nedefinirano
    return

def get_users():
    return #vraca sve dto.UserDTO bez obzira na role

def get_admins():
    return #vraca sve dto.UserDTO gdje je role 1

def get_students():
    return #vraca sve dto.UserDTO gdje je role 0

if __name__ == "FlipMemo.database":
    _db_init()
