from core.settings import MIDDLEWARE
from django.db import models
from apps.users.models import User
from unixtimestampfield.fields import UnixTimeStampField

# Create your models here.

ATTACHMENT_TYPE = (
    ('file', 'file'),
    ('music', 'music'),
    ('photo', 'photo'),
    ('video', 'video'),
)

class Attachment(models.Model):
    _file = models.FileField(verbose_name='Файл', upload_to='post_file')
    file_type = models.CharField(
        verbose_name='Тип файла',
        choices=ATTACHMENT_TYPE,
        default='file',
        max_length=5
    )
    class Meta:
        verbose_name = 'Вложение'
        verbose_name_plural = 'Вложения'

    def __str__(self):
        return f"{self.pk}-{self.file_type}"


class Post(models.Model):
    user = models.ForeignKey(
        User,
        verbose_name='Создатель поста',
        on_delete=models.CASCADE,
        related_name='user_post'
    )
    reply_link = models.CharField(
        verbose_name='Ссылка на пост', null=True, blank=True, max_length=150)
    time_to_archive = UnixTimeStampField(
        verbose_name='Дата+время архивации', null=True, blank=True)
    name = models.CharField(verbose_name='Название', max_length=100)
    description = models.TextField(
        verbose_name='Описание', null=True, blank=True)
    price_to_watch = models.IntegerField(verbose_name='Цена поста', default=0)
    files = models.ManyToManyField(Attachment, verbose_name='Вложения')
    publication_date = UnixTimeStampField(
        verbose_name='Дата+время создания', auto_now_add=True)

    class Meta:
        verbose_name = 'Публикация'
        verbose_name_plural = 'Публикации'
        ordering = ['-publication_date']

    def __str__(self):
        return f"{self.pk}-{self.user}"


class PostAction(models.Model):
    user = models.ForeignKey(
        User,
        verbose_name='Взаимодействующий юзер',
        on_delete=models.DO_NOTHING,
        related_name='user_action_post'
    )
    post = models.ForeignKey(Post, related_name='user_postaction',
                             on_delete=models.CASCADE, verbose_name='Пост')
    like = models.BooleanField('Лайкнул', default=False)
    comment = models.TextField(
        verbose_name='Комментарий к посту', null=True, blank=True)
    donation_amount = models.IntegerField(
        verbose_name='Пожертвование на пост', default=0)

    class Meta:
        verbose_name = 'Публикация действие'
        verbose_name_plural = 'Публикации действия'
        ordering = ['-post__publication_date']

    def __str__(self):
        return f"{self.pk}-{self.post}"


class Story(models.Model):
    user = models.ForeignKey(
        User,
        verbose_name='Создатель истории',
        on_delete=models.CASCADE,
        related_name='user_story'
    )
    watched_story = models.ManyToManyField(
        User,
        verbose_name='Создатель истории',
        through='WatchedStories',
        symmetrical=False
    )
    publication_date = UnixTimeStampField(
        verbose_name='Дата время создания', auto_now_add=True)
    story = models.FileField(verbose_name='История', upload_to='stories')
    reply_link = models.CharField(
        verbose_name='Ссылка на историю', null=True, blank=True, max_length=150)
    time_to_archive = UnixTimeStampField(
        verbose_name='Дата+время архивации', null=True, blank=True)
    archived = models.BooleanField(verbose_name='Архивировано', default=False)

    class Meta:
        verbose_name = 'История'
        verbose_name_plural = 'Истории'
        ordering = ['-publication_date']

    def __str__(self):
        return f"{self.pk}-{self.user}"


class WatchedStories(models.Model):
    source = models.ForeignKey(
        Story, related_name='source_story', on_delete=models.CASCADE,)
    target = models.ForeignKey(
        User, related_name='target_user', on_delete=models.DO_NOTHING)
    comment = models.TextField(
        verbose_name='Реакция на  историю',
        null=True,
        blank=True
    )
    like = models.BooleanField('Лайкнул', default=False)
    watched = models.BooleanField('Просмотрел', default=True)
    times_wathced = models.IntegerField(
        verbose_name='Сколько раз посмотрел', default=0)

    class Meta:
        verbose_name = 'История просмотры'
        verbose_name_plural = 'Истории просмотры'
        ordering = ['-source__publication_date']

    def __str__(self):
        return f"{self.pk}-{self.source}"
