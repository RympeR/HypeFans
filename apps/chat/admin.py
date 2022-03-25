from django.contrib import admin
from django.contrib.admin import DateFieldListFilter

from .models import (
    Room,
    Chat,
    UserMessage,
    ChatBought
)

@admin.register(ChatBought)
class ChatBoughtAdmin(admin.ModelAdmin):
    list_display = (
        'pk', 'user', 'chat', 'amount'
    )
    search_fields = ['user__username', ]


@admin.register(Room)
class RoomAdmin(admin.ModelAdmin):
    list_display = (
        'pk', 'creator', 'date'
    )
    search_fields = 'creator__username',
    ordering = '-date',
    list_filter = (
            ('date', DateFieldListFilter),
    )
    

@admin.register(Chat)
class ChatAdmin(admin.ModelAdmin):
    list_display = (
        'pk', 'room', 'user', 'date'
    )
    search_fields = 'user__username',
    ordering = '-date',
    list_filter = (
            ('date', DateFieldListFilter),
    )


@admin.register(UserMessage)
class UserMessageAdmin(admin.ModelAdmin):
    list_display = (
        'pk', 'message', 'user', 'readed'
    )
    search_fields = 'user__username',
    ordering = '-pk',
    list_filter = 'readed',

