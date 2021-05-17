from rest_framework import serializers
from core.utils.customFields import TimestampField
from django.db.models import Count
from apps.blog.models import Post


from .models import (
    User,
    Card,
    Donation,
    Payment,
    PendingUser
)

class UserShortRetrieveSeriliazer(serializers.ModelSerializer):
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

class UserGetSerializer(serializers.ModelSerializer):
    
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
            # 'fans_amount',
            # 'posts_amount',
        )
    
    # def get_fans_amount(self, obj:User):
    #     return obj.objects.annotate(num_folows=Count('my_subscribes'))
        
    # def get_posts_amount(self, obj:User):
    #     ...

class CardCreationSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Card
        exclude = 'datetime', 

class CardGetSerializer(serializers.ModelSerializer):

    user = UserGetSerializer()
    datetime = TimestampField()

    class Meta:
        model = Card
        fields = '__all__'


class DonationCreationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Donation
        exclude = 'datetime', 


class DonationGetSerializer(serializers.ModelSerializer):

    sender = UserGetSerializer()
    reciever = UserGetSerializer()
    
    class Meta:
        model = Donation
        fields = '__all__'


class PaymentCreationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Payment
        exclude = 'datetime', 


class PaymentGetSerializer(serializers.ModelSerializer):

    card = DonationGetSerializer()
    datetime = TimestampField()
    
    class Meta:
        model = Payment
        fields = '__all__'


class PendingUserCreationSerializer(serializers.ModelSerializer):

    class Meta:
        model = PendingUser
        fields = '__all__'


class PendingUserGetSerializer(serializers.ModelSerializer):

    user = UserGetSerializer()
    class Meta:
        model = PendingUser
        fields = '__all__'


# class ActionSerializer(serializers.Serializer):

#     target = UserShortRetrieveSeriliazer(required=False)



# class RetrieveNotificationsSerializer(serializers.Serializer):

#     user = serializers.IntegerField()
#     time = serializers.BigIntegerField()
#     action = ActionSerializer(required=False)
#     type = serializers.CharField()
