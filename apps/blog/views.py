from django.http import request
from rest_framework import generics, permissions, renderers
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import *
from .serializers import *
from apps.users.serializers import UserShortRetrieveSeriliazer
from rest_framework.parsers import MultiPartParser, JSONParser, FormParser
from rest_framework.generics import GenericAPIView
from rest_framework.mixins import UpdateModelMixin
from datetime import timedelta, datetime


class AttachmentCreateAPI(generics.ListCreateAPIView):
    queryset = Attachment.objects.all()
    serializer_class = AttachmentSerializer


class AttachmentAPI(generics.RetrieveUpdateDestroyAPIView):
    queryset = Attachment.objects.all()
    serializer_class = AttachmentSerializer


class PostListCreateAPI(generics.ListCreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostGetSerializer


class PostRetrieveAPI(generics.RetrieveAPIView):
    queryset = Post.objects.all()
    serializer_class = PostGetSerializer


class PostCreateAPI(generics.CreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostCreationSerializer


class PostAPI(generics.RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostCreationSerializer


class PostPartialUpdateAPI(GenericAPIView, UpdateModelMixin):
    queryset = Post.objects.all()
    serializer_class = PostCreationSerializer


class PostActionListCreateAPI(generics.ListCreateAPIView):
    queryset = PostAction.objects.all()
    serializer_class = PostActionGetSerializer


class PostActionRetrieveAPI(generics.RetrieveAPIView):
    queryset = PostAction.objects.all()
    serializer_class = PostActionGetSerializer

    def get_object(self, request, pk):
        user = request.user
        post = Post.objects.get(pk=pk)

        return PostAction.objects.get(
            user=user,
            post=post
        )


class PostActionCreateAPI(generics.CreateAPIView):
    queryset = PostAction.objects.all()
    serializer_class = PostActionCreationSerializer


class PostActionAPI(generics.RetrieveUpdateDestroyAPIView):
    queryset = PostAction.objects.all()
    serializer_class = PostActionCreationSerializer

    def get_object(self, request, pk):
        user = request.user
        post = Post.objects.get(pk=pk)

        return PostAction.objects.get(
            user=user,
            post=post
        )


class PostActionPartialUpdateAPI(GenericAPIView, UpdateModelMixin):
    queryset = PostAction.objects.all()
    serializer_class = PostActionCreationSerializer

    def put(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)

    def get_object(self, request, pk):
        user = request.user
        post = Post.objects.get(pk=pk)

        return PostAction.objects.get(
            user=user,
            post=post
        )


class StoryListCreateAPI(generics.ListCreateAPIView):
    queryset = Post.objects.all()
    serializer_class = StoryGetSerializer


class StoryCreateAPI(generics.CreateAPIView):
    queryset = Post.objects.all()
    serializer_class = StoryCreationSerializer


class StoryAPI(generics.RetrieveDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = StoryGetSerializer


class WatchedStoriesListCreateAPI(generics.ListCreateAPIView):
    queryset = WatchedStories.objects.all()
    serializer_class = WatchedStoriesGetSerializer


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


class WatchedStoriesAPI(generics.RetrieveUpdateDestroyAPIView):
    queryset = WatchedStories.objects.all()
    serializer_class = WatchedStoriesCreationSerializer

    def get_object(self, request, pk):
        user = request.user
        target = Story.objects.get(pk=pk)

        return WatchedStories.objects.get(
            source=user,
            target=target
        )


class WatchedStoriesPartialUpdateAPI(GenericAPIView, UpdateModelMixin):
    queryset = WatchedStories.objects.all()
    serializer_class = WatchedStoriesCreationSerializer

    def get_object(self, request, pk):
        user = request.user
        target = Story.objects.get(pk=pk)

        return WatchedStories.objects.get(
            source=user,
            target=target
        )

    def put(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)


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

    def get(self, request):
        user = request.user
        datetime = request.GET.get('datetime', 0)
        limit = request.GET.get('limit', 50)
        offset = request.GET.get('offset', 0)
        results = []
        if datetime == 0:
            for user_sub in user.my_subscribes.all():
                for post in user_sub.user_action_post.all().order_by['-datetime']:
                    user_data = UserShortRetrieveSeriliazer(
                        instance=user_sub).data
                    post_data = PostGetShortSerializers(instance=post).data
                    res_dict = {}
                    res_dict['user'] = user_data
                    res_dict['post'] = post_data
                    results.append(res_dict)
                    return Response(
                        sorted(results[offset:limit+offset],
                               key=lambda post: post['post']['datetime'])[::-1]
                    )
        for user_sub in user.my_subscribes.all():
            for post in user_sub.user_action_post.filter(datetime__lte=datetime):
                user_data = UserShortRetrieveSeriliazer(
                    instance=user_sub).data
                post_data = PostGetShortSerializers(instance=post).data
                res_dict = {}
                res_dict['user'] = user_data
                res_dict['post'] = post_data
                results.append(res_dict)
        return Response(
            sorted(results[offset:limit+offset],
                   key=lambda post: post['post']['datetime'])[::-1]
        )


class SubStories(GenericAPIView):

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
