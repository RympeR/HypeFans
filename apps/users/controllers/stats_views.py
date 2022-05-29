from apps.users.dynamic_preferences_registry import WithdrawPercentage
from apps.users.models import *
from apps.users.serializers import *
from core.utils.func import generate_pay_dict, sum_by_attribute
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.views import APIView


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
            reciever=user,
            datetime__date__month=current_month,
        ).order_by('-datetime')

        donation_amount = sum(
            (donation.amount * WithdrawPercentage.value() for donation in donations))

        chat_subscriptions = ChatSubscription.objects.filter(
            target=user,
            start_date__date__month=current_month,
        ).order_by('-start_date')
        chat_subscription_amount = sum_by_attribute(
            user, 'message_price', chat_subscriptions, True)

        subscriptions = Subscription.objects.filter(
            target=user,
            start_date__date__month=current_month,
        ).order_by('-start_date')
        subscription_amount = sum_by_attribute(
            user, 'subscribtion_price', subscriptions, True)

        referral_payments = ReferralPayment.objects.filter(
            referrer=user,
        ).order_by('-date_time')
        repherral_summ = sum((reph.amount * WithdrawPercentage.value()
                             for reph in referral_payments))

        result_sum = subscription_amount + donation_amount + repherral_summ +\
            chat_subscription_amount

        result = sorted([
            *generate_pay_dict(donations,
                               UnionDonationGetSerializerCoefficients, 'donation'),
            *generate_pay_dict(subscriptions,
                               UnionSubscriptionGetSerializerCoefficients, 'subscription'),
            *generate_pay_dict(chat_subscriptions,
                               UnionChatSubscriptionGetSerializerCoefficients, 'chat_subscriptions'),
            *generate_pay_dict(referral_payments,
                               UnionReferralPaymentGetSerializer, 'referral_payment'),
        ], key=lambda x: x['date_time'], reverse=True)

        result_dict = {
            'result_sum': result_sum,
            'actions': result
        }

        return Response(result_dict)


class RepheralHistoryRetrieveAPI(APIView):

    def get(self, request, *args,):
        current_month = datetime.now().month
        user = request.user

        referral_payments = ReferralPayment.objects.filter(
            referrer=user,
            date_time__date__month=current_month,
        ).order_by('-date_time')
        repherral_summ = sum((reph.amount * WithdrawPercentage.value()
                             for reph in referral_payments))

        result = {
            'result_sum': repherral_summ,
            'referral_payments': UnionReferralPaymentGetSerializer(
                instance=referral_payments,
                context={'request': request},
                many=True
            ).data,
        }
        return Response(result)


class SpendStatsHistoryRetrieveAPI(APIView):

    def get(self, request, *args,):
        current_month = datetime.now().month
        user = request.user

        donations = Donation.objects.filter(
            sender=user,
            datetime__date__month=current_month,
        ).order_by('-datetime')

        donation_amount = sum((donation.amount for donation in donations))

        chat_subscriptions = ChatSubscription.objects.filter(
            source=user,
            start_date__date__month=current_month,
        ).order_by('-start_date')
        chat_subscription_amount = sum((
            user.message_price
            for _ in range(len(chat_subscriptions))
        ))

        subscriptions = Subscription.objects.filter(
            source=user,
            start_date__date__month=current_month,
        ).order_by('-start_date')
        subscription_amount = sum((
            user.subscribtion_duration
            for _ in range(len(subscriptions))
        ))

        result_sum = subscription_amount + donation_amount + chat_subscription_amount

        result = sorted([
            *generate_pay_dict(donations,
                               UnionDonationGetSerializer, 'donation'),
            *generate_pay_dict(subscriptions,
                               UnionSubscriptionGetSerializer, 'subscription'),
            *generate_pay_dict(chat_subscriptions,
                               UnionChatSubscriptionGetSerializer, 'chat_subscriptions'),

        ], key=lambda x: x['date_time'], reverse=True)

        result_dict = {
            'result_sum': result_sum,
            'actions': result
        }

        return Response(result_dict)
