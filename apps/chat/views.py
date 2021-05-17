from django.http import request
from rest_framework import generics, permissions, renderers
from rest_framework.views import APIView
from rest_framework.response import Response
from core.utils.default_responses import api_not_found_404, api_locked_423
from .models import *
from .serializers import *
from rest_framework.parsers import MultiPartParser, JSONParser, FormParser, FileUploadParser
from rest_framework.generics import GenericAPIView
from rest_framework.mixins import UpdateModelMixin
from django.shortcuts import get_object_or_404


class RoomListCreateAPI(generics.ListCreateAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomGetSerializer


class RoomCreateAPI(generics.CreateAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomCreationSerializer


class RoomRetrieveAPI(generics.RetrieveAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomGetSerializer


class RoomAPI(generics.RetrieveUpdateDestroyAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomCreationSerializer


class MessageListCreateAPI(generics.ListCreateAPIView):
    queryset = Chat.objects.all()
    serializer_class = ChatGetSerializer


class MessageCreateAPI(generics.CreateAPIView):
    queryset = Chat.objects.all()
    serializer_class = ChatCreationSerializer
    parser_classes = (JSONParser, MultiPartParser,
                      FileUploadParser, FormParser)


class MessageRetrieveAPI(generics.RetrieveAPIView):
    queryset = Chat.objects.all()
    serializer_class = ChatGetSerializer


class MessageAPI(generics.RetrieveUpdateDestroyAPIView):
    queryset = Chat.objects.all()
    serializer_class = ChatCreationSerializer


class UserMessageListCreateAPI(generics.ListCreateAPIView):
    queryset = UserMessage.objects.all()
    serializer_class = UserMessageGetSerializer


class UserMessageCreateAPI(generics.CreateAPIView):
    queryset = UserMessage.objects.all()
    serializer_class = UserMessageCreationSerializer


class UserMessageRetrieveAPI(generics.RetrieveAPIView):
    queryset = UserMessage.objects.all()
    serializer_class = UserMessageGetSerializer


class UserMessageAPI(generics.RetrieveUpdateDestroyAPIView):
    queryset = UserMessage.objects.all()
    serializer_class = UserMessageGetSerializer


class UserMessagePartialUpdateView(GenericAPIView, UpdateModelMixin):
    queryset = UserMessage.objects.all()
    serializer_class = UserMessageGetSerializer

    def put(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)


class GetChatMessages(GenericAPIView):

    serializer_class = ChatMessagesSerializer

    def post(self, request):
        chat_validator = self.get_serializer(request.data)
        if chat_validator.is_valid():
            data = chat_validator.data
            room = get_object_or_404(Room, data['room_id'])
            objects = Chat.objects.filter(
                room=room,
                pk__lte=data['message_id']
            ).order_by('-date')[:15]
            results = []
            domain = request.get_host()

            for obj in objects:
                attachments = obj.chat_attachment.all()
                attachments_info = []
                for readed_obj in obj.delivered_message.all():
                    if readed_obj.readed:
                        readed = True
                        break
                else:
                    readed = False

                for attachment in attachments:
                    if hasattr(attachment.file, 'url'):
                        path_file = attachment.file.url
                        file_url = 'http://{domain}{path}'.format(
                            domain=domain, path=path_file)
                        attachments_info.append(
                            {
                                "file_type": attachment.type,
                                "file_url": file_url,
                            }
                        )
                    else:
                        file_url = None

                results.append(
                    {
                        "id": obj.pk,
                        "room_id": obj.room.pk,
                        "user_id": obj.user.pk,
                        "text": obj.text,
                        "attachments": attachments_info,
                        "date": obj.date,
                        "readed": readed
                    },
                )
            return Response(
                results
            )
        else:
            return api_not_found_404()


class GetDialogs(GenericAPIView):

    serializer_class = RetrieveChatsSerializer

    def post(self, request):
        user = request.user
        rooms_creator = user.user_creator.all()
        rooms_invited = user.invited_users.all()
        result = []
        for room in rooms_creator:
            result.append(
                {
                    "room": room,
                    "message": Chat.objects.filter(
                        room=room).order_by('-date').first()
                }
            )

        for room in rooms_invited:
            result.append(
                {
                    "room": room,
                    "message": Chat.objects.filter(
                        room=room).order_by('-date').first()
                }
            )

        filtered_results = []
        for room_obj in result:
            user_obj = room_obj['message'].user
            message_obj = room_obj['message']
            attachment = True if message_obj.chat_attachment.all().exists() else False

            filtered_results.append(
                {
                    "room": {
                        "id": room_obj['room'].id,
                        "user": {
                            'id': user_obj.id,
                            'avatar': user_obj.avatar,
                            'username': user_obj.username,
                        },
                        "message": {
                            'id': message_obj.id,
                            'time': message_obj.date,
                            'text': message_obj.text,
                            'attachment': attachment,
                        },
                    }
                }
            )
        limit = request.data.get('limit', 40)
        offset = request.data.get('offset', 0)
        return filtered_results[offset:limit]
