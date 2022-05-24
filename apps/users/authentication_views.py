import logging
import os

from core.utils.customClasses import Util
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.contrib.sites.shortcuts import get_current_site
from django.http import HttpResponsePermanentRedirect
from django.shortcuts import redirect, render
from django.urls import reverse
from django.utils.encoding import (
    DjangoUnicodeDecodeError, smart_bytes, smart_str)
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from rest_framework import generics, permissions, status, views
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken

from .authentication_serializers import (LoginSerializer, LogoutSerializer,
                                         RegisterSerializer,
                                         ResetPasswordEmailRequestSerializer,
                                         SetNewPasswordSerializer)
from .models import User
from .renderers import UserRenderer


class CustomRedirect(HttpResponsePermanentRedirect):

    allowed_schemes = [os.environ.get('APP_SCHEME'), 'http', 'https']


class VerifyEmail(views.APIView):

    def get(self, request):
        token = request.GET.get('token')
        try:
            token = Token.objects.get(
                key=token)
            user = User.objects.get(username=token.user)
            if not user.is_verified:
                user.is_verified = True
                user.save()
            return redirect('login')
        except Exception:
            return redirect('login')


class RequestPasswordRestoreEmail(generics.GenericAPIView):
    serializer_class = ResetPasswordEmailRequestSerializer
    permission_classes = permissions.AllowAny,

    def post(self, request):
        email = request.data.get('email', '')

        if User.objects.filter(email=email).exists():
            user = User.objects.get(email=email)
            token = PasswordResetTokenGenerator().make_token(user)
            uidb64 = urlsafe_base64_encode(smart_bytes(user.id))
            current_site = get_current_site(
                request=request).domain
            absurl = 'http://' + current_site + '/restore-password/'
            email_body = 'Hello, \n Use link below to restore your password  \n' + \
                absurl+"?token=" + token + '&uidb64=' + uidb64
            data = {'email_body': email_body, 'to_email': user.email,
                    'email_subject': 'Restore your passsword'}
            Util.send_email(data)
        return Response({'success': 'We have sent you a link to reset your password'}, status=status.HTTP_200_OK)


class RequestPasswordResetEmail(generics.GenericAPIView):
    serializer_class = ResetPasswordEmailRequestSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)

        email = request.data.get('email', '')

        if User.objects.filter(email=email).exists():
            user = User.objects.get(email=email)
            uidb64 = urlsafe_base64_encode(smart_bytes(user.id))
            token = PasswordResetTokenGenerator().make_token(user)
            current_site = get_current_site(
                request=request).domain
            relativeLink = reverse(
                'password-action-confirm', kwargs={'uidb64': uidb64, 'token': token})

            redirect_url = request.data.get('redirect_url', '')
            absurl = 'http://'+current_site + '/' + relativeLink
            email_body = 'Hello, \n Use link below to reset your password  \n' + \
                absurl+"?redirect_url="+redirect_url
            data = {'email_body': email_body, 'to_email': user.email,
                    'email_subject': 'Reset your passsword'}
            Util.send_email(data)
        return Response({'success': 'We have sent you a link to reset your password'}, status=status.HTTP_200_OK)


class PasswordTokenCheckAPI(generics.GenericAPIView):
    permission_classes = permissions.AllowAny,

    def post(self, request):
        uidb64 = request.data.get('uidb64', '')
        token = request.data.get('token', '')
        password = request.data.get('password', '')
        print(request.data)
        try:
            id = smart_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(id=id)

            if not PasswordResetTokenGenerator().check_token(user, token):
                print('here')
                return Response({"auth_token": None}, status=status.HTTP_423_LOCKED)
            else:
                token, created = Token.objects.get_or_create(user=user)
                logging.warning(password)
                logging.warning(user.email)
                print(password)
                print(user.email)
                user.set_password(password)
                user.save()
                return Response({"auth_token": str(token)}, status=status.HTTP_200_OK)

        except Exception as e:
            print(e)
            return Response({"auth_token": None}, status=status.HTTP_423_LOCKED)


class SetNewPasswordAPIView(generics.GenericAPIView):
    serializer_class = SetNewPasswordSerializer

    def patch(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response({'success': True, 'message': 'Password reset success'}, status=status.HTTP_200_OK)
