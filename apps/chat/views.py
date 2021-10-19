from core.utils.default_responses import api_locked_423, api_not_found_404
from django.shortcuts import get_object_or_404
from django.db.models.aggregates import Count
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.generics import GenericAPIView
from rest_framework.parsers import (FileUploadParser, FormParser, JSONParser,
                                    MultiPartParser)
from rest_framework.response import Response

from apps.users.serializers import UserShortChatRetrieveSeriliazer, UserShortRetrieveSeriliazer

from .models import *
from .serializers import *


class RoomCreateAPI(generics.CreateAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomCreationSerializer

    def get_serializer_context(self):
        return {'request': self.request}


class RoomRetrieveAPI(generics.RetrieveAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomGetSerializer


class RoomUpdateAPI(generics.UpdateAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomUpdateSerializer


class RoomDestroyAPI(generics.DestroyAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomCreationSerializer


class MessageCreateAPI(generics.CreateAPIView):
    queryset = Chat.objects.all()
    serializer_class = ChatCreationSerializer
    parser_classes = (JSONParser, MultiPartParser,
                      FileUploadParser, FormParser)

    def get_serializer_context(self):
        return {'request': self.request}


class MessageRetrieveAPI(generics.RetrieveAPIView):
    queryset = Chat.objects.all()
    serializer_class = ChatGetSerializer


class MessageUpdateAPI(generics.UpdateAPIView):
    queryset = Chat.objects.all()
    serializer_class = ChatCreationSerializer


class MessageDeleteAPI(generics.DestroyAPIView):
    queryset = Chat.objects.all()
    serializer_class = ChatCreationSerializer


class GetChatMessages(GenericAPIView):

    serializer_class = ChatMessagesSerializer

    def post(self, request):
        room = get_object_or_404(Room, pk=request.data['room_id'])
        if request.data.get('message_id'):
            objects = Chat.objects.filter(
                room=room,
                pk__lte=request.data['message_id']
            ).order_by('-date')[:50]
        else:
            objects = Chat.objects.filter(
                room=room
            ).order_by('-date')[:50]
        results = []
        domain = request.get_host()

        for obj in objects:
            attachments = obj.attachment.all()
            attachments_info = []
            for readed_obj in obj.delivered_message.all():
                if readed_obj.readed:
                    readed = True
                    break
            else:
                readed = False

            for attachment in attachments:
                if attachment._file and hasattr(attachment._file, 'url'):
                    path_file = attachment._file.url
                    file_url = 'http://{domain}{path}'.format(
                        domain=domain, path=path_file)
                    attachments_info.append(
                        {
                            "file_type": attachment.file_type,
                            "file_url": file_url,
                        }
                    )
                else:
                    file_url = None

            results.append(
                {
                    "id": obj.pk,
                    "room_id": obj.room.pk,
                    "user": UserShortChatRetrieveSeriliazer(instance=obj.user).data,
                    "text": obj.text,
                    "attachments": attachments_info,
                    "date": obj.date.timestamp(),
                    "readed": readed
                },
            )
        return Response(
            results
        )


class InviteUserAPI(generics.UpdateAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomInviteUserSerializer

    def partial_update(self, request, *args, **kwargs):
        if request.user == self.get_object().creator:
            self.get_object().invited.add(
                User.objects.get(username=request.data['username'])
            )
        return super().partial_update(request, *args, **kwargs)

class ChatPartialUpdateAPI(generics.UpdateAPIView):
    queryset = Chat.objects.all()
    serializer_class = ChatPartialSerializer

    def partial_update(self, request, *args, **kwargs):
        return super().partial_update(request, *args, **kwargs)


class GetUnreadedMessagesAmount(APIView):

    def get(self, request):
        user = request.user
        rooms_creator = user.user_creator.all()
        rooms_invited = user.invited_users.all()
        room_ids = []
        for room in rooms_creator:
            room_ids.append(room.pk)
        for room in rooms_invited:
            room_ids.append(room.pk)
        room_ids = set(room_ids)
        messages_amount = user.destination_user.filter(
            readed=False,
            message__room__pk__in=room_ids
        ).values('pk')
        return Response(
            {
                'newMessagesCount': len(messages_amount)
            }
        )


class GetDialogs(APIView):

    serializer_class = RetrieveChatsSerializer

    def post(self, request):
        user = request.user
        rooms_creator = user.user_creator.all()
        rooms_invited = user.invited_users.all()
        result = []
        used_ids = []
        for room in rooms_creator:
            if not room.pk in used_ids:
                used_ids.append(room.pk)
                result.append(
                    {
                        "room": room,
                        "message": Chat.objects.filter(
                            room=room).order_by('-date').first()
                    }
                )

        for room in rooms_invited:
            if not room.pk in used_ids:
                used_ids.append(room.pk)
                result.append(
                    {
                        "room": room,
                        "message": Chat.objects.filter(
                            room=room).order_by('-date').first()
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
                        "user": UserShortRetrieveSeriliazer(instance=user_obj, context={'request': request}).data if user_obj else UserShortRetrieveSeriliazer(instance=room_obj['room'].creator, context={'request': request}).data,
                        "message": {
                            'id': message_obj.id,
                            'time': message_obj.date.timestamp(),
                            'text': message_obj.text,
                            'attachment': attachment,
                        } if message_obj else None,
                    }
                }
            )
        limit = request.data.get('limit', 40)
        offset = request.data.get('offset', 0)
        return Response(filtered_results[offset:limit])
