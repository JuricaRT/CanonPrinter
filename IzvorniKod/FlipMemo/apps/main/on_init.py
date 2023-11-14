from apps.main.models import CustomUser, PermissionLevel
from apps.main.database import Database as db
from apps.main import dto

class DatabaseSync():
    
    @staticmethod
    def sync_models_with_db():
        database = db()

        try:
            temp_users = CustomUser.objects.all()
            for temp_user in temp_users:
                temp_user.delete()
        except Exception as e:
            print("Cannot delete users")
            print(e)
            return

        usersDTO = database.get_users()
        for userDTO in usersDTO:
            try:
                CustomUser.objects.create_user(
                    username = userDTO.username,
                    password = userDTO.password,
                    email = userDTO.email,
                    name = userDTO.name,
                    last_name = userDTO.last_name,
                    permission_level = dto.int_to_permission_level(userDTO.permission_level),
                    has_initial_pass = userDTO.has_initial_pass
                )
                if userDTO.email == 'kristijan.milic02@gmail.com':
                    user = CustomUser.objects.get(email='kristijan.milic02@gmail.com')
                    user.set_password('admin')
                    user.save()
            except Exception as e:
                print('User dto is invalid')
                print(userDTO)
