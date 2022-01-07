from django_filters import rest_framework as filters
from apps.users.models import User
from django.db.models import Q, Model, QuerySet
from rest_framework.serializers import ModelSerializer


def filter_related_objects(queryset: QuerySet, name: str, value, model: Model, serializer: ModelSerializer, related_category: str) -> QuerySet:
    lookup = '__'.join([name, 'in'])
    res = []
    if value:
        subjects = model.objects.filter(pk__in=[obj.pk for obj in value])
        look_related = '__'.join([related_category, 'gte'])
        result = []
        for subj in subjects:
            hole_tree = model.objects.filter(
                Q(tree_id=subj.tree_id) &
                Q(**{look_related: getattr(subj, related_category)}) &
                Q(display=True)
            )
            values = [serializer(
                instance=subject).data['id'] for subject in hole_tree]
            result.append(values)
        values = result
    else:
        subjects = model.objects.filter(display=True)
        values = [serializer(
            instance=subject).data['id'] for subject in subjects]
    for value in values:
        if isinstance(value, list):
            res.extend(value)
        else:
            res.append(value)

    return queryset.filter(**{lookup: res}).distinct().order_by('id')


class UserFilter(filters.FilterSet):
    username = filters.CharFilter(lookup_expr='icontains')

    class Meta:
        model = User
        fields = (
            'username',
        )
