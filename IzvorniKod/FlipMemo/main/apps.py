from django.apps import AppConfig
from .runtime_models import RuntimeSession

class MainConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'main'

    def ready(self):
        RuntimeSession()