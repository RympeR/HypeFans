from apps.chat.consumers import ChatConsumer, ChatRoomsConsumer, LastMessageConsumer, ReadedConsumer
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
import os

from django.conf.urls import url
from django.core.asgi import get_asgi_application
from django.urls import re_path

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "core.settings")
django_asgi_app = get_asgi_application()


application = ProtocolTypeRouter({
    "http": django_asgi_app,

    "websocket": AuthMiddlewareStack(
        URLRouter([
            re_path(r"wss/chat/(?P<room_name>\w+)/", ChatConsumer.as_asgi()),
            re_path(r'wss/chat-readed/(?P<room_name>\w+)/(?P<user_id>\w+)/$',
                    ReadedConsumer.as_asgi()),
            re_path(r'wss/last-message/(?P<room_name>\w+)/$',
                    LastMessageConsumer.as_asgi()),
            re_path(r'wss/chat-rooms/(?P<user_id>\w+)/$',
                    ChatRoomsConsumer.as_asgi()),
        ])
    ),
})
