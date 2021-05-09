import os

from django.conf.urls import url
from django.core.asgi import get_asgi_application
from django.urls import re_path

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "core.settings")
django_asgi_app = get_asgi_application()

from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter

from apps.chat.consumers import ChatConsumer

application = ProtocolTypeRouter({
    "http": django_asgi_app,

    "websocket": AuthMiddlewareStack(
        URLRouter([
            re_path(r"ws/chat/(?P<room_name>\w+)/", ChatConsumer.as_asgi()),
        ])
    ),
})