from django.db import models
from apps.users.models import User
from unixtimestampfield.fields import UnixTimeStampField
from apps.blog.models import Attachment

class Room(models.Model):
    creator = models.ForeignKey(
        User, related_name='user_creator', on_delete=models.DO_NOTHING)
    invited = models.ManyToManyField(User, related_name='invited_users')
    date = UnixTimeStampField(
        "Дата создания", auto_now_add=True, null=True, blank=True)

    def __str__(self):
        return f"{self.creator}-{self.pk}"

    class Meta:
        verbose_name = 'Комната'
        verbose_name_plural = 'Комнаты'
        ordering = ['-date']


class Chat(models.Model):
    room = models.ForeignKey(Room, verbose_name='Комната чата',
                             related_name='chat_room', on_delete=models.CASCADE)
    user = models.ForeignKey(User, verbose_name='Пользователь',
                             related_name='user_sender', on_delete=models.CASCADE)
    text = models.TextField("Message", max_length=500, null=True, blank=True)
    attachment = models.ManyToManyField(
        Attachment, related_name='chat_attachment')
    date = UnixTimeStampField(
        "Send datetime", auto_now_add=True, null=True, blank=True)

    def __str__(self):
        return f"{self.pk}-{self.room}"

    class Meta:
        verbose_name = 'Чат'
        verbose_name_plural = 'Чаты'
        ordering = ['-date']
        unique_together = ['date', 'user', 'room']


class UserMessage(models.Model):
    message = models.ForeignKey(Chat, verbose_name='Доставленное сообщение',
                                related_name='delivered_message', on_delete=models.CASCADE)
    user = models.ForeignKey(User, related_name='destination_user',
                             verbose_name='Конечный пользователь', on_delete=models.CASCADE)
    readed = models.BooleanField(default=False)

    class Meta:
        verbose_name = 'Статус сообщения'
        verbose_name_plural = 'Статусы сообщений'
        ordering = ['-message__date']
        
    def __str__(self):
        return f"{self.message}-{self.user}"
