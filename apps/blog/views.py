import logging
from datetime import datetime, timedelta
from random import sample

from core.utils.default_responses import api_block_by_policy_451
from rest_framework import generics, permissions
from rest_framework.generics import GenericAPIView
from rest_framework.views import APIView
from rest_framework.mixins import RetrieveModelMixin, UpdateModelMixin
from rest_framework.response import Response

from apps.users.models import User
from apps.users.serializers import UserShortRetrieveSeriliazer

from .models import *
from .serializers import *

from silk.profiling.profiler import silk_profile


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
        self.perform_create(serializer)
        return Response(serializer.data)

    def get_serializer_context(self):
        return {'request': self.request}


class PostListAPI(generics.GenericAPIView):
    serializer_class = PostGetShortSerializers
    queryset = Post.objects.all()

    def get(self, request, username):
        limit = request.query_params.get('limit', 20)
        offset = request.query_params.get('offset', 0)
        page_user = User.objects.get(username=username)
        user = request.user
        qs = Post.objects.filter(
            user=page_user
        )[offset:offset+limit]
        data = [{'post': self.get_serializer(
            instance=post, context={'request': request}
        ).data} for post in qs]

        for ind, post in enumerate(qs):
            data[ind]['user'] = UserShortRetrieveSeriliazer(
                instance=page_user, context={'request': request}).data
            data[ind]['post'] = self.get_serializer(
                instance=post, context={'request': request}).data
            data = payed_posts_update(data, ind, post, user)
            post_action_qs = PostAction.objects.filter(
                post=post, user=user)
            data = like_posts_update(data, ind, post_action_qs)
            data = favourite_posts_update(data, user, ind, post)

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

    def put(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)


class PostActionPartialUpdateAPI(GenericAPIView, UpdateModelMixin, RetrieveModelMixin):
    queryset = PostAction.objects.all()
    serializer_class = PostActionUpdateSerializer

    def get_serializer_context(self):
        return {'request': self.request}

    def put(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)


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
        self.perform_create(serializer)
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
    serializer_class = UserShortRetrieveSeriliazer

    def get(self, request):
        limit = int(request.GET.get('limit', 50))
        offset = int(request.GET.get('offset', 0))
        user = request.user
        comments_result = []
        likes_result = []
        donations_result = []
        subscriptions_result = []
        for comment in PostAction.objects.filter(
            comment__isnull=False,
            post__user=user
        ).order_by('-date_time').distinct():
            if comment.user != user:
                res_dict = {
                    'user': self.serializer_class(
                        instance=comment.user, context={'request': request}).data,
                    'post': CommentRetrieveSerializer(
                        instance=comment, context={'request': request}).data,
                    'type': 'comment'
                }
                comments_result.append(res_dict)
        for like in PostAction.objects.filter(post__user=user, like=True).distinct():
            if like.user != user:
                res_dict = {
                    'user': self.serializer_class(
                        instance=like.user, context={'request': request}).data,
                    'post': LikeRetrieveSerializer(
                        instance=like, context={'request': request}).data,
                    'type': 'like'
                }
                likes_result.append(res_dict)
        for donation in user.recieved_user.all().order_by('-datetime').distinct():
            if user != donation.sender:
                res_dict = {
                    'user': self.serializer_class(
                        instance=donation.sender, context={'request': request}).data,
                    'donation': {
                        'amount': donation.amount,
                        'date_time': donation.datetime.timestamp() if donation.datetime else None
                    },
                    'type': 'donation'
                }
                donations_result.append(res_dict)

        for subscription in user.target_user_subscribe.all().order_by('-start_date').distinct():
            if user != subscription.source:
                res_dict = {}
                res_dict['user'] = self.serializer_class(
                    instance=subscription.source, context={'request': request}).data
                res_dict['subscription'] = {
                    'amount': user.subscribtion_price,
                    'start_date': subscription.start_date.timestamp() if subscription.start_date else None,
                    'end_date': subscription.end_date.timestamp() if subscription.end_date else None
                }
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

    @silk_profile(name='View Main Page')
    def get(self, request):
        user = request.user
        data_compare = request.GET.get('datetime', 0)
        limit = request.GET.get('limit', 50)
        offset = request.GET.get('offset', 0)
        results = {
            'recommendations': 0,
            'posts': []
        }
        valid_profiles_id_list = User.objects.all().order_by(
            '-fans_amount').values_list('id', flat=True)
        random_users_id_list = sample(
            list(valid_profiles_id_list), min(len(valid_profiles_id_list), 9))
        qs = User.objects.filter(id__in=random_users_id_list)
        results['recommendations'] = UserShortRetrieveSeriliazer(instance=qs, many=True, context={
            'request': request}).data

        if data_compare == 0:
            for user_sub in user.my_subscribes.all():
                for post in user_sub.user_post.filter(archived=False):
                    res_dict = {
                        'user': UserShortRetrieveSeriliazer(
                            instance=user_sub, context={'request': request}).data,
                        'post': PostGetShortSerializers(
                            instance=post, context={'request': request}).data
                    }
                    if post.access_level == 1:
                        if post.price_to_watch == 0:
                            res_dict['post']['payed'] = True
                        else:
                            res_dict['post']['payed'] = check_post_bought(
                                post, user)
                    else:
                        res_dict['post']['payed'] = sub_checker(
                            post.user, user)
                    post_action_qs = PostAction.objects.filter(
                        post=post, user=user)
                    if post_action_qs.exists():
                        for action in post_action_qs:
                            if action.like and not action.parent:
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

            valid_posts_id_list = Post.objects.filter(
                show_in_recomendations=True, validated=True).values_list('id', flat=True)
            random_posts_id_list = sample(
                list(valid_posts_id_list), min(len(valid_posts_id_list), 9))
            logging.warning(random_posts_id_list)
            qs = Post.objects.filter(id__in=random_posts_id_list)
            results['posts'] = results['posts'][offset:limit+offset] + [
                {
                    'user': UserShortRetrieveSeriliazer(
                        instance=post.user, context={'request': request}).data,
                    'post': PostGetShortSerializers(
                        instance=post, context={'request': request}).data
                } for post in qs
            ]
            return Response(results)
        for user_sub in user.my_subscribes.all():
            for post in user_sub.user_post.filter(archived=False, publication_date__lte=data_compare):
                res_dict = {
                    'user': UserShortRetrieveSeriliazer(
                        instance=user_sub, context={'request': request}).data,
                    'post': PostGetShortSerializers(
                        instance=post, context={'request': request}).data
                }
                results['posts'].append(res_dict)
            valid_posts_id_list = Post.objects.filter(
                show_in_recomendations=True, validated=True).values_list('id', flat=True)
            random_posts_id_list = sample(
                list(valid_profiles_id_list), min(len(valid_posts_id_list), 9))
            qs = Post.objects.filter(id__in=random_posts_id_list)

            for post in qs:
                res_dict = {
                    'user': UserShortRetrieveSeriliazer(
                        instance=post.user, context={'request': request}).data,
                    'post': PostGetShortSerializers(
                        instance=post, context={'request': request}).data
                }
                results['posts'].append(res_dict)
        return Response(
            {
                'recommendations': results['recommendations'],
                'posts': results['posts'][offset:limit+offset],
            }
        )

    def get_serializer_context(self):
        return {'request': self.request}


class SubStories(GenericAPIView):
    queryset = Story.objects.all()
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
            qs = user_sub.user_story.filter(archived=False)
            if qs.exists():
                for story in qs:
                    story_data = StoryShortSerializer(instance=story)
                    watched = WatchedStories.objects.filter(
                        source=story,
                        target=user
                    )
                    res_dict['watched'] = watched.exists()
                    res_dict['stories'].append(story_data)
                results.append(res_dict)
        print(results[offset:limit+offset])
        return Response(
            sorted(results[offset:limit+offset],
                   key=lambda story: story['stories']['date_time'])[::-1]
        )


class MarkFavourite(generics.GenericAPIView):
    permission_classes = (permissions.IsAuthenticated, )
    serializer_class = UserFavouritesSerializer
    queryset = User.objects.all()

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
        limit = int(request.GET.get('limit', 20))
        offset = 0  # int(request.GET.get('offset', 0))
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
            data = payed_posts_update(data, ind, post, user)
            post_action_qs = PostAction.objects.filter(
                post=post, user=user)
            data = like_posts_update(data, ind,  post_action_qs)
            data = favourite_posts_update(data, user, ind, post)

        for ind, post in enumerate(qs):
            user_data = UserShortRetrieveSeriliazer(
                instance=post.user, context={'request': request}).data
            data[ind]['user'] = user_data
            data[ind]['post']['payed'] = True
        return Response(data)


class GetUserLists(GenericAPIView):

    serializer_class = UserShortRetrieveSeriliazer
    queryset = User.objects.all()

    def get(self, request):
        user = request.user
        friends = []

        now = datetime.now()
        result = {}

        subs = user.target_user_subscribe.filter(start_date__gte=(
            now - timedelta(days=30))).order_by('-start_date')
        for sub in user.source_user_subscribe.filter(end_date__gte=now):
            temp_subs = sub.target.target_user_subscribe.filter(
                end_date__gte=now)
            if user in list(map(lambda x: x.source, temp_subs)):
                friends.append(sub.target)

        # result['last_subs_amount'] = len(subs)
        subs = list(map(lambda x: x.source, subs[:3]))

        result['last_subs'] = self.serializer_class(
            many=True, instance=subs).data

        result['friends'] = self.serializer_class(
            many=True, instance=friends[:10]).data
        favourite_post = user.user_favourites.all()
        favourite_post_users = list(set(map(lambda x: x.user, favourite_post)))
        result['favourites'] = self.serializer_class(
            many=True, instance=favourite_post_users[:10]).data

        last_donators = user.recieved_user.filter(
            datetime__date__month=now.month)
        last_donators = list(set(map(lambda x: x.sender, last_donators)))
        result['last_donators'] = self.serializer_class(
            many=True, instance=last_donators[:10]).data
        blocked_users = user.blocked_users.all()
        result['blocked_users'] = self.serializer_class(
            many=True, instance=blocked_users).data
        my_subs = user.source_user_subscribe.filter(finished=False)
        my_subs = list(set(map(lambda x: x.target, my_subs)))
        result['my_subs'] = self.serializer_class(
            many=True, instance=my_subs).data
        return Response(result)


class MainUserPageUpdated(APIView):

    @silk_profile(name='Check post bought')
    def check_post_bought(self, post: Post, user: User):
        if post.show_in_recomendations and user.new_user and post.validated:
            return True
        if post.access_level == 1:
            if post.price_to_watch == 0:
                return True
            else:
                return check_post_bought(
                    post, user)
        else:
            return sub_checker(post.user, user)

    @silk_profile(name='Check postAction ')
    def check_postaction(self, post, user):
        qs = PostAction.objects.filter(
            user=user,
            post=post,
            like=True,
            parent__isnull=True
        ).values_list('id', flat=True)
        return (True, qs[0].pk if qs else False)

    @silk_profile(name='Check favourite ')
    def check_favourites(self, post, user):
        return True if user.pk in post.favourites.all().values_list('id', flat=True) else False

    @silk_profile(name='get_sample_of_queryset')
    def get_sample_of_queryset(self, valid_id_list, amount: int, model):
        random_id_list = sample(
            list(valid_id_list), min(len(valid_id_list), amount))
        return model.objects.filter(id__in=random_id_list)

    @silk_profile(name='View Updated Main Page')
    def get(self, request):
        user = request.user
        data_compare = request.GET.get('datetime', 0)
        limit = request.GET.get('limit', 30)

        qs = User.objects.all().order_by('-fans_amount').values_list('id', flat=True)
        reccomendations = UserShortRetrieveSeriliazer(
            instance=self.get_sample_of_queryset(qs, 9, User),
            many=True,
            context={'request': request}
        ).data

        user_subscriptions = user.my_subscribes.all()
        posts = []
        if data_compare == 0:
            for user in user_subscriptions:
                posts.extend(user.user_post.filter(archived=False))
            posts = sorted(posts, key=lambda x: x.publication_date)
        else:
            for user in user_subscriptions:
                posts.extend(user.user_post.filter(
                    archived=False,
                    ublication_date__lte=data_compare))
            posts = sorted(posts, key=lambda x: x.publication_date)
        qs = Post.objects.filter(
            show_in_recomendations=True, validated=True).exclude(
            id__in=tuple(map(lambda x: x.id, posts))
        ).values_list('id', flat=True)
        qs = self.get_sample_of_queryset(qs, 9, Post)
        posts.extend(qs)
        posts = posts[:limit]
        result_posts = [
            {
                'user': UserShortRetrieveSeriliazer(
                    instance=post.user, context={'request': request}).data,
                'post': {
                    **PostMainPageSerializers(
                        instance=post,
                        context={'request': request, 'user': user}
                    ).data,

                }
            } for post in posts
        ]
        for post, qs_post in zip(result_posts, posts):
            post['payed'] = self.check_post_bought(qs_post, user)
            post['like'], post['like_id'] = self.check_postaction(
                qs_post, user)
            post['favourite'] = self.check_favourites(qs_post, user)

        return Response({
            'reccomendations': reccomendations,
            'posts': result_posts
        })
