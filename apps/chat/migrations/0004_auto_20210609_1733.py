# Generated by Django 3.1.7 on 2021-06-09 17:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0010_postbought'),
        ('chat', '0003_auto_20210509_0843'),
    ]

    operations = [
        migrations.AlterField(
            model_name='chat',
            name='attachment',
            field=models.ManyToManyField(blank=True, related_name='chat_attachment', to='blog.Attachment'),
        ),
    ]
