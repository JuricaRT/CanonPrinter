from django.apps import AppConfig
import sys
from django.contrib.auth.signals import user_logged_out

class MainConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'apps.main'

    def ready(self):
        from .on_init import DatabaseSync
        DatabaseSync.sync_models_with_db()

        user_logged_out.connect(self.delete_session)

    def delete_session(self, sender, user, request, **kwargs):
        print(user)
    