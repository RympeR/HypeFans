from core.utils.customFields import TimestampField
from django.db.models import Count
from rest_framework import serializers

from apps.users.models import User
from apps.users.serializers import UserShortRetrieveSeriliazer

from .models import Attachment, Post, PostAction, Story, WatchedStories


class AttachmentSerializer(serializers.ModelSerializer):

    _file = serializers.SerializerMethodField()

    def get__file(self, attachment: Attachment):
        path_file = attachment._file.url
        file_url = 'https://{domain}{path}'.format(
            domain='hype-fans.com', path=path_file)
        return file_url

    class Meta:
        model = Attachment
        fields = '__all__'


class PostGetSerializer(serializers.ModelSerializer):

    favourites = UserShortRetrieveSeriliazer(many=True)
    user = UserShortRetrieveSeriliazer()
    files = AttachmentSerializer(many=True)
    time_to_archive = TimestampField(required=False)
    publication_date = TimestampField(required=False)

    likes_amount = serializers.SerializerMethodField()
    comments_amount = serializers.SerializerMethodField()
    favourites_amount = serializers.SerializerMethodField()
    attachments = AttachmentSerializer(many=True)

    def get_likes_amount(self, obj: Post):
        return 1

    def get_comments_amount(self, obj: Post):
        return 1

    def get_favourites_amount(self, obj: Post):
        return 1

    class Meta:
        model = Post
        fields = '__all__'


class PostUpdateSerializer(serializers.ModelSerializer):

    reply_link = serializers.CharField(required=False)
    time_to_archive = serializers.FloatField(required=False)
    name = serializers.CharField(required=False)
    description = serializers.CharField(required=False)
    price_to_watch = serializers.IntegerField(required=False)
    publication_date = serializers.FloatField(required=False)
    favourites = serializers.PrimaryKeyRelatedField(
        required=False, queryset=User.objects.all(), many=True)
    enabled_comments = serializers.BooleanField(required=False)
    attachments = serializers.PrimaryKeyRelatedField(
        required=False, queryset=Attachment.objects.all(), many=True)

    def validate(self, attrs):
        request = self.context.get('request')
        attrs['user'] = request.user
        return attrs

    class Meta:
        model = Post
        fields = (
            'reply_link',
            'time_to_archive',
            'name',
            'description',
            'price_to_watch',
            'publication_date',
            'favourites',
            'enabled_comments',
            'attachments',
        )


class PostCreationSerializer(serializers.ModelSerializer):

    time_to_archive = TimestampField(required=False)

    def validate(self, attrs):
        request = self.context.get('request')
        attrs['user'] = request.user
        return attrs

    class Meta:
        model = Post
        exclude = 'publication_date',

# TODO-----Implement claculating info about post


class PostGetShortSerializers(serializers.ModelSerializer):

    likes_amount = serializers.SerializerMethodField()
    comments_amount = serializers.SerializerMethodField()
    favourites_amount = serializers.SerializerMethodField()
    attachments = AttachmentSerializer(many=True)

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
            'publication_date',
            'reply_link',
            'likes_amount',
            'comments_amount',
            'favourites_amount',
            'attachments',
        )


class PostActionGetSerializer(serializers.ModelSerializer):

    user = UserShortRetrieveSeriliazer()
    post = PostGetSerializer()

    class Meta:
        model = PostAction
        fields = '__all__'


class PostActionCreationSerializer(serializers.ModelSerializer):

    class Meta:
        model = PostAction
        fields = '__all__'


class StoryGetSerializer(serializers.ModelSerializer):

    user = UserShortRetrieveSeriliazer()
    watched_story = UserShortRetrieveSeriliazer(many=True)
    publication_date = TimestampField()
    time_to_archive = TimestampField(required=False)

    class Meta:
        model = Story
        fields = '__all__'


class StoryShortSerializer(serializers.ModelSerializer):

    class Meta:
        model = Story
        fields = ('publication_date', 'reply_link', 'story')


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

    source = UserShortRetrieveSeriliazer()
    target = UserShortRetrieveSeriliazer()

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
        fields = '__all__'


class CommentRetrieveSerializer(serializers.ModelSerializer):
    post = PostGetShortSerializers()

    class Meta:
        model = PostAction
        fields = ('post', 'comment', 'publication_date')


class LikeRetrieveSerializer(serializers.ModelSerializer):
    post = PostGetShortSerializers()

    class Meta:
        model = PostAction
        fields = ('like', 'comment', 'datetime')


class MainPageSerializer(serializers.Serializer):
    user = UserShortRetrieveSeriliazer(required=True)
    post = PostGetShortSerializers(required=True)


class SubStoriesSerializer(serializers.Serializer):
    user = UserShortRetrieveSeriliazer(required=True)
    stories = StoryShortSerializer(required=True, many=True)
