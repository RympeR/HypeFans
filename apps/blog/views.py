from datetime import datetime, timedelta
from django.db.models.expressions import Exists

from rest_framework import generics, permissions, renderers
from rest_framework.generics import GenericAPIView
from rest_framework.mixins import UpdateModelMixin
from rest_framework.response import Response

from apps.users.serializers import UserShortRetrieveSeriliazer
from apps.users.models import Subscription, User
from core.utils.default_responses import api_block_by_policy_451
from .models import *
from .serializers import *
from rest_framework import status


class AttachmentCreateAPI(generics.CreateAPIView):
    queryset = Attachment.objects.all()
    serializer_class = AttachmentSerializer


class PostBoughtCreateAPI(generics.CreateAPIView):
    queryset = PostBought.objects.all()
    serializer_class = PostBoughtCreateSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
        except AssertionError:
            return api_block_by_policy_451({"status": "not enought credits"})
        instance = self.perform_create(serializer)
        return Response(serializer.data)

    def get_serializer_context(self):
        return {'request': self.request}


class PostListAPI(generics.GenericAPIView):
    serializer_class = PostGetShortSerializers  

    def get(self, request, username):
        limit = request.GET.get('limit', 20)
        offset = request.GET.get('offset', 0)
        page_user = User.objects.get(username=username)
        user = request.user
        qs = Post.objects.filter(
            user=page_user
        )[offset:offset+limit]
        data = [{'post':self.get_serializer(instance=post).data} for post in qs]
        if user != page_user:
            for ind, post in enumerate(qs):
                user_data = UserShortRetrieveSeriliazer(
                    instance=page_user).data
                data[ind]['user'] = user_data
                if post.access_level == 1:
                    data[ind]['payed'] = (
                        True if PostBought.objects.filter(
                            post=post, user=user).exists() else False
                    )
                else:
                    
                    data[ind]['payed'] = (
                        True if Subscription.objects.filter(
                            target=post.user, source=user, end_date__gte=datetime.now()).exists() else False
                    )
            return Response(data)
        for ind, post in enumerate(data):
            user_data = UserShortRetrieveSeriliazer(
                    instance=page_user).data
            data[ind]['user'] = user_data
            data[ind]['payed'] = True
        return Response(data)


class PostRetrieveAPI(generics.RetrieveAPIView):
    queryset = Post.objects.all()
    serializer_class = PostGetSerializer


class PostCreateAPI(generics.CreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostCreationSerializer

    def get_serializer_context(self):
        return {'request': self.request}


class PostDeleteAPI(generics.DestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostCreationSerializer


class PostPartialUpdateAPI(GenericAPIView, UpdateModelMixin):
    queryset = Post.objects.all()
    serializer_class = PostUpdateSerializer

    def get_serializer_context(self):
        return {'request': self.request}


class PostActionListAPI(generics.GenericAPIView):
    serializer_class = PostActionGetSerializer

    def get(self, request, pk):
        limit = request.GET.get('limit', 20)
        offset = request.GET.get('offset', 0)
        qs = PostAction.objects.filter(
            post=Post.objects.get(pk=pk)
        )[offset:offset+limit]
        data = [self.get_serializer(instance=post) for post in qs]
        return Response(data)


class PostActionCreateAPI(generics.CreateAPIView):
    queryset = PostAction.objects.all()
    serializer_class = PostActionCreationSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
        except AssertionError:
            return api_block_by_policy_451({"status": "not enought credits"})
        instance = self.perform_create(serializer)
        instance_serializer = self.get_serializer(instance=instance)
        return Response(serializer.data)

    def get_serializer_context(self):
        return {'request': self.request}


class PostActionDeleteAPI(generics.DestroyAPIView):
    queryset = PostAction.objects.all()
    serializer_class = PostActionCreationSerializer


class StoryListAPI(generics.ListAPIView):
    queryset = Story.objects.all()
    serializer_class = StoryGetSerializer

    def get_queryset(self):
        user = self.request.user
        return Story.objects.filter(
            user__in=user.my_subscribes.all()
        )


class StoryCreateAPI(generics.CreateAPIView):
    queryset = Story.objects.all()
    serializer_class = StoryCreationSerializer

    def get_serializer_context(self):
        return {'request': self.request}


class StoryAPI(generics.RetrieveDestroyAPIView):
    queryset = Story.objects.all()
    serializer_class = StoryGetSerializer


class WatchedStoriesRetrieveAPI(generics.RetrieveAPIView):
    queryset = WatchedStories.objects.all()
    serializer_class = WatchedStoriesGetSerializer

    def get_object(self, request, pk):
        user = request.user
        target = Story.objects.get(pk=pk)

        return WatchedStories.objects.get(
            source=user,
            target=target
        )


class WatchedStoriesCreateAPI(generics.CreateAPIView):
    queryset = WatchedStories.objects.all()
    serializer_class = WatchedStoriesCreationSerializer

    def get_serializer_context(self):
        return {'request': self.request}


class UserNotifications(GenericAPIView):

    def get(self, request):
        limit = request.GET.get('limit', 50)
        offset = request.GET.get('offset', 0)
        user = request.user
        result = []
        comments_result = []
        likes_result = []
        donations_result = []
        subscriptions_result = []
        for comment in PostAction.objects.filter(
            comment__isnull=False,
            user=user,
        ).order_by('-datetime'):
            res_dict = {}
            user_data = UserShortRetrieveSeriliazer(instance=comment.user).data
            post_data = CommentRetrieveSerializer(instance=comment).data
            res_dict['user'] = user_data
            res_dict['post'] = post_data
            res_dict['type'] = 'comment'
            comments_result.append(res_dict)
        for like in PostAction.objects.filter(
            user=user,
            like=True
        ):
            res_dict = {}
            user_data = UserShortRetrieveSeriliazer(instance=like.user).data
            post_data = LikeRetrieveSerializer(instance=like).data
            res_dict['user'] = user_data
            res_dict['post'] = post_data
            res_dict['type'] = 'like'
            likes_result.append(res_dict)
        for donation in user.recieved_user.all().order_by('-datetime'):
            user_data = UserShortRetrieveSeriliazer(
                instance=donation.sender).data
            res_dict = {}
            donation_data = {
                'amount': donation.amount,
                'datetime': donation.datetime
            }
            res_dict['user'] = user_data
            res_dict['donation'] = donation_data
            res_dict['type'] = 'donation'
            donations_result.append(res_dict)

        for subscription in user.target_user_subscribe.all().order_by('-start_date'):
            user_data = UserShortRetrieveSeriliazer(
                instance=subscription.source).data
            res_dict = {}
            subscription_data = {
                'amount': subscription.amount,
                'start_date': subscription.start_date,
                'end_date': subscription.end_date
            }
            res_dict['user'] = user_data
            res_dict['subscription'] = subscription_data
            res_dict['type'] = 'subsrciption'
            subscriptions_result.append(res_dict)
        result = [
            *comments_result,
            *likes_result,
            *donations_result,
            *subscriptions_result,
        ]
        return Response(result[offset:offset+limit])


class MainUserPage(GenericAPIView):

    serializer_class = MainPageSerializer

    def get(self, request):
        user = request.user
        data_compare = request.GET.get('datetime', 0)
        limit = request.GET.get('limit', 50)
        offset = request.GET.get('offset', 0)
        results = []
        if data_compare == 0:
            for user_sub in user.my_subscribes.all():
                for post in user_sub.user_post.filter(archived=False).order_by('-publication_date'):
                    user_data = UserShortRetrieveSeriliazer(
                        instance=user_sub).data
                    post_data = PostGetShortSerializers(instance=post).data
                    res_dict = {}
                    res_dict['user'] = user_data
                    res_dict['post'] = post_data
                    if post.access_level == 1:
                        res_dict['post']['payed'] = (
                            True if PostBought.objects.filter(
                                post=post, user=user).exists() else False
                        )
                    else:
                        res_dict['post']['payed'] = (
                            True if Subscription.objects.filter(
                                target=post.user, source=user, end_date__gte=datetime.now()).exists() else False
                        )
                    results.append(res_dict)
                    return Response(
                        results[offset:limit+offset]
                    )
        for user_sub in user.my_subscribes.all():
            for post in user_sub.user_action_post.filter(archived=False, datetime__lte=data_compare).order_by('-publication_date'):
                user_data = UserShortRetrieveSeriliazer(
                    instance=user_sub).data
                post_data = PostGetShortSerializers(instance=post).data
                res_dict = {}
                res_dict['user'] = user_data
                res_dict['post'] = post_data
                results.append(res_dict)
        return Response(
            results[offset:limit+offset]
        )


class SubStories(GenericAPIView):

    serializer_class = SubStoriesSerializer

    def get(self, request):
        user = request.user
        results = []
        limit = request.GET.get('limit', 50)
        offset = request.GET.get('offset', 0)
        for user_sub in user.my_subscribes.all():
            res_dict = {}
            user_data = UserShortRetrieveSeriliazer(
                instance=user_sub).data
            res_dict['user'] = user_data
            res_dict['stories'] = []
            for story in user_sub.user_story.filter(archived=False):
                story_data = StoryShortSerializer(instance=story)
                watched = WatchedStories.objects.filter(
                    source=story,
                    target=user
                )
                res_dict['watched'] = watched.exists()
                res_dict['stories'].append(story_data)
            results.append(res_dict)

        return Response(
            sorted(results[offset:limit+offset],
                   key=lambda story: story['stories']['datetime'])[::-1]
        )

# class MarkFavourite
