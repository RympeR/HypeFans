import logging
from datetime import datetime, timedelta

from core.utils.default_responses import api_block_by_policy_451
from django.db.models.expressions import Exists
from rest_framework import generics, permissions, renderers, status
from rest_framework.generics import GenericAPIView
from rest_framework.mixins import UpdateModelMixin
from rest_framework.response import Response

from apps.users.models import Subscription, User
from apps.users.serializers import UserShortRetrieveSeriliazer

from .models import *
from .serializers import *


class AttachmentCreateAPI(generics.CreateAPIView):
    queryset = Attachment.objects.all()
    serializer_class = AttachmentCreateSerializer


class AttachmentManyCreateAPI(generics.CreateAPIView):
    queryset = Attachment.objects.all()
    serializer_class = AttachmentManySerializer


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
    queryset = Post.objects.all()

    def get(self, request, username):
        limit = request.GET.get('limit', 20)
        offset = request.GET.get('offset', 0)
        page_user = User.objects.get(username=username)
        user = request.user
        qs = Post.objects.filter(
            user=page_user
        )[offset:offset+limit]
        data = [{'post': self.get_serializer(
            instance=post, context={'request': request}).data} for post in qs]

        for ind, post in enumerate(qs):
            user_data = UserShortRetrieveSeriliazer(
                instance=page_user, context={'request': request}).data
            post_data = PostGetShortSerializers(
                instance=post, context={'request': request}).data
            data[ind]['user'] = user_data
            data[ind]['post'] = post_data
            if post.access_level == 1:
                data[ind]['post']['payed'] = (
                    True if PostBought.objects.filter(
                        post=post, user=user).exists() else False
                )
            else:

                data[ind]['post']['payed'] = (
                    True if Subscription.objects.filter(
                        target=post.user, source=user, end_date__gte=datetime.now()).exists() else False
                )
            postActionQuerySet = PostAction.objects.filter(
                post=post, user=user)
            if postActionQuerySet.exists():
                for action in postActionQuerySet:
                    if action.like:
                        data[ind]['post']['liked'] = True
                        data[ind]['post']['like_id'] = action.pk
                        break
                else:
                    data[ind]['post']['liked'] = False
                    data[ind]['post']['like_id'] = None
            else:
                data[ind]['post']['liked'] = False
                data[ind]['post']['like_id'] = None
            if user in post.favourites.all():
                data[ind]['post']['favourite'] = True
            else:
                data[ind]['post']['favourite'] = False

        for ind, post in enumerate(data):
            user_data = UserShortRetrieveSeriliazer(
                instance=page_user, context={'request': request}).data
            data[ind]['user'] = user_data
            data[ind]['post']['payed'] = True
        return Response(data)

    def get_serializer_context(self):
        return {'request': self.request}


class PostRetrieveAPI(generics.RetrieveAPIView):
    queryset = Post.objects.all()
    serializer_class = PostGetSerializer

    def get_serializer_context(self):
        return {'request': self.request}


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
    queryset = PostAction.objects.all()
    
    def get(self, request, pk):
        qs = PostAction.objects.filter(
            post=Post.objects.get(pk=pk)
        )
        data = [self.get_serializer(
                        instance=post, 
                        context={
                            'request': request
                        }
                    ).data for post in qs]
        return Response(data)

    def get_serializer_context(self):
        return {'request': self.request}


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
        instance_serializer = self.get_serializer(
            instance=instance, context={'request': request})
        return Response(serializer.data)

    def get_serializer_context(self):
        return {'request': self.request}


class PostActionDeleteAPI(generics.DestroyAPIView):
    queryset = PostAction.objects.all()
    serializer_class = PostActionCreationSerializer

    def get_serializer_context(self):
        return {'request': self.request}


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


class StoryAPI(generics.DestroyAPIView):
    queryset = Story.objects.all()
    serializer_class = StoryGetSerializer

    def get_serializer_context(self):
        return {'request': self.request}


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
    queryset = User.objects.all()

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
        ).order_by('-date_time').distinct():
            res_dict = {}
            user_data = UserShortRetrieveSeriliazer(
                instance=comment.user, context={'request': request}).data
            post_data = CommentRetrieveSerializer(
                instance=comment, context={'request': request}).data
            res_dict['user'] = user_data
            res_dict['post'] = post_data
            res_dict['type'] = 'comment'
            comments_result.append(res_dict)
        for like in PostAction.objects.filter(
            user=user,
            like=True
        ).distinct():
            res_dict = {}
            user_data = UserShortRetrieveSeriliazer(
                instance=like.user, context={'request': request}).data
            post_data = LikeRetrieveSerializer(
                instance=like, context={'request': request}).data
            res_dict['user'] = user_data
            res_dict['post'] = post_data
            res_dict['type'] = 'like'
            likes_result.append(res_dict)
        for donation in user.recieved_user.all().order_by('-datetime').distinct():
            user_data = UserShortRetrieveSeriliazer(
                instance=donation.sender, context={'request': request}).data
            res_dict = {}
            donation_data = {
                'pk': donation.pk,
                'amount': donation.amount,
                'date_time': donation.datetime.timestamp()
            }
            res_dict['user'] = user_data
            res_dict['donation'] = donation_data
            res_dict['type'] = 'donation'
            donations_result.append(res_dict)

        for subscription in user.target_user_subscribe.all().order_by('-start_date').distinct():
            user_data = UserShortRetrieveSeriliazer(
                instance=subscription.source, context={'request': request}).data
            res_dict = {}
            subscription_data = {
                'amount': user.subscribtion_price,
                'start_date': subscription.start_date.timestamp(),
                'end_date': subscription.end_date.timestamp()
            }
            res_dict['user'] = user_data
            res_dict['subscription'] = subscription_data
            res_dict['type'] = 'subscription'
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
    queryset = Post.objects.all()

    def get(self, request):
        user = request.user
        data_compare = request.GET.get('datetime', 0)
        limit = request.GET.get('limit', 50)
        offset = request.GET.get('offset', 0)
        results = {
            'recommendations': [],
            'posts': [],
            'stories': []
        }
        qs = User.objects.all().order_by('-fans_amount')[:9]
        if qs.exists():
            results['recommendations'].append(
                UserShortRetrieveSeriliazer(instance=qs, many=True, context={'request': request}).data)
        if data_compare == 0:
            for user_sub in user.my_subscribes.all():
                logging.warning(f'user subs main page -> {user_sub}')
                for post in user_sub.user_post.filter(archived=False).order_by('-publication_date'):
                    logging.warning(f'user subs POST main page -> {post}')
                    user_data = UserShortRetrieveSeriliazer(
                        instance=user_sub, context={'request': request}).data
                    post_data = PostGetShortSerializers(
                        instance=post, context={'request': request}).data
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
                    postActionQuerySet = PostAction.objects.filter(
                        post=post, user=user)
                    if postActionQuerySet.exists():
                        for action in postActionQuerySet:
                            if action.like:
                                res_dict['post']['liked'] = True
                                res_dict['post']['like_id'] = action.pk
                                break
                        else:
                            res_dict['post']['liked'] = False
                            res_dict['post']['like_id'] = None
                    else:
                        res_dict['post']['liked'] = False
                        res_dict['post']['like_id'] = None
                    if user in post.favourites.all():
                        res_dict['post']['favourite'] = True
                    else:
                        res_dict['post']['favourite'] = False

                    results['posts'].append(res_dict)
                for story in user_sub.user_story.filter(archived=False, publication_date__lte=data_compare).order_by('-publication_date'):
                    user_data = UserShortRetrieveSeriliazer(
                        instance=user_sub, context={'request': request}).data
                    post_data = StoryShortSerializer(
                        instance=story, context={'request': request}).data
                    res_dict = {}
                    res_dict['user'] = user_data
                    res_dict['post'] = post_data
                    results['posts'].append(res_dict)

            return Response(
                {
                    'recommendations': results['recommendations'],
                    'posts': results['posts'][offset:limit+offset],
                    'stoires': []
                }
            )
        for user_sub in user.my_subscribes.all():
            for post in user_sub.user_post.filter(archived=False, publication_date__lte=data_compare).order_by('-publication_date'):
                user_data = UserShortRetrieveSeriliazer(
                    instance=user_sub, context={'request': request}).data
                post_data = PostGetShortSerializers(
                    instance=post, context={'request': request}).data
                res_dict = {}
                res_dict['user'] = user_data
                res_dict['post'] = post_data
                results['posts'].append(res_dict)

            for story in user_sub.user_story.filter(archived=False, publication_date__lte=data_compare).order_by('-publication_date'):
                user_data = UserShortRetrieveSeriliazer(
                    instance=user_sub, context={'request': request}).data
                post_data = StoryShortSerializer(
                    instance=story, context={'request': request}).data
                res_dict = {}
                res_dict['user'] = user_data
                res_dict['post'] = post_data
                results['posts'].append(res_dict)

        return Response(
            {
                'recommendations': results['recommendations'],
                'posts': results['posts'][offset:limit+offset],
                'stoires': []
            }
        )

    def get_serializer_context(self):
        return {'request': self.request}


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
                instance=user_sub, context={'request': request}).data
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
                   key=lambda story: story['stories']['date_time'])[::-1]
        )


class MarkFavourite(generics.GenericAPIView):
    permission_classes = (permissions.IsAuthenticated, )
    serializer_class = UserFavouritesSerializer

    def put(self, request):
        data = request.data
        user = request.user
        if self.serializer_class(data=data).is_valid():
            post = Post.objects.get(pk=data['post_id'])
            if data['favourite']:
                post.favourites.add(user)
                return Response(data)
            post.favourites.remove(user)
            return Response(data)

    def get_serializer_context(self):
        return {'request': self.request}


class GetFavouritePosts(generics.GenericAPIView):
    serializer_class = PostGetShortSerializers
    queryset = Post.objects.all()

    def get(self, request):
        limit = request.GET.get('limit', 20)
        offset = request.GET.get('offset', 0)
        user = request.user
        qs = user.user_favourites.all()[offset:offset+limit]
        data = [{'post': self.get_serializer(
            instance=post, context={'request': request}).data} for post in qs]
        for ind, post in enumerate(qs):
            user_data = UserShortRetrieveSeriliazer(
                instance=post.user, context={'request': request}).data
            post_data = PostGetShortSerializers(
                instance=post, context={'request': request}).data
            data[ind]['user'] = user_data
            data[ind]['post'] = post_data
            if post.access_level == 1:
                data[ind]['post']['payed'] = (
                    True if PostBought.objects.filter(
                        post=post, user=user).exists() else False
                )
            else:

                data[ind]['post']['payed'] = (
                    True if Subscription.objects.filter(
                        target=post.user, source=user, end_date__gte=datetime.now()).exists() else False
                )
            postActionQuerySet = PostAction.objects.filter(
                post=post, user=user)
            if postActionQuerySet.exists():
                for action in postActionQuerySet:
                    if action.like:
                        data[ind]['post']['liked'] = True
                        data[ind]['post']['like_id'] = action.pk
                        break
                else:
                    data[ind]['post']['liked'] = False
                    data[ind]['post']['like_id'] = None
            else:
                data[ind]['post']['liked'] = False
                data[ind]['post']['like_id'] = None
            if user in post.favourites.all():
                data[ind]['post']['favourite'] = True
            else:
                data[ind]['post']['favourite'] = False

        for ind, post in enumerate(qs):
            user_data = UserShortRetrieveSeriliazer(
                instance=post.user, context={'request': request}).data
            data[ind]['user'] = user_data
            data[ind]['post']['payed'] = True
        return Response(data)
