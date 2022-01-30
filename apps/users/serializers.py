from datetime import datetime, timedelta

from core.utils.customFields import TimestampField
from core.utils.func import create_path_file, get_online
from django.db.models import Count
from django_countries.serializer_fields import CountryField
from rest_framework import serializers

from apps.blog.models import Post
from apps.users.dynamic_preferences_registry import (HostName,
                                                     ChatSubscriptionDuration,
                                                     ReferralPercentage)

from .models import (Card, ChatSubscription, Donation, Payment, PendingUser,
                     Subscription, User, UserOnline, ReferralPayment)


class UserMeSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = 'username', 'id', 'email'


class ChatSubscriptionCreateSerializer(serializers.ModelSerializer):

    end_date = TimestampField(required=False)
    start_date = TimestampField(required=False)
    source = serializers.PrimaryKeyRelatedField(
        required=False, queryset=User.objects.all())

    class Meta:
        model = ChatSubscription
        fields = '__all__'

    def validate(self, attrs):
        request = self.context.get('request')
        user = request.user
        now = datetime.now()
        attrs['source'] = user
        attrs['start_date'] = now
        attrs['end_date'] = (
            now + timedelta(days=ChatSubscriptionDuration.value()))

        if user.credit_amount >= attrs['target'].message_price:
            user.credit_amount -= attrs['target'].message_price
            attrs['target'].earned_credits_amount += attrs['target'].message_price
            user.save()
            attrs['target'].save()
            referrer = attrs['target'].referrer
            if referrer:
                amount = attrs['target'].message_price * \
                    ReferralPercentage.value()
                referrer.earned_credits_amount += amount
                referrer.save()
                ReferralPayment.objects.create(
                    user=user,
                    referrer=referrer,
                    amount=amount
                )
            return attrs
        raise serializers.ValidationError


class SubscriptionCreateSerializer(serializers.ModelSerializer):

    source = serializers.PrimaryKeyRelatedField(
        required=False, queryset=User.objects.all())
    target = serializers.PrimaryKeyRelatedField(
        required=False, queryset=User.objects.all())

    class Meta:
        model = Subscription
        fields = 'source', 'target'

    def validate(self, attrs):
        request = self.context.get('request')
        user = request.user
        now = datetime.now()
        attrs['start_date'] = now.strftime("%Y-%m-%d %H:%M:%S")
        attrs['end_date'] = (
            now + timedelta(days=user.subscribtion_duration)).strftime("%Y-%m-%d %H:%M:%S")

        if user.credit_amount >= attrs['target'].subscribtion_price:
            user.credit_amount -= attrs['target'].subscribtion_price
            attrs['target'].earned_credits_amount += attrs['target'].subscribtion_price

            user.save()
            referrer = attrs['target'].referrer
            if referrer:
                amount = attrs['target'].subscribtion_price * \
                    ReferralPercentage.value()
                referrer.earned_credits_amount += amount
                referrer.save()
                ReferralPayment.objects.create(
                    user=user,
                    referrer=referrer,
                    amount=amount
                )
            attrs['target'].save()
            return attrs
        raise serializers.ValidationError

    def create(self, validated_data):
        return Subscription.objects.create(
            source=validated_data['source'],
            target=validated_data['target'],
            start_date=validated_data['start_date'],
            end_date=validated_data['end_date'],
        )

class UserShortRetrieveSeriliazer(serializers.ModelSerializer):

    avatar = serializers.SerializerMethodField()
    background_photo = serializers.SerializerMethodField()
    is_online = serializers.SerializerMethodField()

    def get_is_online(self, user: User):
        return get_online(self, user)

    def get_avatar(self, user: User):
        if user.avatar and hasattr(user.avatar, 'url'):
            path_file = user.avatar.url
            request = self.context.get('request')
            host = request.get_host() if request else HostName.value()
            file_url = create_path_file(host, path_file)
            return file_url
        return ''

    def get_background_photo(self, user: User):
        if user.background_photo and hasattr(user.background_photo, 'url'):
            path_file = user.background_photo.url
            request = self.context.get('request')
            host = request.get_host() if request else HostName.value()
            file_url = create_path_file(host, path_file)
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


class ReferralPaymentGetSerializer(serializers.ModelSerializer):
    user = UserShortRetrieveSeriliazer()
    referrer = UserShortRetrieveSeriliazer()
    date_time = TimestampField()

    class Meta:
        model = ReferralPayment
        fields = '__all__'


class UserShortSocketRetrieveSeriliazer(serializers.ModelSerializer):

    avatar = serializers.SerializerMethodField()
    is_online = serializers.SerializerMethodField()

    def get_is_online(self, user: User):
        return get_online(self, user)

    def get_avatar(self, user: User):
        if user.avatar and hasattr(user.avatar, 'url'):
            path_file = user.avatar.url
            request = self.context.get('request')
            host = request.get_host() if request else HostName.value()
            file_url = create_path_file(host, path_file)
            return file_url
        return ''

    class Meta:
        model = User
        fields = (
            'pk',
            'username',
            'first_name',
            'avatar',
            'subscribtion_price',
            'is_online',
        )


class UserShortChatRetrieveSeriliazer(serializers.ModelSerializer):

    avatar = serializers.SerializerMethodField()
    background_photo = serializers.SerializerMethodField()
    is_online = serializers.SerializerMethodField()

    def get_is_online(self, user: User):
        return get_online(self, user)

    def get_avatar(self, user: User):
        if user.avatar and hasattr(user.avatar, 'url'):
            path_file = user.avatar.url
            request = self.context.get('request')
            host = request.get_host() if request else HostName.value()
            file_url = create_path_file(host, path_file)
            return file_url
        return ''

    def get_background_photo(self, user: User):
        if user.background_photo and hasattr(user.background_photo, 'url'):
            path_file = user.background_photo.url
            request = self.context.get('request')
            host = request.get_host() if request else HostName.value()
            file_url = create_path_file(host, path_file)
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


class UserCreationSerializer(serializers.Serializer):

    email = serializers.EmailField()
    username = serializers.CharField()
    password = serializers.CharField()
    referrer = serializers.IntegerField()


class UserBlockSerializer(serializers.Serializer):
    username = serializers.CharField()
    block = serializers.BooleanField()


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
    reph_link = serializers.CharField(required=False)
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
            'reph_link',
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
        )


class SettingsSerializer(serializers.ModelSerializer):
    is_online = serializers.SerializerMethodField()

    def get_is_online(self, user: User):
        return get_online(self, user)

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
    is_online = serializers.SerializerMethodField()

    def get_is_online(self, user: User):
        return get_online(self, user)

    def get_avatar(self, user: User):
        if user.avatar and hasattr(user.avatar, 'url'):
            path_file = user.avatar.url
            request = self.context.get('request')
            host = request.get_host() if request else HostName.value()
            file_url = create_path_file(host, path_file)
            return file_url
        return ''

    def get_background_photo(self, user: User):
        if user.background_photo and hasattr(user.background_photo, 'url'):
            path_file = user.background_photo.url
            request = self.context.get('request')
            host = request.get_host() if request else HostName.value()
            file_url = create_path_file(host, path_file)
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
            'ref_link',
        )


class CardGetSerializer(serializers.ModelSerializer):

    user = UserShortRetrieveSeriliazer()

    class Meta:
        model = Card
        fields = '__all__'


class UserOwnProfileGetSerializer(serializers.ModelSerializer):
    location = CountryField(country_dict=True)
    avatar = serializers.SerializerMethodField()
    background_photo = serializers.SerializerMethodField()
    cards = serializers.SerializerMethodField()
    is_online = serializers.SerializerMethodField()

    def get_is_online(self, user: User):
        return get_online(self, user)

    def get_cards(self, user: User):
        return CardGetSerializer(instance=user.user_card.all(), many=True).data

    def get_avatar(self, user: User):
        if user.avatar and hasattr(user.avatar, 'url'):
            path_file = user.avatar.url
            request = self.context.get('request')
            host = request.get_host() if request else HostName.value()
            file_url = create_path_file(host, path_file)
            return file_url
        return ''

    def get_background_photo(self, user: User):
        if user.background_photo and hasattr(user.background_photo, 'url'):
            path_file = user.background_photo.url
            request = self.context.get('request')
            host = request.get_host() if request else HostName.value()
            file_url = create_path_file(host, path_file)
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
            'cards',
            'ref_link',
        )


class CardCreationSerializer(serializers.ModelSerializer):
    name = serializers.CharField(required=False)

    class Meta:
        model = Card
        fields = '__all__'


class CardPartialSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(
        required=False, queryset=User.objects.all())
    number = serializers.CharField(required=False)
    date_year = serializers.CharField(required=False)
    cvc = serializers.CharField(required=False)
    creator = serializers.BooleanField(required=False)
    name = serializers.CharField(required=False)

    class Meta:
        model = Card
        fields = '__all__'


class DonationCreationSerializer(serializers.ModelSerializer):
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
            referrer = reciever.referrer
            user.save()
            reciever.save()
            if referrer:
                amount = amount * \
                    ReferralPercentage.value()
                referrer.earned_credits_amount += amount
                referrer.save()
                ReferralPayment.objects.create(
                    user=user,
                    referrer=referrer,
                    amount=amount
                )
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
    user = serializers.PrimaryKeyRelatedField(
        required=True, queryset=User.objects.all())

    class Meta:
        model = UserOnline
        fields = 'user',


class ChatSubscriptionGetSerializer(serializers.ModelSerializer):

    end_date = TimestampField(required=False)
    start_date = TimestampField(required=False)
    source = UserShortRetrieveSeriliazer()
    target = UserShortRetrieveSeriliazer()
    price = serializers.SerializerMethodField()

    def get_price(self, subscription: Subscription):
        return subscription.target.subscribtion_price

    class Meta:
        model = ChatSubscription
        fields = '__all__'


class SubscriptionGetSerializer(serializers.ModelSerializer):

    end_date = TimestampField(required=False)
    start_date = TimestampField(required=False)
    target = UserShortRetrieveSeriliazer()
    source = UserShortRetrieveSeriliazer()
    price = serializers.SerializerMethodField()

    class Meta:
        model = Subscription
        fields = '__all__'

    def get_price(self, subscription: Subscription):
        return subscription.target.subscribtion_price


class UnionDonationGetSerializer(serializers.ModelSerializer):
    date_time = serializers.SerializerMethodField()
    source = serializers.SerializerMethodField()
    target = serializers.SerializerMethodField()

    def get_date_time(self, donation: Donation):
        return donation.datetime.timestamp()

    def get_source(self, donation: Donation):
        return UserShortRetrieveSeriliazer(
            instance=donation.sender
        ).data

    def get_target(self, donation: Donation):
        return UserShortRetrieveSeriliazer(
            instance=donation.reciever
        ).data

    class Meta:
        model = Donation
        fields = (
            'id',
            'date_time',
            'target',
            'source',
            'amount'
        )


class UnionChatSubscriptionGetSerializer(serializers.ModelSerializer):
    date_time = serializers.SerializerMethodField()
    target = UserShortRetrieveSeriliazer()
    source = UserShortRetrieveSeriliazer()
    amount = serializers.SerializerMethodField()

    class Meta:
        model = ChatSubscription
        fields = (
            'id',
            'date_time',
            'target',
            'source',
            'amount'
        )

    def get_amount(self, chat_subscription: ChatSubscription):
        return chat_subscription.target.subscribtion_price

    def get_date_time(self, chat_subscription: ChatSubscription):
        return chat_subscription.start_date.timestamp()


class UnionSubscriptionGetSerializer(serializers.ModelSerializer):
    date_time = serializers.SerializerMethodField()
    target = UserShortRetrieveSeriliazer()
    source = UserShortRetrieveSeriliazer()
    amount = serializers.SerializerMethodField()

    class Meta:
        model = Subscription
        fields = (
            'id',
            'date_time',
            'target',
            'source',
            'amount'
        )

    def get_amount(self, subscription: Subscription):
        return subscription.target.subscribtion_price

    def get_date_time(self, subscription: Subscription):
        return subscription.start_date.timestamp()


class UnionReferralPaymentGetSerializer(serializers.ModelSerializer):
    date_time = TimestampField()
    source = serializers.SerializerMethodField()
    target = serializers.SerializerMethodField()

    def get_source(self, ref_payment: ReferralPayment):
        return UserShortRetrieveSeriliazer(
            instance=ref_payment.user
        ).data

    def get_target(self, ref_payment: ReferralPayment):
        return UserShortRetrieveSeriliazer(
            instance=ref_payment.referrer
        ).data
    class Meta:
        model = ReferralPayment
        fields = (
            'id',
            'date_time',
            'target',
            'source',
            'amount'
        )

