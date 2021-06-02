from django.contrib import admin
from django.contrib.admin import DateFieldListFilter

from .models import (
    User,
    Card,
    Donation,
    Payment,
    Subscription,
    UserOnline,
    PendingUser
)


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
class UserAdmin(admin.ModelAdmin):
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


@admin.register(Subscription)
class SubscriptionAdmin(admin.ModelAdmin):
    list_display = [
        'pk','source', 'target', 'start_date', 'end_date'
    ]
    list_display_links = [
        'pk'
    ]
    list_filter = (
            ('start_date', DateFieldListFilter),
            ('end_date', DateFieldListFilter),
    )
    search_fields = [
        'source__username', 'end_date__username',
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
