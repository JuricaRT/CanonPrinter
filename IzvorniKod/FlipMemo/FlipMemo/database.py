from pymongo import MongoClient
from pymongo.collection import Collection
from os import environ
from apps.main import dto
from hashlib import sha256 # temp
from warnings import warn

class UsernameAlreadyExists(Exception):
    def __init__(self, msg):
        super().__init__(msg)

accounts_col: Collection = None
dicts_col: Collection = None
dict_progresses_col: Collection = None
pronun_audios_col: Collection = None
words_col: Collection = None

def _db_init():
    global accounts_col
    global dicts_col
    global dict_progresses_col
    global pronun_audios_col
    global words_col
        
    client = MongoClient(environ["DB_CONNECTION_STRING"])

    accounts_col = client["CanonPrinterDB"]["Accounts"]
    dicts_col = client["CanonPrinterDB"]["Dictionaries"]
    dict_progresses_col = client["CanonPrinterDB"]["DicitonaryProgresses"]
    pronun_audios_col = client["CanonPrinterDB"]["PronunciationAudios"]
    words_col = client["CanonPrinterDB"]["Words"]

def _doc_to_dto(doc) -> dto.UserDTO:
    return dto.UserDTO(
        username=doc["username"],
        password="", # temp
        name=doc["first_name"],
        last_name=doc["last_name"],
        email=doc["email"],
        permission_level=int(doc["isAdmin"])
    )

def modify_user(target_username: str, new_UserDTO: dto.UserDTO) -> None:
    if accounts_col.count_documents({ 
        "$and": [
            { "username": { "$ne": target_username } }, 
            { "username": new_UserDTO.username }
        ]
        }):
        raise UsernameAlreadyExists("Cannot change username to a preexisting one.")
    
    accounts_col.find_one_and_update(
        { "username" : target_username },
        { "$set" : {
            "username" : new_UserDTO.username,
            "email" : new_UserDTO.email,
            "encryptedPass" : sha256(new_UserDTO.password.encode("utf-8")).digest(), # temp
            "first_name" : new_UserDTO.name,
            "last_name" : new_UserDTO.last_name,
            "isAdmin" : bool(new_UserDTO.permission_level)
        }}
    )

def add_user(userDTO: dto.UserDTO) -> None:
    if accounts_col.count_documents({ "username" : userDTO.username }):
        raise UsernameAlreadyExists("Cannot add a new account to the database without a unique username.")

    accounts_col.insert_one({
        "username" : userDTO.username,
        "email" : userDTO.email,
        "encryptedPass" : sha256(userDTO.password.encode("utf-8")).digest(), # temp
        "first_name" : userDTO.name,
        "last_name" : userDTO.last_name,
        "isAdmin" : bool(userDTO.permission_level),
        "hasInitialPass" : True
    })

def delete_user(userDTO: dto.UserDTO) -> None:
    delete_result = accounts_col.delete_one({ "username" : userDTO.username })

    if delete_result.deleted_count == 0:
        warn(f"No account with username \"{userDTO.username}\" to delete.")

def set_role(target_username: str, role: int) -> None: #0 user, 1 admin, ostalo nedefinirano
    res = accounts_col.find_one_and_update(
            { "username" : target_username },
            { "$set" : {
                "isAdmin" : bool(role)
            }}
        )
    
    if not res:
        warn(f"No account with username \"{target_username}\" to change role for.")

def get_users() -> list[dto.UserDTO]:
    return [_doc_to_dto(doc) for doc in accounts_col.find({})]

def get_admins() -> list[dto.UserDTO]:
    return [_doc_to_dto(doc) for doc in accounts_col.find({ "isAdmin" : True })]

def get_students() -> list[dto.UserDTO]:
    return [_doc_to_dto(doc) for doc in accounts_col.find({ "isAdmin" : False })]

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

if __name__ == "FlipMemo.database":
    _db_init()
