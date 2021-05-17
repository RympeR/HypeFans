from rest_framework import serializers
from core.utils.customFields import TimestampField
from .models import (
    Room,
    Chat,
    UserMessage
)
from apps.blog.serializers import AttachmentSerializer
from apps.users.serializers import UserGetSerializer


class RoomGetSerializer(serializers.ModelSerializer):

    creator = UserGetSerializer()
    invited = UserGetSerializer(many=True)
    date = TimestampField(required=False)

    class Meta:
        model = Room
        fields = '__all__'


class RoomCreationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Room
        exclude = 'date',

class ChatGetSerializer(serializers.ModelSerializer):
    
    room = RoomGetSerializer()
    user = UserGetSerializer()
    attachment = AttachmentSerializer(many=True)
    date = TimestampField(required=False)

    class Meta:
        model = Chat
        fields = '__all__'


class ChatCreationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Chat
        exclude = 'date',

class UserMessageGetSerializer(serializers.ModelSerializer):

    user = UserGetSerializer()
    message = ChatGetSerializer()

    class Meta:
        model = UserMessage
        fields = '__all__'


class UserMessageCreationSerializer(serializers.ModelSerializer):

    class Meta:
        model = UserMessage
        fields = '__all__'

class ChatMessagesSerializer(serializers.Serializer):

    room_id = serializers.IntegerField()
    message_id = serializers.IntegerField()

class RetrieveChatsSerializer(serializers.Serializer):

    limit = serializers.IntegerField()
    offset = serializers.IntegerField()
