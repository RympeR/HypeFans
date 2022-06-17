
from datetime import datetime, timedelta

from apps.users.dynamic_preferences_registry import (ReferralPercentage,
                                                     WithdrawPercentage)
from apps.users.models import *
from apps.users.serializers import *
from core.utils.default_responses import (api_accepted_202,
                                          api_block_by_policy_451,
                                          api_payment_required_402)
from django.shortcuts import get_object_or_404
from rest_framework import generics
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response


class CreateSubscriptioAPI(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = SubscriptionCreateSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
        except AssertionError:
            return api_block_by_policy_451({"status": "not enough credits"})
        self.perform_create(serializer)
        return Response(serializer.data)

    def get_serializer_context(self):
        return {'request': self.request}


class CreateSubscriptionRequestAPI(generics.CreateAPIView):
    queryset = SubscriptionRequest.objects.all()
    serializer_class = SubscriptionRequestCreateSerializer

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
            if subscribe_target.withdraw_percentage == 0:
                percentage = WithdrawPercentage.value()
            else:
                percentage = subscribe_target.withdraw_percentage
            subscribe_target.earned_credits_amount += subscribe_target.subscribtion_price * percentage
            subscribe_target.save()
            referrer = subscribe_target.referrer
            if referrer:
                amount = subscribe_target.subscribtion_price * \
                    ReferralPercentage.value() * percentage
                referrer.earned_credits_amount += amount
                referrer.save()
                ReferralPayment.objects.create(
                    user=subscribe_target,
                    referrer=referrer,
                    amount=amount
                )
            user.save()
            subscription_datetime = datetime.now()
            Subscription.objects.create(
                source=user,
                target=subscribe_target,
                start_date=subscription_datetime.timestamp(),
                end_date=subscription_datetime + timedelta(
                    days=subscribe_target.subscribtion_duration
                )
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


class UserChatSubscription(GenericAPIView):
    queryset = User.objects.all()
    serializer_class = ChatSubscriptionCreateSerializer

    def post(self, request, pk):
        user = request.user
        subscribe_target = get_object_or_404(User, pk=pk)
        if user.credit_amount >= subscribe_target.message_price:
            user.my_subscribes.add(subscribe_target)
            subscribe_target.fans_amount += 1
            if subscribe_target.withdraw_percentage == 0:
                percentage = WithdrawPercentage.value()
            else:
                percentage = subscribe_target.withdraw_percentage
            subscribe_target.earned_credits_amount += subscribe_target.message_price * percentage
            subscribe_target.save()
            user.save()
            referrer = subscribe_target.referrer
            if referrer:
                amount = subscribe_target.message_price * \
                    ReferralPercentage.value()
                referrer.earned_credits_amount += amount * percentage
                referrer.save()
                ReferralPayment.objects.create(
                    user=subscribe_target,
                    referrer=referrer,
                    amount=amount
                )
            subscription_datetime = datetime.now()
            ChatSubscription.objects.create(
                source=user,
                target=subscribe_target,
                start_date=subscription_datetime,
                end_date=subscription_datetime + timedelta(
                    days=ChatSubscriptionDuration.value()
                )
            )
            return api_accepted_202(
                {
                    "subscriber": user.pk,
                    "subscribed": subscribe_target.pk
                }
            )
        return api_payment_required_402(
            {
                "need_to_pay":  subscribe_target.message_price - user.credit_amount
            }
        )
