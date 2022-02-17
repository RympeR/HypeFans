from core.utils.func import room_logo
from django.db import models
from django.db.models.signals import post_save
from unixtimestampfield.fields import UnixTimeStampField

from apps.blog.models import Attachment
from apps.users.models import User
from core.utils.func import return_file_url


class Room(models.Model):
    creator = models.ForeignKey(
        User, related_name='user_creator', on_delete=models.DO_NOTHING)
    invited = models.ManyToManyField(User, related_name='invited_users')
    date = UnixTimeStampField(
        "Дата создания", auto_now_add=True, null=True, blank=True)
    logo = models.ImageField(
        upload_to=room_logo,
        verbose_name='Заставка комнаты',
        null=True,
        blank=True
    )
    name = models.CharField('Имя комнаты', blank=True,
                            null=True, max_length=255)

    def __str__(self):
        return f"{self.creator}-{self.pk}"

    @property
    def get_logo(self):
        if self.logo and hasattr(self.logo, 'url'):
            return 'http://{domain}{path}'.format(
                domain='hype-fans.com', path=self.logo.url)
        if self.creator.avatar and hasattr(self.creator.avatar, 'url'):
            return 'http://{domain}{path}'.format(
                domain='hype-fans.com', path=self.creator.avatar.url)
        return ''

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
        Attachment, related_name='chat_attachment', blank=True)
    date = UnixTimeStampField(
        "Send datetime", auto_now_add=True, null=True, blank=True)
    price = models.IntegerField(
        verbose_name='Цена сообщения', blank=True, default=0)

    def __str__(self):
        return f"{self.pk}-{self.room}"

    class Meta:
        verbose_name = 'Чат'
        verbose_name_plural = 'Чаты'
        ordering = ['-date']
        unique_together = ['date', 'user', 'room']


class ChatBought(models.Model):
    user = models.ForeignKey(User, related_name='bought_user',
                             on_delete=models.CASCADE, verbose_name='Купивший пользователь')
    chat = models.ForeignKey(Chat, related_name='chat_bought',
                             on_delete=models.CASCADE, verbose_name='Купленое сообщение')
    amount = models.IntegerField(verbose_name='Цена покупки')

    class Meta:
        verbose_name = 'Купленное сообщение'
        verbose_name_plural = 'Купленные сообщения'
        unique_together = ['user', 'chat']

    def __str__(self):
        return f"{self.user}-{self.chat}"


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


def create_message(sender, instance, created, **kwargs):
    if created:
        room = instance.room
        users = [user for user in room.invited.all()]
        users.append(room.creator)
        for user in users:
            if user.pk != instance.user.pk:
                UserMessage.objects.create(
                    message=instance,
                    user=user,
                    readed=False
                ).save()


post_save.connect(create_message, sender=Chat)
