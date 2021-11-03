from rest_framework import serializers
from core.utils.customFields import TimestampField
from django.db.models import Count
from apps.blog.models import Post
from django_countries.serializer_fields import CountryField
from datetime import datetime, timedelta
from .models import (
    User,
    Card,
    Donation,
    Payment,
    UserOnline,
    Subscription,
    PendingUser
)


class SubscriptionCreateSerializer(serializers.ModelSerializer):

    end_date = TimestampField(required=False)
    start_date = TimestampField(required=False)
    source = serializers.PrimaryKeyRelatedField(
        required=False, queryset=User.objects.all())

    class Meta:
        model = Subscription
        fields = '__all__'

    def validate(self, attrs):
        request = self.context.get('request')
        user = request.user
        now = datetime.now()
        attrs['source'] = user
        attrs['start_date'] = now
        attrs['end_date'] = (
            now + timedelta(days=user.subscribtion_duration)).timestamp()

        if user.credit_amount >= attrs['target'].subscribtion_price:
            user.credit_amount -= attrs['target'].subscribtion_price
            attrs['target'].earned_credits_amount += attrs['target'].subscribtion_price
            user.save()
            attrs['target'].save()
            return attrs
        raise serializers.ValidationError


class UserShortRetrieveSeriliazer(serializers.ModelSerializer):

    avatar = serializers.SerializerMethodField()
    background_photo = serializers.SerializerMethodField()

    def get_avatar(self, user: User):
        if user.avatar and hasattr(user.avatar, 'url'):
            path_file = user.avatar.url
            request = self.context.get('request')
            if request:
                host = request.get_host()
            else:
                host = 'hype-fans.com/'
            file_url = 'http://{domain}{path}'.format(
                domain=host, path=path_file)
            return file_url
        return ''

    def get_background_photo(self, user: User):
        if user.background_photo and hasattr(user.background_photo, 'url'):
            path_file = user.background_photo.url
            request = self.context.get('request')
            if request:
                host = request.get_host()
            else:
                host = 'hype-fans.com/'
            file_url = 'http://{domain}{path}'.format(
                domain=host, path=path_file)
            return file_url
        return ''

    class Meta:
        model = User
        fields = (
            'pk',
            'username',
            'avatar',
            'first_name',
            'background_photo',
            'subscribtion_price',
            'is_online',
            'subscribtion_duration'
        )


class UserShortChatRetrieveSeriliazer(serializers.ModelSerializer):

    avatar = serializers.SerializerMethodField()
    background_photo = serializers.SerializerMethodField()

    def get_avatar(self, user: User):
        if user.avatar and hasattr(user.avatar, 'url'):
            path_file = user.avatar.url
            request = self.context.get('request')
            if request:
                host = request.get_host()
            else:
                host = 'hype-fans.com/'
            file_url = 'http://{domain}{path}'.format(
                domain=host, path=path_file)
            return file_url
        return ''

    def get_background_photo(self, user: User):
        if user.background_photo and hasattr(user.background_photo, 'url'):
            path_file = user.background_photo.url
            request = self.context.get('request')
            if request:
                host = request.get_host()
            else:
                host = 'hype-fans.com/'
            file_url = 'http://{domain}{path}'.format(
                domain=host, path=path_file)
            return file_url
        return ''

    class Meta:
        model = User
        fields = (
            'pk',
            'username',
            'avatar',
            'first_name',
            'is_online',
            'background_photo',
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
    subscribtion_price = serializers.IntegerField(required=False)
    message_price = serializers.IntegerField(required=False)
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
            'subscribtion_price',
            'message_price',
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
            'is_online'
        )


class SettingsSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = (
            'pk',
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
            'is_online',
        )


class CustomProfileSerializer(serializers.ModelSerializer):
    ...


class UserGetSerializer(serializers.ModelSerializer):
    location = CountryField(country_dict=True)
    avatar = serializers.SerializerMethodField()
    background_photo = serializers.SerializerMethodField()

    def get_avatar(self, user: User):
        if user.avatar and hasattr(user.avatar, 'url'):
            path_file = user.avatar.url
            request = self.context.get('request')
            host = request.get_host()
            file_url = 'http://{domain}{path}'.format(
                domain=host, path=path_file)
            return file_url
        return ''

    def get_background_photo(self, user: User):
        if user.background_photo and hasattr(user.background_photo, 'url'):
            path_file = user.background_photo.url
            request = self.context.get('request')
            host = request.get_host()
            file_url = 'http://{domain}{path}'.format(
                domain=host, path=path_file)
            return file_url
        return ''

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
            'subscribtion_price',
            'message_price',
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
            'is_online',
        )


class CardCreationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Card
        fields = '__all__'


class CardPartialSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(
        required=False, queryset=User.objects.all())
    number = serializers.IntegerField(required=False)
    date_year = serializers.CharField(required=False)
    cvc = serializers.CharField(required=False)
    creator = serializers.BooleanField(required=False)

    class Meta:
        model = Card
        fields = '__all__'


class CardGetSerializer(serializers.ModelSerializer):

    user = UserShortRetrieveSeriliazer()

    class Meta:
        model = Card
        fields = '__all__'


class DonationCreationSerializer(serializers.ModelSerializer):
    # datetime = TimestampField(required=False)
    sender = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    reciever = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    class Meta:
        model = Donation
        exclude = 'datetime',

    def validate(self, attrs):
        request = self.context.get('request')
        user = request.user
        reciever = attrs['reciever']
        amount = int(attrs['amount'])

        if user.credit_amount >= amount:
            user.credit_amount -= amount
            reciever.earned_credits_amount += amount
            user.save()
            reciever.save()
            return attrs
        raise ValueError

class DonationGetSerializer(serializers.ModelSerializer):
    datetime = TimestampField()
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
    # datetime = TimestampField(required=False)

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
    user = serializers.PrimaryKeyRelatedField(required=True, queryset=User.objects.all())
    class Meta:
        model = UserOnline
        fields = 'user',
