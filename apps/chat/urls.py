from django.urls import path
from .views import (
    RoomListCreateAPI,
    RoomCreateAPI,
    RoomRetrieveAPI,
    RoomAPI,
    
    MessageCreateAPI,
    MessageRetrieveAPI,
    MessageAPI,
    UserMessageCreateAPI,
    UserMessageRetrieveAPI,
    UserMessageAPI,
    UserMessagePartialUpdateView,
    GetChatMessages,
    GetDialogs,
)

urlpatterns = [
    path('room-list-get/', RoomListCreateAPI.as_view(),name=''),
    path('room-create/', RoomCreateAPI.as_view(),name=''),
    path('room-retrieve/', RoomRetrieveAPI.as_view(),name=''),
    path('room-update/', RoomAPI.as_view(),name=''),
    path('room-delete/', RoomAPI.as_view(),name=''),
    path('message-create/', MessageCreateAPI.as_view(),name=''),
    path('message-retrieve/', MessageRetrieveAPI.as_view(),name=''),
    path('message-update/', MessageAPI.as_view(),name=''),
    path('message-delete/', MessageAPI.as_view(),name=''),
    path('user-message-status-create/', UserMessageCreateAPI.as_view(),name=''),
    path('user-message-status-retrieve/', UserMessageRetrieveAPI.as_view(),name=''),
    path('user-message-status-update/', UserMessageAPI.as_view(),name=''),
    path('user-message-status-delete/', UserMessageAPI.as_view(),name=''),
    path('user-message-status-partial-update/', UserMessagePartialUpdateView.as_view(),name=''),
    path('get-chat-messages/', GetChatMessages.as_view(),name=''),
    path('get-user-dialogs/', GetDialogs.as_view(),name=''),
]