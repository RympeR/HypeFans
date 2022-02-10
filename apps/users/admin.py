from django import forms
from django.contrib import admin
from django.contrib.admin import DateFieldListFilter
from django.contrib.auth.forms import ReadOnlyPasswordHashField
from django.contrib.auth.admin import UserAdmin
from .models import (
    User,
    Card,
    Donation,
    Payment,
    Subscription,
    UserOnline,
    PendingUser,
    ChatSubscription,
    ReferralPayment,
)
from django.utils.translation import gettext, gettext_lazy as _


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
            'email_notifications',
            'push_notifications',
            'hide_online',
            'allow_comments',
            'show_post_amount',
            'show_fans_amount',
            'show_watermark',
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
class PendingUserAdmin(admin.ModelAdmin):
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
