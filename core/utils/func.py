import datetime
import logging
import os
import random
import string
from typing import Sequence
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.serializers import ModelSerializer
from django.db.models import QuerySet

from apps.users.dynamic_preferences_registry import WithdrawPercentage

HOST = 'hype-fans.com/'
REF_PERCANTAGE = 0.05


def id_generator(size=12, chars=string.ascii_uppercase + string.ascii_lowercase + string.digits):
    return ''.join(random.choice(chars) for _ in range(size))


def generate_pay_dict(obj: QuerySet, serializer: ModelSerializer, _type: str) -> tuple:
    return (
        {**res_obj, 'type': _type}
        for res_obj in serializer(
            instance=obj, many=True
        ).data
    )


def online_check(user):
    try:
        if user.user_online and not user.hide_online:
            time_difference = (
                (datetime.datetime.now() - user.user_online.last_action).seconds//60) % 60
            logging.warning(time_difference)
            if time_difference < 1:
                return True
            else:
                return False
        return False
    except ObjectDoesNotExist:
        return False


def get_online(serializer, user):
    return online_check(user)


def set_unique_file_name(file_):
    if file_:
        end_extension = file_.rsplit('.', 1)[1]
        file_name = id_generator() + '.' + end_extension
        return file_name
    else:
        return None


def user_avatar(instance, filename):
    instance.original_file_name = filename
    file_ = set_unique_file_name(filename)
    return os.path.join('user', file_)


def create_ref_link(username):
    return HOST + 'signup/' + username + '/' + id_generator()


def room_logo(instance, filename):
    instance.original_file_name = filename
    file_ = set_unique_file_name(filename)
    return os.path.join('room', file_)


def agency_declaration(instance, filename):
    instance.original_file_name = filename
    file_ = set_unique_file_name(filename)
    return os.path.join('agency_declaration', file_)


def passport(instance, filename):
    instance.original_file_name = filename
    file_ = set_unique_file_name(filename)
    return os.path.join('passports', file_)


def video_verify(instance, filename):
    instance.original_file_name = filename
    file_ = set_unique_file_name(filename)
    return os.path.join('video_verify', file_)


def create_path_file(host: str, path_file: str):
    return 'http://{domain}{path}'.format(
        domain=host, path=path_file)


def return_file_url(serializer, path_file):
    request = serializer.context.get('request')
    host = request.get_host() if request else 'hype-fans.com/'
    return create_path_file(host, path_file)


def sum_by_attribute(obj: object, attrib_name: str, qs: Sequence = [], by_range: bool = False):
    if by_range:
        return sum((
            getattr(obj, attrib_name) * WithdrawPercentage.value()
            for _ in range(len(qs))
        ))
    return sum((getattr(obj, attrib_name) for _ in qs))
