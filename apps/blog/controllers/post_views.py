import logging
from random import sample

from apps.blog.models import *
from apps.blog.serializers import *
from apps.users.models import User
from apps.users.serializers import UserShortRetrieveSeriliazer
from core.utils.default_responses import api_block_by_policy_451
from rest_framework import generics
from rest_framework.generics import GenericAPIView
from rest_framework.mixins import UpdateModelMixin
from rest_framework.response import Response
from rest_framework.views import APIView
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
        limit = int(request.GET.get('limit', 20))
        offset = int(request.GET.get('offset', 0))
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


class MainUserPageUpdated(APIView):

    @silk_profile(name='Check post bought')
    def main_check_post_bought(self, post: Post, user: User):
        if post.show_in_recomendations and user.new_user and post.validated:
            return True
        if post.access_level == 1:
            if post.price_to_watch == 0:
                return True
            else:
                return check_post_bought(
                    post, user)
        return sub_checker(post.user, user)

    @silk_profile(name='Check postAction ')
    def check_postaction(self, post, user):
        qs = PostAction.objects.filter(
            user=user, post=post, like=True, parent__isnull=True)
        logging.warning(f'QS post action {qs} post - {post.pk}')
        return (True if qs.exists() else False, qs.values_list('id', flat=True)[0] if qs.exists() else False)

    @silk_profile(name='Check favourite ')
    def check_favourites(self, post, user):
        return True if user.pk in post.favourites.all().values_list('id', flat=True) else False

    @silk_profile(name='get_sample_of_queryset')
    def get_sample_of_queryset(self, valid_id_list, amount: int, model: models.Model):
        random_id_list = sample(
            list(valid_id_list), min(len(valid_id_list), amount))
        return model.objects.filter(id__in=random_id_list)

    @silk_profile(name='View Updated Main Page')
    def get(self, request):
        req_user = request.user
        limit = int(request.GET.get('limit', 30))
        offset = int(request.GET.get('offset', 0))

        qs = User.objects.filter(hide_in_search=False).order_by(
            '-fans_amount').values_list('id', flat=True)
        reccomendations = UserShortRetrieveSeriliazer(
            instance=self.get_sample_of_queryset(qs, 9, User)
            .order_by('-fans_amount').order_by('-post_amount'),
            many=True,
            context={'request': request}
        ).data

        qs = req_user.source_user_subscribe.filter(
            finished=False).values_list('target__id', flat=True)
        subscription_recommendations = UserShortRetrieveSeriliazer(
            instance=self.get_sample_of_queryset(qs, 9, User)
            .order_by('-fans_amount').order_by('-post_amount'),
            many=True,
            context={'request': request}
        ).data

        user_subscriptions = req_user.my_subscribes.all()
        posts = []
        for user in user_subscriptions:
            posts.extend(user.user_post.filter(archived=False))
        posts = sorted(posts, key=lambda x: x.publication_date)
        qs = Post.objects.filter(
            show_in_recomendations=True, validated=True).exclude(
            id__in=tuple(map(lambda x: x.id, posts))
        ).values_list('id', flat=True)
        qs = self.get_sample_of_queryset(qs, 9, Post)
        posts.extend(qs)
        posts = posts[offset:offset+limit]
        result_posts = [
            {
                'user': UserShortRetrieveSeriliazer(
                    instance=post.user, context={'request': request}).data,
                'post': {
                    **PostMainPageSerializers(
                        instance=post,
                        context={'request': request, 'user': req_user}
                    ).data,

                }
            } for post in posts
        ]
        for post, qs_post in zip(result_posts, posts):
            post['post']['payed'] = self.main_check_post_bought(
                qs_post, req_user)
            post['post']['liked'], post['post']['like_id'] = self.check_postaction(
                qs_post, req_user)
            post['post']['favourite'] = self.check_favourites(
                qs_post, req_user)

        return Response({
            'recommendations': reccomendations,
            'subscription_recommendations': subscription_recommendations,
            'posts': result_posts
        })
