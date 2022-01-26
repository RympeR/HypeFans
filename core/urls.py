from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from core import settings
from .yazg import urlpatterns as doc_urls

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('rest_framework.urls')),
    path('chat/', include('apps.chat.urls')),
    path('user/', include('apps.users.urls')),
    path('blog/', include('apps.blog.urls')),
    # path('', include('apps.front.urls')),
    path('silk/', include('silk.urls', namespace='silk')),
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.authtoken')),
    path('auth/', include('djoser.urls.jwt')),
]
urlpatterns += doc_urls
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
