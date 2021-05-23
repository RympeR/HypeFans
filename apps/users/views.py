from datetime import timedelta, datetime
from django.utils import timezone
from django.http import request
from rest_framework import generics, permissions, renderers
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, JSONParser, FormParser
from rest_framework.generics import GenericAPIView, ListAPIView
from rest_framework.mixins import UpdateModelMixin
from django.shortcuts import get_object_or_404
from core.utils.default_responses import (
    api_accepted_202,
    api_payment_required_402,
    api_not_implemented_501
)

from apps.blog.serializers import PostActionGetSerializer
from .models import *
from .serializers import *


class UserListCreateAPI(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserGetSerializer


class UserRetrieveAPI(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserGetSerializer

    def get_object(self):
        return self.request.user


class UserCreateAPI(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserCreationSerializer


class UserAPI(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserCreationSerializer

    def get_object(self):
        return self.request.user


class UserPartialUpdateAPI(GenericAPIView, UpdateModelMixin):
    queryset = User.objects.all()
    serializer_class = UserCreationSerializer

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
    queryset = User.objects.all()
    serializer_class = UserCreationSerializer

    def put(self, request, pk):
        return api_not_implemented_501()
        user = request.user
        donate_target = get_object_or_404(Post, pk=pk)
        if user.credit_amount > donate_target.price_to_watch:
            user.my_subscribes.add(subscribe_target)
            subscribe_target.fans_amount += 1
            subscribe_target.save()
            user.save()
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


class CardListCreateAPI(generics.ListCreateAPIView):
    queryset = Card.objects.all()
    serializer_class = CardGetSerializer


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


class DonationListCreateAPI(generics.ListCreateAPIView):
    queryset = Donation.objects.all()
    serializer_class = DonationGetSerializer


class DonationRetrieveAPI(generics.RetrieveAPIView):
    queryset = Donation.objects.all()
    serializer_class = DonationGetSerializer


class DonationCreateAPI(generics.CreateAPIView):
    queryset = Donation.objects.all()
    serializer_class = DonationCreationSerializer


class PaymentListCreateAPI(generics.ListCreateAPIView):
    queryset = Payment.objects.all()
    serializer_class = PaymentGetSerializer


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
