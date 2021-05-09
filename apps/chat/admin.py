from django.contrib import admin
from admin_actions.admin import ActionsModelAdmin
from django.contrib.admin import DateFieldListFilter

from .models import (
    Room,
    Chat,
    UserMessage
)

@admin.register(Room)
class RoomAdmin(ActionsModelAdmin):
    list_display = (
        'pk', 'creator', 'date'
    )
    search_fields = 'creator__username'
    ordering = '-date',
    list_filter = (
            ('date', DateFieldListFilter),
    )


@admin.register(Chat)
class ChatAdmin(ActionsModelAdmin):
    list_display = (
        'pk', 'room', 'user', 'date'
    )
    search_fields = 'user__username'
    ordering = '-date',
    list_filter = (
            ('date', DateFieldListFilter),
    )


@admin.register(UserMessage)
class ChatAdmin(ActionsModelAdmin):
    list_display = (
        'pk', 'message', 'user'
    )
    search_fields = 'user__username'
    ordering = '-pk',
    list_filter = 'readed',

