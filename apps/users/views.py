import logging
from datetime import datetime, timedelta

import requests
from core.utils.default_responses import (api_accepted_202,
                                          api_bad_request_400,
                                          api_block_by_policy_451,
                                          api_created_201,
                                          api_not_implemented_501,
                                          api_payment_required_402)
from django.core.exceptions import NON_FIELD_ERRORS
from django.http import request
from django.shortcuts import get_object_or_404
from rest_framework import generics, permissions
from rest_framework.authtoken.models import Token
from rest_framework.generics import GenericAPIView
from rest_framework.mixins import UpdateModelMixin
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.blog.models import PostAction, PostBought
from apps.blog.serializers import PostGetShortSerializers
from apps.chat.models import ChatBought

from .models import *
from .serializers import *


class UserActivationView(APIView):
    def get(self, request, uid, token):
        protocol = 'https://' if request.is_secure() else 'http://'
        web_url = protocol + request.get_host()
        post_url = web_url + "/auth/users/activate/"
        post_data = {'uid': uid, 'token': token}
        result = requests.post(post_url, data=post_data)
        content = result.text
        return Response(content)


class UserRetrieveAPI(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserOwnProfileGetSerializer

    def get_object(self):
        return self.request.user


class UserProfileRetrieveAPI(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserGetSerializer

    def retrieve(self, request, username):
        user = User.objects.get(username=username)
        req_user = request.user
        data_compare = request.GET.get('datetime', 0)
        limit = request.GET.get('limit', 50)
        offset = request.GET.get('offset', 0)
        results = []
        sub_check = True if Subscription.objects.filter(
            target=user, source=req_user, end_date__gte=datetime.now()).exists() else False
        sub_dict = {
            'subscribed': sub_check
        }
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
                    res_dict['post']['payed'] = sub_check

                post_action_queryset = PostAction.objects.filter(
                    post=post, user=request.user)
                if post_action_queryset.exists():
                    for action in post_action_queryset:
                        if action.like:
                            res_dict['post']['liked'] = True
                            res_dict['post']['like_id'] = action.pk
                            break
                    else:
                        res_dict['post']['liked'] = False
                        res_dict['post']['like_id'] = None
                else:
                    res_dict['post']['liked'] = False
                    res_dict['post']['like_id'] = None
                if request.user in post.favourites.all():
                    res_dict['post']['favourite'] = True
                else:
                    res_dict['post']['favourite'] = False
                results.append(res_dict)
        return api_accepted_202({
            **self.serializer_class(instance=user, context={'request': request}).data,
            **{'posts': results[offset:limit+offset]},
            **sub_dict
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


class UserBlockedListAPI(generics.ListAPIView):
    serializer_class = UserShortRetrieveSeriliazer

    def get_queryset(self):
        user = self.request.user
        return user.blocked_users.all()


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
            user, created = User.objects.get_or_create(
                email=request.data['email'],
                username=request.data['username'],
            )
            if created:
                user.set_password(request.data['password'])
            user.save()
            token, created = Token.objects.get_or_create(user=user)
            return api_created_201(
                {
                    "auth_token": str(token)
                }
            )    
        except Exception as e:
            logging.error(e)
            return api_block_by_policy_451(
                {
                    "info": "already exists",
                }
            )


class UserAPI(generics.DestroyAPIView):
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
    serializer_class = SubscriptionCreateSerializer

    def post(self, request, pk):
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


class AddBlockedUserAPI(generics.GenericAPIView):
    permission_classes = (permissions.IsAuthenticated, )
    queryset = User.objects.all()
    serializer_class = UserBlockSerializer

    def get_object(self):
        return self.request.user

    def put(self, request, *args, **kwargs):
        user = User.objects.get(username=request.data['username'])
        if request.data['block']:
            self.request.user.blocked_users.add(user)
        else:
            self.request.user.blocked_users.remove(user)
        self.request.user.save()
        data = {
            'user': user.pk,
            'block': request.data['block']
        }
        return Response(data)


class DonationCreateAPI(generics.CreateAPIView):
    queryset = Donation.objects.all()
    serializer_class = DonationCreationSerializer

    def get_serializer_context(self):
        return {'request': self.request}

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
        except ValueError:
            return api_block_by_policy_451({"status": "not enought credits"})
        instance = self.perform_create(serializer)
        return Response(serializer.data)

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


class UserOnlineCreateAPI(generics.GenericAPIView):
    queryset = UserOnline.objects.all()
    serializer_class = UserOnlineCreationSerializer

    def get_serializer_context(self):
        return {'request': self.request}

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
        except AssertionError:
            return api_bad_request_400({"status": "bad request"})
        instance = UserOnline.objects.create_or_update(
            user=request.user
        )
        return Response(serializer.data)


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


class PayStatsHistoryRetrieveAPI(APIView):

    def get(self, request, *args,):
        current_month = datetime.now().month
        user = request.user
        donations = Donation.objects.filter(
            receiver=user,
            datetime__datetime__date__month=current_month,
        ).order_by('-datetime')
        donation_amount = sum((donation.amount for donation in donations))
        subscriptions = Subscription.objects.filter(
            target=user,
            start_date__date__month=currentMonth,
        ).order_by('-start_date')
        subscription_amount = sum((
            user.subscribtion_duration
            for _ in range(len(subscriptions))
        ))

        result_sum = subscription_amount + donation_amount
        result = {
            'result_sum': result_sum,
            'donations': DonationGetSerializer(
                instance=donations,
                many=True
            ).data,
            'subscriptions': SubscriptionGetSerializer(
                instance=subscriptions,
                many=True
            ).data,
        }
        return Response(result)
