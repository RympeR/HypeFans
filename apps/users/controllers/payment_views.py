from apps.users.models import *
from apps.users.serializers import *
from apps.users.dynamic_preferences_registry import CreditTransferPercentage
from core.utils.default_responses import api_block_by_policy_451
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.generics import GenericAPIView
from rest_framework.mixins import UpdateModelMixin
from rest_framework.response import Response


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


class CreditTransferAPI(APIView):
    serializer_class = BalanceTransferSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            amount: int = serializer.validated_data.get('amount', 0)
            user = request.user
            if user.earned_credits_amount < amount:
                return api_block_by_policy_451()
            else:
                transfer_amount: float = amount - amount * CreditTransferPercentage.value()
                user.earned_credits_amount -= transfer_amount
                user.credit_amount += transfer_amount
                user.save()
                return Response({'status': 'success'})
        else:
            return Response({'status': 'error'})


class DonationRetrieveAPI(generics.RetrieveAPIView):
    queryset = Donation.objects.all()
    serializer_class = DonationGetSerializer


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
        self.perform_create(serializer)
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
