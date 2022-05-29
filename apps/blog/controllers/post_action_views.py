
from apps.blog.models import *
from apps.blog.serializers import *
from core.utils.default_responses import api_block_by_policy_451
from rest_framework import generics
from rest_framework.generics import GenericAPIView
from rest_framework.mixins import RetrieveModelMixin, UpdateModelMixin
from rest_framework.response import Response


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
