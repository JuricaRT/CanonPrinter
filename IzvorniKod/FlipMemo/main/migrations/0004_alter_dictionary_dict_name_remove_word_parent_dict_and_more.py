# Generated by Django 4.1.13 on 2023-12-20 19:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0003_question_session_dictionary_word_studydata'),
    ]

    operations = [
        migrations.AlterField(
            model_name='dictionary',
            name='dict_name',
            field=models.CharField(max_length=64),
        ),
        migrations.RemoveField(
            model_name='word',
            name='parent_dict',
        ),
        migrations.AlterUniqueTogether(
            name='dictionary',
            unique_together={('dict_name', 'language')},
        ),
        migrations.AddField(
            model_name='word',
            name='parent_dict',
            field=models.ManyToManyField(to='main.dictionary'),
        ),
    ]
