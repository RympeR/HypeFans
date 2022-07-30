from django_filters import rest_framework as filters
from apps.blog.models import Hashtag
from apps.users.models import User

class UserFilter(filters.FilterSet):
    username = filters.CharFilter(lookup_expr='icontains')

    class Meta:
        model = User
        fields = (
            'username',
        )

class HashtagFilter(filters.FilterSet):
    name = filters.CharFilter(lookup_expr='icontains')

    class Meta:
        model = Hashtag
        fields = (
            'name',
        )
