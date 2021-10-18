import json
import logging

import requests
from asgiref.sync import async_to_sync
from channels.generic.websocket import (AsyncWebsocketConsumer,
                                        WebsocketConsumer)

from apps.users.models import User

from .models import Chat, UserMessage
from .serializers import ChatCreationSerializer, UserMessageCreationSerializer


class ChatConsumer(WebsocketConsumer):
    def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = 'chat_%s' % self.room_name
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
        chat = ChatCreationSerializer(data=payload)
        if chat.is_valid():
            chat.save()
        else:
            logging.warning('not valid')
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
                        file_url = 'https://hype-fans.com/{path}'.format(
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
            "message": message,
            "file": attachments_info
        }))


class ReadedConsumer(WebsocketConsumer):
    def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.user_id = self.scope['url_route']['kwargs']['user_id']
        self.room_group_name = 'readed_chat_%s_%s' % self.room_name, self.user_id
        readed_chat = UserMessage.objects.filter(
            message__room__pk=int(self.room_name),
            user__pk=int(self.user_id),
            readed=False
        )
        readed_chat.update(readed=True)
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
        messages = list(map(int, message))
        readed_chat = UserMessage.objects.filter(
            message__pk__in=messages,
            user=User.objects.get(pk=int(user)),
            readed=False
        )
        readed_chat.update(readed=True)
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
            "user": user,
            'messages': message,
        }))
