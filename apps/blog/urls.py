from django.urls import path
from .views import (
    AttachmentCreateAPI,
    AttachmentManyCreateAPI,
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
    UserNotifications,
    GetFavouritePosts,
    MarkFavourite,
    GetUserLists,
    PostActionPartialUpdateAPI,
    MainUserPageUpdated,
)

urlpatterns = [
    path('get-post-list/<str:username>', PostListAPI.as_view()),
    path('get-post/<int:pk>', PostRetrieveAPI.as_view()),
    path('get-post-action-list/<int:pk>', PostActionListAPI.as_view()),
    path('delete-post/<int:pk>', PostDeleteAPI.as_view()),
    path('partial-update-post/<int:pk>', PostPartialUpdateAPI.as_view()),
    path('create-post/', PostCreateAPI.as_view()),
    path('create-attachment/', AttachmentCreateAPI.as_view()),
    path('create-many-attachments/', AttachmentManyCreateAPI.as_view()),
    path('create-story/', StoryCreateAPI.as_view()),
    path('mark-favourite/', MarkFavourite.as_view()),
    path('get-favourite-posts/', GetFavouritePosts.as_view()),
    path('partial-update-post-action/<int:pk>', PostActionPartialUpdateAPI.as_view()),
    path('create-post-action/', PostActionCreateAPI.as_view()),
    path('delete-post-action/<int:pk>', PostActionDeleteAPI.as_view()),
    path('delete-story/<int:pk>', StoryAPI.as_view()),
    path('create-story-action/', WatchedStoriesCreateAPI.as_view()),
    path('create-post-bought/', PostBoughtCreateAPI.as_view()),
    path('get-main-page/', MainUserPage.as_view()),
    path('get-main-page-updated/', MainUserPageUpdated.as_view()),
    path('get-user-stories/', SubStories.as_view()),
    path('get-notifications/', UserNotifications.as_view()),
    path('get-users-lists/', GetUserLists.as_view()),
]
