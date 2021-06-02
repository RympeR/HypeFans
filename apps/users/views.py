from datetime import datetime, timedelta

from core.utils.default_responses import (
    api_created_201,
    api_accepted_202,
    api_block_by_policy_451,
    api_not_implemented_501,
    api_payment_required_402
)
from django.http import request
from django.shortcuts import get_object_or_404
from django.utils import timezone
from rest_framework import generics, permissions, renderers
from rest_framework.authtoken.models import Token
from rest_framework.generics import GenericAPIView, ListAPIView
from rest_framework.mixins import UpdateModelMixin
from rest_framework.parsers import FormParser, JSONParser, MultiPartParser
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.blog.serializers import PostActionGetSerializer

from .models import *
from .serializers import *


class UserRetrieveAPI(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserGetSerializer

    def get_object(self):
        return self.request.user

class UserCardListAPI(generics.ListAPIView):
    serializer_class = CardGetSerializer

    def get_queryset(self):
        user = self.request.user
        return Card.objects.filter(
            user=user
        )


class UserCreateAPI(generics.GenericAPIView):
    permission_classes = permissions.AllowAny, 
    serializer_class = UserCreationSerializer

    def post(self, request):
        try:
            user = User.objects.create(
                email=request.data['email'],
                username=request.data['username'],
            ) 
            user.set_password(request.data['password'])
            user.save()
            token, created = Token.objects.get_or_create(user=user)
            return api_created_201(
                    {
                        "auth_token": str(token)
                    }
                )
        except Exception as e:
            return api_block_by_policy_451(
                {
                    "info": "already exists"
                }
            )

class UserAPI(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserCreationSerializer

    def get_object(self):
        return self.request.user


class UserPartialUpdateAPI(GenericAPIView, UpdateModelMixin):
    queryset = User.objects.all()
    serializer_class = UserPartialSerializer

    def get_object(self):
        return self.request.user
        
    def put(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)


class UserSubscription(GenericAPIView):
    queryset = User.objects.all()
    serializer_class = UserCreationSerializer

    def put(self, request, pk):
        user = request.user
        subscribe_target = get_object_or_404(User, pk=pk)
        if user.credit_amount > subscribe_target.subscribtion_price:
            user.my_subscribes.add(subscribe_target)
            subscribe_target.fans_amount += 1
            subscribe_target.save()
            user.save()
            subscription_datetime = datetime.now()
            Subscription.objects.create(
                source=user,
                target=subscribe_target,
                start_date=subscription_datetime.timestamp(),
                end_date=subscription_datetime + timedelta(
                    days=subscribe_target.subscribtion_duration
                ).timestamp()
            ).save()
            return api_accepted_202(
                {
                    "subscriber": user.pk,
                    "subscribed": subscribe_target.pk
                }
            )
        return api_payment_required_402(
            {
                "need_to_pay":  subscribe_target.subscribtion_price - user.credit_amount
            }
        )

# TODO-----Implement donate to different types of action


class UserPostDonation(GenericAPIView):
    queryset = Donation.objects.all()
    serializer_class = DonationCreationSerializer

    # def post(self, request, pk):
    #     return api_not_implemented_501()
    #     user = request.user
    #     donate_target = get_object_or_404(Post, pk=pk)
    #     if user.credit_amount > donate_target.price_to_watch:
    #         user.my_subscribes.add(subscribe_target)
    #         subscribe_target.fans_amount += 1
    #         subscribe_target.save()
    #         user.save()
    #         return api_accepted_202(
    #             {
    #                 "subscriber": user.pk,
    #                 "subscribed": subscribe_target.pk
    #             }
    #         )
    #     return api_payment_required_402(
    #         {
    #             "need_to_pay":  subscribe_target.subscribtion_price - user.credit_amount
    #         }
    #     )


class CardRetrieveAPI(generics.RetrieveAPIView):
    queryset = Card.objects.all()
    serializer_class = CardGetSerializer


class CardCreateAPI(generics.CreateAPIView):
    queryset = Card.objects.all()
    serializer_class = CardCreationSerializer


class CardAPI(generics.RetrieveUpdateDestroyAPIView):
    queryset = Card.objects.all()
    serializer_class = CardCreationSerializer


class CardPartialUpdateAPI(GenericAPIView, UpdateModelMixin):
    queryset = Card.objects.all()
    serializer_class = CardCreationSerializer

    def put(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)


class DonationRetrieveAPI(generics.RetrieveAPIView):
    queryset = Donation.objects.all()
    serializer_class = DonationGetSerializer


class DonationCreateAPI(generics.CreateAPIView):
    queryset = Donation.objects.all()
    serializer_class = DonationCreationSerializer


class PaymentRetrieveAPI(generics.RetrieveAPIView):
    queryset = Payment.objects.all()
    serializer_class = PaymentGetSerializer


class PaymentCreateAPI(generics.CreateAPIView):
    queryset = Payment.objects.all()
    serializer_class = PaymentCreationSerializer


class PendingUserCreateAPI(generics.CreateAPIView):
    queryset = PendingUser.objects.all()
    serializer_class = PendingUserCreationSerializer

    def get_object(self):
        return self.request.user


class UserOnlineRetrieveAPI(generics.RetrieveAPIView):
    queryset = UserOnline.objects.all()
    serializer_class = UserOnlineGetSerializer


class UserOnlineCreateAPI(generics.CreateAPIView):
    queryset = UserOnline.objects.all()
    serializer_class = UserOnlineCreationSerializer

class UserOnlineUpdateAPI(generics.UpdateAPIView):
    queryset = UserOnline.objects.all()
    serializer_class = UserOnlineCreationSerializer
