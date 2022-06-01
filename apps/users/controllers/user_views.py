import io
import logging

import requests
from apps.blog.models import PostAction, PostBought
from apps.blog.serializers import PostGetShortSerializers
from apps.chat.models import Chat, Room
from apps.users.models import *
from apps.users.serializers import *
from core.utils.crypto import encrypt
from core.utils.customClasses import Util
from core.utils.customFilters import UserFilter
from core.utils.default_responses import (api_accepted_202,
                                          api_bad_request_400,
                                          api_block_by_policy_451,
                                          api_created_201)
from core.utils.func import create_ref_link, id_generator
from django.contrib.auth import authenticate
from django.core.files import File
from django.core.files.base import ContentFile
from django.core.files.uploadedfile import InMemoryUploadedFile
from django.urls import reverse
from djoser.conf import django_settings
from PIL import Image
from rest_framework import generics, permissions
from rest_framework.authtoken.models import Token
from rest_framework.generics import GenericAPIView
from rest_framework.mixins import UpdateModelMixin
from rest_framework.response import Response
from rest_framework.views import APIView

try:
    from wand.image import Image as WandImage
except Exception:
    logging.warning("No wand module")


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
    queryset = User.objects.filter(hide_in_search=False)
    serializer_class = UserShortRetrieveSeriliazer
    filterset_class = UserFilter


class UserProfileRetrieveAPI(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserGetSerializer

    def retrieve(self, request, username):
        user = User.objects.get(username=username)
        req_user = request.user
        limit = int(request.GET.get('limit', 50))
        offset = int(request.GET.get('offset', 0))
        results = []
        sub_check = sub_checker(user, req_user)
        chat_sub_check = chat_sub_checker(user, req_user)
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
            if user.validated_user:
                token, _ = Token.objects.get_or_create(user=user)
                return api_created_201({"auth_token": str(token)})
            else:
                return api_bad_request_400({
                    'non_field_errors': 'User not validated'
                })
        else:
            return api_bad_request_400(
                {
                    "non_field_errors": [
                        "Невозможно войти с предоставленными учетными данными."
                    ]
                }
            )


class UserValidateAPI(generics.GenericAPIView):
    permission_classes = permissions.AllowAny,
    serializer_class = UserCreationSerializer

    def post(self, request):
        validation_code = request.data['validation_code']
        email = request.data['email']
        qs = User.objects.filter(
            validation_code=validation_code,
            email=email
        )
        if qs.exists():
            user = qs.first()
            user.validation_code = ''
            user.validated_user = True
            user.save()
            token, _ = Token.objects.get_or_create(user=user)
            return api_created_201({"auth_token": str(token)})
        else:
            return api_bad_request_400({
                "auth_token": None
            })


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
            validation_code = id_generator(8)
            user, created = User.objects.get_or_create(
                email=request.data['email'].lower(),
                username=username,
                ref_link=create_ref_link(username),
                referrer=ref_user,
                validation_code=validation_code
            )
            logging.warning(user)
            logging.warning(created)
            if not created:
                if not user.validated_user:
                    user.validation_code = validation_code
                    user.save()
                else:
                    assert created, "Already exists"
            else:
                UserOnline.objects.create(
                    user=user,
                )
                user.set_password(request.data['password'])
                if ref_user:
                    ref_user.repheral_users.add(user)

                user.save()
                admin_user = User.objects.get(username='root')
                room = Room.objects.create(
                    creator=admin_user,
                    name='HypeFans'
                )
                room.invited.add(user)
                encrypted = encrypt(
                    'Welcome to HypeFans. If you have some questions you can ask them here',
                    'D?F2WNxBk_yLJhy8+Xn&2uqSSVJmN2Eh'
                )
                Chat.objects.create(
                    room=room,
                    user=admin_user,
                    text=encrypted.decode("utf-8", "ignore")
                )
            context = {'username': user.username, 'code': validation_code}

            Util.send_html_email(
                context=context,
                template_name='mail_templates/verification_code.html',
                subject='Verify your email',
                to_email=[user.email],
            )

            return api_created_201({"validation_code": validation_code})
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


class AddBlockedUserAPI(generics.GenericAPIView):
    permission_classes = (permissions.IsAuthenticated, )
    queryset = User.objects.all()
    serializer_class = UserBlockSerializer

    def get_object(self):
        return self.request.user

    def put(self, request, *args, **kwargs):
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
