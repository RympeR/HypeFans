# Generated by Django 3.1.7 on 2021-05-11 08:10

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('blog', '0004_auto_20210509_0843'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='post',
            options={'ordering': ['-publication_date'], 'verbose_name': 'Публикация', 'verbose_name_plural': 'Публикации'},
        ),
        migrations.AlterModelOptions(
            name='postaction',
            options={'ordering': ['-post__publication_date'], 'verbose_name': 'Публикация действие', 'verbose_name_plural': 'Публикации действия'},
        ),
        migrations.AlterModelOptions(
            name='story',
            options={'ordering': ['-publication_date'], 'verbose_name': 'История', 'verbose_name_plural': 'Истории'},
        ),
        migrations.AlterModelOptions(
            name='watchedstories',
            options={'ordering': ['-source__publication_date'], 'verbose_name': 'История просмотры', 'verbose_name_plural': 'Истории просмотры'},
        ),
        migrations.AddField(
            model_name='post',
            name='favourites',
            field=models.ManyToManyField(related_name='user_favourites', to=settings.AUTH_USER_MODEL, verbose_name='Пост в избранных'),
        ),
        migrations.AlterField(
            model_name='story',
            name='archived',
            field=models.BooleanField(default=False, verbose_name='Архивировано'),
        ),
    ]
