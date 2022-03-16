import json
import logging

from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer

from apps.blog.models import Attachment
from apps.users.models import User, chat_sub_checker
from apps.users.serializers import (UserShortChatRetrieveSeriliazer,
                                    UserShortSocketRetrieveSeriliazer)

from .models import Chat, Room, UserMessage
from .serializers import ChatGetSerializer, RoomSocketSerializer


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
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name
        )

    def receive(self, text_data):
        print(text_data)
        try:
            text_data_json = json.loads(text_data)
            room = text_data_json['room_id']
            message_id = text_data_json['message_id']
            is_payed = text_data_json['is_payed']
            message_price = text_data_json['message_price']
            user = text_data_json['user']
            date = text_data_json['date']
            message = text_data_json['text']
            _file = text_data_json['attachments']
            room = Room.objects.get(pk=room)
            user = User.objects.get(pk=user)
            blocked = False
            if 1 + len(room.invited.all()) == 2:
                if user == room.creator:
                    blocked = True if user in room.invited.first().blocked_users.all() else False
                else:
                    blocked = True if user in room.cretor.blocked_users.all() else False
            if not blocked:
                chat_sub_check = True
                if user != room.creator:
                    chat_sub_check = chat_sub_checker(user, room.creator)
                if chat_sub_check:
                    chat = Chat.objects.create(
                        room=room,
                        user=user,
                        text=message,
                        price=message_price,
                    )
                    chat.attachment.set(
                        Attachment.objects.filter(pk__in=_file))
                    async_to_sync(self.channel_layer.group_send)(
                        self.room_group_name,
                        {
                            'type': 'chat_message',
                            'attachments': _file,
                            'text': message,
                            'date': chat.date.timestamp(),
                            'message_id': chat.pk,
                            'is_payed': is_payed,
                            'message_price': message_price,
                            'user': UserShortChatRetrieveSeriliazer(
                                instance=user).data,
                            'room_id': room.pk,
                        }
                    )
                else:
                    async_to_sync(self.channel_layer.group_send)(
                        self.room_group_name,
                        {
                            'type': 'chat_message',
                            'attachments': [],
                            'text': 'need tio resubscribe',
                            'date': 0,
                            'message_id': -2,
                            'is_payed': False,
                            'message_price': 0,
                            'user': UserShortChatRetrieveSeriliazer(
                                instance=user).data,
                            'room_id': room.pk,
                        }
                    )

            else:
                async_to_sync(self.channel_layer.group_send)(
                    self.room_group_name,
                    {
                        'type': 'chat_message',
                        'attachments': [],
                        'text': '',
                        'date': 0,
                        'message_id': -1,
                        'is_payed': False,
                        'message_price': 0,
                        'user': 0,
                        'room_id': 0,
                    }
                )

        except Exception as e:
            print(e)
            logging.error(e)

    def chat_message(self, event):
        try:
            message_price = event['message_price']
            message_id = event['message_id']
            message = event['text']
            room = event['room_id']
            user = event['user']
            date = event['date']
            is_payed = event['is_payed']
            attachments_info = []
            is_payed = False
            if message_price == 0:
                is_payed = True

            if event['attachments']:
                attachments_pk = event['attachments']
                attachments = Attachment.objects.filter(pk__in=attachments_pk)
                for attachment in attachments:
                    try:
                        if attachment._file and hasattr(attachment._file, 'url'):
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
        except Exception as e:
            print(e)
            logging.error(e)
        try:
            user = UserShortChatRetrieveSeriliazer(
                instance=User.objects.get(pk=user)).data
        except Exception as e:
            user = 0
            logging.error(e)

        self.send(text_data=json.dumps({
            "room_id": room,
            "user": user,
            "text": message,
            "date": date,
            "message_id": message_id,
            "is_payed": is_payed,
            "price": message_price,
            "attachments": attachments_info
        }))


class ReadedConsumer(WebsocketConsumer):
    def connect(self):
        try:
            self.room_name = self.scope['url_route']['kwargs']['room_name']
            self.room_group_name = f'readed_chat_{self.room_name}'
            async_to_sync(self.channel_layer.group_add)(
                self.room_group_name,
                self.channel_name
            )
            self.accept()
        except Exception as e:
            print(e)
            logging.error(e)

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name
        )

    def receive(self, text_data):
        try:
            text_data_json = json.loads(text_data)
            room = text_data_json['room_id']
            user = text_data_json['user']
            message = text_data_json['message_id']
            if message == 0:
                readed_chat = UserMessage.objects.filter(
                    user=User.objects.get(pk=user),
                    readed=False
                )
            else:
                readed_chat = UserMessage.objects.filter(
                    message__pk=message,
                    user=User.objects.get(pk=user),
                    readed=False
                )
            logging.warning(f'Readed qs {readed_chat}')
            readed_chat.update(readed=True)
            async_to_sync(self.channel_layer.group_send)(
                self.room_group_name,
                {
                    'type': 'chat_message',
                    'message_id': message,
                    'user': user,
                    'room_id': room,
                }
            )
        except Exception as e:
            logging.error(e)

    def chat_message(self, event):
        message = event['message_id']
        room = event['room_id']
        user = event['user']

        self.send(text_data=json.dumps({
            "room_id": room,
            "user": user,
            'message_id': message,
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
        is_payed = False
        if message.price == 0:
            is_payed = True
        if is_payed:
            message.text = ''
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
                user_obj = None
                if room_obj['message'] and hasattr(room_obj['message'], 'user'):
                    user_obj = room_obj['message'].user
                message_obj = room_obj['message'] if room_obj['message'] else None
                attachment = True if message_obj and message_obj.attachment.all().exists() else False
                filtered_results.append(
                    {
                        "room": {
                            "blocked": room_obj['blocked'],
                            "user": UserShortSocketRetrieveSeriliazer(
                                instance=user_obj).data
                            if user_obj
                            else UserShortSocketRetrieveSeriliazer(
                                instance=room_obj['room'].creator).data,
                            "message": {
                                'id': message_obj.id,
                                'time': message_obj.date.timestamp(),
                                'text': message_obj.text,
                                'price': message_obj.price,
                                'attachment': attachment,
                            } if message_obj else None,
                            "room_info": RoomSocketSerializer(instance=room_obj['room']).data
                        }
                    }
                )
            async_to_sync(self.channel_layer.group_send)(
                self.room_group_name,
                {
                    'type': 'chat_message',
                    'room': filtered_results,
                }
            )
        except Exception as e:
            logging.error(e)

    def chat_message(self, event):
        try:
            room = event['room']
            self.send(text_data=json.dumps({
                "room": room,
            }))
        except Exception as e:
            logging.error(e)
