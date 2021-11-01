from django.urls import path
from .views import (
    RoomCreateAPI,
    RoomRetrieveAPI,
    RoomDestroyAPI,
    RoomUpdateAPI,
    MessageCreateAPI,
    MessageRetrieveAPI,
    InviteUserAPI,
    MessageDeleteAPI,
    MessageUpdateAPI,
    GetChatMessages,
    GetDialogs,
    GetUnreadedMessagesAmount,
    ChatPartialUpdateAPI,
    index,
    room
)

urlpatterns = [
    path('', index, name='index'),
    path('<str:room_name>/', room, name='room'),
    path('room-create/', RoomCreateAPI.as_view(), name=''),
    path('room-retrieve/<int:pk>', RoomRetrieveAPI.as_view(), name=''),
    path('room-update/<int:pk>', RoomUpdateAPI.as_view(), name=''),
    path('invite-user/<int:pk>', InviteUserAPI.as_view()),
    path('room-delete/<int:pk>', RoomDestroyAPI.as_view(), name=''),

    path('message-create/', MessageCreateAPI.as_view(), name=''),
    path('message-retrieve/<int:pk>', MessageRetrieveAPI.as_view(), name=''),
    path('message-update/<int:pk>', MessageUpdateAPI.as_view(), name=''),
    path('message-partial-update/<int:pk>', ChatPartialUpdateAPI.as_view(), name=''),
    path('message-delete/<int:pk>', MessageDeleteAPI.as_view(), name=''),

    path('get-chat-messages/', GetChatMessages.as_view(), name=''),
    path('get-user-dialogs/', GetDialogs.as_view(), name=''),
    path('get-unreaded-messages-amount/',
         GetUnreadedMessagesAmount.as_view(), name='get-unreaded-messages-amount'),
]
