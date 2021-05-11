from django.http import request
from rest_framework import generics, permissions, renderers
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import *
from .serializers import *
from rest_framework.parsers import MultiPartParser, JSONParser, FormParser
from rest_framework.generics import GenericAPIView
from rest_framework.mixins import UpdateModelMixin


class RoomListCreateAPI(generics.ListCreateAPIView):
    permission_classes = (permissions.IsAuthenticated, )
    queryset = Room.objects.all()
    parser_classes = (JSONParser, MultiPartParser, FormParser)
    serializer_class = RoomGetSerializer


class RoomCreateAPI(generics.CreateAPIView):
    permission_classes = (permissions.IsAuthenticated, )
    queryset = Room.objects.all()
    parser_classes = (JSONParser, MultiPartParser, FormParser)
    serializer_class = RoomCreationSerializer

class RoomRetrieveAPI(generics.RetrieveAPIView):
    permission_classes = (permissions.IsAuthenticated, )
    queryset = Room.objects.all()
    parser_classes = (JSONParser, MultiPartParser, FormParser)
    serializer_class = RoomGetSerializer

class RoomAPI(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (permissions.IsAuthenticated, )
    queryset = Room.objects.all()
    parser_classes = (JSONParser, MultiPartParser, FormParser)
    serializer_class = RoomCreationSerializer


class MessageListCreateAPI(generics.ListCreateAPIView):
    permission_classes = (permissions.IsAuthenticated, )
    queryset = Chat.objects.all()
    parser_classes = (JSONParser, MultiPartParser, FormParser)
    serializer_class = ChatGetSerializer


class MessageCreateAPI(generics.CreateAPIView):
    permission_classes = (permissions.IsAuthenticated, )
    queryset = Chat.objects.all()
    parser_classes = (JSONParser, MultiPartParser, FormParser)
    serializer_class = ChatCreationSerializer

class MessageRetrieveAPI(generics.RetrieveAPIView):
    permission_classes = (permissions.IsAuthenticated, )
    queryset = Chat.objects.all()
    parser_classes = (JSONParser, MultiPartParser, FormParser)
    serializer_class = ChatGetSerializer


class MessageAPI(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (permissions.IsAuthenticated, )
    queryset = Chat.objects.all()
    parser_classes = (JSONParser, MultiPartParser, FormParser)
    serializer_class = ChatCreationSerializer


class UserMessageListCreateAPI(generics.ListCreateAPIView):
    permission_classes = (permissions.IsAuthenticated, )
    queryset = UserMessage.objects.all()
    parser_classes = (JSONParser, MultiPartParser, FormParser)
    serializer_class = UserMessageGetSerializer


class UserMessageCreateAPI(generics.CreateAPIView):
    permission_classes = (permissions.IsAuthenticated, )
    queryset = UserMessage.objects.all()
    parser_classes = (JSONParser, MultiPartParser, FormParser)
    serializer_class = UserMessageCreationSerializer

class UserMessageRetrieveAPI(generics.RetrieveAPIView):
    permission_classes = (permissions.IsAuthenticated, )
    queryset = UserMessage.objects.all()
    parser_classes = (JSONParser, MultiPartParser, FormParser)
    serializer_class = UserMessageGetSerializer


class UserMessageAPI(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (permissions.IsAuthenticated, )
    queryset = UserMessage.objects.all()
    parser_classes = (JSONParser, MultiPartParser, FormParser)
    serializer_class = UserMessageGetSerializer


class UserMessagePartialUpdateView(GenericAPIView, UpdateModelMixin):
    queryset = UserMessage.objects.all()
    serializer_class = UserMessageGetSerializer
    permission_classes = (permissions.IsAuthenticated, )
    
    def put(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)
