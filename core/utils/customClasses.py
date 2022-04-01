
from django.db.models import Model, Q, QuerySet
from django_filters import rest_framework as filters
from dynamic_preferences.registries import global_preferences_registry
from dynamic_preferences.settings import preferences_settings
from dynamic_preferences.types import BasePreferenceType
from rest_framework.serializers import ModelSerializer
from django.core.mail import EmailMessage


import threading


class EmailThread(threading.Thread):

    def __init__(self, email):
        self.email = email
        threading.Thread.__init__(self)

    def run(self):
        self.email.send()


class Util:
    @staticmethod
    def send_email(data):
        email = EmailMessage(
            subject=data['email_subject'], body=data['email_body'], to=[data['to_email']])
        EmailThread(email).start()


def filter_related_objects(queryset: QuerySet, name: str, value, model: Model, serializer: ModelSerializer, related_category: str) -> QuerySet:
    lookup = '__'.join([name, 'in'])
    res = []
    if value:
        subjects = model.objects.filter(pk__in=[obj.pk for obj in value])
        look_related = '__'.join([related_category, 'gte'])
        result = []
        for subj in subjects:
            hole_tree = model.objects.filter(
                Q(tree_id=subj.tree_id) &
                Q(**{look_related: getattr(subj, related_category)}) &
                Q(display=True)
            )
            values = [serializer(
                instance=subject).data['id'] for subject in hole_tree]
            result.append(values)
        values = result
    else:
        subjects = model.objects.filter(display=True)
        values = [serializer(
            instance=subject).data['id'] for subject in subjects]
    for value in values:
        if isinstance(value, list):
            res.extend(value)
        else:
            res.append(value)

    return queryset.filter(**{lookup: res}).distinct().order_by('id')


global_preferences = global_preferences_registry.manager()


class PreferenceMixin(BasePreferenceType):
    @classmethod
    def key(cls):
        return '{}{}{}'.format(cls.section.name,
                               preferences_settings.SECTION_KEY_SEPARATOR,
                               cls.name)

    @classmethod
    def value(cls):
        return global_preferences[cls.key()]
