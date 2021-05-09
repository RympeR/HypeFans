# Generated by Django 3.1.7 on 2021-05-09 08:43

from django.db import migrations, models
import unixtimestampfield.fields


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0003_postaction_post'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='attachment',
            options={'verbose_name': 'Вложение', 'verbose_name_plural': 'Вложения'},
        ),
        migrations.AlterModelOptions(
            name='post',
            options={'verbose_name': 'Публикация', 'verbose_name_plural': 'Публикации'},
        ),
        migrations.AlterModelOptions(
            name='postaction',
            options={'verbose_name': 'Публикация действие', 'verbose_name_plural': 'Публикации действия'},
        ),
        migrations.AlterModelOptions(
            name='story',
            options={'verbose_name': 'История', 'verbose_name_plural': 'Истории'},
        ),
        migrations.AlterModelOptions(
            name='watchedstories',
            options={'verbose_name': 'История просмотры', 'verbose_name_plural': 'Истории просмотры'},
        ),
        migrations.AddField(
            model_name='post',
            name='publication_date',
            field=unixtimestampfield.fields.UnixTimeStampField(auto_now_add=True, default='1', verbose_name='Дата+время создания'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='story',
            name='publication_date',
            field=unixtimestampfield.fields.UnixTimeStampField(auto_now_add=True, default='1', verbose_name='Дата время создания'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='post',
            name='files',
            field=models.ManyToManyField(to='blog.Attachment', verbose_name='Вложения'),
        ),
    ]
