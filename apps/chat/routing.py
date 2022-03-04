from django.urls import re_path

from . import consumers

websocket_urlpatterns = [
    re_path(r'ws/api/chat/(?P<room_name>\w+)/$',
            consumers.ChatConsumer.as_asgi()),
    re_path(r'ws/api/chat-readed/(?P<room_name>)/$',
            consumers.ReadedConsumer.as_asgi()),
    re_path(r'ws/api/last-message/(?P<room_name>\w+)/$',
            consumers.LastMessageConsumer.as_asgi()),
    re_path(r'ws/api/chat-rooms/(?P<user_id>\w+)/$',
            consumers.ChatRoomsConsumer.as_asgi()),
]
