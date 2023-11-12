from django.apps import AppConfig
import sys

class MainConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'apps.main'

    def ready(self):
        from .on_init import DatabaseSync
        DatabaseSync.sync_models_with_db()