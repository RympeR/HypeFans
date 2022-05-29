from datetime import datetime

from apps.blog.models import *
from apps.blog.serializers import *
from apps.users.models import User
from apps.users.serializers import UserShortRetrieveSeriliazer
from rest_framework import generics, permissions
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response


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
        offset = int(request.GET.get('offset', 0))
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

        subs = user.target_user_subscribe.filter(
            finished=False).order_by('-start_date')
        for sub in user.source_user_subscribe.filter(finished=False):
            temp_subs = sub.target.target_user_subscribe.filter(finished=False)
            if user in list(map(lambda x: x.source, temp_subs)):
                friends.append(sub.target)

        subs = list(map(lambda x: x.source, subs))

        result['last_subs'] = len(subs)

        result['friends'] = len(friends)
        favourite_post = user.user_favourites.all()
        favourite_post_users = list(set(map(lambda x: x.user, favourite_post)))
        result['favourites'] = len(favourite_post_users)
        last_donators = user.recieved_user.filter(
            datetime__date__month=now.month)
        last_donators = list(set(map(lambda x: x.sender, last_donators)))
        result['last_donators'] = len(last_donators)
        blocked_users = user.blocked_users.all()
        result['blocked_users'] = len(blocked_users)
        my_subs = user.source_user_subscribe.filter(finished=False)
        my_subs = list(set(map(lambda x: x.target, my_subs)))
        result['my_subs'] = len(my_subs)
        return Response(result)


class GetUserLastSubs(GenericAPIView):
    serializer_class = UserShortRetrieveSeriliazer
    queryset = User.objects.all()

    def get(self, request):
        limit = int(request.GET.get('limit', 20))
        offset = int(request.GET.get('offset', 0))
        user = request.user
        subs = user.target_user_subscribe.filter(
            finished=False).order_by('-start_date')

        subs = list(map(lambda x: x.source, subs))
        return Response(self.serializer_class(
            many=True, instance=subs[offset:limit+offset]).data)


class GetUserSubscriptions(GenericAPIView):
    serializer_class = UserShortRetrieveSeriliazer
    queryset = User.objects.all()

    def get(self, request):
        limit = int(request.GET.get('limit', 20))
        offset = int(request.GET.get('offset', 0))
        user = request.user
        subs = user.source_user_subscribe.filter(finished=False)
        subs = list(set(map(lambda x: x.target, subs)))
        return Response(self.serializer_class(
            many=True, instance=subs[offset:limit+offset]).data)


class GetUserFriends(GenericAPIView):
    serializer_class = UserShortRetrieveSeriliazer
    queryset = User.objects.all()

    def get(self, request):
        limit = int(request.GET.get('limit', 20))
        offset = int(request.GET.get('offset', 0))
        user = request.user
        friends = []
        subs = user.target_user_subscribe.filter(
            finished=False).order_by('-start_date')
        for sub in user.source_user_subscribe.filter(finished=False):
            temp_subs = sub.target.target_user_subscribe.filter(finished=False)
            if user in list(map(lambda x: x.source, temp_subs)):
                friends.append(sub.target)
        subs = list(set(map(lambda x: x.source, subs)))
        return Response(self.serializer_class(
            many=True, instance=subs[offset:limit+offset]).data)


class GetUserFavourites(GenericAPIView):
    serializer_class = UserShortRetrieveSeriliazer
    queryset = User.objects.all()

    def get(self, request):
        limit = int(request.GET.get('limit', 20))
        offset = int(request.GET.get('offset', 0))
        user = request.user
        favourite_post = user.user_favourites.all()
        favourite_post_users = list(set(map(lambda x: x.user, favourite_post)))
        return Response(self.serializer_class(
            many=True, instance=favourite_post_users[offset:limit+offset]).data)


class GetUserDonators(GenericAPIView):
    serializer_class = UserShortRetrieveSeriliazer
    queryset = User.objects.all()

    def get(self, request):
        limit = int(request.GET.get('limit', 20))
        offset = int(request.GET.get('offset', 0))
        user = request.user
        donators = user.recieved_user.filter(
            datetime__date__month=datetime.now().month)
        donators = list(set(map(lambda x: x.sender, donators)))
        return Response(self.serializer_class(
            many=True, instance=donators[offset:limit+offset]).data)


class GetUserBlocked(GenericAPIView):
    serializer_class = UserShortRetrieveSeriliazer
    queryset = User.objects.all()

    def get(self, request):
        limit = int(request.GET.get('limit', 20))
        offset = int(request.GET.get('offset', 0))
        user = request.user
        blocked_users = user.blocked_users.all()
        return Response(self.serializer_class(
            many=True, instance=blocked_users[offset:limit+offset]).data)
