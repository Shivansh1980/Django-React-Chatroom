from django.db import models
from django.contrib.auth import get_user_model
from Chatroom import settings
# Create your models here.
class Message(models.Model):
    username = models.CharField(max_length=25)
    content = models.TextField()
    updated_content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    roomname = models.CharField(max_length=40)
    isanswer = models.BooleanField(default=False)
    isimage = models.BooleanField(default=False)

    def last_40_messages():
        return Message.objects.order_by('timestamp').all()[:40]

class MoodleAuthentication(models.Model):
    name = models.CharField(max_length=50)
    username = models.CharField(unique=True, max_length=40)
    password = models.CharField(max_length=50)
