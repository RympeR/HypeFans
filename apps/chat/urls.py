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
    path('room-retrieve/<int:pk>', RoomRetrieveAPI.as_view(),name=''),
    path('room-update/<int:pk>', RoomAPI.as_view(),name=''),
    path('room-delete/<int:pk>', RoomAPI.as_view(),name=''),
    path('message-create/', MessageCreateAPI.as_view(),name=''),
    path('message-retrieve/<int:pk>', MessageRetrieveAPI.as_view(),name=''),
    path('message-update/<int:pk>', MessageAPI.as_view(),name=''),
    path('message-delete/<int:pk>', MessageAPI.as_view(),name=''),
    path('user-message-status-create/', UserMessageCreateAPI.as_view(),name=''),
    path('user-message-status-retrieve/<int:pk>', UserMessageRetrieveAPI.as_view(),name=''),
    path('user-message-status-update/<int:pk>', UserMessageAPI.as_view(),name=''),
    path('user-message-status-delete/<int:pk>', UserMessageAPI.as_view(),name=''),
    path('user-message-status-partial-update/<int:pk>', UserMessagePartialUpdateView.as_view(),name=''),
    path('get-chat-messages/', GetChatMessages.as_view(),name=''),
    path('get-user-dialogs/', GetDialogs.as_view(),name=''),
]
