from pymongo import MongoClient
from os import environ
from .dto import UserDTO
from warnings import warn
#from dotenv import load_dotenv
#load_dotenv()

def singleton(class_):
    instance = [None] # Hacky

    def get_instance():
        if not instance[0]:
            instance[0] = class_()

        return instance[0]
    
    return get_instance

def _doc_to_dto(doc) -> UserDTO:
    return UserDTO(
        username=doc["username"],
        password=doc["encryptedPass"],
        name=doc["first_name"],
        last_name=doc["last_name"],
        email=doc["email"],
        permission_level=int(doc["isAdmin"]),
        has_initial_pass=bool(doc["hasInitialPass"])
    )

class UniqueConstraintError(Exception):
    def __init__(self, msg):
        super().__init__(msg)

@singleton
class Database:
    def __init__(self):
            self.client = MongoClient(environ["DB_CONNECTION_STRING"])

            self.accounts_col = self.client["CanonPrinterDB"]["Accounts"]
            self.dicts_col = self.client["CanonPrinterDB"]["Dictionaries"]
            self.dict_progresses_col = self.client["CanonPrinterDB"]["DicitonaryProgresses"]
            self.pronun_audios_col = self.client["CanonPrinterDB"]["PronunciationAudios"]
            self.words_col = self.client["CanonPrinterDB"]["Words"]

    def modify_user(self, oldUserDto: UserDTO, new_UserDTO: UserDTO) -> None:
        # if self.accounts_col.count_documents({ 
        #     "$and": [
        #         { "username": { "$ne": old_UserDTO.username } }, 
        #         { "username": new_UserDTO.username }
        #     ]
        #     }):
        #     raise UniqueConstraintError("Cannot change username to a preexisting one.")
        
        # if oldUserDto.email != new_UserDTO.email and self.accounts_col.count_documents({ 
        #                                                 "$and": [
        #                                                     { "email": { "$ne": oldUserDto.email } }, 
        #                                                     { "email": new_UserDTO.email }
        #                                                 ]
        #                                                 }):
        #     raise UniqueConstraintError("Cannot change e-mail to a preexisting one.")
        
        self.accounts_col.find_one_and_update(
            { "email" : oldUserDto.email },
            { "$set" : {
                "username" : new_UserDTO.username,
                #"email" : new_UserDTO.email,
                "encryptedPass" : new_UserDTO.password,
                "first_name" : new_UserDTO.name,
                "last_name" : new_UserDTO.last_name,
                "isAdmin" : bool(new_UserDTO.permission_level),
                "hasInitialPass" : oldUserDto.has_initial_pass
            }}
        )

    def add_user(self, userDTO: UserDTO) -> None:
        # if self.accounts_col.count_documents({ "username" : userDTO.username }):
        #     raise UniqueConstraintError("Cannot add a new account to the database without a unique username.")

        if self.accounts_col.count_documents({ "email" : userDTO.email }):
            raise UniqueConstraintError("Cannot add a new account to the database without a unique e-mail.")

        self.accounts_col.insert_one({
            "username" : userDTO.username,
            "email" : userDTO.email,
            "encryptedPass" : userDTO.password,
            "first_name" : userDTO.name,
            "last_name" : userDTO.last_name,
            "isAdmin" : bool(userDTO.permission_level),
            "hasInitialPass" : True
        })

    def delete_user(self, email) -> None:
        delete_result = self.accounts_col.delete_one({ "email" : email })

        if delete_result.deleted_count == 0:
            warn(f"No account with email \"{email}\" to delete.")

    def set_role(self, userDto: UserDTO, role: int) -> None:
        res = self.accounts_col.find_one_and_update(
                { "email" : userDto.email },
                { "$set" : {
                    "isAdmin" : bool(role)
                }}
            )
        
        if not res:
            warn(f"No account with username \"{userDto.email}\" to change role for.")

    def get_users(self) -> list[UserDTO]:
        return [_doc_to_dto(doc) for doc in self.accounts_col.find({})]

    def get_admins(self) -> list[UserDTO]:
        return [_doc_to_dto(doc) for doc in self.accounts_col.find({ "isAdmin" : True })]

    def get_students(self) -> list[UserDTO]:
        return [_doc_to_dto(doc) for doc in self.accounts_col.find({ "isAdmin" : False })]
