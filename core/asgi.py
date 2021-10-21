import os

from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
from django.conf.urls import url
from django.core.asgi import get_asgi_application
from django.urls import re_path

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "core.settings")
django_asgi_app = get_asgi_application()

from apps.chat import consumers

application = ProtocolTypeRouter({
    "http": django_asgi_app,

    "websocket": AuthMiddlewareStack(
        URLRouter([
            re_path(r"ws/chat/(?P<room_name>\w+)/", consumers.ChatConsumer.as_asgi()),
            re_path(r'ws/chat-readed/(?P<room_name>\w+)/(?P<user_id>\w+)/$',
                    consumers.ReadedConsumer.as_asgi()),
            re_path(r'ws/last-message/(?P<room_name>\w+)/$',
                    consumers.LastMessageConsumer.as_asgi()),
            re_path(r'ws/chat-rooms/(?P<user_id>\w+)/$',
                    consumers.ChatRoomsConsumer.as_asgi()),
        ])
    ),
})
