from rest_framework import serializers
from core.utils.customFields import TimestampField
from .models import (
    Attachment,
    Post,
    PostAction,
    Story,
    WatchedStories,
)
from apps.users.serializers import UserGetSerializer
from django.db.models import Count

class AttachmentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Attachment
        fields = '__all__'


class PostGetSerializer(serializers.ModelSerializer):
    
    favourites = UserGetSerializer(many=True)
    user = UserGetSerializer()
    files = AttachmentSerializer(many=True)
    time_to_archive = TimestampField(required=False)
    publication_date = TimestampField(required=False)

    class Meta:
        model = Post
        fields = '__all__'


class PostCreationSerializer(serializers.ModelSerializer):

    time_to_archive = TimestampField(required=False)

    def validate(self, attrs):
        request = self.context.get('request')
        attrs['user'] = request.user
        return attrs
    class Meta:
        model = Post
        exclude = 'publication_date',

#TODO-----Implement claculating info about post
class PostGetShortSerializers(serializers.ModelSerializer):

    likes_amount = serializers.SerializerMethodField()
    comments_amount = serializers.SerializerMethodField()
    favourites_amount = serializers.SerializerMethodField()
    
    def get_likes_amount(self, obj: Post):
        return 1

    def get_comments_amount(self, obj: Post):
        return 1

    def get_favourites_amount(self, obj: Post):
        return 1

    class Meta:
        model = Post
        fields = (
            'pk',
            'name',
            'enabled_comments',
            'price_to_watch',
            'reply_link',
            'likes_amount',
            'comments_amount',
            'favourites_amount',
        )

class PostActionGetSerializer(serializers.ModelSerializer):

    user = UserGetSerializer()
    post = PostGetSerializer()

    class Meta:
        model = PostAction
        fields = '__all__'


class PostActionCreationSerializer(serializers.ModelSerializer):

    class Meta:
        model = PostAction
        fields = '__all__',


class StoryGetSerializer(serializers.ModelSerializer):

    user = UserGetSerializer()
    watched_story = UserGetSerializer(many=True)
    publication_date = TimestampField()
    time_to_archive = TimestampField(required=False)

    class Meta:
        model = Story
        fields = '__all__'


class StoryCreationSerializer(serializers.ModelSerializer):

    time_to_archive = TimestampField(required=False)

    def validate(self, attrs):
        request = self.context.get('request')
        attrs['user'] = request.user
        return attrs

    class Meta:
        model = Story
        exclude = 'publication_date',


class WatchedStoriesGetSerializer(serializers.ModelSerializer):

    source = UserGetSerializer()
    target = UserGetSerializer()

    class Meta:
        model = WatchedStories
        fields = '__all__'


class WatchedStoriesCreationSerializer(serializers.ModelSerializer):

    def validate(self, attrs):
        request = self.context.get('request')
        attrs['target'] = request.user
        return attrs

    class Meta:
        model = WatchedStories
        fields = '__all__',
