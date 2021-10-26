from django.urls import re_path

from . import consumers

websocket_urlpatterns = [
    re_path(r'ws/chat/(?P<room_name>\w+)/$',
            consumers.ChatConsumer.as_asgi()),
    re_path(r'ws/chat-readed/(?P<room_name>)/(?P<user_id>)/$',
            consumers.ReadedConsumer.as_asgi()),
    re_path(r'ws/last-message/(?P<room_name>\w+)/$',
            consumers.LastMessageConsumer.as_asgi()),
    re_path(r'ws/chat-rooms/(?P<user_id>\w+)/$',
            consumers.ChatRoomsConsumer.as_asgi()),
]
