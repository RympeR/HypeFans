from datetime import datetime, timedelta
from admin_actions.admin import ActionsModelAdmin
from django.contrib import admin, messages

from django.contrib.admin import DateFieldListFilter
from django.contrib.auth.admin import UserAdmin
from django.http import HttpResponseRedirect
from django.urls import reverse_lazy
from django.utils.translation import gettext_lazy as _

from apps.users.dynamic_preferences_registry import ReferralPercentage

from .models import (Card, ChatSender, ChatSubscription, CustomUsersList,
                     Donation, Payment, PendingUser, ReferralPayment, UserModelCheck,
                     Subscription, SubscriptionRequest, User, UserOnline)


@admin.register(CustomUsersList)
class CustomUsersListAdmin(admin.ModelAdmin):
    list_display = [
        'creator', 'name',
    ]
    search_fields = [
        'creator__username', 'name',
    ]


@admin.register(ChatSender)
class ChatSenderAdmin(admin.ModelAdmin):
    list_display = [
        'custom_list'
    ]
    list_filter = 'sended',


@admin.register(UserOnline)
class UserOnlineAdmin(admin.ModelAdmin):
    list_display = [
        'user', 'last_action',
    ]
    search_fields = [
        'user'
    ]
    ordering = '-last_action',


@admin.register(User)
class UserBaseAdmin(UserAdmin):

    list_display = [
        'email', 'username', 'first_name', 'validated_user'
    ]
    list_display_links = [
        'username'
    ]
    list_filter = [
        'validated_user'
    ]
    search_fields = [
        'email', 'username', 'first_name',
    ]
    ordering = '-pk',

    fieldsets = (
        (None, {'fields': ('username', 'password')}),
        (_('Personal info'), {'fields': (
            'first_name',
            'email',
            'avatar',
            'background_photo',
            'bio',
            'birthday_date',
            'location',
            'city',
            'repheral_users',
            'blocked_users',
            'my_subscribes',
            'validation_code',
        )}),
        (_('Profile stats'), {'fields': (
            'post_amount',
            'fans_amount',
        )}),
        (_('Money'), {'fields': (
            'subscribtion_price',
            'message_price',
            'subscribtion_duration',
            'credit_amount',
            'earned_credits_amount',
            'ref_link',
            'referrer',
            'wallet'
        )}),
        (_('Confidence'), {'fields': (
            'hide_in_search',
            'private_profile',
            'email_notifications',
            'push_notifications',
            'hide_online',
            'allow_comments',
            'show_post_amount',
            'show_fans_amount',
            'show_watermark',
            'show_comment_notifications',
            'show_chat_subscribption_notifications',
            'show_subscribption_notifications',
            'show_donate_notifications',
            'show_like_notifications',
        )}),
        (_('Permissions'), {
            'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions'),
        }),
        (_('Important dates'), {'fields': ('last_login', 'date_joined')}),
        (_('Models'), {'fields': ('validated_user', 'creator')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'password1', 'password2'),
        }),
    )
    filter_horizontal = ('groups', 'user_permissions', 'repheral_users',
                         'blocked_users',
                         'my_subscribes')


@admin.register(Subscription, ChatSubscription)
class SubscriptionAdmin(admin.ModelAdmin):
    list_display = [
        'pk', 'source', 'target', 'start_date', 'end_date'
    ]
    list_display_links = [
        'pk'
    ]
    list_filter = (
        ('start_date', DateFieldListFilter),
        ('end_date', DateFieldListFilter),
    )
    search_fields = [
        'source__username', 'target__username',
    ]
    ordering = '-pk',


@admin.register(Card)
class CardAdmin(admin.ModelAdmin):
    list_display = [
        'user', 'number', 'creator'
    ]
    list_display_links = []
    list_filter = [
        'creator'
    ]
    search_fields = [
        'user__username'
    ]


@admin.register(ReferralPayment)
class ReferralPaymentAdmin(admin.ModelAdmin):
    list_display = [
        'pk', 'user', 'referrer', 'amount', 'date_time'
    ]
    list_display_links = ['pk']
    list_filter = (
        ('date_time', DateFieldListFilter),
    )
    search_fields = [
        'user__username',
        'referrer__username',
    ]


@admin.register(Donation)
class DonationAdmin(admin.ModelAdmin):
    list_display = [
        'sender', 'reciever', 'amount', 'datetime'
    ]
    list_display_links = []
    list_filter = [
        ('datetime', DateFieldListFilter),
    ]
    search_fields = ['sender__username', 'reciever__username']


@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    list_display = [
        'card', 'datetime', 'amount'
    ]
    search_fields = ['card__sender__username']
    list_filter = [
        ('datetime', DateFieldListFilter),
    ]
    ordering = '-pk',


@admin.register(PendingUser)
class PendingUserAdmin(ActionsModelAdmin):
    list_display = [
        'pk', 'user', 'verified'
    ]
    search_fields = ['user__username']
    list_filter = ['verified']
    ordering = '-pk',
    actions_row = actions_detail = 'confirm_user', 'reject_user',

    def confirm_user(self, request, pk):
        pending_user = PendingUser.objects.get(pk=pk)
        user = pending_user.user
        user.validated_user = True
        pending_user.verified = True
        user.save()
        pending_user.save()

    confirm_user.short_description = 'Confirm'

    def reject_user(self, request, pk):
        pending_user = PendingUser.objects.get(pk=pk)
        user = pending_user.user
        user.validated_user = False
        pending_user.verified = False
        user.save()
        pending_user.save()

    reject_user.short_description = 'Reject'


@admin.register(UserModelCheck)
class UserModelCheckAdmin(ActionsModelAdmin):
    list_display = [
        'pk', 'user', 'is_model'
    ]
    search_fields = ['user__username']
    list_filter = ['is_model']
    ordering = '-pk',
    actions_row = actions_detail = 'confirm_user', 'reject'

    def reject(self, request, pk):
        return HttpResponseRedirect(reverse_lazy('admin:user_usermodelcheck_changelist'), request)
    def confirm_user(self, request, pk):
        pending_user = UserModelCheck.objects.get(pk=pk)
        user = pending_user.user
        user.is_model = True
        user.hide_in_search = False
        pending_user.is_model = True
        user.save()
        pending_user.save()
        return HttpResponseRedirect(reverse_lazy('admin:user_usermodelcheck_changelist'), request)

    confirm_user.short_description = 'Confirm'


@admin.register(SubscriptionRequest)
class SubscriptionRequestAdmin(ActionsModelAdmin):
    list_display = [
        'pk', 'source', 'target'
    ]
    search_fields = ['source__username', 'target__username']
    list_filter = ['accepted']
    ordering = '-pk',
    actions_row = actions_detail = 'accept_subscription', 'reject'

    def reject(self, request, pk):
        return HttpResponseRedirect(reverse_lazy('admin:user_subscriptionrequest_changelist'), request)

    def accept_subscription(self, request, pk):
        pending_sub = SubscriptionRequest.objects.get(pk=pk)
        if not pending_sub.accepted:
            source = pending_sub.source
            target = pending_sub.target
            now = datetime.now()
            start_date = now.strftime("%Y-%m-%d %H:%M:%S")
            end_date = (
                now + timedelta(days=source.subscribtion_duration)).strftime("%Y-%m-%d %H:%M:%S")

            if source.credit_amount >= target.subscribtion_price:
                source.credit_amount -= target.subscribtion_price
                target.earned_credits_amount += target.subscribtion_price
                source.save()
                referrer = target.referrer
                if referrer:
                    amount = target.subscribtion_price * \
                        ReferralPercentage.value()
                    referrer.earned_credits_amount += amount
                    referrer.save()
                    ReferralPayment.objects.create(
                        user=source,
                        referrer=referrer,
                        amount=amount
                    )
                target.save()

                Subscription.objects.create(
                    source=pending_sub.source,
                    target=pending_sub.target,
                    start_date=start_date,
                    end_date=end_date
                )
                pending_sub.accepted = True
                pending_sub.save()
                messages.success(request, 'Подписка создана')
            else:
                messages.error(request, 'Недостаточно средств')
            return HttpResponseRedirect(reverse_lazy('admin:user_subscriptionrequest_changelist'), request)
        messages.error(
            request, 'Подписка уже подтверждена')
        return HttpResponseRedirect(reverse_lazy('admin:user_subscriptionrequest_changelist'), request)
    accept_subscription.short_description = 'Confirm'
