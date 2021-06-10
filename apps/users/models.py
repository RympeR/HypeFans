import datetime
from django.db import models
from django.contrib.auth.models import AbstractUser
from core.utils.func import user_avatar
from unixtimestampfield.fields import UnixTimeStampField
from django_countries.fields import CountryField
from dateutil.relativedelta import relativedelta
import datetime
from django.db.models.signals import post_save


class User(AbstractUser):
    email = models.EmailField(
        'E-mail',
        unique=True,
        help_text='Required',
        error_messages={
            'unique': "A user with that E-mail already exists.",
        },
        null=True,
        db_index=True
    )
    avatar = models.ImageField(
        upload_to=user_avatar,
        verbose_name='Аватар',
        null=True,
        blank=True
    )
    background_photo = models.ImageField(
        upload_to=user_avatar,
        verbose_name='Фото заднего плана',
        null=True,
        blank=True
    )
    username = models.CharField(
        'Username', max_length=255, null=True, blank=True, unique=True)
    first_name = models.CharField(
        'First name', max_length=255, null=True, blank=True)

    bio = models.TextField(verbose_name='БИО профиля', null=True, blank=True)
    birthday_date = UnixTimeStampField(
        verbose_name='День рождения', null=True, blank=True)
    location = CountryField(null=True, blank=True)
    subscribtion_price = models.IntegerField(
        verbose_name='Цена подписки', default=0)
    message_price = models.IntegerField(
        verbose_name='Цена сообщений', default=0)
    subscribtion_duration = models.IntegerField(
        verbose_name='Длина подписки в днях', default=7)
    post_amount = models.IntegerField(
        verbose_name='Кол-во постов', default=0, blank=True, null=True)
    fans_amount = models.IntegerField(
        verbose_name='Кол-во фанатов', default=0, blank=True, null=True)

    repheral_link = models.CharField(
        verbose_name='Реферальная ссылка', max_length=255, null=True, blank=True)
    repheral_users = models.ManyToManyField(
        'self',
        verbose_name='Реферальные пользователи',
        related_name='referal_users', blank=True
    )
    blocked_users = models.ManyToManyField(
        'self',
        verbose_name='Заблокированные пользователи',
        related_name='blocked_users', blank=True
    )
    my_subscribes = models.ManyToManyField(
        'self',
        verbose_name='Мои подписки',
        related_name='my_subscribes', blank=True
    )
    email_notifications = models.BooleanField(
        'Уведомления по почте', default=False)
    push_notifications = models.BooleanField('Пуш уведомления', default=False)

    hide_online = models.BooleanField('Скрывать онлайн', default=False)

    allow_comments = models.BooleanField(
        'Разрешить комментарии постов', default=True)
    show_post_amount = models.BooleanField(
        'Показывать кол-во постов', default=True)
    show_fans_amount = models.BooleanField(
        'Показывать кол-во фанов', default=True)
    show_watermark = models.BooleanField(
        'Показывать вотермарку', default=False)

    validated_email = models.BooleanField(
        'Подтвержденная почта', default=False)
    validated_user = models.BooleanField(
        'Подтвержденный профиль', default=False)

    credit_amount = models.IntegerField(
        verbose_name='Кредитный баланс', default=0)
    earned_credits_amount = models.IntegerField(
        verbose_name='Заработано', default=0)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = [
        'username'
    ]

    @staticmethod
    def _create_user(password, email, **extra_fields):
        if not email:
            raise ValueError('The given email must be set')
        user = User.objects.create(
            email=email,
            **extra_fields
        )
        user.set_password(password)
        user.save()
        return user

    def create_user(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(password, email, **extra_fields)

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self._create_user(password, email, **extra_fields)

    def __str__(self):
        return str(self.username)

    class Meta:
        verbose_name = 'Пользователь'
        verbose_name_plural = 'Пользователи'


class Subscription(models.Model):
    source = models.ForeignKey(User, verbose_name='Кто подписался',
                               related_name='source_user_subscribe', on_delete=models.CASCADE)
    target = models.ForeignKey(User, verbose_name='На кого подписался',
                               related_name='target_user_subscribe', on_delete=models.CASCADE)
    start_date = UnixTimeStampField('Время подписки', auto_now_add=True)
    end_date = UnixTimeStampField('Время конца подписки')

    def __str__(self):
        return f'{self.source}-{self.target}'

    class Meta:
        verbose_name = 'Подписка'
        verbose_name_plural = 'Подписки'


class Card(models.Model):
    user = models.ForeignKey(
        User, related_name='user_card', on_delete=models.CASCADE,)
    number = models.BigIntegerField(verbose_name='Номер карты')
    date_year = models.CharField(verbose_name='Месяц/год', max_length=5)
    cvc = models.CharField(verbose_name='CVC', max_length=3)
    creator = models.BooleanField(
        verbose_name='Карта создателя', default=False)

    class Meta:
        verbose_name = 'Карта'
        verbose_name_plural = 'Карты'

    def __str__(self):
        return f"{self.pk}-{self.user}"


class Donation(models.Model):
    sender = models.ForeignKey(
        User, related_name='paid_user', on_delete=models.DO_NOTHING)
    reciever = models.ForeignKey(
        User, related_name='recieved_user', on_delete=models.DO_NOTHING)
    datetime = UnixTimeStampField('Время оплаты', auto_now_add=True)
    amount = models.FloatField(verbose_name='Сумма', null=True, default=0)

    class Meta:
        verbose_name = 'Пожертвование'
        verbose_name_plural = 'Пожертвования'

    def __str__(self):
        return f"{self.pk}-{self.sender}"


class Payment(models.Model):
    card = models.ForeignKey(Card, verbose_name='Карта пополнения',
                             related_name='card_payment', on_delete=models.DO_NOTHING)
    datetime = UnixTimeStampField(verbose_name='Время пополнения')
    amount = models.FloatField(verbose_name='Сумма пополнения')

    class Meta:
        verbose_name = 'Пополнение'
        verbose_name_plural = 'Пополнения'

    def __str__(self):
        return f"{self.pk}-{self.card}"


class PendingUser(models.Model):
    user = models.ForeignKey(
        User, verbose_name='Ожидающие верификации', on_delete=models.CASCADE)
    photo = models.ImageField(verbose_name='Документы', upload_to='docs/')
    verified = models.BooleanField(
        verbose_name='Верифицирован', null=True, blank=True)

    class Meta:
        verbose_name = 'Пользователь на верификацию'
        verbose_name_plural = 'Пользователи на верификацию'

    def __str__(self):
        return f"{self.pk}-{self.card}"


class UserOnline(models.Model):
    user = models.CharField(primary_key=True, max_length=255,
                            verbose_name='Юзернейм пользователя', blank=True)
    last_action = UnixTimeStampField(auto_now=True)

    class Meta:
        verbose_name = 'Последнее действие пользователя'
        verbose_name_plural = 'Последние действия пользователей'

    def __str__(self):
        return f"{self.user}-{self.last_action}"


def update_verification(sender: PendingUser, instance: PendingUser, created: bool, **kwargs):
    if not created:
        if instance.verified:
            instance.user.verified = True
        instance.user.save()


post_save.connect(update_verification, sender=PendingUser)
