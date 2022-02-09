from apps.users.models import User
from core.utils.func import agency_declaration, video_verify
from django.db import models


class Agency(models.Model):
    user = models.OneToOneField(
        User, on_delete=models.SET_NULL, null=True, blank=False, verbose_name='Владелец агенства')
    declaration = models.FileField(
        'Договор с агенством', upload_to=agency_declaration)
    wallet = models.TextField('Кошелек агенства')
    address = models.TextField('Адрес агенства')
    video_verify = models.FileField(
        'Видео подтверждение', upload_to=video_verify)
    