from rest_framework import generics
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from apps.users.serializers import (UserShortRetrieveSeriliazer)

from apps.blog.models import *
from apps.blog.serializers import *


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
