from core.utils.func import agency_declaration, video_verify
from django.db import models


class Agency(models.Model):
    username = models.CharField('Username', max_length=255)
    password = models.CharField('Пароль', max_length=255)
    declaration = models.FileField(
        'Договор с агенством', upload_to=agency_declaration)
    wallet = models.TextField('Кошелек агенства')
    address = models.TextField('Адрес агенства')
    video_verify = models.FileField(
        'Видео подтверждение', upload_to=video_verify)
    password = models.CharField(
        'Пароль', max_length=255, blank=True, null=True)

    class Meta:
        verbose_name = 'Агенство'
        verbose_name_plural = 'Агенства'

    def __str__(self):
        return self.username
