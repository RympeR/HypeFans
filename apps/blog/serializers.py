from rest_framework import serializers
from core.utils import TimestampField
from .models import (
    Attachment,
    Post,
    PostAction,
    Story,
    WatchedStories,
)
from apps.users.serializers import UserGetSerializer


class AttachmentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Attachment
        fields = '__all__'


class PostGetSerializer(serializers.ModelSerializer):

    user = UserGetSerializer()
    files = Attachment(many=True)
    time_to_archive = TimestampField(required=False)
    publication_date = TimestampField(required=False)

    class Meta:
        model = Post
        fields = '__all__'


class PostCreationSerializer(serializers.ModelSerializer):

    time_to_archive = TimestampField(required=False)

    class Meta:
        model = Post
        exclude = 'publication_date',


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

    class Meta:
        model = WatchedStories
        fields = '__all__',
