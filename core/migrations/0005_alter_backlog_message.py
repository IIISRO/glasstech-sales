# Generated by Django 4.2.7 on 2023-12-13 23:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0004_alter_backlog_by_alter_backlog_content_type_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='backlog',
            name='message',
            field=models.CharField(max_length=100),
        ),
    ]
