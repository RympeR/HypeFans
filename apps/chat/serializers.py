from xml.dom import ValidationErr
from core.utils.customFields import TimestampField
from core.utils.func import return_file_url
from rest_framework import serializers

from apps.blog.models import Attachment
from apps.blog.serializers import AttachmentSerializer
from apps.users.dynamic_preferences_registry import ReferralPercentage
from apps.users.models import User
from apps.users.serializers import (UserShortChatRetrieveSeriliazer,
                                    UserShortRetrieveSeriliazer,
                                    UserShortSocketRetrieveSeriliazer)

from .models import Chat, ChatBought, Room, UserMessage


class RoomGetSerializer(serializers.ModelSerializer):

    creator = UserShortRetrieveSeriliazer()
    invited = UserShortRetrieveSeriliazer(many=True)
    date = TimestampField(required=False)
    logo = serializers.SerializerMethodField()

    def get_logo(self, room: Room):
        if room.logo and hasattr(room.logo, 'url'):
            return return_file_url(self, room.logo.url)
        return ''

    class Meta:
        model = Room
        fields = '__all__'


class RoomSocketSerializer(serializers.ModelSerializer):

    creator = UserShortSocketRetrieveSeriliazer()
    invited = serializers.SerializerMethodField()
    date = TimestampField(required=False)
    logo = serializers.SerializerMethodField()

    def get_invited(self, room: Room):
        if len(room.invited.all()) == 1:
            return UserShortSocketRetrieveSeriliazer(instance=room.invited.all().first()).data
        else:
            return len(room.invited.all())

    def get_logo(self, room: Room):
        if room.logo and hasattr(room.logo, 'url'):
            return return_file_url(self, room.logo.url)
        return ''

    class Meta:
        model = Room
        fields = '__all__'


class RoomCreationSerializer(serializers.ModelSerializer):
    creator = serializers.PrimaryKeyRelatedField(
        required=False, queryset=User.objects.all())
    invited = serializers.PrimaryKeyRelatedField(
        required=False, many=True, queryset=User.objects.all())

    class Meta:
        model = Room
        exclude = 'date',

    def validate(self, attrs):
        if attrs.get('invited'):
            creator = Room.objects.filter(
                creator=attrs['creator'],
                invited=attrs['invited'][0]
            )
            invited = Room.objects.filter(
                invited=attrs['creator'],
                creator=attrs['invited'][0]
            )
            if attrs['creator'] == attrs['invited'][0]:
                raise serializers.ValidationError
            if creator.exists():
                for el in creator:
                    if len(el.invited.all()) == 1:
                        raise ValueError(el.pk)
            if invited.exists():
                for el in invited:
                    if len(el.invited.all()) == 1:
                        raise ValueError(el.pk)
        return attrs


class RoomUpdateSerializer(serializers.ModelSerializer):
    creator = serializers.PrimaryKeyRelatedField(
        required=False, queryset=User.objects.all())
    invited = serializers.PrimaryKeyRelatedField(
        required=False, many=True, queryset=User.objects.all())

    class Meta:
        model = Room
        exclude = 'date',


class ChatGetSerializer(serializers.ModelSerializer):

    room = RoomGetSerializer()
    user = UserShortChatRetrieveSeriliazer()
    attachment = AttachmentSerializer(many=True)
    date = TimestampField(required=False)

    class Meta:
        model = Chat
        fields = '__all__'


class ChatCreationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Chat
        exclude = 'date',

    def validate(self, attrs):
        request = self.context.get('request')
        attrs['user'] = request.user
        return attrs


class ChatPartialSerializer(serializers.ModelSerializer):

    user = serializers.PrimaryKeyRelatedField(
        required=False, queryset=User.objects.all())
    room = serializers.PrimaryKeyRelatedField(
        required=False, queryset=Room.objects.all())
    attachment = serializers.PrimaryKeyRelatedField(many=True,
                                                    required=False, queryset=Attachment.objects.all())
    text = serializers.CharField(required=False)

    class Meta:
        model = Chat
        exclude = 'date',


class UserMessageGetSerializer(serializers.ModelSerializer):

    user = UserShortRetrieveSeriliazer()
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


class ChatMessagesReadSerializer(serializers.Serializer):

    room_id = serializers.IntegerField()


class RetrieveChatsSerializer(serializers.Serializer):

    limit = serializers.IntegerField(required=False)
    offset = serializers.IntegerField(required=False)


class NewMessagesCountSerializer(serializers.Serializer):

    newMessagesCount = serializers.IntegerField(required=False)


class RoomInviteUserSerializer(serializers.ModelSerializer):

    invited = serializers.PrimaryKeyRelatedField(
        required=True, many=True, queryset=User.objects.all())

    class Meta:
        model = Room
        fields = 'invited',


class ChatBoughtCreateSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(
        required=False, queryset=User.objects.all())
    chat = serializers.PrimaryKeyRelatedField(
        required=False, queryset=Chat.objects.all())
    amount = serializers.IntegerField(required=False)

    class Meta:
        model = ChatBought
        fields = '__all__'

    def validate(self, attrs):
        request = self.context.get('request')
        user = request.user
        attrs['user'] = user
        if user.credit_amount >= attrs['amount']:
            user.credit_amount -= attrs['amount']
            attrs['chat'].user.earned_credits_amount += attrs['amount']
            attrs['chat'].user.save()
            referrer = attrs['chat'].user.referrer
            if referrer:
                referrer.earned_credits_amount += attrs['amount'] * \
                    ReferralPercentage.value()
                referrer.save()
            user.save()
            return attrs
        raise serializers.ValidationError
