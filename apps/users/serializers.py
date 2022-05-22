from datetime import datetime, timedelta
import logging

from core.utils.customFields import TimestampField
from core.utils.func import create_path_file, get_online
from django.db.models import Count
from django_countries.serializer_fields import CountryField
from rest_framework import serializers

from apps.blog.models import Post
from apps.users.dynamic_preferences_registry import (HostName,
                                                     ChatSubscriptionDuration,
                                                     ReferralPercentage, WithdrawPercentage)

from .models import (Card, ChatSubscription, Donation, Payment, PendingUser,
                     Subscription, User, UserOnline, ReferralPayment)


class ChatSubscriptionNotificationSerializer(serializers.ModelSerializer):
    source_info = serializers.SerializerMethodField()
    notification_type = serializers.SerializerMethodField()
    additional_info = serializers.SerializerMethodField()

    class Meta:
        model = ChatSubscription
        fields = 'source_info', 'notification_type', 'additional_info'

    def get_additional_info(self, chat_subscription: ChatSubscription):
        return {}

    def get_notification_type(self, chat_subscription: ChatSubscription):
        return 'chat_subscription'

    def get_source_info(self, chat_subscription: ChatSubscription):
        username = chat_subscription.target.username
        return {
            'username': username,
            'link': f'https://hype-fans.com/profile/{username}',
        }


class SubscriptionNotificationSerializer(serializers.ModelSerializer):
    source_info = serializers.SerializerMethodField()
    notification_type = serializers.SerializerMethodField()
    additional_info = serializers.SerializerMethodField()

    class Meta:
        model = Subscription
        fields = 'source_info', 'notification_type', 'additional_info'

    def get_additional_info(self, subscription: Subscription):
        return {}

    def get_notification_type(self, subscription: Subscription):
        return 'subscription'

    def get_source_info(self, subscription: Subscription):
        username = subscription.target.username
        return {
            'username': username,
            'link': f'https://hype-fans.com/profile/{username}',
        }


class DonationNotificationSerializer(serializers.ModelSerializer):
    source_info = serializers.SerializerMethodField()
    notification_type = serializers.SerializerMethodField()
    additional_info = serializers.SerializerMethodField()

    class Meta:
        model = Donation
        fields = 'source_info', 'notification_type', 'additional_info'

    def get_additional_info(self, donation: Donation):
        return {'amount': donation.amount}

    def get_notification_type(self, donation: Donation):
        return 'donation'

    def get_source_info(self, donation: Donation):
        username = donation.sender.username
        return {
            'username': username,
            'link': f'https://hype-fans.com/profile/{username}',
        }


class UserMeSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = 'username', 'id', 'email'


class ChatSubscriptionCreateSerializer(serializers.ModelSerializer):

    source = serializers.PrimaryKeyRelatedField(
        required=False, queryset=User.objects.all())
    target = serializers.PrimaryKeyRelatedField(
        required=False, queryset=User.objects.all())

    class Meta:
        model = ChatSubscription
        fields = 'source', 'target'

    def validate(self, attrs):
        request = self.context.get('request')
        user = request.user
        now = datetime.now()
        attrs['start_date'] = now.strftime("%Y-%m-%d %H:%M:%S")
        attrs['end_date'] = (
            now + timedelta(days=ChatSubscriptionDuration.value())).strftime("%Y-%m-%d %H:%M:%S")

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

    def create(self, validated_data):
        return ChatSubscription.objects.create(
            source=validated_data['source'],
            target=validated_data['target'],
            start_date=validated_data['start_date'],
            end_date=validated_data['end_date'],
        )


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
        request = self.context.get('request')
        request.user.my_subscribes.add(validated_data['target'])
        return Subscription.objects.create(
            source=validated_data['source'],
            target=validated_data['target'],
            start_date=validated_data['start_date'],
            end_date=validated_data['end_date'],
        )


class UserIdRetrieveSeriliazer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            'pk',
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
    user = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(), many=True)
    block = serializers.BooleanField()


class UserPartialSerializer(serializers.ModelSerializer):
    location = serializers.CharField(
        required=False, allow_blank=True, allow_null=True)
    city = serializers.CharField(required=False)
    email = serializers.EmailField(required=False)
    avatar = serializers.FileField(required=False)
    background_photo = serializers.FileField(required=False)
    username = serializers.CharField(
        required=False, allow_blank=True, allow_null=True)
    first_name = serializers.CharField(
        required=False, allow_blank=True, allow_null=True)
    bio = serializers.CharField(
        required=False, allow_blank=True, allow_null=True)
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
    wallet = serializers.CharField(
        required=False, allow_blank=True, allow_null=True)
    show_comment_notifications = serializers.BooleanField(required=False)
    show_chat_subscribption_notifications = serializers.BooleanField(
        required=False)
    show_subscribption_notifications = serializers.BooleanField(required=False)
    show_donate_notifications = serializers.BooleanField(required=False)
    show_like_notifications = serializers.BooleanField(required=False)

    def validate(self, attrs):
        if attrs.get('avatar'):
            print(attrs.get('avatar'))
        if attrs.get('email'):
            attrs['email'] = attrs['email'].lower()
        return attrs

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
            'city',
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
            'wallet',
            'show_comment_notifications',
            'show_chat_subscribption_notifications',
            'show_subscribption_notifications',
            'show_donate_notifications',
            'show_like_notifications',
        )
        optional_fields = ['location', 'city']

    def get_validation_exclusions(self):
        exclusions = super(UserPartialSerializer,
                           self).get_validation_exclusions()
        return exclusions + ['location']


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
            'show_comment_notifications',
            'show_chat_subscribption_notifications',
            'show_subscribption_notifications',
            'show_donate_notifications',
            'show_like_notifications',
        )


class CustomProfileSerializer(serializers.ModelSerializer):
    ...


class UserGetSerializer(serializers.ModelSerializer):
    location = CountryField(country_dict=True)
    avatar = serializers.SerializerMethodField()
    background_photo = serializers.SerializerMethodField()
    is_online = serializers.SerializerMethodField()
    fans_amount = serializers.SerializerMethodField()
    post_amount = serializers.SerializerMethodField()

    def get_post_amount(self, user: User):
        if user.show_post_amount:
            return user.post_amount
        return 0

    def get_fans_amount(self, user: User):
        if user.show_fans_amount:
            return user.fans_amount
        return 0

    def get_is_online(self, user: User):
        logging.warning(self, str(user))
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
            'private_profile',
            'show_comment_notifications',
            'show_chat_subscribption_notifications',
            'show_subscribption_notifications',
            'show_donate_notifications',
            'show_like_notifications',
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
            'wallet',
            'private_profile',
            'show_comment_notifications',
            'show_chat_subscribption_notifications',
            'show_subscribption_notifications',
            'show_donate_notifications',
            'show_like_notifications',
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
        exclude = 'finished',


class SubscriptionGetSerializer(serializers.ModelSerializer):

    end_date = TimestampField(required=False)
    start_date = TimestampField(required=False)
    target = UserShortRetrieveSeriliazer()
    source = UserShortRetrieveSeriliazer()
    price = serializers.SerializerMethodField()

    class Meta:
        model = Subscription
        exclude = 'finished',

    def get_price(self, subscription: Subscription):
        return subscription.target.subscribtion_price


class UnionDonationGetSerializerCoefficients(serializers.ModelSerializer):
    date_time = serializers.SerializerMethodField()
    source = serializers.SerializerMethodField()
    target = serializers.SerializerMethodField()
    amount = serializers.SerializerMethodField()

    def get_amount(self, ref_payment: ReferralPayment):
        return ref_payment.amount * WithdrawPercentage.value()

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


class UnionDonationGetSerializer(serializers.ModelSerializer):
    date_time = serializers.SerializerMethodField()
    source = serializers.SerializerMethodField()
    target = serializers.SerializerMethodField()
    amount = serializers.SerializerMethodField()

    def get_amount(self, ref_payment: ReferralPayment):
        return ref_payment.amount

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


class UnionChatSubscriptionGetSerializerCoefficients(serializers.ModelSerializer):
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
        return chat_subscription.target.subscribtion_price * WithdrawPercentage.value()

    def get_date_time(self, chat_subscription: ChatSubscription):
        return chat_subscription.start_date.timestamp()


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


class UnionSubscriptionGetSerializerCoefficients(serializers.ModelSerializer):
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
        return subscription.target.subscribtion_price * WithdrawPercentage.value()

    def get_date_time(self, subscription: Subscription):
        return subscription.start_date.timestamp()


class UnionReferralPaymentGetSerializer(serializers.ModelSerializer):
    date_time = TimestampField()
    source = serializers.SerializerMethodField()
    target = serializers.SerializerMethodField()
    amount = serializers.SerializerMethodField()

    def get_amount(self, ref_payment: ReferralPayment):
        return ref_payment.amount * WithdrawPercentage.value()

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
