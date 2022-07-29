import logging
from django.contrib import admin, messages
from django.contrib.admin import DateFieldListFilter, BooleanFieldListFilter
from django.http import HttpResponseRedirect
from django.urls import reverse_lazy
from mptt.admin import TreeRelatedFieldListFilter
from admin_actions.admin import ActionsModelAdmin
from mptt.admin import DraggableMPTTAdmin, TreeRelatedFieldListFilter, MPTTModelAdmin
from django.utils.html import mark_safe

from apps.users.models import User
from .models import (
    Attachment,
    Post,
    PostAction,
    Story,
    WatchedStories,
    PostBought,
    RecommendationValidationPost,
    PostCategory,
    Hashtag
)


class LikeIncreaser(admin.SimpleListFilter):

    title = 'Like increaser'
    parameter_name = 'name'
    template = 'admin/like_increaser.html'

    def lookups(self, request, model_admin):
        return (
            ('Yes', 'Yes'),
        )

    def queryset(self, request, queryset):
        value = self.value()
        try:
            like_amount, post_id = value.split(':')
            if value:
                for _ in range(int(like_amount)):
                    PostAction.objects.create(
                        user=User.objects.get(pk=1),
                        post=Post.objects.get(pk=int(post_id)),
                        like=True
                    )
        except Exception as e:
            logging.error('#####ERROR{}' .format(e))
        return queryset


@admin.register(PostBought)
class PostBoughtAdmin(admin.ModelAdmin):
    list_display = (
        'pk', 'user', 'post', 'amount'
    )
    search_fields = ['user__username', 'post__title']


@admin.register(Hashtag)
class HashtagAdmin(admin.ModelAdmin):
    list_display = (
        'pk', 'name'
    )
    search_fields = ['name']


@admin.register(PostCategory)
class PostCategoryAdmin(MPTTModelAdmin):
    list_display = ('name', 'parent',)
    search_fields = ['name']


@admin.register(Attachment)
class AttachmentAdmin(admin.ModelAdmin):
    list_display = (
        'pk', 'file_type', 'file_preview', '_file'
    )
    list_editable = ['_file']
    readonly_fields = [
        'file_type'
    ]
    ordering = '-pk',
    list_filter = ('file_type', )


class AttachmentInlineAdmin(admin.TabularInline):
    model = Post.attachments.through
    # fields = ('file_type', '_file')
    readonly_fields = ('file_preview', 'file_type', '_file')

    def file_preview(self, instance):
        return instance.attachment.file_preview

    def _file(self, instance):
        return instance.attachment._file

    def file_type(self, instance):
        return instance.attachment.file_type


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = (
        'pk', 'user', 'name', 'price_to_watch', 'publication_date'
    )
    list_display_links = [
        'pk',
        'name'
    ]
    search_fields = ['user__username', 'name',
                     'hashtags__name', 'category__name']
    ordering = '-pk',
    list_filter = LikeIncreaser, 'publication_date',
    inlines = (AttachmentInlineAdmin,)
    exclude = ['attachments']
# @admin.register(PostAction)


class PostActionAdmin(admin.ModelAdmin):
    list_display = (
        'pk', 'user', 'post', 'like', 'comment', 'donation_amount'
    )
    list_display_links = [
        'pk',
    ]
    search_fields = ['user__username', 'post__name']
    ordering = '-pk',
    filter_fields = ['like']


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


@admin.register(RecommendationValidationPost)
class RecommendationValidationPostAdmin(ActionsModelAdmin):
    list_display = (
        'pk', 'post', 'validated'
    )
    search_fields = ['post__title']
    list_filter = 'validated',
    actions_list = ('confirm_post', 'reject_post', )
    actions_row = ('confirm_post', 'reject_post', )
    actions_detail = ('confirm_post', 'reject_post', )

    def confirm_post(self, request, pk):

        pending_post = RecommendationValidationPost.objects.get(pk=pk)
        if pending_post.validated:
            messages.error(
                request, 'Пост уже валидирован')
            return HttpResponseRedirect(reverse_lazy('admin:blog_recommendationvalidationpost_changelist'), request)
        else:
            messages.success(
                request, 'Пост принят')
            post = pending_post.post
            pending_post.validated = True
            post.validated = True
            post.save()
            pending_post.save()
            return HttpResponseRedirect(reverse_lazy('admin:blog_recommendationvalidationpost_changelist'), request)

    confirm_post.short_description = 'Confirm'
    confirm_post.url_path = 'confirm-post'

    def reject_post(self, request, pk):
        pending_post = RecommendationValidationPost.objects.get(pk=pk)
        if not pending_post.validated:
            messages.error(
                request, 'Пост уже отклонен')
            return HttpResponseRedirect(reverse_lazy('admin:blog_recommendationvalidationpost_changelist'), request)
        else:
            messages.success(
                request, 'Пост отклонен')
            post = pending_post.post
            pending_post.validated = False
            post.validated = False
            post.save()
            pending_post.save()
            return HttpResponseRedirect(reverse_lazy('admin:blog_recommendationvalidationpost_changelist'), request)

    reject_post.short_description = 'Reject'
    reject_post.url_path = 'reject-post'
