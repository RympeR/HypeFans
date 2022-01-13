import datetime
import os
import random
import string
from django.core.exceptions import ObjectDoesNotExist

HOST = 'hype-fans.com/'
REF_PERCANTAGE = 0.1


def id_generator(size=12, chars=string.ascii_uppercase + string.ascii_lowercase + string.digits):
    return ''.join(random.choice(chars) for _ in range(size))


def get_online(serializer, user):
    try:
        if user.user_online and not user.hide_online:
            if ((datetime.now() - user.user_online.last_action).seconds//60) % 60 < 1:
                return True
            else:
                return ((datetime.now() - user.user_online.last_action).seconds//60) % 60
    except ObjectDoesNotExist:
        return False


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


def create_path_file(host: str, path_file: str):
    return 'http://{domain}{path}'.format(
        domain=host, path=path_file)


def return_file_url(serializer, path_file):
    request = serializer.context.get('request')
    host = request.get_host() if request else 'hype-fans.com/'
    return create_path_file(host, path_file)
