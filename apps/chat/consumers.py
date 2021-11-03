import json
import logging

import requests
from asgiref.sync import async_to_sync
from channels.generic.websocket import (AsyncWebsocketConsumer,
                                        WebsocketConsumer)
from apps.blog.models import Attachment

from apps.users.models import User
from apps.users.serializers import UserShortChatRetrieveSeriliazer, UserShortRetrieveSeriliazer

from .models import Chat, Room, UserMessage
from .serializers import ChatCreationSerializer, ChatGetSerializer, UserMessageCreationSerializer


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
        print('recieved')
        text_data_json = json.loads(text_data)
        room = text_data_json['room']
        user = text_data_json['user']
        message = text_data_json['message']
        _file = text_data_json['file']

        chat = Chat.objects.create(
            room=Room.objects.get(pk=room),
            user=User.objects.get(pk=user),
            text=message,
        )
        chat.attachment.set(Attachment.objects.filter(pk__in=_file))

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
        room = int(event['room'])
        user = int(event['user'])
        attachments_info = []
        if event['file']:
            print(event['file'])
            attachments_pk = event['file']
            attachments = Attachment.objects.filter(pk__in=attachments_pk)
            for attachment in attachments:
                try:
                    if attachment._file and hasattr(attachment._file, 'url'):
                        print(attachments_info)
                        path_file = attachment._file.url
                        file_url = 'https://hype-fans.com/{path}'.format(
                            path=path_file)
                        attachments_info.append(
                            {
                                "file_type": attachment.file_type,
                                "file_url": file_url,
                            }
                        )
                except Exception as e:
                    print(e)
        try:
            user = UserShortChatRetrieveSeriliazer(
                instance=User.objects.get(pk=user)).data
        except Exception as e:
            user = 0

        self.send(text_data=json.dumps({
            "room": room,
            # .token,
            "user": user,
            "message": message,
            "file": attachments_info
        }))


class ReadedConsumer(WebsocketConsumer):
    def connect(self):
        try:
            self.room_name = self.scope['url_route']['kwargs']['room_name']
            self.user_id = self.scope['url_route']['kwargs']['user_id']
            self.room_group_name = f'readed_chat_{self.room_name}_{self.user_id}'
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
        except Exception as e:
            print(e)

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
        message = int(message)
        readed_chat = UserMessage.objects.filter(
            message__pk=message,
            user=User.objects.get(pk=int(user)),
            readed=False
        )
        readed_chat.update(readed=True)
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message,
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
            'message': message,
        }))


class LastMessageConsumer(WebsocketConsumer):
    def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = 'last_message_%s' % self.room_name
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
        message = Chat.objects.filter(
            room__pk=int(self.room_name)).order_by('-date').first()
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': ChatGetSerializer(instance=message).data,
            }
        )

    def chat_message(self, event):
        message = event['message']
        self.send(text_data=json.dumps({
            'message': message,
        }))


class ChatRoomsConsumer(WebsocketConsumer):
    def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['user_id']
        self.room_group_name = 'chat_rooms_%s' % self.room_name
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
        try:
            user = User.objects.get(pk=int(self.room_name))
            rooms_creator = user.user_creator.all()
            rooms_invited = user.invited_users.all()
            result = []
            used_ids = []
            for room in rooms_creator:
                if not room.pk in used_ids:
                    blocked = True if user in room.invited.first().blocked_users.all() else False
                    used_ids.append(room.pk)
                    result.append(
                        {
                            "room": room,
                            "message": Chat.objects.filter(
                                room=room).order_by('-date').first(),
                            "blocked": blocked,
                        }
                    )

            for room in rooms_invited:
                if not room.pk in used_ids:
                    blocked = True if user in room.creator.blocked_users.all() else False
                    used_ids.append(room.pk)
                    result.append(
                        {
                            "room": room,
                            "message": Chat.objects.filter(
                                room=room).order_by('-date').first(),
                            "blocked": blocked,
                        }
                    )

            filtered_results = []
            for room_obj in result:
                user_obj = room_obj['message'].user if room_obj['message'] and hasattr(
                    room_obj['message'], 'user') else None
                message_obj = room_obj['message'] if room_obj['message'] else None
                attachment = True if message_obj and message_obj.attachment.all().exists() else False

                filtered_results.append(
                    {
                        "room": {
                            "id": room_obj['room'].id,
                            "logo": room_obj['room'].get_logo,
                            "blocked": room_obj['blocked'],
                            "user": UserShortRetrieveSeriliazer(
                                instance=user_obj).data
                            if user_obj
                            else UserShortRetrieveSeriliazer(
                                instance=room_obj['room'].creator).data,
                            "message": {
                                'id': message_obj.id,
                                'time': message_obj.date.timestamp(),
                                'text': message_obj.text,
                                'attachment': attachment,
                            } if message_obj else None,
                        }
                    }
                )
            # print(filtered_results)
            async_to_sync(self.channel_layer.group_send)(
                self.room_group_name,
                {
                    'type': 'chat_message',
                    'room': filtered_results,
                }
            )
        except Exception as e:
            print(e)

    def chat_message(self, event):
        try:
            room = event['room']
            self.send(text_data=json.dumps({
                "room": room,
            }))
        except Exception as e:
            print(e)
