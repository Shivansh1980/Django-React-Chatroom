import json
from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer
from .models import Message
from .StringTools import QuestionHelper

class ChatConsumer(WebsocketConsumer):
    def __init__(self):
        super().__init__()

    def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = 'chat_%s' % self.room_name

        # Join room group
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )
        self.accept()

    def disconnect(self, close_code):
        # Leave room group
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name
        )

    def create_event(self, event_type, message):
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type': event_type,
                'message': message
            }
        )

    def is_exists(self, all_messages, message):
        q = QuestionHelper()
        if (q.compare_questions(all_messages, message['content'])):
            message['type'] = 'exists'
            self.create_event('send_message_to_chat', message)
            return True
        return False

    def fetch_messages(self, data):
        message_list = [message for message in Message.objects.all().filter(roomname=data['roomname'])]
        result = []
        for message in message_list:
            content = {
                'username': message.username,
                'message': message.updated_content,
                'roomname':message.roomname
            }
            result.append(content)
        final_content = {'type':'messages','messages':result}
        self.send_fetched_messages(final_content)

    def new_message(self, data):
        username = str(data['username']).strip()
        content = str(data['message']).strip()
        roomname = str(data['roomname']).strip()

        all_messages = [message for message in Message.objects.all().filter(roomname=roomname)]
        data = {
            'content': content,
            'username': username,
            'roomname': roomname
        }
        if (self.is_exists(all_messages, data)):
            return

        message = Message.objects.create(
            username=username,
            content=content,
            updated_content=content,
            roomname=roomname
        )
        message.save()

        message_content = {
            'type':'message',
            'username': message.username,
            'message': message.updated_content,
            'roomname': roomname
        }

        #the command key here you are passing to check inside react that messages are coming
        # or just a single message is coming.
        self.create_event('send_message_to_chat', message_content)

    def update_message(self, data_array):
        my_messages = [message for message in Message.objects.all().filter(roomname=str(data_array['roomname']))]

        message = str(data_array['message'])
        updated_message = str(data_array['updated_message'])
        username = data_array['username']
        answer = str(data_array['answer']).strip()

        message.strip()
        updated_message.strip()

        final_content = {}
        for m in my_messages:
            if m.updated_content == message:
                m.updated_content = updated_message
                m.isanswer = True
                m.save()
                final_content = {
                    'type':'updated_message',
                    'username': username,
                    'answer': answer,
                    'message': message,
                    'updated_message': updated_message
                }
                break
        else:
            final_content = {
                'type': 'updated_message',
                'username': username,
                'answer': answer,
                'message': message,
                'updated_message': updated_message,
                'error':True
            }
        self.create_event('send_message_to_chat', final_content)


    def clear_room_messages(self, data):
        roomname = data['roomname']
        password = data['password']
        message = {}
        message['type'] = 'clear_room_message'
        if(password == 'Shivansh12@#'):
            for m in Message.objects.all().filter(roomname=str(roomname)):
                m.delete()
            message['message'] = 'Room Messages Cleared'
            message['status'] = 'true'
        else:
            message['message'] = 'Wrong Password! Only Owner Can Use This Button'
            message['status'] = 'false'

        self.create_event('send_message_to_chat', message)
        
    def new_file(self, data):
        data['type'] = 'new_file'
        self.create_event('send_message_to_chat', data)
        

    #commands that will be called from react
    commands = {
        'fetch_messages': fetch_messages,
        'new_message':new_message,
        'update_message': update_message,
        'clear_room_messages': clear_room_messages,
        'new_file': new_file
    }

    # Receive message from WebSocket
    def receive(self, text_data):
        data = json.loads(text_data)
        # this will just call the command either fetch_message or new_message
        self.commands[data['command']](self, data)
    

    #Send fetched messages to websocket
    def send_fetched_messages(self, messages):
        self.send(text_data=json.dumps(messages))

    # define the type in message and send it to group
    def send_message_to_chat(self, event):
        message = event['message']
        # Send message to WebSocket
        self.send(text_data=json.dumps({
            'type':message['type'],
            'message': message
        }))
