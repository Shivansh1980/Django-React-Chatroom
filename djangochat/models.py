from django.db import models
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