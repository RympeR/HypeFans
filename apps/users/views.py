import io
import logging
from datetime import datetime, timedelta

import requests
from core.utils.customClasses import Util
from core.utils.customFilters import UserFilter
from core.utils.default_responses import (api_accepted_202,
                                          api_bad_request_400,
                                          api_block_by_policy_451,
                                          api_created_201,
                                          api_payment_required_402)
from core.utils.func import (create_ref_link, generate_pay_dict,
                             sum_by_attribute)
from django.contrib.auth import authenticate
from django.contrib.sites.shortcuts import get_current_site
from django.core.files import File
from django.core.files.base import ContentFile
from django.core.files.uploadedfile import InMemoryUploadedFile
from django.shortcuts import get_object_or_404
from django.urls import reverse
from djoser.conf import django_settings
from PIL import Image
from rest_framework import generics, permissions
from rest_framework.authtoken.models import Token
from rest_framework.generics import GenericAPIView
from rest_framework.mixins import UpdateModelMixin
from rest_framework.response import Response
from rest_framework.views import APIView
from wand.image import Image as WandImage

from apps.blog.models import PostAction, PostBought
from apps.blog.serializers import PostGetShortSerializers
from apps.users.dynamic_preferences_registry import (ReferralPercentage,
                                                     WithdrawPercentage)

from .models import *
from .serializers import *


class ActivateUserByGet(APIView):

    def get(self, request, uid, token, format=None):
        payload = {'uid': uid, 'token': token}

        url = '{0}://{1}{2}'.format(django_settings.PROTOCOL,
                                    django_settings.DOMAIN, reverse('user-activate'))
        response = requests.post(url, data=payload)

        if response.status_code == 204:
            return Response({'detail': 'all good sir'})
        else:
            return Response(response.json())


class UserMeRetrieveAPI(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserMeSerializer

    def get_object(self):
        return self.request.user


class UserChangePasswordAPI(generics.GenericAPIView):
    queryset = User.objects.all()
    serializer_class = UserMeSerializer

    def get_object(self):
        return self.request.user

    def post(self, request):
        user = request.user
        user.set_password(request.data['password'])
        user.save()
        return api_accepted_202({})


class UserRetrieveAPI(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserOwnProfileGetSerializer

    def get_object(self):
        return self.request.user


class UserSearchRetrieveAPI(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserShortRetrieveSeriliazer
    filterset_class = UserFilter


class UserProfileRetrieveAPI(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserGetSerializer

    def retrieve(self, request, username):
        user = User.objects.get(username=username)
        req_user = request.user
        data_compare = int(request.GET.get('datetime', 0))
        limit = int(request.GET.get('limit', 50))
        offset = int(request.GET.get('offset', 0))
        results = []
        sub_check = sub_checker(user, req_user)
        chat_sub_check = chat_sub_checker(user, req_user)
        if data_compare == 0:
            for post in user.user_post.filter(archived=False).order_by('-publication_date'):
                post_data = PostGetShortSerializers(
                    instance=post, context={'request': request}).data
                res_dict = {}
                res_dict['post'] = post_data

                if post.access_level == 1:
                    if post.price_to_watch == 0:
                        res_dict['post']['payed'] = True
                    else:
                        res_dict['post']['payed'] = (
                            True if PostBought.objects.filter(
                                post=post, user=req_user).exists() else False
                        )
                else:
                    res_dict['post']['payed'] = sub_check

                post_action_queryset = PostAction.objects.filter(
                    post=post, user=req_user)
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
                if req_user in post.favourites.all():
                    res_dict['post']['favourite'] = True
                else:
                    res_dict['post']['favourite'] = False
                results.append(res_dict)
        return api_accepted_202({
            **self.serializer_class(instance=user, context={'request': request}).data,
            **{'posts': results[offset:limit+offset]},
            'subscribed': sub_check,
            'subscribed_chat': chat_sub_check,
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


class UserLoginAPI(generics.GenericAPIView):
    permission_classes = permissions.AllowAny,
    serializer_class = UserCreationSerializer
    authentication_classes = []

    def post(self, request):
        email = request.data['email'].lower()
        password = request.data['password']
        user = authenticate(username=email, password=password)
        if user is not None:
            token, _ = Token.objects.get_or_create(user=user)
            return api_created_201({"auth_token": str(token)})
        else:
            return api_bad_request_400(
                {
                    "non_field_errors": [
                        "Невозможно войти с предоставленными учетными данными."
                    ]
                }
            )


class UserCreateAPI(generics.GenericAPIView):
    permission_classes = permissions.AllowAny,
    serializer_class = UserCreationSerializer

    def post(self, request):
        try:
            if request.data.get('referrer'):
                ref_user = User.objects.get(username=request.data['referrer'])
            else:
                ref_user = None
            username = request.data['username']
            user, created = User.objects.get_or_create(
                email=request.data['email'].lower(),
                username=username,
                ref_link=create_ref_link(username),
                referrer=ref_user
            )
            assert created, "Already exists"
            user.set_password(request.data['password'])
            if ref_user:
                ref_user.repheral_users.add(user)

            user.save()
            token, created = Token.objects.get_or_create(user=user)
            current_site = get_current_site(request).domain
            relativeLink = reverse('email-verify')
            absurl = 'http://'+current_site+relativeLink+"?token="+str(token)
            email_body = 'Hi '+user.username + \
                ' Use the link below to verify your email \n' + absurl
            # email_body = render_to_string(html_template, { 'context': context, })

            data = {'email_body': email_body, 'to_email': user.email,
                    'email_subject': 'Verify your email'}

            Util.send_email(data)
            return api_created_201({"auth_token": str(token)})
        except Exception as e:
            logging.error(e)
            return api_block_by_policy_451({"info": "already exists"})


class UserAPI(generics.DestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserCreationSerializer

    def get_object(self):
        return self.request.user


class UserPartialUpdateAPI(GenericAPIView, UpdateModelMixin):
    queryset = User.objects.all()
    serializer_class = UserPartialSerializer

    def process_image(self, request, data, param_name, quality, resize=None):
        new_name = str(
            request.data.get(param_name)
        ).lower().replace('.heic', '.jpg')
        try:
            import pyheif
            heif_file = pyheif.read_heif(data[param_name].file)
            img = Image.frombytes(
                heif_file.mode,
                heif_file.size,
                heif_file.data,
                "raw",
                heif_file.mode,
                heif_file.stride,
            )
            if resize:
                img.thumbnail(resize)
            img_byte_arr = io.BytesIO()
            img.save(img_byte_arr, format='JPEG', quality=quality)
            img_byte_arr = ContentFile(img_byte_arr.getvalue())
            data[param_name] = InMemoryUploadedFile(
                img_byte_arr,       # file
                None,               # field_name
                new_name,           # file name
                'image/jpeg',       # content_type
                len(img_byte_arr),  # size
                None                # content_type_extra
            )
        except Exception as e:
            logging.error(e)
            img = WandImage(blob=request.data.get(
                param_name).file)
            img.format = 'jpg'
            data[param_name] = File(
                io.BytesIO(
                    img.make_blob("jpg")
                ),
                name=new_name
            )
        return data

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        data = dict(request.data)
        if request.data.get('avatar'):
            avatar_content_type = request.data.get('avatar').content_type
            logging.warning(avatar_content_type)
            if avatar_content_type == 'image/heic' or avatar_content_type == 'image/heif':
                data = self.process_image(
                    request, data, 'avatar', 80, (160, 160))
        if request.data.get('background_photo'):
            background_photo_content_type = request.data.get(
                'background_photo').content_type
            logging.warning(background_photo_content_type)
            if background_photo_content_type == 'image/heic' or background_photo_content_type == 'image/heif':
                data = self.process_image(
                    request, data, 'background_photo', 80)

        serializer = self.get_serializer(
            instance, data=data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        if getattr(instance, '_prefetched_objects_cache', None):
            instance._prefetched_objects_cache = {}
        return Response(serializer.data)

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
            return api_block_by_policy_451({"status": "not enough credits"})
        self.perform_create(serializer)
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
            ).save()
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
        print(request.data['user'])
        for el in request.data['user']:
            user = User.objects.get(pk=el)
            if request.data.get('block', False):
                self.request.user.blocked_users.add(user)
            else:
                self.request.user.blocked_users.remove(user)
        self.request.user.save()
        return Response({
            'user': request.data['user'],
            'block': request.data.get('block', False)
        })


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
        user_online, created = UserOnline.objects.update_or_create(
            user=request.user
        )
        return Response({**serializer.data, 'last_action': user_online.last_action.timestamp()})


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
