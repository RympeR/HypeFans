# Generated by Django 3.1.7 on 2021-08-13 10:33

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0013_post_archived'),
    ]

    operations = [
        migrations.RenameField(
            model_name='watchedstories',
            old_name='times_wathced',
            new_name='times_watched',
        ),
    ]
