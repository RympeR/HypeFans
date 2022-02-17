from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from core import settings
from .yazg import urlpatterns as doc_urls

urlpatterns = [
    path('api/admin/', admin.site.urls),
    path('api/api/', include('rest_framework.urls')),
    path('api/chat/', include('apps.chat.urls')),
    path('api/user/', include('apps.users.urls')),
    path('api/agency/', include('apps.agency.urls')),
    path('api/blog/', include('apps.blog.urls')),
    path('api/silk/', include('silk.urls', namespace='silk')),
    path('api/auth/', include('djoser.urls')),
    path('api/auth/', include('djoser.urls.authtoken')),
    path('api/auth/', include('djoser.urls.jwt')),
    path('', include('apps.front.urls')),
]
urlpatterns += doc_urls
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
