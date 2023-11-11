from dataclasses import dataclass
from . import models

@dataclass
class UserDTO:
    username: str
    password: str
    name: str
    last_name: str
    email: str
    permission_level: int


#Utility Functions
def permission_level_to_int(permission_level):
    if permission_level == models.PermissionLevel.ADMIN_LEVEL:
        return 1
    else:
        return 0
    
def int_to_permission_level(integer):
    if integer == 0:
        return models.PermissionLevel.USER_LEVEL
    else:
        return models.PermissionLevel.ADMIN_LEVEL

