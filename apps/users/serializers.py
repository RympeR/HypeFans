from rest_framework import serializers
from core.utils import TimestampField

from .models import (
    User,
    Card,
    Donation,
    Payment
)


class UserCreationSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = User
        fields = 'email', 'username', 'password'

class UserGetSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = User
        exclude = ('password', 'is_admin', )


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

