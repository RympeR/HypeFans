# Generated by Django 3.1.7 on 2021-05-23 15:04

from django.conf import settings
from django.db import migrations, models
import unixtimestampfield.fields


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('blog', '0005_auto_20210511_0810'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='enabled_comments',
            field=models.BooleanField(default=True, verbose_name='Комментарии включены'),
        ),
        migrations.AddField(
            model_name='postaction',
            name='datetime',
            field=unixtimestampfield.fields.UnixTimeStampField(auto_now_add=True, null=True, verbose_name='Время действия'),
        ),
        migrations.AddField(
            model_name='watchedstories',
            name='datetime',
            field=unixtimestampfield.fields.UnixTimeStampField(auto_now_add=True, null=True, verbose_name='Время действия'),
        ),
        migrations.AlterUniqueTogether(
            name='postaction',
            unique_together={('user', 'post')},
        ),
        migrations.AlterUniqueTogether(
            name='watchedstories',
            unique_together={('source', 'target')},
        ),
    ]