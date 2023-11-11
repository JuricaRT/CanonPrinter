from dataclasses import dataclass, fields
from . import models

@dataclass
class DefaultVal:
    val: any

@dataclass
class UserDTO:
    username: str = ''
    password: str = ''
    name: str = ''
    last_name: str = ''
    email: str = ''
    permission_level: int = 0

    def __post_init__(self):
        for field in fields(self):
            if isinstance(field.default, DefaultVal):
                field_val = getattr(self, field.name)
                if isinstance(field_val, DefaultVal) or field_val is None:
                    setattr(self, field.name, field.default.val)


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

