# Generated by Django 4.2.6 on 2023-11-12 20:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0002_alter_customuser_username'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='customuser',
            name='permission_level',
        ),
        migrations.AddField(
            model_name='customuser',
            name='has_initial_pass',
            field=models.BooleanField(default=True),
        ),
    ]
