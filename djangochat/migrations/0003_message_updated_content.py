# Generated by Django 3.1.4 on 2021-03-09 10:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('djangochat', '0002_message_isanswer'),
    ]

    operations = [
        migrations.AddField(
            model_name='message',
            name='updated_content',
            field=models.TextField(default=str),
            preserve_default=False,
        ),
    ]
