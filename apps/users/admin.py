from django.contrib import admin
from admin_actions.admin import ActionsModelAdmin
from django.contrib.admin import DateFieldListFilter

from .models import (
    User,
    Card,
    Donation,
    Payment
)

@admin.register(User)
class UserAdmin(ActionsModelAdmin):
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

@admin.register(Card)
class CardAdmin(ActionsModelAdmin):
    list_display = [
        'user__username', 'number', 'creator'
    ]
    list_display_links = []
    list_filter = [
        'creator'
    ]
    search_fields = [
        'user__username'
    ]

@admin.register(Donation)
class DonationAdmin(ActionsModelAdmin):
    list_display = [
        'sender__username', 'reciever__username', 'amount', 'datetime' 
    ]
    list_display_links = []
    list_filter = [
        ('datetime', DateFieldListFilter),
    ]
    search_fields = ['sender__username', 'reciever__username']

@admin.register(Payment)
class PaymentAdmin(ActionsModelAdmin):
    list_display = [
        'card__sender__username', 'datetime', 'amount'
    ]
    search_fields = ['card__sender__username']
    list_filter = [
        ('datetime', DateFieldListFilter),
    ]
    ordering = '-pk',
