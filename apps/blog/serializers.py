from core.utils.customFields import TimestampField
from django.db.models import Count, Q
from rest_framework import serializers
import logging
from apps.users.models import User
from apps.users.serializers import UserShortRetrieveSeriliazer

from .models import (
    Attachment,
    Post,
    PostAction,
    Story,
    WatchedStories,
    PostBought
)


class UserFavouritesSerializer(serializers.Serializer):
    favourite = serializers.BooleanField()
    post_id = serializers.PrimaryKeyRelatedField(queryset=Post.objects.all())


class PostActionCreationSerializer(serializers.ModelSerializer):
    donation_amount = serializers.IntegerField(required=False)

    class Meta:
        model = PostAction
        fields = '__all__'

    def validate(self, attrs):
        request = self.context.get('request')
        user = request.user
        attrs['user'] = user
        if attrs.get('donation_amount') == 0:
            return attrs
        if user.credit_amount >= attrs.get('donation_amount', 0) > 0:
            user.credit_amount -= attrs.get('donation_amount', 0)
            attrs['post'].user.earned_credits_amount += attrs['donation_amount']
            user.save()
            attrs['post'].user.save()
            user.save()
            return attrs
        raise serializers.ValidationError


class PostActionShortSerializer(serializers.ModelSerializer):
    date_time = TimestampField()
    parent_username = serializers.SerializerMethodField()
    parent_user_id = serializers.SerializerMethodField()
    user = UserShortRetrieveSeriliazer()

    def get_parent_username(self, post_action:PostAction):
        return post_action.parent.user.username if post_action.parent else None

    def get_parent_user_id(self, post_action:PostAction):
        return post_action.parent.user.pk if post_action.parent else None

    class Meta:
        model = PostAction
        fields = '__all__'


class AttachmentManySerializer(serializers.ModelSerializer):

    def __init__(self, *args, **kwargs):
        many = kwargs.pop('many', True)
        super(AttachmentManySerializer, self).__init__(
            many=many, *args, **kwargs)

    class Meta:
        model = Attachment
        fields = '__all__'


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


class AttachmentCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = Attachment
        fields = '__all__'


class PostGetSerializer(serializers.ModelSerializer):

    favourites = UserShortRetrieveSeriliazer(many=True)
    user = UserShortRetrieveSeriliazer()
    publication_date = TimestampField(required=False)
    comments = serializers.SerializerMethodField()
    likes_amount = serializers.SerializerMethodField()
    comments_amount = serializers.SerializerMethodField()
    favourites_amount = serializers.SerializerMethodField()
    favourite = serializers.SerializerMethodField()
    liked = serializers.SerializerMethodField()
    like_id = serializers.SerializerMethodField()
    attachments = AttachmentSerializer(many=True)

    def get_likes_amount(self, obj: Post) -> int:
        return obj.user_postaction.filter(like=True).aggregate(Count('pk'))['pk__count']

    def get_comments_amount(self, obj: Post) -> int:
        return obj.user_postaction.filter(~Q(comment__isnull=True) & ~Q(comment='')).aggregate(Count('pk'))['pk__count']

    def get_favourites_amount(self, obj: Post) -> int:
        return obj.favourites.all().aggregate(Count('pk'))['pk__count']

    def get_comments(self, obj: Post) -> list:
        return [PostActionShortSerializer(instance=post).data for post in obj.user_postaction.filter(~Q(comment__isnull=True) & ~Q(comment=''))]

    def get_favourite(self, obj: Post) -> bool:
        user = self.context.get('request').user
        if user in obj.favourites.all():
            return True
        return False

    def get_liked(self, obj: Post) -> bool:
        request = self.context.get('request')
        if request:
            user = request.user
            postActionQuerySet = PostAction.objects.filter(
                post=obj, user=user)
            if postActionQuerySet.exists():
                for action in postActionQuerySet:
                    if action.like:
                        return True
                else:
                    return False
            else:
                return False
        return True

    def get_like_id(self, obj: Post) -> int:
        request = self.context.get('request')
        if request:
            user = request.user
            postActionQuerySet = PostAction.objects.filter(
                post=obj, user=user)
            if postActionQuerySet.exists():
                for action in postActionQuerySet:
                    if action.like:
                        return action.pk
                else:
                    return None
            else:
                return None
        return None

    class Meta:
        model = Post
        exclude = 'time_to_archive',


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


class PostGetShortSerializers(serializers.ModelSerializer):

    likes_amount = serializers.SerializerMethodField()
    comments_amount = serializers.SerializerMethodField()
    favourites_amount = serializers.SerializerMethodField()
    attachments = AttachmentSerializer(many=True)
    likes_amount = serializers.SerializerMethodField()
    comments_amount = serializers.SerializerMethodField()
    favourites_amount = serializers.SerializerMethodField()
    publication_date = TimestampField(required=False)

    def get_likes_amount(self, obj: Post):
        return obj.user_postaction.filter(like=True).aggregate(Count('pk'))['pk__count']

    def get_comments_amount(self, obj: Post):
        return obj.user_postaction.filter(~Q(comment__isnull=True)).aggregate(Count('pk'))['pk__count']

    def get_favourites_amount(self, obj: Post):
        return obj.favourites.all().aggregate(Count('pk'))['pk__count']

    class Meta:
        model = Post
        fields = (
            'pk',
            'name',
            'description',
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
    user = serializers.SerializerMethodField()
    post = PostGetSerializer()
    parent_username = serializers.SerializerMethodField()
    parent_user_id = serializers.SerializerMethodField()

    def get_parent_username(self, post_action:PostAction):
        return post_action.parent.user.username if post_action.parent else None

    def get_parent_user_id(self, post_action:PostAction):
        return post_action.parent.user.pk if post_action.parent else None

    def get_user(self, post_action:PostAction):
        serializer_context = {'request': self.context.get('request') }
        logging.warning(f'Context -> {self.context.get("request")}')
        serializer = UserShortRetrieveSeriliazer(post_action.user, context=serializer_context)
        return serializer.data

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
    user = UserShortRetrieveSeriliazer()

    class Meta:
        model = Story
        fields = ('user', 'publication_date', 'reply_link', 'story')


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
    date_time = TimestampField()
    parent_username = serializers.SerializerMethodField()
    parent_user_id = serializers.SerializerMethodField()
    user = serializers.SerializerMethodField()

    def get_parent_username(self, post_action:PostAction):
        return post_action.parent.user.username if post_action.parent else None

    def get_parent_user_id(self, post_action:PostAction):
        return post_action.parent.user.pk if post_action.parent else None
    
    def get_user(self, post_action:PostAction):
        serializer_context = {'request': self.context.get('request') }
        serializer = UserShortRetrieveSeriliazer(post_action.user, context=serializer_context)
        return serializer.data

    class Meta:
        model = PostAction
        fields = '__all__'


class LikeRetrieveSerializer(serializers.ModelSerializer):
    post = PostGetShortSerializers()
    date_time = TimestampField()
    parent_username = serializers.SerializerMethodField()
    parent_user_id = serializers.SerializerMethodField()
    user = serializers.SerializerMethodField()

    def get_parent_username(self, post_action:PostAction):
        return post_action.parent.user.username if post_action.parent else None

    def get_parent_user_id(self, post_action:PostAction):
        return post_action.parent.user.pk if post_action.parent else None
    
    def get_user(self, post_action:PostAction):
        serializer_context = {'request': self.context.get('request') }
        serializer = UserShortRetrieveSeriliazer(post_action.user, context=serializer_context)
        return serializer.data
    
    class Meta:
        model = PostAction
        fields = '__all__'


class MainPageSerializer(serializers.Serializer):
    user = UserShortRetrieveSeriliazer(required=True)
    post = PostGetShortSerializers(required=True)


class SubStoriesSerializer(serializers.Serializer):
    user = UserShortRetrieveSeriliazer(required=True)
    stories = StoryShortSerializer(required=True, many=True)


class PostBoughtCreateSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(
        required=False, queryset=User.objects.all())
    amount = serializers.IntegerField(required=False)

    class Meta:
        model = PostBought
        fields = '__all__'

    def validate(self, attrs):
        request = self.context.get('request')
        user = request.user
        attrs['user'] = user
        attrs['amount'] = attrs['post'].price_to_watch
        if user.credit_amount >= attrs['post'].price_to_watch:
            user.credit_amount -= attrs['post'].price_to_watch
            attrs['post'].user.earned_credits_amount += attrs['post'].price_to_watch
            attrs['post'].user.save()
            user.save()
            return attrs
        raise serializers.ValidationError
