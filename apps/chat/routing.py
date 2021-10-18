from django.urls import re_path

from . import consumers

websocket_urlpatterns = [
    re_path(r'ws/chat/(?P<room_name>\w+)/$', consumers.ChatConsumer.as_asgi()),
    re_path(r'ws/chat-readed/(?P<room_name>\w+)/(?P<user_id>\w+)/$', consumers.ReadedConsumer.as_asgi()),
]