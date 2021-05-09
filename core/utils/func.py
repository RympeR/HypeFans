import os
import re
import random
import string
from django.core.validators import validate_email
from rest_framework import pagination
from rest_framework.response import Response

def id_generator(size=12, chars=string.ascii_uppercase + string.ascii_lowercase + string.digits):
    return ''.join(random.choice(chars) for _ in range(size))

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
