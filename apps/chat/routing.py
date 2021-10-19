from django.urls import re_path

from . import consumers

websocket_urlpatterns = [
    re_path(r'wss/chat/(?P<room_name>\w+)/$',
            consumers.ChatConsumer.as_asgi()),
    re_path(r'wss/chat-readed/(?P<room_name>\w+)/(?P<user_id>\w+)/$',
            consumers.ReadedConsumer.as_asgi()),
    re_path(r'wss/last-message/(?P<room_name>\w+)/$',
            consumers.LastMessageConsumer.as_asgi()),
    re_path(r'wss/chat-rooms/(?P<user_id>\w+)/$',
            consumers.ChatRoomsConsumer.as_asgi()),
]
