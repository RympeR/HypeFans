# Generated by Django 3.1.7 on 2021-10-05 21:22

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0015_auto_20211004_1118'),
    ]

    operations = [
        migrations.RenameField(
            model_name='postaction',
            old_name='date_time',
            new_name='date_time',
        ),
        migrations.RenameField(
            model_name='watchedstories',
            old_name='datetime',
            new_name='date_time',
        ),
    ]
