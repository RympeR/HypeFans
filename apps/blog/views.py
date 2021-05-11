from django.http import request
from rest_framework import generics, permissions, renderers
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import *
from .serializers import *
from rest_framework.parsers import MultiPartParser, JSONParser, FormParser
from rest_framework.generics import GenericAPIView
from rest_framework.mixins import UpdateModelMixin


class AttachmentCreateAPI(generics.ListCreateAPIView):
    permission_classes = (permissions.IsAuthenticated, )
    queryset = Attachment.objects.all()
    parser_classes = (JSONParser, MultiPartParser, FormParser)
    serializer_class = AttachmentSerializer


class AttachmentAPI(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (permissions.IsAuthenticated, )
    queryset = Attachment.objects.all()
    parser_classes = (JSONParser, MultiPartParser, FormParser)
    serializer_class = AttachmentSerializer


class PostListCreateAPI(generics.ListCreateAPIView):
    permission_classes = (permissions.IsAuthenticated, )
    queryset = Post.objects.all()
    parser_classes = (JSONParser, MultiPartParser, FormParser)
    serializer_class = PostGetSerializer


class PostRetrieveAPI(generics.RetrieveAPIView):
    permission_classes = (permissions.IsAuthenticated, )
    queryset = Post.objects.all()
    parser_classes = (JSONParser, MultiPartParser, FormParser)
    serializer_class = PostGetSerializer


class PostCreateAPI(generics.CreateAPIView):
    permission_classes = (permissions.IsAuthenticated, )
    queryset = Post.objects.all()
    parser_classes = (JSONParser, MultiPartParser, FormParser)
    serializer_class = PostCreationSerializer


class PostAPI(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (permissions.IsAuthenticated, )
    queryset = Post.objects.all()
    parser_classes = (JSONParser, MultiPartParser, FormParser)
    serializer_class = PostCreationSerializer


class PostPartialUpdateAPI(GenericAPIView, UpdateModelMixin):
    queryset = Post.objects.all()
    serializer_class = PostCreationSerializer
    permission_classes = (permissions.IsAuthenticated, )


class PostActionListCreateAPI(generics.ListCreateAPIView):
    permission_classes = (permissions.IsAuthenticated, )
    queryset = PostAction.objects.all()
    parser_classes = (JSONParser, MultiPartParser, FormParser)
    serializer_class = PostActionGetSerializer


class PostActionRetrieveAPI(generics.RetrieveAPIView):
    permission_classes = (permissions.IsAuthenticated, )
    queryset = PostAction.objects.all()
    parser_classes = (JSONParser, MultiPartParser, FormParser)
    serializer_class = PostActionGetSerializer

    def get_object(self, request, pk):
        user = request.user
        post = Post.objects.get(pk=pk)

        return PostAction.objects.get(
            user=user,
            post=post
        )


class PostActionCreateAPI(generics.CreateAPIView):
    permission_classes = (permissions.IsAuthenticated, )
    queryset = PostAction.objects.all()
    parser_classes = (JSONParser, MultiPartParser, FormParser)
    serializer_class = PostActionCreationSerializer


class PostActionAPI(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (permissions.IsAuthenticated, )
    queryset = PostAction.objects.all()
    parser_classes = (JSONParser, MultiPartParser, FormParser)
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
    permission_classes = (permissions.IsAuthenticated, )

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
    permission_classes = (permissions.IsAuthenticated, )
    queryset = Post.objects.all()
    parser_classes = (JSONParser, MultiPartParser, FormParser)
    serializer_class = StoryGetSerializer


class StoryCreateAPI(generics.CreateAPIView):
    permission_classes = (permissions.IsAuthenticated, )
    queryset = Post.objects.all()
    parser_classes = (JSONParser, MultiPartParser, FormParser)
    serializer_class = StoryCreationSerializer


class StoryAPI(generics.RetrieveDestroyAPIView):
    permission_classes = (permissions.IsAuthenticated, )
    queryset = Post.objects.all()
    parser_classes = (JSONParser, MultiPartParser, FormParser)
    serializer_class = StoryGetSerializer


class WatchedStoriesListCreateAPI(generics.ListCreateAPIView):
    permission_classes = (permissions.IsAuthenticated, )
    queryset = WatchedStories.objects.all()
    parser_classes = (JSONParser, MultiPartParser, FormParser)
    serializer_class = WatchedStoriesGetSerializer


class WatchedStoriesRetrieveAPI(generics.RetrieveAPIView):
    permission_classes = (permissions.IsAuthenticated, )
    queryset = WatchedStories.objects.all()
    parser_classes = (JSONParser, MultiPartParser, FormParser)
    serializer_class = WatchedStoriesGetSerializer

    def get_object(self, request, pk):
        user = request.user
        target = Story.objects.get(pk=pk)

        return WatchedStories.objects.get(
            source=user,
            target=target
        )


class WatchedStoriesCreateAPI(generics.CreateAPIView):
    permission_classes = (permissions.IsAuthenticated, )
    queryset = WatchedStories.objects.all()
    parser_classes = (JSONParser, MultiPartParser, FormParser)
    serializer_class = WatchedStoriesCreationSerializer


class WatchedStoriesAPI(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (permissions.IsAuthenticated, )
    queryset = WatchedStories.objects.all()
    parser_classes = (JSONParser, MultiPartParser, FormParser)
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
    permission_classes = (permissions.IsAuthenticated, )

    def get_object(self, request, pk):
        user = request.user
        target = Story.objects.get(pk=pk)

        return WatchedStories.objects.get(
            source=user,
            target=target
        )

    def put(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)
