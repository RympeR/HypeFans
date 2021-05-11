from django.contrib import admin
from django.contrib.admin import DateFieldListFilter

from .models import (
    Attachment,
    Post,
    PostAction,
    Story,
    WatchedStories,
)

@admin.register(Attachment)
class AttachmentAdmin(admin.ModelAdmin):
    list_display = (
        'pk', 'file_type'
    )
    readonly_fields = [
        'file_type'
    ]
    ordering = '-pk',
    list_filter = ('file_type', )

@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = (
        'pk', 'user', 'name', 'price_to_watch', 'publication_date'
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
class PostActionAdmin(admin.ModelAdmin):
    list_display = (
        'pk', 'user', 'post', 'like', 'comment', 'donation_amount'
    )
    list_display_links = [
        'pk',
        'user'
    ]
    search_fields = ['user__username', 'post__name']
    ordering = '-pk',
    list_filter = (
        'like',
    )


@admin.register(Story)
class StoryAdmin(admin.ModelAdmin):
    list_display = (
        'pk', 'user', 'archived', 'publication_date'
    )
    list_display_links = [
        'pk',
        'user'
    ]
    search_fields = ['user__username',]
    ordering = '-pk',
    list_filter = (
            ('publication_date', DateFieldListFilter),
            'archived'
    )

@admin.register(WatchedStories)
class WatchedStoriesAction(admin.ModelAdmin):
    list_display = (
        'pk', 'source', 'target', 'like', 'watched', 'times_wathced'
    )
    list_display_links = [
        'pk',
        'source'
    ]
    search_fields = ['source__user__username', 'target__user__username']
    ordering = '-pk',
    list_filter = (
        'like',
    )

