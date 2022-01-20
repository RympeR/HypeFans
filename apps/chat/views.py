from django.shortcuts import render
from core.utils.default_responses import api_locked_423, api_not_found_404
from django.db.models.aggregates import Count
from django.shortcuts import get_object_or_404
from rest_framework import generics
from rest_framework.generics import GenericAPIView
from rest_framework.parsers import (FileUploadParser, FormParser, JSONParser,
                                    MultiPartParser)
from rest_framework.response import Response
from rest_framework.views import APIView
from core.utils.default_responses import api_block_by_policy_451
from apps.users.serializers import (UserShortChatRetrieveSeriliazer,
                                    UserShortRetrieveSeriliazer)

from .models import *
from .serializers import *


class ChatBoughtCreateAPI(generics.CreateAPIView):
    queryset = ChatBought.objects.all()
    serializer_class = ChatBoughtCreateSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
        except AssertionError:
            return api_block_by_policy_451({"status": "not enought credits"})
        self.perform_create(serializer)
        return Response(serializer.data)

    def get_serializer_context(self):
        return {'request': self.request}


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


class ReadChatMessages(GenericAPIView):
    queryset = Chat.objects.all()
    serializer_class = ChatMessagesSerializer

    def put(self, request):
        user = request.user
        room_id = int(request.data['rooom_id'])
        readed_chat = UserMessage.objects.filter(
            message__room__pk=int(room_id),
            user=user,
            readed=False
        )
        readed_chat.update(readed=True)
        return Response({})


class GetChatMessages(GenericAPIView):
    queryset = Chat.objects.all()
    serializer_class = ChatMessagesSerializer

    def post(self, request):
        user = request.user
        room = get_object_or_404(Room, pk=request.data['room_id'])
        if request.data.get('message_id'):
            objects = Chat.objects.filter(
                room=room,
                pk__lte=request.data['message_id']
            ).order_by('-date')[:50]
        else:
            objects = Chat.objects.filter(
                room=room
            ).order_by('-date')
        results = []
        domain = request.get_host()

        for obj in objects:
            attachments = obj.attachment.all()
            attachments_info = []
            for readed_obj in obj.delivered_message.all():
                if readed_obj.readed and readed_obj.user == user:
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
            paid = False
            if obj.price == 0:
                paid = True
            if ChatBought.objects.filter(user__pk=user.pk, chat__pk=obj.pk).exists():
                paid = True
            
            results.append(
                {
                    "id": obj.pk,
                    "room_id": obj.room.pk,
                    "user": UserShortChatRetrieveSeriliazer(instance=obj.user).data,
                    "text": obj.text,
                    'is_payed': paid,
                    "message_price": obj.price,
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
            for username in request.POST.getlist('username'):
                self.get_object().invited.add(
                    User.objects.get(username=username)
                )
        return super().partial_update(request, *args, **kwargs)


class ChatPartialUpdateAPI(generics.UpdateAPIView):
    queryset = Chat.objects.all()
    serializer_class = ChatPartialSerializer

    def partial_update(self, request, *args, **kwargs):
        return super().partial_update(request, *args, **kwargs)


class GetUnreadedMessagesAmount(GenericAPIView):
    queryset = Chat.objects.all()
    serializer_class = RetrieveChatsSerializer

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


class GetDialogs(GenericAPIView):
    queryset = Chat.objects.all()
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
                            'message_price': message_obj.price,
                            'attachment': attachment,
                        } if message_obj else None,
                    }
                }
            )
        limit = request.data.get('limit', 40)
        offset = request.data.get('offset', 0)
        return Response(filtered_results[offset:limit])


def index(request):
    return render(request, 'chat/index.html', {})


def room(request, room_name):
    return render(request, 'chat/room.html', {
        'room_name': room_name
    })
