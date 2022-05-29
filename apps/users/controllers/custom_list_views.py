from apps.users.serializers import *
from rest_framework.generics import GenericAPIView
from rest_framework.mixins import UpdateModelMixin
from rest_framework import generics
from rest_framework.response import Response


class CustomUsersListInviteAPI(GenericAPIView, UpdateModelMixin):
    queryset = CustomUsersList.objects.all()
    serializer_class = CustomUsersListGetSerializer

    def put(self, request, *args, **kwargs):
        if request.user == self.get_object().creator:
            for username in request.data.get('username'):
                if request.data.get('add'):
                    self.get_object().invited.add(
                        User.objects.get(username=username)
                    )
                else:
                    self.get_object().invited.remove(
                        User.objects.get(username=username)
                    )
            self.get_object().save()
        return self.partial_update(request, *args, **kwargs)


class CustomUsersListCreateAPI(generics.CreateAPIView):
    queryset = CustomUsersList.objects.all()
    serializer_class = CustomUsersListCreateSerializer

    def get_serializer_context(self):
        return {'request': self.request}


class ChatSenderCreateAPI(generics.CreateAPIView):
    queryset = ChatSender.objects.all()
    serializer_class = CustomUsersListCreateSerializer

    def get_serializer_context(self):
        return {'request': self.request}


class CustomUsersListRemoveAPI(generics.DestroyAPIView):
    queryset = CustomUsersList.objects.all()
    serializer_class = CustomUsersListCreateSerializer

    def get_serializer_context(self):
        return {'request': self.request}


class RetrieveUserCustomLists(GenericAPIView):
    queryset = CustomUsersList.objects.all()
    serializer_class = CustomUsersListGetPreviewSerializer

    def get(self, request, *args, **kwargs):
        user = request.user
        queryset = CustomUsersList.objects.filter(creator=user)
        serializer = self.serializer_class(
            queryset,
            context={'request': request},
            many=True
        )
        return Response(serializer.data)


class RetrieveUserCustomListUsers(GenericAPIView):
    queryset = CustomUsersList.objects.all()
    serializer_class = CustomUsersListGetSerializer

    def get(self, request, *args, **kwargs):
        limit = request.query_params.get('limit', 20)
        offset = request.query_params.get('offset', 0)
        name = request.query_params.get('name', '')
        user = request.user
        queryset = CustomUsersList.objects.filter(creator=user, name=name)
        serializer = self.serializer_class(
            queryset[offset:offset + limit],
            context={'request': request},
            many=True
        )
        return Response(serializer.data)


class RetrieveUsersAvailableToAddToLists(GenericAPIView):
    queryset = User.objects.all()
    serializer_class = UserShortRetrieveSeriliazer

    def get(self, request, *args, **kwargs):
        limit = request.query_params.get('limit', 20)
        offset = request.query_params.get('offset', 0)
        user = request.user
        subscriptions = Subscription.objects.filter(
            target=user,
            finished=False
        )
        user_list = []
        for sub in subscriptions:
            user_list.append(sub.source)
        serializer = self.serializer_class(
            user_list[offset:offset + limit],
            context={'request': request},
            many=True
        )
        return Response(serializer.data)
