# Generated by Django 4.2.7 on 2023-11-17 15:24

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('contenttypes', '0002_remove_content_type_name'),
    ]

    operations = [
        migrations.CreateModel(
            name='Log',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('update_at', models.DateTimeField(auto_now=True)),
                ('object_id', models.PositiveIntegerField(blank=True, null=True)),
                ('message', models.TextField()),
                ('by', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, related_name='user_logs', to=settings.AUTH_USER_MODEL)),
                ('content_type', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='contenttypes.contenttype')),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
