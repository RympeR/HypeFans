import datetime
from email import message
import logging
from apps.agency.models import Agency

from core.utils.func import user_avatar
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from django_countries.fields import CountryField
from unixtimestampfield.fields import UnixTimeStampField
from imagekit.models import ProcessedImageField
from imagekit.processors import ResizeToFill
from .dynamic_preferences_registry import ChatSubscriptionDuration, FreeDays


AUTH_PROVIDERS = {'facebook': 'facebook', 'google': 'google',
                  'twitter': 'twitter', 'email': 'email'}


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
    avatar = models.FileField(
        upload_to=user_avatar,
        verbose_name='Аватар',
        null=True,
        blank=True
    )
    background_photo = models.FileField(
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
    location = models.CharField(
        'Страна', null=True, blank=True, max_length=80, default='')
    city = models.CharField('Город', null=True, blank=True, max_length=80)
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

    show_comment_notifications = models.BooleanField(
        'Показывать уведомления комментариев', default=False)
    show_chat_subscribption_notifications = models.BooleanField(
        'Показывать уведомления подписок на чаты', default=False)
    show_subscribption_notifications = models.BooleanField(
        'Показывать уведомления подписок', default=False)
    show_donate_notifications = models.BooleanField(
        'Показывать уведомления пожертвований', default=False)
    show_like_notifications = models.BooleanField(
        'Показывать уведомления лайков', default=False)

    validated_email = models.BooleanField(
        'Подтвержденная почта', default=False)
    validation_code = models.CharField(
        'Код подтверждения', max_length=8, default='')
    validated_user = models.BooleanField(
        'Подтвержденный профиль', default=False)
    creator = models.BooleanField(
        'Создатель', default=False)
    wallet = models.CharField(
        'Кошелек вывода', null=True, blank=True, max_length=200)
    agency = models.ForeignKey(
        Agency, blank=True, null=True, verbose_name='Агенство', related_name='agency_model', on_delete=models.SET_NULL)
    is_model = models.BooleanField(
        'Модель', default=False)
    withdraw_percentage = models.FloatField(
        verbose_name='Процент дохода', default=0)
    credit_amount = models.IntegerField(
        verbose_name='Кредитный баланс', default=0)
    earned_credits_amount = models.IntegerField(
        verbose_name='Заработано', default=0)
    ref_link = models.CharField(
        max_length=255, verbose_name='Рефералка', null=True, blank=True, unique=True)
    referrer = models.ForeignKey('self', verbose_name='Пригласивший пользователь',
                                 on_delete=models.SET_NULL, null=True, blank=True)
    private_profile = models.BooleanField(
        'Приватный профиль', default=False
    )
    hide_in_search = models.BooleanField(
        verbose_name='Не отображать в поиске',
        default=True
    )
    auth_provider = models.CharField(
        max_length=255, blank=False,
        null=False, default=AUTH_PROVIDERS.get('email'))

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

    @property
    def new_user(self):
        if datetime.datetime.now() - datetime.timedelta(FreeDays.value()) < self.date_joined:
            return True
        return False

    class Meta:
        verbose_name = 'Пользователь'
        verbose_name_plural = 'Пользователи'


class UserModelCheck(models.Model):
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, verbose_name='Пользователь')
    is_model = models.BooleanField(
        'Модель', default=False)
    
    class Meta:
        verbose_name = 'Проверка пользователя'
        verbose_name_plural = 'Проверка пользователей'


class Subscription(models.Model):
    source = models.ForeignKey(User, verbose_name='Кто подписался',
                               related_name='source_user_subscribe', on_delete=models.CASCADE)
    target = models.ForeignKey(User, verbose_name='На кого подписался',
                               related_name='target_user_subscribe', on_delete=models.CASCADE)
    start_date = models.DateTimeField('Время подписки', auto_now_add=True)
    end_date = models.DateTimeField('Время конца подписки')
    finished = models.BooleanField('Завершена', default=False)

    def __str__(self):
        return f'{self.source}-{self.target}'

    class Meta:
        verbose_name = 'Подписка'
        verbose_name_plural = 'Подписки'


class SubscriptionRequest(models.Model):
    source = models.ForeignKey(User, verbose_name='Кто подписался',
                               related_name='source_user_subscribe_request', on_delete=models.CASCADE)
    target = models.ForeignKey(User, verbose_name='На кого подписался',
                               related_name='target_user_subscribe_request', on_delete=models.CASCADE)
    accepted = models.BooleanField('Подтверждено', null=True, blank=True)

    def __str__(self):
        return f'{self.source}-{self.target}'

    class Meta:
        verbose_name = 'Запрос на подписку'
        verbose_name_plural = 'Запросы на подписки'


class ChatSubscription(models.Model):
    source = models.ForeignKey(User, verbose_name='Кто подписался',
                               related_name='source_user_chat_subscribe', on_delete=models.CASCADE)
    target = models.ForeignKey(User, verbose_name='На кого подписался',
                               related_name='target_user_chat_subscribe', on_delete=models.CASCADE)
    start_date = models.DateTimeField('Время подписки', auto_now_add=True)
    end_date = models.DateTimeField(
        'Время конца подписки',
        default=datetime.datetime.now() + datetime.timedelta(7)
    )
    finished = models.BooleanField('Завершена', default=False)

    class Meta:
        verbose_name = 'Подписка на  сообщение'
        verbose_name_plural = 'Подписки на сообщения'

    def __str__(self):
        return f"{self.source}-{self.start_date}"


class Card(models.Model):
    user = models.ForeignKey(
        User, related_name='user_card', on_delete=models.CASCADE,)
    name = models.CharField('Имя карты', max_length=255, null=True, blank=True)
    number = models.CharField(verbose_name='Номер карты', max_length=16)
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
    datetime = models.DateTimeField('Время оплаты', auto_now_add=True)
    amount = models.FloatField(verbose_name='Сумма', null=True, default=0)

    class Meta:
        verbose_name = 'Пожертвование'
        verbose_name_plural = 'Пожертвования'

    def __str__(self):
        return f"{self.pk}-{self.sender}"


class Payment(models.Model):
    card = models.ForeignKey(Card, verbose_name='Карта пополнения',
                             related_name='card_payment', on_delete=models.DO_NOTHING)
    datetime = UnixTimeStampField(verbose_name='Время пополнения',)
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
    user = models.OneToOneField(User, primary_key=True, on_delete=models.CASCADE,
                                verbose_name='Юзернейм пользователя', blank=True, related_name='user_online', related_query_name='user_online')
    last_action = UnixTimeStampField(auto_now=True)

    class Meta:
        verbose_name = 'Последнее действие пользователя'
        verbose_name_plural = 'Последние действия пользователей'

    def __str__(self):
        return f"{self.user}-{self.last_action}"


class ReferralPayment(models.Model):
    user = models.ForeignKey(User, verbose_name='Пользователь',
                             on_delete=models.CASCADE, related_name='user_user_payment',)
    referrer = models.ForeignKey(User, verbose_name='Реферал',
                                 on_delete=models.CASCADE, related_name='referrer_user_payment',)
    amount = models.FloatField(verbose_name='Цена покупки')
    date_time = models.DateTimeField(
        verbose_name='Время оплаты', auto_now_add=True)

    class Meta:
        verbose_name = 'Реферальный платеж'
        verbose_name_plural = 'Реферальные платежи'

    def __str__(self):
        return f"{self.user}-{self.referrer}"


class CustomUsersList(models.Model):
    creator = models.ForeignKey(
        User, verbose_name='Создатель', on_delete=models.CASCADE, related_name='custom_list_cretor')
    name = models.CharField(verbose_name='Название', max_length=255)
    invited = models.ManyToManyField(
        User, verbose_name='Пользователи', related_name='custom_list_invited_users', blank=True)

    class Meta:
        verbose_name = 'Пользовательский список'
        verbose_name_plural = 'Пользовательские списки'

    def __str__(self):
        return f"{self.creator}-{self.name}"


class ChatSender(models.Model):
    custom_list = models.ForeignKey(CustomUsersList, verbose_name='Список',
                                    on_delete=models.CASCADE, related_name='chat_sender_custom_list')
    sended = models.BooleanField(verbose_name='Отправлено', default=False)
    message = models.TextField(verbose_name='Сообщение')

    class Meta:
        verbose_name = 'Пользовательский список рассылка'
        verbose_name_plural = 'Пользовательские списки рассылки'

    def __str__(self):
        return f"{self.custom_list.creator}-{self.sended}"


def update_verification(sender: PendingUser, instance: PendingUser, created: bool, **kwargs):
    if not created:
        if instance.verified:
            instance.user.verified = True
        instance.user.save()


@receiver(post_save, sender=Subscription, dispatch_uid='user_fans_amount_update_signal')
def update_fans_amount(sender: Subscription, instance: Subscription, created: bool, **kwargs):
    if created:
        instance.target.fans_amount += 1
        instance.target.save()
    else:
        if instance.finished:
            instance.target.fans_amount -= 1
            instance.target.save()


@receiver(post_save, sender=Payment, dispatch_uid='user_payment_create_signal')
def update_user_balance_payment(sender: Payment, instance: Payment, created: bool, **kwargs):
    if created:
        instance.card.user.credit_amount += instance.amount
        instance.card.user.save()


post_save.connect(update_verification, sender=PendingUser)


def sub_checker(user: User, source: User):
    return True if Subscription.objects.filter(
        target=user, source=source, finished=False).exists() else False


def chat_sub_checker(user: User, source: User):
    return True if ChatSubscription.objects.filter(
        target=user, source=source, finished=False).exists() else False
