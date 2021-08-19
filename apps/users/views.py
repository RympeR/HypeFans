from apps.blog.models import PostBought
from apps.blog.serializers import PostGetShortSerializers
from datetime import datetime, timedelta

from core.utils.default_responses import (api_accepted_202,
                                          api_block_by_policy_451,
                                          api_created_201,
                                          api_not_implemented_501,
                                          api_payment_required_402)
from django.http import request
from django.shortcuts import get_object_or_404
from rest_framework import generics, permissions
from rest_framework.authtoken.models import Token
from rest_framework.generics import GenericAPIView
from rest_framework.mixins import UpdateModelMixin
from rest_framework.response import Response

from .models import *
from .serializers import *


class UserRetrieveAPI(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserGetSerializer

    def get_object(self):
        return self.request.user


class UserProfileRetrieveAPI(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserGetSerializer

    def retrieve(self, request, username):
        user = User.objects.get(username=username)
        data_compare = request.GET.get('datetime', 0)
        limit = request.GET.get('limit', 50)
        offset = request.GET.get('offset', 0)
        results = []
        if data_compare == 0:
            for post in user.user_post.filter(archived=False).order_by('-publication_date'):
                post_data = PostGetShortSerializers(
                    instance=post, context={'request': request}).data
                res_dict = {}
                res_dict['post'] = post_data
                if post.access_level == 1:
                    res_dict['post']['payed'] = (
                        True if PostBought.objects.filter(
                            post=post, user=user).exists() else False
                    )
                else:
                    res_dict['post']['payed'] = (
                        True if Subscription.objects.filter(
                            target=post.user, source=user, end_date__gte=datetime.now()).exists() else False
                    )
                results.append(res_dict)
        return api_accepted_202({
            **self.serializer_class(instance=user, context={'request': request}).data,
            **{'posts': results[offset:limit+offset]}
            })

    def get_serializer_context(self):
        return {'request': self.request}


class UserCardListAPI(generics.ListAPIView):
    serializer_class = CardGetSerializer

    def get_queryset(self):
        user = self.request.user
        return Card.objects.filter(
            user=user
        )


class UserSettingsRetrieveAPI(generics.RetrieveAPIView):
    serializer_class = SettingsSerializer
    queryset = User.objects.all()

    def get_object(self):
        return self.request.user


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


class CreateSubscriptioAPI(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = SubscriptionCreateSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
        except AssertionError:
            return api_block_by_policy_451({"status": "not enought credits"})
        instance = self.perform_create(serializer)
        return Response(serializer.data)

    def get_serializer_context(self):
        return {'request': self.request}


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


class CardRetrieveAPI(generics.RetrieveAPIView):
    queryset = Card.objects.all()
    serializer_class = CardGetSerializer


class CardCreateAPI(generics.CreateAPIView):
    queryset = Card.objects.all()
    serializer_class = CardCreationSerializer

    def get_serializer_context(self):
        return {'request': self.request}


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

    def get_serializer_context(self):
        return {'request': self.request}


class PaymentRetrieveAPI(generics.RetrieveAPIView):
    queryset = Payment.objects.all()
    serializer_class = PaymentGetSerializer


class PaymentCreateAPI(generics.CreateAPIView):
    queryset = Payment.objects.all()
    serializer_class = PaymentCreationSerializer

    def get_serializer_context(self):
        return {'request': self.request}


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

    def get_serializer_context(self):
        return {'request': self.request}


class UserOnlineUpdateAPI(generics.UpdateAPIView):
    queryset = UserOnline.objects.all()
    serializer_class = UserOnlineCreationSerializer


class DonationPayedUserRetrieveAPI(generics.ListAPIView):
    queryset = Donation.objects.all()
    serializer_class = DonationGetSerializer

    def get_queryset(self):
        reciever = self.request.user
        return Donation.objects.filter(
            reciever=reciever
        ).order_by('-datetime')


class DonationPayedUserToRetrieveAPI(generics.ListAPIView):
    queryset = Donation.objects.all()
    serializer_class = DonationGetSerializer

    def get_queryset(self):
        sender = self.request.user
        return Donation.objects.filter(
            sender=sender
        ).order_by('-datetime')


class PaymentUserHistoryRetrieveAPI(generics.ListAPIView):
    queryset = Payment.objects.all()
    serializer_class = PaymentGetSerializer

    def get_queryset(self):
        sender = self.request.user
        return Payment.objects.filter(
            card__user=sender
        ).order_by('-datetime')
