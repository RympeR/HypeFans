from django.contrib import admin
from django.contrib.admin import DateFieldListFilter, BooleanFieldListFilter
from mptt.admin import TreeRelatedFieldListFilter
from mptt.admin import DraggableMPTTAdmin, TreeRelatedFieldListFilter, MPTTModelAdmin
from .models import (
    Attachment,
    Post,
    PostAction,
    Story,
    WatchedStories,
    PostBought,
    RecommendationValidationPost,
)


@admin.register(RecommendationValidationPost)
class RecommendationValidationPostAdmin(admin.ModelAdmin):
    list_display = (
        'pk', 'post', 'validated'
    )
    search_fields = ['user__username', 'post__title']

    actions_row = actions_detail = 'confirm_post', 'reject_post',

    def confirm_post(self, request, pk):
        pending_post = RecommendationValidationPost.objects.get(pk=pk)
        post = pending_post.post
        pending_post.validated = True
        post.validated = True
        post.save()
        pending_post.save()

    confirm_post.short_description = 'Confirm'

    def reject_post(self, request, pk):
        pending_post = RecommendationValidationPost.objects.get(pk=pk)
        post = pending_post.post
        pending_post.validated = False
        post.validated = False
        post.save()
        pending_post.save()

    reject_post.short_description = 'Reject'


@admin.register(PostBought)
class PostBoughtAdmin(admin.ModelAdmin):
    list_display = (
        'pk', 'user', 'post', 'amount'
    )
    search_fields = ['user__username', 'post__title']


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


# @admin.register(PostAction)
class PostActionAdmin(DraggableMPTTAdmin):
    mptt_indent_field = "pk"
    list_display = (
        'tree_actions', 'pk', 'user', 'post', 'like', 'comment', 'donation_amount'
    )
    list_display_links = [
        'pk',
    ]
    search_fields = ['user__username', 'post__name']
    # ordering = '-pk',
    filter_fields = ['like']
    list_filter = (
        ('parent', TreeRelatedFieldListFilter),
    )


admin.site.register(PostAction, PostActionAdmin)


@admin.register(Story)
class StoryAdmin(admin.ModelAdmin):
    list_display = (
        'pk', 'user', 'archived', 'publication_date'
    )
    list_display_links = [
        'pk',
        'user'
    ]
    search_fields = ['user__username', ]
    ordering = '-pk',
    list_filter = (
        ('publication_date', DateFieldListFilter),
        'archived'
    )


@admin.register(WatchedStories)
class WatchedStoriesAction(admin.ModelAdmin):
    list_display = (
        'pk', 'source', 'target', 'like', 'watched', 'times_watched'
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
