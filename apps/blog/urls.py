from django.urls import path
from .views import (
    AttachmentCreateAPI,
    PostListAPI,
    PostRetrieveAPI,
    PostCreateAPI,
    PostDeleteAPI,
    PostPartialUpdateAPI,
    PostActionListAPI,
    PostActionDeleteAPI,
    PostActionCreateAPI,
    StoryCreateAPI,
    StoryAPI,
    PostBoughtCreateAPI,
    WatchedStoriesCreateAPI,
    MainUserPage,
    SubStories,
    UserNotifications
)

urlpatterns = [
    path('get-post-list/<str:username>', PostListAPI.as_view()),
    path('get-post/<int:pk>', PostRetrieveAPI.as_view()),
    path('get-post-action-list/<int:pk>', PostActionListAPI.as_view()),
    path('delete-post/<int:pk>', PostDeleteAPI.as_view()),
    path('partial-update-post/<int:pk>', PostPartialUpdateAPI.as_view()),
    path('create-post/', PostCreateAPI.as_view()),
    path('create-attachment/', AttachmentCreateAPI.as_view()),
    path('create-story/', StoryCreateAPI.as_view()),
    path('create-post-action/', PostActionCreateAPI.as_view()),
    path('delete-post-action/<int:pk>', PostActionDeleteAPI.as_view()),
    path('delete-story/<int:pk>', StoryAPI.as_view()),
    path('create-story-action/', WatchedStoriesCreateAPI.as_view()),
    path('create-post-bought/', PostBoughtCreateAPI.as_view()),
    path('get-main-page/', MainUserPage.as_view()),
    path('get-user-stories/', SubStories.as_view()),
    path('get-notifications/', UserNotifications.as_view()),
]
