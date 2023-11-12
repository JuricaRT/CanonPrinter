from apps.main.models import CustomUser, PermissionLevel
from apps.main.database import Database as db
from apps.main import dto

class DatabaseSync:
    
    @staticmethod
    def sync_models_with_db():
        database = db()

        temp_users = CustomUser.objects.all()
        for temp_user in temp_users:
            temp_user.delete()

        usersDTO = database.get_users()
        users = []
        for userDTO in usersDTO:
            CustomUser.objects.create_user(
                username = userDTO.username,
                password = userDTO.password,
                email = userDTO.email,
                name = userDTO.name,
                last_name = userDTO.last_name,
                permission_level = dto.int_to_permission_level(userDTO.permission_level),
                has_initial_pass = userDTO.has_initial_pass
            )

