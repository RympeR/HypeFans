from django.contrib import admin
from admin_actions.admin import ActionsModelAdmin
from django.contrib.admin import DateFieldListFilter

from .models import (
    Attachment,
    Post,
    PostAction,
    Story,
    WatchedStories,
)

@admin.register(Attachment)
class AttachmentAdmin(ActionsModelAdmin):
    list_display = (
        'pk', 'file_type'
    )
    readonly_fields = [
        'file_type'
    ]
    ordering = '-pk',
    list_filter = ('file_type', )

@admin.register(Post)
class PostAdmin(ActionsModelAdmin):
    list_display = (
        'pk', 'user__username', 'name', 'price_to_watch', 'publication_date'
    )
    list_display_links = [
        'pk',
        'name'
    ]
    search_fields = ['user__username', 'name']
    ordering = '-pk',
    list_filter = (
            ('publication_date', DateFieldListFilter),
    )

@admin.register(PostAction)
class PostActionAdmin(ActionsModelAdmin):
    list_display = (
        'pk', 'user__username', 'post__name', 'like', 'comment', 'donation_amount'
    )
    list_display_links = [
        'pk',
        'user__username'
    ]
    search_fields = ['user__username', 'post__name']
    ordering = '-pk',
    list_filter = (
        'like',
    )


@admin.register(Story)
class StoryAdmin(ActionsModelAdmin):
    list_display = (
        'pk', 'user__username', 'archived', 'publication_date'
    )
    list_display_links = [
        'pk',
        'user__username'
    ]
    search_fields = ['user__username',]
    ordering = '-pk',
    list_filter = (
            ('publication_date', DateFieldListFilter),
            'archived'
    )

@admin.register(WatchedStories)
class WatchedStoriesAction(ActionsModelAdmin):
    list_display = (
        'pk', 'source__user__username', 'target__user__username', 'like', 'watched', 'times_wathced'
    )
    list_display_links = [
        'pk',
        'source__user__username'
    ]
    search_fields = ['source__user__username', 'target__user__username']
    ordering = '-pk',
    list_filter = (
        'like',
    )

