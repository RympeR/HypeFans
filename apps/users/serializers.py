from rest_framework import serializers
from core.utils.customFields import TimestampField
from django.db.models import Count
from apps.blog.models import Post
from django_countries.serializer_fields import CountryField

from .models import (
    User,
    Card,
    Donation,
    Payment,
    UserOnline,
    PendingUser
)


class UserShortRetrieveSeriliazer(serializers.ModelSerializer):

    avatar = serializers.SerializerMethodField()

    def get_avatar(self, user: User):
        if user.avatar and hasattr(user.avatar, 'url'):
            path_file = user.avatar.url
            request = self.context.get('request')
            host = request.get_host()
            file_url = 'http://{domain}{path}'.format(
                domain=host, path=path_file)
            return file_url
        return None

    class Meta:
        model = User
        fields = (
            'pk',
            'username',
            'avatar',
        )


class UserCreationSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = 'email', 'username', 'password'


class UserPartialSerializer(serializers.ModelSerializer):
    location = CountryField(country_dict=True, required=False)
    email = serializers.EmailField(required=False)
    avatar = serializers.ImageField(required=False)
    background_photo = serializers.ImageField(required=False)
    username = serializers.CharField(required=False)
    first_name = serializers.CharField(required=False)
    bio = serializers.CharField(required=False)
    birthday_date = serializers.DateTimeField(required=False)
    post_amount = serializers.IntegerField(required=False)
    fans_amount = serializers.IntegerField(required=False)
    repheral_link = serializers.CharField(required=False)
    repheral_users = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(), required=False, many=True)
    blocked_users = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(), required=False, many=True)
    email_notifications = serializers.BooleanField(required=False)
    push_notifications = serializers.BooleanField(required=False)
    hide_online = serializers.BooleanField(required=False)
    allow_comments = serializers.BooleanField(required=False)
    show_post_amount = serializers.BooleanField(required=False)
    show_fans_amount = serializers.BooleanField(required=False)
    show_watermark = serializers.BooleanField(required=False)
    validated_email = serializers.BooleanField(required=False)
    validated_user = serializers.BooleanField(required=False)
    credit_amount = serializers.IntegerField(required=False)
    earned_credits_amount = serializers.IntegerField(required=False)

    class Meta:
        model = User
        fields = (
            'email',
            'avatar',
            'background_photo',
            'username',
            'first_name',
            'bio',
            'birthday_date',
            'location',
            'post_amount',
            'fans_amount',
            'repheral_link',
            'repheral_users',
            'blocked_users',
            'email_notifications',
            'push_notifications',
            'hide_online',
            'allow_comments',
            'show_post_amount',
            'show_fans_amount',
            'show_watermark',
            'validated_email',
            'validated_user',
            'credit_amount',
            'earned_credits_amount',
        )


class UserGetSerializer(serializers.ModelSerializer):
    location = CountryField(country_dict=True)

    class Meta:
        model = User
        fields = (
            'pk',
            'email',
            'avatar',
            'background_photo',
            'username',
            'first_name',
            'bio',
            'birthday_date',
            'location',
            'post_amount',
            'fans_amount',
            'repheral_link',
            'repheral_users',
            'blocked_users',
            'email_notifications',
            'push_notifications',
            'hide_online',
            'allow_comments',
            'show_post_amount',
            'show_fans_amount',
            'show_watermark',
            'validated_email',
            'validated_user',
            'credit_amount',
            'earned_credits_amount',
        )


class CardCreationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Card
        fields = '__all__'


class CardGetSerializer(serializers.ModelSerializer):

    user = UserShortRetrieveSeriliazer()

    class Meta:
        model = Card
        fields = '__all__'


class DonationCreationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Donation
        exclude = 'datetime',


class DonationGetSerializer(serializers.ModelSerializer):

    sender = UserShortRetrieveSeriliazer()
    reciever = UserShortRetrieveSeriliazer()

    class Meta:
        model = Donation
        fields = '__all__'


class PaymentCreationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Payment
        exclude = 'datetime',


class PaymentGetSerializer(serializers.ModelSerializer):

    card = CardGetSerializer()
    datetime = TimestampField()

    class Meta:
        model = Payment
        fields = '__all__'


class PendingUserCreationSerializer(serializers.ModelSerializer):

    class Meta:
        model = PendingUser
        fields = '__all__'


class PendingUserGetSerializer(serializers.ModelSerializer):

    user = UserShortRetrieveSeriliazer()

    class Meta:
        model = PendingUser
        fields = '__all__'


class UserOnlineGetSerializer(serializers.ModelSerializer):

    last_action = TimestampField()

    class Meta:
        model = UserOnline
        fields = '__all__'


class UserOnlineCreationSerializer(serializers.ModelSerializer):

    class Meta:
        model = UserOnline
        fields = 'user',

# class ActionSerializer(serializers.Serializer):

#     target = UserShortRetrieveSeriliazer(required=False)


# class RetrieveNotificationsSerializer(serializers.Serializer):

#     user = serializers.IntegerField()
#     time = serializers.BigIntegerField()
#     action = ActionSerializer(required=False)
#     type = serializers.CharField()
