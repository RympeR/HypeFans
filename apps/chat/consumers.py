import json
from apps.users.models import User
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.generic.websocket import WebsocketConsumer
from asgiref.sync import async_to_sync
import requests
from .serializers import ChatCreateSerializer, UserMessageCreationSerializer
from .models import Chat, UserMessage


class ChatConsumer(WebsocketConsumer):
    def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = 'chat_%s' % self.room_name
        print('connected')
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

    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        room = text_data_json['room']
        user = text_data_json['user']
        message = text_data_json['message']
        _file = text_data_json['file']

        payload = {
            'room': room,
            'user': user,
            'text': message
        }
        chat = ChatCreateSerializer(data=payload)
        if chat.is_valid():
            chat.save()
        else:
            print('not valid')
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type': 'chat_message',
                'file': _file,
                'message': message,
                'user': user,
                'room': room,
            }
        )

    def chat_message(self, event):
        print(event)
        message = event['message']
        room = event['room']
        user = event['user']

        message_obj = None
        if event['file']:
            if str(event['file']).isdigit():
                message_obj = int(event['file'])
                chat_obj = Chat.objects.get(pk=message_obj)
                attachments = chat_obj.chat_attachment.all()
                attachments_info = []

                for attachment in attachments:
                    if hasattr(attachment.file, 'url'):
                        path_file = attachment.file.url
                        file_url = 'http://127.0.0.1:8000/{path}'.format(
                            path=path_file)
                        attachments_info.append(
                            {
                                "file_type": attachment.type,
                                "file_url": file_url,
                            }
                        )

        self.send(text_data=json.dumps({
            "room": room,
            "user": user,  # User.objects.get(pk=user).token,
            'message': message,
            'file': attachments_info
        }))


class ReadedConsumer(WebsocketConsumer):
    def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = 'readed_chat_%s' % self.room_name
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )
        self.accept()

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name
        )

    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        room = text_data_json['room']
        user = text_data_json['user']
        message = text_data_json['message']
        messages = [Chat.objects.get(pk=_id) for _id in list(map(int, message))]
        readed_chat = UserMessage.objects.filter(
            message__in=messages,
            user=User.objects.get(pk=int(user))
        )
        readed_chat.readed = True
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type': 'readed_messages',
                'messages': message,
                'user': user,
                'room': room,
            }
        )

    def chat_message(self, event):
        message = event['message']
        room = event['room']
        user = event['user']

        self.send(text_data=json.dumps({
            "room": room,
            "user": user,  # User.objects.get(pk=user).token,
            'messages': message,
        }))
